<template>
  <div class="memberBox">
    <cmp-line title="会员管理" style="margin-bottom: 15px;" />
    <div class="searchBox">
      <el-input type="text" style="width: 150px;" placeholder="会员卡号" />
      <el-input type="text" style="width: 150px;" placeholder="会员名字" />
      <el-select v-model="searchForm.payType" placeholder="请选择" style="width: 150px;">
        <el-option
          v-for="item in payType"
          :key="item.type"
          :label="item.name"
          :value="item.type">
          <span>{{ item.name }}</span>
        </el-option>
      </el-select>
      <div class="block">
        <el-date-picker
          v-model="searchForm.birthday"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="addMember">新增</el-button>
      <el-button>重置</el-button>
    </div>
    <div class="dataList">
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
              {{ scope.row.payType }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员地址" prop="address"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="editMember(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="delMember(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      dataList: [],
      total: 0
    }
  },
  created() {
    this.getMember()
  },
  methods: {
    async getMember () {
      let data = await this.$store.dispatch('getMember', this.searchForm);
      console.log(data);
      if (data.error_code == 0) {
        this.dataList = data.msg.rows;
        this.total = data.msg.count;
        console.log(this.dataList);
      };
    },
    editMember (row) {
      console.log(row);
    },
    async delMember (row) {
      console.log(row);
      let { error_code } = await this.$store.dispatch('delMember', row.id);
      if (error_code == 0) {
        this.$message.success('删除成功');
        this.getMember();
      }
    },
    async addMember () {
      console.log(this.addForm);
    }
  },
  filters: {
    toPay (val) {
      // console.log(val);
      let type = payType.find(item => item.type == val);
      return type.name || ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .memberBox {
    .searchBox {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      .el-input {

      }
    }
  }
</style>
