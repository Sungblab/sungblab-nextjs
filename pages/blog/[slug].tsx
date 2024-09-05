import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Layout, Comments, BlogPost } from "../../components/Components";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkUnwrapImages from "remark-unwrap-images";
import { ParsedUrlQuery } from "querystring";

interface BlogPostPageProps {
  title: string;
  date: string;
  content: string;
  slug: string;
}

interface BlogPostParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({
  title,
  date,
  content,
  slug,
}) => {
  return (
    <Layout>
      <Head>
        <title>{title} | Sungblab's Blog</title>
        <meta name="description" content={`Read ${title} on Sungblab's blog`} />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <article className="prose lg:prose-xl mx-auto">
          <h1 className="text-3xl font-semibold mb-4">{title}</h1>
          <p className="text-gray-500 mb-6">{date}</p>
          <BlogPost content={content} />
        </article>
        <Comments postSlug={slug} />
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "content/blog");
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(".md", "") },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  BlogPostPageProps,
  BlogPostParams
> = async ({ params }) => {
  if (!params?.slug) {
    return {
      notFound: true,
    };
  }

  const slug = params.slug;
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const processedContent = await remark()
      .use(html)
      .use(remarkUnwrapImages)
      .process(content);

    const contentHtml = processedContent.toString();

    return {
      props: {
        title: data.title,
        date: data.date,
        content: contentHtml,
        slug,
      },
    };
  } catch (error) {
    console.error(`Error processing blog post ${slug}:`, error);
    return {
      notFound: true,
    };
  }
};

export default BlogPostPage;
