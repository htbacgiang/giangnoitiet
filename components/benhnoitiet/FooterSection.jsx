import React from 'react';

export default function FooterSection() {
  const items = [
    {
      icon: (
        <svg className="w-8 h-8 mx-auto text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a10 10 0 0 1 7 17M12 2a10 10 0 0 0-7 17M5 5a10 10 0 0 1 14 0M5 19a10 10 0 0 0 14 0" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      text: 'Soluta nobis eleifend optionisim congue nihil usus impedit',
    },
    {
      icon: (
        <svg className="w-8 h-8 mx-auto text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 2H9a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
          <path d="M12 6v12M9 9h6M9 15h6" />
        </svg>
      ),
      text: 'Typi non habent claritatem insitam est usus legentis',
    },
    {
      icon: (
        <svg className="w-8 h-8 mx-auto text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="6" r="2" /><circle cx="6" cy="12" r="2" /><circle cx="6" cy="18" r="2" />
          <circle cx="12" cy="6" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="12" cy="18" r="2" />
          <circle cx="18" cy="6" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="18" cy="18" r="2" />
        </svg>
      ),
      text: 'Nonummy nibh euismod tincidunt laoreet dolore magna',
    },
  ];

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            {item.icon}
            <p className="text-gray-600 text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}