var express = require('express');
var router = express.Router();
var fs = require("fs");
var parser = require("body-parser");
// var {initDb, showAnimals, addAnimals} = require("./mongo");
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
const url = process.env.DATABASE_URI;
// const url = "mongodb://localhost/27017";
var db_name = "Agricoach";
var collection = "County";
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

async function initDb(func, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(db_name);
        createCollection(dbo, db, collection).then(function () {
            // addAnimals(dbo, db)
        }).then(function () {
            func(dbo, db, res);
        });
    });
}

async function showAnimals(dbo, db, res) {
    dbo.collection(collection).find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
    });
    // return a;
}

async function createCollection(dbo, db, name) {
    dbo.createCollection(name, function (err, result) {
        if (!err) {
			console.log(name + " created");
			db.close();
		}
    })
}

async function addAnimals(dbo, db) {
    let animals = ["goats", "sheep", "horses", "cats", "dogs", "cows", "camels", "chicken", "cats", "dogs", "cows", "ducks", "pigs", "bees"];
    animals.map((animal) => {
    	if (!findAnimal(dbo, db, animal)) {
			dbo.collection("AnimalGroups").insertOne({'name': `${animal}`}, function (err, res) {
				if (err) throw err;
				console.log(animal + " inserted");
				db.close();
			})
		}
    })
}

function findAnimal(dbo, db, animal){
	let flag = false;
	let filter_dict = {"name":animal};
	if (dbo.AnimalGroups.countDocuments(filter_dict)) {
		flag = false
	}else {
		db.close();
		flag = true;
	}
	return flag;
}

/* GET home page. */
router.post('/', function (req, res) {
    console.log(req.body);
    let animals = initDb(showAnimals, res);
});

/* GET home page. */
router.get('/', function (req, res) {
    // let animals = showAnimals();
    let animals = initDb(showAnimals, res);
    // res.send("we good");
});

module.exports = router;