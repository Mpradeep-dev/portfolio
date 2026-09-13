// src/components/TechStack.jsx
import React from 'react';
import { Crosshair } from 'lucide-react';
import LogoLoop from './LogoLoop';

const ICON_COLOR = 'e5e7eb';

const TECH_LOGOS = [
  { node: <Crosshair className="w-6 h-6 sm:w-[30px] sm:h-[30px]" strokeWidth={1.6} />, title: 'YOLO' },
  { src: `https://cdn.simpleicons.org/python/${ICON_COLOR}`, title: 'Python' },
  { src: `https://cdn.simpleicons.org/pytorch/${ICON_COLOR}`, title: 'PyTorch' },
  { src: `https://cdn.simpleicons.org/opencv/${ICON_COLOR}`, title: 'OpenCV' },
  { src: `https://cdn.simpleicons.org/onnx/${ICON_COLOR}`, title: 'ONNX' },
  { src: `https://cdn.simpleicons.org/fastapi/${ICON_COLOR}`, title: 'FastAPI' },
  { src: `https://cdn.simpleicons.org/docker/${ICON_COLOR}`, title: 'Docker' },
  { src: `https://cdn.simpleicons.org/kubernetes/${ICON_COLOR}`, title: 'Kubernetes' },
  { src: `https://cdn.simpleicons.org/postgresql/${ICON_COLOR}`, title: 'PostgreSQL' },
  { src: `https://cdn.simpleicons.org/redis/${ICON_COLOR}`, title: 'Redis' },
  { src: `https://cdn.simpleicons.org/rabbitmq/${ICON_COLOR}`, title: 'RabbitMQ' },
  { src: `https://cdn.simpleicons.org/langchain/${ICON_COLOR}`, title: 'LangChain' },
  { src: `https://cdn.simpleicons.org/git/${ICON_COLOR}`, title: 'Git' },
];

function renderLogoItem(item) {
  return (
    <div className="flex flex-col items-center gap-2 text-gray-500">
      <span className="flex items-center justify-center h-6 sm:h-8 text-gray-300">
        {item.node ?? <img src={item.src} alt={item.title} className="h-6 sm:h-8 w-auto" />}
      </span>
      <span className="text-[10px] sm:text-[11px] font-medium tracking-wide font-['DM_Sans']">{item.title}</span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative z-10 w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Syne'] text-white">Tech Stack</h2>
          <p className="text-gray-400 mt-2 font-['DM_Sans']">
            Technologies I use to build AI and computer vision systems.
          </p>
        </div>

        <LogoLoop
          logos={TECH_LOGOS}
          renderItem={renderLogoItem}
          speed={38}
          direction="left"
          logoHeight={44}
          gap={56}
          hoverSpeed={8}
          fadeOut
          fadeOutColor="#050505"
          scaleOnHover
          ariaLabel="Technologies I work with"
        />
      </div>
    </section>
  );
}
