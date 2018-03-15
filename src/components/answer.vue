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
			type:'0',
			status:'已结束',
			title: '有哪些道理，大家不说但心里都明白？',
			seenum:1616,
			cnum:1616
		},{
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
	
</style>