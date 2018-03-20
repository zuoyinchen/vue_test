<template>
	<div class="nav-wrap" v-if="barshow">
		<ul class="tabnav">
			<router-link tag="li" to="/">
				<i class="iconfont icon-pan_icon"></i>
				<span>首页</span>
			</router-link>
			<router-link tag="li" to="/paihang">
				<i class="iconfont icon-jiangbei"></i>
				<span>排行榜</span>
			</router-link>
			<router-link tag="li" to="/user">
				<i class="iconfont icon-tubiaolunkuo-"></i>
				<span>我的</span>
			</router-link>
		</ul>
	</div>
	
</template>
<script type="text/javascript">
	export default {
		name: 'tabnav',
		 data(){
		    return {
		      barshow:true
		    }
  		}
	}
</script>
<style lang="scss" scoped>
	$unit:37.5;
	.nav-wrap{
		width:100%;
		height:49rem/$unit;
		position: fixed;
		left:0;
		bottom:0;
		background: #FFFFFF;
		box-shadow: 0 2px 6px 0 #DDDDDD;
		z-index: 2;
	}
	.tabnav{
		width:375rem/$unit;
		height:49rem/$unit;
		padding:0;
		display: flex;
		list-style: none;
		margin:5rem/$unit auto;
		li{
			flex:1;
			float: left;
			color:#000;
			span{
				width:100%;
				display: inline-block;
				font-family: STHeitiSC-Medium;
				font-size: 10px;
				color: #333333;
				letter-spacing: 0.12px;
			}
			i{
				width:100%;
				color:#333;
				font-size:24px;
			}
		}
		li.router-link-exact-active{
			color:red;
		}
		li.router-link-exact-active i{
			color:#FFB74D;
		}

	}
</style>