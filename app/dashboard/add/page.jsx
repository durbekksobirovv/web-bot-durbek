"use client";
import {
  Button,
  Container,
  Grid,
  NumberInput,
  Paper,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const page = () => {
  const navigate = useRouter();
  const {
    data: category,
    error,
    isLoading,
  } = useSWR("https://durbek-webbot-node.onrender.com/api/categories", fetcher);

  const catSellect = category?.map((item) => {
    return { value: item._id, label: item.name };
  });

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      image: "",
      category: "",
      price: "",
      quantity: "",
    },
    validate: {
      name: (value) => value.length < 2 && "Maxsulot nomini to'liq kiriting",
      image: (value) => value.length < 2 && "Rasim urlni kiriting",
      price: (value) => value == "" && "Maxsulot narxini kiriting",
      quantity: (value) => value == "" && "Maxsulot sonini kiriting",
      category: (value) => {
        if (!value) return "Kategoriya tanlanishi shart";
        return null;
      },
    },
  });

  const CreateProduct = async (values) => {
    try {
      const res = await fetch(
        "https://durbek-webbot-node-1.onrender.com/api/products",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        }
      );

      const data = await res.json();
      form.reset();

      navigate.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <Container>failed to load</Container>;
  if (isLoading) return <Container>loading...</Container>;

  return (
    <Container size={"xl"} py={"sm"}>
      <Link href={"/dashboard"}>
        <Button variant="light">Ortga Qaytish</Button>
      </Link>
      <form onSubmit={form.onSubmit(CreateProduct)}>
        <Paper p={"md"} mt={"md"} withBorder>
          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                withAsterisk
                label="Maxsluot nomi"
                placeholder="Maxsluot nomi"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <TextInput
                withAsterisk
                label="Image url"
                placeholder="Image url"
                key={form.key("image")}
                {...form.getInputProps("image")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                withAsterisk
                label="Narxi"
                placeholder="Narxi"
                key={form.key("price")}
                {...form.getInputProps("price")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <NumberInput
                withAsterisk
                label="Miqdor"
                placeholder="Miqdor"
                key={form.key("quantity")}
                {...form.getInputProps("quantity")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Select
                withAsterisk
                label="Kategoriya"
                placeholder="kategoriya tanlang"
                data={catSellect}
                key={form.key("category")}
                {...form.getInputProps("category")}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12 }}>
              <Textarea
                resize="vertical"
                label="Tarif"
                placeholder="Qisqacha malumot"
                key={form.key("description")}
                {...form.getInputProps("description")}
              />
            </Grid.Col>
          </Grid>
          <Button type="submit" mt={"md"}>
            Elonni qo'shish
          </Button>
        </Paper>
      </form>
    </Container>
  );
};

export default page;
