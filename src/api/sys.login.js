import request from '@/plugin/axios'

// 获取公钥
export function getPublicKey() {
  return request({
    url: "/login/publicKey",
    method: "get"
  });
}

// 登录
export function AccountLogin (data) {
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function LoginByUserInfo() {
  return request({
    url: `/account/getMenu`,
    method: "get"
  });
}
