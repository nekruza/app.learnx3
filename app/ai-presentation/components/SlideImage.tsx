import { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '@/components/firebaseX';
import { constants } from '@/components/constants/constants';
import { usePresentationStore, useStoreUser } from '@/components/zustand';
import { v4 as uuidv4 } from 'uuid';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSearchParams } from 'next/dist/client/components/navigation';
import OpenAI from 'openai';
import { base64ToBlob } from '@/components/helpers/base64ToBlob';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DividerWithText from './DividerWithText';
import { updateNestedContent } from '../helpers/updateNestedContent';

interface SlideImageProps {
  currentImage?: string;
  path?: string[];
}

const SlideImage = ({ currentImage, path }: SlideImageProps) => {
  const [image, setImage] = useState<string>(currentImage || '');
  const [loading, setLoading] = useState(false);
  const { userInfo } = useStoreUser();
  const searchParams = useSearchParams();
  const isEditing = searchParams.get('edit') === 'true';
  const [imagePrompt, setImagePrompt] = useState<string>('');

  const { presentation, setPresentation } = usePresentationStore();

  const onImageUpdate = (imageUrl: string) => {
    setImage(imageUrl);
    const updatedPresentation = updateNestedContent({ path, value: imageUrl, presentation });
    setPresentation(updatedPresentation);
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const uniqueId = uuidv4();
      const imagePath = `${userInfo.uid}-${uniqueId}`;
      const storageRef = ref(
        storage,
        `${constants.FIREBASE_STORAGE_PRESENTATION_IMAGE_PATH}/${imagePath}`
      );

      await uploadBytesResumable(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);

      setImage(downloadUrl);
      onImageUpdate(downloadUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: imagePrompt,
        response_format: "b64_json",
      });

      const decodedImage = base64ToBlob(response.data[0].b64_json);
      if (!decodedImage) return;

      const uniqueId = uuidv4();
      const imagePath = `${userInfo.uid}-${uniqueId}`;
      const storageRef = ref(
        storage,
        `${constants.FIREBASE_STORAGE_PRESENTATION_IMAGE_PATH}/${imagePath}`
      );

      await uploadBytesResumable(storageRef, decodedImage);
      const downloadUrl = await getDownloadURL(storageRef);

      setImage(downloadUrl);
      onImageUpdate(downloadUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = () => {
    setImage('');
    onImageUpdate('');
  };

  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      gap: 2,
      width: '100%',
      padding: 2,
      minWidth: "400px",
      minHeight: "350px",
    }}>
      {image ? (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <img
            src={image}
            alt="Slide"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
          />
          {isEditing && (
            <IconButton
              onClick={handleDeleteImage}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)'
                },
                color: 'white'
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ) : (
        <Stack spacing={2} sx={{ display: isEditing ? 'flex' : 'none', flexDirection: 'column', width: '100%' }}>
          <Button
            component="label"
            variant="outlined"
            sx={{
              display: 'flex',
              width: '100%',
              height: '150px',
              border: '2px dashed #9F7AEA',
              color: '#9F7AEA',
              fontWeight: 600,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                border: '2px dashed #805AD5'
              }
            }}
          >
            {loading ? 'Uploading...' : 'Upload Image'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          <DividerWithText text="OR" />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <TextField
              label="Create an image with AI"
              value={imagePrompt}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#9F7AEA'
                  }
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#9F7AEA'
                }
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImagePrompt(e.target.value)}
            />

            <Button
              onClick={handleGenerateImage}
              disabled={loading}
              variant="contained"
              sx={{
                display: isEditing ? 'flex' : 'none',
                alignItems: 'center',
                gap: 1,
                backgroundColor: '#9F7AEA',
                '&:hover': {
                  backgroundColor: '#805AD5'
                }
              }}
            >
              <AutoFixHighIcon /> Generate with AI
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
};

export default SlideImage;