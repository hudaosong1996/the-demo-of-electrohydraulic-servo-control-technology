// pages/download/download.js
const db = wx.cloud.database()
const file = db.collection('file')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filelist:[],
    testid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '数据加载中....',
    })
    file.get().then(res=>{
      this.setData({
        filelist:res.data
      },res=>{
        wx.hideLoading()
      })
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

  },
  downloadfile:function(event){
    this.setData({
      testid: event.currentTarget.dataset.testid
    })
    console.log(this.data.testid)

    wx.cloud.getTempFileURL({
      fileList: [{
        fileID: this.data.testid,
        maxAge: 60 * 60, // one hour
      }]
    }).then(res => {
      wx.downloadFile({
        url: res.fileList[0].tempFileURL,
        header: {},
        success: function (res) {
          var filePath = res.tempFilePath;
          console.log(filePath);
          wx.openDocument({
            filePath: filePath,
            success: function (res) {
              console.log('打开文档成功')
            },
            fail: function (res) {
              console.log(res);
            },
            complete: function (res) {
              console.log(res);
            }
          })
        },
        fail: function (res) {
          console.log('文件下载失败');
        },
        complete: function (res) { },
      })
    }).catch(error => {
      // handle error
    })
  }
})