const form = document.forms.commentForm;
const loadBtn = document.querySelector('.load');
const dataList = document.querySelector('.dataList');
const content = document.querySelector('.content');
const span = document.querySelector('.span');
const userName = document.querySelector('.userName');
const authorList = document.querySelector('.authorList');
const userField = document.querySelector('#user');
const articleId = document.querySelector('#articleId');
const commentsList = document.querySelector('.commentsList');
const BtnShowComments = document.querySelector('.BtnShowComments');
const BtnSendComment = document.querySelector('.BtnSendComment');


const commentId = document.querySelector('#commentId');





async function geTData() {
  try {
    const send = await axios.post('getData');
    const res = send.data.resp;
    let temp = '';
    for (let i = 0; i < res.length; i++) {
      temp += `<option value='${res[i].id}'>${[i]} - ${res[i].articleTitle}</option>`;
    }
    dataList.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}

async function showContent(dataId) {
  const send = await axios.post(dataId);
  content.innerHTML = send.data.resp.articleContent;
  span.innerHTML = `Created At: <b>${send.data.resp.createdAt}</b>`;
  userName.innerHTML = `Author: <b>${send.data.resp.author.name}</b>`;
  /* send article id for comments */
  articleId.value = dataId;
}

dataList.addEventListener('change', (e) => {
  const id = e.target.value;
  showContent(id);
  BtnShowComments.classList.remove('disabled');
  BtnSendComment.classList.remove('disabled');
});

loadBtn.onclick = () => {
  /* занулить значения инпутов  */
  // userField.value = '';
  // articleId.value = '';
  geTData();
};

/* start comment section */

async function getUserList() {
  try {
    const send = await axios.post('getUserList');   
    const res = send.data.resp;
    let temp = '<option value="">Select Author</option>';
    for (let i = 0; i < res.length; i++) {
      temp += `<option value='${res[i].id}'>${[i]} - ${res[i].name}</option>`;
    }
    authorList.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}


/* get user list */
document.addEventListener('DOMContentLoaded', () => {
  getUserList();
});

authorList.addEventListener('change', (e) => {
  const id = e.target.value;
  userField.value = id;
});

/* Comment List */
async function getCommentList() {
  try {
    const data = { dataSend: articleId.value };
    const commentList = await axios.post('getCommentList', data);
    const datalist = commentList.data.resp;
    let temp = '';
    for (let i = 0; i < datalist.length; i++) {
      temp += `Комментарий: ${datalist[i].comment}<br> Имя: ${datalist[i].authorId.name}<br><hr>`;
    }
    commentsList.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}
BtnShowComments.onclick = () => {
  getCommentList();
};

async function sendData(data) {
  try {
    // userField.value = '';
    // articleId.value = ''; 
    const response = await axios.post('sendComment', data);
    const dataRes = response.data;
    if (dataRes) {
      commentId.value = '';
      await getCommentList();
    }
  } catch (error) {
    console.log(error);
  }
}

/* send form */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  sendData(data);
});

/* document.addEventListener('DOMContentLoaded', () => {
  const datasend = document.querySelector('.list');
  geTData(datasend);
}); */
