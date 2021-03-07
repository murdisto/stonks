<template>
  <div class="modal">
    <div class="modal-content">
      <div class="close" @click="$emit('close')">X</div>
      <div class="login-wrapper">
        <h3 class="login-title">Reset Password</h3>
        <div v-if="!showSuccess">
          <p class="modal-text">
            Enter your email and we'll send you a reset link.
          </p>
          <form @submit.prevent>
            <div class="form-group mb-4">
              <input
                type="email"
                v-model.trim="email"
                placeholder="email"
                class="form-control"
                id="email"
              />
            </div>
          </form>
          <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
          <button class="btn btn-block login-btn" @click="resetPassword">
            Reset
          </button>
        </div>

        <p v-else class="modal-text">Success! Check your email.</p>
      </div>
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

  .login-wrapper {
    width: 100%;
    padding-top: 24px;
    padding-bottom: 24px;
  }

  .login-wrapper .form-control {
    border: none;
    border-radius: 0;
    padding: 9px 5px;
    min-height: 40px;
    font-size: 18px;
    font-weight: normal;
    margin-bottom: 10px;
  }

  .login-wrapper .form-control::-webkit-input-placeholder {
    color: #b0adad;
  }
  .login-wrapper .form-control::-moz-placeholder {
    color: #b0adad;
  }
  .login-wrapper .form-control:-ms-input-placeholder {
    color: #b0adad;
  }
  .login-wrapper .form-control::-ms-input-placeholder {
    color: #b0adad;
  }
  .login-wrapper .form-control::placeholder {
    color: #b0adad;
  }

  .login-wrapper .login-btn {
    padding: 13px 20px;
    background-color: #fe8f07;
    border-radius: 0;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    margin-bottom: 14px;
    width: 100%;
  }

  .login-wrapper .login-btn:hover {
    border: 1px solid #fe8f07;
    background-color: #212121;
    color: #fe8f07;
  }

  .login-title {
    font-size: 30px;
    color: #fff;
    margin-bottom: 25px;
  }

  .modal-text {
    color: #fff;
  }

  .modal-content {
    position: relative;
    margin: auto;
    width: 100%;
    max-width: 400px;
    background: #212121;
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
      color: #fff;

      &:hover {
        color: #fe8f07;
      }
    }

    p {
      margin: 15px 0;
    }

    .error {
      color: tomato;
      font-size: 1rem;
    }
  }
}
</style>