<template>
	<div class="box">
		<ul class="box-list">
			<router-link tag="li" v-for="(item,index) in prolist" to="" :key="index">
				<span class="status-bac status-bac-yellow" v-if="item.status == 1"></span>
				<span class="status-bac" v-else-if="item.status==2"></span>
				<span class="status"v-if="item.status == 1">进行中</span>
				<span class="status"v-else-if="item.status == 2">已结束</span>
				<span class="status"v-else></span>
				<router-link tag="p" class="title" :to="{name:'answerDetail',params:{title:''+item.title+'',readNum:''+item.readNum+'',toAnswer:''+item.messageNum+''}}">
                        {{item.title}}
                    </router-link>
				<ul class="clearfix">
                  <li v-show="item.status==2">
                  	<i class="iconfont icon-paihangbang"></i>
                  	<span>排行榜</span>
                  </li>
                  <li>
                  	<i class="iconfont icon-xianshimima"></i>
                  	<span>{{item.readNum}}</span>
                  </li>
                  <li>
                  	<i class="iconfont icon-pinglun"></i>
                  	<span>{{item.messageNum}}</span>
                  </li>
                  <li class="time" v-if="item.status==1">
                  	<i></i>
                  	<span>倒计时</span>
                  	<span>12:59</span>
                  </li>
              </ul>
			</router-link>
		</ul>
	</div>	
</template>
<script type="text/javascript">
	const prolist =[
		{
			status:1,
			title: '有哪些道理，大家不说但心里都明白？',
			readNum:1616,
			messageNum:1616,
			createdAt:''
		},{
			status:2,
			title: '有哪些道理，大家不说你都明白？',
			readNum:1616,
			messageNum:1616,
			createdAt:''
		}
	];
	const $url = 'http://192.168.1.120:1337';
	export default{
		name: 'userproject',
		data(){
			return {
				prolist:prolist
			}
		},
		beforeCreate:function(){
			//获取我参与的场
			const $userid = localStorage.getItem("userid");//userid
			const data ={ limit: 5 * 1, sort: { createdAt: 0 },search: { createdBy:$userid } }
			console.log(data);
			this.$axios.get($url+'/answers',{params:data}).then((res)=>{
				this.prolist = res.data;
			}).catch(function(error){
				console.log(error);
			})
		}
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
	.box{
		width:100%;
		height:100%;
		.box-list{
			width:345rem/$unit;
			height:auto;
			margin:0 auto;
			list-style: none;
			padding-top:15rem/$unit;

		}
		.box-list>li{
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
				margin:15rem/$unit auto 10rem/$unit;
				text-align:left;
			}
			.title-infor{
				width:100%;
				height:35rem/$unit;
				line-height: 35rem/$unit;
				display: block;
				display:flex;
				background: #FAFAFA;
				font-family: STHeitiSC-Medium;
				font-size: 12px;
				color: #BDBDBD;
				letter-spacing: -0.26px;

			}
			.title-infor>span{
				width:auto;
				flex:1;
			}
			
		}
	}
	.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    }
	.box-list ul{
        width: 345rem/$unit;
        height: 35rem/$unit;
        padding: 0;
        border-radius: 10rem/$unit;
    }
    .box-list ul>li{
    	width: 115rem/$unit;
    	height: 35rem/$unit;
    	float: left;
    	line-height: 35rem/$unit;
    	margin: 0 0;
    	background-color: #fafafa;
    	position: relative;
    }
    .box-list ul .time{
    	background:#fdd545;
    	border-bottom-right-radius: 10px;
    }
    .box-list ul>li>span{
        margin-left: 10rem/$unit;
    }

</style>