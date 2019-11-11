// miniprogram/pages/user/user.js
const app =getApp()
const db = wx.cloud.database()
const userInfo = db.collection('userInfo')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    avatarUrl: './user-unlogin.png',
    openid: '',
    logged: false,
    username: '',
    place: '',
    showImg: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
      mask: true
    });

    if (app.globalData.isLogin) {
      this.setData({
        logged: true,
        avatarUrl: app.globalData.avatarUrl,
        username: app.globalData.username
      })
    }

    wx.hideLoading()

     
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  goRegister (e) {
    if (!this.data.logged) {
      wx.showToast({
        title: '错误',
        image: '/images/warn.png',
        title: `请先登录`,
        duration: 1500
      })
      return
    }
    wx.navigateTo({
      url: `/pages/register/register`,
    })
  },

  goAdmin (e) {
    if (!this.data.logged) {
      wx.showToast({
        title: '错误',
        image: '/images/warn.png',
        title: `请先登录`,
        duration: 1500
      })
      return
    }
    wx.navigateTo({
      url: `/pages/admin/admin`,
    })
  },

  goSuggest (e) {
    if (!this.data.logged) {
      wx.showToast({
        title: '错误',
        image: '/images/warn.png',
        title: `请先登录`,
        duration: 1500
      })
      return
    }
    wx.navigateTo({
      url: `/pages/suggest/suggest`,
    })
  },


  addToMyapp (e) {
    this.setData({
      showImg: true
    })
  },

  hideImg () {
    this.setData({
      showImg: false
    })
  },

  goAbout (e) {
    wx.navigateTo({
      url: `/pages/aboutme/aboutme`,
    })
  },

  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {

      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        username: e.detail.userInfo.nickName
      })

      wx.setStorageSync('isLogin', 'isLogin')
      wx.setStorageSync('avatarUrl', this.data.avatarUrl)
      wx.setStorageSync('username', this.data.username)
      app.globalData.isLogin = wx.getStorageSync('isLogin')
      app.globalData.avatarUrl = wx.getStorageSync('avatarUrl')
      app.globalData.username = wx.getStorageSync('username')
    }
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
    if (app.globalData.isLogin) {
      this.setData({
        logged: true,
        avatarUrl: app.globalData.avatarUrl,
        username: app.globalData.username
      })
    }

    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
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

})