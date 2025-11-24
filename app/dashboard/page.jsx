"use client";
import Dash_Card_List from "../../components/Cards/Dash_Card_List";
import Dash_Nav from "../../components/Nav/Dash_Nav";
import { Container } from "@mantine/core";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const { data, error, isLoading } = useSWR(
    "https://durbek-webbot-node-1.onrender.com/api/products",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Container size={"xl"}>loading...</Container>;
  return (
    <>
      <Container size={"xl"}>
        <Dash_Nav />
        <Dash_Card_List data={data} />
      </Container>
    </>
  );
};

export default page;
