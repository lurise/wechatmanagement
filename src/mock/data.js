import Mock from 'mockjs'
import {doCustomTimes} from '@/libs/util'
import orgData from './data/org-data'
import {contentList, contentList1} from './data/content-data'
import {treeData} from './data/tree-select'
import {userinfoData, Roles, RoleInfo, accessInfo} from './data/userinfo-data'
import {getParams} from '../libs/util'
import {templateData} from './data/template-data'

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

export const getTempData = req => {
  return templateData
}

export const postRoleDeleteData = req => {
  let selectItem = JSON.parse(req.body)
  let indices = []
  for (let i = 0; i < selectItem.length; i++) {
    indices.push(selectItem[i].roleName)
  }
  return {
    status: 200,
    roleName: indices
  }
}

export const postRoleCreateData = req => {
  return Math.ceil(Math.random() * 10)
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
  // console.log(params)
  let pageIndex = params.pageindex
  let pageSize = params.pagesize
  // console.log("pageindex=" + pageIndex + ",pagesize=" + pageSize)
  if (pageSize * pageIndex < contentList.length) {
    console.log(contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
    return {
      total: contentList.length,
      contentlist: contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    }
  } else {
    console.log(contentList.slice((pageIndex - 1) * pageSize, pageIndex * pageSize))
    return {
      total: contentList.length,
      contentlist: contentList.slice(contentList.length - pageSize, contentList.length)
    }
  }
}

export const getContentData1 = req => {
  const params = getParams(req.url)
  let pageIndex = params.pageindex
  let pageSize = params.pagesize

  if (pageSize * pageIndex > contentList.length && (pageSize - 1) * pageIndex < contentList1.length) {
    return {
      contentList: contentList1.slice((pageIndex - 1) * pageSize, contentList1.length)
    }
  } else if ((pageIndex - 1) * pageSize > contentList1.length) {
    return {
      contentList: [],
      totalCount: contentList1.length
    }
  } else {
    return {
      contentList: contentList1.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
      totalCount: contentList1.length
    };
  }
}

export const deleteContent = (req) => {
  return {
    status: 200
  }
}

export const postContentCreateData = (req) => {
  return {
    status: 200
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
