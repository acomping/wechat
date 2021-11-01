// components/hello/hello.js
const htmlSnip =
`<div class="div_class">
  <h1>Title</h1>
  <p class="p">
    Life is&nbsp;<i>like</i>&nbsp;a box of
    <b>&nbsp;chocolates</b>.
  </p>
</div>
`
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    msg:{
      type:'String',
      value:'hello'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    htmlSnip
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changefu(){
      this.triggerEvent('myevent','乌拉')
    }
  }
})
