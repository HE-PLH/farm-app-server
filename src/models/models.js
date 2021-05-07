var fs = require('fs');
var request = require('request');
var path = require('path');
const multer = require('multer');
const db = require("../database/database");
var appDir = path.dirname(require.main.filename);
// const { default: axios } = require("axios");
const Schema = db.mongoose.Schema;
const Model = db.mongoose.model;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/models/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({storage: storage}).single('image');


const AnimalGroups = new Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
    },
});

const AnimalImages = new Schema({
    id: {
        type: String,
    },

    name: {
        type: String,
    },

    image: {
        type: String,
    },

    description: {
        type: String,
    },

    capture_time: {
        type: String,
    },
});


const animalGroupModel = Model("AnimalGroups", AnimalGroups, "AnimalGroups");

const animalImageModel = Model("AnimalImages", AnimalImages, "AnimalImages");


const getAnimal = async (req, res) => {
    animalGroupModel.find(req.query, (err, docs) => {
        if (err) {
            res.send({
                message: "Error Occured",
                info: docs,
            });
            return 0;
        }

        if (docs === null || docs.length === 0) {
            res.send({
                message: "No crops available",
                info: docs,
            });
            return 0;
        }

        res.send(
            {
                info: docs
            }
        );
    }).sort({name: 1});
};

const getAnimalImage = (req, res) => {
    animalImageModel.find(req.query, (err, docs) => {
        if (err) {
            res.send({
                message: "Error Occured",
                info: docs,
            });
            return 0;
        }

        if (docs === null || docs.length === 0) {
            res.send({
                message: "No Varieties available for this crop",
                info: docs,
            });
            return 0;
        }
        if(docs.length===1){
            let p = (path.join(__dirname, "../../"+docs[0].image));
            res.sendFile(p.replace("\\", "/"))
        }else{
            res.send(docs);
        }

        // res.sendFile(path.join(__dirname, docs.image+"jpg"));
    });
};


const addAnimalGroup = (req, res) => {
    const inputData = req.body;
    animalGroupModel.insertMany(inputData, function (data) {
        res.send('crop created');
        console.log("crop was created");
    });
};

const addAnimalImage = (req, res) => {
    const inputData = [{
        id: req.body.id,
        name: req.body.name,
        image: req.file.path,  //update this
        description: req.body.description,
        capture_time: req.body.capture_time,
    }];
    animalImageModel.insertMany(inputData, function (data) {
        res.send('animal image created successfully');
        console.log("animal image was created successfully");
    });
};

const deleteAnimalGroup = (req, res) => {
    animalGroupModel.findByIdAndDelete(req.body.id, function (err) {
        if (err) console.log(err);
        console.log("crop successful deletion");
        res.send("crop successfully deleted");
    });
};

const deleteAllAnimalGroups = (req, res) => {
    animalGroupModel.deleteMany({}, function (err) {
        if (err) console.log(err);
        console.log("all crops successful deletion");
        res.send("all crops successfully deleted");
    });
};

const deleteAllAnimalImages = (req, res) => {
    animalImageModel.remove({}, function (err) {
        if (err) console.log(err);
        console.log("all images successful deletion");
        res.send("all images successfully deleted");
    });
};

const deleteAnimalImage = (req, res) => {
    animalImageModel.findByIdAndDelete(req.body.id, function (err) {
        if (err) console.log(err);
        console.log("variety successful deletion");
        res.send("variety successfully deleted");
    });
};

module.exports = {
    getAnimal,
    getAnimalImage,
    addAnimalGroup,
    addAnimalImage,
    deleteAnimalGroup,
    deleteAnimalImage,
    deleteAllAnimalGroups,
    deleteAllAnimalImages,
    uploadImg,
};
