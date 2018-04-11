<template>
	<div class="userbody">
		<div class="userpic clearfix">
			<img :src="avtalUrl" class="avtalimg" v-if="avtalUrl">
			<img src="../assets/images/logo.png" class="avtalimg" v-else>
			<p class="nickname">{{nickname}}</p>
		</div>
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
			<router-link tag="li" to="/contactUs">
				<i class="iconlist-left iconcall iconfont icon-kefu-xuanzhong"></i>
				<span>联系我们</span>
				<i class="iconlist-right iconfont icon-youjiantou"></i>
			</router-link>
		</ul>
			
		<tabnav></tabnav> 
	</div>
</template>
<script type="text/javascript">
	
	export default{
		name:'user',
		data:function(){
			return {
				avtalUrl:'',
				nickname:''
			}
		},
		mounted:function(){
                this.avtalUrl = localStorage.getItem("headimg");
                this.nickname = localStorage.getItem("nickname")? localStorage.getItem("nickname") : '11';
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
	.avtalimg{
        width: 76rem/$unit;
        height: 76rem/$unit;
        background: #FDD545;
        border-radius: 50%;
        margin:46rem/$unit auto 0;
    }
    .nickname{
    	width:100%;
    	text-align: center;
    	margin-top:20rem/$unit;
    	font-size:18px;
		color:#333333;
    }
	.userbody{
		width:100%;
		height:100%;
		overflow-y:scroll; 
	}
	.userpic{
		width:100%;
		height:190rem/$unit;
		background:url(../assets/images/userbac.png) no-repeat;
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