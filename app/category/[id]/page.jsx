"use client";
import Card_List from "@/components/Cards/Card_List";
import App_Nav from "@/components/Nav/App_Nav";
import { Container } from "@mantine/core";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    `https://durbek-webbot-node-1.onrender.com/api/products/category/${id}`,
    fetcher
  );

  if (error) return <Container>failed to load</Container>;
  if (isLoading) return <Container>loading...</Container>;
  return (
    <>
      <App_Nav />
      <Container size={"xl"} py={"md"}>
        <Card_List data={data} />
      </Container>
    </>
  );
};

export default page;
