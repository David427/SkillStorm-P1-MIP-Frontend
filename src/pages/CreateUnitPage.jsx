import { Box, Button, Container, Flex, Heading, Section, Select, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateUnitPage = () => {
  // Each unit's specs are determined by series + model in the backend
  const [series, setSeries] = useState('RGX');
  const [model, setModel] = useState('400');
  const [warehouseIdCode, setWarehouseIdCode] = useState('');
  const [successfulRequest, setSuccessfulRequest] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:8080';

  const createUnit = async (newUnit) => {
    try {
      const response = await fetch(`${BASE_URL}/units`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUnit)
      });

      if (response.status === 201 || response.ok) {
        toast.success('Unit added successfully.');
        setSuccessfulRequest(() => {
          navigate('/');
        });
      } else if (response.status === 422) {
        response.text().then((text) => {
          toast.error(`${text}`);
        });
      } else if (response.status === 404) {
        toast.error('The warehouse for that unit does not exist.');
        setSuccessfulRequest(false);
      }
    } catch (err) {
      toast.error('Error adding unit, please try again.');
      setSuccessfulRequest(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUnit = {
      series,
      model,
      warehouse: {
        idCode: warehouseIdCode
      }
    };

    createUnit(newUnit);
  };

  return (
    <Container size="1" mt="8">
      <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
        <Heading align="center" size="7" style={{ color: 'black' }}>
          Create Unit
        </Heading>
      </Section>
      <Box maxWidth="100%" mt="4">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label htmlFor="new-warehouse-id-code">
              <Text as="div" size="4" mb="1" weight="bold">
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
            <label htmlFor="new-unit-series">
              <Text as="div" size="4" mb="1" weight="bold">
                Series
              </Text>
              <Select.Root id="new-unit-series" value={series} onValueChange={setSeries}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="RGX">RGX</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
            <label htmlFor="new-unit-model">
              <Text as="div" size="4" mb="1" weight="bold">
                Model
              </Text>
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

          <Flex align="center" gap="3" mt="4" justify="center">
            <Link to="/">
              <Button size="4" color="gray" style={{ color: 'black' }} type="reset">
                Cancel
              </Button>
            </Link>

            <Button size="4" type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </Container>
  );
};

export default CreateUnitPage;
