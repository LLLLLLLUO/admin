<template>
  <div class="supplierBox">
    <cmp-line title="供应商管理" style="margin-bottom: 15px;" />
    <div class="searchBox">
      <div><el-input type="text" v-model="searchForm.cardNum" style="width: 150px;" placeholder="会员卡号" /></div>
      <div><el-input type="text" v-model="searchForm.name" style="width: 150px;" placeholder="会员名字" /></div>
      <div><el-button type="primary" @click="searchMember">查询</el-button></div>
      <div><el-button type="primary" @click="addMemberShow">新增</el-button></div>
      <div><el-button>重置</el-button></div>
    </div>
    <div class="dataListBox" style="margin: 15px 0 0 0;">
      <el-table :data="supplierList" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="供应商名称" prop="name"></el-table-column>
        <el-table-column label="联系人" prop="linkman"></el-table-column>
        <el-table-column label="联系电话" prop="mobile"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="findSupplier(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delSupplier(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 15px 0 0 0;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchForm.currentPage"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="searchForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
      <el-dialog title="添加供应商" :visible.sync="addFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="addFormRules">
          <el-form-item label="供应商名称" prop="name" label-width="120px">
            <el-input v-model="addForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman" label-width="120px">
            <el-input v-model="addForm.linkman" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile" label-width="120px">
            <el-input v-model="addForm.mobile" ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" label-width="120px">
            <el-input type="textarea" v-model="addForm.remark" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addSupplier">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑供应商" :visible.sync="editFormVisible">
        <el-form :model="editForm" ref="editForm" :rules="editFormRules">
          <el-form-item label="供应商名称" prop="cardNum" label-width="120px">
            <el-input v-model="editForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="linkman" label-width="120px">
            <el-input v-model="editForm.linkman" ></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="mobile" label-width="120px">
            <el-input v-model="editForm.mobile" ></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark" label-width="120px">
            <el-input v-model="editForm.remark" ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSupplier">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      searchForm: {
        currentPage: 1,
        pageSize: 10,
        name: '',
        linkman: '',
        mobile: '',
      },
      addFormVisible: false,
      editFormVisible: false,
      supplierList: [],
      addForm: {
        name: '',
        linkman: '',
        mobile: '',
        remark: ''
      },
      editForm: {
        name: '',
        linkman: '',
        mobile: '',
        remark: ''
      },
      total: 0,
      addFormRules: {
        name: [{required: true, message: '请输入供应商名称', trigger: 'blur'}],
        linkman: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
        mobile: [{required: true, message: '请选择联系电话', trigger: 'blur'},
        {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}]
      },
      editFormRules: {
        name: [{required: true, message: '请输入供应商名称', trigger: 'blur'}],
        linkman: [{required: true, message: '请输入联系人名称', trigger: 'blur'}],
        mobile: [{required: true, message: '请选择联系电话', trigger: 'blur'},
        {min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur'}]
      },
      editId: -1
    }
  },
  created() {
    this.getSupplierList()
  },
  methods: {
    async getSupplierList () {
      let { error_code, msg } = await this.$store.dispatch('getSupplierList', this.searchForm);
      if (error_code == 0) {
        this.supplierList = msg.rows;
        this.total = msg.count;
      }
    },
    async addMemberShow () {
      this.addFormVisible = true
    },
    async searchMember () {
      // await this.getMember()
      this.getSupplierList()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.searchForm.pageSize = val;
      this.getSupplierList();
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.searchForm.currentPage = val;
      this.getSupplierList();
    },
    async delSupplier (row) {
      let data = await this.$store.dispatch('delSupplier', row.id);
      if (data.error_code == 0) {
        this.getSupplierList();
        this.$message.success('删除成功')
      } else {
        this.$message('未知错误')
      }
    },
    async findSupplier (row) {
      let { error_code, msg } = await this.$store.dispatch('findSupplier', row.id);
      if (error_code == 0) {
        this.editForm = msg;
        this.editId = row.id;
        this.editFormVisible = true;
      }
    },
    addSupplier () {
      this.$refs.addForm.validate(async valid => {
        if (valid) {
          let { error_code } = await this.$store.dispatch('addSupplier', this.addForm);
          if (error_code == 0) {
            this.$message.success('添加成功');
            this.$refs.addForm.resetFields();
            this.addFormVisible = false;
            this.getSupplierList()
          } else {
            this.$message('未知错误')
          }
        };
      });
    },
    async editSupplier () {
      let { error_code, msg} = await this.$store.dispatch('editSupplier', {id: this.editId, data: this.editForm});
      if (error_code == 0) {
        this.$message.success(msg);
        this.getSupplierList();
        this.$refs.editForm.resetFields();
        this.editFormVisible = false;
      } else {
        this.$message(msg)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .supplierBox {
    .searchBox {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 5px;
      }
    }
  }
</style>
