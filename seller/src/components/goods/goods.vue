<template>
  <div class="goods">
    <!-- goods_menus -->
  	<div class="goods_menus" ref="goodsMenus">
  		<ul>
  			<li v-for="(item,index) in goods" class="menu_item" v-bind:class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
  			  <span class="text border1px">
  			  	<i class="icon" v-if="item.type>0" v-bind:class="classMap[item.type]"></i>
  					{{item.name}}
  			  </span>
  			</li>
  		</ul>
  	</div>
  	<!-- goods_content -->
  	<div class="goods_content" ref="goodsContent">
  		<ul>
  			<li v-for="item in goods" class="listSon">
  				<h2 class="content_title">{{item.name}}</h2>
  				<ul>
  					<li v-for="food in item.foods" class="food_detail" @click="choicefood(food,$event)" >
		  			  <img v-bind:src='food.icon' alt="">
		  			  <div class="food_detail_txt">
		  			  	 <p class="foodName">{{food.name}}</p>
		  			  	 <p class="foodDescription">{{food.description}}</p>
		  			  	 <p class="foodSellCount">月售{{food.sellCount}}<span>好评率{{food.rating}}%</span></p>
		  			  	 <p class="foodPrice"><strong>￥</strong>{{food.price}}<span>{{food.oldPrice}}</span></p>
		  			  	 <span class="ctrol"><cardCtrol :food="food"></cardCtrol></span>
		  			  </div>
  					</li>
  				</ul>
  			</li>
  		</ul>
  	</div>
  	<!-- goods_content -->
  	<div class="goods_foot">
  		<shopping :selectFoods="selectFood" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shopping>
  	</div>
  	<!-- goods_food -->
  	<div class="goods_food">
  	  <ul>
  				<food v-bind:food="choosefood" ref="food"></food>
  	  </ul>
  	</div>
  </div> 
</template>

<script>
import  food from '../food/food.vue'
import Betterscroll from "better-scroll"
import shopping from '../shopping/shopping.vue'
import cardCtrol from '../cardCtrol/cardCtrol.vue'
	export default {
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY: 0,
				choosefood:Object
			}
		},
		created(){
			this.$http.get("./api/goods").then(response=>{
				this.goods=response.body.data
				this.$nextTick(()=>{
					this.initScroll();
					this.getHeight();
				})
			});

			this.classMap=['decrease','discount','guarantee','invoice','special']
		},
		methods:{
			choicefood(food,event){
				if (!event._constructed){
						return 
					}
				this.choosefood=food
				this.$refs.food.show();
			},
			initScroll(){
				this.menuScroll= new Betterscroll(this.$refs.goodsMenus,{
					click:true
				});

				this.foodScroll= new Betterscroll(this.$refs.goodsContent,{
					click:true,
					probeType: 3
				});

				this.foodScroll.on('scroll',(pos) => {
					this.scrollY=Math.abs(Math.floor(pos.y))
				})
			},

			selectMenu(index,event){
				if (!event._constructed){
					return 
				}
				// console.log(event)

				let foodList=this.$refs.goodsContent.getElementsByClassName('listSon');
				let ele= foodList[index]
				this.foodScroll.scrollToElement(ele,300)
			},

			getHeight(){
				let foodList=this.$refs.goodsContent.getElementsByClassName('listSon');
				let height=0;
				this.listHeight.push(height);

				for (let i = 0; i <foodList.length; i++)  {
					let item=foodList[i];
					height +=item.clientHeight;
					this.listHeight.push(height);  
				}
			}
		},
		computed:{
			currentIndex(){
				for (let i = 0; i <this.listHeight.length-1; i++) {
					let height1=this.listHeight[i];
					let height2=this.listHeight[i+1];

					if(!height2||this.scrollY >= height1 && this.scrollY < height2){
						return i
					}
				}
			},
			selectFood(){
				let foodList=[];
				this.goods.forEach((good)=>{
					good.foods.forEach((food)=>{
						if (food.count) {
							foodList.push(food);
						}
					})
				})
				return foodList;
			}
		},
		components:{
			shopping,
			cardCtrol,
			food
		},
		props:{
			seller:{
				return: Object
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	@import '../common/common.scss';
	@import '../common/mixin.scss';
	.goods{
		display: flex;
		position: absolute;
		top: 180px;
		bottom: 48px;
		width: 100%;
		overflow: hidden;
		.goods_menus{
			flex:0 0 80px;
			width: 80px;
			background:#f3f5f7;
			.menu_item{
				display: table;
				height: 54px;
				width: 56px;
				padding: 0 12px;
				&.current{
					background:yellow;
				}
				span{
					vertical-align: middle;
					line-height: 14px;
					font-size: 12px;
					font-weight: 200;
					display: table-cell;
					color:rgb(7,17,27);
					position: relative;
					@include border_1px(rgba(7,17,27,.1));
					.icon{
						display: inline-block;
						width: 12px;
						height: 12px;
						background-size: cover;
            &.decrease{
							@include bgImage(decrease_3);
						}
						&.discount{
							@include bgImage(discount_3);
						}
						&.guarantee{
							@include bgImage(guarantee_3);
						}
						&.invoice{
							@include bgImage(invoice_3);
						}
						&.special{
							@include bgImage(special_3);
						}
					}
				}
			}
		}
		.goods_content{
    	flex:1;
	    .content_title{
	    	height: 26px;
	     	font-size: 12px;
	     	color: rgb(147,153,159);
	     	line-height: 26px;
	     	background:#f3f5f7;
	     	padding-left: 14px;
	     	border-left: 2px solid #d9dde1;
	     }
	     .food_detail{
	     		font-size: 0;
	     		margin: 18px;
	     		display: flex;
		     	img{
		     		flex: 0 0 57px;
		     		margin-right: 10px;
		     		height: 57px;
		     		width: 57px;
		     	}
	     	.food_detail_txt{
	     		flex: 1;
	     		vertical-align: top;
	     		position: relative;
	     		.foodName{
	     		 font-size: 14px;
	     		 color: rgb(7,17,27);
	     		 line-height: 14px;
	     		 margin: 2px 0 8px 0;
	     		}
	     		.foodDescription{
	     			font-size: 10px;
		     		color: rgb(147,153,159);
		     		line-height: 10px;
	     		}
	     		.foodSellCount{
	     			font-size: 10px;
		     		color: rgb(147,153,159);
		     		line-height: 10px;
		     		margin-top: 8px;
		     		span{
		     			margin-left: 12px;
		     		}
	     		}
	     		.foodPrice{
	     			font-size: 14px;
	     			margin-top: 8px;
	     			color: rgb(240,20,20);
	     			font-weight: 700;
	     			span{
	     				font-size: 10px;
		     			color: rgb(147,153,159);
		     			font-weight:normal;
		     			margin-left: 8px;
		     			text-decoration: line-through;
	     			}
	     		}
	     		.ctrol{
	     			position:absolute;
	     			bottom: 0;
	     			right: 0; 
	     		}
	     	}
      }
		}
		.goods_foot{
			position: fixed;
			bottom: 0;
			left: 0;
			height: 48px;
			width: 100%;
			background:#141d27;
		}
		.goods_food{
			width: 100%;
			position:fixed;
			top: 0;
			left: 0;
		}
	}
</style>