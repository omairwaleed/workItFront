import React from 'react';
import { MantineProvider, Button, Modal, Text, Group, Title, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import '@mantine/core/styles.css';

function TestPage() {
  const [opened, { open, close }] = useDisclosure(false);

  // Sample data for the details
  const details = {
    englishLevel: 'Advanced',
    experience: 5,
    salary: 60000,
    availability: '2023-07-01',
    jobLocation: 'Remote',
  };

  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <div style={{ padding: '20px' }}>
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton
          title="Applicant Details"
          centered
          styles={{
            modal: { backgroundColor: '#f8f9fa', borderRadius: '10px' },
            title: { fontWeight: 'bold', fontSize: '20px' },
          }}
        >
          <Group direction="row" spacing="sm" style={{ padding: '20px' }}>
            <Text><strong>English Level:</strong> {details.englishLevel}</Text>
            <Text><strong>Years of Experience:</strong> {details.experience}</Text>
            <Text><strong>Expected Salary:</strong> ${details.salary.toLocaleString()}</Text>
            <Text><strong>Availability to Start:</strong> {new Date(details.availability).toLocaleDateString()}</Text>
            <Text><strong>Preferred Job Location:</strong> {details.jobLocation}</Text>
          </Group>
        </Modal>

        <Button onClick={open} style={{ backgroundColor: '#007bff', color: '#fff' }}>
          View Details
        </Button>
      </div>
    </MantineProvider>
  );
}

export default TestPage;
