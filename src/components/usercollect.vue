<template>
	<div class="box">
		<ul class="typelist">
			<router-link class="active" tag="li" to="/usercollect/answer">
				问题
			</router-link>
			<router-link tag="li" to="/usercollect/usercomp">
				评论
			</router-link>
		</ul>
		<router-view/>
		
		
	</div>
</template>
<script type="text/javascript">
	
	export default{
		name: 'usercollect'
		
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
	.box{
		width:100%;
		height:100%;
		.typelist{
			width:180rem/$unit;
			height:auto;
			margin:0 auto;
			list-style: none;
			padding:15rem/$unit 0 15rem/$unit;
			
			li{
				width:80rem/$unit;
				height:40rem/$unit;
				line-height: 40rem/$unit;
				border: 2px solid #333333;
				background:#fff;
				border-radius: 20.5px 0 0 20.5px;
				float:left;
			}
			li:nth-of-type(2){
				border-left:none;
				border-radius: 0 20.5px 20.5px 0;
			}
			li.router-link-exact-active{
				background: #FDD545;
			}
		}
		.box-list{
			width:345rem/$unit;
			height:auto;
			overflow: hidden;
			margin:0 auto;
			list-style: none;
			padding-top:15rem/$unit;

			li{
				width:100%;
			    height:105rem/$unit;
			    background: #FFFFFF;
				box-shadow: 0 2px 6px 0 #DDDDDD;
				border-radius: 10px;
				float: left;
				position:relative;
				margin-bottom:15rem/$unit;
				.status-bac{
					display:inline-block;
					width:0;
					height:0;
				    border-width: 25rem/$unit;
				    border-color: #666 transparent transparent #666;
				    border-style: solid;
				    border-top-left-radius: 10px;
					position: absolute;
					left:0;
					top:0;
				}
				.status-bac.status-bac-yellow{
					border-color:#FDD545 transparent transparent #FDD545;
				}
				.status-bac.status-bac-white{
					border-color:#fff transparent transparent #fff;
				}

				.status{
					display: inline-block;
					line-height: 33.9rem/$unit;
					text-align: center;
					transform: rotate(-45deg);
					font-family: STHeitiSC-Medium;
					font-size: 12px;
					color: #FFFFFF;
					letter-spacing: -0.29px;
					position: absolute;
					left:0;
					top:0;
				}
				.title{
					width:256rem/$unit;
					height:44rem/$unit;
					font-family: STHeitiSC-Medium;
					line-height: 19rem/$unit;
					font-size: 18px;
					color: #333333;
					letter-spacing: 0.22px;
					margin:15rem/$unit auto 19rem/$unit;
					text-align:left;
				}
				.title-infor{
					width:100%;
					padding-left:15rem/$unit;
					height:auto;

				}
				.title-infor>span{
					width:auto;
					margin-right: 15rem/$unit;
					float:left;
				}
				
			}

		}
	}
</style>