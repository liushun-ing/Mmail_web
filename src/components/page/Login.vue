<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">邮件系统服务端</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="account">
                    <el-input v-model="param.account" placeholder="account">
                        <template v-slot:prepend>
                            <el-button icon="el-icon-lx-people"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="param.password" @keyup.enter="submitForm()">
                        <template #prepend>
                            <el-button icon="el-icon-lx-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 账号为邮箱，请加@xxx.com后缀</p>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            param: {
                account: '',
                password: ''
            },
            rules: {
                account: [
                    {
                        required: true,
                        message: '请输入有效的账号',
                        trigger: 'blur',
                        pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.com)+$/
                    }
                ],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            }
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(async (valid) => {
                if (valid) {
                    try {
                        const res = await this.$api.user.login(this.param);
                        if (res.code == 2000) {
                            this.$message.success('登录成功');
                            localStorage.setItem('login_token', JSON.stringify(res.data));
                            this.$router.push('/');
                        } else {
                            this.$message.error(res.msg);
                        }
                    } catch (error) {
                        console.log(error);
                        this.$message.error('登陆失败');
                    }
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpeg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #409eff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>