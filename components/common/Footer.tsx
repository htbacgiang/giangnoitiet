import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGraduationCap, FaBookOpen, FaUsers, FaAward, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const [location, setLocation] = useState({ ip: "", city: "", country: "" });
  useEffect(() => {
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => setLocation(data))
      .catch(() => setLocation({ ip: "Không xác định", city: "N/A", country: "N/A" }));
  }, []);

  const features = [
    {
      title: "Giáo dục chất lượng cao",
      description: "Đào tạo chuyên nghiệp",
      icon: <FaGraduationCap className="text-teal-600" />,
    },
    {
      title: "Chương trình đa dạng",
      description: "Từ cơ bản đến nâng cao",
      icon: <FaBookOpen className="text-teal-600" />,
    },
    {
      title: "Giảng viên kinh nghiệm",
      description: "Đội ngũ chuyên gia",
      icon: <FaUsers className="text-teal-600" />,
    },
    {
      title: "Chứng chỉ uy tín",
      description: "Được công nhận rộng rãi",
      icon: <FaAward className="text-teal-600" />,
    },
  ];

  return (
    <div className="bg-white">

      {/* Main Footer */}
      <footer className="bg-gradient-to-br from-teal-50 to-teal-100">
        <div className="container mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-3">
              <Link href="/" className="inline-block mb-2">
                <div className="flex items-center space-x-3">
                  {/* Logo hình ảnh với nền gradient xanh lá */}
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    <Image 
                      src="/logo-giang-noi-tiet-2.png" 
                      alt="Giang Nội Tiết Logo" 
                      width={48} 
                      height={48}
                      className="object-contain brightness-0 invert"
                    />
                  </div>
                  
                  {/* Chữ Giang Nội Tiết */}
                  <div className="flex flex-col">
                    <span className="text-xl font-bold uppercase text-gray-800 leading-tight hover:text-teal-600 transition-colors duration-300">Giang Nội Tiết</span>
                  </div>
                </div>
              </Link>
              <p className="text-gray-700 leading-relaxed text-base">
                Giang Nội Tiết chuyên tư vấn tiểu đường thai kỳ. Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao và chăm sóc sức khỏe toàn diện cho phụ nữ.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-base" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">Đồng Xung, Ứng Hòa, Hà Nội</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <FaPhone className="text-white text-base" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">0948.907.686</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-white text-base" />
                  </div>
                  <span className="text-gray-700 text-base font-medium">giangnoitiet@gmail.com</span>
                </div>
              </div>
{/* 
              <div className="pt-4">
                <Image
                  src="/thongbaoBCT.png"
                  alt="Bộ Công Thương Logo"
                  width={120}
                  height={40}
                  className="opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div> */}
            </div>

            {/* About Us */}
            <div className="space-y-6">
              <p className="text-xl font-bold text-gray-800 border-b-2 border-teal-600 pb-2 inline-block">
                Về chúng tôi
              </p>
              <ul className="space-y-3">
                {[
                  { href: "/gioi-thieu", label: "Giang Nội Tiết Là Ai" },
                  { href: "/cong-cu-kiem-tra-tieu-duong-thai-ky", label: "Công cụ kiểm tra" },
                  { href: "/bai-viet", label: "Bài viết y khoa" },
                  { href: "/lien-he", label: "Liên hệ" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-700 hover:text-teal-600 font-medium text-base transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

   
            {/* Policies */}
            <div className="space-y-6">
              <p className="text-xl font-bold text-gray-800 border-b-2 border-teal-600 pb-2 inline-block">
                Chính sách
              </p>
              <ul className="space-y-3">
                {[
                  { href: "/huong-dan-su-dung-cong-cu", label: "Hướng dẫn sử dụng công cụ" },
                  { href: "/bao-mat", label: "Bảo mật thông tin" },
                  { href: "/tu-van", label: "Tư vấn miễn phí" }
                ].map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className="text-gray-700 hover:text-teal-600 font-medium text-base transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-teal-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Maps */}
            <div className="space-y-6 ">
              <p className="text-xl font-bold text-gray-800 border-b-2 border-teal-600 pb-2 inline-block">
                Vị trí của chúng tôi
              </p>
              <div className="w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.309861592884!2d105.84330317559623!3d21.020284180626888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135cb7bf100f7d1%3A0x97cceeb460f2b6ec!2zR2lhbmcgTsO0aSBUaeG6v3Q!5e0!3m2!1svi!2s!4v1757508252499!5m2!1svi!2s" 
                  width="100%" 
                  height="200" 
                  style={{border:0}} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-teal-200 bg-white">
          <div className="container mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-base text-gray-600">
                <span>Vị trí: <span className="font-semibold text-teal-600">{location.city}, {location.country}</span></span>
              </div>
              <div className="text-base text-gray-600">
                © 2025 <span className="font-semibold text-teal-600">giangnoitiet.vn</span>. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
