/**
 * @jest-environment jsdom
 */
import Lists from './listFuns.js';

const listFuns = new Lists();

document.body.innerHTML = `
    <section id="todo" class="todo">
      <div>
        <p>Today's To Do</p>
        <button type="button">
          <img src="./assets/img/refresh.svg" alt="refresh" />
        </button>
      </div>
      <div>
        <input
          type="text"
          name="text"
          id="text"
          class="todo-input"
          placeholder="Add to your list..."
        />
        <img src="assets/img/corner-down-left.svg" alt="enter" />
      </div>
      <div class="todo-list"></div>
      <button class="clear">Clear All Completed</button>
    </section>`;

const todoEl = document.querySelector('.todo-list');
const tasks = [
  {
    description: 'task1',
    completed: false,
    index: 1,
  },
];

describe('Test', () => {
  test('Add one item to the list', () => {
    listFuns.showList(tasks, todoEl);
    const li = todoEl.querySelectorAll('.lists');
    expect(li).toHaveLength(1);
  });

  test('Remove one item to the list', () => {
    listFuns.delList(0, tasks);
    listFuns.showList(tasks, todoEl);
    const li = todoEl.querySelectorAll('.lists');
    expect(li).toHaveLength(0);
  });
});
