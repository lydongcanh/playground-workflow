import { Tabs } from '@mantine/core';
import Activepieces from './components/Activepieces';
import GoogleDriveIntegration from './components/GoogleDriveIntegration';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <Tabs defaultValue="activepieces">
        <Tabs.List>
          <Tabs.Tab value="activepieces">Activepieces</Tabs.Tab>
          <Tabs.Tab value="automatisch">Automatisch</Tabs.Tab>
          <Tabs.Tab value="self-made">Self-made</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="activepieces" pt="xs">
          <Activepieces />
        </Tabs.Panel>

        <Tabs.Panel value="automatisch" pt="xs">
          <h2>Automatisch</h2>
          <p>This is the content for Automatisch.</p>
        </Tabs.Panel>
        <Tabs.Panel value="self-made" pt="xs">
          <h2>Self-made</h2>
          <GoogleDriveIntegration />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}

export default App;
