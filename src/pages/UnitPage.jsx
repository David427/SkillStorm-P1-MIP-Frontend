import { AlertDialog, Box, Button, Container, Dialog, Flex, Heading, IconButton, Section, Table, Text, TextField } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { TbTransferOut } from 'react-icons/tb';
import { Link, useLoaderData, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import gpuRender400 from '../assets/gpu-render-01.png';
import gpuRender600Super from '../assets/gpu-render-02.png';
import gpuRender800ExtremePi from '../assets/gpu-render-03.png';
import gpuRenderGeneric from '../assets/gpu-render-default.png';

const UnitPage = ({ deleteUnit }) => {
  const navigate = useNavigate();
  const unit = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [newWarehouseId, setNewWarehouseId] = useState('');
  const [genericModel, setGenericModel] = useState(true);
  const currentWarehouseId = unit.warehouse.idCode;

  // Used for the loader below
  const { id } = useParams();

  // Query params for PATCH request
  const data = new URLSearchParams();
  data.append('idCode', newWarehouseId);

  useEffect(() => {
    determineGenericModel();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(`${BASE_URL}/units/transfer/${unit.id}`);

    const transferUnit = async () => {
      try {
        const response = await fetch(`${BASE_URL}/units/transfer/${unit.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data
        });

        if (response.status === 200) {
          toast.success('Unit transferred successfully');
        } else if (response.status === 422 || !response.ok()) {
          response.text().then((text) => {
            toast.error(`${text}`);
          });
        }
        return;
      } catch (err) {
        toast.error('Error transferring unit, please try again');
      }
    };

    transferUnit();
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteUnit(unit.id);
    navigate('/');
  };

  const determineGenericModel = () => {
    if (unit.model === '400' || unit.model === '600 Super' || unit.model === '800 Extreme Pi') {
      setGenericModel(false);
    }
  };

  return (
    <>
      <Container size="2">
        <Flex direction="column" justify="center">
          <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
            <Heading align="center" size="7" style={{ color: 'black' }}>
              {unit.series} {unit.model}
            </Heading>
          </Section>

          <Box align="center" mt="6" mb="4">
            {unit.model === '400' && <img src={gpuRender400} width="600px" style={{ borderRadius: '6px' }}></img>}
            {unit.model === '600 Super' && <img src={gpuRender600Super} width="600px" style={{ borderRadius: '6px' }}></img>}
            {unit.model === '800 Extreme Pi' && <img src={gpuRender800ExtremePi} width="600px" style={{ borderRadius: '6px' }}></img>}
            {genericModel && <img src={gpuRenderGeneric} style={{ borderRadius: '6px' }}></img>}
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
                    ID
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Unit Size
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Current Warehouse
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Transfer
                  </Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row align="center">
                <Table.Cell align="center">
                  <Text size="3">{id}</Text>
                </Table.Cell>
                <Table.Cell align="center">
                  <Text size="3">10000</Text>
                </Table.Cell>
                <Table.Cell align="center">
                  <Text size="3">{unit.warehouse.idCode}</Text>
                </Table.Cell>

                <Table.Cell align="center">
                  <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
                    <Dialog.Trigger>
                      <IconButton color="gray" size="4" style={{ color: 'var(--blue-9)' }} title="Transfer" variant="ghost" my="1">
                        <TbTransferOut size="36px" />
                      </IconButton>
                    </Dialog.Trigger>

                    <Dialog.Content maxWidth="450px">
                      <form onSubmit={handleSubmit}>
                        <Dialog.Title>
                          <Text align="center">Transfer Unit</Text>
                        </Dialog.Title>

                        <Flex direction="column" gap="3">
                          <label>
                            <Text as="div" size="3" mb="1" weight="bold" style={{ color: 'var(--mvideo-brand)' }}>
                              Current Warehouse
                            </Text>
                            <TextField.Root value={currentWarehouseId} disabled />
                          </label>
                          <label>
                            <Text as="div" size="3" mb="1" weight="bold" style={{ color: 'var(--mvideo-brand)' }}>
                              New Warehouse
                            </Text>
                            <TextField.Root
                              value={newWarehouseId}
                              required
                              placeholder="Enter the new warehouse ID"
                              onChange={(e) => setNewWarehouseId(e.target.value)}
                            />
                          </label>
                        </Flex>

                        <Flex gap="2" mt="4" justify="end">
                          <Dialog.Close>
                            <Button size="2" color="gray" type="reset" style={{ color: 'black' }}>
                              Cancel
                            </Button>
                          </Dialog.Close>
                          <Dialog.Close>
                            <Button size="2" type="submit">
                              Save
                            </Button>
                          </Dialog.Close>
                        </Flex>
                      </form>
                    </Dialog.Content>
                  </Dialog.Root>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Box align="center" mt="8">
            <Heading align="center">GPU Specifications</Heading>
            <hr style={{ width: '50%', height: '6px', backgroundColor: 'var(--gray-9)', border: 'none', borderRadius: 'var(--radius-3)' }}></hr>
          </Box>

          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    VRAM
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Boost Clock
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    BarraCUDA Cores
                  </Text>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell align="center">
                  <Text size="4" style={{ color: 'var(--mvideo-brand)' }}>
                    Power Draw
                  </Text>
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell align="center">
                  <Text size="3">{`${unit.vram} GB GDDR6X`}</Text>
                </Table.Cell>
                <Table.Cell align="center">
                  <Text size="3">{`${unit.factoryClock} GHz`}</Text>
                </Table.Cell>
                <Table.Cell align="center">
                  <Text size="3">{unit.videoCores}</Text>
                </Table.Cell>
                <Table.Cell align="center">
                  <Text size="3">{`${unit.powerDraw}W`}</Text>
                </Table.Cell>
              </Table.Row>
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
                <AlertDialog.Description size="2">Are you sure you want to delete this unit?</AlertDialog.Description>

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

const unitLoader = async ({ params }) => {
  const response = await fetch(`${BASE_URL}/units/${params.id}`);
  const data = await response.json();
  return data;
};

export { UnitPage as default, unitLoader };
