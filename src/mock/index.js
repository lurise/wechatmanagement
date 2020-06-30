import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import {
  getTableData,
  getUserData,
  getRoles,
  getRoleInfo,
  getDragList,
  uploadImage,
  getOrgData,
  getTreeSelectData,
  getAccessInfo,
  getContentData1,
  postRoleCreateData,
  postRoleDeleteData,
  postContentCreateData,
  deleteContent,
  getTempData
} from './data'
import { getMessageInit, getContentByMsgId, hasRead, removeReaded, restoreTrash, messageCount } from './user'

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
Mock.setup({
  timeout: 1000
})

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/get_content_data/, getContentData1)
Mock.mock(/\/get_temp_data/, getTempData)
Mock.mock(/\/create_role/, postRoleCreateData)
Mock.mock(/\/delete_role/, postRoleDeleteData)
Mock.mock(/\/delete_content/, deleteContent)
Mock.mock(/\/create_content/, postContentCreateData)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)
Mock.mock(/\/get_user_data/, getUserData)
Mock.mock(/\/get_roles/, getRoles)
Mock.mock(/\/get_role_info/, getRoleInfo)
Mock.mock(/\/get_access_info/, getAccessInfo)
Mock.mock(/\/get_drag_list/, getDragList)
Mock.mock(/\/save_error_logger/, 'success')
Mock.mock(/\/image\/upload/, uploadImage)
Mock.mock(/\/message\/init/, getMessageInit)
Mock.mock(/\/message\/content/, getContentByMsgId)
Mock.mock(/\/message\/has_read/, hasRead)
Mock.mock(/\/message\/remove_readed/, removeReaded)
Mock.mock(/\/message\/restore/, restoreTrash)
Mock.mock(/\/message\/count/, messageCount)
Mock.mock(/\/get_org_data/, getOrgData)
Mock.mock(/\/get_tree_select_data/, getTreeSelectData)

export default Mock
