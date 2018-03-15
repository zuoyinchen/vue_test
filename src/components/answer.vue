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
	export default{
		name: 'answer'
	}
</script>
<style scoped lang="scss">
	
</style>