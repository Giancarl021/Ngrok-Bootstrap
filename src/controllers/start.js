const ngrok = require('ngrok');

const AUTH_TOKEN = Environment.NGROK_AUTHTOKEN;
const HOST = Environment.SERVICE_HOST;
const PORT = Environment.SERVICE_PORT;

module.exports = function (context) {
    return async function (_, response) {
        if (context.tunnel)
            return response.status(400).json({ error: 'Already running at ' + context.tunnel });

        try {
            try {
                await ngrok.disconnect();
            } catch {}

            context.tunnel = await ngrok.connect({
                authtoken: AUTH_TOKEN,
                addr: `${SERVICE_HOST}:${SERVICE_PORT}`,
                proto: 'http'
            });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }

        return response.json({ message: 'Started at ' + context.tunnel });
    };
}