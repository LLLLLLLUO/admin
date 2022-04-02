<template>
  <div class="goods">
    <cmp-line title="商品管理" />

    <!-- 查询开始 -->
    <el-form
      :inline="true"
      :model="searchData"
      class="demo-form-inline"
      ref="searchData"
    >
      <el-form-item prop="name">
        <el-input v-model="searchData.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchData.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          v-model="searchData.supplierName"
          placeholder="选择供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="searchGoods('searchData')"
          class="memberBtn"
          >查询</el-button
        >
        <el-button type="primary" @click="addGoodsFlag = true">新增</el-button>
        <el-button @click="searchReset('searchData')">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询结束 -->

    <!-- 商品管理表格开始 -->
    <el-table :data="goodsData" border style="width: 100%" height="450">
      <el-table-column type="index" label="序号" width="60"> </el-table-column>
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="code" label="商品编码"> </el-table-column>
      <el-table-column
        prop="spec"
        label="商品规格"
        width="110"
      ></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"> </el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"> </el-table-column>
      <el-table-column prop="storageNum" label="库存数量"> </el-table-column>
      <el-table-column prop="supplierName" label="供应商"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="oepnEditDialog(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteGoodsOne(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 商品管理表格结束 -->

    <!-- 增加会员弹框开始 -->
    <el-dialog title="会员编辑" :visible.sync="addGoodsFlag" width="500px">
      <el-form
        :model="addGoodsForm"
        :rules="addGoodsrules"
        ref="addGoodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addGoodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="addGoodsForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="addGoodsForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="addGoodsForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="addGoodsForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="addGoodsForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="addGoodsForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="addResetForm('addGoodsForm')">取消</el-button>
          <el-button type="primary" @click="addGoodsOne('addGoodsForm')"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 增加会员弹框结束 -->

    <!-- 编辑会员弹框开始 -->
    <el-dialog title="会员编辑" :visible.sync="editGoodsFlag" width="500px">
      <el-form
        :model="editGoodsForm"
        :rules="editGoodsrules"
        ref="editGoodsForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editGoodsForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="editGoodsForm.code"></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="editGoodsForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="editGoodsForm.retailPrice"></el-input>
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="editGoodsForm.purchasePrice"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="editGoodsForm.storageNum"></el-input>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierName">
          <el-input v-model="editGoodsForm.supplierName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="editResetForm('editGoodsForm')">取消</el-button>
          <el-button type="primary" @click="editGoodsOne('editGoodsForm')"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 编辑会员弹框结束 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import goodsModel from "../../api/goods/goods.js";
export default {
  data() {
    return {
      editGoodsFlag: false,
      editGoodsForm: {},
      editId: "",
      addGoodsFlag: false,
      addGoodsForm: {
        name: "",
        code: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: "",
        supplierName: "",
      },
      page: 1,
      size: 10,
      total: 0,
      goodsData: [],
      searchData: {
        name: "",
        code: "",
        supplierName: "",
      },
      addGoodsrules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "change" },
        ],
      },
      editGoodsrules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
          { min: 3, max: 20, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" },
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    async getGoodsList() {
      const {data} = await goodsModel.getGoodsList(
        this.page,
        this.size,
        this.searchData
      );
      console.log(data, "商品列表数据");
      if (data.error_code == 0) {
        this.goodsData = data.msg.rows;
        // console.log(data, "获取数据");
        this.total = data.msg.count;
      }
    },
    deleteGoodsOne(id) {
      this.$confirm("确认删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const { data } = await goodsModel.deleteGoodsOne(id);
          if (data.error_code == 0) {
            this.$message.success("删除成功");
            this.getGoodsList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    searchGoods() {
      this.getGoodsList();
    },
    addGoodsOne(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await goodsModel.addGoodsAPI(this.addGoodsForm);
          console.log(data, "新增单条数据");
          if (data.error_code == 0) {
            this.$message.success("添加成功");
            this.addGoodsFlag = false;
            this.$refs[formName].resetFields();
            this.getGoodsList();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    searchReset(formName) {
      this.$refs[formName].resetFields();
    },
    async oepnEditDialog(id) {
      const { data } = await goodsModel.getGoodsOne(id);
      if (data.error_code == 0) {
        this.editGoodsForm = data.msg;
        this.editGoodsFlag = true;
        this.editId = id;
        console.log(data, "查询");
      }
    },
    editGoodsOne(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { data } = await goodsModel.editGoodsAPI(
            this.editId,
            this.editGoodsForm
          );
          console.log(data, "修改结果");
          if (data.error_code == 0) {
            this.getGoodsList();
            this.editGoodsFlag = false;
            this.$message.success("修改成功");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    editResetForm() {
      this.editMemberFlag = false;
    },
    handleSizeChange(size) {
      this.size = size;
      this.getGoodsList();
    },
    handleCurrentChange(page) {
      this.page = page;
      this.getGoodsList();
    },
  },
  created() {
    this.getGoodsList();
  },
};
</script>

<style>
</style>
