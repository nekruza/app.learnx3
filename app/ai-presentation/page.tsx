"use client"
import React, { useState } from 'react';
import { Box, Button, Card, Grid, CardContent, CardHeader, Input, Typography, Divider } from '@mui/material';
import OpenAiFina from '@/components/utils/OpenAiFina';
import presentationSchema from './utils/presentationSchema.json';
import presentationContent from './utils/presentationContent.json';
import { PresentationContent } from './utils/type';
import { usePresentationStore } from '@/components/zustand';
import { useRouter } from 'next/navigation';
import { brandColors } from '@/components/utils/brandColors';
import { LoadingSpinners } from '../components/constants/loadingSpinners';
import { SpinningCircles } from 'react-loading-icons';


const PresentationGenerator = () => {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const { setPresentation } = usePresentationStore();
  const router = useRouter();

  const presentation_schema = JSON.stringify(presentationContent);
  const generatePresentation = async () => {
    setLoading(true);
    try {
      const prompt = `Create a JSON object for an English language learning presentation on the topic "${topic}"`;
      const response = await OpenAiFina({
        model: "gpt-4o-2024-08-06",
        messages: [{
          role: "system",
          content: `You are an expert in creating English language learning presentations. Generate content based on the provided topic following the specified JSON structure which is ${presentation_schema}.`,
        }, { role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 16384,
        // @ts-ignore
        response_format: {
          type: "json_schema",
          json_schema: presentationSchema
        }
      });

      const generatedContent: PresentationContent = JSON.parse(response.choices[0].message.content || '');

      setPresentation(generatedContent);
      router.push(`/ai-presentation/1`);
    } catch (error) {
      console.error('Error generating presentation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <Typography variant='h4' sx={{ fontWeight: 600, color: '#1e293b' }}>Create a Presentation</Typography>
        <Typography variant='subtitle1' sx={{ color: '#475569' }}>What would you like to create?</Typography>
      </Box>


      <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
        <Input
          placeholder="Describe what you'd like to make"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          fullWidth
          sx={{
            backgroundColor: 'white',
            padding: '12px 16px',
            maxWidth: '400px',
            border: "1px solid #e5e7eb",
            borderRadius: '8px',
            '&::before': { display: 'none' },
            '&::after': { display: 'none' },
          }}
        />
        <Button
          onClick={generatePresentation}
          disabled={loading || !topic}
          fullWidth
          sx={{
            background: loading ? "#94a3b8" : brandColors.darkPurple,
            color: brandColors.yellow,
            maxWidth: 'max-content',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            paddingX: '16px',
            '&:disabled': {
              color: brandColors.lighterGrey,
              background: brandColors.darkPurple,
            },
            '&:hover': {
              background: loading ? "#94a3b8" : "#2d1571",
              cursor: loading ? "not-allowed" : "pointer",
            },
          }}
        >
          {loading ? <span> <SpinningCircles style={{ width: '16px', height: '16px', marginRight: '4px' }} /> Creating...</span> : <span>🚀 Create Presentation</span>}
        </Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', maxWidth: '700px', margin: "auto" }}>
        <Divider sx={{ flexGrow: 1, mx: 2 }} />
        <Typography variant='subtitle1' sx={{ color: '#475569', fontSize: '14px' }}>Example Prompts</Typography>
        <Divider sx={{ flexGrow: 1, mx: 2 }} />
      </Box>
      <Grid container spacing={2} sx={{ width: '100%', maxWidth: '700px' }}>
        {
          ['Past Simple vs Past Continuous', 'Common English Idioms', 'Conditional Sentences', 'Active vs Passive Voice'].map((example, index) => (
            <Grid key={index} item xs={6}>
              <Button onClick={() => setTopic(example)} sx={{ display: 'flex', width: '100%', textTransform: 'none', flexDirection: 'column', gap: 1, background: '#f8fafc', padding: 2, borderRadius: 2 }}>
                <Typography variant='subtitle2' sx={{ color: brandColors.darkerGrey }}>{example}</Typography>
              </Button>
            </Grid>
          ))
        }
      </Grid>
    </Box>
  );
};

export default PresentationGenerator;
