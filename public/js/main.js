const form = document.forms.formTest;
const btn = document.querySelector('.specialBtn');
const respTxt = document.querySelector('.resttext');
const articleAddedTxt = document.querySelector('.articleAddedTxt');
const articleTitleError = document.querySelector('.articleTitleError');
const articleContentError = document.querySelector('.articleContentError');
const authorError = document.querySelector('.authorError');
const articleContent = document.querySelector('#articleContent');
const dataList = document.querySelector('.dataList');
const userField = document.querySelector('.user');


async function loadData(data) {
  const quillArea = document.querySelector('.ql-editor');
  try {
    articleContent.value = '';
    const response = await axios.post('postData', data);
    const dataRes = response.data;
    if (dataRes.response) {
      // значения инпутов
      form.articleTitle.value = '';
      form.articleContent.value = '';
      // form.userId.value = '';
      quillArea.innerText = '';
      // значения ошибок
      articleTitleError.innerText = '';
      articleContentError.innerText = '';
      authorError.innerText = '';
      articleAddedTxt.innerText = dataRes.returnTitle;
    } else {
      articleAddedTxt.innerText = '';
      if (dataRes.statusValidate.errmess.fields.articleTitle) {
        articleTitleError.innerText = dataRes.statusValidate.errmess.fields.articleTitle;
      } else {
        articleTitleError.innerText = '';
      }
      if (dataRes.statusValidate.errmess.fields.articleContent) {
        articleContentError.innerText = dataRes.statusValidate.errmess.fields.articleContent;
      } else {
        articleContentError.innerText = '';
      }
      if (dataRes.statusValidate.errmess.fields.author) {
        authorError.innerText = dataRes.statusValidate.errmess.fields.author;
      } else {
        authorError.innerText = '';
      }
    }
    respTxt.innerText = dataRes.response;
    btn.classList.remove('disabled');
  } catch (error) {
    console.log(error);
  }
}

const quill = new Quill('.editor', {
  modules: { 
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  },
  theme: 'snow',
  placeholder: 'Type something...',
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const about = document.querySelector('input[name=articleContent]');
  about.value = quill.getText();// JSON.stringify(quill.getText());
  // about.value = JSON.stringify(quill.getContents());
  btn.classList.add('disabled');
  const data = new FormData(form);
  loadData(data);
});


async function getUserList() {
  try {
    const send = await axios.post('getUserList');   
    const res = send.data.resp;
    let temp = '<option value="">Select Author</option>';
    for (let i = 0; i < res.length; i++) {
      temp += `<option value='${res[i].id}'>${[i]} - ${res[i].name}</option>`;
    }
    dataList.innerHTML = temp;
  } catch (error) {
    console.log(error);
  }
}

/* get user list */
document.addEventListener('DOMContentLoaded', () => {
  getUserList();
});

dataList.addEventListener('change', (e) => {
  const id = e.target.value;
  userField.value = id;
});
