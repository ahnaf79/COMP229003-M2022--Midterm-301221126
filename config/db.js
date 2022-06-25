// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://ahnaf79:uT7canUdu9ORWMbh@cluster0.55ydt.mongodb.net/used_car_store?retryWrites=true&w=majority";


// Database setup
let mongoose = require('mongoose');

module.exports = function() {



    mongoose.connect(atlasDB);
    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error:'));
    mongodb.once('open', () => {
        console.log('===> Connected to MongoDB.');
    })

    return mongodb;
}