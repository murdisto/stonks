<template>
  <div class="modal">
    <div class="modal-content">
      <div class="close" @click="$emit('close')">X</div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email and we'll send you a reset link.</p>
        <form @submit.prevent>
          <input type="email" v-model.trim="email" placeholder="email" />
        </form>
        <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
        <button class="button" @click="resetPassword">Reset</button>
      </div>
      <p v-else>Success! Check your email.</p>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";

export default {
  data() {
    return {
      email: "",
      showSuccess: false,
      errorMsg: "",
    };
  },
  methods: {
    async resetPassword() {
      this.errorMsg = "";

      try {
        await auth.sendPasswordResetEmail(this.email);
        this.showSuccess = true;
      } catch (err) {
        this.errorMsg = err.message;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(#333, 0.5);

  input {
    width: 100%;
    padding: 30px;
    margin: 0px;
    font-size: 21px;
    margin-bottom: 0;
  }

  .modal-content {
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 400px;
    background: #2c3e50;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(#333, 0.5);
    z-index: 999;

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px;
      cursor: pointer;
      transition: 0.15s;

      &:hover {
        color: #000;
      }
    }

    h3 {
      margin: 0;
    }

    p {
      margin: 15px 0;
    }

    .error {
      color: tomato;
      font-size: 12px;
    }

    .button {
      width: 100%;
      height: 75px;
      font-size: 100%;
      margin-top: 20px;
      background-color: #42b983;
    }
  }
}
</style>