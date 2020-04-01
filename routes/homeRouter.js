const express = require('express');
const normalise = require('ajv-error-messages');
const Ajv = require('ajv');

const homeRouter = express.Router();

const multer = require('multer');

const upload = multer({ dest: 'public/upload' });

const articleController = require('../controllers/articleController');
const homeController = require('../controllers/homeController');
const commentController = require('../controllers/commentController');

const ajv = Ajv({ allErrors: true, $data: true });
const userSchema = require('../schemas/userSchema.json');

homeRouter.get('/', homeController.index);

async function validateData(data) {
  try {
    const valid = await ajv.validate(userSchema, data);
    let ok = '';
    let normalisedErrors = '';
    // const normalisedErrors = normalise(ajv.errors);
    // console.log(normalisedErrors.fields);
    // console.log(ajv.errorsText(valid.errors));
    if (valid) {
      ok = true;
    } else {
      normalisedErrors = normalise(ajv.errors);
      ok = false;
    }
    const dataRes = { return: ok, errmess: normalisedErrors };
    return dataRes;
  } catch (error) {
    return console.error(error);
  }
}
/* Post Data */
homeRouter.post('/postData', upload.none(), async (req, res) => {
  try {
    const title = req.body.articleTitle;
    const data = ({ articleTitle: req.body.articleTitle, articleContent: req.body.articleContent, author: req.body.userId });
    const validate = await validateData(data);
    if (!validate.return) {
      return res.json({ response: false, statusValidate: validate });
    }
    const dataToController = await homeController.sendDataToController(data);
    return res.json({ response: true, statusValidate: validate, saweRecord: dataToController, returnTitle: title });
  } catch (error) {
    return res.json({ response: false, statusValidate: error });
  }
});

/* Get Data */
homeRouter.post('/getData', upload.none(), async (req, res, next) => {
  try {
    const userList = await articleController.getDataFromController();
    const list = userList.map((value) => {
      const { articleTitle, articleContent, id } = value;
      return { articleTitle, articleContent, id };
    });
    return res.json({ resp: list });
  } catch (error) {
    console.log(error);
  }
});

/* Get User List */
homeRouter.post('/getUserList', upload.none(), async (req, res, next) => {
  try {
    const userList = await homeController.getUserList();
    const list = userList.map((value) => {
      const { name, id } = value;
      return { name, id };
    });
    return res.json({ resp: list });
  } catch (error) {
    console.log(error);
  }
});

/* Send Comment */
homeRouter.post('/sendComment', upload.none(), async (req, res, next) => {
  try {
    const data = ({
      comment: req.body.comment,
      authorId: req.body.userId,
      articleId: req.body.articleId 
    });
    const commentSave = await commentController.saveComment(data);
    /*const list = commentSave.map((value) => {
      const { comment, authorId, articleId } = value;
      return { comment, authorId, articleId };
    });*/
    return res.json({ resp: commentSave });
  } catch (error) {
    console.log(error);
  }
});

/* Get Comment List */
homeRouter.post('/getCommentList', upload.none(), async (req, res, next) => {
  try {
    const data = req.body.dataSend;
    const commentList = await commentController.getComments(data);
    const respData = commentList.map((value) => {
      const { comment, authorId, articleId } = value;
      return { comment, authorId, articleId };
    });
    return res.json({ resp: respData });
  } catch (error) {
    console.log(error);
  }
});

/* Get Data Id*/
homeRouter.post('/:id', upload.none(), async (req, res, next) => {
  try {
    const userList = await articleController.getDataFromControllerById(req.params.id);
    return res.json({ resp: userList });
  } catch (error) {
    console.log(error);
  }
});

// getCommentList
module.exports = homeRouter;
