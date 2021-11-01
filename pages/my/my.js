// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    flieList: []
  },
  delItem(event){
    let {index} = event.detail;
    console.log(index);
    this.data.fileList.splice(index,1)
    this.setData({
      fileList:this.data.fileList
    })
  },
  afterRead(e) {

    console.log(e);
    let { file } = e.detail
    wx.uploadFile({
      url: 'http://timemeetyou.com:8889/api/private/v1/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: {},
      header: {
        'Authorization': wx.getStorageSync('token')
      },
      success: (res) => {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: JSON.parse(res.data).data.url });
        this.setData({ fileList });
      },
    });
  },
  setShouq() {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        res.authSetting = {
          "scope.userInfo": true,
          "scope.userLocation": true
        }
      }
    })
  },
  getShouq() {
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        console.log(res);


        res.authSetting = {
          "scope.userInfo": false,
          "scope.userLocation": false
        }
        res.subscriptionsSetting = {
          mainSwitch: true, // 订阅消息总开关
          itemSettings: {   // 每一项开关
            SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
            SYS_MSG_TYPE_RANK: 'accept'
          }
        }
        console.log(res.authSetting);
        console.log(res.subscriptionsSetting)
      }
    })
  },
  getUser() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          flag: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})