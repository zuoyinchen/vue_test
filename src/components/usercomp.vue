<template>
	<div class="container">
		<ul>
			<li class="list-item"v-for="(item,index) in prolist" data-type="0">
				<div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
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
					
				</div>
				<div class="delete iconfont icon-shanchu" @click="deleteItem" :data-index="index">
	            </div>

			</li>
		</ul>
	</div>
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
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		},{
			title: '有哪些道理，大家不说但心里都明白？',
			t_componet:'在成人的社交礼仪里，没有语气坚定地提出，就是客套的意思。',
			seenum:160,
			cnum:120
		}
	]
	export default{
		name: 'usecomp',
		data () {
            return {
                prolist : prolist,
                startX : 0 ,
                endX : 0 ,
            }
        },
        methods : {
            //跳转
            skip(){
                if( this.checkSlide() ){
                    this.restSlide();
                }else{
                    alert('You click the slide!')
                }
            },
            //滑动开始
            touchStart(e){
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEnd(e){

                let parentElement = e.currentTarget.parentElement;
                this.endX = e.changedTouches[0].clientX;

                if( parentElement.dataset.type == 0 && this.startX - this.endX > 16  ){
                    this.restSlide();
                    parentElement.dataset.type = 1;
                }

                if( parentElement.dataset.type == 1 && this.startX - this.endX < -16 ){
                    this.restSlide();
                    parentElement.dataset.type = 0;
                }

                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
                let listItems = document.querySelectorAll('.list-item');

                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //一次只能滑动一个
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');

                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            //删除
            deleteItem(e){
                let index = e.currentTarget.dataset.index;
                this.restSlide();
                console.log(this.list);
                this.prolist.splice(index,1);
            }
        }
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
	.container{
        width:100%;
        height:100%;
        margin:0 auto;
        list-style: none;
        padding-top:70rem/$unit;
        box-sizing:border-box;
	    ul{
	        height:100%;
	        padding:0 15rem/$unit;
	        box-sizing:border-box;
	        overflow-x:hidden;
	        overflow-y: scroll;
	    }
		.list-item{
	        width:100%;
	        height:125rem/$unit;
	        margin:0 auto;
	        position: relative;
	        -webkit-transition: all 0.2s;
	        transition: all 0.2s;
	        margin-bottom:15rem/$unit;
	    }
	    .list-item[data-type="0"]{
	        transform: translate3d(0,0,0);
	    }
	    .list-item[data-type="1"]{
	        transform: translate3d(-2rem,0,0);
	    }

		.list-box{
	        -webkit-box-sizing: border-box;
	        box-sizing: border-box;
	        position: absolute;
	        top: 0;
	        right: 0;
	        bottom: 0;
	        left: 0;
	        font-size: 0;
	        width:100%;
	        height:100%;
	        background: #FFFFFF;
	        box-shadow: 0 2px 6px 0 #DDDDDD;
	        border-radius: 10px;
	        overflow: hidden;

			.title{
				width:100%;
				height:auto;
				font-family: STHeitiSC-Medium;
				font-size: 18px;
				color: #333333;
				letter-spacing: 0.22px;
				padding:15rem/$unit 18rem/$unit 10rem/$unit 15rem/$unit;
				box-sizing:border-box;
				text-align:left;
				float: left;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.t_componet{
				width:100%;
				max-height:36rem/$unit;
				box-sizing:border-box;
				padding:0 18rem/$unit 0 15rem/$unit;
				text-align:left;
				font-family: STHeitiSC-Medium;
				font-size: 14px;
				line-height: 17rem/$unit;
				color: #666666;
				letter-spacing: 0.17px;
				overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

			}
			.title-infor{
				width:auto;
				margin:0 auto;
				height:auto;
				overflow: hidden;
				position: absolute;
				left:15rem/$unit;
				bottom:15rem/$unit;
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
		.list-item .delete{
	        width: 32rem/$unit;
	        height: 32rem/$unit;
	        border-radius: 16rem/$unit;
	        background: #FF5722;
	        font-size: 17px;
	        color: #fff;
	        text-align: center;
	        line-height: 32rem/$unit;
	        position: absolute;
	        top:50%;
	        left: 106%;
	        margin-top: -16rem/$unit;
	    }

	}
</style>