import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const StartProject: React.FC = () => {
  return (
    <section className="bg-black border-t border-white/10 overflow-hidden w-full">
      <a href="#contact" className="block w-full group cursor-hover">
        <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-12 md:py-20 gap-8">
            
            {/* Massive Text */}
            <div className="relative overflow-hidden">
                <h2 className="font-body font-black text-[9vw] md:text-[11vw] leading-[0.85] tracking-tighter text-white uppercase text-center md:text-left transition-all duration-700 [filter:url('#liquid-flow')] group-hover:text-primary">
                    Start A Project
                </h2>
            </div>

            {/* Arrow Box - Desktop */}
            <div className="hidden md:flex items-center justify-center w-[12vw] h-[12vw] max-w-[200px] max-h-[200px] border border-white/30 rounded-lg group-hover:bg-primary group-hover:border-primary transition-all duration-500 relative overflow-hidden">
                <ArrowUpRight 
                    strokeWidth={2.5} 
                    className="w-1/2 h-1/2 text-white group-hover:text-black group-hover:translate-x-2 group-hover:-translate-y-2 transition-all duration-500 ease-out" 
                />
            </div>
            
            {/* Mobile Arrow Indicator */}
             <div className="md:hidden w-full flex justify-center mt-4">
                 <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <ArrowUpRight strokeWidth={2.5} className="text-white group-hover:text-black" size={32} />
                 </div>
             </div>
        </div>
      </a>
    </section>
  );
};

export default StartProject;