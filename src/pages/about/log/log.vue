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
import Vue from 'vue'
import IconAwesomeComponentVue from '../../../components/IconAwesome/IconAwesome.component.vue';
export default Vue.extend({
    components:{
        IconAwesomeComponentVue
    },
    data() {
        let logs: Array<{version: string, date: string, content: Array<string>}> = [];
        let toggleDelay = false;
        let logsHeight = 0;
        let lineMainTop = 0;
        return {
            logs,
            toggleDelay,
            logsHeight,
            lineMainTop
        }
    },
    onLoad() {
        this.logs = [
            {version: '1.1.6', date: '2020-08-01', content: ['- 月天气UI优化']},
            {version: '1.1.5',date: '2020-04-12',content: [
                '- 添加更新日志',
                '- 侧边栏伸缩文字换行bug修复',
                '- 搜索页面优化',
                '- 增加动画'
                ]},
            {version: '1.1.4',date: '2020-04-06',content: ['- 添加月天气']},
        ];

        this.toggleDelay= true;
        setTimeout(() => {
            this.toggleDelay = false;
        }, 1000);
    },
    onReady() {
        const query = uni.createSelectorQuery().in(this);
        query.select('.timeline__content').boundingClientRect(data=>{
            this.logsHeight = <number> data.height;
        }).exec();
    },
    methods:{
        timelineScroll(e:any) {
            let scrollTop = e.detail.scrollTop;
            let allLogItemHeight = this.logsHeight - this.getWindowHeight();
            let lineMainTop = parseInt(String(scrollTop / allLogItemHeight * this.getWindowHeight()));
            if(lineMainTop >= this.getWindowHeight()){
                this.lineMainTop = lineMainTop  - 20;
            }else {
                this.lineMainTop = lineMainTop;
            }
        },
        getWindowHeight(): number {
            let windowHeight = 0;
            uni.getSystemInfo({
                success: res => {
                    windowHeight = <number> res.windowHeight;
                }
            });
            return windowHeight;
        }
    }

})
</script>
