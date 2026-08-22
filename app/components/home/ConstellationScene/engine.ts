import * as THREE from 'three';
import { generateTopology, type Hub, type Backbone } from './generateTopology';

interface CameraWaypoint {
  progress: number;
  z: number;
  fogNear: number;
  fogFar: number;
}

const CAMERA_WAYPOINTS: CameraWaypoint[] = [
  { progress: 0, z: 10, fogNear: 22, fogFar: 62 },
  { progress: 0.25, z: -8, fogNear: 18, fogFar: 58 },
  { progress: 0.5, z: -32, fogNear: 14, fogFar: 52 },
  { progress: 0.75, z: -58, fogNear: 11, fogFar: 46 },
  { progress: 1, z: -84, fogNear: 8, fogFar: 40 },
];

const PARALLAX_STRENGTH = 1.4;
const PARALLAX_LERP = 0.06;
const SCROLL_LERP = 0.08;
const BACKBONE_SEGMENTS = 24;

const HUB_SPRITE_SIZE = 1.6;
const HUB_OPACITY = 0.45;

const LEAF_POINT_SIZE = 0.16;
const PULSE_POINT_SIZE = 0.32;
const LINE_SPOKE_OPACITY = 0.07;
const LINE_BACKBONE_OPACITY = 0.09;

const COLOR_ELECTRIC = 0x628dff;
const COLOR_ICE = 0xb7d7ff;
const COLOR_VOID = 0x050608;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function createGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.45)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

type MaterialWithMap = THREE.Material & { map?: THREE.Texture | null };

function disposeMaterialAndMap(material: THREE.Material) {
  const withMap = material as MaterialWithMap;
  if (withMap.map) withMap.map.dispose();
  material.dispose();
}

function sampleWaypoints(progress: number): { z: number; fogNear: number; fogFar: number } {
  const clamped = Math.min(1, Math.max(0, progress));
  let lower = CAMERA_WAYPOINTS[0];
  let upper = CAMERA_WAYPOINTS[CAMERA_WAYPOINTS.length - 1];
  for (let i = 0; i < CAMERA_WAYPOINTS.length - 1; i++) {
    if (clamped >= CAMERA_WAYPOINTS[i].progress && clamped <= CAMERA_WAYPOINTS[i + 1].progress) {
      lower = CAMERA_WAYPOINTS[i];
      upper = CAMERA_WAYPOINTS[i + 1];
      break;
    }
  }
  const span = upper.progress - lower.progress || 1;
  const t = (clamped - lower.progress) / span;
  return {
    z: lerp(lower.z, upper.z, t),
    fogNear: lerp(lower.fogNear, upper.fogNear, t),
    fogFar: lerp(lower.fogFar, upper.fogFar, t),
  };
}

function quadraticBezier(
  a: THREE.Vector3,
  control: THREE.Vector3,
  b: THREE.Vector3,
  t: number,
  out: THREE.Vector3
): THREE.Vector3 {
  const oneMinusT = 1 - t;
  out.set(
    oneMinusT * oneMinusT * a.x + 2 * oneMinusT * t * control.x + t * t * b.x,
    oneMinusT * oneMinusT * a.y + 2 * oneMinusT * t * control.y + t * t * b.y,
    oneMinusT * oneMinusT * a.z + 2 * oneMinusT * t * control.z + t * t * b.z
  );
  return out;
}

export class ConstellationEngine {
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private fog: THREE.Fog;

  private hubSprites: THREE.Sprite[] = [];
  private hubData: Hub[] = [];
  private backbones: Backbone[] = [];
  private backboneCurvePoints: THREE.Vector3[][] = [];

  private glowTexture: THREE.Texture;

  private pulsePoints: THREE.Points | null = null;
  private pulseState: { t: number; speed: number }[] = [];

  private parallaxTarget = new THREE.Vector2(0, 0);
  private parallaxCurrent = new THREE.Vector2(0, 0);

  private targetScrollProgress = 0;
  private smoothedScrollProgress = 0;

