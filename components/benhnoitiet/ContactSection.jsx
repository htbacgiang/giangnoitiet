export default function ContactSection() {
  return (
    <section className="py-12 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Map Placeholder */}
          <div className="bg-gray-200 h-[400px] rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-center px-4">
              Map Placeholder (Replace with Google Maps embed or static image)
            </span>
          </div>

          {/* Contact Info Card (Overlay) */}
          <div className="absolute top-0 left-0 w-full lg:w-1/3 bg-blue-600 text-white p-6 rounded-lg shadow-md z-10 mt-[-20px] ml-4"> {/* Adjusted to ~20px overlap */}
            <h2 className="text-2xl font-bold mb-4">Contacts Info</h2>
            <p><strong>Address:</strong> 312 Clinton Circle Atlantic City, NJ 080522</p>
            <p><strong>Phone:</strong> +1 (135) 1984 2020</p>
            <p><strong>Email:</strong> information@tefri.com</p>
            <p><strong>Time:</strong> Every day 24 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
}