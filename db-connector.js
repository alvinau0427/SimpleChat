const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb+srv://admin:admin@cluster0.c8zl3.mongodb.net/simple_chat?retryWrites=true';
mongoose.connect(uri, { useNewUrlParser: true });

mongoose.connection.on("error", function (error) {
    console.log(error);
});

mongoose.connection.on("open", function () {
    console.log("Connected to MongoDB database.");
});

// module.exports = connection;