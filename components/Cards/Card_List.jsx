import React from "react";
import { Button, Card, Grid, Group, Image, Text } from "@mantine/core";

const Card_List = ({ data }) => {
  return (
    <>
      <Grid>
        {data.map((item) => {
          return (
            <Grid.Col key={item._id} span={{ base: 6, md: 6, lg: 3 }}>
              <Card shadow="xs" padding="xs" radius="sm" withBorder>
                <Card.Section>
                  <Image
                    src={item.image}
                    height={160}
                    fit="cover"
                    alt="Norway"
                  />
                </Card.Section>

                <Text fw={500} mt={"xs"}>
                  {item.name}
                </Text>
                <Text fw={500} my={"5px"}>
                  {item.price} {"so'm"}
                </Text>
                <Text size="sm" c="dimmed" lineClamp={1}>
                  {item.description}
                </Text>

                <Group grow mt="sm" gap={"xs"}>
                  <Button color="red" size="xs">
                    Remove
                  </Button>
                  <Button color="blue" size="xs">
                    Add
                  </Button>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
};

export default Card_List;
