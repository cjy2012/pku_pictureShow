var Controller = require('../controllers/controllers');

module.exports = function(app){
    app.route('/')
            .get(Controller.index);
};