import { useState, useEffect, useCallback } from 'react';

// Type safety check for Electron environment
const electronAPI = window.electronAPI;

export function useElectron() {
  // Return null if not in Electron environment
  if (!electronAPI) {
    console.warn('Not running in Electron environment');
    return {
      isElectron: false,
      // Provide fallback implementations or null values
    };
  }

  return {
    isElectron: true,
    
    // File operations
    openFile: electronAPI.openFile,
    saveFile: electronAPI.saveFile,
    
    // Serial port operations
    listPorts: electronAPI.listPorts,
    connectToPort: electronAPI.connectPort,
    writeToPort: electronAPI.writeToPort,
    disconnectPort: electronAPI.disconnectPort,
    
    // Serial port data subscription
    usePortData: () => {
      const [portData, setPortData] = useState([]);
      
      // Set up listener when component mounts
      useEffect(() => {
        const handleData = (data) => {
          setPortData(prev => [...prev, data]);
        };
        
        // Register the callback
        electronAPI.onPortData(handleData);
        
        // Clean up listener when component unmounts
        return () => electronAPI.removePortDataListener();
      }, []);
      
      // Function to clear data
      const clearData = useCallback(() => setPortData([]), []);
      
      return [portData, clearData];
    }
  };
}