import React, { memo } from 'react';
import PropTypes from 'prop-types';

const FeaturedProductsHealth = ({ products = [], banners = [] }) => {
  // Format price in VND with Vietnamese number formatting
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="container mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8" aria-label="Sản phẩm hỗ trợ">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
        Sản phẩm hỗ trợ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
        {/* Left Banner Section (hidden on mobile, takes 1 column on larger screens) */}
        <div className="md:col-span-1 space-y-4 sm:space-y-6 hidden md:block">
          {banners.map((banner, index) => (
            <div key={`banner-${banner.src}-${index}`} className="w-full">
              <img
                src={banner.src}
                alt={banner.alt || `Banner ${index + 1}`}
                className="mt-4 mx-auto object-cover w-full h-auto rounded-lg"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/fallback-image.jpg';
                }}
              />
            </div>
          ))}
        </div>

        {/* Product Grid (2 columns on all screens, takes full width on mobile, 3 columns on larger screens) */}
        <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id || `${product.name}-${index}`}
              className="relative bg-white p-3 rounded-lg shadow-md text-center transition-transform hover:scale-105"
              role="article"
            >
              {product.isNew && (
                <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Mới
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="mx-auto mb-3 sm:mb-4 object-contain w-full aspect-square"
                loading="lazy"
                onError={(e) => {
                  e.target.src = '/fallback-image.jpg';
                }}
              />
              <h3 className="text-base sm:text-lg font-semibold">{product.name}</h3>
              <div className="flex justify-center space-x-2 mt-2">
                <span className="text-green-500 font-bold text-sm sm:text-base">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-gray-500 line-through text-sm sm:text-base">
                      {formatPrice(product.originalPrice)}
                    </span>
                 
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// PropTypes for type checking
FeaturedProductsHealth.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      isNew: PropTypes.bool,
      image: PropTypes.string.isRequired,
    })
  ),
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

// Default props
FeaturedProductsHealth.defaultProps = {
  products: [
    {
      id: '1',
      name: 'Xịt khử trùng',
      price: 800000,
      originalPrice: 1150000,
      isNew: true,
      image: '/product/1.png',
    },
    {
      id: '2',
      name: 'Ống nghe kỹ thuật số',
      price: 625000,
      originalPrice: 900000,
      isNew: true,
      image: '/product/2.png',
    },
    {
      id: '3',
      name: 'Hộp mỹ phẩm nhỏ',
      price: 1875000,
      originalPrice: 2300000,
      isNew: true,
      image: '/product/3.png',
    },
    {
      id: '4',
      name: 'Hộp mỹ phẩm lớn',
      price: 1950000,
      originalPrice: 2150000,
      isNew: true,
      image: '/product/4.png',
    },
    {
      id: '5',
      name: 'Găng tay y tế màu xanh',
      price: 3750000,
      originalPrice: 4500000,
      isNew: true,
      image: '/product/5.png',
    },
    {
      id: '6',
      name: 'Súng đo nhiệt độ',
      price: 3750000,
      originalPrice: 4500000,
      isNew: true,
      image: '/product/6.png',
    },
  ],
  banners: [
    { src: '/product/11.jpg', alt: 'Banner sản phẩm y tế 1' },
    { src: '/product/12.jpg', alt: 'Banner sản phẩm y tế 2' },
  ],
};

export default memo(FeaturedProductsHealth);