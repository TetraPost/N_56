const ArticleModel = require('../models/article.js');
const UserModel = require('../models/user.js');

module.exports.index = function (req, res) {
  res.render('index', { title: 'Try Post Data'});
};

const sendDataToController = async (data) => {
  try {
    const article = await new ArticleModel(data);
    const succes = await article.save();
    let ret = '';
    if (succes) {
      ret = true;
    } else {
      ret = false;
    }
    return ret;
  } catch (error) {
    console.log(error);
  }
};

const getUserList = async () => {
  try {
    const userList = await UserModel.find();
    return userList;
  } catch (error) {
    console.log(error);
  }
};
module.exports.sendDataToController = sendDataToController;
module.exports.getUserList = getUserList;
