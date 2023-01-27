/**
 * @jest-environment jsdom
 */
import Lists from "./listFuns.js";

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

const todoEl = document.querySelector(".todo-list");
const tasks = [
  {
    description: "task1",
    completed: false,
    index: 1,
  },
  {
    description: "task2",
    completed: false,
    index: 2,
  },
];

describe("Test", () => {
  test("Add one item to the list", () => {
    Lists.showList(tasks, todoEl);
    const li = todoEl.querySelectorAll(".lists");
    expect(li).toHaveLength(2);
  });

  test("Remove one item from the list", () => {
    Lists.delList(0, tasks);
    Lists.showList(tasks, todoEl);
    const li = todoEl.querySelectorAll(".lists");
    expect(li).toHaveLength(1);
  });

  test("Edit an item on the list", () => {
    Lists.edit("Edit Task", 0, tasks);
    Lists.showList(tasks, todoEl);
    const tdtext = document.querySelectorAll(".todo-text");
    expect(JSON.parse(localStorage.getItem("tdlists"))[0].description).toMatch(
      "Edit Task"
    );
    expect(tdtext[0].value).toMatch("Edit Task");
  });

  test("Check an item on the list", () => {
    const li = todoEl.querySelectorAll(".lists");
    Lists.check(li[0], 0, tasks);
    Lists.showList(tasks, todoEl);

    const checkbox = document.querySelectorAll(".check-box");
    expect(
      JSON.parse(localStorage.getItem("tdlists"))[0].completed
    ).toBeTruthy();
    expect(checkbox[0].dataset.completed).toBeTruthy();
  });
});
