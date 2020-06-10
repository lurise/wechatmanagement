import Mock from 'mockjs'
import {doCustomTimes} from '@/libs/util'
import orgData from './data/org-data'
import {contentList} from './data/content-data'
import {treeData} from './data/tree-select'
import {userinfoData, Roles, RoleInfo, accessInfo} from './data/userinfo-data'
import {getParams} from "../libs/util";


const Random = Mock.Random

export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}

export const getUserData = req => {
  return userinfoData
}

export const postRoleCreateData = req => {
  return Math.ceil(Math.random()*10)
}

export const getRoles = req => {
  return Roles
}

export const getRoleInfo = req => {
  return RoleInfo
}

export const getAccessInfo = req => {
  return accessInfo
}

export const getContentData = (req) => {
  const params = getParams(req.url)
  console.log(params)
  let pageIndex = params.pageindex
  let pageSize = params.pagesize
  console.log("pageindex=" + pageIndex + ",pagesize=" + pageSize)
  if (pageSize * pageIndex < contentList.length) {
    console.log(contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
    return contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
  } else {
    console.log(contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
    return contentList.slice(contentList.length - pageSize, contentList.length)
  }

}

export const getDragList = req => {
  let dragList = []
  doCustomTimes(5, () => {
    dragList.push(Mock.mock({
      name: Random.csentence(10, 13),
      id: Random.increment(10)
    }))
  })
  return dragList
}

export const uploadImage = req => {
  return Promise.resolve()
}

export const getOrgData = req => {
  return orgData
}

export const getTreeSelectData = req => {
  return treeData
}
