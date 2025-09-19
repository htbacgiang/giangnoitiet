import "../styles/globals.css";
import "../styles/toast.css";
import "../styles/dashboard.css";
import "../styles/about-animations.css";
import { Rajdhani } from "next/font/google";
import { Provider } from "react-redux";
import store from "../store";
import { SessionProvider } from "next-auth/react"
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

let persistor = persistStore(store);
// Khởi tạo font Rajdhani từ Google Fonts
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});
  function MyApp({ Component, pageProps: { session, meta, ...pageProps } }) {
  
  return (
      <>
          {meta && (
            <Head>
              <title>{meta.title}</title>
              <meta name="description" content={meta.description} />
              <meta name="keywords" content={meta.keywords} />
              <meta name="robots" content={meta.robots} />
              <meta name="author" content={meta.author} />
              <link rel="canonical" href={meta.canonical} />
              
              {/* Additional SEO meta tags */}
              <meta name="geo.region" content="VN" />
              <meta name="geo.placename" content="Hà Nội" />
              <meta name="language" content="vi" />
              <meta name="revisit-after" content="7 days" />
              <meta name="theme-color" content="#059669" />
              <meta name="msapplication-TileColor" content="#059669" />
              
              {/* Open Graph */}
              <meta property="og:title" content={meta.og.title} />
              <meta property="og:description" content={meta.og.description} />
              <meta property="og:type" content={meta.og.type} />
              <meta property="og:image" content={meta.og.image} />
              <meta property="og:image:width" content={meta.og.imageWidth} />
              <meta property="og:image:height" content={meta.og.imageHeight} />
              <meta property="og:image:alt" content="Giang Nội Tiết - Chuyên gia tư vấn tiểu đường thai kỳ miễn phí cho mẹ bầu" />
              <meta property="og:image:type" content="image/jpeg" />
              <meta property="og:url" content={meta.og.url} />
              
              {/* Twitter */}
              <meta name="twitter:card" content={meta.twitter.card} />
              <meta name="twitter:title" content={meta.twitter.title} />
              <meta name="twitter:description" content={meta.twitter.description} />
              <meta name="twitter:image" content={meta.twitter.image} />
              
              {/* JSON-LD */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "MedicalOrganization",
                    "name": "Giang Nội Tiết",
                    "url": "https://giangnoitiet.vn",
                    "logo": "https://giangnoitiet.vn/logo-giang-noi-tiet-2.png",
                    "image": "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
                    "description": "Giang Nội Tiết – Chuyên gia tư vấn tiểu đường thai kỳ MIỄN PHÍ cho phụ nữ mang thai. Hướng dẫn kiểm soát đường huyết, chế độ ăn uống và chăm sóc sức khỏe.",
                    "sameAs": ["https://www.facebook.com/giangnoitiet"],
                    "contactPoint": {
                      "@type": "ContactPoint",
                      "telephone": "+84948907686",
                      "contactType": "customer service",
                      "areaServed": "VN",
                      "availableLanguage": ["Vietnamese"],
                      "serviceType": "Tư vấn tiểu đường thai kỳ miễn phí"
                    },
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Đồng Xung, Đồng Tân",
                      "addressLocality": "Ứng Hòa",
                      "addressRegion": "Hà Nội",
                      "addressCountry": "VN"
                    }
                  })
                }}
              />
            </Head>
          )}
          <SessionProvider session={session}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <div className="font-arial">
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    style={{ zIndex: 10001 }}
                  />
                  <Component {...pageProps} />
                </div>
              </PersistGate>
            </Provider>
          </SessionProvider>
        </>
  );
}

export default MyApp;