export default class App {
  constructor() {
    this.tasks = [];
    this.init();
  }

  init() {
    this.addTask();
    this.completeTask();
    this.removeTask();
    this.toggleAdd();
  }

  addTask() {
    $("input[type='text']").keypress(e => {
      if (e.which === 13) {
        this.tasks.push(e.currentTarget.value);
        this.queueTask(this.tasks[this.tasks.length - 1]);
        e.currentTarget.value = ''
      }
    });
  }

  queueTask(queued = "new task!") {
    $('ul').append('<li class="tasks__task"><span class="tasks__remove"><i class="fa fa-trash" aria-hidden="true"></i></span> ' + queued + '</li>');
  }

  completeTask() {
    $('.tasks').on('click', '.tasks__task', e => {
      $(e.currentTarget).toggleClass('tasks--complete');
    });
  }

  removeTask() {
    $('.tasks').on('click', '.tasks__remove', e => {
      let task = $(e.currentTarget).parent();
      task.fadeOut(500, () => task.remove());
      e.stopPropagation();
    })
  }

  toggleAdd() {
    $('.todo__icon').click(() => {
      $("input[type='text']").fadeToggle();
    });
  }
}