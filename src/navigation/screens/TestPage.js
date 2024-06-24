import { useState } from 'react';
import { MantineProvider, Button, Loader,Select, Notification } from '@mantine/core';
import { DateInput } from '@mantine/dates';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';



function TestPage() {
  const [value, setValue] = useState("");

  return (
    <MantineProvider  
      theme={{
        colorScheme: 'light', // or 'dark'
      }}
    >
      <div style={{ padding: '20px' }}>
        <Button >Full width button</Button>
        <Loader color="blue" />
        <DateInput
        value={value}
        onChange={setValue}
        label="Date input"
        placeholder="Date input"
      />
      <Select
      label="Your favorite library"
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
    <Notification title="We notify you that">
      You are now obligated to give a star to Mantine project on GitHub
    </Notification>
      </div>
      <div>
      
      </div>
    </MantineProvider>
  );
}

export default TestPage;
