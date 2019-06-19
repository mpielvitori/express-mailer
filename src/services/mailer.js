/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const config = require('config');
const Promise = require('bluebird');
const initTransport = require('./transport');

const TEMPLATE_PATH = '../templates/';

let transport;

exports.send = async (req, res) => {
  console.info('Send Message ', req.body);
  await sendInmediatly(
    req.body.message,
    req.body.options || undefined,
  );
  res.status(200).send({
    message: 'OK!',
  });
};

/**
 * Get transport instance or create and subcribe it
 * @return {nodemailer.Transport}
 */
const getTransport = async function getTransport() {
  if (!transport) {
    transport = await new Promise(async (resolve) => {
      const trans = await initTransport();
      return resolve(trans);
    });
  }

  return transport;
};

/**
 * Send menssage inmediatly
 * @param {object} message
 * @param {object} [options]
 * @return {Promise<void>}
 */
const sendInmediatly = async function sendInmediatly(message, options = {}) {
  const trans = await getTransport();

  if (options.template && config.templates && config.templates[options.template]) {
    const source = fs.readFileSync(path.join(
      __dirname,
      TEMPLATE_PATH + config.templates[options.template],
    ), 'utf8');
    const template = Handlebars.compile(source);
    message = {
      ...message,
      from: config.email.from,
      html: template(options.params),
    };
  } else {
    message = {
      ...message,
      from: config.email.from,
    };
  }

  const info = await trans.sendMail(message);

  console.info(`Mail sent as ${info.messageId}`);


  return info;
};
