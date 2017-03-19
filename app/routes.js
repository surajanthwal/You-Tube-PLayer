
module.exports = function (app) {
    // frontend routes =========================================================
    app.get('*', function (req, res) {
        res.sendfile('./public/index.html'); // load our public/index.html file
    });

};
