<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 用户管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.searchKey" placeholder="账户或昵称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-plus" @click="handleAdd">新增用户</el-button>
            </div>
            <el-table :data="userList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column prop="account" label="账号" align="center" min-width="200"></el-table-column>
                <el-table-column prop="nickname" label="昵称" align="center" min-width="150"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center" min-width="150">
                    <template #default="scope">
                        <el-image class="table-td-thumb" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="电话" align="center" min-width="150"></el-table-column>
                <el-table-column label="权限" align="center" min-width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.authority === 1 ? 'info' : 'danger'">{{
                            scope.row.authority === 1 ? '普通用户' : '管理员'
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态" align="center" min-width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.isDisabled === 1 ? 'danger' : 'success'">{{
                            scope.row.isDisabled === 1 ? '禁用' : '正常'
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-warning-outline" class="orange" @click="handleDisable(scope.$index, scope.row)"
                            >禁用/启用</el-button
                        >
                        <el-button type="text" icon="el-icon-s-check" class="green" @click="handleAuthority(scope.$index, scope.row)"
                            >授权/撤权</el-button
                        >
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.currentPage"
                    :page-size="query.pageSize"
                    :total="total"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="新增用户" :visible="addVisible" width="30%" :show-close="false">
            <el-form ref="addForm" :rules="rules" :model="addForm" label-width="90px">
                <el-form-item label="用户名" prop="account">
                    <el-input v-model="addForm.account">
                        <template #append>
                            <el-button @click="getSuffix">{{ accountSuffix }}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="addForm.confirmPassword" show-password></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd('addForm')">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'UserManagment',
    data() {
        var validateAccount = async (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                if (this.accountSuffix === '点击获取后缀') {
                    callback(new Error('请先获取后缀'));
                }
                try {
                    const params = {
                        account: this.addForm.account + this.accountSuffix
                    };
                    const res = await this.$api.user.judgeAccountValid(params);
                    if (res.code === 2000) {
                        if (!res.data.isValid) {
                            callback(new Error(res.data.msg));
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                } catch (error) {
                    console.log(error);
                    this.$message.error('验证账号有效性操作失败');
                }
                callback();
            }
        };
        var confirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.addForm.password) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            query: {
                searchKey: '',
                currentPage: 1,
                pageSize: 10
            },
            userList: [],
            total: 0,

            addVisible: false,
            addForm: {},
            addIndex: -1,

            accountSuffix: '点击获取后缀',

            rules: {
                account: [{ validator: validateAccount, required: true, trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirmPassword: [{ validator: confirmPassword, required: true, trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getUserList();
    },
    methods: {
        /**
         * 获取用户列表
         */
        async getUserList() {
            try {
                const res = await this.$api.user.getUserList(this.query);
                if (res.code === 2000) {
                    this.userList = res.data.userList;
                    this.total = res.data.total;
                    this.$message.success('获取成功');
                } else {
                    this.$message.error(res.msg);
                }
            } catch (e) {
                console.log(e);
                this.$message.error('获取失败');
            }
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'currentPage', 1);
            this.getUserList();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getUserList();
        },
        // 禁用或启用操作
        handleDisable(index, row) {
            this.$confirm(`该账号将${row.isDisabled === 1 ? '启用' : '禁用'}，确定要继续吗？`, '提示', {
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const params = {
                            userId: row.userId,
                            isDisabled: row.isDisabled === 1 ? 0 : 1
                        };
                        const res = await this.$api.user.updateDisabledState(params);
                        if (res.code === 2000) {
                            this.$set(this.userList[index], 'isDisabled', row.isDisabled === 1 ? 0 : 1);
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
        },
        // 授权或撤权操作
        handleAuthority(index, row) {
            this.$confirm(`该账号将${row.authority === 1 ? '授予' : '撤销'}管理员权限，确定要继续吗？`, '提示', {
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const params = {
                            userId: row.userId,
                            authority: row.authority === 1 ? 0 : 1
                        };
                        const res = await this.$api.user.updateAuthority(params);
                        if (res.code === 2000) {
                            this.$set(this.userList[index], 'authority', row.authority === 1 ? 0 : 1);
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
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('该账号信息将永久删除，确定要继续吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const params = {
                            userId: row.userId
                        };
                        const res = await this.$api.user.deleteUser(params);
                        if (res.code === 2000) {
                            this.query.currentPage = 1;
                            this.getUserList();
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
        },

        // 编辑操作
        handleAdd(index, row) {
            this.addIndex = index;
            this.addForm = {
                account: '',
                password: '',
                confirmPassword: ''
            };
            this.addVisible = true;
            this.accountSuffix = '点击获取后缀';
        },

        async getSuffix() {
            try {
                const res = await this.$api.server.getServerParams();
                if (res.code === 2000) {
                    this.accountSuffix = '@' + res.data.serverParams.domainName;
                    if (this.addForm.account !== '') {
                        this.$refs.addForm.validateField('account');
                    }
                } else {
                    this.$message.error(res.msg);
                }
            } catch (error) {
              console.log(error);
                this.$message.error('获取失败');
            }
        },

        // 保存新增
        saveAdd(formname) {
            this.$refs[formname].validate(async (valid) => {
                if (valid) {
                    try {
                        const params = {
                            account: this.addForm.account + this.accountSuffix,
                            password: this.addForm.password
                        };
                        const res = await this.$api.user.registerUser(params);
                        if (res.code === 2000) {
                            this.$message.success('新增成功');
                            this.addVisible = false;
                        } else {
                            this.$message.error(res.msg);
                        }
                    } catch (error) {
                        this.$message.error('新增失败');
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
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.orange {
    color: orange;
}
.green {
    color: green;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
