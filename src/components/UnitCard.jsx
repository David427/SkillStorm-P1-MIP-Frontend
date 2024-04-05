import { Box, Button, Card, Flex, Heading, Strong, Text } from '@radix-ui/themes';
import React from 'react';
import { Link } from 'react-router-dom';

const UnitCard = ({ id, series, model, warehouseIdCode }) => {
  return (
    <>
      <Card size="1">
        <Flex align="center" gap="4" justify="between">
          <Box width="60px" ml="3">
            <Heading align="left">{id}</Heading>
          </Box>

          <Box width="36%">
            <Strong>
              <Text size="5" mt="-2">
                {warehouseIdCode}
              </Text>
            </Strong>
          </Box>

          <Box width="60%">
            <Text size="5">{`${series} ${model}`}</Text>
          </Box>

          <Flex justify="center" gap="4">
            <Link to={`units/${id}`}>
              <Button size="4">Manage</Button>
            </Link>
          </Flex>
        </Flex>
      </Card>
    </>
  );
};

export default UnitCard;
