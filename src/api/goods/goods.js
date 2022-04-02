import request from "../../utils/index.js";

// 获取商品列表
const getGoodsList = (page = 1, size = 10, data = {}) => {
  return request({
    url: `/goods/list/search/${page}/${size}`,
    method: 'POST',
    data
  })
}

// 删除一条数据
const deleteGoodsOne = (id) => {
  return request({
    url: `/goods/${id}`,
    method: 'DELETE'
  })
}

// 新增商品数据

const addGoodsAPI = (data) => {
  return request({
    url: "/goods/",
    method: "POST",
    data
  })
}

// 查询单条数据
const getGoodsOne = (id) => {
  return request({
    url: `/goods/${id}`,
    method: 'GET'
  })
}

// 修改单条数据

const editGoodsAPI = (id, data) => {
  return request({
    url: `/goods/${id}`,
    method: 'PUT',
    data
  })
}

export default {
  getGoodsList,
  deleteGoodsOne,
  addGoodsAPI,
  getGoodsOne,
  editGoodsAPI
}
