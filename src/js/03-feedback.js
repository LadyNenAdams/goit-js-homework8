import '../css/common.css';
import '../css/03-feedback.css';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('input'),
};
const formData = {};

populateTextarea();

refs.form.addEventListener('input', throttle(onTextareaInput, 500));

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const finalData = {};
  for(const [key, value] of formData.entries()){
  if (!value) {
      alert("Все поля должны быть заполнены!");
      return;
  }
      finalData[key] = value;
  }
  console.log(finalData);
  form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  const { name, value } = event.target;
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedData) {
      const formData = {
      ...parsedData,
      [name] : value,    
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
      } else {
      const formData = {[name] : value, 
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }
}

function populateTextarea() {
  const parsedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (parsedData) {
      const inputNames = Object.keys(parsedData);
  inputNames.forEach(inputName => {
      const input = refs.form.elements[inputName];
      input.value = parsedData[inputName];
  });
  }
}
