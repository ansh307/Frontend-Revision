// /app/posts/[id]/generateStaticParams.ts
import { posts } from "@/lib/posts";

export function generateStaticParams() {
  console.log("⚙️ generateStaticParams running...");
  return posts.map((post) => ({
    id: post.id,
  }));
}
