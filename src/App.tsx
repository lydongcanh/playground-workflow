import { Tabs } from '@mantine/core';
import Workato from './components/Workato';
import GoogleDriveIntegration from './components/GoogleDriveIntegration';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Tabs defaultValue="workato">
        <Tabs.List>
          <Tabs.Tab value="workato">Workato</Tabs.Tab>
          <Tabs.Tab value="in-house">In-house</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="workato" pt="xs">
          <Workato />
        </Tabs.Panel>
        <Tabs.Panel value="in-house" pt="xs">
          <GoogleDriveIntegration />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default App;
