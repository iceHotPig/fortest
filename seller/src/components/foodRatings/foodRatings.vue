<template>
 	<div class="foodRatings border1px">
		<dl>
	   	<dt>商品评价</dt>
	   	<dd class="ratings_title border1px">
	   		<span :class="{active:selectType == 2}" @click="select(2,$event)">
		   		{{desc.all}}
		   		{{ratings.length}}
	   		</span>
	   		<span :class="{active:selectType == 0}" @click="select(0,$event)">
		   		{{desc.positive}}
		   		{{positive.length}}
	   		</span>
	   		<span :class="{active:selectType == 1}" @click="select(1,$event)">
		   		{{desc.negative}} 
		   		{{negative.length}}
	   		</span>
	   	</dd>
	   	<dd class="ratings_icon" @click="iclick($event)">
		   	<i class="iconfont icon-check_circle" :class="{on:onlyCount}" ></i>
		   	<p>只看有内容的评价</p>
	   	</dd>
   	</dl>
 	</div>	
</template>   

<script>
	export default{
	  props:{
		 	desc:{
			 	type: Object,
			 	default(){
			 	  return{
			 	  	all:"全部",
			 	  	positive:"推荐",
			 	  	negative:"吐槽"
			 	  }
			  }
			},
			ratings:{
				type:Array,
				return: []
			},
			selectType:{
				type:Number,
				default(){
					return 2 
				}
			},
			onlyCount:{
				type:Boolean
			}
	 	},
	 	computed:{
	 		negative(){
	 			return this.ratings.filter((item) => {
	 				return item.rateType === 1;
	 			})
	 		},
	 		positive(){
	 			return this.ratings.filter((item) => {
	 				return item.rateType === 0;
	 			})
	 		}
	 	},
	 	methods:{
	 		select(type,event){
	 			if(!event._constructed){
	 				return
	 			}
	 			this.$parent.selectType = type
	 		},
	 		iclick(event){
	 			if(!event._constructed){
	 				return
	 			}
	 			this.$parent.onlyCount = !this.onlyCount
	 		}
	 	}
	}
</script>

<style lang="scss" scoped>
@import '../common/common.scss';
@import '../common/mixin.scss';
	.foodRatings{
			position: relative;
			padding: 18px 18px 0 18px;
			box-sizing: border-box;
			@include border_1px(rgba(7,17,27,.1));
			dt{
				font-size: 14px;
				font-weight: 700;
				line-height: 14px;
				margin-bottom: 6px;
				color: rgb(7,17,27);
			}
			.ratings_title{
				position: relative;
				font-size: 0;
				line-height: 16px;
				padding: 12px 0 18px 0;
			 @include border_1px(rgba(7,17,27,.1));
				span{
					display: inline-block;
					padding: 8px 12px;
					font-size: 12px;
					margin-left: 8px;
					&:nth-child(1){
						background-color: rgb(0,160,220);
						color: rgb(255,255,255);
					}
					&:nth-child(2){
						background-color: rgba(0,160,220,.6);
						color: rgb(7,17,27);
					}
					&:nth-child(3){
						background-color: rgba(0,0,0,.3);
						color: rgb(7,17,27);
					}
					&.active{
						background-color: blue;
					}
				}
			}
			.ratings_icon{
				padding: 12px 0;
				i{
					display: inline-block;
					vertical-align: top;
					font-size: 24px;
					color: rgb(147,153,159);
					line-height: 24px;
					&.on{
						color:green;
					}
				}
				p{
					display: inline-block;
					vertical-align: top;
					font-size: 12px;
					color: rgb(147,153,159);
					line-height: 24px;
				}
			}
		}
</style>