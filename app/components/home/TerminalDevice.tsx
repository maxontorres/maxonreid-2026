'use client';

import { useEffect, useRef, useState } from 'react';

export default function TerminalDevice() {

  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermInstance = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  const currentLineRef = useRef('');
  const commandHistoryRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const isReadyRef = useRef(false);

  const normalizeTerminalText = (value: string) => {
    return value
      .normalize('NFKC')
      .replace(/[▸•]/g, '>')
      .replace(/✓/g, 'OK')
      .replace(/—/g, '-')
      .replace(/…/g, '...')
      .replace(/·/g, '|');
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !terminalRef.current) return;

    // Dynamic import to avoid SSR issues
    import('xterm').then(({ Terminal }) => {
      import('xterm-addon-fit').then(({ FitAddon }) => {
        if (!terminalRef.current) return;

        // Create terminal instance
        const term = new Terminal({
          cursorBlink: true,
          fontFamily: '"IBM Plex Mono", "JetBrains Mono", "Consolas", "Courier New", monospace',
          fontSize: 14,
          lineHeight: 1.2,
          letterSpacing: 0,
          disableStdin: false,
          scrollback: 300,
          allowTransparency: true,
          theme: {
            background: 'transparent',
            foreground: '#00ff9f',
            cursor: '#ff007f',
            cursorAccent: '#00ff9f',
            selectionBackground: 'rgba(0,255,159,0.18)',
            black: '#0a0e14',
            red: '#ff3366',
            green: '#00ff9f',
            yellow: '#ffcc00',
            blue: '#00d4ff',
            magenta: '#ff007f',
            cyan: '#00ffff',
            white: '#F0EDE6',
            brightBlack: '#4a5568',
            brightRed: '#ff5588',
            brightGreen: '#33ffbb',
            brightYellow: '#ffdd33',
            brightBlue: '#33e6ff',
            brightMagenta: '#ff33aa',
            brightCyan: '#66ffff',
            brightWhite: '#ffffff',
          },
        });

        // Create and load fit addon
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        // Open terminal
        term.open(terminalRef.current);

        // Fit terminal to container
        const tryFit = () => {
          try {
            fitAddon.fit();
          } catch (e) {
            // Ignore fit errors
          }
        };

        tryFit();
        requestAnimationFrame(tryFit);
        setTimeout(tryFit, 80);

        // Handle window resize
        const handleResize = () => tryFit();
        window.addEventListener('resize', handleResize);

        // Store instance
        xtermInstance.current = term;

        // Run initial demo, then install commands
        runInitialDemo(term).then(() => {
          installInteractiveCommands(term, writeTyped);
          setupTerminalInput(term);
        });

        // Cleanup
        return () => {
          window.removeEventListener('resize', handleResize);
          term.dispose();
        };
      });
    });
  }, [isMounted]);

  // Helper function to write typed effect
  const writeTyped = (
    term: any,
    text: string,
    delay = 12
  ): Promise<void> => {
    const safeText = normalizeTerminalText(text);
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      term.writeln(safeText.replace(/\r?\n$/, ''));
      return Promise.resolve();
    }

    return new Promise((resolve) => {
      let i = 0;
      const interval = setInterval(() => {
        const ch = safeText[i];
        if (ch === '\n') {
          term.write('\r\n');
        } else {
          term.write(ch);
        }
        i++;
        if (i >= safeText.length) {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  // Random latency helper
  const randomLatency = (min = 12, max = 120) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Initial demo animation
  const runInitialDemo = async (term: any) => {
    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const localWrite = (text: string, delay = 12) => {
      if (reduceMotion) {
        term.writeln(normalizeTerminalText(text).replace(/\r?\n$/, ''));
        return Promise.resolve();
      }
      return writeTyped(term, text, delay);
    };

    term.clear();
    await localWrite('\x1b[1;96m>>> SYSTEM PROFILE LOADED <<<\x1b[0m\r\n', 10);
    term.writeln('');
    await localWrite('\x1b[96m▸ Name:\x1b[0m \x1b[93mMaximiliano Brito Torres\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Nationality:\x1b[0m \x1b[93mMexican\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Birthday:\x1b[0m \x1b[93mJuly 24th, 1993\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Role:\x1b[0m \x1b[92mFull-Stack Web Developer\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Current:\x1b[0m \x1b[95mVientiane, Laos\x1b[0m\r\n', 10);
    await localWrite('\x1b[96m▸ Worked in:\x1b[0m \x1b[36mThailand · Mexico · China · Laos\x1b[0m\r\n', 10);
    term.writeln('');

    await localWrite('\x1b[93m[*] Initializing secure channel…\x1b[0m\r\n', 16);
    await sleep(320);
    await localWrite('\x1b[92m[✓] Handshake complete — AES-256\x1b[0m\r\n', 12);
    await sleep(260);
    await localWrite(
      '\x1b[95m[DEPLOY]\x1b[0m maxon-torres/launch-kit \x1b[92m— SUCCESS\x1b[0m \x1b[90m(2026-02-07 10:18 UTC)\x1b[0m\r\n',
      12
    );
    await sleep(260);
    await localWrite(
      '\x1b[36m[METRICS]\x1b[0m Latency: \x1b[93m34ms\x1b[0m | Uptime: \x1b[92m99.99%\x1b[0m | Throughput: \x1b[96m12k req/min\x1b[0m\r\n',
      12
    );
    await sleep(900);
    await localWrite(
      '\x1b[1;92m[STATUS]\x1b[0m \x1b[93mAVAILABLE\x1b[0m — \x1b[96mREMOTE\x1b[0m | LOCATION: \x1b[95mVientiane, Laos\x1b[0m\r\n',
      10
    );
    term.writeln('');
  };

  // Install interactive commands after demo
  const installInteractiveCommands = async (term: any, writeTypedFn: any) => {
    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const writeTypedLocal = (text: string, delay = 12) => {
      if (reduceMotion) {
        term.writeln(normalizeTerminalText(text).replace(/\r?\n$/, ''));
        return Promise.resolve();
      }
      return writeTypedFn(term, text, delay);
    };

    // Initialize
    term.clear();
    await writeTypedLocal('\x1b[1;92m>>> MAXON INTERACTIVE TERMINAL <<<\x1b[0m\r\n', 10);
    term.writeln('');
    await writeTypedLocal('\x1b[93m[!]\x1b[0m Type \x1b[92m"help"\x1b[0m\r\n', 10);
    term.writeln('');
    await executeCommand(term, 'profile');

    // Mark as ready for input
    isReadyRef.current = true;
  };

  const setupTerminalInput = (term: any) => {
    term.onData((data: string) => {
      if (!isReadyRef.current) return;

      const code = data.charCodeAt(0);

      // Handle Enter
      if (code === 13) {
        term.write('\r\n');
        const command = currentLineRef.current.trim();
        if (command) {
          commandHistoryRef.current.unshift(command);
          historyIndexRef.current = -1;
          executeCommand(term, command);
        } else {
          term.write('\x1b[92m$\x1b[0m ');
        }
        currentLineRef.current = '';
        return;
      }

      // Handle Backspace/Delete
      if (code === 127 || code === 8) {
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
        return;
      }

      // Handle Ctrl+C
      if (code === 3) {
        term.write('^C\r\n');
        currentLineRef.current = '';
        term.write('\x1b[92m$\x1b[0m ');
        return;
      }

      // Handle Ctrl+L (clear)
      if (code === 12) {
        term.clear();
        currentLineRef.current = '';
        term.write('\x1b[92m$\x1b[0m ');
        return;
      }

      // Handle Arrow Up (history prev)
      if (data === '\x1b[A') {
        if (commandHistoryRef.current.length > 0 && historyIndexRef.current < commandHistoryRef.current.length - 1) {
          // Clear current line
          term.write('\r\x1b[K');
          term.write('\x1b[92m$\x1b[0m ');

          historyIndexRef.current++;
          currentLineRef.current = commandHistoryRef.current[historyIndexRef.current];
          term.write(currentLineRef.current);
        }
        return;
      }

      // Handle Arrow Down (history next)
      if (data === '\x1b[B') {
        // Clear current line
        term.write('\r\x1b[K');
        term.write('\x1b[92m$\x1b[0m ');

        if (historyIndexRef.current > 0) {
          historyIndexRef.current--;
          currentLineRef.current = commandHistoryRef.current[historyIndexRef.current];
          term.write(currentLineRef.current);
        } else {
          historyIndexRef.current = -1;
          currentLineRef.current = '';
        }
        return;
      }

      // Ignore other escape sequences
      if (code === 27) {
        return;
      }

      // Handle printable characters
      if (code >= 32 && code < 127) {
        currentLineRef.current += data;
        term.write(data);
      }
    });
  };

  const executeCommand = async (term: any, command: string) => {
    const parts = command.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return;
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const writeTypedLocal = (text: string, delay = 12) => {
      if (reduceMotion) {
        term.writeln(normalizeTerminalText(text).replace(/\r?\n$/, ''));
        return Promise.resolve();
      }
      return writeTyped(term, text, delay);
    };

    const handlers: Record<string, (args: string[]) => Promise<void>> = {
      help: async () => {
        await writeTypedLocal('\x1b[1;95m>>> AVAILABLE COMMANDS <<<\x1b[0m\r\n', 8);
        term.writeln('');
        await writeTypedLocal('\x1b[92m▸ help\x1b[0m            \x1b[90m—\x1b[0m \x1b[96mshow this help\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ profile\x1b[0m         \x1b[90m—\x1b[0m \x1b[96mshow profile summary\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ projects\x1b[0m        \x1b[90m—\x1b[0m \x1b[96mlist projects\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ services\x1b[0m        \x1b[90m—\x1b[0m \x1b[96mlist services offered\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ contact\x1b[0m         \x1b[90m—\x1b[0m \x1b[96mshow contact info\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ ping\x1b[0m \x1b[93m<host>\x1b[0m     \x1b[90m—\x1b[0m \x1b[96msimulate ping\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ deploy\x1b[0m \x1b[93m<name>\x1b[0m   \x1b[90m—\x1b[0m \x1b[96msimulate deploy\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ whoami\x1b[0m          \x1b[90m—\x1b[0m \x1b[96mshow client info\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[92m▸ clear\x1b[0m           \x1b[90m—\x1b[0m \x1b[96mclear terminal\x1b[0m\r\n', 6);
        term.writeln('');
      },

      profile: async () => {
        await writeTypedLocal('\x1b[1;93m>>> USER PROFILE <<<\x1b[0m\r\n', 10);
        term.writeln('');
        await writeTypedLocal('\x1b[96m▸ Name:\x1b[0m \x1b[93mMaximiliano Brito Torres\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Role:\x1b[0m \x1b[92mFull-Stack Web Developer\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Location:\x1b[0m \x1b[95mVientiane, Laos\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Experience:\x1b[0m \x1b[93m8+ years across Mexico · Thailand · China · Laos\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Specialties:\x1b[0m \x1b[36mSoftware · Web · API · UI/UX · Performance\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Highlight:\x1b[0m \x1b[92mAWS Rekognition tooling — 99.9% uptime\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Availability:\x1b[0m \x1b[92mRemote / Consultancy\x1b[0m\r\n', 8);
        term.writeln('');
      },

      projects: async () => {
        await writeTypedLocal('\x1b[1;95m>>> PROJECTS <<<\x1b[0m\r\n', 8);
        term.writeln('');
        await writeTypedLocal('\x1b[1;93mOrderBridge\x1b[0m \x1b[90m— 2025\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Type:\x1b[0m \x1b[93mSaaS Middleware Platform\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ Stack:\x1b[0m \x1b[36mReact 18 · Vite · Fastify · PostgreSQL · Prisma · WebSockets\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ Security:\x1b[0m \x1b[36mOAuth 2.0 · AES-256 encryption · HMAC-SHA256 webhooks\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ About:\x1b[0m Unified middleware that bridges delivery platforms\r\n', 6);
        await writeTypedLocal('         (UberEats, Grab, etc.) to POS systems in real-time.\r\n', 4);
        term.writeln('');
        await writeTypedLocal('\x1b[96m▸ Metrics:\x1b[0m\r\n', 6);
        await writeTypedLocal('   \x1b[92m<800ms\x1b[0m  end-to-end order processing\r\n', 5);
        await writeTypedLocal('   \x1b[92m5\x1b[0m       delivery platforms supported\r\n', 5);
        await writeTypedLocal('   \x1b[92m3\x1b[0m       POS systems integrated\r\n', 5);
        await writeTypedLocal('   \x1b[92m0\x1b[0m       manual steps required\r\n', 5);
        term.writeln('');
        await writeTypedLocal('\x1b[96m▸ Pipeline:\x1b[0m Webhook → Translate → Inject → Real-Time Sync\r\n', 6);
        term.writeln('');
        await writeTypedLocal('\x1b[1;93mLao Mai Travel\x1b[0m \x1b[90m— 2025\x1b[0m\r\n', 8);
        await writeTypedLocal('\x1b[96m▸ Type:\x1b[0m \x1b[93mBilingual Tourism Website\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ Stack:\x1b[0m \x1b[36mNext.js 15 · TypeScript · next-intl · Resend · Umami · Vercel\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ Analytics:\x1b[0m \x1b[36mUmami — privacy-first, GDPR compliant, no cookies\x1b[0m\r\n', 6);
        await writeTypedLocal('\x1b[96m▸ About:\x1b[0m EN/TH bilingual site for a Vientiane tour operator —\r\n', 6);
        await writeTypedLocal('         SEO, booking inquiries & real-time web analytics.\r\n', 4);
        term.writeln('');
        await writeTypedLocal('\x1b[96m▸ Metrics:\x1b[0m\r\n', 6);
        await writeTypedLocal('   \x1b[92mEN + TH\x1b[0m  bilingual first-class routing\r\n', 5);
        await writeTypedLocal('   \x1b[92m100%\x1b[0m    server-rendered HTML for SEO\r\n', 5);
        await writeTypedLocal('   \x1b[92m0\x1b[0m       cookie banners or consent popups\r\n', 5);
        await writeTypedLocal('   \x1b[92m1 link\x1b[0m  client analytics dashboard access\r\n', 5);
        term.writeln('');
      },

      services: async () => {
        await writeTypedLocal('\x1b[1;95m>>> SERVICES <<<\x1b[0m\r\n', 8);
        term.writeln('');

        await writeTypedLocal('\x1b[92m1. SaaS Product Development\x1b[0m\r\n', 6);
        await writeTypedLocal('   Scalable multi-user platforms built for growth.\r\n\r\n', 4);

        await writeTypedLocal('\x1b[92m2. Marketplace Platforms\x1b[0m\r\n', 6);
        await writeTypedLocal('   Multi-sided systems connecting users, vendors, or services.\r\n\r\n', 4);

        await writeTypedLocal('\x1b[92m3. MVP Development\x1b[0m\r\n', 6);
        await writeTypedLocal('   Lean, production-ready MVPs for early-stage startups.\r\n\r\n', 4);

        await writeTypedLocal('\x1b[90mType "contact" to start a collaboration.\x1b[0m\r\n', 4);
      },

      contact: async () => {
        const email = document.querySelector('a[href^="mailto:"]')?.textContent?.trim() || 'hello@maxontorres.com';
        const phone = document.querySelector('a[href^="tel:"]')?.textContent?.trim() || '+856 20 52 373 435';
        const locationCards = Array.from(document.querySelectorAll('.contact-card'));
        const location = locationCards.find(c => c.textContent?.includes('LOCATION'))?.querySelector('.contact-value')?.textContent?.trim() || '';
        await writeTypedLocal('\r\nContact:\r\n', 8);
        await writeTypedLocal(`  Email: ${email}\r\n`, 6);
        if (phone) await writeTypedLocal(`  Phone: ${phone}\r\n`, 6);
        if (location) await writeTypedLocal(`  Location: ${location}\r\n`, 6);
        term.writeln('');
      },

      ping: async (args: string[]) => {
        const host = args[0] || 'edge.example';
        await writeTypedLocal(`\r\nPING ${host} (${host}) 56(84) bytes of data.\r\n`, 8);
        await new Promise(r => setTimeout(r, 250));
        const latency = randomLatency();
        await writeTypedLocal(`64 bytes from ${host}: icmp_seq=1 ttl=54 time=${latency} ms\r\n`, 8);
        await writeTypedLocal(`--- ${host} ping statistics ---\r\n`, 8);
        await writeTypedLocal(`1 packets transmitted, 1 received, 0% packet loss, time 0ms\r\n`, 8);
        term.writeln('');
      },

      deploy: async (args: string[]) => {
        const name = args[0] || 'demo-app';
        await writeTypedLocal(`\r\nStarting deploy: ${name}\r\n`, 8);
        await writeTypedLocal('> building…\r\n', 10);
        await new Promise(r => setTimeout(r, 700));
        await writeTypedLocal('> running tests…\r\n', 10);
        await new Promise(r => setTimeout(r, 900));
        await writeTypedLocal('\x1b[32m> SUCCESS: build & tests passed\x1b[0m\r\n', 10);
        await writeTypedLocal(`> rolling out ${name} to prod…\r\n`, 10);
        await new Promise(r => setTimeout(r, 700));
        await writeTypedLocal('\x1b[32m> DEPLOY OK — ' + new Date().toISOString() + '\x1b[0m\r\n', 10);
        term.writeln('');
      },

      clear: async () => {
        term.clear();
      },

      whoami: async () => {
        const ua = navigator.userAgent || 'unknown';
        const platform = navigator.platform || 'unknown';
        const languages = navigator.languages ? navigator.languages.join(', ') : (navigator.language || 'unknown');
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        const online = navigator.onLine ? 'online' : 'offline';
        const cookies = navigator.cookieEnabled ? 'enabled' : 'disabled';
        const timezone = (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown' : 'unknown';
        const viewport = `${window.innerWidth}×${window.innerHeight}`;
        const now = new Date().toLocaleString('en-US');

        await writeTypedLocal('User client info:\r\n', 8);
        await writeTypedLocal(`  User Agent: ${ua}\r\n`, 6);
        await writeTypedLocal(`  Platform: ${platform}\r\n`, 6);
        await writeTypedLocal(`  Languages: ${languages}\r\n`, 6);
        await writeTypedLocal(`  Timezone: ${timezone}\r\n`, 6);
        await writeTypedLocal(`  Viewport: ${viewport}\r\n`, 6);
        await writeTypedLocal(`  Theme: ${theme}\r\n`, 6);
        await writeTypedLocal(`  Online: ${online}\r\n`, 6);
        await writeTypedLocal(`  Cookies: ${cookies}\r\n`, 6);
        await writeTypedLocal(`  Local time: ${now}\r\n`, 6);
        term.writeln('');
      }
    };

    if (handlers[cmd]) {
      await handlers[cmd](args);
    } else {
      await writeTypedLocal(`Command not found: ${cmd}\r\n`, 8);
      await writeTypedLocal('Type "help" to list available commands.\r\n', 8);
    }

    // Show prompt again
    term.write('\x1b[92m$\x1b[0m ');
  };

  return (
    <div className="terminal-en-only relative w-full  max-w-[900px]" role="img" aria-label="Terminal mockup card" lang="en" dir="ltr" translate="no">
      <div className="bg-[#111111]  rounded-xl border border-white/[0.08] overflow-hidden">
        <div
          id="xterm"
          className="h-[480px] m-2 overflow-hidden"
          role="group"
          aria-label="Interactive terminal"
          ref={terminalRef}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        ></div>
      </div>
    </div>
  );
}
