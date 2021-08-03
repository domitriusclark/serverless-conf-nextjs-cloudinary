import hydrate from 'next-mdx-remote/hydrate';
import { BLOG_CONTENT_PATH } from '@config/constants';
import { getMdxContent } from '@utils/get-mdx-content';
import components from '@components/MDXComponents';
import { Box, Heading } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import { buildImageUrl } from 'cloudinary-build-url';

export default function BlogPost({ mdxSource, frontMatter, url }) {
  const content = hydrate(mdxSource, { components });
  const { title, description } = frontMatter;

  return (
    <Layout
      title={title}
      description={description}
      openGraph={{
        title,
        url: `http://localhost:3001/blog/example`,
        images: [
          {
            url,
            width: '1200px',
            height: '630px',
            alt: 'Blog post meta',
          },
        ],
      }}
      twitter={{
        title,
        cardType: 'summary_large_image',
      }}
    >
      <Box>
        <Heading as="h1" pb="1rem">
          {title}
        </Heading>
        {content}
      </Box>
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getMdxContent(BLOG_CONTENT_PATH);
  const paths = posts.map(({ slug }) => ({
    params: {
      slug: slug.split('/'),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const posts = await getMdxContent(BLOG_CONTENT_PATH);
  const postSlug = slug.join('/');
  const [post] = posts.filter((post) => post.slug === postSlug);

  if (!post) {
    console.warn(`No content found for slug ${postSlug}`);
  }

  function cleanText(text) {
    return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
  }

  const url = buildImageUrl('og-images/serverless-conf-og', {
    cloud: {
      cloudName: 'mdnextjs',
    },
    transformations: {
      chaining: [
        {
          gravity: 'center',
          y: '-100',
          overlay: `text:Arial_70:${cleanText(post.data.title)}`,
        },
        {
          gravity: 'north_east',
          y: '20',
          x: '20',
          overlay: `text:Arial_40:${cleanText(post.data.date)}`,
        },
        {
          gravity: 'south_east',
          y: '10',
          x: '20',
          overlay: `text:Arial_40:${cleanText(post.data.tags)}`,
        },
      ],
    },
  });

  return {
    props: {
      mdxSource: post.mdx,
      frontMatter: post.data,
      url,
    },
  };
}
