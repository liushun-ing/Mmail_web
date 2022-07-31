<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 修改密码 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="width: 400px; text-align: right">
                <el-form ref="changeForm" :rules="rules" :model="changeForm" label-width="100px">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input v-model="changeForm.oldPassword" show-password> </el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="password">
                        <el-input v-model="changeForm.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="confirmPassword">
                        <el-input v-model="changeForm.confirmPassword" show-password></el-input>
                    </el-form-item>
                </el-form>
                <div class="c-tips">密码要求:8-12位的大小写字母、数字和特殊字符(!`@`#`$`%`^`&`*)组合</div>
                <el-button type="primary" @click="submitChange">提交修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChangePassword',
    data() {
        var validateOldPassword = async (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入原密码'));
            } else {
                try {
                    const params = {
                        userId: this.changeForm.userId,
                        password: this.changeForm.oldPassword
                    };
                    const res = await this.$api.user.verifyPassword(params);
                    if (res.code !== 2000) {
                        callback(new Error('原密码不正确'));
                    }
                } catch (error) {
                    console.log(error);
                    this.$message.error('验证原密码操作失败');
                }
                callback();
            }
        };
        var confirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.changeForm.password) {
                callback(new Error('两次输入新密码不一致'));
            } else {
                callback();
            }
        };
        return {
            changeForm: {
                userId: '',
                oldPassword: '',
                password: '',
                confirmPassword: ''
            },

            rules: {
                oldPassword: [{ validator: validateOldPassword, required: true, trigger: 'blur' }],
                password: [{ required: true, message: '请输入新密码', trigger: 'blur' },
                {pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*])[^]{8,12}$/, message: '输入格式不规范', trigger: 'change'}],
                confirmPassword: [{ validator: confirmPassword, required: true, trigger: 'blur' }]
            }
        };
    },

    created() {
        this.changeForm.userId = JSON.parse(localStorage.getItem('login_token')).userId;
    },
    methods: {
        submitChange() {
            this.$refs.changeForm.validate(async (valid) => {
                if (valid) {
                    try {
                        const params = {
                            userId: this.changeForm.userId,
                            newPassword: this.changeForm.confirmPassword
                        };
                        const res = await this.$api.user.changePassword(params);
                        if (res.code === 2000) {
                            this.$message.success('修改成功，请重新登录');
                            localStorage.removeItem('login_token');
                            this.$router.push('/login');
                        } else {
                            this.$message.error(res.msg);
                        }
                    } catch (error) {
                        console.log(error);
                        this.$message.error('提交失败');
                    }
                } else {
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.c-tips{
    font-size: 12px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: #909399;
    margin-bottom: 10px;
}
.c-tips::before {
    content: '* ';
    color: #f56c6c;
}
</style>
