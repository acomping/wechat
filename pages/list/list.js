import { $request,$toast } from '../../utils/util'

Page({
  data: {
    value: '',
    list:[],
    flag:true,
    goods_name:'',
    pagenum:1,
  },
  onLoad(){
    this.getShopList();
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    if(this.data.value.trim()){
      this.queryShop();
    }else{
      $toast('id不能为空','error',2000)
    }
  },
  onClick() {
    if(this.data.value.trim()){
      this.queryShop();
    }else{
      $toast('id不能为空','error',2000)
    }
  },
  async getShopList(){
    let {data} = await $request({
      url:'goods',
      data:{
        pagenum:this.data.pagenum,
        pagesize:10
      }
    });
    this.setData({
      list:[...this.data.list,...data.data.goods],
      flag:true,
      value:''
    })
  },
  async queryShop(){
    let {data} = await $request({
      url:`goods/${this.data.value.trim()}`
    });
    console.log(data);
    if(data.meta.status!=200){
     /*  Toast.fail(data.meta.msg); */
      $toast(data.meta.msg,'none',3000)
      return; 
    }
    this.setData({
      goods_name:data.data.goods_name,
      flag:false
    })
  },

  onPullDownRefresh(){
    this.data.pagenum = 1;
    this.data.list = [];
    this.getShopList();
  },
  onReachBottom(){
    this.data.pagenum++;
    this.getShopList();
  },
});