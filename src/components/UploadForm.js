import React from 'react';

import { Text, Button, Input, Stack, Flex, Image } from '@chakra-ui/react';

export default function UploadForm() {
  const [fileToUpload, setFileToUpload] = React.useState({});
  const [uploadStatus, setStatus] = React.useState('idle');
  const [publicId, setPublicId] = React.useState('');
  const [image, setImage] = React.useState();

  function onChange(event) {
    setFileToUpload({
      file: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  }

  async function onSubmit() {
    setStatus('uploading');
    var formdata = new FormData();
    formdata.append('image', fileToUpload.file);
    formdata.append('folder', `og-images`);
    formdata.append('public_id', publicId);

    fetch(`http://localhost:3001/api/upload`, {
      method: 'POST',
      body: formdata,
      headers: { 'Content-Key': 'application/json' },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setStatus('idle');
        setImage(result);
      })
      .catch((error) => setStatus(`Error: ${error}`));
  }

  return (
    <Flex
      rounded="md"
      alignItems="center"
      justifyContent="center"
      direction="column"
      w={400}
      height={600}
    >
      <Text fontSize="xl">Upload to Cloudinary</Text>

      <Stack w="80%" spacing={2} mt={5}>
        <Input
          w="92%"
          size="sm"
          fontSize="sm"
          placeholder="Title"
          onChange={(e) => setPublicId(e.target.value)}
        />
      </Stack>
      <Flex
        rounded="md"
        cursor="pointer"
        h="200px"
        width="80%"
        alignSelf="center"
        alignItems="center"
        justifyContent="center"
      >
        <input type="file" onChange={onChange} />
      </Flex>

      <Button
        size="lg"
        variant="outline"
        mt={4}
        onClick={() => onSubmit(fileToUpload)}
      >
        Upload Photo
      </Button>

      {fileToUpload && <Image mt={10} src={fileToUpload.preview} />}
    </Flex>
  );
}
