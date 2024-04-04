import { Box, Button, Flex, Skeleton, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';
import UnitCard from './UnitCard';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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

    getUnits();
  }, [units, selectedWarehouse]);

  const handleAddUnit = async (newUnit) => {
    // TODO...
  };

  return (
    <>
      <Flex direction="column" my="4" gap="4" minWidth="300px">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <Box align="center">
              <Link to="/create-unit">
                <Button size="4" style={{ backgroundColor: '#77b900', cursor: 'pointer' }}>
                  ADD GPU UNIT
                </Button>
              </Link>
            </Box>
            <Flex direction="column" gap="1">
              {units.map((unit) => (
                <UnitCard
                  key={unit.id}
                  id={unit.id}
                  series={unit.series}
                  model={unit.model}
                  vram={unit.vram}
                  factoryClock={unit.factoryClock}
                  videoCores={unit.videoCores}
                  aiCores={unit.aiCores}
                  powerDraw={unit.powerDraw}
                  warehouseIdCode={unit.warehouse.idCode}
                />
              ))}
            </Flex>
          </>
        )}
      </Flex>
    </>
  );
};

export default UnitList;
