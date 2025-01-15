# Introduction
This is a real-time chat application built using the MERN stack. It allows users to register, log in, and engage in real-time chat with others.

# Prerequisites
Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB
- React.js
- Express.js

# Installation
 
1. Clone the repository:
   ```bash
   git clone https://github.com/OumaymaHajri/real-time-chat-app.git
   
2. Install server dependencies:

   ```bash
   cd real-time-chat-app/server
   npm install
3. Install client dependencies:
   ```bash
   cd real-time-chat-app/client
   npm install
   
 
 
# Usage
1. Start the server:

   ```bash
   cd real-time-chat-app/server
   npm start
   
2. Start the client:

   ```bash
   cd real-time-chat-app/client
   npm start

# Features
- User registration and authentication
- Real-time chat functionality
- Search for a username to initiate a new conversation
  

# Dependencies
- Server:
  - Express.js
  - Mongoose
  - jsonwebtoken (JWT for authentication)
  - bcryptjs (Password hashing)
    
- Client:
  
  - React.js
  - Socket.io-client (for real-time communication)
  - Axios (HTTP requests)
