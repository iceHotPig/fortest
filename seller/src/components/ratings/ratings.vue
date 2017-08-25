<template>
  <div class="ratings" ref="ratings">
	  <div>
	    <!-- ratings_score -->
	  	<div class="ratings_score border1px">
	  		<div class="ratings_score_composite">
	  		  <dl>
	  		  	<dt>{{seller.score}}</dt>
	  		  	<dd><h2>综合评论</h2></dd>
	  		  	<dd>高于周边商家{{seller.rankRate}}</dd>
	  		  </dl>
	  		</div>
	  		<div class="ratings_score_star">
	  			<dl>
	  		  	<dt>
	  		  		<p>服务态度</p>
		  		  	<span class="score_star">
		  		  		<star :score="seller.serviceScore" v-bind:size="12"></star>
		  		  	</span>
		  		  	<span>{{seller.serviceScore}}</span>
	  		  	</dt>
	  		  	<dd>
		  		  	<p>食物评分</p>
		  		  	<span class="score_star">
		  		  		<star :score="seller.foodScore" v-bind:size="12"></star>
		  		  	</span>
		  		  	<span>{{seller.foodScore}}</span>
	  		  	</dd>
	  		  	<dd>送达时间<i>{{seller.deliveryTime}}分钟</i></dd>
	  		  </dl>
	  		</div>
	  	</div>	
	  	<!-- ratings_bg -->
	    <div class="ratings_bg border1px"></div>
			<!-- ratings_satisfaction -->
	  	<div class="ratings_satisfaction border1px">
	  		<foodRatings :ratings="ratings" :desc="desc" :selectType="selectType" :onlyCount="onlyCount"></foodRatings>
	  	</div>
	  	<!-- ratings_detail -->
	  	<div class="ratings_detail">
	  		<ul>
	  			<li v-for="item in ratings"  class="border1px" v-show="needShow(item.rateType,item.text)">
	  				<div class="detail_avatar">
	  					<img :src="item.avatar" alt="">
	  				</div>
	  				<div class="detail_content">
	  					<div class="detail_username">
	  						{{item.username}}
	  						<div class="time">
	  							{{ratetime(item.rateTime)}}
	  						</div>
	  					</div>
	  					<div class="detail_star">
		  					<span>
		  						<star :score="item.score" v-bind:size="12" class="detailStar"></star>
		  					</span>
	  						<div class="detail_time" v-if='item.deliveryTime'>{{item.deliveryTime}}分钟送达</div>
	  					</div>
	  					<div class="detail_txt">
	  						{{item.text}}
	  					</div>
	  					<div class="detail_icon">
	  						<i class="icon-thumb_up" v-if="item.rateType===0"></i>
	              <i class="icon-thumb_down" v-else></i>
	  					</div>
	  				</div>
	  			</li>
	  		</ul>
			</div>
	  </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'
  import Betterscroll from "better-scroll"
  import shopping from '../shopping/shopping.vue'
  import foodRatings from '../foodRatings/foodRatings.vue'

	export default {
		data(){
			return{
				ratings: [],
				hightScore: [],
				lowerScore: [],
				selectType: 2,
				onlyCount: false,
				desc:{
					all:"全部",
		 	  	positive:"满意",
		 	  	negative:"不满意"
				}
			}
		},
		created(){
			let arrTmp = [];
			this.$http.get('api/ratings').then(response=>{
				this.ratings=response.body.data;
				this.$nextTick(()=>{
					if (!this.scroll) {
							this.scroll = new Betterscroll(this.$refs.ratings,{
								click:true
							})
						}else{
							this.scroll.refresh();
						}
				})

				this.ratings.forEach((goods)=>{
					arrTmp.push(goods.score)
				});

				for(let i =0; i< arrTmp.length;i++){
          if (arrTmp[i>0]) {	
          	this.all.push(arrTmp[i])
          }
					if(arrTmp[i] >= 3){
						this.hightScore.push(arrTmp[i])
					}else{
						this.lowerScore.push(arrTmp[i])
					}
				}
			})
		},
		components:{
			star,
			shopping,
			foodRatings
		},
		props:{
			seller:{
				return: Object
			}
		},
		methods:{
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
			},
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../common/common.scss';
@import '../common/mixin.scss';
	.ratings{
		position: fixed;
		top: 184px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		.ratings_score{
			display: flex;
			padding: 18px 0;
			height: 80px;
			position: relative;
			@include border_1px(rgb(147,153,159));
			.ratings_score_composite{
				flex: 0 0 137px;
				width: 137px;
				border-right: 1px solid rgba(7,17,27,.5);
				dt{
					font-size: 24px;
					color: rgb(255,153,0);
					line-height: 28px;
					text-align: center;
				}
				h2{
					font-size: 12px;
					color: rgb(7,17,27);
					line-height: 12px;
					text-align: center;
					margin-top: 6px;
				}
				dd{
					font-size: 10px;
					color: rgba(7,17,27,.5);
					line-height: 10px;
					text-align: center;
					margin-bottom: 8px;
					span{
						display: inline-block;
						vertical-align: top;
					}
				}
			}
			.ratings_score_star{
				flex: 1;
				dl{
					margin-left: 24px;
					font-size: 12px;
					color:rgb(7,17,27);
					line-height: 18px;
					dt{
						p{
							display: inline-block;
							vertical-align: top;
						}
						span{
							display: inline-block;
							vertical-align: top;
							color: rgb(255,153,0);
							margin-left: 12px;
						}
					}
					dd{
						p{
							display: inline-block;
							vertical-align: top;
						}
						span{
							display: inline-block;
							vertical-align: top;
							color: rgb(255,153,0);
							margin-left: 12px;
						}
						i{
							display: inline-block;
							vertical-align: top;
							color: rgb(147,153,159);
							margin-left: 12px;
						}
					}
				}
			}
		}
		.ratings_bg{
			position: relative;
			height: 16px;
			width: 100%;
			background:rgba(0,0,0,.1);
			@include border_1px(rgb(147,153,159));
		}
		.ratings_detail{
			overflow: hidden;
			padding: 0 18px 48px;
			box-sizing:border-box;
			ul li{
				position: relative;
				display: flex;
				margin-top: 18px;
				@include border_1px(rgb(147,153,159));
				.detail_avatar{
         flex: 0 0 28px;
         width: 28px;
         img{
         	height: 28px;
         	width: 28px;
         	border-radius: 50%;
         }
				}
				.detail_content{
					flex: 1;
					margin-left: 12px;
					.detail_username{
						position: relative;
						font-size: 10px;
						color: rgb(7,17,27);
						line-height: 12px;
						margin-bottom: 4px;
						.time{
							position: absolute;
							top: 0;
							right: 0;
						}
					}
					.detail_star{
						span{
							display: inline-block;
							vertical-align: top;
						}
						.detail_time{
							display: inline-block;
							vertical-align: top;
							font-size: 10px;
							font-weight: 200;
							line-height: 12px;
							color: rgb(147,153,159);
							margin-bottom: 6px;
						}

					}
					.detail_txt{
						font-size: 12px;
						color: rgb(7,17,27);
						line-height: 18px;
						margin-bottom: 8px;
					}
				}	
			}
		}
		.ratings_foot{
	    position: fixed;
	    bottom: 0;
	    left: 0;
	    height: 48px;
	    width: 100%;
	    background:#141d27;
    }
		@media screen and (max-width:320px){
			.ratings_score{
				display: flex;
				padding: 18px 0;
				height: 80px;
				position: relative;
				@include border_1px(rgb(147,153,159));
				.ratings_score_composite{
					flex: 0 0 110px;
					width: 110px;
					border-right: 1px solid rgba(7,17,27,.5);
				}
			}
		}
	}
</style>