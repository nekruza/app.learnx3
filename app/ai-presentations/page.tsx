"use client"
import React from 'react';
import { Box, Grid, } from '@mui/material';
import { PresentationContent } from './utils/type';
import ApiServices from '@/api/ApiServices';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '@/components/LoadingPage';
import ErrorPage from '@/errorpage';
import dayjs from 'dayjs';
import { useStoreUser } from '@/components/zustand';
import CustomCard from '@/components/other/CustomCard';
import PresentationMainCard from './components/PresentationMainCard';


const PresentationList = () => {
  const { userInfo } = useStoreUser();
  const { apiRequest } = ApiServices()


  const {
    data: presentationsList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["presentationsList"],
    queryFn: () => apiRequest("GET", null, { collectionName: "presentations" }),
    refetchOnWindowFocus: false,
  })

  console.log(presentationsList)

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />


  return (

    <Box sx={{ gap: 4, height: "100%", }}>
      <PresentationMainCard />

      <Grid container spacing={2} sx={{ pb: 4, mt: 2 }}>
        {presentationsList?.data
          .sort((a: PresentationContent, b: PresentationContent) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
          .map((x: PresentationContent) => {
            return (
              <Grid item xs={6} sm={3} lg={2}>
                <CustomCard
                  title={x.content.topic}
                  link={`/ai-presentations/${x.uid}`}
                  image={"/ai-ppt-images/ai-ppt-teacher-teaching.webp"}
                  category={x.createdById === userInfo?.uid ? "createdByYou" : "general"}
                  createdById={""}
                  textStyle={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    maxWidth: "90%",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    height: "40px",
                  }}
                />
              </Grid>
            )
          })}
      </Grid>
    </Box >
  );
};

export default PresentationList;



