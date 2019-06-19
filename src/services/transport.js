const Promise = require('bluebird');
const nodemailer = require('nodemailer');
const config = require('config');

/**
 * Get transport
 * @return {nodemailer.Transport}
 */
module.exports = async () => {
  console.log(`Creating transport ${config.transport.service}`);
  const transport = nodemailer.createTransport({
    service: config.transport.service,
    auth: {
      user: config.transport.username,
      pass: config.transport.password,
    },
  });

  // const uri = 'smtps://'
  //             + `${config.transport.username}`
  //             + `:${config.transport.password}`
  //             + `@${config.transport.host}`;
  // const transport = nodemailer.createTransport(uri);
  await new Promise((resolve, reject) => {
    console.log('Verify');
    transport.verify((err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      console.log('tranport works');
      return resolve();
    });
  });

  console.log('Connected to transport');
  return transport;
};
