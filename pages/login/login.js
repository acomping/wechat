// pages/login/login.js
import { $request,$toast } from '../../utils/util'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    yhm:'',
    pwd:'',
    userInfo:{},
    flag:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getYhm(e){
    let {value} = e.detail;
    this.setData({
      yhm:value
    })
  },
  getPwd(e){
    let {value} = e.detail;
    this.setData({
      pwd:value
    })
  },
  async login(){
    if(!this.data.yhm||!this.data.pwd){
      $toast('输入有误','error',2000)
    }else{
      try {
        let user = await $request({
          url:'login',
          method:'POST',
          data:{
            username:this.data.yhm,
            password:this.data.pwd
          }
        });
        console.log(user);
        let {data,meta} = user.data;
        if(meta.status==200){
          wx.setStorageSync('token', data.token);
          $toast(meta.msg,'success',2000);
          setTimeout(()=>{
            wx.switchTab({
              url: '../index/index'
            })
          },3000)
        }else{
          $toast(meta.msg,'error',2000)
        }
      } catch (error) {
        console.log(error)
      }
      console.log('使用try catch就不会阻止这句话执行了')
      
      /* if(user.data&&user.data.code==0){
        if(user.data.Token){
          wx.setStorageSync('token', user.data.Token)
        }
        $toast(user.data.message,'success',2000)
        setTimeout(()=>{
          wx.switchTab({
            url: '../index/index'
          })
        },3000)
      }else{
        $toast(user.data.message,'error',2000)
      } */
    }
  },
  
  /* getUserInfo() {
    let self = this
    wx.getUserProfile({
      desc: "获取你的昵称、头像、地区及性别", // 不写不弹提示框
      success: res => {
        console.log(res)
        self.setData({
          userInfo: res.userInfo
        })
      },
      fail: res => {
        //拒绝授权
        wx.showToast({
          title: '您拒绝了授权',
          icon: 'none'
        })
        return;
      }
    })
  }, */

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载更多',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})