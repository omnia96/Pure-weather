module.exports = {
    get: get,
    set: set,
	remove: remove
}
function get(key) {
    try {
        const value = wx.getStorageSync(key)
        if (value) {
          console.log("读取缓存:" + key)
          return value
        } else {
          console.log("缓存:" + key + "不存在")
          return false
  
        }
      } catch (e) {
        console.log(e + "读取缓存失败")
      }
	try {
		const value = uni.getStorageInfoSync(key);
		if (value) {
		  console.log("读取缓存:" + key)
		  return value
		} else {
		  console.log("缓存:" + key + "不存在")
		  return false
		}
	} catch (e) {
		console.log(e + "读取缓存失败")
	}
}
function set(key,value) {
	try {
		uni.setStorageSync(key, value);
		console.log("缓存:" + key + "成功")
	} catch (e) {
		console.log(e + "创建缓存失败")
	}
}
function remove(key){
	try {
		uni.removeStorageSync(key);
		console.log(e + "删除成功")
	} catch (e) {
		console.log(e + "缓存删除失败")
	}
}