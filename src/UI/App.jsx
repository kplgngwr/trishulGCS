import { useState } from 'react';
import { useElectron } from '../hooks/useElectron';
import './styles/App.css';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './components/Dashboard';

function App() {
  const [availablePorts, setAvailablePorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [portInfo, setPortInfo] = useState(null);
  const { isElectron, listPorts, connectToPort, writeToPort, disconnectPort, usePortData } = useElectron();
  
  // Use the hook to get port data
  const [portData, clearPortData] = usePortData();
  
  // Load available ports
  const handleRefreshPorts = async () => {
    if (!isElectron) return;
    
    try {
      const ports = await listPorts();
      if (ports.error) {
        alert(`Error listing ports: ${ports.error}`);
      } else {
        setAvailablePorts(ports);
      }
    } catch (err) {
      alert(`Failed to list ports: ${err.message}`);
    }
  };
  
  // Connect to selected port
  const handleConnect = async () => {
    if (!selectedPort) return;
    
    try {
      const result = await connectToPort(selectedPort, {
        baudRate: 115200,
        dataBits: 8,
        parity: 'none',
      });
      
      if (result.error) {
        alert(`Connection error: ${result.error}`);
      } else {
        setIsConnected(true);
        clearPortData();
        
        // Store port info for display
        const selectedPortInfo = availablePorts.find(p => p.path === selectedPort);
        setPortInfo(selectedPortInfo);
      }
    } catch (err) {
      alert(`Failed to connect: ${err.message}`);
    }
  };
  
  // Disconnect from port
  const handleDisconnect = async () => {
    try {
      await disconnectPort();
      setIsConnected(false);
      setPortInfo(null);
    } catch (err) {
      alert(`Failed to disconnect: ${err.message}`);
    }
  };
  
  // Send message to port
  const handleSendMessage = async () => {
    if (!message) return;
    
    try {
      const result = await writeToPort(message);
      if (result.error) {
        alert(`Send error: ${result.error}`);
      } else {
        setMessage('');
      }
    } catch (err) {
      alert(`Failed to send: ${err.message}`);
    }
  };
  
  if (!isElectron) {
    return <div>This feature requires Electron environment</div>;
  }

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="gcs-container">
        <Header 
          onRequestPort={handleRefreshPorts}
          isConnected={isConnected}
          portInfo={portInfo}
          availablePorts={availablePorts}
          selectedPort={selectedPort}
          setSelectedPort={setSelectedPort}
          handleConnect={handleConnect}
          handleDisconnect={handleDisconnect}
        />
        <main className="gcs-main">
          <Dashboard 
            portData={portData}
            isConnected={isConnected}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            clearPortData={clearPortData}
          />
        </main>
      </div>
    </div>
  );
}

export default App;