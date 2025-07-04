import { defineStore } from "pinia";

import { reactive, ref, computed } from "vue";
import tasks from "../utils/tasks";

import { useModalStore } from "./modalStore";

export const useTasksStore = defineStore('tasks', () => {

    const reactiveTasks = reactive(tasks);

    let filterBy = ref("");

    const filterLabels = {
        todo: "To-do",
        done: "Completed",

        getLabel(label) {
            return this[label] ?? '';
        },
    };

    const filteredTasks = computed(() => {
        switch (filterBy.value) {
            case "todo":
                return reactiveTasks.filter((task) => !task.completed);
            case "done":
                return reactiveTasks.filter((task) => task.completed);
            case "":
                return reactiveTasks;
        }
    });

    function addTask(newTask) {
        const name = newTask.name?.trim();
        const description = newTask.description?.trim();

        if (!name || !description) {
            alert("Please enter the title and description of the task!");
            return;
        }

        const maxId = reactiveTasks.length
            ? Math.max(...reactiveTasks.map((task) => task.id || 0)) : 0;

        const taskToAdd = {
            id: maxId + 1,
            name,
            description,
            completed: false,
        };

        reactiveTasks.push(taskToAdd);

        useModalStore().closeModal();
    }

    function setFilter(value) {
        // console.log(value)
        filterBy.value = value;
    }

    function handleToggleCompleted(taskId) {
        // console.log(filteredTasks);
        // reactiveTasks.forEach((task) => {
        filteredTasks.value.forEach((task) => {
            if (task.id == taskId) {
                task.completed = !task.completed;

                console.log(task);
            }
        });
    }

    return { reactiveTasks, addTask, filterBy, setFilter, filterLabels, filteredTasks, handleToggleCompleted }
});
