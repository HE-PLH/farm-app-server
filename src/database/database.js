let mongoose = require("mongoose");

let localString="mongodb://localhost:27017/foodAppDb";
let app_string="mongodb+srv://test:test@realmcluster.nr0ql.mongodb.net/foodAppDb?retryWrites=true&w=majority";
let app_string1="mongodb+srv://patrick:Mishtaniga0717!@realmcluster.nr0ql.mongodb.net/foodAppDb";
let online="mongodb+srv://test:test@cluster0.xvae9.mongodb.net/foodAppDb?authSource=admin&replicaSet=atlas-13k2m2-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"

const url = process.env.DATABASE_URI;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(
    `${app_string1}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
);

module.exports={
    mongoose
};