<template>
  <div>
    <el-form
      :inline="true"
      :model="formData"
      ref="asd"
      class="search-member-from"
    >
      <el-form-item prop="cardNum">
        <el-input
          v-model.trim="formData.username"
          placeholder="账号"
        ></el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input
          v-model.trim="formData.name"
          placeholder="姓名"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="resetForm2('asd')">查询</el-button>
        <el-button type="primary" @click="addData()">新增</el-button>
        <el-button @click="qk('asd')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="userData" height="350" border style="width: 100%">
      <el-table-column type="index" label="序号"> </el-table-column>
      <el-table-column prop="username" label="账号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="salary" label="薪酬"> </el-table-column>
      <el-table-column prop="entryDate" label="入职时间"> </el-table-column>
      <el-table-column label="会员地址">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <span class="demonstration">完整功能</span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="sj.currentPage"
      :page-sizes="[1, 2, 3, 4, 10]"
      :page-size="sj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="count"
    >
    </el-pagination>
    <!-- 添加&对话框 -->
    <el-dialog title="添加信息" :visible.sync="show1">
      <el-form :model="addForm" :rules="rules" ref="ruleForm">

        <el-form-item label="账号" label-width="80px" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="姓名" label-width="80px" prop="name">
          <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" label-width="80px" prop="age">
          <el-input v-model="addForm.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="薪资" label-width="80px" prop="salary">
          <el-input v-model="addForm.salary" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入职时间" label-width="80px" prop="entryDate">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="addForm.entryDate"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑&对话框 -->
    <el-dialog title="添加信息" :visible.sync="show2">
      <el-form :model="putForm" :rules="rules2" ref="ruleForm2">

        <el-form-item label="账号" label-width="80px" prop="username">
          <el-input v-model="putForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="姓名" label-width="80px" prop="name">
          <el-input v-model="putForm.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="putForm.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="年龄" label-width="80px" prop="age">
          <el-input v-model="putForm.age" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="薪资" label-width="80px" prop="salary">
          <el-input v-model="putForm.salary" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="入职时间" label-width="80px" prop="entryDate">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="putForm.entryDate"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm2('ruleForm2')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import datffApi from "../../api/staff/index.js";
export default {
  data() {
    return {
      // 对话框显示隐藏
      show1: false,
      show2: false,
      // 表格数据
      userData: [],
      // 分页/提交的数据
      sj: {
        currentPage: 1,
        pageSize: 10,
      },
      count: 0,
      // 查询表单
      formData: {
        username: "",
        name: "", //名字
      },
      // 支付类型
      payType: [
        {
          type: 0,
          name: "现金",
        },
        {
          type: 1,
          name: "微信",
        },
        {
          type: 2,
          name: "支付宝",
        },
        {
          type: 3,
          name: "银行卡",
        },
      ],
      //添加数据form
      addForm: {
        username: "",
        name: "",
        age: "",
        mobile: "",
        salary: "",
        entryDate: "",
      },
      // 校验表单
      rules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        age: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入", trigger: "blur" }],
        salary: [{ required: true, message: "请输入", trigger: "blur" }],
        entryDate: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      rules2: {
        cardNum: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        payType: [{ required: true, message: "请输入", trigger: "blur" }],
        birthday: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        integral: [{ required: true, message: "请输入", trigger: "blur" }],
        money: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      //修改数据form
      putForm: {},
      id: "", // 提交时所用到的id
    };
  },
  methods: {
    // 查询
    async resetForm2() {
      console.log(this.formData);
      let { data } = await datffApi.userData(this.sj, this.formData);
      console.log(data);
      this.count = data.msg.count;
      this.userData = data.msg.rows;
    },
    add2() {},
    // 获取数据
    async auto() {
      let { data } = await datffApi.userData(this.sj, {});
      this.count = data.msg.count;
      this.userData = data.msg.rows;
    },
    // 添加
    addData() {
      this.show1 = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add();
        } else {
          console.log(2);
          return false;
        }
      });
    },
    async add() {
      let { data } = await datffApi.addMem(this.addForm);
      if (data.msg == "ok") {
        this.show1 = false;
        this.$message({
          message: "成功",
          type: "success",
        });
        this.qk("ruleForm");
        this.auto();
      } else {
        this.$message({
          message: "失败",
        });
      }
    },
    // 编辑
    async edit(sj) {
      let { data } = await datffApi.idMem(sj.id);
      this.id = sj.id;
      this.putForm = data.msg;
      console.log(this.putForm);
      this.show2 = true;
    },
    submitForm2(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.put();
        } else {
          console.log(2);
          // return false;
        }
      });
    },
    async put() {
      let { data } = await datffApi.putMem(this.id, this.putForm);
      console.log(data);
      if (data.msg == "数据更新成功") {
        this.$message({
          message: "数据更新成功",
          type: "success",
        });
        this.show2 = false;
        this.auto();
      } else {
        this.$message({
          message: "失败",
        });
      }
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delete(id.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async delete(id) {
      let { data } = await datffApi.delMem(id);
      console.log(data);
      if (data.msg == "ok") {
        this.show1 = false;
        this.$message({
          message: "成功",
          type: "success",
        });
        this.auto();
      } else {
        this.$message({
          message: "失败",
        });
      }
    },
    // 条数
    handleSizeChange(val) {
      this.sj.pageSize = val;
      this.auto();
    },
    // 页码
    handleCurrentChange(val) {
      this.sj.currentPage = val;
      this.auto();
    },
    // 清空表单
    qk(formName) {
      this.$refs[formName].resetFields();
    },
  },
  created() {
    this.auto();
  },
};
</script>
<style lang="less" scoped>
.el-dialog {
  width: 25% !important;
}
</style>
