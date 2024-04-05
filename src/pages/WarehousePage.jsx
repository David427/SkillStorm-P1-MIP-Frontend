import { AlertDialog, Box, Button, Container, Flex, Heading, Section, Strong, Table, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import warehouseImage01 from '../assets/warehouse-image-01.jpg';
import warehouseImage02 from '../assets/warehouse-image-02.jpg';
import warehouseImage03 from '../assets/warehouse-image-03.jpg';
import warehouseImageGeneric from '../assets/warehouse-image-default.jpg';

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

  const handleDelete = () => {
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
        <Flex direction="column" justify="between">
          <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
            <Heading align="center" size="7" style={{ color: 'black' }}>
              {warehouse.idCode}
            </Heading>
          </Section>
          <Flex align="center" justify="start" mt="4" mb="0" gap="4">
            <Box align="right" width="40%">
              <FaMapMarkerAlt size="50px" style={{ color: 'var(--red-9)', cursor: 'pointer' }} title="Open address in Google Maps" />
            </Box>
            <Box align="left" width="40%">
              <Text as="div" size="5" width="100%" my="2">
                <Strong>
                  {warehouse.streetAddress}
                  <Text as="div">
                    {warehouse.city}, {warehouse.state} {warehouse.zipCode}
                  </Text>
                </Strong>
              </Text>
            </Box>
          </Flex>
          <Box align="center" my="4">
            {warehouse.idCode === 'BOS-WH-01' && <img src={warehouseImage01} style={{ borderRadius: '6px' }}></img>}
            {warehouse.idCode === 'BOS-WH-02' && <img src={warehouseImage02} style={{ borderRadius: '6px' }}></img>}
            {warehouse.idCode === 'BOS-WH-03' && <img src={warehouseImage03} style={{ borderRadius: '6px' }}></img>}
            {genericWarehouse && <img src={warehouseImageGeneric} style={{ borderRadius: '6px' }}></img>}
          </Box>

          <Box align="center">
            <Heading align="center">Inventory Information</Heading>
            <hr style={{ width: '50%', height: '6px', backgroundColor: 'var(--gray-9)', border: 'none', borderRadius: 'var(--radius-3)' }}></hr>
          </Box>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Series
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="left">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Model
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Quantity
                  </Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {stock.map((unit) => (
                <Table.Row key={`${warehouse.idCode}-${unit.series}-${unit.model}`}>
                  <Table.Cell align="center">
                    <Text size="3">{unit.series}</Text>
                  </Table.Cell>
                  <Table.Cell align="left">
                    <Text size="3">{unit.model}</Text>
                  </Table.Cell>
                  <Table.Cell align="center">
                    <Text size="3">{unit.stock}</Text>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>

          <Flex align="center" justify="center" gap="4" my="4">
            <Link to="/">
              <Button size="4" color="gray" style={{ color: 'black' }}>
                Back
              </Button>
            </Link>
            <Link to={`update`}>
              <Button size="4">Edit</Button>
            </Link>
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button size="4" color="red" style={{ color: 'black' }}>
                  Delete
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Description size="2">Are you sure you want to delete this warehouse?</AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                  <AlertDialog.Cancel>
                    <Button style={{ backgroundColor: 'var(--gray-9)' }}>Cancel</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action>
                    <Button color="red" style={{ color: 'black' }} onClick={handleDelete}>
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
