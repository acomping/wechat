
/* module.exports = $request; */
const host = 'http://timemeetyou.com:8889/api/private/v1/';
export function $request({ url = host, method = "GET", data = {}, header = {} }) {
  let headerObj;
  let tokenVal = wx.getStorageSync('token');
  if(tokenVal){
    headerObj = {
      'Authorization':tokenVal
    };
  }else{
    headerObj = {};
  }

  return new Promise(resolve => {
    wx.request({
      url: host + url,
      method,
      data,
      header:headerObj,
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




