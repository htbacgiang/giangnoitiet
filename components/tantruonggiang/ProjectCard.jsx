// components/tantruonggiang/ProjectCard.jsx
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaEye, FaQuoteLeft, FaBuilding, FaHome, FaRulerCombined, FaPalette, FaUser } from "react-icons/fa";

const ProjectCard = ({ project, onQuoteClick }) => {
  const getLocationIcon = (location) => {
    return location === "Chung cư" ? <FaBuilding className="w-4 h-4" /> : <FaHome className="w-4 h-4" />;
  };

  const getLocationColor = (location) => {
    return location === "Chung cư" ? "text-purple-600" : "text-blue-600";
  };

  const getLocationBgColor = (location) => {
    return location === "Chung cư" ? "bg-purple-50" : "bg-blue-50";
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden relative transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-gray-200 hover:border-orange-300 shadow-lg hover:shadow-orange-100">
      
      {/* Image Container */}
      <div className="relative h-80 overflow-hidden">
        <Image
          src={project.image}
          alt={`Hình ảnh chính của ${project.title}`}
          width={400}
          height={320}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        {/* Overlay with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getLocationColor(project.location)} ${getLocationBgColor(project.location)} border border-current/20 shadow-sm flex items-center space-x-1`}>
            {getLocationIcon(project.location)}
            <span>{project.location}</span>
          </div>
        </div>

        {/* Hover Actions */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          <button
            className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
            onClick={onQuoteClick}
            aria-label={`Yêu cầu báo giá cho ${project.title}`}
          >
            <FaQuoteLeft className="w-4 h-4" />
            <span className="font-semibold">Báo giá</span>
          </button>
          
          <Link href={`/du-an/${project.slug}`}>
            <button className="flex items-center space-x-2 bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-gray-200">
              <FaEye className="w-4 h-4" />
              <span className="font-semibold">Chi tiết</span>
            </button>
          </Link>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1 rounded-full text-xs font-semibold text-gray-700 bg-white bg-opacity-90 border border-gray-200 shadow-sm">
            {project.images.length} ảnh
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-300" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {project.title}
        </h3>

        {/* Project Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
              <FaUser className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Khách hàng</p>
              <p className="font-semibold text-gray-800">{project.customer}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <FaPalette className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Phong cách</p>
              <p className="font-semibold text-gray-800">{project.style}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <FaRulerCombined className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Diện tích</p>
              <p className="font-semibold text-gray-800">{project.area}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
            <div className={`w-8 h-8 rounded-full ${getLocationBgColor(project.location)} flex items-center justify-center`}>
              <span className={getLocationColor(project.location)}>
                {getLocationIcon(project.location)}
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Loại hình</p>
              <p className="font-semibold text-gray-800">{project.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;