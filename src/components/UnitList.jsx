import { Box, Button, Flex, Heading, IconButton, Section, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import UnitCard from './UnitCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { FaPlusCircle } from 'react-icons/fa';

const UnitList = ({ selectedWarehouse }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = 'http://localhost:8080';

  // Get all units by warehouseId when component renders
  useEffect(() => {
    const getUnits = async () => {
      try {
        const response = await fetch(`${BASE_URL}/units/location?id=${selectedWarehouse}`);

        if (!response.ok && response.status !== 302 && response.status !== 404) {
          toast.error('Error fetching data, please refresh the app');
        } else if (response.status === 404) {
          toast.info('That warehouse has no current stock');
          // setLoading(false);
        }
        const data = await response.json();
        setUnits(data);
        setLoading(false);
      } catch (err) {
        console.warn(err.message);
      }
    };

    setTimeout(getUnits, 1400);
  }, [units, selectedWarehouse]);

  return (
    <Flex direction="column" my="4" gap="4" minWidth="300px">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <Flex align="center" gap="4" justify="between">
            <Heading align="center" size="8">
              GPU Units
            </Heading>
            <Box>
              <Link to="/create-warehouse">
                <Tooltip content="Create a new unit">
                  <IconButton size="4">
                    <FaPlusCircle size="36px" />
                  </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Flex>
          <Flex direction="column" gap="1">
            {units.map((unit) => (
              <UnitCard key={unit.id} id={unit.id} series={unit.series} model={unit.model} warehouseIdCode={unit.warehouse.idCode} />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default UnitList;
