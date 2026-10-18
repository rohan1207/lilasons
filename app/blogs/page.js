import BlogsIndex from "@/components/pages/BlogsIndex";
import { BLOGS_PAGE } from "@/lib/blogs";

export const metadata = {
  title: "Blogs | Lilasons Developers",
  description: BLOGS_PAGE.body,
  openGraph: {
    title: "Blogs | Lilasons Developers",
    description: BLOGS_PAGE.body,
  },
};

export default function Page() {
  return <BlogsIndex />;
}
