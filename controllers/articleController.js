const ArticleModel = require('../models/article.js');

const getDataFromController = async () => {
  try {
    const userList = await ArticleModel.find();
    return userList;
  } catch (error) {
    console.log(error);
  }
};

const getDataFromControllerById = async (idUser) => {
  try {
    const userList = await ArticleModel.findById(idUser).populate('author');
    return userList;
  } catch (error) {
    console.log(error);
  }
};


module.exports.getDataFromController = getDataFromController;
module.exports.getDataFromControllerById = getDataFromControllerById;
