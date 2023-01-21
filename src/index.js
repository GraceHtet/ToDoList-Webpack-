import './style.css';
import './assets/img/square.svg';
import './assets/img/check-square.svg';
import './assets/img/more-vertical.svg';
import './assets/img/bin.svg';
import Lists from './module/listFuns.js';

// add
const todoEl = document.querySelector('.todo-list');
const listFuns = new Lists();

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
      curlist.style.background = '#F8EDE3';
      cur.src = './assets/img/bin.svg';
      cur.className = 'bin';
      if (curlist.firstElementChild.dataset.completed === 'false') {
        curPrev.disabled = false;
      } else {
        curPrev.disabled = true;
      }
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

// edit
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

// check
const displaycheck = () => {
  const checkBoxes = document.querySelectorAll('.check-box');
  checkBoxes.forEach((checkbox) => {
    if (checkbox.dataset.completed === 'true') {
      checkbox.src = './assets/img/check-square.svg';
      checkbox.alt = 'check-square';
      checkbox.nextSibling.classList.add('checked');
    } else {
      checkbox.src = './assets/img/square.svg';
      checkbox.alt = 'square';
      checkbox.nextSibling.classList.remove('checked');
    }
  });
};

todoEl.addEventListener('click', (e) => {
  e.preventDefault();
  const cur = e.target;
  const curlist = cur.parentElement;
  const curIdx = Array.from(todoEl.childNodes).indexOf(curlist);

  if (cur.className === 'check-box') {
    listFuns.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    if (
      listFuns.tdlists[curIdx].completed === false
      && cur.dataset.completed === 'false'
    ) {
      listFuns.check(cur, curIdx);
    } else if (
      listFuns.tdlists[curIdx].completed === true
      && cur.dataset.completed === 'true'
    ) {
      listFuns.uncheck(cur, curIdx);
    }
  }
  displaycheck();
});

const todoInput = document.querySelector('.todo-input');

const submitTodo = () => {
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listFuns.storeLocal(todoInput.value);
      todoInput.value = '';
      listFuns.showList();
    }
    displaycheck();
    editTodo();
  });
};

window.addEventListener('load', () => {
  listFuns.showList();
  submitTodo();
  editTodo();
  displaycheck();
});

// clearcompleted
const clearBtn = document.querySelector('.clear');

clearBtn.addEventListener('click', () => {
  listFuns.clearCompleted();
});
