import { Button, Container, Flex, ScrollArea } from "@mantine/core";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const App_Nav = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useSWR(
    "https://lesson-bot-node.onrender.com/api/categories",
    fetcher
  );

  if (error) return <Container>ошибка загрузки</Container>;
  if (isLoading) return <Container>загрузка...</Container>;
  return (
    <>
      <ScrollArea w={"100%"}>
        <Container size={"xl"} pt={"xs"}>
          <Flex gap={"sm"} miw={750}>
            <Link href={`/`}>
              <Button variant="light">Home</Button>
            </Link>
            {data.map((item) => {
              return (
                <Link key={item._id} href={`/category/${item._id}`}>
                  <Button variant={id == item._id ? "filled" : "light"}>
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </Flex>
        </Container>
      </ScrollArea>
    </>
  );
};

export default App_Nav;
