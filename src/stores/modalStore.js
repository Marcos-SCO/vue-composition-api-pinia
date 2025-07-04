import { defineStore } from "pinia";

import { ref } from "vue";

export const useModalStore = defineStore('modal', () => {

    let modalIsActive = ref(false);

    function openModal() {
        modalIsActive.value = true;
    }

    function closeModal() {
        modalIsActive.value = false;
    }

    return { modalIsActive, openModal, closeModal }
});