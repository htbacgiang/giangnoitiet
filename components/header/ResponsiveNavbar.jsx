import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { FaRegUser, FaTiktok, FaFacebook, FaYoutube, FaLinkedin, FaInstagram } from "react-icons/fa";
import { HiOutlineSearch, HiOutlineHome, HiOutlineBookOpen, HiOutlineDocumentText, HiOutlinePhone, HiOutlineCalendar } from "react-icons/hi";

const ResponsiveMenu = ({ isOpen, toggleMenu, onRegisterClick }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const menuItems = [
    { name: "Trang chủ", link: "/", icon: HiOutlineHome, hasDropdown: false },
    { name: "Giang Nội Tiết Là Ai", link: "/gioi-thieu", icon: FaRegUser, hasDropdown: false },
    { name: "Công cụ", link: "/cong-cu-kiem-tra-tieu-duong-thai-ky", icon: HiOutlineCalendar, hasDropdown: false },
    { name: "Bài viết", link: "/bai-viet", icon: HiOutlineDocumentText, hasDropdown: false },
    { name: "Liên hệ", link: "/lien-he", icon: HiOutlinePhone, hasDropdown: false },
  ];

  return (
    <>
      {/* Modern Overlay with BT Academy styling */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-teal-900/20 via-emerald-900/20 to-teal-900/20 backdrop-blur-md z-[99999] transition-all duration-700 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      ></div>

      {/* Modern Sidebar Menu with BT Academy design */}
      <div
        className={`fixed top-0 left-0 w-[80%] max-w-md h-full bg-white/95 backdrop-blur-xl shadow-2xl z-[999999] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-all duration-700 ease-out overflow-hidden border-r border-gray-100`}
      >
        {/* BT Academy Header with gradient */}
        <div className="relative bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-lg border border-white/30 overflow-hidden">
                <Image 
                  src="/logo-giang-noi-tiet-2.png" 
                  alt="Giang Nội Tiết Logo" 
                  width={40} 
                  height={40}
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="text-white font-bold text-xl">Giang Nội Tiết</span>
                <p className="text-white/80 text-base">Chuyên khoa nội tiết</p>
              </div>
            </div>
            <button
              onClick={toggleMenu}
              className="p-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300 group border border-white/20"
            >
              <AiOutlineClose
                size={20}
                className="text-white group-hover:scale-110 transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Modern Search with BT Academy styling */}
        <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full px-4 py-4 pl-14 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 shadow-lg transition-all duration-300 text-gray-700 placeholder-gray-400"
            />
            <HiOutlineSearch
              className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <HiOutlineSearch className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Modern Menu Items with BT Academy styling */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2 px-6 py-1">
            {menuItems.map((item, index) => (
              <li key={index} className="group">
                <div className="flex items-center">
                  {item.hasDropdown ? (
                    <button 
                      className="flex items-center px-4 py-2 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 hover:text-teal-600 font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:shadow-lg border border-transparent hover:border-teal-100 flex-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 flex items-center justify-center mr-4 group-hover:from-teal-500 group-hover:to-emerald-500 transition-all duration-300">
                        <item.icon 
                          size={20} 
                          className="text-teal-600 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <span className="text-lg uppercase">{item.name}</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                      </div>
                    </button>
                  ) : (
                    <Link 
                      href={item.link} 
                      className="flex items-center px-4 py-2 rounded-2xl text-gray-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 hover:text-teal-600 font-semibold transition-all duration-300 group-hover:translate-x-2 group-hover:shadow-lg border border-transparent hover:border-teal-100 flex-1"
                      onClick={toggleMenu}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-teal-100 to-emerald-100 flex items-center justify-center mr-4 group-hover:from-teal-500 group-hover:to-emerald-500 transition-all duration-300">
                        <item.icon 
                          size={20} 
                          className="text-teal-600 group-hover:text-white transition-colors duration-300" 
                        />
                      </div>
                      <span className="text-lg uppercase">{item.name}</span>
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"></div>
                      </div>
                    </Link>
                  )}
                  
                  {/* Dropdown Toggle Button */}
                  {item.hasDropdown && (
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="p-2 rounded-xl hover:bg-teal-50 transition-all duration-300 ml-2 group/btn"
                    >
                      {activeDropdown === index ? (
                        <HiChevronUp className="w-5 h-5 text-gray-600 group-hover/btn:text-teal-600 transition-colors duration-300" />
                      ) : (
                        <HiChevronDown className="w-5 h-5 text-gray-600 group-hover/btn:text-teal-600 transition-colors duration-300" />
                      )}
                    </button>
                  )}
                </div>
                
               
              </li>
            ))}
          </ul>
        </div>

        {/* Modern Social Media & CTA Section */}
        <div className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          {/* Call to Action Button */}
          <div className="mb-6">
            <button 
              onClick={() => {
                onRegisterClick();
                toggleMenu();
              }}
              className="w-full bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-600 hover:from-teal-700 hover:via-emerald-700 hover:to-teal-700 text-white px-6 py-4 rounded-2xl font-bold text-center block transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Đăng ký ngay
            </button>
          </div>
          
          {/* Social Media Links */}
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-600 mb-4 uppercase tracking-wider">
              Theo dõi chúng tôi
            </p>
            <div className="flex justify-center space-x-4">
              {[
                { icon: FaFacebook, color: "hover:bg-blue-500", href: "https://facebook.com/giangnoitiet" },
                { icon: FaYoutube, color: "hover:bg-blue-400", href: "https://www.youtube.com/@giangnoitiet" },
                { icon: FaTiktok, color: "hover:bg-blue-600", href: "https://www.instagram.com/giangnoitiet" },
                { icon: FaInstagram, color: "hover:bg-pink-500", href: "https://www.instagram.com/giangnoitiet" }
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white rounded-2xl shadow-lg text-gray-600 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-xl hover:text-white border border-gray-100`}
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResponsiveMenu;
