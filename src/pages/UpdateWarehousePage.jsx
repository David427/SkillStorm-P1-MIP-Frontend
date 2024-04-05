import { Box, Button, Container, Flex, Heading, Section, Select, Text, TextField } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateWarehousePage = ({ updateWarehouse }) => {
  // Fetching a single warehouse by id
  const warehouse = useLoaderData();

  const [streetAddress, setStreetAddress] = useState(warehouse.streetAddress);
  const [city, setCity] = useState(warehouse.city);
  const [state, setState] = useState(warehouse.state);
  const [zipCode, setZipCode] = useState(warehouse.zipCode);
  const [squareFt, setSquareFt] = useState(warehouse.squareFt);

  // Data that can't be changed in the form
  const idCode = warehouse.idCode;
  const stock = warehouse.stock;
  const capacity = Math.floor(squareFt / 400);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedWarehouse = {
      idCode,
      streetAddress,
      city,
      state,
      zipCode,
      squareFt,
      stock,
      capacity
    };

    if (stock > capacity) {
      toast.error('The current stock cannot fit in this new square footage');
      return;
    }

    updateWarehouse(updatedWarehouse);
    return navigate('/');
  };

  return (
    <Container size="1" mt="8">
      <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
        <Heading align="center" size="7" style={{ color: 'black' }}>
          Update Warehouse
        </Heading>
      </Section>
      <Box maxWidth="100%" mt="4">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label htmlFor="update-id-code">
              <Text as="div" size="4" mb="1" weight="bold">
                ID Code
              </Text>
              <TextField.Root id="update-id-code" placeholder={warehouse.idCode} disabled />
            </label>
            <label htmlFor="update-street-address">
              <Text as="div" size="4" mb="1" weight="bold">
                Street Address
              </Text>
              <TextField.Root
                id="update-street-address"
                placeholder={warehouse.streetAddress}
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </label>
            <label htmlFor="update-city">
              <Text as="div" size="4" mb="1" weight="bold">
                City
              </Text>
              <TextField.Root id="update-city" placeholder={warehouse.city} required value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label htmlFor="update-state">
              <Text as="div" size="4" mb="1" weight="bold">
                State
              </Text>
              <Select.Root id="update-state" value={state} onValueChange={setState}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Group>
                    <Select.Item value="AL">AL</Select.Item>
                    <Select.Item value="AK">AK</Select.Item>
                    <Select.Item value="AR">AR</Select.Item>
                    <Select.Item value="AZ">AZ</Select.Item>
                    <Select.Item value="CA">CA</Select.Item>
                    <Select.Item value="CO">CO</Select.Item>
                    <Select.Item value="CT">CT</Select.Item>
                    <Select.Item value="DE">DE</Select.Item>
                    <Select.Item value="FL">FL</Select.Item>
                    <Select.Item value="GA">GA</Select.Item>
                    <Select.Item value="HI">HI</Select.Item>
                    <Select.Item value="IA">IA</Select.Item>
                    <Select.Item value="ID">ID</Select.Item>
                    <Select.Item value="IL">IL</Select.Item>
                    <Select.Item value="IN">IN</Select.Item>
                    <Select.Item value="KS">KS</Select.Item>
                    <Select.Item value="KY">KY</Select.Item>
                    <Select.Item value="LA">KA</Select.Item>
                    <Select.Item value="MA">MA</Select.Item>
                    <Select.Item value="MD">MD</Select.Item>
                    <Select.Item value="ME">ME</Select.Item>
                    <Select.Item value="MI">MI</Select.Item>
                    <Select.Item value="MN">MN</Select.Item>
                    <Select.Item value="MO">MO</Select.Item>
                    <Select.Item value="MS">MS</Select.Item>
                    <Select.Item value="MT">MT</Select.Item>
                    <Select.Item value="NC">NC</Select.Item>
                    <Select.Item value="ND">ND</Select.Item>
                    <Select.Item value="NE">NE</Select.Item>
                    <Select.Item value="NH">NH</Select.Item>
                    <Select.Item value="NJ">NJ</Select.Item>
                    <Select.Item value="NM">NM</Select.Item>
                    <Select.Item value="OH">OH</Select.Item>
                    <Select.Item value="OK">OK</Select.Item>
                    <Select.Item value="OR">OR</Select.Item>
                    <Select.Item value="PA">PA</Select.Item>
                    <Select.Item value="RI">RI</Select.Item>
                    <Select.Item value="SC">SC</Select.Item>
                    <Select.Item value="SD">SD</Select.Item>
                    <Select.Item value="TN">TN</Select.Item>
                    <Select.Item value="TX">TX</Select.Item>
                    <Select.Item value="UT">UT</Select.Item>
                    <Select.Item value="VA">VA</Select.Item>
                    <Select.Item value="VT">VT</Select.Item>
                    <Select.Item value="WA">WA</Select.Item>
                    <Select.Item value="WI">WI</Select.Item>
                    <Select.Item value="WV">WV</Select.Item>
                    <Select.Item value="WY">WY</Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </label>
            <label htmlFor="update-zip-code">
              <Text id="update-zip-code" as="div" size="4" mb="1" weight="bold">
                Zip Code
              </Text>
              <TextField.Root
                placeholder={warehouse.zipCode}
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                type="number"
                minLength="5"
                maxLength="5"
              />
            </label>
            <label htmlFor="update-sq-ft">
              <Text id="update-sq-ft" as="div" size="4" mb="1" weight="bold">
                Square Footage
              </Text>
              <TextField.Root placeholder={warehouse.squareFt} value={squareFt} onChange={(e) => setSquareFt(e.target.value)} type="number" />
            </label>
          </Flex>

          <Flex align="center" gap="3" mt="4" justify="center">
            <Link to={`/warehouses/${idCode}`}>
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

export default UpdateWarehousePage;
