import { Box, Button, Container, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateUnitPage = ({ createUnit }) => {
  // Each unit's specs are determined by series + model in the backend
  const [series, setSeries] = useState('RGX');
  const [model, setModel] = useState('400');
  const [warehouseIdCode, setWarehouseIdCode] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUnit = {
      series,
      model,
      warehouse: {
        idCode: warehouseIdCode
      }
    };

    console.log(newUnit);

    createUnit(newUnit);
    return navigate('/');
  };

  return (
    <Container size="2" mt="8">
      <Box maxWidth="100%">
        <form onSubmit={handleSubmit}>
          <Heading align="center" size="7" mb="6">
            Add Unit
          </Heading>

          <Flex direction="column" gap="3">
            <label htmlFor="new-warehouse-id-code">
              <Text as="div" size="2" mb="1" weight="bold">
                Warehouse ID Code
              </Text>
              <TextField.Root
                id="new-warehouse-id-code"
                placeholder="Enter where you want to store this unit"
                required
                value={warehouseIdCode}
                onChange={(e) => setWarehouseIdCode(e.target.value)}
              />
            </label>
            <Select.Root id="new-unit-series" value={series} onValueChange={setSeries}>
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Item value="RGX">RGX</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
            <label htmlFor="new-unit-model">
              <Select.Root id="new-unit-model" value={model} onValueChange={setModel}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="400">400</Select.Item>
                    <Select.Item value="600 Super">600 Super</Select.Item>
                    <Select.Item value="800 Extreme Pi">800 Extreme Pi</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Link to="/">
              <Button variant="soft" color="gray" type="reset">
                Cancel
              </Button>
            </Link>

            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUnitPage;
