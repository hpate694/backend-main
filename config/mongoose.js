// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, {
		useUnifiedTopology: true,
		useNewUrlParser: true, useCreateIndex: true 
		}).then(() => console.log('DB Connected!'))
		.catch(err => {
		console.log('Error');
		});

    // Load the model 
    require('../app/models/user.server.model');
    require('../app/models/question.server.model');
    require('../app/models/exercise.server.model');
    require('../app/models/diet.server.model');
    require('../app/models/plan.server.model');

    return db;
};