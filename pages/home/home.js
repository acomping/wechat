// const $request = require("../../utils/util.js");
import { $request,$toast } from '../../utils/util.js'

Page({
  onShareAppMessage() {
    return {
      title: 'swiper',
      path: 'page/component/pages/swiper/swiper'
    }
  },

  data: {
    background: [
      'http://p1.music.126.net/zrqPp_dVYpFkpB6-sYAjYA==/109951166530762650.jpg?imageView&quality=89', 
      'http://p1.music.126.net/GX_LKmcS2KH6K49bQUmJ8w==/109951166530428072.jpg?imageView&quality=89', 
      'http://p1.music.126.net/Bw_L-JR8JoYkedOPESFnoA==/109951166530423787.jpg?imageView&quality=89'
    ],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    list:[],
    i:0,
    id:'',
    name:'',
    config : {
      url:'http://localhost:8081',
      method:'POST',
      data:{},
      header:{
        'content-type': 'application/json',
        'Token': wx.getStorageSync('token')
      }
    },
    count:1
  },
  async onLoad(data){
    let {id,name} = data;
    this.setData({id,name})
    this.data.config.data.id = id;
    this.data.config.data.name = name;
    /* 异步存储 */
    // wx.setStorage({
    //   key:"age",
    //   data:18
    // })
    // console.log('异步存储')
    /* 同步存储 */
    wx.setStorageSync('token','123asdfqwe')
    // console.log('同步存储')

    // wx.getStorage({
    //   key: 'name',
    //   success(res){
    //     console.log(res.data);
    //   }
    // })
   /*  let val = wx.getStorageSync('name')
    console.log(val); */
    /* 同步删除 */
    /* wx.removeStorageSync('ID'); */
    /* wx.removeStorage({
      key: 'age',
      success (res) {
        console.log(res)
      }
    }) */
   
    // try{
    //   wx.removeStorageSync(key1)
    // }catch(err){
    //   console.log(err);
    // }

    // $request(config).then(res=>{
    //   $toast(JSON.stringify(res.data),'none',5000);
    //   /* let config2 = {
    //     url:'http://localhost:8081',
    //     method:'Get',
    //     data:res,
    //     header:{
    //       'content-type': 'application/json',
    //       'Token': wx.getStorageSync('token')
    //     }
    //   }
    //   return $request(config2) */
    // })
    let res1 = await $request(this.data.config);
    this.data.config.data.id = res1.data.id;
    this.data.config.data.name =  res1.data.name;
    let res2 = await $request(this.data.config);
    this.data.config.data.id = 3;
    this.data.config.data.name =  'wangwu';
    let res3 = await $request(this.data.config);
    console.log(res3)
    
    this.data.count = 1;
    let listIndex = await $request(
      {
        url:'/getList',
        data:{count:this.data.count}
      }
    );
 
    this.setData({
      list:listIndex.data
    })
  },

  goback(){
    wx.navigateBack({
      /* 返回后执行下面的回调 */
      complete: (res) => {
        // console.log(res);
      },
      success: (res) => {
        wx.showToast({
          title: '返回成功',
          icon: 'success',
        });
      }
    })
  },
  change1(e){
    let {ia} = e.currentTarget.dataset;
    this.setData({
      i:ia
    })
  },
  deleteList(e){
    // console.log(e.currentTarget.dataset.souyin)
    // let i = e.currentTarget.dataset.souyin;
    let {souyin} = e.currentTarget.dataset;
    this.data.list.splice(souyin,1);
    this.setData({
      list:this.data.list
    })
  },
  addList(e){
    let {addtext} = e.currentTarget.dataset;
    console.log(e.currentTarget);
    this.data.list.push(addtext);
    this.setData({
      list:this.data.list
    })
  },

  changeIndicatorDots() {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay() {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange(e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange(e) {
    this.setData({
      duration: e.detail.value
    })
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    this.data.count = 1;
    /* 这个就是从数据库拿到的首页数据 */
    let listIndex = await $request(
      {
        url:'/getList',
        data:{count:this.data.count}
      }
    );
    this.setData({
      list:listIndex.data
    })
    wx.showToast({
      title: '刷新',
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    this.data.count++;
   
    let {data} = await $request(
      {
        url:'/getList',
        data:{count:this.data.count}
      }
    );
    console.log(data);

    if(data&&data.length==0){
      wx.showToast({
        title: '数据加载完毕',
      })
    }else{
      this.setData({
        list:[...this.data.list,...data]
      })
      wx.showToast({
        title: '加载更多',
      })
    }
 
  },

})