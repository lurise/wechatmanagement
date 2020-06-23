import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getUserData = () => {
  return axios.request({
    url: 'get_user_data',
    method: 'get'
  })
}

export const getTemlData = () => {
  return axios.request({
    url: 'get_temp_data',
    method: 'get'
  })
}

export const getRoles = () => {
  return axios.request({
    url: 'get_roles',
    method: 'get'
  })
}

export const getRoleInfo = (token) => {
  return axios.request({
    url: 'get_role_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const getAccessInfo = (token) => {
  return axios.request({
    url: 'get_access_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const getContentData = (pageindex, pagesize) => {
  return axios.request({
    url: 'get_content_data',
    params: {
      pageindex,
      pagesize
    },
    method: 'get'
  })
}

export const postRoleCreateData = (formData) => {
  return axios.request({
    url: 'create_role',
    data: formData,
    method: 'post'
  })
}

export const postContentCreateData = (formData) => {
  return axios.request({
    url: 'create_content',
    data: formData,
    method: 'post'
  })
}

export const deleteContent = (deleteItems) => {
  return axios.request({
    url: 'delete_content',
    data: deleteItems,
    method: 'post'
  })
}

export const deleteRole = (deleteItems) => {
  return axios.request({
    url: 'delete_role',
    data: deleteItems,
    method: 'post'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
