import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import React from "react";

const Dash_Nav = () => {
  return (
    <Flex py={"xs"} gap={"sm"}>
      <Link href={`/dashboard`}>
        <Button>Dashboard</Button>
      </Link>
      <Link href={`/dashboard/add`}>
        <Button variant="light">Mahsulot qo'shish</Button>
      </Link>
    </Flex>
  );
};

export default Dash_Nav;
