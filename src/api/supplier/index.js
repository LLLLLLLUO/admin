import http from '../../utils/index.js';

/**
 * 查询供应商
 * @param {*} param0
 * @returns
 */
function getSupplierList({ currentPage, pageSize, name, linkman, mobile }) {
  return http({
    url: `/supplier/list/search/${currentPage}/${pageSize}`,
    method: 'post',
    data: {
      name,
      linkman,
      mobile
    }
  })
};

/**
 * 添加供应商
 * @param {*} data
 * @returns
 */
function addSupplier(data) {
  return http({
    url: '/supplier',
    method: 'post',
    data
  })
};

/**
 * 删除供应商
 * @param {*} id
 * @returns
 */
function delSupplier(id) {
  console.log(id);
  return http({
    url: '/supplier/' + id,
    method: 'delete'
  })
};

/**
 * 删除供应商
 * @param {*} id
 * @returns
 */
function editSupplier(id, data) {
  console.log(id);
  return http({
    url: '/supplier/' + id,
    method: 'put',
    data
  })
};

/**
 * 查询单个供应商
 * @param {*} id
 * @returns
 */
function findSupplier(id) {
  return http({
    url: '/supplier/' + id,
    method: 'get'
  })
};

export {
  getSupplierList,
  addSupplier,
  delSupplier,
  findSupplier,
  editSupplier
}
