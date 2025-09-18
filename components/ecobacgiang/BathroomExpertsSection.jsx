import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BathroomExpertsSection = () => {
  return (
    <div className="bg-gray-50 h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Images collage */}
          <div className="relative">
            {/* Main large image - bottom center */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
              <Image
                src="/images/banner-1.png"
                alt="Modern bathroom"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Top left small image */}
            <div className="absolute -top-8 -left-8 w-48 h-32 rounded-2xl overflow-hidden shadow-lg z-10">
              <Image
                src="/images/banner-2.png"
                alt="Bathroom interior"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Bottom right image (moved from bottom left) */}
            <div className="absolute -bottom-12 -right-12 w-56 h-40 rounded-2xl overflow-hidden shadow-lg z-10">
              <Image
                src="/images/menu-banner-1.jpg"
                alt="Bathroom fixtures"
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Right side - Content exactly like the reference */}
          <div className="pl-8">
            {/* Welcome badge */}
            <div className="mb-6">
              <span className="text-orange-400 text-xs font-medium uppercase tracking-widest">
                WELCOME TO COMPANY
              </span>
            </div>
            
            {/* Main heading exactly like reference */}
            <h2 className="text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-8">
              We are bathrooms
              <br />
              <span className="font-light">& experts.</span>
            </h2>
            
            {/* Description paragraph */}
            <p className="text-gray-600 text-lg leading-relaxed mb-12">
              The company is recognized as a world leader in 
              bathroom design and offers products and services of 
              exceptional quality.
            </p>
            
            {/* About button exactly like reference */}
            <div>
              <Link href="/gioi-thieu-ecobacgiang">
                <button className="inline-flex items-center space-x-3 bg-transparent border-2 border-gray-800 text-gray-800 font-medium px-8 py-3 hover:bg-gray-800 hover:text-white transition-all duration-300">
                  <span className="text-sm uppercase tracking-wider">ABOUT COMPANY</span>
                  <svg 
                    className="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BathroomExpertsSection;
