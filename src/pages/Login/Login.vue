<template>
  <div>
    <div v-if="isLogin" class="loginBox">
      <Header />
      <div class="logoImg">
        <img src="../../assets/logo.png" />
      </div>
      <div class="btn">
        <van-button @click="toRegister" class="number" type="danger">
          <van-icon class="iconfont" name="contact" />
          <span>去注册</span>
        </van-button>
        <van-button @click="isLogin = false" class="email" type="danger">
          <van-icon class="iconfont" name="envelop-o" />
          <span>去登陆</span>
        </van-button>
      </div>
    </div>
    <div v-else class="RegisterBox">
      <Header />
      <div class="logoImg">
        <img src="../../assets/logo.png" />
      </div>
      <van-form class="form">
        <van-field placeholder="请输入手机号" :rules="[{ required: true, message: '请填写用户名' }]" v-model="phone" />
        <van-field type="password" v-model="password" placeholder="请输入密码" :rules="[{ required: true, message: '请填写密码' }]" />
        <div class="toPassword">
          <span class="left">遇到问题</span>
          <span class="right" @click="toRegister">去注册</span>
        </div>
        <div style="margin: 16px;">
          <van-button @click="login" class="submit" round block type="danger">登陆</van-button>
        </div>

        <div class="agrre">
          <input type="checkbox" v-model="isChecked" />
          <span class="blue">《服务条款》和</span>
          <span class="blue">《网易隐私政策》</span>
        </div>
      </van-form>
      <div @click="isLogin = true" class="end">
        <span>返回</span>
        <van-icon class="iconfont" name="arrow" />
      </div>
    </div>

    <!-- 底部图标
      <van-row type="flex" justify="center" class="icon">
        <van-col span="6">
          <i
            ><van-icon
              color="#7F7F7F"
              size="20"
              class-prefix="iconfont iconweixin"
              name="extra"
          /></i>
          <span>微信</span>
        </van-col>
        <van-col
          span="6"
          style="border-left: 1px solid #ccc;border-right: 1px solid #ccc;"
        >
          <i
            ><van-icon
              color="#7F7F7F"
              size="20"
              class-prefix="iconfont iconqq"
              name="extra"
          /></i>
          <span>QQ</span>
        </van-col>
        <van-col span="6">
          <i
            ><van-icon
              color="#7F7F7F"
              size="20"
              class-prefix="iconfont iconweibo"
              name="extra"
          /></i>
          <span>微博</span>
        </van-col>
      </van-row> -->

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLogin: true,
      isChecked: true,
      phone: "",
      password: "",
    };
  },
  methods: {
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    async login() {
      let { phone, password } = this;
      if (phone && password) {
        try {
          await this.$store.dispatch("login", { phone, password });
          // alert('登陆成功')
          this.$toast.success("登陆成功");
          this.$router.push('/home')
          // this.$forceUpdate();
          this.$bus.$emit('setActive', 0)
        } catch (error) {
          this.$toast.fail("登陆失败");
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.loginBox {
  height: 100%;
  background: #f2f5f4;
  .logoImg {
    height: 170px;
    width: 100%;
    text-align: center;
    padding-top: 70px;
    box-sizing: border-box;
    img {
      width: 36%;
    }
  }
  .btn {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .number {
      width: 100%;
      border-radius: 4px;
      background: #dd1a21;
      position: relative;
      .iconfont {
        font-size: 20px;
        position: absolute;
        left: 95px;
        top: 10px;
      }
    }
    .email {
      border: 1ps 1px solid #dd1a21;
      width: 100%;
      border-radius: 4px;
      background: #fff;
      color: #dd1a21;
      margin-top: 20px;
      position: relative;
      .iconfont {
        font-size: 20px;
        position: absolute;
        left: 100px;
        top: 10px;
      }
    }
  }
}

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
