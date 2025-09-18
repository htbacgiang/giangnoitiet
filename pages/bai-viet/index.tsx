import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { trimText } from "../../utils/helper";

import DefaultLayout from "../../components/layout/DefaultLayout";
import PaginatedPosts from "../../components/common/PaginatedPosts";
import MainCategories from "../../components/common/MainCategories";

import { formatPosts, readPostsFromDb } from "../../lib/utils";
import { PostDetail } from "../../utils/types";

type MetaData = {
  title: string;
  description: string;
  keywords: string;
  author: string;
  robots: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    url: string;
    siteName: string;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };
};

type Props = {
  posts: PostDetail[];
  meta: MetaData;
};

const Blogs: NextPage<Props> = ({ posts, meta }) => {
  const [filteredPosts, setFilteredPosts] = useState<PostDetail[]>(posts || []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fallback meta in case it's still undefined
  const safeMeta = meta || {
    title: "Blog Giang Nội Tiết",
    description: "Blog về tiểu đường thai kỳ",
    keywords: "tiểu đường thai kỳ",
    author: "Giang Nội Tiết",
    robots: "index, follow",
    canonical: "https://giangnoitiet.vn/bai-viet",
    og: {
      title: "Blog Giang Nội Tiết",
      description: "Blog về tiểu đường thai kỳ",
      type: "website",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      imageWidth: "1200",
      imageHeight: "630",
      url: "https://giangnoitiet.vn/bai-viet",
      siteName: "Giang Nội Tiết",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog Giang Nội Tiết",
      description: "Blog về tiểu đường thai kỳ",
      image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
    },
  };

  const postsPerPage = 8;

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredPosts(posts.filter((post) => post.category === category));
    } else {
      setFilteredPosts(posts);
    }
  };

  const featuredPosts = filteredPosts.slice(0, 5);
  const recentPosts = filteredPosts.slice(5);

  return (
    <DefaultLayout>
      <Head>
        <title>{safeMeta.title}</title>
        <meta name="description" content={safeMeta.description} />
        <meta name="keywords" content={safeMeta.keywords} />
        <meta name="author" content={safeMeta.author} />
        <meta name="robots" content={safeMeta.robots} />
        <link rel="canonical" href={safeMeta.canonical} />
        {/* Open Graph */}
        <meta property="og:title" content={safeMeta.og.title} />
        <meta property="og:description" content={safeMeta.og.description} />
        <meta property="og:type" content={safeMeta.og.type} />
        <meta property="og:url" content={safeMeta.og.url} />
        <meta property="og:image" content={safeMeta.og.image} />
        <meta property="og:image:width" content={safeMeta.og.imageWidth} />
        <meta property="og:image:height" content={safeMeta.og.imageHeight} />
        <meta property="og:site_name" content={safeMeta.og.siteName} />
        {/* Twitter */}
        <meta name="twitter:card" content={safeMeta.twitter.card} />
        <meta name="twitter:title" content={safeMeta.twitter.title} />
        <meta name="twitter:description" content={safeMeta.twitter.description} />
        <meta name="twitter:image" content={safeMeta.twitter.image} />
      </Head>

      <div className="h-[80px] "></div>
      <div className="pb-8">
        <div className="flex flex-col gap-4 justify-center w-full ">
          <h1 className="visually-hidden">Blog Giang Nội Tiết - Kiến thức chuyên sâu về Tiểu đường Thai kỳ</h1>
          {/* Breadcrumb */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-5">
              <div className="flex items-center gap-3 text-base">
                <Link href="/" className="font-semibold text-gray-700 hover:text-blue-600 hover:underline whitespace-nowrap transition-colors duration-200">
                  Trang chủ
                </Link>
                <span className="text-blue-400 font-bold text-lg">›</span>
                <span className="font-bold text-gray-800 bg-blue-100 px-3 py-1 rounded-full text-sm">
                  Blog Tiểu đường Thai kỳ
                </span>
              </div>
            </div>
          </div>

          {/* Featured Posts */}
          <section className="relative py-4 px-2 lg:px-12 ">
            <p className="text-3xl font-bold text-gray-900 mb-6 text-center">Bài viết nổi bật</p>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Featured */}
                {featuredPosts[0]?.thumbnail && (
                  <div className="lg:col-span-8">
                    <article className="group relative">
                      <Link href={`/bai-viet/${featuredPosts[0].slug}`}>
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                          {/* Image */}
                          <Image
                            src={featuredPosts[0].thumbnail!}
                            layout="fill"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            alt={featuredPosts[0].title}
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          {/* Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                            <div className="mb-4">
                              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                                Nổi bật
                              </span>
                            </div>
                            <h3 className="text-xl lg:text-2xl font-bold mb-3 line-clamp-2 group-hover:text-blue-200 transition-colors duration-300">
                              {featuredPosts[0].title}
                            </h3>
                            <p className="text-gray-200 text-sm lg:text-base line-clamp-2 opacity-90">
                              {trimText(featuredPosts[0].meta, 160)}
                            </p>
                          </div>
                          {/* Hover Effect */}
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-2xl transition-all duration-300"></div>
                        </div>
                      </Link>
                    </article>
                  </div>
                )}
                {/* Secondary Featured */}
                <div className="lg:col-span-4 space-y-4 mt-2">
                  {featuredPosts.slice(1, 5).map((post, idx) => (
                    post.thumbnail && (
                      <article key={idx} className="group">
                        <Link href={`/bai-viet/${post.slug}`}>
                          <div className="bg-white rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-blue-200">
                            <div className="flex gap-2 items-start">
                              {/* Image */}
                              <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={post.thumbnail!}
                                  layout="fill"
                                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                                  alt={post.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              </div>
                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm lg:text-base line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                                  {post.title}
                                </h3>
                                <p className="text-gray-600 text-xs lg:text-sm line-clamp-2 leading-relaxed">
                                  {trimText(post.meta, 80)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </article>
                    )
                  ))}
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-xl"></div>
          </section>

          {/* Main Categories */}
          <MainCategories onCategorySelect={handleCategorySelect} />

          {/* Recent Posts */}
          <div className="my-2 px-4 lg:px-12">
            <p className="text-3xl font-bold text-gray-900 mb-6 text-center">Bài viết gần đây</p>
            <PaginatedPosts
              posts={recentPosts}
              postsPerPage={postsPerPage}
            />
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const posts = await readPostsFromDb();
    const formattedPosts = formatPosts(posts);

    const meta: MetaData = {
      title: "Blog Giang Nội Tiết - Kiến thức & Kinh nghiệm về Tiểu đường Thai kỳ",
      description: "Giang Nội Tiết chia sẻ kiến thức, kinh nghiệm và thực đơn giúp mẹ bầu kiểm soát tiểu đường thai kỳ hiệu quả. Tìm hiểu cách chăm sóc sức khỏe cho mẹ và bé.",
      keywords: "tiểu đường thai kỳ, kiến thức tiểu đường thai kỳ, kinh nghiệm trị tiểu đường thai kỳ, ăn uống tiểu đường thai kỳ, thực đơn cho mẹ bầu tiểu đường, Giang Nội Tiết",
      author: "Giang Nội Tiết",
      robots: "index, follow",
      canonical: "https://giangnoitiet.vn/bai-viet",
      og: {
        title: "Blog Giang Nội Tiết - Kiến thức & Kinh nghiệm về Tiểu đường Thai kỳ",
        description: "Giang Nội Tiết chia sẻ kiến thức, kinh nghiệm và thực đơn giúp mẹ bầu kiểm soát tiểu đường thai kỳ hiệu quả. Tìm hiểu cách chăm sóc sức khỏe cho mẹ và bé.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn/bai-viet",
        siteName: "Giang Nội Tiết",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Giang Nội Tiết - Kiến thức & Kinh nghiệm về Tiểu đường Thai kỳ",
        description: "Giang Nội Tiết chia sẻ kiến thức, kinh nghiệm và thực đơn giúp mẹ bầu kiểm soát tiểu đường thai kỳ hiệu quả. Tìm hiểu cách chăm sóc sức khỏe cho mẹ và bé.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      },
    };

    return {
      props: {
        posts: formattedPosts,
        meta,
      },
    };
  } catch (error) {
    console.error(error);
    
    // Provide fallback meta data when there's an error
    const fallbackMeta: MetaData = {
      title: "Blog Giang Nội Tiết - Kiến thức về Tiểu đường Thai kỳ",
      description: "Giang Nội Tiết chia sẻ kiến thức và kinh nghiệm về tiểu đường thai kỳ.",
      keywords: "tiểu đường thai kỳ, blog sức khỏe, Giang Nội Tiết",
      author: "Giang Nội Tiết",
      robots: "index, follow",
      canonical: "https://giangnoitiet.vn/bai-viet",
      og: {
        title: "Blog Giang Nội Tiết - Kiến thức về Tiểu đường Thai kỳ",
        description: "Giang Nội Tiết chia sẻ kiến thức và kinh nghiệm về tiểu đường thai kỳ.",
        type: "website",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
        imageWidth: "1200",
        imageHeight: "630",
        url: "https://giangnoitiet.vn/bai-viet",
        siteName: "Giang Nội Tiết",
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog Giang Nội Tiết - Kiến thức về Tiểu đường Thai kỳ",
        description: "Giang Nội Tiết chia sẻ kiến thức và kinh nghiệm về tiểu đường thai kỳ.",
        image: "https://giangnoitiet.vn/images/anh-bia-giang-noi-tiet.jpg",
      },
    };

    return {
      props: {
        posts: [],
        meta: fallbackMeta,
      },
    };
  }
};

export default Blogs;