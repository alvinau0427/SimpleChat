const mongoose = require('mongoose');

// const uri = 'mongodb://localhost:27017/simple_chat';
const uri = 'mongodb+srv://user:user@cluster0.c8zl3.mongodb.net/simple_chat?retryWrites=true&w=majority';

mongoose.connect(
    uri,
    { useNewUrlParser : true, useUnifiedTopology: true },
    function(error) { 
        if (error) { 
            console.log(error); 
        }
    }
); 
      
module.exports = mongoose.connection;