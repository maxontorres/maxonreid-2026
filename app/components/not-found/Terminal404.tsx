'use client';

export default function Terminal404() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto lg:mx-0">

      {/* Decorative ambient glow */}
      <div className="glow-orb glow-orb--electric -top-10 -left-10 w-72 h-72 -z-10" aria-hidden="true" />

      {/* Terminal window */}
      <div className="bg-[#0D0F16] rounded-xl border border-white/[0.08] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.5)]">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#12151F]">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" aria-hidden="true" />
          <span
            className="flex-1 text-center text-xs text-[#8A8FA0]"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            bash — 404
          </span>
        </div>

        {/* Terminal body */}
        <div
          className="p-5 space-y-1.5 text-sm leading-relaxed select-none"
          style={{ fontFamily: 'var(--font-space-mono)' }}
          role="img"
          aria-label="Terminal showing a 404 error: page not found"
        >
          <p>
            <span className="text-[#628DFF]">$</span>
            <span className="text-[#E8E9EC]"> find . -name &quot;page&quot;</span>
          </p>

          <p className="text-[#8A8FA0] pl-3">searching...</p>

          <p>
            <span className="text-[#E58945]">✗ Error 404:</span>
            <span className="text-[#E8E9EC]"> Page not found</span>
          </p>

          <p>&nbsp;</p>

          <p>
            <span className="text-[#628DFF]">$</span>
            <span className="text-[#8A8FA0]"> The page you&apos;re looking for</span>
          </p>
          <p className="text-[#8A8FA0] pl-3">has vanished into the void.</p>

          <p>&nbsp;</p>

          <p>
            <span className="text-[#628DFF]">$</span>
            <span
              className="inline-block w-2.5 h-[1.1em] ml-1.5 align-middle bg-[#628DFF] animate-[blink_1s_step-start_infinite]"
              aria-hidden="true"
            />
          </p>
        </div>

      </div>
    </div>
  );
}
