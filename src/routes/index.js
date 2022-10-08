const apiRoute = require('./apiRoute');

function route(app) {
    app.use('/api', apiRoute);
}
module.exports = route;
