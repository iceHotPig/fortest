<template>
	<div class="shopping">
		<div class="shopping_content">
			<div class="content_left" @click="toggleList">
				<div class="left_wrapper">
					<i class="iconfont icon-shopping_cart" :class="{full:totalCount>0}"></i>
					<div class="num" v-show="totalCount">{{totalCount}}</div>
				</div>
				<div class="left_price">
					<p>{{totalPrice}}</p>
				</div>
				<div class="push_price">
					<p>另需配送费￥{{deliveryPrice}}元</p>
				</div>
			</div>
			<div class="content_right" :class="{enough:this.totalPrice>=this.minPrice}">
				{{pay}}
			</div>
		</div>
		<transition name="fold">
			<div class="shopping_list" v-show="listShow">
				<div class="list_header">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="empty">清空</span>
				</div>
				<div class="list_content" ref="listCount">
					<ul>
						<li v-for="food in selectFoods" class="border1px">
						    <span class="name">
									{{food.name}}
						    </span>
						    <span class="price">
									{{food.price*food.count}}
						    </span>
								<div class="ctrol">
									<cardCtrol :food="food"></cardCtrol>
								</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>	
		<transition name="fade">
		  <div class="list-mask" v-show="listShow" @click="hideList"></div>  
		</transition>	
	</div>
</template>

<script>
	import  cardCtrol from '../cardCtrol/cardCtrol.vue'
	// import  food from '../food/food.vue'
	import Betterscroll from "better-scroll"
	export default{
	  props:{
			minPrice:{
				type:Number,
				default: 20
			},
			deliveryPrice:{
				type:Number,
				default: 0
			},
			selectFoods:{
				type:Array,
				default(){
				  return [{
				  		price:0,
				  		count: 0
				  	}]
				}
			}
		},
		computed:{
			totalPrice(){
				let price=0;
				this.selectFoods.forEach((goods) => {
					price+=goods.price*goods.count
				})

				return price
			},
			totalCount(){
				let count=0;

				this.selectFoods.forEach((goods) => {
					count+=goods.count
				})
				return count
			},
			pay(){
				if (this.totalPrice===0) {
					return `满￥${this.minPrice}元起送`
				}else if(this.totalPrice<this.minPrice){
					let diff=this.minPrice - this.totalPrice
					return `还差￥${diff}元`
				}
				else{
					return '去结算'
				}
			},
			listShow(){
				if (!this.totalCount) {
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				return show
			}
		},
		components:{
			cardCtrol
		},
		data(){
			return {
				fold: true,
			};
		},
		methods:{
			toggleList(){
				if (!this.totalCount) {
					return
				}
				this.fold = !this.fold
				this.$nextTick(()=>{
					if (!this.scroll) {
						this.scroll = new Betterscroll(this.$refs.listCount,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			empty(){
				this.selectFoods.forEach((item)=>{
					item.count = 0;
					})
				},
				hideList(){
					this.fold = true;
				}
			}
	}
</script>

<style lang="scss" scoped>
@import '../common/common.scss';
@import '../common/mixin.scss';
	.shopping_content{
			display: flex;
			.content_left{
				flex: 1;
				color: white;
				background:#141d27;
				.left_wrapper{
					display: inline-block;
					position: relative;
					left: 12px;
					width: 44px;
					height: 44px;
					padding: 6px;
					bottom: 12px;
					border-radius: 50%;
					background:#141d27;
					i{
						display:block;
						width: 44px;
						height: 44px;
						font-size: 24px;
						line-height: 44px;
						border-radius: 50%;
						text-align: center;
						background:#2b333b;
						color: rgba(255,255,255,.4);
						&.full{
							background:blue;
						}
					}
					.num{
						position: absolute;
						top: 0;
						right: 0;
						width: 12px;
						padding: 6px;
						font-size: 9px;
						font-weight: 700;
						line-height: 10px;
						text-align: center;
						border-radius: 12px; 
						background:rgb(240,20,20);
					}
				}
				.left_price{
					display: inline-block;
					vertical-align: top;
					font-size: 16px; 
					padding:6px 12px;
					font-weight: 700;
					margin: 10px 12px 0 0;
					color: rgba(255,255,255,.4);
					border-right: 1px solid rgba(255,255,255,.4);
				}
				.push_price{
					display: inline-block;
					vertical-align: top;
					font-size: 10px;
					font-weight: 200;
					line-height: 44px;
			    text-align: center;
					color: rgba(255,255,255,.4);
				}
			}
			.content_right{
				flex: 0 0 105px;
        width: 105px;
        font-size:12px;
        line-height: 48px;
        font-weight: 700px;
        text-align: center;
        background:#2b333b;
        color: rgba(255,255,255,.4);
        &.enough{
        	color:white;
        	background-color: #00b43c;
        }
			}
	}
	.shopping_list{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 48px;
		background:white;
		z-index: -1;	
		.list_header{
			position: relative;
			height: 40px;
			background-color: #f3f5f7;
			font-size: 14px;
			line-height: 40px;
			padding-left: 18px;
			span{
				position: absolute;
				top: 0;
				right: 18px;
			}
		}
		.list_content{
			position: relative;
			overflow: hidden;
			max-height: 200px;
			padding: 0 12px;
		  box-sizing: border-box;
			ul{
				li{
					position: relative;
					@include border_1px(rgba(7,17,27,.1));
					font-size: 14px;
					padding:12px;
					color:rgb(7,17,27);
				}
			} 
			.ctrol{
				position: absolute;
				top: 10px;
				right: 0;
			}
		}
	}
	.list-mask{
		z-index: -2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:rgba(7,17,27,.6);
    background-filter: blur(10px);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity:0;
  }

.fold-enter-active, .fold-leave-active {
      transition: all .5s;
    }
    .fold-enter, .fold-leave-active {
      transform: translate3D(0,100%,0);;
      opacity:0;
    }
</style>