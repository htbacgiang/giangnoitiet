import { useState, useRef } from 'react';
import { FaFacebookF, FaTiktok, FaInstagram, FaPlayCircle, FaYoutube } from 'react-icons/fa';
import Image from 'next/image';

const SOCIAL_LINKS = [
  {
    href: 'https://facebook.com/giangnoitiet',
    label: 'Facebook',
    Icon: FaFacebookF,
    colorClass: 'text-blue-600',
    hoverClass: 'hover:text-blue-700',
  },
  {
    href: 'https://www.tiktok.com/@giangnoitiettw',
    label: 'TikTok',
    Icon: FaTiktok,
    colorClass: 'text-black',
    hoverClass: 'hover:text-teal-500', // TikTok’s accent color for hover
  },
  {
    href: 'https://www.instagram.com/giangnoitiet',
    label: 'Instagram',
    Icon: FaInstagram,
    colorClass: 'text-pink-600',
    hoverClass: 'hover:text-pink-700',
  },
  {
    href: 'https://www.youtube.com/@giangnoitiet',
    label: 'YouTube',
    Icon: FaYoutube,
    colorClass: 'text-red-600',
    hoverClass: 'hover:text-red-700',
  },
];

const Popup = ({ isOpen, onClose, children, ariaLabel }) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-2 sm:p-4 rounded-lg w-full max-w-[90%] sm:max-w-[80%] md:max-w-[60%] mx-auto popup"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-0 sm:top-0 right-0 sm:right-0 text-gray-600 hover:text-gray-800"
          onClick={onClose}
          aria-label={ariaLabel}
        >
          <svg
            className="w-5 sm:w-6 h-5 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const Banner = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setIsVideoOpen(false);
  };

  return (
    <div className="relative bg-white text-slate-800 min-h-screen px-4 sm:px-6 md:px-12 py-6 md:py-10">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/banner-bg-1.webp"
          alt=""
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white via-emerald-50/40 to-green-50/40"></div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 md:mt-20 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="text-center md:text-left mb-6 sm:mb-8 md:mb-0 w-full md:w-1/2">
          <p className="text-xl md:text-[2rem] font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-500">
            Chào Mừng Bạn Đến Với Giang Nội Tiết
          </p>
          <p className="mt-3 sm:mt-4 text-slate-600/90 text-base sm:text-base">
            Nơi đồng hành cùng mẹ bầu trong hành trình vượt qua tiểu đường thai kỳ. Tại đây, bạn sẽ tìm thấy kiến thức y khoa dễ hiểu, thực đơn an toàn và những hướng dẫn chi tiết để kiểm soát đường huyết mỗi ngày. 💕
          </p>
          <div className="mt-4 sm:mt-5 px-3 py-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl ring-1 ring-emerald-200/50">
            <p className="text-emerald-700 font-semibold text-sm sm:text-base mb-2">Liên hệ ngay hôm để nhận ngay 2 món quà đặc biệt:</p>
            <ul className="text-slate-600 text-xs sm:text-base space-y-1 text-left">
              <li><strong>Thực đơn 7 ngày miễn phí</strong> – giúp mẹ dễ dàng kiểm soát đường huyết từng bữa ăn</li>
              <li><strong>Cộng đồng Zalo mẹ bầu TĐTK</strong> – nơi Giang đồng hành và chia sẻ cùng mẹ mỗi ngày</li>
            </ul>
          </div>
          <div className="mt-4 sm:mt-6 flex flex-row sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
            <a
              href="https://m.me/giangnoitiet"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white px-5 sm:px-6 py-3 sm:py-3 rounded-xl shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-300/60 hover:from-emerald-600 hover:to-emerald-800 hover:shadow-emerald-600/25 transition duration-300 text-base sm:text-base transform hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-emerald-400/60 text-center"
              aria-label="Liên hệ qua Facebook Messenger"
            >
             Liên hệ ngay
            </a>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group inline-flex items-center gap-3 text-emerald-700 justify-center bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 ring-1 ring-emerald-200 hover:ring-emerald-300 hover:bg-white/80 hover:shadow-md transition"
              aria-label="Xem video giới thiệu Giang Nội Tiết"
            >
              <span className="relative flex items-center justify-center">
                <FaPlayCircle className="w-6 sm:w-8 h-6 sm:h-8 animate-pulse-scale transition-transform duration-300 group-hover:scale-110 text-emerald-600" aria-hidden="true" />
                <span className="absolute inset-0 rounded-full bg-emerald-100 opacity-30 scale-90 animate-pulse-scale"></span>
              </span>
              Xem Video
            </button>
          </div>
          <div className="">
            <p className="mt-4 sm:mt-6 text-base sm:text-base  md:text-left text-slate-600">
              Có câu hỏi? Vui lòng liên hệ với chúng tôi
            </p>
            <div className="mt-4 sm:mt-6 flex items-center justify-center md:justify-start">
              <p className="text-base sm:text-base text-slate-600 mr-3 sm:mr-4">Mạng Xã Hội</p>
              <div className="flex gap-3 sm:gap-4">
                {SOCIAL_LINKS.map(({ href, label, Icon, colorClass, hoverClass }) => (
                  <a key={href} href={href} aria-label={label} className={`${colorClass} ${hoverClass} p-2 rounded-full bg-white/60 backdrop-blur ring-1 ring-slate-200 hover:ring-slate-300 hover:shadow-md transition duration-300 transform hover:-translate-y-0.5`}>
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="relative w-full md:w-1/2 mt-6 md:mt-12 flex justify-center">
          {/* Decorative background elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-emerald-100/30 via-green-100/20 to-emerald-100/30 rounded-full blur-3xl"></div>
          </div>

          {/* Main image container */}
          <div className="relative w-full max-w-[20rem] sm:max-w-[30rem] h-auto aspect-[4/5] group">
            {/* Glass card background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/40 backdrop-blur-xl rounded-3xl ring-1 ring-white/50 shadow-2xl shadow-emerald-500/10 p-3 sm:p-4 transform transition-transform duration-500 group-hover:scale-[1.02]">

              {/* Decorative shape behind image */}
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-200/40 via-green-200/30 to-emerald-200/40 rounded-2xl transform rotate-2 transition-transform duration-500 group-hover:rotate-1"></div>

              {/* Main image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/banner-img-1.webp"
                  alt="Doctor consulting for pregnancy diabetes"
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Gradient overlay for elegance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/10 rounded-2xl"></div>
              </div>

              {/* Floating badge */}

            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-300/40 to-green-300/40 rounded-full blur-sm animate-pulse"></div>
            <div className="absolute -bottom-6 -right-3 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-full blur-sm animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 -left-6 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-green-300/50 to-emerald-300/50 rounded-full blur-sm animate-bounce delay-500"></div>

            {/* Medical icons floating around */}
            <div className="absolute top-8 -right-8 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg ring-1 ring-emerald-200/50 animate-float">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            </div>

            <div className="absolute bottom-12 -left-6 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg ring-1 ring-emerald-200/50 animate-float delay-700">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <Popup isOpen={isVideoOpen} onClose={handleCloseVideo} ariaLabel="Close video popup">
        <video
          ref={videoRef}
          width="100%"
          height="auto"
          className="min-h-[200px] sm:min-h-[300px] md:min-h-[400px] w-full"
          controls
          autoPlay
          preload="metadata"
          poster="/images/video-placeholder.png"
        >
          <source src="/giang-noi-tiet.mp4" type="video/mp4" />
        </video>
      </Popup>

    </div>
  );
};

export default Banner;