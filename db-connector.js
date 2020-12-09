const mongoose = require('mongoose');

// const uri = 'mongodb://localhost:27017/simple_chat';
const uri = 'mongodb+srv://alvinau0427:78v7QCMbsdlX0Fnr@cluster0.c8zl3.mongodb.net/simple_chat?retryWrites=true&w=majority';

mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) {
            console.log("System message: mongoose connection failed");
        } else {
            console.log("System message: mongosse connection success");
        }
    }
);

mongoose.connection.on('error', console.error);

module.exports = mongoose.connection;
