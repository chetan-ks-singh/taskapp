import axios from "axios";

export const createTask = async (content, endDate, today) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/task",
      data: {
        content,
        endDate,
      },
    });
  } catch (err) {}
};

export const todayTask = async (parent) => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/task/tasks/mytask?task=today",
    });

    if (res.data.status == "ok")
      renderTodayTasks(parent, res.data.data.myTasks);
    else if ((res.data.status = "fail")) {
      parent.innerHTML = "<p class='note-err'>No Task for Today</p>";
    }
  } catch (err) {
    //console.log(err)
  }
};
export const upcomingTask = async (parent) => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/task/tasks/mytask?task=upcoming",
    });

    if (res.data.status == "ok")
      renderUpcomingTasks(parent, res.data.data.myTasks);
    else if ((res.data.status = "fail")) {
      parent.innerHTML =
        "<p class='note-err'>You don't have any Upcoming Task</p>";
    }
  } catch (err) {
    //console.log(err)
  }
};

export const completedTask = async (parent) => {
  try {
    console.log("areee");
    const res = await axios({
      method: "GET",
      url: "/api/v1/task/tasks/mytask?task=completed",
    });
    console.log(res);

    if (res.data.status == "ok")
      renderCompletedTasks(parent, res.data.data.myTasks);
    else if ((res.data.status = "fail")) {
      parent.innerHTML =
        "<p class='note-err'>You don't have any completed Task</p>";
    }
  } catch (err) {
    console.log(err);
  }
};

export const pendingTask = async (parent) => {
  try {
    const res = await axios({
      method: "GET",
      url: "/api/v1/task/tasks/mytask?task=pending",
    });
    console.log(res);
    if (res.data.status == "ok") {
      renderPendingTasks(parent, res.data.data.myTasks);
    } else if ((res.data.status = "fail")) {
      parent.innerHTML =
        "<p class='note-err'>You don't have any pending Task</p>";
    }

    // doneP.addEventListener('click',function(){
    //     console.log('clicked!')
    // })
  } catch (err) {
    //console.log(err)
  }
};

export const markDone = async (parent, id) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `/api/v1/task/tasks/done/${id}`,
    });
    //console.log(res);
    if (res.data.status == "ok") {
      setTimeout(() => {
        parent.remove();
      }, 500);
    }
  } catch (err) {
    // console.log(err)
  }
};

const renderTodayTasks = function (parent, data) {
  parent.innerHTML = "";
  data.forEach((task) => {
    // .task-card.today-card

    // p #{task.content}
    // .done
    //   p Mark as Done

    const el = `<div class="task-card today-card">
    <p>${task.content}</p>
    <div class="done" > <p id=${task._id} class="mad">Mark as Done</p>
    <div class="delete" id=${task._id}><p class"dtask"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="bin w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  </svg>
  </p></div>
    </div>
  </div>`;

    parent.insertAdjacentHTML("beforeend", el);
  });
};

const renderUpcomingTasks = function (parent, data) {
  parent.innerHTML = "";
  data.forEach((task) => {
    const el = `<div class="task-card upcoming-card">
    <p>${task.content}</p>
    <div class="next"> <p id=${task._id}>${new Date(
      task.endDate
    ).toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
    })}</p></div>
  </div>`;

    parent.insertAdjacentHTML("beforeend", el);
  });
};

const renderCompletedTasks = function (parent, data) {
  parent.innerHTML = "";
  data.forEach((task) => {
    const el = `<div class="task-card completed-card ">
    <p>${task.content}</p>
  </div>`;

    parent.insertAdjacentHTML("beforeend", el);
  });
};

const renderPendingTasks = function (parent, data) {
  parent.innerHTML = "";
  data.forEach((task) => {
    // .task-card.today-card

    // p #{task.content}
    // .done
    //   p Mark as Done

    const el = `<div class="task-card pending-card">
    <p>${task.content}</p>
    <div class="done"> <p id=${task._id} class="mad">Mark as Done</p></div>
  </div>`;

    parent.insertAdjacentHTML("beforeend", el);
  });
};

export const deleteTask = async (id, parent) => {
  try {
    const res = await axios({
      method: "DELETE",
      url: `/api/v1/task/${id}`,
    });

    if (res.data.status == "ok") {
      parent.remove();
    }
  } catch (err) {
    //console.log(err)
  }
};

export const clearAllTask = async (parent) => {
  try {
    ///task/clearCompleted
    const res = await axios({
      method: "DELETE",
      url: "/api/v1/task/tasks/clearCompleted",
    });

    if (res.data.status == "ok") {
      parent.innerHTML = "";
    }
  } catch (err) {
    // console.log(err)
  }
};
