import { Box, Button, Callout, Container, Flex, Heading, Section, Select, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

const UpdateUnitPage = ({ updateUnit }) => {
  const unit = useLoaderData();

  const [series, setSeries] = useState(unit.series);
  const [model, setModel] = useState(unit.model);

  // Can't change warehouse from this page; use the Transfer button instead
  const warehouseIdCode = unit.warehouse.idCode;

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUnit = {
      id: unit.id,
      series,
      model,
      warehouse: {
        idCode: warehouseIdCode
      }
    };

    updateUnit(updatedUnit);
    return navigate('/');
  };

  return (
    <Container size="1" mt="8">
      <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
        <Heading align="center" size="7" style={{ color: 'black' }}>
          Update Unit
        </Heading>
      </Section>
      <Box maxWidth="100%" mt="4">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <Callout.Root color="blue">
              <Callout.Icon>
                <FaInfoCircle />
              </Callout.Icon>
              <Callout.Text>To transfer a unit, press the Transfer button on the unit page.</Callout.Text>
            </Callout.Root>

            <label htmlFor="update-unit-id-code">
              <Text as="div" size="4" mb="1" weight="bold">
                Warehouse ID Code
              </Text>
              <TextField.Root id="update-unit-id-code" placeholder={unit.warehouse.idCode} disabled />
            </label>
            <label htmlFor="update-unit-series">
              <Text as="div" size="4" mb="1" weight="bold">
                Series
              </Text>
              <Select.Root id="update-unit-series" value={series} onValueChange={setSeries}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="RGX">RGX</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
            <label htmlFor="update-unit-model">
              <Text as="div" size="4" mb="1" weight="bold">
                Model
              </Text>
              <Select.Root id="update-unit-model" value={model} onValueChange={setModel}>
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
            <Link to={`/units/${unit.id}`}>
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

export default UpdateUnitPage;
