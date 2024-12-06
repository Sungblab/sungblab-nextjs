import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
}

const SEO = ({
  title,
  description,
  ogImage,
  keywords,
}: SEOProps): JSX.Element => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords?.join(", ")} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEO;
