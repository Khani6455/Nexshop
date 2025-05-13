
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import the compiled server API code
require('./dist/server/api/index.js');

console.log('Server script loaded successfully');
console.log('MongoDB URI is configured:', process.env.MONGODB_URI ? 'Yes' : 'No');

// This file acts as the entry point for the Express server
// The actual server implementation is in ./dist/server/api/index.js

