<template>
	<ul class="box-list">
		<li v-for="item in prolist">
			<p class="title">{{item.title}}</p>
			<p class="t_componet">{{item.t_componet}}</p>
			<p class="title-infor">
				<span>
					<span class="seenum">{{item.seenum}}</span>
					人回答
				</span>
				<span>
					<span class="componet-num">{{item.cnum}}</span>
					人收藏
				</span>
			</p>

		</li>
	</ul>
</template>
<script type="text/javascript">
	const prolist =[
		{
			title: '你妈打你前，都说什么开场白？',
			t_componet:'开场白？耳光太响没听清。',
			seenum:16,
			cnum:16
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。没有爽快地答应，就是拒绝的意思。',
			seenum:160,
			cnum:120
		}
	]
	export default{
		name: 'usecomp',
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
		    min-height:105rem/$unit;
		    background: #FFFFFF;
			box-shadow: 0 2px 6px 0 #DDDDDD;
			border-radius: 10px;
			float: left;
			position:relative;
			margin-bottom:15rem/$unit;
			padding:15rem/$unit 19rem/$unit 15rem/$unit 15rem/$unit;
			box-sizing:border-box;
			.title{
				width:100%;
				height:auto;
				font-family: STHeitiSC-Medium;
				font-size: 18px;
				color: #333333;
				letter-spacing: 0.22px;
				margin:0 auto 10rem/$unit;
				text-align:left;
			}
			.t_componet{
				width:100%;
				margin:0 auto 10rem/$unit;
				height:auto;
				text-align:left;

			}
			.title-infor{
				width:100%;
				margin:0 auto;
			}
			.title-infor>span{
				width:auto;
				margin-right: 15rem/$unit;
				float:left;
				font-family: STHeitiSC-Medium;
				font-size: 12px;
				color: #BDBDBD;
				letter-spacing: 0.14px;
				
			}
			
		}

	}
</style>