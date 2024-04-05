import { Button, Card, Flex, Heading, Section, Table, Text, Tooltip } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { BsBoxFill } from 'react-icons/bs';
import { FaRulerCombined, FaWarehouse } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WarehouseCard = ({ idCode, squareFt, stock, capacity, selectedWarehouse, changeSelectedWarehouse }) => {
  const [selectable, setSelectable] = useState(false);

  useEffect(() => {
    if (stock === 0) {
      setSelectable(false);
    } else {
      setSelectable(true);
    }
  }, [selectedWarehouse]);

  const handleClick = () => {
    changeSelectedWarehouse(idCode);
  };

  return (
    <>
      <Card size="1">
        {selectedWarehouse === idCode && selectable ? (
          <Section size="1" id="selected-wh-section" style={{ backgroundColor: 'var(--accent-9)', borderRadius: 'var(--radius-3)' }}>
            <Tooltip content="Click to filter units by this warehouse">
              <Heading align="center" onClick={handleClick} style={{ color: 'black', cursor: 'pointer' }}>
                {idCode}
              </Heading>
            </Tooltip>
          </Section>
        ) : (
          <Section size="1" style={{ backgroundColor: 'var(--gray-9)', borderRadius: 'var(--radius-3)' }}>
            <Tooltip content="Click to filter units by this warehouse">
              <Heading align="center" onClick={handleClick} style={{ color: 'black', cursor: 'pointer' }}>
                {idCode}
              </Heading>
            </Tooltip>
          </Section>
        )}

        <Table.Root>
          <Table.Body>
            <Table.Row>
              <Table.Cell align="center">
                <Tooltip content="Square Ft">
                  <Text size="6">
                    <FaRulerCombined size="20px" />
                    {`    ${squareFt}`}
                  </Text>
                </Tooltip>
              </Table.Cell>
              <Table.Cell align="center">
                {stock >= capacity ? (
                  <Tooltip content="Current Stock">
                    <Text size="6" style={{ color: 'var(--mvideo-red' }}>
                      <BsBoxFill size="20px" /> {`    ${stock}`}
                    </Text>
                  </Tooltip>
                ) : (
                  <Tooltip content="Current Stock">
                    <Text size="6">
                      <BsBoxFill size="20px" /> {`    ${stock}`}
                    </Text>
                  </Tooltip>
                )}
              </Table.Cell>
              <Table.Cell align="center">
                <Tooltip content="Capacity">
                  <Text size="6">
                    <FaWarehouse size="20px" /> {`    ${capacity}`}
                  </Text>
                </Tooltip>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>

        <Flex justify="center" mt="3">
          <Link to={`warehouses/${idCode}`}>
            <Button size="4">Manage</Button>
          </Link>
        </Flex>
      </Card>
    </>
  );
};

export default WarehouseCard;
