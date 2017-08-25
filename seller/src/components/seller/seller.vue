<template>
  <div class="seller" ref="seller">
    <div>
      <!-- seller_title -->
    	<div class="seller_title border1px">
    		<div class="title_name">{{seller.name}}</div>
    		<div class="title_star border1px">
          <div class="star">
    				<star :score="seller.score" v-bind:size="24"></star>
          </div>
  				<span>({{parseInt(seller.sellCount*seller.rankRate/100)}})</span>
  				<p>月销售{{seller.sellCount}}单</p>
    		</div>
    		<div class="title_clac">
    			<ul>
    				<li>
    					<span>起送价</span>
    					<p>{{seller.minPrice}}<span>元</span></p>
    				</li>
    				<li>
    					<span>商家配送</span>
    					<p>{{seller.deliveryPrice}}<span>元</span></p>
    				</li>
    				<li>
    					<span>平均配送时间</span>
    					<p>{{seller.deliveryTime}}<span>元</span></p>
    				</li>
    			</ul>
    		</div>
        <div class="title_like">
          <i class="iconfont icon-favorite"></i>
        </div>
    	</div>
      <!-- seller_bg -->
      <div class="seller_bg border1px"></div>
      <!-- seller_forPeoPle -->
    	<div class="seller_forPeoPle">
    		<div class="seller_bulletin">
          <p>公告与活动</p>
    		  {{seller.bulletin}}
    		</div>
  			<div class="seller_supports border1px">
  		    <supports v-if="seller.supports" v-bind:supports="seller.supports" v-bind:className="className"></supports>
  			</div>
    	</div>
      <!-- seller_bg -->
      <div class="seller_bg border1px"></div>
      <!-- seller_pic -->
    	<div class="seller_pic">
        <p>商家实景</p>
        <div class="pic_scroll" ref="picScroll">
      		<ul ref="picList">
      			<li v-for="item in seller.pics" >
      				<img :src="item" alt="">
      			</li>
      		</ul>
        </div>
    	</div>
      <!-- seller_bg -->
      <div class="seller_bg border1px"></div>
      <!-- seller_message -->
    	<div class="seller_message">
        <p>商家信息</p>
        <ul>
          <li v-for="item in seller.infos" class="border1px">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from "../star/star.vue"
  import Betterscroll from "better-scroll"
  import supports from "../supports/supports.vue"
  import shopping from '../shopping/shopping.vue'

	export default {
		props:{
			seller:{
				return: Object
			}
		},
		components:{
			star,
			supports,
      shopping 

		},
    data(){
      return{
        className:'bottomBorder'
      }
    },
    created(){
      this.$nextTick(()=>{
        if (!this.scroll) {
            this.scroll = new Betterscroll(this.$refs.seller,{
              click:true
            })
          }else{
            this.scroll.refresh();
          }
      })
      this.$nextTick(()=>{
        if (!this.scrollX) {
            this.scrollX = new Betterscroll(this.$refs.picScroll,{
              scrollX: 'true'
            })
          }else{
            this.scroll.refresh();
          }
      })
    },
    mounted(){
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width =(picWidth + margin) * this.seller.pics.length-margin;
        this.$refs.picList.style.width = width + "px"
      }
    }
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../common/common.scss';
@import '../common/mixin.scss';
	.seller{
    position: fixed;
    top: 184px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    .seller_title{
      padding: 18px 18px 0 18px;
      box-sizing:border-box;
      position: relative;
      @include border_1px(rgba(7,17,27,.1));
      .title_name{
        font-size: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
        margin-bottom: 8px;
      }
      .title_star{
        padding-bottom: 18px;
        position: relative;
        @include border_1px(rgba(7,17,27,.1));
        .star{
          display: inline-block;
          color: red;
        }
        span{
          display: inline-block;
          margin-left: 8px;
          margin-right: 12px;
        }
        p{
          display: inline-block;
          font-size: 10px;
          color:rgb(77,85,33);
          line-height: 18px;
        }
      }
  		.title_clac{
        padding: 18px 0;
  			ul{
  				display: flex;
  				li{
  					flex: 1;
            span{
              display: block;
              font-size: 10px;
              line-height: 10px;
              text-align: center;
              color:rgb(147,153,159);
            }
            p{
              margin-top: 4px;
              font-size: 24px;
              font-weight: 200;
              line-height: 24px;
              color: rgb(7,17,27);
              text-align: center; 
              span{
                display: inline-block;
                font-size: 10px;
                color: rgb(7,17,27);
              }
            }
  				}
  			}
  		}
    }
    .seller_bg{
      position: relative;
      height: 16px;
      background-color: #f3f5f7;
      @include border_1px(rgba(7,17,27,.1));
    }
    .seller_forPeoPle{
      padding: 18px 18px 0 18px;
      .seller_bulletin{
        font-size: 12px;
        font-weight: 200;
        color: rgb(240,20,20);
        line-height: 24px;
        p{
          font-size: 14px;
          line-height: 14px;
          color: rgb(7,17,27);
        }
      }
      .seller_supports{
      }
    }
    .seller_pic{
      padding: 0 18px;
      box-sizing: border-box;
      p{
        margin: 18px 0 12px 0;
        font-weight: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
      }
      .pic_scroll{
        ul {
          width: 100%;
          height: 90px;
          white-space: nowrap;
          li{
            display: inline-block;
            height: 90px;
            width: 120px;
            margin-right: 6px;
            img{
              height: 100%;
              width: 100%;
            }
          }
        }
      }
    }
    .seller_message{
      padding: 18px 18px 68px;
      p{
        margin-bottom: 12px;
        font-weight: 14px;
        color: rgb(7,17,27);
        line-height: 14px;
      }
      ul li{
        position: relative;
        font-weight: 200;
        font-size: 12px;
        line-height: 16px;
        margin: 16px 16px 0 12px;
        @include border_1px(rgba(7,17,27,.1));
      }
    }
    .seller_foot{
      position: fixed;
      bottom: 0;
      left: 0;
      height: 48px;
      width: 100%;
      background:#141d27;
    }
	}
</style>