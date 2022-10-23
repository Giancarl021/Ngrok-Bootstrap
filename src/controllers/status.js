module.exports = function (context) {
    return function (_, response) {
        return response.json({
            message: context.tunnel ? ('Executando em ' + context.tunnel) : 'Parado',
            status: context.tunnel ? 'running' : 'stopped'
        });
    };
}