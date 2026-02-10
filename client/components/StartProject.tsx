import React from 'react';
import { Link } from 'react-router-dom';

const StartProject: React.FC = () => {
  return (
    <section className="bg-black border-t border-white/10 overflow-hidden w-full">
      <Link to="/contact" className="block w-full group cursor-hover">
        <div className="page-container flex flex-col md:flex-row items-center justify-between py-16 md:py-24 gap-8">
          <div className="relative overflow-hidden">
            <h2 className="font-body font-black 
    text-[8vw] md:text-[8vw] 
    leading-[0.85] tracking-tighter 
    text-white uppercase 
    text-center md:text-left 
    whitespace-normal break-words 
    transition-all duration-700 
 
    group-hover:text-primary">
              Start a Web Project
            </h2>
          </div>




        </div>
      </Link>
    </section>
  );
};

export default StartProject;
