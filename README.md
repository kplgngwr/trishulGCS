# Trishul GCS Electron

This project is a desktop application built using **React**, **Vite**, and **Electron**. It is designed to provide a seamless and efficient user experience by combining the power of modern web technologies with the flexibility of desktop applications.

## Features

- **React**: A powerful JavaScript library for building user interfaces.
- **Vite**: A fast and modern build tool for blazing-fast development.
- **Electron**: A framework for building cross-platform desktop applications using web technologies.
- Cross-platform support (Windows, macOS, Linux).
- Hot-reloading for rapid development.
- Easy packaging and distribution.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/kplgngwr/trishulGCS.git
cd trishulGCS
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### 3. Start the Development Server

```bash
npm run dev
```

This will start the Vite development server and launch the Electron application.

### 4. Build the Application

To create a production build of the application:

```bash
npm run build
```

This will package the application for distribution.

## Project Structure

```
trishul-gcs-electron/
├── .gitignore                # Git ignore file
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point for the React app
├── package.json              # Project metadata and scripts
├── package-lock.json         # Dependency lock file
├── README.md                 # Project documentation
├── vite.config.js            # Vite configuration
├── src/                      # Source code
│   ├── electron/             # Electron backend
│   │   ├── main.js           # Electron main process
│   │   ├── preload.js        # Preload script for secure IPC
│   │   └── util.js           # Utility functions
│   ├── hooks/                # Custom React hooks
│   │   └── useElectron.js    # Hook for Electron API integration
│   ├── UI/                   # React front-end
│   │   ├── App.jsx           # Main React component
│   │   ├── main.jsx          # React entry point
│   │   ├── assets/           # Static assets (currently empty)
│   │   ├── components/       # React components
│   │   │   ├── Dashboard.jsx # Main dashboard component
│   │   │   └── Layout/       # Layout components
│   │   │       ├── Diagram.jsx  # D3.js diagram component
│   │   │       ├── Header.jsx   # Header component
│   │   │       ├── Sidebar.jsx  # Sidebar navigation component
│   │   │       ├── TopGrid.jsx  # D3.js chart component
│   │   │       └── style.css    # Styles for layout components
│   │   └── styles/             # Global styles
│       │   ├── App.css         # Main app styles
│       │   └── common.css      # Common styles for the app
└── dist-react/                # Build output (generated after running `npm run build`)
```

## Scripts

- `npm run dev`: Start the development server with hot-reloading.
- `npm run build`: Build the application for production.
- `npm run lint`: Run linting checks.
- `npm run start`: Start the Electron application.

## Technologies Used

- **React**: For building the user interface.
- **Vite**: For fast development and build processes.
- **Electron**: For creating the desktop application.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Electron](https://www.electronjs.org/)

Feel free to reach out if you have any questions or suggestions!