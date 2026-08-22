'use client';

import dynamic from 'next/dynamic';

const ConstellationScene = dynamic(() => import('./ConstellationScene'), {
  ssr: false,
});

export default ConstellationScene;
