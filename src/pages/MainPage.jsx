import { Box, Container, Grid } from '@radix-ui/themes';
import { useState } from 'react';
import UnitList from '../components/UnitList';
import WarehouseList from '../components/WarehouseList';

const MainPage = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState('BOS-WH-01');

  const changeSelectedWarehouse = (idCode) => {
    setSelectedWarehouse(idCode);
  };

  return (
    <>
      <Container size="4">
        <Grid columns="3" gap="6" justify="center">
          <Box>
            <WarehouseList changeSelectedWarehouse={changeSelectedWarehouse} selectedWarehouse={selectedWarehouse} />
          </Box>
          <Box gridColumnStart="2" style={{ gridColumn: 'span 2' }}>
            <UnitList selectedWarehouse={selectedWarehouse} />
          </Box>
        </Grid>
      </Container>
    </>
  );
};

export default MainPage;
