import Head from "next/head";
import { MdLocationOn, MdEmail, MdPhone, MdAccessTime } from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { pageMetas } from "../../utils/metaUtils";

// CSS Xanh lá siêu siêu gọn - Thu nhỏ
const s = {
  card: "bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border hover:shadow-xl transition-all duration-300 group hover:-translate-y-1",
  icon: "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-md",
  content: "flex flex-col items-center text-center",
  title: "text-xl font-bold text-gray-800 mb-3",
  text: "text-gray-600 leading-relaxed text-base",
  link: "font-medium transition-colors duration-300 text-base",
  colors: { g: "from-green-500 to-green-600 border-green-100 text-green-600 hover:text-green-700", e: "from-emerald-500 to-emerald-600 border-emerald-100 text-emerald-600 hover:text-emerald-700", l: "from-lime-500 to-lime-600 border-lime-100 text-lime-600 hover:text-lime-700" }
};

// Component xanh lá siêu gọn
const Card = ({ icon: Icon, title, content, href, color = "g", socials }) => {
  const c = s.colors[color].split(' ');
  return (
    <div className={`${s.card} ${c[1]}`}>
      <div className={s.content}>
        <div className={`${s.icon} bg-gradient-to-br ${c[0]}`}>
          <Icon className="text-white text-2xl" />
        </div>
        <h3 className={s.title}>{title}</h3>
        {socials ? (
          <div className="flex space-x-4">
            {socials.map(({ icon: Icon, href, name }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={`${c[2]} transition-colors duration-300`}>
                <Icon className="text-xl" />
              </a>
            ))}
          </div>
        ) : href ? (
          <a href={href} className={`${s.link} ${c[2]} ${title === 'Email' ? 'break-all' : ''}`}>{content}</a>
        ) : (
          <p className={s.text}>{content}</p>
        )}
      </div>
    </div>
  );
};

const contactInfo = {
  address: "Đồng Xung, Ứng Hòa, Hà Nội",
  email: "info@giangnoitiet.vn",
  phone: "+84 948 907 686",
  workingHours: "Hỗ trợ 24/7 qua Zalo",
  website: "giangnoitiet.vn",
  socials: [
    { icon: FaFacebook, href: "https://facebook.com/giangnoitiet", name: "Facebook" },
    { icon: FaInstagram, href: "https://www.instagram.com/giangnoitiet", name: "Instagram" },
    { icon: FaLinkedin, href: "https://linkedin.com/company/giangnoitiet", name: "LinkedIn" }
  ]
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://giangnoitiet.vn";

export default function ContactPage({ meta }) {
  return (
    <>
      <DefaultLayout 
        title={meta?.title}
        desc={meta?.description}
        thumbnail={meta?.og?.image}
        meta={meta}
      >
        {/* Hero Section */}
      <div className="h-[80px] bg-white"></div>

        <section className="bg-gradient-to-br from-emerald-50 to-green-50 py-16">

          <div className="relative container mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-900 bg-clip-text text-transparent mb-4">
                Liên Hệ Giang Nội Tiết
              </h1>
              <p className="text-lg text-emerald-600 max-w-4xl mx-auto">
                <strong>Chuyên gia tư vấn tiểu đường thai kỳ và bệnh nội tiết</strong><br/>
                Đồng hành cùng phụ nữ có thai trước, trong và sau khi sinh. Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn.
              </p>
            </div>

            {/* Contact Info Cards - Xanh lá thu nhỏ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              <Card icon={MdLocationOn} title="Địa Chỉ" content={contactInfo.address} color="g" />
              <Card icon={MdEmail} title="Email" content={contactInfo.email} href={`mailto:${contactInfo.email}`} color="e" />
              <Card icon={MdPhone} title="Điện Thoại" content={contactInfo.phone} href={`tel:${contactInfo.phone}`} color="l" />
              <Card icon={MdAccessTime} title="Giờ Làm Việc" content={contactInfo.workingHours} color="g" />
              <Card icon={() => <svg className="text-white text-2xl" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" /></svg>} title="Website" content={contactInfo.website} href={`https://${contactInfo.website}`} color="e" />
              <Card icon={FaFacebook} title="Mạng Xã Hội" socials={contactInfo.socials} color="l" />
            </div>

            {/* Additional Info Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-8 md:p-12 mb-20 text-white">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Tại Sao Chọn Giang Nội Tiết?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                  {[
                    { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Chuyên Môn Sâu", desc: "Bác sĩ nội tiết chuyên khoa với nhiều năm kinh nghiệm trong lĩnh vực tiểu đường thai kỳ và bệnh nội tiết" },
                    { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", title: "Đồng Hành Toàn Diện", desc: "Hỗ trợ phụ nữ có thai trong suốt hành trình trước, trong và sau khi sinh với sự quan tâm tận tâm" },
                    { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Hỗ Trợ 24/7", desc: "Dịch vụ tư vấn liên tục, sẵn sàng hỗ trợ bất cứ lúc nào bạn cần thiết" }
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d={icon} clipRule="evenodd" /></svg>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{title}</h3>
                      <p className="text-emerald-100">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Consultation Section */}
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-emerald-100 mb-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                  🚀 Đặt lịch tư vấn trực tiếp
                </h3>
                <p className="text-gray-600 mb-6">
                  Liên hệ với chúng tôi để được tư vấn chuyên sâu về tiểu đường thai kỳ và đồng hành trong suốt hành trình mang thai
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+84948907686">
                    <button className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                      📞 Gọi ngay
                    </button>
                  </a>
                  
                  <a href="https://zalo.me/g/cwbnrr136" target="_blank" rel="noopener noreferrer">
                    <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-[1.02]">
                      💬 Tham gia nhóm Zalo
                    </button>
                  </a>
                </div>

                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="text-sm text-emerald-800">
                    💡 <strong>Lưu ý:</strong> Để được tư vấn hiệu quả nhất, vui lòng chuẩn bị sẵn các chỉ số đường huyết gần đây, thông tin về tuần thai và tình trạng sức khỏe hiện tại.
                  </p>
                </div>
              </div>
            </div>

       
          </div>
        </section>
      </DefaultLayout>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: { 
      meta: pageMetas.contact 
    },
  };
}
