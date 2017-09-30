import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

import configFile from '../config.json';

import createLink from './routes/createLink';
import viewImage from './routes/viewImage';

let app = express();


const env = process.env.NODE_ENV || 'development';
const config = configFile[env] || configFile['development'];

mongoose.connect(config.db, {
  useMongoClient: true
});

if (env !== 'test') {
  app.use(morgan('dev'));
}
app.use('/link', createLink);
app.use('/image/:id.png', viewImage);

// Only open port if this is run directly, not testing
if (!module.parent) {
  app.listen(config.port, () => {
    console.log(`Starting on port ${config.port}`);
  });
}

module.exports = app;