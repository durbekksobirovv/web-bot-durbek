"use client";
import { Card, Grid, Image, Text, ActionIcon, Flex, Box } from "@mantine/core";
import React from "react";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Dash_Card_List = ({ data }) => {
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
                    <ActionIcon color="red">
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Flex>
                </Box>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default Dash_Card_List;
