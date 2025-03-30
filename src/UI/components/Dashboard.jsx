import React from 'react';
import TopGrid from './Layout/TopGrid';
import Diagram from './Layout/Diagram';
import '../styles/common.css';

const Dashboard = ({
  portData,
  isConnected,
  message,
  setMessage,
  handleSendMessage,
  clearPortData
}) => {
  const parseData = (dataArray) => {
    // Filter valid data and take last 50 points
    return dataArray
      .filter(item => item && typeof item === 'string')
      .map(item => {
        // Make sure we have at least 4 values
        const parts = item.split(',');
        while (parts.length < 4) {
          parts.push('0');
        }
        return parts.join(',');
      })
      .slice(-100);
  };

  console.log("Port data length:", portData?.length);
  console.log("Parsed data sample:", parseData(portData || []).slice(0, 2));

  return (
    <div className="dashboard-container">
      <div className="chart-section">
        <Diagram/>
      </div>

      <div className="right-section">
        <div className="top-grid">
          <TopGrid data={parseData(portData || [])} />
        </div>

        <div className="bottom-grid">
          <div className="bottom-left">
            <div className="command-section">
              <h3>Send Command</h3>
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Command to send"
                  disabled={!isConnected}
                  style={{ padding: '5px', width: '100%' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!isConnected}
                  style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px' }}>
                  Send
                </button>
              </div>
            </div>
          </div>

          <div className="bottom-right">
            <button 
              onClick={clearPortData}
              style={{ padding: '5px 10px', backgroundColor: '#444', color: 'white', border: 'none', borderRadius: '4px' }}>
              Clear Data
            </button>
            <div style={{ marginTop: '20px' }}>
              <h3>Received Data:</h3>
              <pre style={{ height: '200px', overflow: 'auto', border: '1px solid #444', backgroundColor: '#1e1e1e', padding: '10px', color: '#0f0' }}>
                {portData?.join('\n') || ''}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;