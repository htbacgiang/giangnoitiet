import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [selectedDept, setSelectedDept] = useState({
    name: 'Crutches',
    image: '/placeholder-crutches.jpg', // Replace with actual image paths
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magni nemo libero debitis vitae sapiente quos, consectetur adipiscing elit.'
  });

  const departments = [
    {
      name: 'Crutches',
      image: '/placeholder-crutches.jpg',
      description: 'Support for mobility with crutches. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'X-ray',
      image: '/placeholder-xray.jpg',
      description: 'Advanced X-ray diagnostics. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Pulmonary',
      image: '/placeholder-pulmonary.jpg',
      description: 'Specialized pulmonary care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Cardiology',
      image: '/placeholder-cardiology.jpg',
      description: 'Expert cardiology services. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Dental care',
      image: '/placeholder-dental.jpg',
      description: 'Comprehensive dental treatments. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      name: 'Neurology',
      image: '/placeholder-neurology.jpg',
      description: 'Advanced neurological care. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Our Department Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">OUR DEPARTMENT</h2>
          <p className="text-gray-500 mb-8">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum the industry&apos;s standard dummy text.
          </p>

          {/* Department Cards */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
            {departments.map((dept) => (
              <div
                key={dept.name}
                className={`bg-${dept.name === 'Crutches' ? 'teal-500' : dept.name === 'X-ray' ? 'pink-100' : dept.name === 'Pulmonary' ? 'green-100' : dept.name === 'Cardiology' ? 'blue-100' : dept.name === 'Dental care' ? 'yellow-100' : 'purple-100'} text-${dept.name === 'Crutches' ? 'white' : 'gray-700'} p-6 rounded-lg shadow-md flex flex-col items-center cursor-pointer`}
                onClick={() => setSelectedDept(dept)}
              >
                <svg className="w-12 h-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={dept.name === 'Crutches' ? 'M12 14l9-5-9-5-9 5 9 5z' : dept.name === 'X-ray' ? 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' : dept.name === 'Pulmonary' ? 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' : dept.name === 'Cardiology' ? 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' : dept.name === 'Dental care' ? 'M12 8c-1.657 0-3 1.343-3 3v2h6v-2c0-1.657-1.343-3-3-3z' : 'M9 19c-5 0-7-3-7-7s2-7 7-7 7 3 7 7-2 7-7 7z'} />
                </svg>
                <h3 className="text-lg font-semibold">{dept.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Welcome Section */}
        <section className="flex flex-col lg:flex-row items-center">
          {/* Image Placeholder */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Image Placeholder (Replace with {selectedDept.image})</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-12">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome to <span className="text-teal-500">{selectedDept.name}</span>
            </h1>
            <p className="text-gray-600 mb-6">{selectedDept.description}</p>
            <button className="bg-teal-500 text-white px-6 py-3 rounded-full hover:bg-teal-600 transition">
              Read More
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}