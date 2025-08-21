import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      title: "Building Scalable React Applications",
      description:
        "Best practices and patterns for creating maintainable React applications that can grow with your team and business needs.",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "React",
      slug: "building-scalable-react-applications",
    },
    {
      title: "The Future of Web Development",
      description:
        "Exploring emerging technologies and trends that will shape the future of web development, from AI integration to edge computing.",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Web Development",
      slug: "future-of-web-development",
    },
    {
      title: "TypeScript Tips for Better Code",
      description:
        "Advanced TypeScript techniques and patterns that will help you write more type-safe and maintainable code.",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "TypeScript",
      slug: "typescript-tips-better-code",
    },
  ];

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Latest Articles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              I share my thoughts and experiences about web development,
              technology trends, and lessons learned from building digital
              products.
            </p>
            <div className="w-20 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <div className="mb-3">
                    <Badge
                      variant="secondary"
                      className="bg-tech-badge text-tech-badge-foreground"
                    >
                      {post.category}
                    </Badge>
                  </div>

                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="leading-relaxed">
                    {post.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    className="p-0 h-auto font-medium group-hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
