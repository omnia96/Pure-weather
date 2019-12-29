<style lang="stylus" scoped>

</style>
<template>
    <div class="page">
        <navigation-component-vue :StatusBarHeight="StatusBarHeight" :NavigationBarItems="NavigationBarItems"/>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import NavigationComponentVue from '../../components/Navigation/Navigation.component.vue'
export default Vue.extend({
    components:{
        NavigationComponentVue
    },
    data(){
        return {
            StatusBarHeight:0,
            NavigationBarItems:[
                {icon: 'fa-home',title: '首页',path: '../home/home',selected: false},
                {icon: 'fa-exclamation-circle',title: '关于',path: '../about/about',selected: true}
            ]
        }
    }
})
</script>