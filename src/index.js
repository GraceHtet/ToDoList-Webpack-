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

todoEl.addEventListener('click', (e) => {
  listFuns.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
  const lis = listFuns.tdlists;
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
    Lists.delList(curIdx, lis);
    Lists.showList(lis, todoEl);
  }

  if (curlist.lastElementChild.className === 'bin') {
    if (cur.className === 'todo-text') {
      curlist.addEventListener('focusout', () => {
        textnormal(cur);
      });
    }
  }
});

// edit
const editTodo = () => {
  const todoEl = document.querySelector('.todo-list');
  const todoTexts = todoEl.querySelectorAll('.todo-text');
  const tdlist = listFuns.tdlists;
  todoTexts.forEach((text, idx) => {
    text.onchange = () => {
      Lists.edit(text.value, idx, tdlist);
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
    const tdlist = listFuns.tdlists;
    if (
      tdlist[curIdx].completed === false
      && cur.dataset.completed === 'false'
    ) {
      Lists.check(cur, curIdx, tdlist);
    } else if (
      tdlist[curIdx].completed === true
      && cur.dataset.completed === 'true'
    ) {
      Lists.uncheck(cur, curIdx, tdlist);
    }
  }

  displaycheck();
});

// clearcompleted
const clearBtn = document.querySelector('.clear');
const clearAllChecked = () => {
  clearBtn.addEventListener('click', () => {
    const lis = listFuns.tdlists;
    Lists.clearCompleted(lis);
    listFuns.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    Lists.showList(listFuns.tdlists, todoEl);
  });
};

clearAllChecked();

const todoInput = document.querySelector('.todo-input');

const submitTodo = () => {
  listFuns.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
  // const lis = listFuns.tdlists;
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      listFuns.storeLocal(todoInput.value);
      todoInput.value = '';
      Lists.showList(listFuns.tdlists, todoEl);
    }
    displaycheck();
    editTodo();
    clearAllChecked();
  });
};

window.addEventListener('load', () => {
  const lis = listFuns.tdlists;
  Lists.showList(lis, todoEl);
  submitTodo();
  editTodo();
  displaycheck();
});
