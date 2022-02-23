<script>
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription">
        <header
          class="modal-header"
          id="modalTitle">
          <slot name="header"></slot>
        </header>

        <section
          class="modal-body"
          id="modalDescription">
          <p>
            <slot name="body"></slot>
          </p>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
          <button
            type="button"
            class="modal-btn"
            @click="close"
            aria-label="Close modal">
            OK
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.159);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px rgba(0, 0, 0, 0.5);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
  }

  .modal-header,
  .modal-footer {
    padding: 10px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    justify-content: center;
    background: #85f765;
    opacity: 0.7;
  }

  .modal-footer {    
    padding: 10px 40px;
    flex-direction: column;
  }

  .modal-body {
    position: relative;
    padding: 10px 40px;
  }

  .modal-body > p {
      font-size: 22px;
    }
  
  .modal-btn {
    width: 100%;
    cursor: pointer;
    border: none;
    background: transparent;
    color: var(--primary-color);
    font-weight: 700;
  }

  .modal-footer > button {
    padding: 10px 40px;
    border-top: 1px solid #eeeeee;
  }
  
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }

  @media screen and (max-width:500px) {
    .modal {
      margin: 20px;
    }

    .modal-body {
      padding: 20px;
    }

    .modal-body > p {
      font-size: 16px;
    }
  }
</style>
