import Link from 'next/link';

export default function BlogCard() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/blog-image1.jpg')" }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">The Benefits of Mindfulness</h3>
              <p className="text-sm text-gray-500 mb-2">May 24, 2025</p>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <Link href="/blog1">
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-all">
                  READ MORE +
                </button>
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/blog-image2.jpg')" }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Healthy Eating Habits</h3>
              <p className="text-sm text-gray-500 mb-2">May 24, 2025</p>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <Link href="/blog2">
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-all">
                  READ MORE +
                </button>
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/blog-image3.jpg')" }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Exercise for Mental Health</h3>
              <p className="text-sm text-gray-500 mb-2">May 24, 2025</p>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <Link href="/blog3">
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-all">
                  READ MORE +
                </button>
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('/blog-image4.jpg')" }} />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sleep and Wellness</h3>
              <p className="text-sm text-gray-500 mb-2">May 24, 2025</p>
              <p className="text-sm text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
              </p>
              <Link href="/blog4">
                <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-all">
                  READ MORE +
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}