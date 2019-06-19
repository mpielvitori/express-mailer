const Promise = require('bluebird');
const nodemailer = require('nodemailer');
const config = require('config');

/**
 * Get transport
 * @return {nodemailer.Transport}
 */
module.exports = async () => new Promise(async (resolve) => {
  console.log(`Creating transport ${config.transport.service}`);
  const trans = nodemailer.createTransport({
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
  // const trans = nodemailer.createTransport(uri);
  await new Promise((vresolve, vreject) => {
    console.log('Verify');
    trans.verify((err) => {
      if (err) {
        console.error(err);
        return vreject(err);
      }

      console.log('tranport works');
      return vresolve();
    });
  });

  console.log('Connected to transport');
  resolve(trans);
});
