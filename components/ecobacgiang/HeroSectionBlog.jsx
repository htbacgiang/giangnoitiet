import React from 'react';

const HeroSectionBlog = ({ label = 'Blog Tiểu Đường Thai Kỳ', heading = 'Kiến Thức Chuyên Sâu Về Tiểu Đường Thai Kỳ – Bảo Vệ Mẹ Và Bé' }) => {
  return (
    <section
      className="relative py-12 px-4 flex flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-10 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-green-200/20 rounded-full blur-3xl"></div>
      </div>
      {/* Label */}
      <div className="relative z-10 text-emerald-700 font-medium  tracking-wider mb-3 bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-emerald-200 ring-1 ring-emerald-100">
        {label}
      </div>
      {/* Main Heading */}
      <h2
        id="hero-heading"
        className="relative z-10 text-[1.3rem] md:text-3xl font-bold text-center leading-tight max-w-5xl mx-auto bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-4 mb-4"
      >
        {heading}
      </h2>
      
      {/* Decorative underline */}
      <div className="relative z-10 w-24 h-1 bg-gradient-to-r from-emerald-500 to-green-600 mx-auto rounded-full"></div>
    
    </section>
  );
};

export default HeroSectionBlog;