<script setup>
  import { ref, reactive, computed } from "vue";
  import tasks from "./utils/tasks";

  import Task from "./components/Task.vue";
  import Filter from "./components/Filter.vue";
  import ModalWindow from "./components/modal/ModalWindow.vue";
  import AddTaskModal from "./components/modal/AddTaskModal.vue";

  const appName = "Tasks Manager";

  const reactiveTasks = reactive(tasks);

  let newTask = { completed: false };

  let filterBy = ref("");

  let modalIsActive = ref(false);

  const filteredTasks = computed(() => {
    switch (filterBy.value) {
      case "todo":
        return reactiveTasks.filter((task) => !task.completed);
        break;
      case "done":
        return reactiveTasks.filter((task) => task.completed);
        break;
      case "":
        return reactiveTasks;
        break;
    }
  });

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
      if (task.id == taskId) {
        task.completed = !task.completed;

        console.log(task);
      }
    });
  }

  function setFilter(value) {
    filterBy.value = value;
  }
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>
      </div>

      <div class="header-side">
        <button @click="modalIsActive = true" class="btn-secondary">+ Add task</button>
      </div>

      <!-- <input type="text" v-model="appName" /> -->
    </div>

    <Filter @setFilter="setFilter" :filterBy="filterBy" />

    <div class="tasks">
      <Task
        @toggleCompleted="handleToggleCompleted"
        :filteredTasks="filteredTasks"
        :key="taskIndex"
        v-for="(filteredTasks, taskIndex) in filteredTasks"
      />
    </div>

    <ModalWindow @closePopup="modalIsActive = false" v-if="modalIsActive">
      <AddTaskModal/>
    </ModalWindow>
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
