import request from '../../utils/index.js';

// 获取数据
const userData = (data, sou = {}) => {
  return request({
    method: "POST",
    url: `/staff/list/search/${data.currentPage}/${data.pageSize}`,
    data: sou
  })
}

// 添加数据
const addMem = (data) => {
  return request({
    method: "POST",
    url: `/staff`,
    data: data
  })
}


// 删除数据
const delMem = (id) => {
  return request({
    method: "DELETE",
    url: `/staff/${id}`,
  })
}


// 查询ID
const idMem = (id) => {
  return request({
    method: "get",
    url: `/staff/${id}`,
  })
}
// 编辑完成后提交
const putMem = (id, data) => {
  return request({
    method: "PUT",
    url: `/staff/${id}`,
    data
  })
}

export default {
  userData,
  addMem,
  delMem,
  idMem,
  putMem
}
