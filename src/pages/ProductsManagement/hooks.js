import { useState } from 'react'
import { fetchApi } from '../../services'

export const useGetBrandList = () => {
  const [brandList, setBrandList] = useState([{status: 'init'}])
  const getBrandList = async () => {
    try {
      const brandRes = await fetchApi({ url: 'http://localhost:8080/admin/brandLists' })
      setBrandList(brandRes)
    }
    catch(e) {
      setBrandList([{ status: 'error' }])
    }
    return brandList
  }
  console.log(brandList, '======')
  return {brandList, setBrandList, getBrandList}
}
