import request from '@/utils/axios'

const req = {
  postCourier: (data) => request({ method: 'post', url: '/courier/create', data }),
  putCourier: (data) => request({ method: 'put', url: '/courier/update', data }),
  getCouriers: (data) => request({ method: 'get', url: '/courier/list', data }),
  getCourier: (id, data) => request({ method: 'get', url: `/courier/get/${id}`, data }),
  deleteCourier: (data) => request({ method: 'delete', url: '/courier/delete', data }),
  loginCourier: (data) => request({ method: 'post', url: '/courier/login', data }),
  getCourierOrders: (guid) => request({ method: 'get', url: `/courier/${guid}/list-orders` }),
  updateOrderStatus: (data) => request({ method: 'put', url: '/order/update-status', data }),
  getOrders: (data) => request({ method: 'get', url: '/order/list', data })

}
export default req
