const {
  uploadImg,
    addAnimalImage,
    addAnimalGroup,
    getAnimal,
    getAnimalImage,
    deleteAllAnimalImages,
    deleteAllAnimalGroups,
    deleteAnimalImage,
    deleteAnimalGroup,
} = require("../models/models");

const FetchController = (app) => {

  app.post('/animals/images/add', uploadImg , addAnimalImage);

  app.get('/animals/images', function (req, res) {
      getAnimalImage(req, res);
  });
  app.post('/animals/images/delete-all', function (req, res) {
      deleteAllAnimalImages(req, res);
  });

};

module.exports = {
  FetchController,
};
