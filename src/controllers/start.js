const ngrok = require('ngrok');

const AUTH_TOKEN = Environment.NGROK_AUTHTOKEN;

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
                addr: 'localhost:8080',
                proto: 'http'
            });

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }

        return response.json({ message: 'Started at ' + context.tunnel });
    };
}