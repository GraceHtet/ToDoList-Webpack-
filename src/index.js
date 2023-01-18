import './style.css';
import square from './assets/img/square.svg';
import moreDots from './assets/img/more-vertical.svg';

const lists = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'sweep the floor',
    completed: false,
    index: 1,
  },
  {
    description: 'clean the room',
    completed: false,
    index: 2,
  },
];

const todoEl = document.querySelector('.todo-list');

const addList = (desc) => {
  const lists = document.createElement('div');
  lists.classList = 'lists';
  const checkBox = document.createElement('img');
  checkBox.src = square;
  checkBox.classList = 'check-box';
  checkBox.alt = 'square';

  const todoText = document.createElement('input');
  todoText.classList = 'todo-text';
  todoText.value = desc;
  todoText.disabled = true;

  const more = document.createElement('img');
  more.src = moreDots;
  more.classList = 'more';
  more.alt = 'more-vertical';

  lists.append(checkBox, todoText, more);

  todoEl.appendChild(lists);
};

lists.forEach((list) => {
  addList(list.description);
});
