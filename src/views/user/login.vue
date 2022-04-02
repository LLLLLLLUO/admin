<template>
  <div class="loginBox">
    <div class="login">
      <h2>登录</h2>
      <el-form :model="loginForm" ref="loginForm" :rules="loginFormRules" >
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item style="width: 100%; text-align: right;">
          <el-button @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { setToken } from '../../utils/auth.js';
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginFormRules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.loginForm.validate(async valid => {
        console.log(valid);
        if (valid) {
          let data = await this.$store.dispatch('userLogin', this.loginForm);
          console.log(data);
          if (data.code === 1) {
            setToken("Bearer " + data.data.token)
            // sessionStorage.token = "Bearer " + data.data.token;
            this.$router.push('/home');
            this.$message.success('登录成功');
          }
        }
      })
    }
  },
}
</script>

<style lang="scss" scoped>
  .loginBox {
    width: 100%;
    height: 100%;
    background-image: url('../../../../../fix.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .login {
      width: 420px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.6);
      padding: 15px 0 0 0;
      h2 {
        text-align: center;
        margin-bottom: 10px;
      }
      .el-form {
        width: 90%;
        margin: 0 auto 0;
        .el-form-item {
          .el-input {}
          .el-button {}
        }
      }

    }
  }
</style>
