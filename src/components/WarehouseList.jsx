import { Box, Button, Flex } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import WarehouseCard from './WarehouseCard';

const WarehouseList = ({ changeSelectedWarehouse }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:8080';

  // Read all
  useEffect(() => {
    const getWarehouses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/warehouses`);
        if (!response.ok && response.status !== 302) throw Error;
        const data = await response.json();
        setWarehouses(data);
        setLoading(false);
      } catch (err) {
        console.log(err.message);
        toast.error('Error fetching data, please refresh the app');
      }
    };

    getWarehouses();
  }, [warehouses]);

  return (
    <>
      <Flex direction="column" my="4" gap="4" minWidth="300px">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <Box align="center">
              <Link to="/create-warehouse">
                <Button size="4" style={{ backgroundColor: '#77b900', cursor: 'pointer' }}>
                  ADD WAREHOUSE
                </Button>
              </Link>
            </Box>
            <Flex direction="column" gap="1">
              {warehouses.map((warehouse) => (
                <WarehouseCard
                  warehouses={warehouses}
                  key={warehouse.idCode}
                  idCode={warehouse.idCode}
                  streetAddress={warehouse.streetAddress}
                  city={warehouse.city}
                  state={warehouse.state}
                  zipCode={warehouse.zipCode}
                  squareFt={warehouse.squareFt}
                  stock={warehouse.stock}
                  capacity={warehouse.capacity}
                  changeSelectedWarehouse={changeSelectedWarehouse}
                />
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default WarehouseList;
