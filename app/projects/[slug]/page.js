import { notFound } from "next/navigation";
import ProjectDetail from "@/components/pages/ProjectDetail";
import { getProject, PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project | Lilasons Developers" };
  return {
    title: `${project.title} | Lilasons Developers`,
    description: project.summary,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}
