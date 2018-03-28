<template>
    <div class="container">
        <scroller :on-refresh="refresh"
  :on-infinite="infinite" ref="myscroller" v-if="prolist.length>0" class="myscroller">
          <ul>
            <li class="list-item" v-for="(item,index) in prolist " data-type="0">
                <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="skip">
                    <span class="status-bac status-bac-yellow" v-if="item.status== 1"></span>
                    <span class="status-bac" v-else></span>
                    <span class="status status_yell" v-if="item.status== 1">进行中</span>
                    <span class="status" v-else>已结束</span>
                    <p class="title" @click="gotoDetail($event)" :data-title="item.title" :data-rnum="item.readNum" :data-anum="item.messageNum" :data-status="item.status" :data-tid="item.id" :data-time="item.second">{{item.title}}</p>
                    <div class="title-infor">
                        <span>
                            <i class="iconfont icon-xianshimima"></i>
                            <span class="seenum">{{item.readNum}}</span>
                        </span>
                        <span>
                            <i class="iconfont icon-pinglun"></i>
                            <span class="componet-num">{{item.messageNum}}</span>
                        </span>
                    </div>
                </div>
                <div class="delete iconfont icon-shanchu" @click="deleteItem" :data-index="index" :data-id="item.id" :data-title="item.title" :data-status="item.status">
                </div>
            </li>
          </ul>
        </scroller>
        <div v-else class="no_data">
            <img src="../assets/images/shoucang.png">
            <p>您的收藏还是空的</p>
            <router-link tag="a" class="goHome" to="../">去逛逛</router-link>
        </div>

     </div>
</template>
<script>
    const $userid = localStorage.getItem("userid");//userid
    export default{
        name: 'test',
        data () {
            return {
                prolist : [],
                startX : 0 ,
                endX : 0 ,
                page:1,
                size:5,
                noData:''
            }
        },
        methods : {
            //跳转
            skip:function(){
                if( this.checkSlide() ){
                    this.restSlide();
                }
            },
            //滑动开始
            touchStart:function(e){
                this.startX = e.touches[0].clientX;
            },
            //滑动结束
            touchEndL:function(e){

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
            checkSlide:function(){
                let listItems = document.querySelectorAll('.list-item');

                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //一次只能滑动一个
            restSlide:function(){
                let listItems = document.querySelectorAll('.list-item');

                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].dataset.type = 0;
                }
            },
            //删除
            deleteItem:function(e){
                let index = e.currentTarget.dataset.index;//删除的当前索引值
                let $body = e.currentTarget.dataset.body;//所删除问题的body
                let $id = e.currentTarget.dataset.id;//所删除问题的id
                let $title = e.currentTarget.dataset.title;//所删除问题的title
                let $status = e.currentTarget.dataset.status;//所删除问题的status
                const stars = this.prolist[index].stars;//拿到当前点击的收藏的stars
                console.log(stars);
                //拿到所有收藏的用户id
                const starid = [];
                for(let i = 0;i<stars.length;i++){
                    starid.push(stars[i].id);
                }
                //拿到我自己id的索引值
                const myindex = starid.indexOf($userid);
                //根据索引值删除我的
                stars.splice(myindex,1);
                const data ={
                    stars:stars,
                    title:$title,
                    status:$status
                };
                console.log(data);
                this.$http.put('/topic/'+$id,data).then(res=>{
                    if(res.status == 200){
                        this.restSlide();
                        this.prolist.splice(index,1);
                    }
                }).catch((error,errorcode)=>{
                    console.log('error');
                });
            },
            getIndexData:function(){
              this.noData='';
              const data = {
                limit : this.page*this.size,
                sort:JSON.stringify({ createdAt:0}),
                userid:$userid
              }
              this.$axios.get('/topics',{params:data}).then(res=>{
                 this.prolist = res.data;
              }).catch((error)=>{
                 console.log('error');
              });
           },
           refresh:function(done) {
              setTimeout(() => {
                this.size = 5;
                this.page = 1;
                this.getIndexData();
                done()
              }, 1500)
            },
            infinite:function(done) {
              if(this.noData) {
                  setTimeout(()=>{
                      done(true);
                  });
                return;
              }
              setTimeout(() => {
                this.page++;
                const data = {
                  limit : this.page*this.size,
                  sort:JSON.stringify({ createdAt:0}),
                  userid:$userid
                }
                this.$axios.get('/topics',{params:data}).then(res=>{
                   this.prolist = res.data;
                  
                }).catch((error)=>{
                    console.log('error');
                });
                const limit = this.page*this.size;
                if(this.prolist.length <= limit){
                  this.noData='没有更多数据';
                }
                 done()
              }, 3000);
            },
            gotoDetail:function(event){
              const topicid = event.currentTarget.dataset.tid;//问题id
              const readnum = event.currentTarget.dataset.rnum;//阅读数
              const answernum = event.currentTarget.dataset.anum;//评论数
              const status = event.currentTarget.dataset.status;//状态
              const time = event.currentTarget.dataset.time;//倒计时时间
              const title = event.currentTarget.dataset.title;//问题标题

              const query = {
                topicid : topicid,
                readnum : readnum,
                answernum : answernum,
                status : status,
                time : time,
                title : title
              }

              localStorage.setItem("query",JSON.stringify(query));
              this.$router.push('/answerDetail');
            }
            
        },
        mounted:function(){
            //获取收藏的问题
            this.getIndexData();
        }
    }
</script>

<style lang="scss" scoped>
    $unit:37.5;
    .container{
        width:100%;
        height:100%;
        margin:0 auto;
        list-style: none;
        padding-top:70rem/$unit;
        box-sizing:border-box;
    }
    .myscroller{
        padding-top: 1.86667rem;
        box-sizing: border-box;
    }
    ul{
        height:100%;
        padding:0 15rem/$unit;
        box-sizing:border-box;
        overflow-x:hidden;
        overflow-y: scroll;
    }
    .list-item{
        width:100%;
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
        background: #fff;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
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
        .status.status_yell{
            color:#333;
        }
        .status-bac.status-bac-yellow{
            border-color:#FDD545 transparent transparent #FDD545;
        }
        .status-bac.status-bac-white{
            border-color:#fff transparent transparent #fff;
        }

            .title{
                width:100%;
                max-height:52rem/$unit;
                font-family: STHeitiSC-Medium;
                line-height: 19rem/$unit;
                font-size: 18px;
                color: #333333;
                letter-spacing: 0.22px;
                padding-left:45rem/$unit;
                padding-right:20rem/$unit;
                padding-top:15rem/$unit;
                text-align:left;
                box-sizing:border-box;
                overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
            }
            .title-infor{
                width:auto;
                height:auto;
                overflow: hidden;
                position: absolute;
                left:15rem/$unit;
                bottom:21rem/$unit;

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
        left: 106%;
        margin-top: -16rem/$unit;
    }
    .no_data{
        width:100%;
        text-align: center;
        line-height: 20rem/$unit;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #4C3A30;
        letter-spacing: 0.26px;
        img{
            width:132rem/$unit;
            height:119rem/$unit;
            display: inline-block;
            margin-top: 48rem/$unit;
            margin-bottom: 20rem/$unit;
        }
    }
    .goHome{
        width:auto;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FF8500;
        letter-spacing: 0;
    }
</style>