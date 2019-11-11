// pages/shangchuan/shangchaun.js
const db = wx.cloud.database()
const file = db.collection('file')
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  upload:function(e){
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success:res=> {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles[0].path
        const name = res.tempFiles[0].name
        wx.cloud.uploadFile({
          cloudPath: name,
          filePath: tempFilePaths, // 文件路径
          success: res => {
            file.add({
              data:{
                name: name,
                file: res.fileID
              }
            }).then(res=>{
              wx.showToast({
                title: '上传成功',
                icon:'success'
              })
            })
          },
          fail: err => {
            // handle error
          }
        })
      },
      fail:err=>{
        console.error(err)
      }
    })
    
  }
})