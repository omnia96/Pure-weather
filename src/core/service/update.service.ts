export class UpdateService {
  constructor() {
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate);
    });

    updateManager.onUpdateReady((res) => {
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            uni.clearStorage();
            console.log('缓存已清理！');
            updateManager.applyUpdate();
          }
        },
      });
    });

    updateManager.onUpdateFailed((res) => {
      // 新的版本下载失败
    });
  }
}
