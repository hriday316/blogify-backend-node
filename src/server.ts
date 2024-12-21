/* eslint-disable no-console */
import config from './app/config';
import mongoose from 'mongoose';
import app from './app';
import { Server } from 'http';

let server: Server;

async function main() {
  try {
    await mongoose.connect(`${config.dburl}`);
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

//  hadle unhandle rejection error
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

//  hadle uncaught Exception error
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
