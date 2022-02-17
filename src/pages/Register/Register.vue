<template>
  <div class="RegisterBox">
    <Header />
    <div class="logoImg">
      <img src="../../assets/logo.png" />
    </div>
    <van-form class="form">
      <van-field placeholder="请输入手机号" :rules="[{ required: true, message: '请填写用户名' }]" v-model="phone" />
      <div>
        <van-field placeholder="请输入短信验证码" :rules="[{ required: true, message: '请填写验证码' }]" v-model="code" />
        <van-field type="password" v-model="password" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <van-field type="password" v-model="password2" placeholder="请确认密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="code" @click="getCode">获取验证码</div>
        <div class="toPassword">
          <span class="left">遇到问题</span>
          <span class="right" @click="toLogin">使用密码验证登录</span>
        </div>
        <div style="margin: 16px;">
          <van-button class="submit" round block type="danger" @click="register">注册</van-button>
        </div>
      </div>
    </van-form>
    <div @click="toLogin" class="end">
      <span>返回</span>
      <van-icon class="iconfont" name="arrow" />
    </div>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      checkbox: true,
      checkboxGroup: [],
      isCode: false,
      phone: "",
      code: "",
      password: "",
      isChecked: true,
      password2: "",
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    // 获取验证码
    async getCode() {
      if (this.phone) {
        try {
          const result = await this.$store.dispatch("getCode", this.phone);
          this.code = result;
        } catch (error) {
          alert("获取验证码失败", error);
        }
      }
    },
    // 注册
    async register() {
      let { phone, password, code, password2, isChecked } = this;
      if (
        phone &&
        password &&
        code &&
        password2 &&
        password === password2 &&
        isChecked
      ) {
        try {
          await this.$store.dispatch("register", { phone, code, password });
          // alert('')
          this.$toast.success('注册用户成功');
          this.$router.push('/login')
        } catch (error) {
          // alert("登陆失败", error);
          this.$toast.fail('注册失败');
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.RegisterBox {
  height: 100%;
  .logoImg {
    height: 110px;
    width: 100%;
    img {
      width: 35%;
      margin-left: 130px;
      margin-top: 30px;
    }
  }
  .form {
    position: relative;
    .code {
      position: absolute;
      top: 50px;
      right: 30px;
      font-size: 14px;
      border: 1px solid #888;
      border-radius: 3px;
      padding: 8px;
    }
    .submit {
      border-radius: 3px;
      background: #dd1a21;
    }
    .toPassword {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 50px;
      align-items: center;
      font-size: 14px;
      .left {
        color: #7f7f7f;
      }
    }
    .agrre {
      font-size: 13px;
      padding: 0 20px;
    }
  }
  .end {
    width: 100%;
    text-align: center;
    height: 50px;
    margin-top: 30px;
    font-size: 15px;
  }
}
</style>
