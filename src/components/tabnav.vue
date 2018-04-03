<template>
	<div class="nav-wrap" v-if="barshow">
		<ul class="tabnav">
			<router-link tag="li" to="/">
				<i class="iconfont icon-pan_icon defaultColor" v-if="router"></i>
                <i class="iconfont icon-pan_icon " v-else></i>
				<span class="defaultColor" v-if="router">首页</span>
				<span  v-else>首页</span>
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
		      barshow:true,
		      router:this.$router.history.current.path === "/"
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
				color: #BDBDBD;
				letter-spacing: 0.12px;
				padding-top: 3px;
				text-align: center;
			}
			i{
				width:100%;
				color:#BDBDBD;
				font-size:24px;
				text-align: center;
			}
			.defaultColor{
				color: #FDD545;
			}
		}
		li.router-link-exact-active{
			color:red;
		}
		li.router-link-exact-active i{
			// color:#FFB74D;
			color:#FDD545;
		}
		li.router-link-exact-active span{
			color:#FDD545;
		}
	}
</style>