import { Box, Button, Card, Flex, Heading, IconButton, Inset, Section, Strong, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { BsBoxFill, BsPencilSquare } from 'react-icons/bs';
import { FaRulerCombined, FaWarehouse } from 'react-icons/fa';
import { TbTrashX } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import warehouseIcon from '../assets/warehouse-icon.png';

const WarehouseCard = ({ warehouses, idCode, streetAddress, city, state, zipCode, squareFt, stock, capacity, changeSelectedWarehouse }) => {
  const [stockAtCapacity, setStockAtCapacity] = useState(false);

  // Trying to call this side effect whenever the `warehouses` piece of state is updated in the parent component
  // Buggy :(
  useEffect(() => {
    checkStock();
  }, [warehouses]);

  const checkStock = () => {
    if (stock >= capacity) {
      setStockAtCapacity(true);
      return;
    }
  };

  return (
    <Card size="1">
      <Section size="1" style={{ backgroundColor: 'var(--slate-8)', borderRadius: 'var(--radius-3)' }}>
        <Heading align="center" onClick={() => changeSelectedWarehouse(idCode)} style={{ cursor: 'pointer' }}>
          {idCode}
        </Heading>
      </Section>
      <Box align="center">
        {/* <Inset clip="padding-box" side="bottom" pb="current" pt="current"> */}
        <img
          src={warehouseIcon}
          style={{
            marginTop: '24px',
            display: 'block',
            width: 120,
            height: 120
          }}
        ></img>
        {/* </Inset> */}
      </Box>
      <Flex gap="8" justify="center" my="4">
        <Box>
          <Text size="6">
            <FaRulerCombined size="20px" title="Square Ft" />
            {`   ${squareFt}`}
          </Text>
        </Box>
        <Box>
          {stockAtCapacity ? (
            <Text size="6" style={{ color: '#d62d2d' }}>
              <BsBoxFill size="20px" title="Current Stock" /> {`   ${stock}`}
            </Text>
          ) : (
            <Text size="6">
              <BsBoxFill size="20px" title="Current Stock" /> {`   ${stock}`}
            </Text>
          )}
        </Box>
        <Box>
          <Text size="6">
            <FaWarehouse size="20px" title="Capacity" /> {`   ${capacity}`}
          </Text>
        </Box>
      </Flex>
      <Flex justify="center" gap="4" my="4">
        <Link to={`warehouses/${idCode}`}>
          <Button size="4">Manage</Button>
        </Link>
      </Flex>
    </Card>
  );
};

export default WarehouseCard;
