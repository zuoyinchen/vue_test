<template>
	<div class="box">
		<div class="typelist">
			<ul class="type_bar">
				<router-link class="active" tag="li" to="/usercollect/answer">
					问题
				</router-link>
				<router-link tag="li" to="/usercollect/usercomp">
					评论
				</router-link>
			</ul>
		</div>
		<router-view/>
		
		
	</div>
</template>
<script type="text/javascript">
	
	export default{
		name: 'usercollect'
		
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
	.box{
		width:100%;
		height:100%;
		position: relative;
		.typelist{
			width:100%;
			height:auto;
			overflow: hidden;
			position: absolute;
			left:0;
			padding-top:15rem/$unit;
			box-sizing:border-box;
			z-index:5;
			background: #e8e8e8;
			text-align: center;

			.type_bar{
				width:180rem/$unit;
			    height:auto;
			    display: inline-block;

				li{
					width:80rem/$unit;
					height:40rem/$unit;
					line-height: 40rem/$unit;
					border: 2px solid #333333;
					background:#fff;
					border-radius: 20.5px 0 0 20.5px;
					float: left;
				}
				li:nth-of-type(2){
					border-left:none;
					border-radius: 0 20.5px 20.5px 0;
				}
				li.router-link-exact-active{
					background: #FDD545;
				}
			}
			
			
		}
		
	}
</style>