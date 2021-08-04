import React from 'react';

import { Text, Button, Input, Flex, Image } from '@chakra-ui/react';

export default function UploadForm() {
  const [fileToUpload, setFileToUpload] = React.useState();
  const [publicId, setPublicId] = React.useState('');
  const [image, setImage] = React.useState();

  function onChange(e) {
    setFileToUpload(e.target.files[0]);
  }

  function onSubmit() {
    let formData = new FormData();
    formData.append('image', fileToUpload);
    formData.append('folder', 'og-images');
    formData.append('public_id', publicId);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Key': 'application/json' },
    })
      .then((res) => res.json())
      .then((result) => setImage(result));
  }

  return (
    <Flex direction="column" align="center" justify="center">
      <Text>Upload to Cloudinary</Text>
      <Input
        placeholder="Image title"
        onChange={(e) => setPublicId(e.target.value)}
        my={5}
      />
      <Input type="file" onChange={onChange} my={5} />
      <Button my={5} onClick={() => onSubmit(fileToUpload)}>
        Upload Photo
      </Button>
      {image && <Image mt={10} src={image.url} />}
    </Flex>
  );
}
