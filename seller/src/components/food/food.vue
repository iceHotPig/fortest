<template>
  <transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div>
			  <!--back -->
		   	<div @click="hide" class="back">
		     	<i class="iconfont icon-arrow_lift"></i>
			   		返回
		   	</div>
				<!-- food_image -->
		   	<div class="food_image">
		   		<img :src="food.image" alt="">
		   	</div>
			  <!-- food_title -->
		   	<div class="food_title border1px">
			   	<dl>
			   		<dt>{{food.name}}</dt>
			   		<dd class="title_count">
				   		月销售份额{{food.sellCount}}
				   		<span>好评率{{food.rating}}%</span>
			   		</dd>
			   		<dd class="title_price">
				   		价格￥{{food.price}} 
				   		<span v-if="food.oldPrice">{{food.oldPrice}}</span>
			   		</dd>
			   	</dl>
			   	<div class="title_chart" v-show="!food.count" @click="add($event)">
			   		<p>加入购物车</p>
			   	</div>
			   	<div class="title_cardCtrol"  v-show="food.count||food.count==0">
			   		<cardCtrol :food="food"></cardCtrol>
			   	</div>
		   	</div>	
			  <!-- food_bg -->
		   	<div class="food_bg border1px">
		   	</div>
			  <!-- food_info -->
		   	<div class="food_info border1px">
			   	<dl>
			   		<dt>商品介绍</dt>
			   		<dd>{{food.info}}</dd>
			   	</dl>
		   	</div>
		   	<div class="food_bg border1px">
		   	</div>
			  <!-- food_atings -->
		   	<div class="food_ratings">
			   	<foodRatings v-if="food.ratings" :desc="desc" :ratings="food.ratings" :selectType="selectType" :onlyCount="onlyCount"></foodRatings>
		   	</div>	
		   	<!-- food_ratings_detail -->
		   	<div class="food_ratings_detail">
		   		<ul>
		   			<li v-for="item in food.ratings" v-show="needShow(item.rateType,item.text)">
		   			  <div class="item_top">
	   						<div class="item_time">{{ratetime(item.rateTime)}}</div>
	   						<div class="item_people">
	   							<p>{{item.username}}</p>
	   							<img :src="item.avatar" alt="">
	   						</div>
		   			  </div>
   						<div class="item_txt">
   						  <!-- <i class="icon-thumb_up" v-if="item.rateType===0"></i>
                <i class="icon-thumb_down" v-else></i> -->
                <i class="iconfont" :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"></i>
   							{{item.text}}
   						</div>
		   			</li>
		   		</ul>
		   	</div>
			</div>
		</div>
	</transition>
