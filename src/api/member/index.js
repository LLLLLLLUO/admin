import http from '../../utils/index.js';

/**
 * 添加会员
 * @param {*} data
 * @returns
 */
function addMember(data) {
  return http({
    url: '',
    method: 'post',
    data
  })
};

/**
 * 删除会员
 * @param {*} id
 * @returns
 */
function delMember(id) {
  return http({
    url: '/member/' + id,
    method: 'delete'
  })
};

/**
 * 查询单一会员
 * @param {*} id
 * @returns
 */
function getMemberInfo(id) {
  return http({
    url: '/member/' + id,
    method: 'get'
  })
};

/**
 * 编辑会员
 * @param {*} data
 * @returns
 */
function editMember(data) {
  return http({
    url: '/member/' + id,
    method: 'put',
    data
  })
};

/**
 * 查询所有会员
 * @param {*} param0
 * @returns
 */
function getMember({ currentPage, pageSize }) {
  return http({
    url: `/member/list/search/${currentPage}/${pageSize}`,
    method: 'post'
  })
}

export {

}
