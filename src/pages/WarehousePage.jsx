import { AlertDialog, Box, Button, Container, Flex, Heading, Section, Strong, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import warehouseDefaultImage from '../assets/warehouse-image-default.jpg';
import warehouseImage01 from '../assets/warehouse-image-01.jpg';
import warehouseImage02 from '../assets/warehouse-image-02.jpg';
import warehouseImage03 from '../assets/warehouse-image-03.jpg';
import Spinner from '../components/Spinner';
import UnitStockCard from '../components/UnitStockCard';

const WarehousePage = ({ deleteWarehouse }) => {
  const navigate = useNavigate();
  const warehouse = useLoaderData();
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [genericWarehouse, setGenericWarehouse] = useState(true);

  // Used for the loader below
  const { idCode } = useParams();

  useEffect(() => {
    const getStock = async () => {
      try {
        const response = await fetch(`${BASE_URL}/warehouses/${warehouse.idCode}/stock`);
        if (!response.ok && response.status !== 200) throw Error;
        const data = await response.json();
        setStock(data);
      } catch (err) {
        console.log(err.message);
        toast.error('Error fetching data, please refresh the app');
      } finally {
        setLoading(false);
      }
    };

    getStock();
    determineGenericWarehouse();
  }, []);

  const handleDelete = (idCode) => {
    deleteWarehouse(warehouse.idCode);
    navigate('/');
  };
  const determineGenericWarehouse = () => {
    if (warehouse.idCode === 'BOS-WH-01' || warehouse.idCode === 'BOS-WH-02' || warehouse.idCode === 'BOS-WH-03') {
      setGenericWarehouse(false);
    }
  };

  return (
    <>
      <Container size="2">
        <Flex direction="column" justify="center">
          <Section size="1" style={{ backgroundColor: 'var(--slate-8)', borderRadius: 'var(--radius-3)' }}>
            <Heading align="center">{warehouse.idCode}</Heading>
          </Section>
          <Box>
            <Text as="div" align="center" size="5" width="100%" my="2">
              <Strong>
                {warehouse.streetAddress}
                <Text as="div">
                  {warehouse.city}, {warehouse.state} {warehouse.zipCode}
                </Text>
              </Strong>
            </Text>
          </Box>
          <Box align="center">
            {warehouse.idCode === 'BOS-WH-01' && <img src={warehouseImage01} style={{ borderRadius: '6px' }}></img>}
            {warehouse.idCode === 'BOS-WH-02' && <img src={warehouseImage02} style={{ borderRadius: '6px' }}></img>}
            {warehouse.idCode === 'BOS-WH-03' && <img src={warehouseImage03} style={{ borderRadius: '6px' }}></img>}
            {genericWarehouse && <img src={warehouseDefaultImage} style={{ borderRadius: '6px' }}></img>}
          </Box>
          <Box align="center" my="4">
            <Heading align="center">Current Stock</Heading>
          </Box>
          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <Flex direction="column" gap="1">
              {stock.map((unit) => (
                <UnitStockCard key={`${warehouse.idCode}-${unit.series}-${unit.model}`} series={unit.series} model={unit.model} stock={unit.stock} />
              ))}
            </Flex>
          )}
          <Flex align="center" justify="center" gap="4" my="4">
            <Link to="/">
              <Button size="4" style={{ backgroundColor: 'var(--slate-8)' }}>
                Back
              </Button>
            </Link>
            <Link to={`update`}>
              <Button size="4">Edit</Button>
            </Link>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button size="4" style={{ backgroundColor: '#d62d2d' }}>
                  Delete
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Description size="2">Are you sure you want to delete this warehouse?</AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button style={{ backgroundColor: 'var(--slate-8)' }}>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button style={{ backgroundColor: '#d62d2d' }} onClick={handleDelete}>
                      Delete
                    </Button>
                  </AlertDialog.Action>
                </Flex>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

const BASE_URL = 'http://localhost:8080';

const warehouseLoader = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/warehouses/${params.idCode}`);
  const data = await response.json();
  return data;
};

export { WarehousePage as default, warehouseLoader };
