"use client";
import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Card } from '@mui/material';
import { brandColors } from '@/components/utils/brandColors';
import ButtonX from '../ui/ButtonX';

function UpgradeToPro({ onClose }: { onClose: () => void }) {

  const [showPayment, setShowPayment] = useState(false);

  if (showPayment) {
    return <PaymentForm onClose={() => setShowPayment(false)} />
  }

  return (
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
            <PricingCard {...plan} onClose={onClose} setShowPayment={setShowPayment} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function PricingCard({ title, subtitle, price, period, buttonText, features, onClose, setShowPayment }: any) {
  const isPro = title === "Pro";

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
        <ButtonX
          text={buttonText}
          onClick={isPro ? () => setShowPayment(true) : onClose}
          style={{ width: "100%" }}
        />
      </Box>
    </Card>
  );
}

function PaymentForm({ onClose }: { onClose: () => void }) {
  return (
    <Box maxWidth={600} m="auto" p={["20px", "30px 40px"]} boxShadow='0 2px 17px rgba(0,0,0,.08)' border='.5px solid #ebeeff' borderRadius='10px' display="flex" flexDirection="column" justifyContent="center" alignItems="center">

      <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">Upgrade to Pro</Typography>
      <Box sx={{ mt: 2, }}>
        <Typography variant="body1" gutterBottom textAlign="center" mb={3}>
          To upgrade to Pro, please contact us via WhatsApp:
        </Typography>

        <Box display="flex" flexDirection={["column", "row"]} gap={2} justifyContent="center">
          <Typography variant="body1" gutterBottom textAlign="center" mb={2} p={1} borderRadius={1} fontWeight="bold" backgroundColor={brandColors.lightPurple} color="white" padding={"10px 20px"}>
            📱 WhatsApp Number: +44 7708582724
          </Typography>
        </Box>
      </Box>
    </Box>
  )
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
