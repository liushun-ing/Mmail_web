<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item> <i class="el-icon-lx-cascades"></i> 日志管理 </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.searchKey" placeholder="类型或关键字" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="warning" icon="el-icon-delete" @click="handleDelete">批量删除日志</el-button>
            </div>
            <el-table :data="logList" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column label="类别" align="center" min-width="100">
                    <template #default="scope">
                        <el-tag :type="scope.row.type === 'smtp' ? 'warning' : 'success'">{{
                            scope.row.type === 'smtp' ? 'smtp' : 'pop3'
                        }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="日志内容" align="center" min-width="400"></el-table-column>
                <el-table-column prop="logTime" label="记录时间" align="center" min-width="200"></el-table-column>
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
        <el-dialog title="删除日志" :visible="deleteVisible" width="30%" :show-close="false">
            <el-form ref="deleteForm" :rules="rules" :model="deleteForm" label-width="90px">
                <el-form-item label="开始时间" prop="startTime">
                    <el-date-picker
                        v-model="deleteForm.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择起始时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="endTime">
                    <el-date-picker
                        v-model="deleteForm.endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="deleteVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveDelete('deleteForm')">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'LogManagment',
    data() {
        return {
            query: {
                searchKey: '',
                currentPage: 1,
                pageSize: 10
            },

            deleteForm: {},
            deleteVisible: false,

            logList: [],
            total: 0,

            rules: {
                startTime: [{ required: true, message: '请选择起始时间', trigger: 'blur' }],
                endTime: [{ required: true, message: '请选择起始时间', trigger: 'blur' }]
            }
        };
    },
    created() {
        this.getLogList();
    },
    methods: {
        /**
         * 获取用户列表
         */
        async getLogList() {
            try {
                const res = await this.$api.log.getLogList(this.query);
                if (res.code === 2000) {
                    this.logList = res.data.logList;
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
            this.getLogList();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'currentPage', val);
            this.getLogList();
        },

        // 点击删除按钮
        handleDelete() {
            this.deleteVisible = true;
            this.deleteForm = {
                startTime: '',
                endTime: ''
            };
        },

        // 删除操作
        saveDelete() {
            // 二次确认删除
            this.$confirm('这部分日志将永久删除，确定要继续吗？', '提示', {
                type: 'warning'
            })
                .then(async () => {
                    try {
                        const res = await this.$api.log.deleteLogByTime(this.deleteForm);
                        if (res.code === 2000) {
                            this.deleteVisible = false;
                            this.query.currentPage = 1;
                            this.getLogList();
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
