import { Box, Flex, Heading, Section } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import MVIDEOIcon from '../assets/mvideo-logo.png';

const Header = () => {
  return (
    <>
      <Section mb="4" p="4" style={{ backgroundColor: 'var(--slate-8)', borderRadius: 'var(--radius-3)' }}>
        <Flex align="center" gap="4" justify="center">
          <Link to="/">
            <img height="80px" src={MVIDEOIcon}></img>
          </Link>
          <Box>
            <Heading align="center" size="9">
              MVIDEO Inventory Platform
            </Heading>
          </Box>
        </Flex>
      </Section>
    </>
  );
};

export default Header;
