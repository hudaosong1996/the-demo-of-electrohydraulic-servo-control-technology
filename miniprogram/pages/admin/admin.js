// pages/admin/admin.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userN: '',
    passW: ''
  },
  userNameInput: function(e) {
    const no = e.detail || e;
    this.setData({
      userN: no
    })
  },
  passWordInput: function(e) {
    const no = e.detail || e;
    this.setData({
      passW: no
    })
  },
  loginBtnClick: function(e) {
    db.collection('admin').where({
      username: this.data.userN
    }).get({
      success: res => {
        if (this.data.passW == res.data[0].password) {
          wx.navigateTo({
            url: '/pages/shangchuan/shangchaun',
          })
        } else {
          wx.showModal({
            title: '登录失败',
            content: '密码错误' //session中用户名和密码不为空触发
          });
        }
      },
      fail: err => {
        wx.showModal({
          title: '登录失败',
          content: '账号错误'
        });
      }
    })
  },
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})