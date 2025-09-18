import Link from 'next/link';

export default function AboutSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50/30 py-16 lg:py-24 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-teal-100/20 to-emerald-100/20 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Images */}
          <div className="relative grid grid-cols-2 grid-rows-2 gap-4 group">
            {/* Image 1 */}
            <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm ring-1 ring-white/40 shadow-xl h-64 group-hover:shadow-2xl transition-all duration-500">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-1.webp)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-300/60 to-emerald-300/60 rounded-full blur-sm animate-pulse"></div>
            </div>
            
            {/* Image 2 */}
            <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm ring-1 ring-white/40 shadow-xl h-64 group-hover:shadow-2xl transition-all duration-500">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-4.webp)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
            </div>
            
            {/* Image 3 */}
            <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm ring-1 ring-white/40 shadow-xl h-64 group-hover:shadow-2xl transition-all duration-500">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-3.webp)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
            </div>
            
            {/* Image 4 */}
            <div className="relative rounded-3xl overflow-hidden bg-white/60 backdrop-blur-sm ring-1 ring-white/40 shadow-xl h-64 group-hover:shadow-2xl transition-all duration-500">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ backgroundImage: `url(/images/giang-noi-tiet-2.webp)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-300/50 to-orange-300/50 rounded-full blur-sm animate-pulse delay-1000"></div>
            </div>
            
            {/* Center Experience Badge */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl text-teal-700 rounded-full w-36 h-36 sm:w-36 sm:h-36 flex flex-col items-center justify-center p-4 ring-1 ring-white/50 shadow-2xl shadow-teal-500/20">
              <span className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">12 Năm</span>
              <span className="text-sm sm:text-lg font-bold text-center leading-tight">Kinh Nghiệm</span>
            </div>
          </div>

          {/* Right Side - Text and Buttons */}
          <div className="space-y-3 relative">
            <div className="flex justify-center lg:justify-start">
              <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full ring-1 ring-teal-200/50 shadow-sm">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                <span className="text-teal-700 font-medium text-sm sm:text-base">Về Giang Nội Tiết</span>
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse delay-500"></div>
              </div>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-center lg:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-600">
                Nguyễn Thị Hương Giang
              </span>
              <br />
              <span className="text-slate-700 text-xl sm:text-2xl lg:text-3xl font-semibold">
                Chuyên gia Nội Tiết
              </span>
            </h2>
            
            <p className="text-slate-600/90 text-base sm:text-lg leading-relaxed max-w-2xl">
              Với hơn <span className="font-semibold text-teal-700">12 năm kinh nghiệm</span> tại Bệnh viện Nội Tiết Trung Ương, tôi chuyên tư vấn và điều trị các rối loạn nội tiết ở phụ nữ, đặc biệt là <span className="font-semibold text-emerald-700">tiểu đường thai kỳ</span>, giúp phụ nữ Việt Nam sống khỏe mạnh và tự tin qua mọi giai đoạn cuộc đời.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Service Card 1 */}
              <div className="group bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/50 rounded-2xl p-4 hover:shadow-lg hover:shadow-teal-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-xl group-hover:bg-teal-200 transition-colors">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-teal-700">Tư vấn Tiểu Đường Thai Kỳ</span>
                </div>
              </div>
              
              {/* Service Card 2 */}
              <div className="group bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-2xl p-4 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-2 rounded-xl group-hover:bg-emerald-200 transition-colors">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-emerald-700">Chuyên gia Nội Tiết</span>
                </div>
              </div>
              
              {/* Service Card 3 */}
              <div className="group bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/50 rounded-2xl p-4 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="bg-amber-100 p-2 rounded-xl group-hover:bg-amber-200 transition-colors">
                    <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-amber-700">Chăm sóc Phụ nữ</span>
                </div>
              </div>
              
              {/* Service Card 4 */}
              <div className="group bg-gradient-to-br from-slate-50 to-teal-50 border border-slate-200/50 rounded-2xl p-4 hover:shadow-lg hover:shadow-slate-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center space-x-3">
                  <div className="bg-slate-100 p-2 rounded-xl group-hover:bg-slate-200 transition-colors">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a3.5 3.5 0 113.5-3.5c1.589 0 3.094.783 4 2.072M7 14l5.182 5.182a2.25 2.25 0 003.182 0L23 14M7 14l9.06-9.06a2.25 2.25 0 00-3.182 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-slate-700">Cân bằng Nội Tiết</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link href="/gioi-thieu">
                <button className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl shadow-lg shadow-teal-500/25 hover:shadow-teal-600/30 hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.02] font-medium">
                  <span>Tìm Hiểu Thêm</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}