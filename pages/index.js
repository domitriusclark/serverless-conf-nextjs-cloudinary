import { Flex, Heading, Image } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import UploadForm from '@components/UploadForm';

import { buildImageUrl } from 'cloudinary-build-url';

export default function Index() {
  function cleanText(text) {
    return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
  }

  let title = cleanText('Serverless Conf');
  let date = cleanText('08/02');
  let tags = cleanText('#moar-serverless #cloudinary');

  const url = buildImageUrl('og-images/serverless-conf-og', {
    cloud: {
      cloudName: 'mdnextjs',
    },
    transformations: {
      chaining: [
        {
          gravity: 'center',
          y: '-100',
          overlay: `text:Arial_90:${title}`,
        },
        {
          gravity: 'north_east',
          y: '20',
          x: '20',
          overlay: `text:Arial_40:${date}`,
        },
        {
          gravity: 'south_east',
          y: '10',
          x: '20',
          overlay: `text:Arial_40:${tags}`,
        },
      ],
    },
  });

  return (
    <Layout>
      <Flex direction="column" justify="center" align="center">
        <UploadForm />
        <Flex direction="column">
          <Heading>Edit the OG image</Heading>
          <Image height="680px" width="1200px" src={url} />
        </Flex>
      </Flex>
    </Layout>
  );
}
