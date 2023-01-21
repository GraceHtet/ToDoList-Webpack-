const todoEl = document.querySelector('.todo-list');

export default class Lists {
  constructor() {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
  }

  delList(item, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    const tdIdx = this.tdlists[idx].index;
    this.tdlists.splice(tdIdx - 1, 1);
    this.tdlists.forEach((tdlist, tdnum) => {
      tdlist.index = tdnum + 1;
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
      checkBox.setAttribute('data-completed', tdlist.completed);
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
      index: this.tdlists.length + 1,
    });
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
  }

  edit(val, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    this.tdlists[idx].description = val;
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
    this.showList();
  }

  check(item, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    this.tdlists[idx].completed = true;
    item.dataset.completed = this.tdlists[idx].completed;
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
  }

  uncheck(item, idx) {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    this.tdlists[idx].completed = false;
    item.dataset.completed = this.tdlists[idx].completed;
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
  }

  clearCompleted() {
    this.tdlists = JSON.parse(localStorage.getItem('tdlists')) || [];
    this.tdlists = this.tdlists.filter((tdlist) => tdlist.completed === false);
    this.tdlists.forEach((tdlist, tdnum) => {
      tdlist.index = tdnum + 1;
    });
    localStorage.setItem('tdlists', JSON.stringify(this.tdlists));
    this.showList();
  }
}
