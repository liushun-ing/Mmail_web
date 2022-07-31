<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 账号过滤管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.searchKey" placeholder="账号/昵称" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="success" icon="el-icon-plus" @click="addVisible = true">新增过滤账号</el-button>
            </div>
            <el-table :data="filterAccountList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
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
                <el-table-column label="操作" width="180" align="center" fixed="right">
                    <template #default="scope">
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)"
                            >移除过滤</el-button
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
        <el-dialog title="新增过滤账号" :visible="addVisible" width="30%" :show-close="false">
            <div style="padding-bottom: 10px">输入账号，将自动进行匹配</div>
            <el-select
                v-model="selectedAccount"
                filterable
                remote
                :remote-method="searchUser"
                :loading="loading"
                loading-text="匹配中"
                placeholder="请输入账号关键词"
            >
                <el-option v-for="item in users" :key="item.account" :label="item.account" :value="item.account"> </el-option>
            </el-select>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="addVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveAdd()">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'FilterAccountManagment',
    data() {
        return {
            query: {
                searchKey: '',
                currentPage: 1,
                pageSize: 10
            },
            allFilterAccount: [],
            filterAccountList: [],
            total: 0,

            users: [],
            addVisible: false,
            loading: false,
            searchTimer: '',
            selectedAccount: ''
        };
    },
    created() {
        this.getAllFilterAccount();
    },
    methods: {
        /**
         * 获取用户列表
         */
        async getAllFilterAccount() {
            try {
                const res = await this.$api.filter.getFilterAccountList();
                if (res.code === 2000) {
                    this.allFilterAccount = res.data.filterAccountList;
                    this.total = res.data.total;
                    this.$message.success('获取成功');
                    this.getFilterAccountList();
                } else {
                    this.$message.error(res.msg);
                }
            } catch (e) {
                console.log(e);
                this.$message.error('获取失败');
            }
        },

        getFilterAccountList() {
            let tempList = this.allFilterAccount;
            if (this.query.searchKey !== '') {
                tempList = this.allFilterAccount.filter((item, index) => {
                    return item.account.includes(this.query.searchKey) || item.nickname.includes(this.query.searchKey);
                });
            }
            this.filterAccountList = tempList.filter((item, index) => {
                return index >= (this.query.currentPage - 1) * this.query.pageSize && index < this.query.currentPage * this.query.pageSize;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'currentPage', 1);
            this.getFilterAccountList();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getFilterAccountList();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('该账号将从过滤名单中移除，确定要继续吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const params = {
                            account: row.account
                        };
                        const res = await this.$api.filter.deleteFilterAccount(params);
                        if (res.code === 2000) {
                            this.query.currentPage = 1;
                            this.getAllFilterAccount();
                            this.$message.success('移除成功');
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

        searchUser(query) {
            if (query !== '') {
                clearTimeout(this.searchTimer);
                this.loading = true;
                this.searchTimer = setTimeout(async () => {
                    this.loading = false;
                    try {
                        let params = {
                            account: query
                        };
                        const res = await this.$api.user.searchUser(params);
                        if (res.code === 2000) {
                            this.users = res.data.users;
                        } else {
                            this.$message.error('匹配失败');
                        }
                    } catch (error) {
                        this.$message.error('匹配失败');
                    }
                }, 1000);
            } else {
                this.users = [];
            }
        },

        // 保存新增
        async saveAdd() {
            if (this.selectedAccount !== '') {
                this.$confirm('该账号将加入过滤名单中，确定要继续吗？', '提示', {
                    type: 'warning'
                })
                    .then(async () => {
                        try {
                            const params = {
                                account: this.selectedAccount
                            };
                            const res = await this.$api.filter.addFilterAccount(params);
                            if (res.code === 2000) {
                                this.getAllFilterAccount();
                                this.$message.success('新增成功');
                                this.addVisible = false;
                            } else {
                                this.$message.error(res.msg);
                            }
                        } catch (error) {
                            this.$message.error('新增失败');
                        }
                    })
                    .catch(() => {
                        this.$message.info('操作已取消');
                    });
            } else {
                return false;
            }
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
