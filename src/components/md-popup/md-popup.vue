<template>
  <div class="md-popup">
    <u-popup v-model="popupStatus" mode="center" :closeable="true"></u-popup>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
@Component
export default class MdPopup extends Vue {

}
</script>
<style lang="stylus"></style>
