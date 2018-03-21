<template>
	<div class="box">
		<ul class="message_list">
			<router-link tag="li" to="">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521609148474&di=fce29f5313fd7e6b9ecc7c92d1ac3db8&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F15%2F76%2F46%2F74U58PICIGA_1024.jpg" class="user_img">
				<p class="con_detail">
					<span>江小鱼</span>
					<span>开场白？耳光太响没听清。</span>
					<span>2108-1-29 13:13</span>
				</p>
				<p class="title">你妈打你前，都说什么开场白？</p>
			</router-link>
			
			<router-link tag="li" to="">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521609148474&di=fce29f5313fd7e6b9ecc7c92d1ac3db8&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F15%2F76%2F46%2F74U58PICIGA_1024.jpg" class="user_img">
				<p class="con_detail">
					<span>江小鱼</span>
					<span>开场白？耳光太响没听清。</span>
					<span>2108-1-29 13:13</span>
				</p>
				<p class="title">你妈打你前，都说什么开场白？</p>
			</router-link>
			<router-link tag="li" to="">
				<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521609148474&di=fce29f5313fd7e6b9ecc7c92d1ac3db8&imgtype=0&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F15%2F76%2F46%2F74U58PICIGA_1024.jpg" class="user_img">
				<p class="con_detail">
					<span>江小鱼</span>
					<span>开场白？耳光太响没听清。开场白？耳光太响没听清。开场白？耳光太响没听清。开场白？耳光太响没听清。开场白？耳光太响没听清。</span>
					<span>2108-1-29 13:13</span>
				</p>
				<p class="title">你妈打你前，都说什么开场白？</p>
			</router-link>


		</ul>
	</div>
</template>
<script type="text/javascript">
	export default{
		name :'message',
		data(){
			return {

			}
		}
	}
</script>
<style lang="scss" scoped>
	$unit:37.5;
	.box{
		width:100%;
		height:100%;
		padding:21rem/$unit 15rem/$unit 0;
		box-sizing:border-box;
		.message_list{
			width:100%;
			height:100%;

			li{
				width:100%;
				height:86rem/$unit;
				background: #FFFFFF;
				box-shadow: 0 2px 6px 0 #DDDDDD;
				margin-bottom: 15rem/$unit;
				border-radius: 10px;
				display: flex;
				.user_img{
					width:32rem/$unit;
					height:32rem/$unit;
					border-radius: 32rem/$unit;
					float:left;
					margin-top:17rem/$unit;
					margin-left: 18rem/$unit;
					margin-bottom:15rem/$unit;

				}
				.title{
					width:49rem/$unit;
					height:46rem/$unit;
					font-family: STHeitiSC-Medium;
					font-size: 12px;
					line-height: 16rem/$unit;
					color: #666666;
					letter-spacing: 0.14px;
					float: right;
					margin-top: 19rem/$unit;
					margin-right: 15rem/$unit;
					overflow:hidden;
	                text-overflow:ellipsis;
	                display:-webkit-box;
	                -webkit-line-clamp:3;
	                -webkit-box-orient:vertical;
				}
				.con_detail{
					flex:1;
					padding-top:17rem/$unit;
					padding-left: 15rem/$unit;
					padding-right: 15rem/$unit;
					overflow: hidden;

					span{
						display: block;
						text-align: left;
						margin-bottom: 8rem/$unit;
						overflow:hidden;
                		text-overflow:ellipsis;
                		white-space: nowrap;
					}
				}
			}
		}
	}
</style>
