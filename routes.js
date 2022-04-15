const authLocal = require('./auth/local');
const authGoogle = require('./auth/google');

const user = require('./api/user');
const task = require('./api/task');
const service = require('./api/service');
const specialty = require('./api/speciality');
const appointment = require('./api/appointment');
const clinicHistory = require('./api/clinicHistory');
const upload = require('./api/upload');

function routes(app) {
  app.use('/auth/local', authLocal);
  app.use('/auth/google', authGoogle);
  app.use('/api/users', user);
  app.use('/api/tasks', task);
  app.use('/api/services', service);
  app.use('/api/appointments', appointment);
  app.use('/api/specialities', specialty);
  app.use('/api/clinicHistorys', clinicHistory);
  app.use('/api/upload', upload);
}

module.exports = routes;
