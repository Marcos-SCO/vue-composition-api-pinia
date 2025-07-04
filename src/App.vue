<script setup>
  import { ref, reactive, computed } from "vue";

  import Task from "./components/Task.vue";
  import Filter from "./components/Filter.vue";
  import ModalWindow from "./components/modal/ModalWindow.vue";
  import AddTaskModal from "./components/modal/AddTaskModal.vue";
  import { useTasksStore } from "./stores/tasksStore";
  import { useModalStore } from "./stores/modalStore";

  const store = useTasksStore();
  const modalStore = useModalStore();

  const appName = "Tasks Manager";

  // console.log(store.filteredTasks);

  store.$subscribe((mutation, state) => {
    localStorage.setItem("tasks", JSON.stringify(state.reactiveTasks));
  });
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>{{ appName }}</h1>
      </div>

      <div class="header-side">
        <button @click="modalStore.openModal()" class="btn secondary">+ Add task</button>
      </div>

      <!-- <input type="text" v-model="appName" /> -->
    </div>

    <Filter />

    <div class="tasks">
      <div v-if="store.filteredTasks.length < 1">
        <p>No {{ store.filterLabels.getLabel(store.filterBy) }} tasks added...</p>
      </div>

      <!-- @toggleCompleted="store.handleToggleCompleted" -->
      <Task :filteredTask="filteredTask" :key="taskIndex" v-for="(filteredTask, taskIndex) in store.filteredTasks" />
    </div>

    <ModalWindow v-if="modalStore.modalIsActive">
      <AddTaskModal />
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

  :root {
    --primary-color: #2b1887;
    --secondary-color: #2d41a7;
    --gray-color: #dddddd;
    --white-color: #ffffff;
    --black-color: #000000;
  }

  body {
    background-color: var(--primary-color);
    color: #fff;
    height: 100%;
    padding: 60px;
  }

  .container {
    max-width: 80rem;
    margin-inline: auto;
    padding-inline: 1rem;
  }

  .btn {
    border-radius: 8px;
    height: 38px;
    padding-inline: 9px;
    font-size: 16px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn.primary {
    background-color: var(--primary-color);
    color: var(--white-color);
  }

  .btn.secondary {
    background-color: var(--secondary-color);
    color: var(--white-color);
  }

  .btn.gray {
    background-color: var(--gray-color);
    color: var(--black-color);
  }

  .close-btn {
    width: 14px;
    height: 14px;
  }
</style>
