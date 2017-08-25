<template>
  <div id="app">
    <iheader v-bind:seller='seller'></iheader>            
    <div class="tab border1px">
      <div class="tab_item ">
        <router-link to="/goods">商品</router-link> 
      </div>
      <div class="tab_item ">
        <router-link to="/ratings">评价</router-link> 
      </div>
      <div class="tab_item ">
        <router-link to="/seller">商家</router-link> 
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import iheader from "./components/header/header.vue";
  export default {
    name:'app',
    data(){
      return{
        seller:Object
      }
    },
    created(){
      this.$http.get('api/seller').then(response=>{
        this.seller=response.body.data;
        // console.log(this.seller.data.name);
      })
    },
    components:{
      iheader:iheader
    }
  }
</script>

<style lang="scss" scoped>
@import './components/common/common.scss';
@import './components/common/mixin.scss';
  .tab{
    height: 40px;
    line-height: 40px;
    display: flex;
    position: relative;
    background-color: white;
    @include border_1px(rgba(7,17,27,.1));
    .tab_item{
      flex:1;
      text-align: center;
      &>a{
        display: block;
        height: 100%;
        font-size: 14px;
        color:rgb(77,85,93);
        &.active{
          color:rgb(240,20,20);
        }
      }
    }
  }
</style>
