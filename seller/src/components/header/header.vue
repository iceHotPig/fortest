<template>
  <div class="header">
    <test v-bind:test='seller.supports'></test>
    <div class="logo">
  		<img v-bind:src="seller.avatar" alt="">
    </div>
    <div class="header_bg">
	  	<img v-bind:src="seller.avatar" alt="">
	  </div>
  	<div class="header_title">
  	  <div class="header_title_name clearfix">
  	    <div class="title_name_pic">
  	    </div>
  			<h2 class="pull-left">{{seller.name}}</h2>
  	  </div>
  		<p>{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
  		<div class="header_supports">
  			<supports v-if="seller.supports" v-bind:supports="seller.supports"></supports>
  		</div>
  	</div>
  	<div class="header_counter" v-if='seller.supports' @click="showDetail">
  		{{seller.supports.length}}个
  		<i class="iconfont icon-keyboard_arrow_right"></i>
  	</div>
		<div class="header_bulletin" @click="showDetail">
			<p><span class="header_bulletin_pic"></span>{{seller.bulletin}}</p>
		</div>
		<transition name="fade">
			<div class="header_show_detail" v-show="detailShow" @click="closeDetail">
				<div class="show_detail">
					<div class="show_detail_main">
						<h2 >{{seller.name}}</h2>
						<div class="show_detail_star">
							<star :score="seller.score" v-bind:size="24"></star>
							<!-- <star :score="seller.score" v-bind:size="36"></star> -->
						</div>	
						<div class="show_detail_message">
						  <div class="line"></div>
							<div class="text">优惠信息</div>
						  <div class="line"></div>
						</div>
						<div class="show_detail_supports">
			  			<supports v-if="seller.supports" v-bind:supports="seller.supports" v-bind:className="className"></supports>
			  		</div>
			  		<div class="show_detail_message">
						  <div class="line"></div>
							<div class="text">商家公告</div>
						  <div class="line"></div>
						</div>
						<div class="detail_message_content">
							<p>{{seller.bulletin}}</p>
						</div>
					</div>
					<div class="show_detail_delete">
						<i class="iconfont icon-close"></i>
					</div>
				</div>
			</div>
    </transition>	
		<div class="header_detail"></div>
  </div>	
</template>

<script>
	import supports from '../supports/supports.vue'
	import test from '../test/test.vue'
	import star from '../star/star.vue'
	export default {
		props:{
			seller:{   
				return: Object
			}
		},
		data(){
			return{
				detailShow:false,
				className:"big",
			}
		},
		methods:{
			showDetail(){
				this.detailShow=true;
			},
			closeDetail(){
				this.detailShow=false;
			}
		},
		components:{
			supports,
			test,
			star
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../common/common.scss';
@import '../common/mixin.scss';
	.header{
		position: relative;
		background:rgba(7,17,27,.5);
		.header_bg{
			width: 100%;
			height: 143px;
			z-index: -1;
			position: absolute;
			top: 0;
			left: 0;
			overflow: hidden;
			img{
				width: 100%;
				filter:blur(10px);
			}
		}
		.logo{
			display: inline-block;
			img{
		    height: 64px;
		    width: 64px;
		    margin: 24px 16px 18px 24px;
			}
		}
		.header_title{
			margin-top: 24px;
			vertical-align: top;
			display: inline-block;
			.header_title_name{
				.title_name_pic{
					height: 18px;
					width: 30px;
					display: inline-block;
					background-size:cover;
					@include bgImage(brand);
				}
				h2{
					font-size: 16px;
				  line-height: 18px;
					font-weight: bold;
					vertical-align: top;
					display: inline-block;
					color: rgb(255,255,255);
				}
			}
			p{
				font-size: 10px;
				line-height: 12px;
				margin: 8px 0 8px 0;
				color: rgb(255,255,255);
			}
		}	
		.header_supports{
			display: block;
			height: 12px;
			overflow: hidden;
			&:hover{
				height: auto;
			}
		}
		.header_counter{
			position: absolute;
			bottom: 38px;
			right: 12px;
			height: 24px;
			font-size: 10px;
			line-height: 24px;
			padding: 3px 8px;
			border-radius: 20px;
			color: white;
			background:pink;
			text-align: center;
		}
		.header_bulletin{
	    height: 28px;
	    width: 100%;
			padding: 0 12px;
			overflow: hidden;
			box-sizing: border-box;
	    background:rgba(7,17,27,.2);
			p{
				width: 100%;
				font-size: 12px;
				line-height: 28px;
				color: white;
				overflow: hidden;
				text-align: center;
				white-space: nowrap;
				display: inline-block;
				text-overflow:ellipsis;
				box-sizing: border-box;
				span{
		    	width: 30px;
		    	height: 16px;
		    	margin-top: 7px;
		    	margin-right: 4px;
		    	vertical-align: top;
		    	display: inline-block;
		    	background-size: cover;
		    	@include bgImage(bulletin);
	      }
			}
		}
		.header_show_detail{
			z-index: 10;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			overflow: auto;
			background:rgba(7,17,27,.7);
			.show_detail{
				backdrop-filter:blur(10px);
				position: relative;
			 	min-height: 100%;
				.show_detail_main{
					padding: 0 36px 96px;
					box-sizing: border-box;
					color: white;
					h2{
						margin-top: 64px;
						font-size: 32px;
						font-weight: 700;
						margin-bottom: 16px;
						text-align: center;
					}
					.show_detail_star{
						// height: 24px;
						margin: 16px 0 24px 0;
					}
					.show_detail_message{
						display: flex;
						.text{
						  padding: 0 12px;
						  line-height: 14px;
						  font-weight: 700;
							text-align: center;
						}
						.line{
							position: relative;
							top: -7px;
							flex: 1;
							border-bottom: 1px solid white;
						}
					}
					.show_detail_supports{
						padding: 24px 0 28px 0;
					}
					.detail_message_content{
					 	margin-top: 24px;
					 	font-size: 12px;
					 	font-weight: 200;
					 	line-height: 24px;
					}
				}
				.show_detail_delete{
					position: absolute;
					bottom: 0;
					width: 100%;
					padding: 32px 0;
					text-align: center;
					i{
						font-size: 30px;
						color: red;
					}
				}
			}
		}
		.fade-enter-active, .fade-leave-active {
		  transition: opacity .5s
		}
		.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		  opacity: 0
		}
	}
</style>