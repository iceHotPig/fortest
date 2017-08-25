<template>
	<div class="supports" :class="[className]">
		<ul>
			<li v-for="(item,index) in supports" class="border1px">
			  <span class="icon" v-bind:class="classMap[supports[index].type]"></span>
				<p>{{item.description}}</p> 
			</li>
		</ul>
	</div>
</template>		
 
<script>
	export default {
		props:{
			supports:{   
				return: Array
			},
			className:{
				return: String
			}
		},
		created(){
			this.classMap=['decrease','discount','guarantee','invoice','special']
		}
	}
</script>

<style lang="scss" scoped >
@import '../common/common.scss';
@import '../common/mixin.scss';
.supports{
	ul li{
		font-size: 10px;
		color: rgb(255,255,255);
		p{
			font-weight: 200;
			vertical-align: top;
			display: inline-block;
		}
		.icon{
			width: 12px;
			height: 12px;
			display: inline-block;
			background-size: cover;
			&.decrease{
				@include bgImage(decrease_2);
			}
			&.discount{
				@include bgImage(discount_2);
			}
			&.guarantee{
				@include bgImage(guarantee_2);
			}
			&.invoice{
				@include bgImage(invoice_2);
			}
			&.special{
				@include bgImage(special_2);
			}
		}
	}
	&.big{
		ul li{
			font-size: 10px;
			margin-top: 12px;
			color: rgb(255,255,255);
			p{
				font-weight: 200;
				vertical-align: top;
				display: inline-block;
			}
			.icon{
				width: 16px;
				height: 16px;
				display: inline-block;
				background-size: cover;
				&.decrease{
					@include bgImage(decrease_2);
				}
				&.discount{
					@include bgImage(discount_2);
				}
				&.guarantee{
					@include bgImage(guarantee_2);
				}
				&.invoice{
					@include bgImage(invoice_2);
				}
				&.special{
					@include bgImage(special_2);
				}
			}
		}
	}
	&.bottomBorder{
		ul li{
			font-size: 12px;
		  padding:16px 0 16px 12px ;
		  box-sizing: border-box;
			color: black;
			position: relative;
      @include border_1px(rgba(7,17,27,.1));

			p{
				font-weight: 200;
				vertical-align: top;
				display: inline-block;
			}
			.icon{
				width: 16px;
				height: 16px;
				margin-left: 6px;
				display: inline-block;
				background-size: cover;
				&.decrease{
					@include bgImage(decrease_2);
				}
				&.discount{
					@include bgImage(discount_2);
				}
				&.guarantee{
					@include bgImage(guarantee_2);
				}
				&.invoice{
					@include bgImage(invoice_2);
				}
				&.special{
					@include bgImage(special_2);
				}
			}
		}
	}
}
</style>