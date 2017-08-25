<template>
	<div class="star" v-bind:class="typeSize">
	   <ul>
	   	<li class="star_item" v-for="item in classItem" v-bind:class="item"></li>
	   </ul>
	</div>
</template>

<script>
  const LENGTH= 5;
  export default{
		props:{
			score:{   
				return: Number
			},
			size:{
				return: Number
			}
		},
		computed:{
			typeSize() {
	      return 'type' + this.size
	    },
			classItem(){
				var arr=[];
    		var score=Math.floor(this.score*2)/2;
    		var integer=Math.floor(score);//整数部分
    		var hasDecimal=score%1!==0;//判断是否有小数
    		for (var i = 0; i <integer ; i++) {
    			arr.push('on');
    		};
    		if (hasDecimal) {
    			arr.push('half');
    		};
    		while(arr.length<LENGTH){
    			arr.push('off');
    		};
    		return arr;
			}
		}
  }
</script>

<style lang="scss" scoped>
@import '../common/common.scss';
.star{
	font-size: 10px;
	color: #fff;
	height: 24px;
	ul {
		font-size: 0;
		li{
			display: inline-block;
			width: 24px;
			height: 24px;
			font-size: 10px;
			background-size: cover;
		}
	}
	&.type24{
		li{
			&.on{
				@include bgImage(star24_on);
			}
			&.half{
				@include bgImage(star24_half);
			}
			&.off{
				@include bgImage(star24_off);
			}
		}
	}
	&.type36{
		li{
			height: 36px;
			width: 36px;
			margin-right: 10px;
			&.on{
				@include bgImage(star24_on);
			}
			&.half{
				@include bgImage(star24_half);
			}
			&.off{
				@include bgImage(star24_off);
			}
		}
	}
	&.type48{
		li{
			height: 48px;
			width: 48px;
			margin-right: 10px;
			&.on{
				@include bgImage(star24_on);
			}
			&.half{
				@include bgImage(star24_half);
			}
			&.off{
				@include bgImage(star24_off);
			}
		}
	}
	&.type12{
		li{
			height: 14px;
			width: 14px;
			margin-right: 3px;
			&.on{
				@include bgImage(star24_on);
			}
			&.half{
				@include bgImage(star24_half);
			}
			&.off{
				@include bgImage(star24_off);
			}
		}
	}
}
</style>