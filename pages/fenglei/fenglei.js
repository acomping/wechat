import { $request,$toast } from '../../utils/util'
Page({
  data: {
    value: '',
    listl: ['苹果'],
    listR: ['苹果'],
    activeItem: 0
  },
  async chooseItem(e) {
    console.log(e)
    let { ind } = e.currentTarget.dataset
    this.setData({
      activeItem: ind
    })
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