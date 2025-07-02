<script setup>
  import { computed } from "vue";

  const { filteredTasks } = defineProps({
    filteredTasks: Object,
  });

  //   const isTaskDone = computed(() => filteredTasks?.completed);
</script>

<template>
  <div class="task">
    <h3>{{ filteredTasks.name }}</h3>
    <p>{{ filteredTasks.description }}</p>

    <div class="task-check">
      <input
        @click="$emit('toggleCompleted', filteredTasks.id)"
        :id="'input-done-task-' + filteredTasks.id"
        type="checkbox"
        :checked="filteredTasks?.completed"
      />

      <label :for="'input-done-task-' + filteredTasks.id">
        {{ filteredTasks?.completed ? "Done" : "To-Do" }}
      </label>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .task {
    display: flex;
    flex-direction: column;
    background-color: var(--white-color);
    color: var(--black-color);
    padding: 20px;
    border-radius: 12px;
    position: relative;

    h3 {
      font-size: 20px;
      font-weight: 700;
      line-height: 21px;
      letter-spacing: 0em;
      text-align: left;
    }

    p {
      margin-top: 24px;
      margin-bottom: 12px;
      font-size: 16px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;
    }

    .task-check {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 10px;
      right: 10px;

      label {
        font-size: 13px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        margin-left: 5px;
        cursor: pointer;
      }

      input {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 18px;
        height: 18px;
        border-radius: 100%;
        border: 0.77px solid #aeaeb2;
        appearance: none;
        cursor: pointer;

        &:checked {
          background-color: #0a7aff;
          border-color: #0a7aff;

          &::before {
            content: "";
            display: block;
            width: 4.5px;
            height: 9px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
</style>
