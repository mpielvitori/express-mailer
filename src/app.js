const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const app = require('express')();
const config = require('config');
const mailer = require('./services/mailer');

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(config.SERVICE_HTTP_PORT, config.SERVICE_HOST, () => {
  console.info(`Listening on port ${config.SERVICE_HTTP_PORT}`);
});

app.post('/email', mailer.send);

module.exports = {
  app,
};
