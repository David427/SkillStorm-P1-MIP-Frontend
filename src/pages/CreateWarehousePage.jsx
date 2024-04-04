import { Box, Button, Container, Flex, Heading, Select, Text, TextField } from '@radix-ui/themes';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateWarehousePage = ({ createWarehouse }) => {
  const [idCode, setIdCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('AL');
  const [zipCode, setZipCode] = useState('');
  const [squareFt, setSquareFt] = useState(0);

  // Stock is not chosen at creation; it will be 0
  // Capacity is calculated from sq ft (arbitrarily divided by 400)
  // If I could figure out pagination on the frontend, it would be more realistic :(
  const stock = 0;
  const capacity = Math.floor(squareFt / 400);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newWarehouse = {
      idCode,
      streetAddress,
      city,
      state,
      zipCode,
      squareFt,
      stock,
      capacity
    };

    createWarehouse(newWarehouse);
    return navigate('/');
  };

  return (
    <Container size="2" mt="8">
      <Box maxWidth="100%">
        <form onSubmit={handleSubmit}>
          <Heading align="center" size="7" mb="6">
            Add Warehouse
          </Heading>

          <Flex direction="column" gap="3">
            <label htmlFor="new-id-code">
              <Text as="div" size="2" mb="1" weight="bold">
                ID Code
              </Text>
              <TextField.Root id="new-id-code" placeholder="Enter a new ID code" required value={idCode} onChange={(e) => setIdCode(e.target.value)} />
            </label>
            <label htmlFor="new-street-address">
              <Text as="div" size="2" mb="1" weight="bold">
                Street Address
              </Text>
              <TextField.Root
                id="new-street-address"
                placeholder="Enter the address"
                required
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
              />
            </label>
            <label htmlFor="new-city">
              <Text as="div" size="2" mb="1" weight="bold">
                City
              </Text>
              <TextField.Root id="new-city" placeholder="Enter the city" required value={city} onChange={(e) => setCity(e.target.value)} />
            </label>
            <label htmlFor="new-state">
              <Text as="div" size="2" mb="1" weight="bold">
                State
              </Text>
              <Select.Root id="new-state" value={state} onValueChange={setState}>
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
            <label htmlFor="new-zip-code">
              <Text id="new-zip-code" as="div" size="2" mb="1" weight="bold">
                Zip Code
              </Text>
              <TextField.Root placeholder="Enter the ZIP code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
            </label>
            <label htmlFor="new-sq-ft">
              <Text id="new-sq-ft" as="div" size="2" mb="1" weight="bold">
                Square Footage
              </Text>
              <TextField.Root placeholder="Enter the usable square footage" value={squareFt} onChange={(e) => setSquareFt(e.target.value)} />
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

export default CreateWarehousePage;
