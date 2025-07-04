<script setup>
  import { useTasksStore } from "../../stores/tasksStore";

  const store = useTasksStore();

  const addTask = store.addTask;

  let newTask = { completed: false };
</script>

<template>
  <div class="form">
    <h3>Add a new task</h3>

    <label for="title">Title *</label>
    <input v-model="newTask.name" id="title" type="text" name="title" placeholder="Enter a title..." /><br />

    <label for="description">Description *</label>
    <textarea
      v-model="newTask.description"
      id="description"
      name="description"
      rows="4"
      placeholder="Enter a description..."
    /><br />

    <button @click="addTask(newTask)" class="btn gray">Add Task</button>
  </div>
</template>
