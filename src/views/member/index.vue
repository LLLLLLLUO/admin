<template>
  <div class="memberBox">
    <cmp-line title="会员管理" style="margin-bottom: 15px;" />
    <div class="searchBox">
      <div><el-input type="text" v-model="searchForm.cardNum" style="width: 150px;" placeholder="会员卡号" /></div>
      <div><el-input type="text" v-model="searchForm.name" style="width: 150px;" placeholder="会员名字" /></div>
      <div>
        <el-select clearable v-model="searchForm.payType" placeholder="请选择" style="width: 150px;">
          <el-option
            v-for="item in payType"
            :key="item.type"
            :label="item.name"
            :value="item.type">
            <span>{{ item.name }}</span>
          </el-option>
        </el-select>
      </div>
      <div>
        <div class="block">
          <el-date-picker
            v-model="searchForm.birthday"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </div>
      <div><el-button type="primary" @click="searchMember">查询</el-button></div>
      <div><el-button type="primary" @click="addMemberShow">新增</el-button></div>
      <div><el-button>重置</el-button></div>
    </div>
    <div class="dataList" style="margin: 15px 0 0 0;">
      <el-table :data="dataList" border>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="会员卡号" prop="cardNum"></el-table-column>
        <el-table-column label="会员姓名" prop="name"></el-table-column>
        <el-table-column label="会员生日" prop="birthday">
          <template slot-scope="scope">
            <div>{{ moment(scope.row.birthday).format('YYYY-MM-DD') }}</div>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column label="可用积分" prop="integral"></el-table-column>
        <el-table-column label="开卡金额" prop="money"></el-table-column>
        <el-table-column label="支付类型" prop="payType">
          <template slot-scope="scope">
            <div>
              {{ scope.row.payType | toPay }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员地址" prop="address"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="findMember(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delMember(scope.row)">删除</el-button>
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

      <el-dialog title="添加会员" :visible.sync="addFormVisible">
        <el-form :model="addForm" ref="addForm" :rules="addFormRules">
          <el-form-item label="会员卡号" prop="cardNum" label-width="90px">
            <el-input v-model="addForm.cardNum" ></el-input>
          </el-form-item>
          <el-form-item label="会员姓名" prop="name" label-width="90px">
            <el-input v-model="addForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="会员生日" label-width="90px">
            <!-- <el-input v-model="addForm.birthday" ></el-input> -->
            <el-date-picker
            value-format="yyyy-MM-dd"
              v-model="addForm.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号码" label-width="90px">
            <el-input v-model="addForm.phone" ></el-input>
          </el-form-item>
          <el-form-item label="开卡金额" label-width="90px">
            <el-input v-model="addForm.money" ></el-input>
          </el-form-item>
          <el-form-item label="可用积分" label-width="90px">
            <el-input v-model="addForm.integral" ></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType" label-width="90px">
            <!-- <el-input v-model="addForm.payType" ></el-input> -->
            <el-select v-model="addForm.payType" placeholder="请选择支付方式">
              <el-option
                v-for="item in payType"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员地址" label-width="90px">
            <el-input type="textarea" v-model="addForm.address" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMember">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑会员" :visible.sync="editFormVisible">
        <el-form :model="editForm" ref="editForm" :rules="editFormRules">
          <el-form-item label="会员卡号" prop="cardNum" label-width="90px">
            <el-input v-model="editForm.cardNum" ></el-input>
          </el-form-item>
          <el-form-item label="会员姓名" prop="name" label-width="90px">
            <el-input v-model="editForm.name" ></el-input>
          </el-form-item>
          <el-form-item label="会员生日" label-width="90px">
            <el-date-picker
            value-format="yyyy-MM-dd"
              v-model="editForm.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="手机号码" label-width="90px">
            <el-input v-model="editForm.phone" ></el-input>
          </el-form-item>
          <el-form-item label="开卡金额" label-width="90px">
            <el-input v-model="editForm.money" ></el-input>
          </el-form-item>
          <el-form-item label="可用积分" label-width="90px">
            <el-input v-model="editForm.integral" ></el-input>
          </el-form-item>
          <el-form-item label="支付类型" prop="payType" label-width="90px">
            <el-select v-model="editForm.payType" placeholder="请选择支付方式">
              <el-option
                v-for="item in payType"
                :key="item.type"
                :label="item.name"
                :value="item.type">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="会员地址" label-width="90px">
            <el-input type="textarea" v-model="editForm.address" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editMember">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
var payType = [
        {
          type: 0,
          name: '现金'
        },
        {
          type: 1,
          name: '微信'
        },
        {
          type: 2,
          name: '支付宝'
        },
        {
          type: 3,
          name: '银行卡'
        }
      ]
export default {
  data() {
    return {
      moment,
      searchForm: {
        currentPage: 1,
        pageSize: 10,
        cardNum: '',
        name: '',
        payType: '',
        birthday: ''
      },
      payType,
      addForm: {
        address: "",
        birthday: "",
        cardNum: "",
        integral: "",
        money: "",
        name: "",
        payType: "",
        phone: ""
      },
      editForm: {
        cardNum: "",
        name: "",
        payType: "",
        birthday: "",
        phone: "",
        integral: "",
        money: "",
        address: "",
      },
      eidtId: -1,
      dataList: [],
      total: 0,
      addFormVisible: false,
      editFormVisible: false,
      addFormRules: {
        cardNum: [{required: true, message: '请输入会员卡号', trigger: 'blur'},
        {min: 2, max: 12, message: '会员卡号在2~12位之间', trigger: 'blur'}],
        name: [{required: true, message: '请输入会员姓名', trigger: 'blur'},
        {min: 2, max: 12, trigger: 'blur'}],
        payType: [{required: true, message: '请选择支付类型', trigger: 'blur'}]
      },
      editFormRules: {
        cardNum: [{required: true, message: '请输入会员卡号', trigger: 'blur'},
        {min: 2, max: 12, message: '会员卡号在2~12位之间', trigger: 'blur'}],
        name: [{required: true, message: '请输入会员姓名', trigger: 'blur'},
        {min: 2, max: 12, trigger: 'blur'}],
        payType: [{required: true, message: '请选择支付类型', trigger: 'blur'}]
      }
    }
  },
  created() {
    this.getMember()
  },
  methods: {
    async getMember () {
      let data = await this.$store.dispatch('getMember', this.searchForm);
      if (data.error_code == 0) {
        this.dataList = data.msg.rows;
        this.total = data.msg.count;
      };
    },
    async findMember (row) {
      let { error_code, msg } = await this.$store.dispatch('findMember', row.id);
      if (error_code == 0) {
        this.eidtId = row.id
        let type = this.payType.find(item => item.type == msg.payType);
        msg.payType = type.name;
        this.editForm = msg;
        this.editFormVisible = true;
      }
    },
    async delMember (row) {
      let { error_code } = await this.$store.dispatch('delMember', row.id);
      if (error_code == 0) {
        this.$message.success('删除成功');
        this.getMember();
      }
    },
    async addMemberShow () {
      this.addFormVisible = true
    },
    async addMember () {
      this.$refs.addForm.validate(async valid => {
        console.log(valid);
        // console.log(this.addForm);
        if (valid) {
          let { error_code } = await this.$store.dispatch('addMember', this.addForm);
          if (error_code == 0) {
            this.$message.success('添加成功');
            this.getMember();
            this.$refs.addForm.resetFields();
            this.addFormVisible = false;
          }
        }
      })
    },
    async searchMember () {
      await this.getMember()
    },
    async editMember () {
      let data = await this.$store.dispatch('upEditMember', {id: this.eidtId, data: this.editForm});
      console.log(data);
      if (data.error_code == 0) {
        this.editId = -1;
        this.$refs.editForm.resetFields();
        this.editFormVisible = false;
        this.getMember()
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.searchForm.pageSize = val;
      this.getMember();
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.searchForm.currentPage = val;
      this.getMember();
    }
  },
  filters: {
    toPay (val) {
      let type = payType.find(item => item.type == val);
      if (type) {
        return type.name
      } else {
        return val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberBox {
    .searchBox {
      display: flex;
      flex-wrap: wrap;
      div {
        margin-right: 10px;
      }
    }
  }
</style>
