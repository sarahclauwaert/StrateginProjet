const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://sarahclauwaert:Clauwaert0710@cluster0.m8mys4i.mongodb.net/?retryWrites=true&w=majority");

connect.then(()=> {
    console.log("Base de donnée connecté")
})
.catch(() => {
    console.log("Base de donnée n'est pas connecté")
});

const LogInSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type:String,
        required:true
    }
});

const collection = new mongoose.model("users", LogInSchema);
module.exports = collection;