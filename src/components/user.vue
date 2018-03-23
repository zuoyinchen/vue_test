<template>
	<div class="userbody">
		<div class="userpic clearfix"></div>
		<ul class="user-visit">
			<router-link tag="li" to="/userproject">
				<i class="iconlist-left iconfont icon-cnlonghubang"></i>
				<span>我参与的场</span>
				<i class="iconlist-right iconfont icon-youjiantou"></i>
			</router-link>
			<router-link tag="li" to="/usercollect/answer">
				<i class="iconlist-left iconstar iconfont icon-shoucang"></i>
				<span>我的收藏</span>
				<i class="iconlist-right iconfont icon-youjiantou"></i>
			</router-link>
			<router-link tag="li" to="">
				<i class="iconlist-left iconcall iconfont icon-kefu-xuanzhong"></i>
				<span>联系我们</span>
				<i class="iconlist-right iconfont icon-youjiantou"></i>
			</router-link>

		</ul>
		<tabnav></tabnav> 
	</div>
</template>
<script type="text/javascript">
const $url = 'http://192.168.1.116:1337';
const openid= 'oR7BM5bSwd0SssGhYVs162zKxefQ';
const nickname= '夏晨阳';
const headimgurl= 'http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0';
localStorage.setItem('headimg',headimgurl);
	export default{
		name:'user',
		mounted:function(){
			const user_data = {
				"openid":openid,
				"nickName":nickname,
				"avtarUrl":headimgurl
			};
			this.$axios.get($url+'/wxuserinfo',{params:user_data}).then(function(res){
				localStorage.setItem("userid",res.data);
			}).catch(function(error){
				console.log(error);
			})
		}
	}
</script>
<style scoped lang='scss'>
	html,body,div,ul,li,p{
		margin:0;
		padding:0;
	}
	html,body{
		height:100%;
	}
	$unit:37.5;
	.userbody{
		width:100%;
		height:100%;
		overflow: hidden;
		padding-bottom:49rem/$unit;
		box-sizing:border-box;
	}
	.userpic{
		width:100%;
		height:190rem/$unit;
		background:url(../assets/img/userpic.png) no-repeat;
		background-size:cover;
		margin:0 auto;
	}
	.user-visit{
		width:100%;
		height:auto;
		list-style: none;
		margin:0 auto;
	}
	.user-visit li{
		width:100%;
		height:55rem/$unit;
		line-height:55rem/$unit;
		background: #FFFFFF;
		
	}
	.user-visit li:nth-of-type(1){
		margin-bottom:19rem/$unit;
		box-shadow: 1px 1px 4px 0 rgba(153,153,153,0.10);
	}
	.user-visit li:nth-of-type(3){
		box-shadow: 1px 1px 4px 0 rgba(153,153,153,0.10);
	}
	.iconlist-left{
		font-size:22.9px;
		color: #FFB74D;
		margin-left:16rem/$unit;
		float: left;
	}
	.iconlist-right{
		font-size:15px;
		float:right;
		margin-right:12rem/$unit;
	}
	.iconstar{
		color:#F48FB1;
	}
	.iconcall{
		color:#9FA8DA;
	}

	.user-visit li span{
		float: left;
		margin-left: 16rem/$unit;
		font-family: PingFangSC-Regular;
		font-size: 15px;
		color: #333333;
		letter-spacing: 0.18px;
	}
	

	
</style>