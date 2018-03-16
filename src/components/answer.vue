<template>
	<ul class="box-list">
		<li v-for="item in prolist">
			<span class="status-bac" v-if="item.type==='0'"></span>
			<span class="status-bac status-bac-yellow" v-else-if="item.type==='1'"></span>
			<span class="status-bac status-bac-white" v-else></span>
			<span class="status">{{item.status}}</span>
			<p class="title">{{item.title}}</p>
			<p class="title-infor">
				<span>
					<i class="iconfont icon-wode"></i>
					<span class="seenum">{{item.seenum}}</span>
				</span>
				<span>
					<i class="iconfont icon-pinglun"></i>
					<span class="componet-num">{{item.cnum}}</span>
				</span>
			</p>

		</li>
	</ul>
</template>
<script type="text/javascript">
	const prolist =[
		{
			type:'1',
			status:'进行中',
			title: '有哪些道理，大家不说你都明白？',
			seenum:160,
			cnum:120
		},{
			type: '2',
			status:'未开始',
			title: '有哪些道理，大家不说但心里都明白？',
			seenum:161,
			cnum:161
		}
	]
	export default{
		name: 'answer',
		data(){
			return {
				prolist:prolist
			}
		}
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
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
</style>