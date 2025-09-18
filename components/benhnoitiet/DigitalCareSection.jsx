export default function DigitalCareSection() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
          We provide digital care solutions in hospitals every day of the year.
        </h2>

        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Superior Multi-specialty Care
                </h3>
                <p className="text-gray-600">
                  Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis lectus. Donec sollicitudin molestie malesuada, lacinia eget consectetur sed, convallis at tellus accumsan tincidunt. Curabitur non nulla.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Advanced Digital Technology and Tools
                </h3>
                <p className="text-gray-600">
                  Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis lectus. Donec sollicitudin molestie malesuada, lacinia eget consectetur sed, convallis at tellus accumsan tincidunt. Curabitur non nulla.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Better Outcomes, More Revenue
                </h3>
                <p className="text-gray-600">
                  Nulla porttitor accumsan tincidunt. Curabitur non nulla sit amet nisl tempus convallis lectus. Donec sollicitudin molestie malesuada, lacinia eget consectetur sed, convallis at tellus accumsan tincidunt. Curabitur non nulla.
                </p>
              </div>
            </div>
          </div>

          {/* Image Placeholder */}
          <div className="w-full lg:w-1/2 lg:pl-12">
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-center px-4">
                Image Placeholder (Replace with digital care illustration)
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}