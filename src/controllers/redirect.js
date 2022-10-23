module.exports = function () {
    return function (_, response) {
        return response.redirect('/app');
    };
}