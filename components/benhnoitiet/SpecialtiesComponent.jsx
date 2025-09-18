"use client";

import React from "react";

const SpecialtiesComponent = () => {
  const specialties = [
    { name: "Cardiology", icon: "https://via.placeholder.com/50?text=Heart", description: "Lorem ipsum is simply dummy text" },
    { name: "Pulmonology", icon: "https://via.placeholder.com/50?text=Lungs", description: "Lorem ipsum is simply dummy text" },
    { name: "Neurology", icon: "https://via.placeholder.com/50?text=Brain", description: "Lorem ipsum is simply dummy text" },
    { name: "Fever", icon: "https://via.placeholder.com/50?text=Thermometer", description: "Lorem ipsum is simply dummy text" },
    { name: "Oncology", icon: "https://via.placeholder.com/50?text=Cancer", description: "Lorem ipsum is simply dummy text" },
    { name: "Infection", icon: "https://via.placeholder.com/50?text=Virus", description: "Lorem ipsum is simply dummy text" },
    { name: "Hematology", icon: "https://via.placeholder.com/50?text=Blood", description: "Lorem ipsum is simply dummy text" },
    { name: "Paediatrician", icon: "https://via.placeholder.com/50?text=Child", description: "Lorem ipsum is simply dummy text" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-white">
      <div className="w-full max-w-6xl p-6 text-center">
        <h1 className="text-4xl font-bold text-black">
          Our Healthcare <span className="text-yellow-500">Specialties</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry’s standard dummy text ever since.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {specialties.map((specialty, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={specialty.icon} alt={`${specialty.name} Icon`} className="mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800">{specialty.name}</h3>
              <p className="mt-2 text-gray-600 text-sm">{specialty.description}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 transition">
          View All Specialists
        </button>
      </div>
    </div>
  );
};

export default SpecialtiesComponent;