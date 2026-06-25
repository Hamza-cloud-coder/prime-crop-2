import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';

const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTimestamp: number | null = null;
      let animationFrame: number;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(easeProgress * value));
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        } else {
          setCount(value);
        }
      };
      animationFrame = window.requestAnimationFrame(step);
      return () => window.cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
};

const NotchedOutlineCard = ({ title, text, containerBgColor }: { title: string, text: string, containerBgColor: string }) => {
  return (
    <div className="relative border border-white/20 rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8" style={{ borderTopRightRadius: 0 }}>
      {/* Top Right Notch */}
      <div 
        className="absolute -top-[1px] -right-[1px] w-12 h-12 lg:w-16 lg:h-16 rounded-bl-[2rem] lg:rounded-bl-[3rem] border-b border-l border-[#085b20] z-10 flex items-start justify-end p-2 lg:p-2.5" 
        style={{ backgroundColor: containerBgColor }}
      >
          <div className="text-[#bded04]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="lg:w-[28px] lg:h-[28px]">
              <path d="M12 2l2.4 2.4 3.2-.8 1.4 3-1.6 2.8L19.4 12l-2 2.6 1.6 2.8-1.4 3-3.2-.8L12 22l-2.4-2.4-3.2.8-1.4-3 1.6-2.8L4.6 12l2-2.6-1.6-2.8 1.4-3 3.2.8L12 2z" />
            </svg>
          </div>
      </div>
      
      <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 lg:mb-4 relative z-20 uppercase tracking-widest">{title}</h3>
      <p className="text-white/80 text-[14px] lg:text-[15px] leading-relaxed relative z-20 font-normal pr-2 pb-1 lg:pb-2">
        {text}
      </p>
    </div>
  );
};

const VisionMissionSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch mb-10 md:mb-16 h-auto lg:min-h-[500px]">
           
           {/* LEFT COLUMN: Image */}
           <div className="w-full h-[350px] lg:h-auto" data-aos="fade-right">
              <div className="w-full h-full rounded-[1.5rem] lg:rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5">
                <img src="/jembe.jpeg" className="w-full h-full object-cover" alt="About Prime Crop" referrerPolicy="no-referrer" />
              </div>
           </div>
           
           {/* RIGHT COLUMN: Green Card with Vision/Mission */}
           <div className="bg-[#085b20] rounded-[1.5rem] lg:rounded-[2.5rem] p-8 md:p-10 lg:p-12 text-white flex flex-col justify-center h-full gap-6 shadow-sm" data-aos="fade-left">
               <NotchedOutlineCard 
                  title="VISION"
                  text="To be Africa's most reliable and reputable marketplace for agricultural commodities and animal feed products."
                  containerBgColor="#085b20"
               />
               <NotchedOutlineCard 
                  title="MISSION"
                  text="To empower farmers, serve global industries, and build sustainable trade ecosystems that bridge Tanzania with the world."
                  containerBgColor="#085b20"
               />
           </div>

        </div>

        {/* Stats Box */}
        <div className="bg-[#fdfcf8] rounded-[1.5rem] lg:rounded-[2.5rem] border border-black/5 shadow-sm py-8 px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center md:divide-x divide-black/10 gap-y-8" data-aos="fade-up">
           <div className="flex-1 text-center w-full">
              <div className="p-2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 justify-center">
                <span className="text-[40px] lg:text-[48px] text-[#0b3815] font-bold leading-none tracking-tight"><AnimatedCounter value={10} /><span className="text-[28px] lg:text-[32px] text-[#bded04] font-medium">K+</span></span>
                <span className="text-[13px] text-[#7a7a7a] font-medium uppercase tracking-widest leading-[1.3] text-center lg:text-left">Tons<br/>Exported</span>
              </div>
           </div>
           <div className="flex-1 text-center w-full">
              <div className="p-2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 justify-center">
                <span className="text-[40px] lg:text-[48px] text-[#0b3815] font-bold leading-none tracking-tight"><AnimatedCounter value={50} /><span className="text-[28px] lg:text-[32px] text-[#bded04] font-medium">+</span></span>
                <span className="text-[13px] text-[#7a7a7a] font-medium uppercase tracking-widest leading-[1.3] text-center lg:text-left">Partner<br/>Farms</span>
              </div>
           </div>
           <div className="flex-1 text-center w-full">
              <div className="p-2 flex flex-col lg:flex-row items-center gap-2 lg:gap-4 justify-center">
                <span className="text-[40px] lg:text-[48px] text-[#0b3815] font-bold leading-none tracking-tight"><AnimatedCounter value={15} /><span className="text-[28px] lg:text-[32px] text-[#bded04] font-medium">+</span></span>
                <span className="text-[13px] text-[#7a7a7a] font-medium uppercase tracking-widest leading-[1.3] text-center lg:text-left">Global<br/>Markets</span>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default VisionMissionSection;
