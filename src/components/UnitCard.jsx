import { Box, Button, Card, Flex, Heading, IconButton, Text } from '@radix-ui/themes';
import React from 'react';
import { BsPencilSquare } from 'react-icons/bs';
import { TbTransferOut, TbTrashX } from 'react-icons/tb';

const UnitCard = ({ id, series, model, vram, factoryClock, videoCores, aiCores, powerDraw, warehouseIdCode }) => {
  return (
    <>
      <Card size="1">
        <Flex align="center" gap="4" justify="between">
          <Box width="60px" ml="3">
            <Heading align="left">{id}</Heading>
          </Box>

          <Box width="36%">
            <Text size="5" mt="-2">
              {warehouseIdCode}
            </Text>
          </Box>

          <Box width="60%">
            <Text size="5">{`${series} ${model}`}</Text>
          </Box>

          <Box align="center">
            <IconButton color="gray" style={{ color: '#77b900' }} title="Transfer" variant="ghost">
              <TbTransferOut size="36px" />
            </IconButton>
          </Box>

          <Box align="center">
            <IconButton color="gray" style={{ color: '#77b900' }} title="Edit" variant="ghost">
              <BsPencilSquare size="32px" />
            </IconButton>
          </Box>

          <Box align="center">
            <IconButton color="gray" style={{ color: '#d62d2d' }} title="Delete" variant="ghost">
              <TbTrashX size="36px" />
            </IconButton>
          </Box>
        </Flex>
      </Card>
    </>
  );
};

export default UnitCard;