</template>
<script>
import cardCtrol from '../cardCtrol/cardCtrol.vue'
import foodRatings from '../foodRatings/foodRatings.vue'
import Betterscroll from "better-scroll"
import Vue from 'vue'
	export default{
	  props:{
	  	food:{
	  		return: Object
	  	},
	  },
	  data(){
	  	return{
	  		showFlag: false,
	  		onlyCount:false,
	  		selectType: 0,
	  		desc:{
	  			all:"全部",
		 	  	positive:"推荐",
		 	  	negative:"吐槽"
	  		}
	  	}
	  },
	  methods:{
	  	show(){
	  		this.showFlag= true;
	  			this.$nextTick(()=>{
					if (!this.scroll) {
						this.scroll = new Betterscroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
	  	},
	  	hide(){
	  		this.showFlag= false;
	  	},
	  	add(event){
	  		if (!event._constructed) {
	  			return
	  		}
	  		Vue.set(this.food,"count",1)
	  	},
	  	needShow(type,text){
	  		if(this.onlyCount && !text){
	  			return false;
	  		}
	  		if (this.selectType==2) {
	  			return true
	  		}else{
	  			return type == this.selectType
	  		}
	  	},
	  	ratetime(date){
				  var date = new Date(date);//如果date为13位不需要乘1000
				  var Y = date.getFullYear() + '-';
				  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
				  var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
				  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				  var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				  var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
				  return Y+M+D+h+m+s;
				}
	  	},
	  components:{
	  	cardCtrol,
	  	foodRatings
	  },
	  watch:{
	  	'selectType'(type){
	  		this.$nextTick(()=>{
	  			this.scroll.refresh();
	  		})
	  	},
	  	'onlyCount'(onlyCount){
	  		this.$nextTick(()=>{
	  			this.scroll.refresh();
	  		})
	  	}
	  }
	}
</script>

<style lang="scss" scoped>
@import '../common/common.scss';
@import '../common/mixin.scss';
	.food{
		position: fixed;
		width:100%;
		height: 100%;
		overflow:hidden;
		z-index: 200;
		background: white;
		.back{
			position: absolute;
			z-index: 100;
			color: white;
			i{
				display: inline-block;
				height: 10px;
				width: 10px;
				border-radius: 50%;
			}
		}
		.food_image{
			position: relative;
			top: 0;
			height: 0;
			width: 100%;
			padding-top:100%;
			img{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}
		.food_title{
			padding: 18px;
			position: relative;
			border-sizing: border-box;
			@include border_1px(rgba(7,17,27,.1));
			dl{
				dt{
					font-size: 14px;
					font-weight: 700;
					line-height: 14px;
					color: rgb(7,17,27);
					margin-bottom: 8px;
				}
				.title_count{
					font-size: 10px;
					color: rgb(147,153,159);
					line-height: 20px;
					margin-bottom: 18px;
				}
				.title_price{
					font-size: 14px;
					font-weight: 700;
					line-height: 24px;
					color:rgb(240,20,20);
					span{
						font-size: 10px;
						font-weight: normal;
						line-height: 24px;
						color:rgb(147,153,159);
						text-decoration: line-through;
					}
				}
			}
			.title_chart{
				position: absolute;
				right: 18px;
				bottom: 18px;
				font-size: 10px;
				color: white;
				line-height: 12px;
				padding:6px 12px;
				background-color: rgb(0,160,240);
				border-radius: 12px;
				z-index: 100;
			}
			.title_cardCtrol{
				position: absolute;
				right: 18px;
				bottom: 18px;
			}
		}
		.food_bg{
			position: relative;
			height: 16px;
			background-color:#f3f5f7;
			@include border_1px(rgba(7,17,27,.1));
		}
		.food_info{ 
			position: relative;
      padding: 18px;
      box-sizing: border-box;
			@include border_1px(rgba(7,17,27,.1));
      dl{
      	dt{
      		font-size: 14px;
					font-weight: 600;
					line-height: 14px;
					color: rgb(7,17,27);
					margin-bottom: 6px;
      	}
      	dd{
      		font-size: 12px;
      		font-weight: 200;
      		color: rgb(77,65,93);
      		line-height: 24px;
      	  padding: 0 8px;
      	  box-sizing: border-box;
      	}
      }
		}
		.food_ratings_detail{
			ul{
				li{
					padding: 0 18px;
					box-sizing: border-box;
					.item_top{
						position: relative;
						padding: 16px 0;
						.item_time{
							display: inline-block;
							vertical-align: top;
							margin-bottom: 6px;
							font-size: 10px;
							color: rgb(147,153,159);
						}
						.item_people{
							position: absolute;
							top: 16px;
							right: 12px;
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							color: rgb(147,153,159);
							line-height: 12px;
							p{
								display: inline-block;
							  vertical-align: top;

							}
							img{
								display: inline-block;
							  vertical-align: top;
								height: 12px;
								width: 12px;
								border-radius: 6px;
								overflow: hidden;
							}
						}
					}
					.item_txt{
						font-size: 12px;
						color:rgb(7,17,27);
						line-height: 16px;
					}
				}
			}
		}
	}
	.move-enter-active, .move-leave-active{
    transition: all 0.2s linear;
    transform: translate3D(0,0,0);
  }
  .move-enter,.move-leave-active{
    transform: translate3D(100%,0,0);
  }
</style>