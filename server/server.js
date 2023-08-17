// Import required dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

// Import GraphQL schema and resolvers
const { typeDefs, resolvers } = require('./schemas');

// Import database connection
const db = require('./config/connection');
const {authMiddleware} = require('./utils/auth');

// Define the port for the server, defaults to 3001
const PORT = process.env.PORT || 3001;

// Create an instance of the Express app
const app = express();

// Create an instance of the ApolloServer with schema and resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Middleware for parsing urlencoded and JSON data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve the static files from the client build directory if in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Define a route for the root URL to serve the index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Start the Apollo server and listen to the defined port
const startApolloServer = async (typeDefs, resolvers) => {
  // Start the Apollo server
  await server.start();

  // Apply the Apollo middleware to the Express app
  server.applyMiddleware({ app });

  // When the database connection is opened, start the Express app and listen on the defined port
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

// Start the server with the defined schema and resolvers
startApolloServer(typeDefs, resolvers);