  private reducedMotion = false;
  private isTouch = false;
  private disposed = false;
  private rafId: number | null = null;
  private lastTime = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isTouch ? 1.5 : 2));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    const initialWaypoint = sampleWaypoints(0);
    this.camera.position.set(0, 0, initialWaypoint.z);

    this.fog = new THREE.Fog(COLOR_VOID, initialWaypoint.fogNear, initialWaypoint.fogFar);
    this.scene.fog = this.fog;

    this.glowTexture = createGlowTexture();

    this.buildScene();
    this.bindEvents();
    this.resize();
    this.rafId = requestAnimationFrame(this.tick);
  }

  private buildScene() {
    const topology = generateTopology();
    this.hubData = topology.hubs;

    topology.hubs.forEach((hub) => {
      const material = new THREE.SpriteMaterial({
        map: this.glowTexture,
        color: COLOR_ELECTRIC,
        transparent: true,
        opacity: HUB_OPACITY,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(material);
      sprite.position.set(hub.position[0], hub.position[1], hub.position[2]);
      sprite.scale.set(HUB_SPRITE_SIZE, HUB_SPRITE_SIZE, 1);
      this.scene.add(sprite);
      this.hubSprites.push(sprite);
    });

    const leafPositions = new Float32Array(topology.leaves.length * 3);
    const leafColors = new Float32Array(topology.leaves.length * 3);
    const colorElectric = new THREE.Color(COLOR_ELECTRIC);
    const colorIce = new THREE.Color(COLOR_ICE);
    topology.leaves.forEach((leaf, i) => {
      leafPositions[i * 3] = leaf.position[0];
      leafPositions[i * 3 + 1] = leaf.position[1];
      leafPositions[i * 3 + 2] = leaf.position[2];
      const mixed = colorElectric.clone().lerp(colorIce, Math.random());
      leafColors[i * 3] = mixed.r;
      leafColors[i * 3 + 1] = mixed.g;
      leafColors[i * 3 + 2] = mixed.b;
    });
    const leafGeometry = new THREE.BufferGeometry();
    leafGeometry.setAttribute('position', new THREE.BufferAttribute(leafPositions, 3));
    leafGeometry.setAttribute('color', new THREE.BufferAttribute(leafColors, 3));
    const leafMaterial = new THREE.PointsMaterial({
      map: this.glowTexture,
      size: LEAF_POINT_SIZE,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.scene.add(new THREE.Points(leafGeometry, leafMaterial));

    const spokePositions = new Float32Array(topology.spokes.length * 2 * 3);
    topology.spokes.forEach((spoke, i) => {
      const hub = topology.hubs[spoke.hubIndex];
      const leaf = topology.leaves[spoke.leafIndex];
      spokePositions[i * 6] = hub.position[0];
      spokePositions[i * 6 + 1] = hub.position[1];
      spokePositions[i * 6 + 2] = hub.position[2];
      spokePositions[i * 6 + 3] = leaf.position[0];
      spokePositions[i * 6 + 4] = leaf.position[1];
      spokePositions[i * 6 + 5] = leaf.position[2];
    });
    const spokeGeometry = new THREE.BufferGeometry();
    spokeGeometry.setAttribute('position', new THREE.BufferAttribute(spokePositions, 3));
    const spokeMaterial = new THREE.LineBasicMaterial({
      color: COLOR_ELECTRIC,
      transparent: true,
      opacity: LINE_SPOKE_OPACITY,
    });
    this.scene.add(new THREE.LineSegments(spokeGeometry, spokeMaterial));

    this.backbones = topology.backbones;
    const backboneVertices: number[] = [];
    topology.backbones.forEach((backbone) => {
      const a = new THREE.Vector3(...topology.hubs[backbone.hubA].position);
      const b = new THREE.Vector3(...topology.hubs[backbone.hubB].position);
      const control = new THREE.Vector3(...backbone.control);
      const points: THREE.Vector3[] = [];
      for (let s = 0; s <= BACKBONE_SEGMENTS; s++) {
        points.push(quadraticBezier(a, control, b, s / BACKBONE_SEGMENTS, new THREE.Vector3()));
      }
      this.backboneCurvePoints.push(points);
      for (let s = 0; s < BACKBONE_SEGMENTS; s++) {
        backboneVertices.push(points[s].x, points[s].y, points[s].z);
        backboneVertices.push(points[s + 1].x, points[s + 1].y, points[s + 1].z);
      }
    });
    const backboneGeometry = new THREE.BufferGeometry();
    backboneGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(backboneVertices), 3)
    );
    const backboneMaterial = new THREE.LineBasicMaterial({
      color: COLOR_ELECTRIC,
      transparent: true,
      opacity: LINE_BACKBONE_OPACITY,
    });
    this.scene.add(new THREE.LineSegments(backboneGeometry, backboneMaterial));

    this.pulseState = this.backbones.map(() => ({
      t: Math.random(),
      speed: 0.12 + Math.random() * 0.08,
    }));
    const pulsePositions = new Float32Array(this.backbones.length * 3);
    const pulseGeometry = new THREE.BufferGeometry();
    pulseGeometry.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMaterial = new THREE.PointsMaterial({
      map: this.glowTexture,
      color: COLOR_ICE,
      size: PULSE_POINT_SIZE,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.pulsePoints = new THREE.Points(pulseGeometry, pulseMaterial);
    this.scene.add(this.pulsePoints);
  }

  private handleScroll = () => {
    this.targetScrollProgress = this.computeScrollProgress();
  };

  private computeScrollProgress(): number {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return 0;
    return Math.min(1, Math.max(0, window.scrollY / scrollable));
  }

  private handleMouseMove = (event: MouseEvent) => {
    if (!this.reducedMotion) {
      this.parallaxTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1)
      );
    }
  };

  private handleResize = () => this.resize();

  private handleVisibility = () => {
    if (document.hidden) {
      if (this.rafId !== null) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      }
    } else if (this.rafId === null) {
      this.lastTime = 0;
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  private bindEvents() {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('visibilitychange', this.handleVisibility);
    if (!this.isTouch) {
      window.addEventListener('mousemove', this.handleMouseMove);
    }
    this.handleScroll();
  }

  private updatePulses(dt: number) {
    if (!this.pulsePoints) return;
    const positions = this.pulsePoints.geometry.attributes.position as THREE.BufferAttribute;
    this.pulseState.forEach((state, i) => {
      state.t += dt * state.speed;
      if (state.t > 1) state.t -= 1;
      const points = this.backboneCurvePoints[i];
      const segment = state.t * (points.length - 1);
      const idx = Math.min(points.length - 2, Math.floor(segment));
      const localT = segment - idx;
      const a = points[idx];
      const b = points[idx + 1];
      positions.setXYZ(i, lerp(a.x, b.x, localT), lerp(a.y, b.y, localT), lerp(a.z, b.z, localT));
    });
    positions.needsUpdate = true;
  }

  private updateIdleDrift(time: number) {
    const t = time * 0.0006;
    this.hubSprites.forEach((sprite, i) => {
      const bob = Math.sin(t + i) * 0.15;
      sprite.position.y = this.hubData[i].position[1] + bob;
    });
  }

  private resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.isTouch ? 1.5 : 2));
  }

  private tick = (time: number) => {
    const dt = this.lastTime ? Math.min((time - this.lastTime) / 1000, 0.1) : 0;
    this.lastTime = time;

    this.smoothedScrollProgress = lerp(this.smoothedScrollProgress, this.targetScrollProgress, SCROLL_LERP);
    const waypoint = sampleWaypoints(this.smoothedScrollProgress);

    if (!this.reducedMotion) {
      this.parallaxCurrent.lerp(this.parallaxTarget, PARALLAX_LERP);
    }

    this.camera.position.x = this.parallaxCurrent.x * PARALLAX_STRENGTH;
    this.camera.position.y = this.parallaxCurrent.y * PARALLAX_STRENGTH;
    this.camera.position.z = waypoint.z;
    this.camera.lookAt(0, 0, waypoint.z - 40);

    this.fog.near = waypoint.fogNear;
    this.fog.far = waypoint.fogFar;

    if (!this.reducedMotion) {
      this.updatePulses(dt);
      this.updateIdleDrift(time);
    }

    this.renderer.render(this.scene, this.camera);
    this.rafId = requestAnimationFrame(this.tick);
  };

  dispose() {
    if (this.disposed) return;
    this.disposed = true;

    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibility);
    window.removeEventListener('mousemove', this.handleMouseMove);

    this.scene.traverse((object) => {
      if (object instanceof THREE.Sprite) {
        // Sprite geometry is a shared static primitive across all THREE.Sprite
        // instances — never dispose it per-instance. Materials/maps (other
        // than the shared glow texture, freed once below) are per-instance.
        object.material.dispose();
        return;
      }
      if (object instanceof THREE.Points || object instanceof THREE.LineSegments) {
        object.geometry.dispose();
        const material = object.material;
        if (Array.isArray(material)) {
          material.forEach(disposeMaterialAndMap);
        } else {
          disposeMaterialAndMap(material);
        }
      }
    });
    this.glowTexture.dispose();
    this.renderer.dispose();
  }
}
