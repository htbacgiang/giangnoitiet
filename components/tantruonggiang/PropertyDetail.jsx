import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { projects } from "../../components/tantruonggiang/data/projects";
import ServiceSection from "../../components/tantruonggiang/ServiceSection";
import { useState, useEffect, useMemo } from "react";
import { FaArrowLeft, FaArrowRight, FaBuilding, FaHome, FaUser, FaPalette, FaRulerCombined, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarCheck, FaExpand, FaTimes } from "react-icons/fa";

// Force Tailwind to include these gradient classes
const GRADIENT_CLASSES = {
  amber: 'bg-gradient-to-r from-amber-400 to-amber-600 from-amber-500 to-amber-600 from-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-700',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600 from-blue-500 to-blue-600',
  emerald: 'bg-gradient-to-br from-emerald-400 to-emerald-600',
  black: 'bg-gradient-to-br from-black/70 via-black/50 to-black/30 bg-gradient-to-t from-black/80 via-transparent to-transparent',
  backdrop: 'backdrop-blur-sm backdrop-blur-xl'
};

const PropertyDetail = ({ project }) => {
  // Declare all hooks at the top, unconditionally
  const [currentImage, setCurrentImage] = useState(0);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");

  // Handle images with fallback using useMemo to avoid initialization issues
  const images = useMemo(() => {
    if (!project) return [];
    return project.images?.length > 0 ? project.images : [project.image || "/fallback-image.jpg"];
  }, [project]);

  // Move useEffect above guard clause
  useEffect(() => {
    if (!project?.id) {
      setFeaturedProjects([]); // Set empty array if no project
      return;
    }
    const otherProjects = projects.filter((proj) => proj.id !== project.id);
    const randomProjects = getRandomProjects(otherProjects, 3);
    setFeaturedProjects(randomProjects);
  }, [project?.id]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen || images.length === 0) return;

      switch (e.key) {
        case 'Escape':
          closeImageModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          const prevIndex = currentImage === 0 ? images.length - 1 : currentImage - 1;
          setCurrentImage(prevIndex);
          setModalImage(images[prevIndex]);
          break;
        case 'ArrowRight':
          e.preventDefault();
          const nextIndex = currentImage === images.length - 1 ? 0 : currentImage + 1;
          setCurrentImage(nextIndex);
          setModalImage(images[nextIndex]);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, currentImage, images]);

  // Guard clause after all hooks
  if (!project) {
    return <div className="text-center text-gray-600 py-10">Dự án không tồn tại</div>;
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Vui lòng nhập họ và tên";
    if (!formData.phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại";
    if (!formData.email.trim()) newErrors.email = "Vui lòng nhập email";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email không hợp lệ";
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập yêu cầu của bạn";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("Đang gửi...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Không thể kết nối với máy chủ");
      }

      const result = await response.json();
      setStatus("Gửi thông tin thành công!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus(`Lỗi: ${error.message || "Không thể gửi thông tin. Vui lòng thử lại sau."}`);
    }
  };

  // Get random projects for featured section
  const getRandomProjects = (projectsArray, count) => {
    const shuffled = [...projectsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Image navigation
  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Get location icon and color
  const getLocationIcon = (location) => {
    return location === "Chung cư" ? <FaBuilding className="w-4 h-4" /> : <FaHome className="w-4 h-4" />;
  };

  const getLocationColor = (location) => {
    return location === "Chung cư" ? "text-purple-600" : "text-blue-600";
  };

  const getLocationBgColor = (location) => {
    return location === "Chung cư" ? "bg-purple-50" : "bg-blue-50";
  };

  // Image modal functions
  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setModalImage("");
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <Head>
        <title>{project.title} | Nội thất GreenLa Home</title>
        <meta
          name="description"
          content={`Khám phá dự án ${project.title} tại ${project.location} – thi công nội thất cao cấp cho ${project.customer}.`}
        />
      </Head>
      <div className="bg-gray-50 text-gray-900 min-h-screen">
        {/* Hero Section with Enhanced Design */}
        <div className="relative h-[45vh] md:h-[45vh] w-full overflow-hidden pt-5">
          <Image
            src={project.image || "/fallback-image.jpg"}
            alt={`Hình ảnh chính của ${project.title}`}
            layout="fill"
            objectFit="cover"
            className="scale-105 hover:scale-100 transition-transform duration-700"
            priority
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30 gradient-black-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent gradient-hero-overlay"></div>

          {/* Content positioned for better visual hierarchy */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {/* Top section with breadcrumb and project info */}
            <div className="p-6 md:p-10">
            </div>

            {/* Bottom section with main content */}
            <div className="p-6 md:p-10 pb-12 md:pb-16">
              <div className="max-w-4xl mb-3">
                <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 backdrop-blur-sm rounded-full border border-amber-300/30 mb-3 mt-3">
                  <FaCalendarCheck className="w-4 h-4 text-amber-300 mr-2" />
                  <span className="text-amber-100 text-sm font-medium">Dự án hoàn thành</span>
                </div>

                <h1 className="text-2xl md:text-3xl  font-bold text-white mb-3 leading-tight">
                  {project.title}
                </h1>

                {/* Compact Project Info in Hero */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
                  {/* Customer Info */}
                  <div className="glass-card rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 gradient-amber-400-600 flex items-center justify-center shadow-md">
                        <FaUser className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-amber-200 uppercase tracking-wide font-medium">Khách hàng</p>
                        <p className="text-sm font-bold text-white leading-tight">{project.customer}</p>
                      </div>
                    </div>
                  </div>

                  {/* Style Info */}
                  <div className="glass-card rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 gradient-purple-400-600 flex items-center justify-center shadow-md">
                        <FaPalette className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-purple-200 uppercase tracking-wide font-medium">Phong cách</p>
                        <p className="text-sm font-bold text-white leading-tight">{project.style}</p>
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="glass-card rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 gradient-blue-400-600 flex items-center justify-center shadow-md">
                        {getLocationIcon(project.location)}
                      </div>
                      <div>
                        <p className="text-xs text-blue-200 uppercase tracking-wide font-medium">Loại hình</p>
                        <p className="text-sm font-bold text-white leading-tight">{project.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Area Info */}
                  <div className="glass-card rounded-xl p-3 transition-all duration-300 hover:scale-105">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 gradient-emerald-400-600 flex items-center justify-center shadow-md">
                        <FaRulerCombined className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-emerald-200 uppercase tracking-wide font-medium">Diện tích</p>
                        <p className="text-sm font-bold text-white leading-tight">{project.area}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <nav aria-label="Breadcrumb" className="mb-3 font-bold">
                <div className="flex items-center space-x-2 text-sm md:text-base">
                  <Link href="/">
                    <span className="text-white/80 hover:text-amber-300 cursor-pointer transition-all duration-300 font-medium">
                      Trang chủ
                    </span>
                  </Link>
                  <span className="text-white/60">•</span>
                  <Link href="/du-an">
                    <span className="text-white/80 hover:text-amber-300 cursor-pointer transition-all duration-300 font-medium">
                      Dự án
                    </span>
                  </Link>
                  <span className="text-white/60">•</span>
                  <span className="text-amber-300 font-semibold">{project.title}</span>
                </div>
              </nav>
            </div>

          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/2 right-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-10 w-24 h-24 bg-amber-300/10 rounded-full blur-2xl"></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-10 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">

              {/* Enhanced Image Gallery */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                  Hình ảnh dự án
                </h2>

                {/* Main Image Display */}
                <div className="relative mb-8 group">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <Image
                      src={images[currentImage]}
                      alt={`Hình ảnh ${currentImage + 1} của ${project.title}`}
                      width={800}
                      height={400}
                      className="w-full h-[50vh] md:h-[60vh] object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Gradient overlay for better button visibility */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Enhanced Navigation Buttons */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    aria-label="Ảnh trước"
                  >
                    <FaArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm text-gray-800 p-4 rounded-full shadow-2xl hover:bg-white hover:scale-110 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    aria-label="Ảnh tiếp theo"
                  >
                    <FaArrowRight className="w-5 h-5" />
                  </button>

                  {/* Expand button for modal */}
                  <button
                    onClick={() => openImageModal(images[currentImage])}
                    className="absolute top-6 right-6 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:bg-black/70 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    aria-label="Xem ảnh lớn"
                  >
                    <FaExpand className="w-4 h-4" />
                  </button>

                  {/* Enhanced Indicators */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImage(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentImage === index ? "bg-amber-400 scale-125" : "bg-white/70 hover:bg-white"
                          }`}
                        aria-label={`Chuyển đến ảnh ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Image counter */}
                  <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImage + 1} / {images.length}
                  </div>
                </div>

                {/* Enhanced Thumbnails Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${currentImage === index
                          ? "ring-2 ring-amber-400 ring-offset-2 shadow-xl"
                          : "hover:shadow-lg"
                        }`}
                      onClick={() => setCurrentImage(index)}
                    >
                      <div className="relative">
                        <Image
                          src={image}
                          alt={`Hình ảnh phụ ${index + 1} của ${project.title}`}
                          width={200}
                          height={150}
                          className="w-full h-20 md:h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                        {/* Overlay for active state */}
                        {currentImage === index && (
                          <div className="absolute inset-0 bg-amber-400/20 flex items-center justify-center">
                            <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-bold">✓</span>
                            </div>
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="lg:w-1/3 space-y-8">
              {/* Enhanced Contact Form */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-blue-50 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-amber-600 gradient-amber-400-600 rounded-2xl flex items-center justify-center mr-4">
                      <FaCalendarCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Đặt lịch tư vấn</h2>
                      <p className="text-gray-600 text-sm">Miễn phí 100%</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Họ và tên *"
                          aria-label="Họ và tên"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-0 focus:bg-white transition-all duration-300 ${errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-amber-400"
                            }`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaEnvelope className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email *"
                          aria-label="Email"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-0 focus:bg-white transition-all duration-300 ${errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-amber-400"
                            }`}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <FaPhone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Số điện thoại *"
                          aria-label="Số điện thoại"
                          className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-0 focus:bg-white transition-all duration-300 ${errors.phone ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-amber-400"
                            }`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Mô tả chi tiết yêu cầu của bạn..."
                          aria-label="Yêu cầu của bạn"
                          rows="4"
                          className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-2xl focus:outline-none focus:ring-0 focus:bg-white transition-all duration-300 resize-none ${errors.message ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-amber-400"
                            }`}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                            {errors.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "Đang gửi..."}
                      className="w-full bg-gradient-to-r from-amber-500 to-amber-600 gradient-amber-500-600 hover:gradient-amber-600-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                      {status === "Đang gửi..." ? (
                        <span className="flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Đang gửi...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <FaCalendarCheck className="w-5 h-5 mr-2" />
                          Đặt lịch tư vấn miễn phí
                        </span>
                      )}
                    </button>
                  </form>

                  {status && (
                    <div className={`mt-6 p-4 rounded-2xl text-center font-medium ${status.includes("thành công")
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                      }`}>
                      {status}
                    </div>
                  )}

                  {/* Trust indicators */}
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span>Miễn phí 100%</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <span>Phản hồi 24h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Featured Projects */}
              <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 gradient-blue-500-600 rounded-xl flex items-center justify-center mr-3">
                    <FaBuilding className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Dự án tiêu biểu</h2>
                </div>
                <div className="space-y-6">
                  {featuredProjects.map((featuredProject) => (
                    <Link
                      key={featuredProject.id}
                      href={`/du-an/${featuredProject.slug}`}
                      className="block group"
                    >
                      <div className="bg-gray-50 rounded-2xl p-2 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-amber-200">
                        <div className="relative overflow-hidden rounded-xl mb-3">
                          <Image
                            src={featuredProject.image}
                            alt={featuredProject.title}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            Xem chi tiết →
                          </div>
                        </div>
                        <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300 text-sm">
                          {featuredProject.title}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          {featuredProject.customer} • {featuredProject.location}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ServiceSection />

        {/* Enhanced Image Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
            onClick={closeImageModal}
          >
            <div className="relative max-w-7xl max-h-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button - better positioned for mobile */}
              <button
                onClick={closeImageModal}
                className="absolute -top-12 right-0 md:-top-16 md:-right-4 text-white hover:text-gray-300 transition-colors duration-300 z-10 bg-black/30 backdrop-blur-sm p-2 rounded-full"
                aria-label="Đóng modal (ESC)"
              >
                <FaTimes className="w-6 h-6 md:w-8 md:h-8" />
              </button>

              <div className="relative">
                <Image
                  src={modalImage}
                  alt="Hình ảnh chi tiết dự án"
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[85vh] md:max-h-[90vh] object-contain rounded-xl md:rounded-2xl shadow-2xl"
                  quality={95}
                  priority
                />

                {/* Navigation in modal - responsive */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const newIndex = currentImage === 0 ? images.length - 1 : currentImage - 1;
                        setCurrentImage(newIndex);
                        setModalImage(images[newIndex]);
                      }}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label="Ảnh trước (←)"
                    >
                      <FaArrowLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={() => {
                        const newIndex = currentImage === images.length - 1 ? 0 : currentImage + 1;
                        setCurrentImage(newIndex);
                        setModalImage(images[newIndex]);
                      }}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 md:p-3 rounded-full hover:bg-white/30 transition-all duration-300"
                      aria-label="Ảnh tiếp theo (→)"
                    >
                      <FaArrowRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Image counter in modal - responsive */}
              <div className="absolute -bottom-12 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium">
                {currentImage + 1} / {images.length}
              </div>

              {/* Instructions for desktop */}
              <div className="hidden md:block absolute -bottom-12 left-0 text-white/70 text-sm">
                <div className="flex items-center space-x-4">
                  <span>ESC để đóng</span>
                  <span>← → để điều hướng</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetail;

export async function getStaticPaths() {
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = projects.find((p) => p.slug === params.slug);
  return { props: { project: project || null } };
}