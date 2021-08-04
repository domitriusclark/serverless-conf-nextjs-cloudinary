import { Flex, Image } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import UploadForm from '@components/UploadForm';
import { buildImageUrl } from 'cloudinary-build-url';
import cleanText from '@utils/cleanText';

export default function Index() {
  const title = cleanText('Servlerless Conf');
  const date = cleanText('08/21');
  const tags = cleanText('#serverless #cloudinary');

  const url = buildImageUrl('og-images/serverless-conf-og', {
    cloud: {
      cloudName: 'mdnextjs',
    },
    transformations: {
      // Define our title layer
      chaining: [
        {
          gravity: 'center',
          y: '-100',
          overlay: `text:Arial_90:${title}`,
        },
        {
          gravity: 'north_east',
          y: 20,
          x: 20,
          overlay: `text:Arial_40:${date}`,
        },
        {
          gravity: 'south_east',
          y: 10,
          x: 20,
          overlay: `text:Arial_40:${tags}`,
        },
      ],
    },
  });

  return (
    <Layout>
      <Flex direction="column" justify="center" align="center">
        <UploadForm />

        <Image src={url} h="630px" w="1200px" border="1px solid black" />
      </Flex>
    </Layout>
  );
}
