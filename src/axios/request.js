import axios from 'axios' 

//创建axios实例
const service = axios.create({
  // baseURL: 'https://result.eolinker.com/XWHkewC202109af5ad44cd0893e8954bba2342eb59f7bbf?uri=', // api的base_url
  timeout: 200000, // 请求超时时间
  withCredentials: true // 选项表明了是否是跨域请求
})
service.interceptors.request.use(config => {
  // console.log('request go');
  return config;
}, err => {
  // console.log('请求失败')
  return Promise.reject(err)
})
//拦截响应
service.interceptors.response.use(config => {
  // console.log('response get')
  return config;
}, err => {
  // console.log('响应失败')
  return Promise.reject(err)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return Promise.resolve(response)
  },
  error => {
    return Promise.reject(error)
  }
)

function removeEmptyParmas (parmas) {
  for (let k in parmas) {
    if (parmas[k] === null || parmas[k] === '' || parmas[k] === {} || parmas === []) {
      delete parmas[k]
    }
  }
  return parmas
}

const get = (url, params) => {
  return new Promise((resolve, reject) => {
    params = removeEmptyParmas(params)
    service.get(url, { params }).then(res => {
      resolve(res)
    }, res => {
      reject(res)
    })
  })
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, params).then(res => {
      resolve(res.data)
    }, res => {
      reject(res)
    })
  })
}

const put = (url, params) => {
  return new Promise((resolve, reject) => {
    service.put(url, params).then(res => {
      resolve(res.data)
    }, res => {
      reject(res)
    })
  })
}

const del = (url, params) => {
  return new Promise((resolve, reject) => {
    service.delete(url, params).then(res => {
      resolve(res.data)
    }, res => {
      reject(res)
    })
  })
}
export default service

export {
  get,
  put,
  post,
  del
}