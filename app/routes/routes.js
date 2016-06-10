var Controller = require('../controllers/controllers');

module.exports = function(app){
    app.route('/')
            .get(Controller.index);
    app.route('/upload')
            .get(Controller.upload)
            .post(Controller.doupload);
};