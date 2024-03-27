import app from "./app";

/**
 * The port number on which the server will listen.
 * If the PORT environment variable is not set, the default value is 3000.
 */
const PORT = process.env.PORT ?? 3000;

/**
 * Starts the server and listens on the specified port.
 * @param {number} port - The port number on which the server will listen.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
