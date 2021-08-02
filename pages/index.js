import { Flex } from '@chakra-ui/react';
import { Layout } from '@components/Layout';
import UploadForm from '@components/UploadForm';

export default function Index() {
  return (
    <Layout>
      <Flex direction="column">
        <UploadForm />
      </Flex>
    </Layout>
  );
}
