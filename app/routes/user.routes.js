var UserController = require('../controllers/user.controllers');

module.exports = function(app){
    app.route('/user')
            .get(UserController.user)
            .post(UserController.user);
};