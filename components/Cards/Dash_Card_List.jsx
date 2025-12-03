"use client";

import {
  Card,
  Grid,
  Image,
  Text,
  ActionIcon,
  Flex,
  Box,
  Modal,
  Group,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const Dash_Card_List = ({ data }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const DeleteProduct = async () => {
    try {
      let res = await fetch(
        `https://durbek-webbot-node-1.onrender.com/api/products/${deleteItem._id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to delete product`);
      }
      close();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid gutter={"xs"}>
        {data?.map((item) => {
          return (
            <Grid.Col key={item._id} span={{ base: 6, md: 6, lg: 3 }}>
              <Card shadow="sm" padding="xs" radius="sm" withBorder>
                <Card.Section>
                  <Image
                    height={160}
                    fit="cover"
                    src={
                      item.image ||
                      "https://mma.prnewswire.com/media/1420527/Logo.jpg?p=facebook"
                    }
                    alt="Norway"
                  />
                </Card.Section>

                <Text fw={500} size="sm" mt={"xs"} lineClamp={1}>
                  {item.name}
                </Text>
                <Text fw={"bold"} size="sm" mt={"xs"}>
                  {item.price} "so'm"
                </Text>

                <Box>
                  <Flex justify={"flex-end"} gap={"xs"}>
                    <ActionIcon>
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      onClick={() => {
                        setDeleteItem(item);
                        open();
                      }}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Box>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>

      <Modal opened={opened} onClose={close} title="Confirm Deletion">
        <Text>( {deleteItem?.name} ) ni o'chirishni hohlaysizmi ?</Text>
        <Group mt={"md"} grow>
          <Button onClick={close}>Cancel</Button>
          <Button color="red" onClick={DeleteProduct}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default Dash_Card_List;