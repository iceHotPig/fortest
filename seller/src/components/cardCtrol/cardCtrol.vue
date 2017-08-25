<template>

		<div class="cardCtrol">
		  <!-- <transition name="move"> -->
			  <div class="add_circle" @click.stop.prevent="reduce($event)">
					<i class="iconfont icon-remove_circle_outline remove_circle" v-show="food.count"></i> 
			  </div>
		 <!--  </transition> -->
		  <div class="num">
				<i class="iconfont" v-show="food.count" >{{food.count}}</i>
		  </div>
		  <div class="add_circle">
				<i class="iconfont  icon-add_circle " @click.stop.prevent="add($event)"></i>
		  </div>
		</div>
  
</template>

<script>
  import Vue from 'vue'
	export default{
    methods:{
    	add(event){
    		if (!event._constructed) {
    			return
    		}
	    	if (!this.food.count) {
	    		Vue.set(this.food,'count',1);
	    	}else{
	    		this.food.count++
	    	}
    	},
    	reduce(event){
    		if (!event._constructed) {
    			return
    		}
    		this.food.count--
    	}
    },
    props:{
    	food:{
    		return: Object
    	}
    },
    computed:{

    }
	}
</script>

<style lang='scss' scoped>
	.cardCtrol{
		.add_circle{
			display: inline-block;
			vertical-align: top;
			i{
				font-size: 24px;
				margin-left: 6px;
				color: rgb(0,160,220);
			}
		}
		.num{
			display: inline-block;
			vertical-align: top;
			i{
				font-size: 10px;
				color: rgb(147,153,159);
				line-height: 24px;
			}
		}
		.add_circle{
			display: inline-block;
			vertical-align: top;
			i{
				font-size: 24px;
				margin-left: 6px;
				color: rgb(0,160,220);
			}
		}
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		  opacity: 0
		}

	 // .move-enter-active, .move-leave-active{
  //     transition: all 0.5s linear;
  //     transform: translate3D(0,0,0) rotate(0deg);
  //   }
  //   .move-enter,.move-leave-active{
  //     transform: translate3D(24px,0,0) rotate(180deg);
  //     opacity:0;
  //   }
	}
</style>    