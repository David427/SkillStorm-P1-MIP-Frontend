import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import React from 'react';

const UnitStockCard = ({ series, model, stock }) => {
  return (
    <Card size="1">
      <Flex align="center" gap="4" justify="start">
        <Box width="60px" ml="3">
          <Heading align="left">{stock}</Heading>
        </Box>

        <Box width="60%">
          <Text size="5">{`${series} ${model}`}</Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default UnitStockCard;
