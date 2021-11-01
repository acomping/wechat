import { $request, $toast } from '../../utils/util'
Page({
  data: {
    value: '',
    listL: [],
    listR: null,
    activeItem: 0
  },
 
  async onLoad() {
    await this.getCatList();
    this.chooseItem();
  },

  async chooseItem(e) {
    console.log(e);
    let resp;
    if(e){
      let { ind,cat_id } = e.currentTarget.dataset;
      this.setData({
        activeItem: ind
      });
      let res = await $request({ url: `categories/${cat_id}`});
      console.log(res)
      resp = res.data;
    }else{
      let res = await $request({ url: `categories/${this.data.listL[0].cat_id}`});
      console.log(res)
      resp = res.data;
    }
    console.log(resp)
    if(resp.meta.status!=200){
      $toast(resp.meta.msg,'none',3000);
      return;
    }
    this.setData({
      listR:resp.data
    })
  },


  async getCatList() {
    let { data } = await $request({ url: 'categories' });
    if(data.meta.status!=200){
      $toast(data.meta.msg,'none',3000);
      return;
    }
    this.setData({
      listL:data.data
    })
    console.log(this.data.listL)
  },








  onChange(e) {
    console.log(e);
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log(this.data.value);

    // Toast('搜索' + this.data.value);
  },
  onClick() {
    /*  console.log(this.data.value); */
    // Toast('搜索' + this.data.value);
    wx.chooseLocation({
      complete: (res) => {
        console.log(res);
        let { address, name } = res;
        this.setData({
          value: address + name
        })
      },
    })
  },
});