import './style.css';
import './assets/img/square.svg';
import './assets/img/more-vertical.svg';
import './assets/img/bin.svg';

// add
const todoEl = document.querySelector('.todo-list');

class Lists {
  constructor() {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
  }

  delList(item, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    const tdIdx = this.tdlists[idx].index;
    this.tdlists.splice(tdIdx, 1);
    this.tdlists.forEach((tdlist, tdnum) => {
      tdlist.index = tdnum;
    });

    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
    this.showList();
  }

  showList() {
    todoEl.innerHTML = '';
    this.tdlists.forEach((tdlist) => {
      const lists = document.createElement('div');
      lists.classList = 'lists';
      const checkBox = document.createElement('img');
      checkBox.src = './assets/img/square.svg';
      checkBox.classList = 'check-box';
      checkBox.alt = 'square';

      const todoText = document.createElement('input');
      todoText.type = 'text';
      todoText.name = 'text';
      todoText.classList = 'todo-text';
      todoText.value = tdlist.description;
      todoText.disabled = true;

      const more = document.createElement('img');
      more.src = './assets/img/more-vertical.svg';
      more.classList = 'more';
      more.alt = 'more-vertical';

      lists.append(checkBox, todoText, more);
      todoEl.appendChild(lists);
    });
  }

  storeLocal(td) {
    this.tdlists.push({
      description: td,
      completed: false,
      index: this.tdlists.length,
    });
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
  }

  edit(val, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    this.tdlists[idx].description = val;
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
  }
}

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
