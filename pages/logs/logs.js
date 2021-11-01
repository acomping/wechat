
Page({
  data: {
    list:['新闻','财经','故事','历史','体育'],
    i:0
  },
  goHome(){
    wx.navigateTo({
      url: '../home/home',
    })
  },
  goIndex(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  changeItem(e){
    /* 拿到的是绑定在自身上的index值 */
    let {souyin} = e.currentTarget.dataset;
    /* 把data中的i的值改成我点击后拿到的索引值 */
    this.setData({
      i:souyin
    })
  }
})
