const ngrok = require('ngrok');

module.exports = function (context) {
    return async function (_, response) {
        if (!context.tunnel)
            return response.status(400).json({ error: 'Tunnel is not running' });

        try {
            await ngrok.disconnect();
            context.tunnel = null;
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: error.message });
        }

        return response.json({ message: 'Stopped the tunnel' });
    };
}