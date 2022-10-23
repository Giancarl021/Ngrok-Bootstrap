const start = require('./start');
const stop = require('./stop');
const status = require('./status');
const redirect = require('./redirect');

const context = {};

module.exports = function () {
    return {
        start: start(context),
        stop: stop(context),
        status: status(context),
        redirect: redirect(context)
    };
}