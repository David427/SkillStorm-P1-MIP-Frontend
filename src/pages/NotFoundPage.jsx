import { Box, Button, Container, Flex, Heading, Text } from '@radix-ui/themes';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container>
      <Flex direction="column" gap="4" my="8" align="center" justify="center">
        <FaExclamationTriangle size="200px" />
        <Heading size="7">404 Not Found</Heading>
        <Text as="p">This page does not exist!</Text>
        <Box>
          <Link to="/">
            <Button size="4">Go Back</Button>
          </Link>
        </Box>
      </Flex>
    </Container>
  );
};

export default NotFoundPage;
