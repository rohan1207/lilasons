import { notFound } from "next/navigation";
import BlogDetail from "@/components/pages/BlogDetail";
import { BLOGS, getBlog } from "@/lib/blogs";

export function generateStaticParams() {
  return BLOGS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) return { title: "Blog | Lilasons Developers" };
  return {
    title: `${post.title} | Lilasons Developers`,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getBlog(slug);
  if (!post) notFound();
  return <BlogDetail post={post} />;
}
