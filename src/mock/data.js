import Mock from 'mockjs'
import {doCustomTimes} from '@/libs/util'
import orgData from './data/org-data'
import {treeData} from './data/tree-select'
import {userinfoData,Roles} from './data/userinfo-data'


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

export const getRoles=req=>{
  return Roles
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
