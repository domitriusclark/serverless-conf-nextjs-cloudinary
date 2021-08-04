import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';

const App = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS>
      <DefaultSeo
        title="MDNext Blog Starter"
        description="Build your blog with best in class tools from the NextJS ecosystem. "
        url="https://mdnext.dev"
        twitter={{
          handle: '@domitriusclark',
          site: 'https://twitter.com/domitriusclark',
          title: 'MDNext Blog Starter',
          cardType: 'summary_large_image',
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
