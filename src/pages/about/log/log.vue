<template>
  <div class="timeline">
    <scroll-view :scroll-y="true" @scroll="timelineScroll">
      <div class="timeline__content">
        <view class="item animation-slide-left" v-for="(item,index) in logs" :key="index" :style="'animation-delay: ' + (index+1)*0.2 + 's'">
          <div class="item-content">
            <view class="cu-capsule radius">
              <view class="cu-tag bg-blue text-white">{{item.version}}</view>
              <view class="cu-tag line-blue">{{item.date}}</view>
            </view>
            <view class="margin-top-sm text-content">
              <view v-for="(itemChild,indexChild) in item.content" :key="indexChild">{{itemChild}}</view>
            </view>
          </div>
        </view>
      </div>
    </scroll-view>
    <div class="timeline__side">
      <div class="main" :style="'top:' + lineMainTop + 'px;'">
        <div class="main-content">
          <icon-awesome-component-vue class="icon" icon="fa-circle" color="rgba(0,0,0,0.23)" size="40rpx"/>
          <!-- <div class="content">2020-04-06</div> -->
        </div>
      </div>
      <icon-awesome-component-vue icon="fa-circle-thin" color="rgba(0,0,0,0.23)" size="40rpx"/>
      <div class="line"></div>
      <icon-awesome-component-vue icon="fa-circle-thin" color="rgba(0,0,0,0.23)" size="40rpx"/>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import IconAwesomeComponentVue from '../../../components/IconAwesome/IconAwesome.component.vue';
import Component from 'vue-class-component';
@Component({components: {
  IconAwesomeComponentVue,
}})
export default class Log extends Vue {
  private logs: Array<{version: string, date: string, content: Array<string>}> = [];
  private toggleDelay = false;
  private logsHeight = 0;
  private lineMainTop = 0;
  public onLoad() {
    this.logs = [
      {version: '1.1.8', date: '2021-01-12', content: [
        '- ios 白屏bug修复',
        '- 更新列表入口bug修复',
      ]},
      {version: '1.1.7', date: '2021-01-11', content: [
        '- 首次启动缓存未读取到bug修复',
        '- 缓存机制优化',
        '- 加入更新机制',
        '- 首页加入骨架屏',
        '- 暂时移除启动页面',
      ]},
      {version: '1.1.6', date: '2020-08-01', content: ['- 月天气UI优化']},
      {version: '1.1.5', date: '2020-04-12', content: [
        '- 添加更新日志',
        '- 侧边栏伸缩文字换行bug修复',
        '- 搜索页面优化',
        '- 增加动画',
      ]},
      {version: '1.1.4', date: '2020-04-06', content: ['- 添加月天气']},
    ];

    this.toggleDelay= true;
    setTimeout(() => {
      this.toggleDelay = false;
    }, 1000);
  }
  public onReady() {
    const query = uni.createSelectorQuery().in(this);
    query.select('.timeline__content').boundingClientRect((data)=>{
      this.logsHeight = <number> data.height;
    }).exec();
  }
  private timelineScroll(e:any) {
    const scrollTop = e.detail.scrollTop;
    const allLogItemHeight = this.logsHeight - this.getWindowHeight();
    const lineMainTop = parseInt(String(scrollTop / allLogItemHeight * this.getWindowHeight()));
    if (lineMainTop >= this.getWindowHeight()) {
      this.lineMainTop = lineMainTop - 20;
    } else {
      this.lineMainTop = lineMainTop;
    }
  }
  private getWindowHeight(): number {
    let windowHeight = 0;
    uni.getSystemInfo({
      success: (res) => {
        windowHeight = <number> res.windowHeight;
      },
    });
    return windowHeight;
  }
}
</script>
<style lang="stylus">
.timeline
  width 100vw
  height 100vh
  display flex
  overflow hidden
  scroll-view
    width 90vw
    height 100vh
  &__content
    width 100%
    height auto
    .item
      display flex
      flex-direction column
      align-items center
      .item-content
        width 96%
        height auto
        padding 20upx
        margin 10upx 0
        box-shadow  0 2upx 4upx rgba(0,0,0,0.16),0 2upx 4upx rgba(0,0,0,0.23)
  &__side
    width 10%
    height 100%
    display flex
    flex-direction column
    align-items center
    .main
      position relative
      width 100%
      display flex
      flex-direction column
      align-items center
      .main-content
        position absolute
        .content
          position absolute
          left -180upx
          bottom 0upx
          font-size 32upx
    .line
      flex 1
      width 4upx
      background rgba(0,0,0,0.23)
</style>
