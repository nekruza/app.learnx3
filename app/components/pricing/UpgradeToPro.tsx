"use client";
import React from 'react';
import { Box, Typography, Button, Grid, Card } from '@mui/material';
import { brandColors } from '@/components/utils/brandColors';

function UpgradeToPro() {

  return (
    <Box
      sx={{
        height: '100vh',
        overflow: 'auto',
        backgroundImage: `url(/bg1.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        maxWidth={800}
        sx={{
          background: "white",
          gap: 2
        }}
        m="auto"
        p={["20px", "30px 40px"]}
        boxShadow='0 2px 17px rgba(0,0,0,.08)'
        border='.5px solid #ebeeff'
        borderRadius='10px'
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >

        <Typography variant="h8" fontWeight="bold" textAlign={["center", "left"]} sx={{
          color: brandColors.lightPurple,
          m: "auto"
        }}>
          Pricing
        </Typography>
        <Typography variant="h4" fontWeight="bold" textAlign={["center", "left"]}>
          Select your plan and start speaking!
        </Typography>
        <Typography variant="subtitle1" textAlign={["center", "left"]} mb={2}>
          100% of profit goes to supporting education of disadvantaged people
        </Typography>

        <Grid container spacing={4}>
          {PricingData.map((plan, index) => (
            <Grid item xs={12} md={6} key={index}>
              <PricingCard {...plan} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box >
  );
}

function PricingCard({ title, subtitle, price, period, buttonText, features }: any) {
  const isPro = title === "Professional";

  return (
    <Card variant="outlined" sx={{
      height: '100%',
      backgroundColor: "#f7f7f7",
      boxShadow: '0 2px 17px rgba(0,0,0,.08)',
      border: '.5px solid #ebeeff'
    }}>
      <Box display="flex" padding={2} flexDirection="column" justifyContent="space-between" height="100%">
        <Box display="flex" flexDirection="column" padding={2}>
          <Typography variant="h6" gutterBottom fontWeight="bold">{title}</Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>{subtitle}</Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom >
            {price}
            <Typography component="span" variant="body1" fontWeight="normal">
              {period}
            </Typography>
          </Typography>
          {features.map((feature: string, index: number) => (
            <Typography key={index} variant="body2" paragraph sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ color: '#3eb1c8' }}>✅</span> {feature}
            </Typography>
          ))}
        </Box>
        <Button
          variant={isPro ? "contained" : "outlined"}
          color={isPro ? "primary" : "inherit"}
          fullWidth
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))",
            color: 'white',
            fontWeight: 600,
            transition: "transform 0.3s ease-in-out",
            '&:hover': {
              transform: "scale(1.02)",
              boxShadow: "0 4px 17px rgba(0,0,0,.08)",
            }
          }}
        >
          {buttonText}
        </Button>
      </Box>
    </Card>
  );
}

const PricingData = [
  {
    title: "Standard",
    subtitle: "Start for free, no credit card needed.",
    price: "Free",
    period: "",
    buttonText: "Continue with Free",
    features: [
      "1 speaking session per week",
      "Limited access to AI tutor",
      "Limited access to learning materials",
      "Earn points and track progress"
    ]
  },
  {
    title: "Pro",
    subtitle: "Unlock the full potential of your language learning journey",
    price: "$10",
    period: "/month",
    buttonText: "Upgrade to Pro",
    features: [
      "Unlimited speaking sessions",
      "24/7 access to AI tutor",
      "Personalized AI-generated content",
      "Advanced progress tracking",
      "Priority customer support",
      "Money-back guarantee"
    ]
  }
];

export default UpgradeToPro;
