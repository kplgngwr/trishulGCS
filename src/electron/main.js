import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { isDev } from './util.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

// For ES modules in Node.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Store the active serial port connection
let serialPort = null;

app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            // Security settings
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            // Use preload script
            preload: path.join(__dirname, 'preload.js')
        }
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5000');
        // Open DevTools in development mode
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'));
    }
    
    // Set up file operation handlers
    setupIpcHandlers(mainWindow);
});

function setupIpcHandlers(mainWindow) {
    // File handling
    ipcMain.handle('file:open', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
            properties: ['openFile']
        });
        
        if (!canceled) {
            try {
                const content = await fs.readFile(filePaths[0], 'utf8');
                return { filePath: filePaths[0], content };
            } catch (err) {
                return { error: err.message };
            }
        }
        return { canceled: true };
    });

    ipcMain.handle('file:save', async (event, content) => {
        const { canceled, filePath } = await dialog.showSaveDialog(mainWindow);
        
        if (!canceled) {
            try {
                await fs.writeFile(filePath, content);
                return { success: true, filePath };
            } catch (err) {
                return { error: err.message };
            }
        }
        return { canceled: true };
    });
    
    // Serial port handling - requires SerialPort library
    ipcMain.handle('serial:list', async () => {
        try {
            // You'll need to install the SerialPort library:
            // npm install serialport
            const { SerialPort } = await import('serialport');
            const ports = await SerialPort.list();
            return ports;
        } catch (err) {
            return { error: err.message };
        }
    });

    ipcMain.handle('serial:connect', async (event, portPath, options) => {
        try {
            const { SerialPort } = await import('serialport');
            
            // Close existing connection if any
            if (serialPort && serialPort.isOpen) {
                await new Promise(resolve => serialPort.close(resolve));
            }
            
            // Create new connection
            serialPort = new SerialPort({ path: portPath, ...options });
            
            // Forward incoming data to renderer
            serialPort.on('data', (data) => {
                mainWindow.webContents.send('serial:data', data.toString());
                console.log(data.toString());
            });
            
            return { success: true, message: `Connected to ${portPath}` };
        } catch (err) {
            return { error: err.message };
        }
    });

    ipcMain.handle('serial:write', async (event, data) => {
        try {
            if (!serialPort || !serialPort.isOpen) {
                return { error: 'No active serial connection' };
            }
            
            await new Promise((resolve, reject) => {
                serialPort.write(data, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            
            return { success: true };
        } catch (err) {
            return { error: err.message };
        }
    });

    ipcMain.handle('serial:disconnect', async () => {
        try {
            if (serialPort && serialPort.isOpen) {
                await new Promise(resolve => serialPort.close(resolve));
                serialPort = null;
                return { success: true };
            }
            return { success: false, message: 'No active connection' };
        } catch (err) {
            return { error: err.message };
        }
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});