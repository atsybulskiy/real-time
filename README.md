# Real-time Client-Server Interaction

This project is a example for Real-time Client-Server Interaction using different techniques. It includes Long Polling, EventSource (Server-Sent Events) and WebSockets for bi-directional communication between client and server. The client application is implemented with React and the server is built with Node.js, Express, and WebSocket.

## Project Setup

1. You need Node.js and npm installed.
2. Clone the repository: `git clone <repo-link>`.
3. Navigate to the project directory: `cd <project-directory>`
4. Install npm dependencies:
    - For server, navigate to the server directory and execute `npm install`.
    - For client, navigate to the client directory and execute `npm install`.

## Running the Project

To start the client and server applications, you need to:

1. Start the server: In the server's root directory, execute `npm run start`.
2. Start the client: In the client's root directory, execute `npm run dev`.

Make sure that the server is running before you start the client.

## Features

- **Long Polling:** A technique that involves making HTTP requests to the server from the client that's kept open until the server has new data to send to the client.
- **EventSource (Server-Sent Events)**: An API used for opening an HTTP connection for receiving push notifications from a server in the form of DOM events. 
- **WebSockets:** A protocol that provides full-duplex communication channels over a single TCP connection to enable the server to send real-time updates.
