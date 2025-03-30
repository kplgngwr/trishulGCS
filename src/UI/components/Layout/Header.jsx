import React from 'react';
import './style.css';

const Header = ({
  onRequestPort,
  isConnected,
  portInfo,
  availablePorts,
  selectedPort,
  setSelectedPort,
  handleConnect,
  handleDisconnect
}) => {
  return (
    <header className="gcs-header">
      <h1>Trishul GCS</h1>

      <div className="port-controls">
        <select
          value={selectedPort}
          onChange={(e) => setSelectedPort(e.target.value)}
          disabled={isConnected}
          className="port-select"
        >
          <option value=""> Select a port </option>
          {availablePorts.map((port) => (
            <option key={port.path} value={port.path}> {port.path} - {port.manufacturer || 'Unknown'}
            </option>))} </select>
          {!isConnected ? (<button onClick={handleConnect} disabled={!selectedPort} className="port-button">
          Connect </button>) : (<button onClick={handleDisconnect} className="port-button disconnect">
            Disconnect </button>)}

        <button onClick={onRequestPort} className="request-port-button">
          Refresh</button>
      </div>
    </header>
  );
};

export default Header;