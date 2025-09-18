import Image from "next/image";

export default function ServiceSection() {
  // Placeholder image paths (replace with your actual image paths)
  const services = [
    {
      image: "/product/banner2.jpg",
      caption: "Thi công nội thất biệt thự",
    },
    {
      image: "/product/banner3.jpg",
      caption: "Thi công nội thất chung cư",
    },
    {
      image: "/product/nha-pho.jpg",
      caption: "Thi công nội thất nhà phố",
    },
    {
      image: "/product/nha-pho.jpg",
      caption: "Thi công nội thất khác",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 to-black py-12">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-black text-2xl md:text-3xl font-bold mb-4">
            Dịch vụ thi công nội thất tại
            <span className="text-amber-500"> Q8 Design</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Image Container - Landscape Aspect Ratio */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.caption}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-black uppercase text-base font-semibold group-hover:text-amber-400 transition-colors duration-300">
                  {service.caption}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}