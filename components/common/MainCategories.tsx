import { FC, useState } from "react";

interface Props {
  onCategorySelect: (category: string | null) => void; // Hàm xử lý khi danh mục được chọn
}

const MainCategories: FC<Props> = ({ onCategorySelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null); // Lưu danh mục đang được chọn

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category); // Cập nhật trạng thái active
    onCategorySelect(category); // Gọi hàm callback
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full sm:w-11/12 md:w-11/12 rounded-3xl xl:rounded-full p-4 shadow-lg gap-4 flex sm:flex-row flex-wrap items-center justify-center bg-gray-100 mt-5">
        <button
          onClick={() => handleCategoryClick(null)} // Tất cả bài viết
          className={`rounded-full px-4 py-2 text-sm sm:text-base transition duration-300 ${
            activeCategory === null
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-50"
          }`}
        >
          Tất cả bài viết
        </button>
        <button
          onClick={() => handleCategoryClick("Dinh dưỡng & Thực đơn")}
          className={`rounded-full px-4 py-2 text-sm sm:text-base transition duration-300 ${
            activeCategory === "Dinh dưỡng & Thực đơn"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-50"
          }`}
        >
          Dinh dưỡng & Thực đơn
        </button>
        <button
          onClick={() => handleCategoryClick("Kiến thức cơ bản")}
          className={`rounded-full px-4 py-2 text-sm sm:text-base transition duration-300 ${
            activeCategory === "Kiến thức cơ bản"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-50"
          }`}
        >
          Kiến thức cơ bản
        </button>
        <button
          onClick={() => handleCategoryClick("Sức khỏe & Lối sống")}
          className={`rounded-full px-4 py-2 text-sm sm:text-base transition duration-300 ${
            activeCategory === "Sức khỏe & Lối sống"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-50"
          }`}
        >
          Sức khỏe & Lối sống
        </button>
        <button
          onClick={() => handleCategoryClick("Chăm sóc sau sinh")}
          className={`rounded-full px-4 py-2 text-sm sm:text-base transition duration-300 ${
            activeCategory === "Chăm sóc sau sinh"
              ? "bg-blue-800 text-white"
              : "hover:bg-blue-50"
          }`}
        >
          Chăm sóc sau sinh
        </button>
      </div>
    </div>
  );
};

export default MainCategories;
