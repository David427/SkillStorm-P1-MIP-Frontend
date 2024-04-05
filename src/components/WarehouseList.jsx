import { Box, Flex, Heading, IconButton, Tooltip } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import WarehouseCard from './WarehouseCard';

const WarehouseList = ({ changeSelectedWarehouse, selectedWarehouse }) => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:8080';

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

    setTimeout(getWarehouses, 800);
  }, [warehouses]);

  return (
    <>
      <Flex direction="column" my="4" gap="4" minWidth="300px">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <Flex align="center" gap="4" justify="between">
              <Heading align="center" size="8">
                Warehouses
              </Heading>
              <Box>
                <Link to="/create-warehouse">
                  <Tooltip content="Create a new warehouse">
                    <IconButton size="4">
                      <FaPlusCircle size="36px" />
                    </IconButton>
                  </Tooltip>
                </Link>
              </Box>
            </Flex>
            <Flex direction="column" gap="1">
              {warehouses.map((warehouse) => (
                <WarehouseCard
                  key={warehouse.idCode}
                  idCode={warehouse.idCode}
                  squareFt={warehouse.squareFt}
                  stock={warehouse.stock}
                  capacity={warehouse.capacity}
                  changeSelectedWarehouse={changeSelectedWarehouse}
                  selectedWarehouse={selectedWarehouse}
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
