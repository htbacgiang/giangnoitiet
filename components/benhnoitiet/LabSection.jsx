import Link from 'next/link';
import { useState } from 'react';

export default function LabSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading and Subheading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Our New Laboratory</h1>
          <p className="mt-4 text-gray-500 text-sm">
            EXERCI TATION ULLAMCORPER SUSCIPIT LOBORTIS NISL UT ALIQUIP EX EA COMMODO NON HABENT
            <br />
            CLARITATEM INSTAMCONSEQUAT DUIS AUTEM MAXIM PLACERAT FACER POSSIM
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image with Play Button */}
          <div className="relative">
            <div className="w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
              {/* Thumbnail for the video */}
              <div
                className="w-full h-full bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: "url('/placeholder-lab-image.jpg')" }}
                onClick={openVideo}
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={openVideo}
                  className="bg-blue-500 bg-opacity-80 p-6 rounded-full hover:bg-opacity-100 transition-all"
                >
                  <svg
                    className="w-12 h-12 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Text Content and Button */}
          <div className="space-y-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Ut wisi enim ad minim veniam, quis laore nostrud exerci tation ulm hedi corper turet suscipit lobortis nisl ut aliquip erat volutpat autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Fest usus legentis in iis qui facit eorum claritatem. Investigationes demonstraverunt lectores legere me lius quod ii legunt saepius. Claritas est etiam processus dynamicus, qui sequitur mutationem notarum quam littera.
            </p>
            <Link href="/learn-more">
              <button className="bg-teal-400 text-white mt-4 px-6 py-3 rounded-full hover:bg-teal-500 transition-all flex items-center space-x-2">
                <span>Learn More</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeVideo}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            {/* Close Button */}
            <button
              onClick={closeVideo}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {/* Video Player */}
            <div className="relative pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
              <video
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                src="/placeholder-video.mp4"
                autoPlay
                controls
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}