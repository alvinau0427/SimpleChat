const mongoose = require('mongoose');

const uri = 'mongodb://admin:admin@cluster0.c8zl3.mongodb.net/simple_chat?retryWrites=true&ssl=true&replicaSet=cluster0-shard-0&readPreference=secondary';

mongoose.connect(
    uri,
    { useNewUrlParser : true, useUnifiedTopology: true },
    function(error) { 
        if (error) { 
            console.log(error); 
        }
    }
); 
      

// module.exports = mongoose.connection;