// index.js
// 获取应用实例
import { $request } from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    background: [
      'http://p1.music.126.net/zrqPp_dVYpFkpB6-sYAjYA==/109951166530762650.jpg?imageView&quality=89', 
      'http://p1.music.126.net/GX_LKmcS2KH6K49bQUmJ8w==/109951166530428072.jpg?imageView&quality=89', 
      'http://p1.music.126.net/Bw_L-JR8JoYkedOPESFnoA==/109951166530423787.jpg?imageView&quality=89'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,

    length:1, 
    condition:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    msg:'nihao'
  },
  fn(e){
    console.log(e);
  },
  async onLoad() {
    let res = await $request({});
    this.setData({
      msg:res.data.name
    })


    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  changeMsg(e){
    console.log(e.detail);
    this.setData({
      msg:e.detail
    })
  },
  goto(){
    /* wx.reLaunch({
      url: '../home/home?id=1'
    }) */
    wx.navigateTo({
      url: '/pages/home/home?id=1&name=zhangsan',
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
