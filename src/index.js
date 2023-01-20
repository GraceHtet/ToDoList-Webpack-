import './style.css';
import './assets/img/square.svg';
import './assets/img/more-vertical.svg';
import './assets/img/bin.svg';
import Lists from './module/listFuns.js';

// add
const todoEl = document.querySelector('.todo-list');

const listFuns = new Lists();
listFuns.showList();

// remove
const textnormal = (item) => {
  item.parentElement.style.background = '#fff';
  item.nextElementSibling.src = './assets/img/more-vertical.svg';
  item.nextElementSibling.className = 'more';
  item.disabled = true;
};

const removeTodo = () => {
  todoEl.addEventListener('click', (e) => {
    e.preventDefault();
    const cur = e.target;
    const curPrev = cur.previousElementSibling;
    const curlist = cur.parentElement;
    const curIdx = Array.from(todoEl.childNodes).indexOf(curlist);

    if (cur.className.includes('more')) {
      curlist.classList.add('active');
      curlist.style.background = '#F8EDE3';
      cur.src = './assets/img/bin.svg';
      cur.className = 'bin';
      curPrev.disabled = false;
    } else if (cur.className.includes('bin')) {
      listFuns.delList(curlist, curIdx);
    }

    if (curlist.lastElementChild.className === 'bin') {
      if (cur.className === 'todo-text') {
        curlist.addEventListener('focusout', () => {
          textnormal(cur);
        });
      }
    }
  });
};

removeTodo();

const editTodo = () => {
  const todoEl = document.querySelector('.todo-list');
  const todoTexts = todoEl.querySelectorAll('.todo-text');
  todoTexts.forEach((text, idx) => {
    text.onchange = () => {
      listFuns.edit(text.value, idx);
    };

    text.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === 'Tab') textnormal(text);
    });
  });

  localStorage.setItem('tdlists', JSON.stringify(listFuns.tdlists));
};

// submit
const todoInput = document.querySelector('.todo-input');

const submitTodo = () => {
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listFuns.storeLocal(todoInput.value);
      todoInput.value = '';
      listFuns.showList();
    }

    editTodo();
  });
};

submitTodo();

editTodo();
