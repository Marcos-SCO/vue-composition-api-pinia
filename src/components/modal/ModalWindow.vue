<script setup>
  import { onMounted, onUnmounted } from "vue";
  import ModalCloseButton from "./ModalCloseButton.vue";
  import { useModalStore } from "../../stores/modalStore";

  const store = useModalStore();

  // const emitKeyBoard = defineEmits(["closePopup"]);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      // emitKeyBoard("closePopup");
      store.closeModal();
    }
  }

  onMounted(() => document.addEventListener("keydown", handleKeyDown));
  onUnmounted(() => document.removeEventListener("keydown", handleKeyDown));

  // @click="$emit('closePopup')
</script>

<template>
  <div @click.self="store.closeModal()" class="modal-wrapper" aria-modal="true" role="dialog" tabindex="-1">
    <div class="inner">
      <ModalCloseButton @click="store.closeModal()" />

      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
  .modal-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 500;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: grid;
    place-items: center;
    color: #000;

    .inner {
      background-color: white;

      padding: 30px;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      position: relative;
      max-width: 600px;
      width: 90%;

      h3 {
        font-size: 16px;
        font-weight: 700;
        line-height: 21px;
        margin-bottom: 20px;
      }

      .close-btn {
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        background-color: #fff;
      }

      .form {
        display: flex;
        flex-direction: column;
        max-width: 100%;

        label {
          font-size: 12px;
          font-weight: 500;
          line-height: 16px;
          letter-spacing: 0em;
          text-align: left;
        }

        input,
        select,
        textarea {
          font-size: 12px;
          font-weight: 400;
          line-height: 16px;

          letter-spacing: 0em;
          text-align: left;
          border: 1px solid #c2c2c2;
          border-radius: 4px;
          padding: 8px 12px;
          margin-top: 5px;

          &::placeholder {
            color: #a6a6a6;
          }
        }

        .btn {
          width: fit-content;
          padding-inline: 23px;
        }
      }
    }
  }
</style>
