
/* module.exports = $request; */
const host = 'http://timemeetyou.com:8889/api/private/v1/';
export function $request({ url = host, method = "GET", data = {}, header = {} }) {
  return new Promise(resolve => {
    wx.request({
      url: host + url,
      method,
      data,
      header,
      success(res) {
        resolve(res)
      }
    })
  })
}

export function $toast(title, icon, duration) {
  wx.showToast({
    title,
    icon,
    duration
  })
}




