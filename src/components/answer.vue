<template>
    <div class="container">
        <ul>
            <li class="list-item " v-for="(item,index) in prolist " data-type="0">
                <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                    <span class="status-bac" v-if="item.type==='0'"></span>
                    <span class="status-bac status-bac-yellow" v-else-if="item.type==='1'"></span>
                    <span class="status-bac status-bac-white" v-else></span>
                    <span class="status">{{item.status}}</span>
                    <div class="title">{{item.title}}</div>
                    <div class="title-infor">
                        <span>
                            <i class="iconfont icon-wode"></i>
                            <span class="seenum">{{item.seenum}}</span>
                        </span>
                        <span>
                            <i class="iconfont icon-pinglun"></i>
                            <span class="componet-num">{{item.cnum}}</span>
                        </span>
                    </div>
                </div>
                <div class="delete iconfont icon-shanchu" @click="deleteItem" :data-index="index">
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
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
        name: 'test',
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

<style lang="scss" scoped>
    $unit:37.5;
    .container{
        width:100%;
        height:auto;
        overflow: hidden;
        margin:0 auto;
        list-style: none;
        padding-top:15rem/$unit;
    }

    .list-item{
        width:345rem/$unit;
        height:105rem/$unit;
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
        // padding: 0.2rem;
        background: #fff;
        // display: flex;
        // align-items: left;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        // justify-content: flex-end;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 0;
        width:100%;
        height:105rem/$unit;
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;

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
                font-size:12px;

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
        right: -120em/$unit;
        margin-top: -16rem/$unit;
    }
</style>