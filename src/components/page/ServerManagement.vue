<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-refresh"></i> 服务启停 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <span class="s1-tip">smtp服务:&nbsp;&nbsp;</span>
            <el-switch
                v-model="smtpState"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="运行中"
                inactive-text="已关闭"
                @change="changeSmtpState"
            >
            </el-switch>
            <br />
            <br />
            <span class="s1-tip">pop3服务:&nbsp;&nbsp;</span>
            <el-switch
                v-model="pop3State"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="运行中"
                inactive-text="已关闭"
                @change="changePop3State"
            >
            </el-switch>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-setting"></i> 系统配置 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="s2-wrapper">
                <span class="s2-span">smpt端口:&nbsp;&nbsp;</span>
                <el-tag effect="dark" size="medium"> {{ serverParams.smtpPort }} </el-tag>&nbsp;&nbsp;
                <el-button type="warning" @click="showModify('smtpPort')">点击修改</el-button>
                <div class="s2-indiv">
                    <el-input v-show="smtpPortShow" v-model="modifyParams.smtpPort" class="s2-input"></el-input>
                    <el-button v-show="smtpPortShow" type="success" @click="submitModify('smtpPort')">提交修改</el-button>
                </div>
            </div>
            <div class="s2-wrapper">
                <span class="s2-span">pop3端口:&nbsp;&nbsp;</span>
                <el-tag effect="dark" size="medium"> {{ serverParams.pop3Port }} </el-tag>&nbsp;&nbsp;
                <el-button type="warning" @click="showModify('pop3Port')">点击修改</el-button>
                <div class="s2-indiv">
                    <el-input v-show="pop3PortShow" v-model="modifyParams.pop3Port" class="s2-input"></el-input>
                    <el-button v-show="pop3PortShow" type="success" @click="submitModify('Pop3Port')">提交修改</el-button>
                </div>
            </div>
            <div class="s2-wrapper">
                <span class="s2-span">邮箱域名:&nbsp;&nbsp;</span>
                <el-tag effect="dark" size="medium"> {{ serverParams.domainName }} </el-tag>&nbsp;&nbsp;
                <el-button type="warning" @click="showModify('domainName')">点击修改</el-button>
                <div class="s2-indiv">
                    <el-input v-show="domainNameShow" v-model="modifyParams.domainName" class="s2-input"></el-input>
                    <el-button v-show="domainNameShow" type="success" @click="submitModify('domainName')">提交修改</el-button>
                </div>
            </div>
            <div class="s2-tip">重设端口号时请注意避开周知端口号, 以及8080, 8081, 8082等后台常用端口号</div>
            <div class="s2-tip">请谨慎重设端口号！！！</div>
            <div class="s2-tip">域名以.com结尾</div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-receiving"></i> 邮箱配置 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="s2-wrapper">
                <span class="s2-span">邮箱大小:&nbsp;&nbsp;</span>
                <el-tag effect="dark" size="medium"> {{ serverParams.mailboxSize }} </el-tag>&nbsp;&nbsp;
                <el-button type="warning" @click="showModify('mailboxSize')">点击修改</el-button>
                <div class="s2-indiv">
                    <el-input v-show="mailboxSizeShow" v-model="modifyParams.mailboxSize" class="s2-input"></el-input>
                    <el-button v-show="mailboxSizeShow" type="success" @click="submitModify('mailboxSize')">提交修改</el-button>
                </div>
            </div>
            <div class="s2-wrapper">
                <span class="s2-span">最大群发数:&nbsp;&nbsp;</span>
                <el-tag effect="dark" size="medium"> {{ serverParams.maxRcpt }} </el-tag>&nbsp;&nbsp;
                <el-button type="warning" @click="showModify('maxRcpt')">点击修改</el-button>
                <div class="s2-indiv">
                    <el-input v-show="maxRcptShow" v-model="modifyParams.maxRcpt" class="s2-input"></el-input>
                    <el-button v-show="maxRcptShow" type="success" @click="submitModify('maxRcpt')">提交修改</el-button>
                </div>
            </div>
            <div class="s2-tip">邮箱大小是指服务器的总共容纳邮件数量</div>
            <div class="s2-tip">最大群发数指一封邮件的收件人的人数上限</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ServerManagement',
    data() {
        return {
            smtpState: true,
            pop3State: true,

            serverParams: {},

            smtpPortShow: false,
            pop3PortShow: false,
            domainNameShow: false,
            mailboxSizeShow: false,
            maxRcptShow: false,

            modifyParams: {}
        };
    },

    created() {
        this.getSmtpAndPop3State();
        this.getServerParams();
    },

    methods: {
        async getSmtpAndPop3State() {
            try {
                const res = await this.$api.server.getSmtpAndPop3State();
                if (res.code === 2000) {
                    this.smtpState = res.data.smtpState;
                    this.pop3State = res.data.pop3State;
                } else {
                    this.$message.error('获取服务状态失败');
                }
            } catch (error) {
                this.$message.error('获取服务状态失败');
            }
        },

        async getServerParams() {
            try {
                const res = await this.$api.server.getServerParams();
                if (res.code === 2000) {
                    this.serverParams = res.data.serverParams;
                    this.modifyParams = JSON.parse(JSON.stringify(this.serverParams));
                } else {
                    this.$message.error('获取系统配置失败');
                }
            } catch (error) {
                this.$message.error('获取系统配置失败');
            }
        },

        changeSmtpState(event) {
            this.$confirm(`smtp服务将${event ? '开启' : '关闭'}，确定要继续吗？`, '提示', {
                type: 'warning'
            })
                .then(async () => {
                    let message = this.$message({
                        type: 'info',
                        message: '正在执行中...'
                    });
                    try {
                        // event为改变之后的值
                        if (event) {
                            // 开启服务
                            const res = await this.$api.server.startSmtpServer();
                            message.close();
                            if (res.code === 2000) {
                                this.$message.success('开启smtp服务成功');
                            } else {
                                this.smtpState = !event;
                                this.$message.error(res.msg);
                            }
                        } else {
                            // 关闭服务
                            const res = await this.$api.server.stopSmtpServer();
                            if (res.code === 2000) {
                                this.$message.success('关闭smtp服务成功');
                            } else {
                                this.smtpState = !event;
                                this.$message.error(res.msg);
                            }
                        }
                    } catch (error) {
                        this.smtpState = !event;
                        console.log(error);
                        this.$message.error('操作失败');
                    }
                })
                .catch(() => {
                    this.smtpState = !event;
                    this.$message.info('操作已取消');
                });
        },

        changePop3State(event) {
            this.$confirm(`pop3服务将${event ? '开启' : '关闭'}，确定要继续吗？`, '提示', {
                type: 'warning'
            })
                .then(async () => {
                    let message = this.$message({
                        type: 'info',
                        message: '正在执行中...'
                    });
                    try {
                        // event为改变之后的值
                        if (event) {
                            // 开启服务
                            const res = await this.$api.server.startPop3Server();
                            message.close();
                            if (res.code === 2000) {
                                this.$message.success('开启pop3服务成功');
                            } else {
                                this.pop3State = !event;
                                this.$message.error(res.msg);
                            }
                        } else {
                            // 关闭服务
                            const res = await this.$api.server.stopPop3Server();
                            if (res.code === 2000) {
                                this.$message.success('关闭pop3服务成功');
                            } else {
                                this.pop3State = !event;
                                this.$message.error(res.msg);
                            }
                        }
                    } catch (error) {
                        this.pop3State = !event;
                        console.log(error);
                        this.$message.error('操作失败');
                    }
                })
                .catch(() => {
                    this.pop3State = !event;
                    this.$message.info('操作已取消');
                });
        },

        showModify(param) {
            if (param === 'smtpPort') {
                this.smtpPortShow = true;
            } else if (param === 'pop3Port') {
                this.pop3PortShow = true;
            } else if (param === 'domainName') {
                this.domainNameShow = true;
            } else if (param === 'mailboxSize') {
                this.mailboxSizeShow = true;
            } else if (param === 'maxRcpt') {
                this.maxRcptShow = true;
            }
        },

        submitModify(param) {
            if (param === 'smtpPort') {
                if (this.modifyParams.smtpPort === '' || !/^[1-9]\d*$/.test(this.modifyParams.smtpPort)) {
                    this.$message.warning('请先输入大于零的端口号');
                    return;
                }
                this.$confirm(`修改smpt端口号, 将会自动重启服务, 确定要继续吗？`, '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        let message = this.$message({
                            type: 'info',
                            message: '正在执行中...'
                        });
                        try {
                            const params = {
                                smtpPort: this.modifyParams.smtpPort
                            };
                            const res = await this.$api.server.setSmtpPort(params);
                            if (res.code === 2000) {
                                message.close();
                                this.getSmtpAndPop3State();
                                this.smtpPortShow = false;
                                this.$set(this.serverParams, 'smtpPort', this.modifyParams.smtpPort);
                                this.$message.success('操作成功');
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            console.log(error);
                            this.$message.error('操作失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            } else if (param === 'pop3Port') {
                if (this.modifyParams.pop3Port === '' || !/^[1-9]\d*$/.test(this.modifyParams.pop3Port)) {
                    this.$message.warning('请先输入大于零的端口号');
                    return;
                }
                this.$confirm(`修改pop3端口号, 将会自动重启服务, 确定要继续吗？`, '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        let message = this.$message({
                            message: '正在执行中...',
                            type: 'info'
                        });
                        try {
                            const params = {
                                pop3Port: this.modifyParams.pop3Port
                            };
                            const res = await this.$api.server.setPop3Port(params);
                            if (res.code === 2000) {
                                message.close();
                                this.getSmtpAndPop3State();
                                this.pop3PortShow = false;
                                this.$set(this.serverParams, 'pop3Port', this.modifyParams.pop3Port);
                                this.$message.success('操作成功');
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            console.log(error);
                            this.$message.error('操作失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            } else if (param === 'domainName') {
                if (this.modifyParams.domainName === '' || !this.modifyParams.domainName.endsWith('.com')) {
                    this.$message.warning('请先输入xxx.com的域名');
                    return;
                }
                this.$confirm(`域名将为${this.modifyParams.domainName}, 确定要继续吗？`, '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        try {
                            const params = {
                                domainName: this.modifyParams.domainName
                            };
                            const res = await this.$api.server.setDomainName(params);
                            if (res.code === 2000) {
                                this.domainNameShow = false;
                                this.$set(this.serverParams, 'domainName', this.modifyParams.domainName);
                                this.$message.success('操作成功');
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            console.log(error);
                            this.$message.error('操作失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            } else if (param === 'mailboxSize') {
                if (this.modifyParams.mailboxSize === '' || !/^[1-9]\d*$/.test(this.modifyParams.mailboxSize)) {
                    this.$message.warning('请先输入大于零的整数');
                    return;
                }
                this.$confirm(`邮箱大小将修改为${this.modifyParams.mailboxSize}, 确定要继续吗？`, '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        try {
                            const params = {
                                mailboxSize: this.modifyParams.mailboxSize
                            };
                            const res = await this.$api.server.setMailboxSize(params);
                            if (res.code === 2000) {
                                this.mailboxSizeShow = false;
                                this.$set(this.serverParams, 'mailboxSize', this.modifyParams.mailboxSize);
                                this.$message.success('操作成功');
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            console.log(error);
                            this.$message.error('操作失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            } else if (param === 'maxRcpt') {
                if (this.modifyParams.maxRcpt === '' || !/^[1-9]\d*$/.test(this.modifyParams.maxRcpt)) {
                    this.$message.warning('请先输入大于零的整数');
                    return;
                }
                this.$confirm(`最大群发数将修改为${this.modifyParams.maxRcpt}, 确定要继续吗？`, '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        try {
                            const params = {
                                maxRcpt: this.modifyParams.maxRcpt
                            };
                            const res = await this.$api.server.setMaxRcpt(params);
                            if (res.code === 2000) {
                                this.maxRcptShow = false;
                                this.$set(this.serverParams, 'maxRcpt', this.modifyParams.maxRcpt);
                                this.$message.success('操作成功');
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            console.log(error);
                            this.$message.error('操作失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            }
        }
    }
};
</script>

<style scoped>
.s1-tip {
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: rgb(11, 11, 11);
}

.s2-wrapper {
    margin-bottom: 10px;
}

.s2-span {
    font-size: 14px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: rgb(11, 11, 11);
}

.s2-indiv {
    display: inline-block;
    margin-left: 10px;
    width: auto;
}

.s2-input {
    width: 100px;
    margin-right: 10px;
}

.s2-tip {
    font-size: 12px;
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    color: #909399;
    margin-bottom: 5px;
}

.s2-tip::before {
    content: '* ';
    color: #f56c6c;
}
</style>