const CommentModel = require('./../models/comment.js');

const saveComment = async (data) => {
  try {
    const comment = await new CommentModel(data);
    const ret = await comment.save();
    return ret;
  } catch (error) {
    console.log(error);
  }
};
// articletId - айди статьи
const getComments = async (id) => {
  try {
    const commentList = await CommentModel.find({ articleId: id }).populate('authorId').populate('articleId');
    return commentList;
  } catch (error) {
    console.log(error);
  }
};


module.exports.saveComment = saveComment;
module.exports.getComments = getComments;
