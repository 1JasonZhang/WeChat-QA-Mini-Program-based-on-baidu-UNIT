// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headLeft: 'https://img.zcool.cn/community/01af985927beeeb5b3086ed47f7e57.png@2o.png',
    headRight: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1636096978,3638354018&fm=26&gp=0.jpg',
    syas: [{
      'robot': '来跟我聊天吧！',
      'isay': '你好！',
    }],
    value:''
  },

  /**
     * 发送事件处理函数
     */
  converSation(e) {
    console.log(e)
    let that = this
    //console.log(e.detail.value.says)
    let obj = {},
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length


    //发送
      wx.request({
        url: 'https://aip.baidubce.com/rpc/2.0/unit/service/chat?access_token=' + this.data.imp_key,
        data:{
          "log_id":"UNITTEST_10000",
          "version":"2.0",
          "service_id":"S32918",
          "session_id":"",
          "request":{
                  "query": isay,
                  "user_id": "88888"},
                  "dialog_state":{
                  "contexts":{
                          "SYS_REMEMBERED_SKILLS":["1057"]
                          }
                      }},
        method:'POST',
        success(res) {
          console.log(res)
          try {
            let tuling = res.data.result.response_list[0].action_list[0].say;
            obj.robot = tuling;
          } catch (error) {
            let tuling = '输入不能为空呀！';
            obj.robot = tuling;
          }
          obj.isay = isay;
          syas[length] = obj;
          that.setData({
            syas: syas,
            value:''
          })
          
        }
      }) 
  },
  deleteChat(){
    this.setData({
      value:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   
  onLoad: function (options) {
    let that = this
    let key = {},
      ak = '百度ai开放平台申请的ak',
      sk = '百度ai开放平台申请的sk'
  
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=' + ak + '&client_secret=' + sk,
      method:'POST',
      success(res) {
        try {
          let access_token = res.data.access_token;
          that.setData({
            imp_key: access_token
          })
        } catch (error) {
          console.log(error)
        }          
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.getUserInfo({
      success(e) {
        console.log(e.userInfo.avatarUrl)
        that.setData({
          headRight: e.userInfo.avatarUrl
        })
      }
    })
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
