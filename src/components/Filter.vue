<script setup>
  import { useTasksStore } from "../stores/tasksStore";

  const props = defineProps(["filterBy"]);
  const store = useTasksStore();

  // @click="$emit('setFilter', 'todo')"
</script>

<template>
  <div class="filters">
    <div>
      <p>Filter by state</p>
      <div class="badges">
        <div @click="() => store.setFilter('todo')" class="badge" :class="{ selected: store.filterBy === 'todo' }">To-Do</div>
        <div @click="store.setFilter('done')" class="badge" :class="{ selected: store.filterBy === 'done' }">Done</div>
        
        <span @click="store.setFilter('')" v-if="store.filterBy" class="clear"> x clear </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

      .badge {
        padding: 8px 7px;
        background-color: var(--gray-color);
        color: var(--black-color);
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;
        border-radius: 8px;
        cursor: pointer;
        user-select: none;

        &.selected {
          background-color: #e42c5f;
          color: var(--white-color);
        }
      }
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
</style>
