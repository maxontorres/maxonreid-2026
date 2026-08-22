export type Vec3 = [number, number, number];

export interface Hub {
  position: Vec3;
}

export interface Leaf {
  position: Vec3;
  hubIndex: number;
}

export interface Spoke {
  hubIndex: number;
  leafIndex: number;
}

export interface Backbone {
  hubA: number;
  hubB: number;
  control: Vec3;
}

export interface Topology {
  hubs: Hub[];
  leaves: Leaf[];
  spokes: Spoke[];
  backbones: Backbone[];
  zDepth: number;
}

const HUB_COUNT = 13;
const Z_DEPTH = 90;
const XY_SPREAD = 22;
const Y_FLATTEN = 0.6;
const MIN_HUB_SPACING = 12;
const MAX_PLACEMENT_ATTEMPTS = 60;
const SPACING_RELAX_EVERY = 20;
const SPACING_RELAX_FACTOR = 0.75;

const LEAF_MIN = 15;
const LEAF_MAX = 35;
const LEAF_SIGMA_X = 2.6;
const LEAF_SIGMA_Y = 2.2;
const LEAF_SIGMA_Z = 5;

const SPOKE_DRAW_PROBABILITY = 0.75;
const BACKBONE_BOW_MIN = 0.15;
const BACKBONE_BOW_MAX = 0.3;

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return function random() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function gaussianPair(rand: () => number): [number, number] {
  const u1 = Math.max(rand(), 1e-6);
  const u2 = rand();
  const mag = Math.sqrt(-2 * Math.log(u1));
  return [mag * Math.cos(2 * Math.PI * u2), mag * Math.sin(2 * Math.PI * u2)];
}

function distance(a: Vec3, b: Vec3): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function normalize(v: Vec3): Vec3 {
  const len = Math.hypot(v[0], v[1], v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

function randRange(rand: () => number, min: number, max: number): number {
  return min + rand() * (max - min);
}

function randInt(rand: () => number, min: number, max: number): number {
  return Math.round(randRange(rand, min, max));
}

function placeHub(rand: () => number, existing: Vec3[], targetZ: number): Vec3 {
  let spacing = MIN_HUB_SPACING;
  for (let attempt = 0; attempt < MAX_PLACEMENT_ATTEMPTS; attempt++) {
    const candidate: Vec3 = [
      randRange(rand, -XY_SPREAD, XY_SPREAD),
      randRange(rand, -XY_SPREAD, XY_SPREAD) * Y_FLATTEN,
      -targetZ,
    ];
    const tooClose = existing.some((p) => distance(p, candidate) < spacing);
    if (!tooClose) return candidate;
    if (attempt > 0 && attempt % SPACING_RELAX_EVERY === 0) {
      spacing *= SPACING_RELAX_FACTOR;
    }
  }
  return [
    randRange(rand, -XY_SPREAD, XY_SPREAD),
    randRange(rand, -XY_SPREAD, XY_SPREAD) * Y_FLATTEN,
    -targetZ,
  ];
}

function nearestHubIndices(hubs: Hub[], from: number, count: number): number[] {
  return hubs
    .map((hub, index) => ({ index, dist: distance(hubs[from].position, hub.position) }))
    .filter((entry) => entry.index !== from)
    .sort((a, b) => a.dist - b.dist)
    .slice(0, count)
    .map((entry) => entry.index);
}

export function generateTopology(seed = 1337): Topology {
  const rand = mulberry32(seed);
  const hubs: Hub[] = [];

  for (let i = 0; i < HUB_COUNT; i++) {
    const targetZ = randRange(rand, 0, Z_DEPTH);
    const position = placeHub(
      rand,
      hubs.map((h) => h.position),
      targetZ
    );
    hubs.push({ position });
  }

  const leaves: Leaf[] = [];
  const spokes: Spoke[] = [];

  hubs.forEach((hub, hubIndex) => {
    const leafCount = randInt(rand, LEAF_MIN, LEAF_MAX);

    for (let i = 0; i < leafCount; i++) {
      const [gx, gy] = gaussianPair(rand);
      const [gz] = gaussianPair(rand);
      const position: Vec3 = [
        hub.position[0] + gx * LEAF_SIGMA_X,
        hub.position[1] + gy * LEAF_SIGMA_Y,
        hub.position[2] + gz * LEAF_SIGMA_Z,
      ];
      const leafIndex = leaves.length;
      leaves.push({ position, hubIndex });

      if (rand() < SPOKE_DRAW_PROBABILITY) {
        spokes.push({ hubIndex, leafIndex });
      }
    }
  });

  const backboneSeen = new Set<string>();
  const backbones: Backbone[] = [];

  hubs.forEach((hub, hubIndex) => {
    const neighbors = nearestHubIndices(hubs, hubIndex, 2);
    neighbors.forEach((neighborIndex) => {
      const key = [hubIndex, neighborIndex].sort((a, b) => a - b).join('-');
      if (backboneSeen.has(key)) return;
      backboneSeen.add(key);

      const a = hub.position;
      const b = hubs[neighborIndex].position;
      const mid: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
      const direction = normalize(sub(b, a));
      const arbitraryUp: Vec3 =
        Math.abs(direction[1]) > 0.9 ? [1, 0, 0] : [0, 1, 0];
      const perpendicular = normalize(cross(direction, arbitraryUp));
      const bow = randRange(rand, BACKBONE_BOW_MIN, BACKBONE_BOW_MAX) * distance(a, b);
      const sign = rand() < 0.5 ? -1 : 1;
      const control: Vec3 = [
        mid[0] + perpendicular[0] * bow * sign,
        mid[1] + perpendicular[1] * bow * sign,
        mid[2] + perpendicular[2] * bow * sign,
      ];

      backbones.push({ hubA: hubIndex, hubB: neighborIndex, control });
    });
  });

  return { hubs, leaves, spokes, backbones, zDepth: Z_DEPTH };
}
