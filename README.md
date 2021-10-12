# Collaborative-Docs.

An application to share and edit documents.

[Visit RajaDocs](http://rajadocs.surge.sh)


## Setup.

### Server.

Inside the server folder.
- run `npm install` to install the packages
- run `npm start` to start the server

### Client.

Inside the client folder.
- run `npm install` to install the packages
- run `npm run dev` to start the development server (port 5000)
- run `npm run build` build the files, this will create static files inside the dist folder which can be served using any http server


## About.

### Server.

Technologies:
- SocketIO
- MongoDB

The server uses SocketIO to transmit the document changes to all connected users real-time.

The documents are stored in a MongoDB database.

### Client.

Technologies:
- Quill
- SocketIO

The client uses Quill for the text editor.

The changes are sent real-time to the server using SocketIO.