<script setup>
  import { ref, reactive } from "vue";
  import tasks from "./utils/tasks";

  import Task from "./components/Task.vue";

  const appName = "Tasks Manager";

  const reactiveTasks = reactive(tasks);

  let newTask = { completed: false };

  function addTask() {
    const newTaskName = newTask.name?.trim();
    const newTaskDescription = newTask.description?.trim();

    if (!newTaskName || !newTaskDescription) {
      alert("Please enter the tittle and description of the task!");
      return;
    }

    newTask.id = Math.max(...reactiveTasks.map((tasks) => tasks.id)) + 1;

    reactiveTasks.push(newTask);

    newTask = { completed: false };
  }

  function handleToggleCompleted(taskId) {
    reactiveTasks.forEach((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;

        console.log(task);
      }
    });
  }
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>
      </div>

      <!-- <input type="text" v-model="appName" /> -->
    </div>

    <div class="filters">
      <div>
        <p>Filter by state</p>
        <div class="badges">
          <div class="badge">To-Do</div>
          <div class="badge">Done</div>
          <span class="clear"> x clear </span>
        </div>
      </div>
    </div>

    <div class="tasks">
      <Task
        @toggleCompleted="handleToggleCompleted"
        :reactiveTask="reactiveTask"
        :key="taskIndex"
        v-for="(reactiveTask, taskIndex) in reactiveTasks"
      />
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>

      <input v-model="newTask.name" type="text" name="title" placeholder="Enter a title..." /><br />

      <textarea v-model="newTask.description" name="description" rows="4" placeholder="Enter a description..." /><br />

      <button @click="addTask" class="btn gray">Add Task</button>
    </div>
  </main>
</template>

<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-side {
      display: flex;
      align-items: center;

      h1 {
        text-transform: capitalize;
        font-size: 42px;
        font-weight: 700;
        line-height: 47px;
        letter-spacing: 0em;
        text-align: left;
      }

      .secondary {
        margin-left: 12px;
      }
    }
  }

  .filters {
    display: flex;
    flex-direction: column;
    margin: 40px 0;

    p {
      font-size: 16px;
      font-weight: 400;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: left;
    }

    .badges {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin: 14px 0;
      align-items: center;
    }

    .clear {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
      cursor: pointer;
    }
  }

  .tasks {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .add-task {
    margin-top: 60px;

    input,
    textarea {
      width: 360px;
      max-width: 100%;
      margin-top: 12px;
      padding: 5px;
    }

    button {
      width: 360px;
      margin-top: 12px;
    }
  }
</style>
