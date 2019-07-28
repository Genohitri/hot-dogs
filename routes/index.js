const hotDogRoutes = require('./hot_dog_routes');
module.exports = function(app, db) {
  hotDogRoutes(app, db);
  
};