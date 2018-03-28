<template>
    <div class="box">
        <scroller class="message_list" :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
            <div class="nav clearfix">
                <span class="counttest">下场开始时间</span>
                <span>
                    <countdown :time="countdown" class="countdown" v-on:countdownend = "countdownend">
                        <template slot-scope="props" >{{ props.minutes }}:{{ props.seconds }}
</template>
                </countdown>
            </span>
            <span>游戏规则</span>
      </div>
      <ul class="btn">
          <li v-for="(item,index) in msg" :key="index">
              <div class="btn_t1">
                  <div class="loading" v-if="item.status==1">
                      <p>进行中</p>
                  </div>
                  <div class="end" v-else-if="item.status==2">
                      <p>已结束</p>
                  </div>
                  <p id="a_title" @click="gotoDetail($event)" :data-title="item.title" :data-rnum="item.readNum? item.readNum : 0" :data-anum="item.toAnswer.length" :data-status="item.status" :data-tid="item.id" :data-time="item.second">{{item.title}}</p>
                  <ul class="clearfix">
                      <li v-if="item.status==2" @click="goSiglepai($event)" :data-tid="item.id" :data-title="item.title">
                        <i class="iconfont icon-paihangbang"></i>
                        <i v-show="false" id="idTwo">{{item.id}}</i>
                        <span>排行榜</span>
                        <i class="s"></i>
                      </li>
                      <li>
                          <i class="line_l"></i>
                        <i class="iconfont icon-xianshimima"></i>
                        <span>{{item.readNum? item.readNum : 0}}</span>
                        <i class="s"></i>
                      </li>
                      <li @click="gotoDetail($event)" :data-title="item.title" :data-rnum="item.readNum? item.readNum : 0" :data-anum="item.toAnswer.length" :data-status="item.status" :data-tid="item.id" :data-time="item.second">
                          <i class="line_l"></i>
                          <i class="line_r"></i>
                          <i class="iconfont icon-pinglun"></i>
                          <span>{{item.toAnswer.length}}</span>
                          <i class="s"></i>

                      </li>   
                      <li style="background:#fdd545;border-bottom-right-radius: 10px;" v-if="item.status==1">
                          <i></i>   
                          <span class="counttest">倒计时</span>
                          <span>
                              <countdown :time="item.second" class="countdown">
<template slot-scope="props">
    {{props.hours}}:{{ props.minutes }}:{{ props.seconds }}
</template>
                              </countdown>
                          </span>
                      </li>
                  </ul>
              </div>
          </li>
        <div class="block">

        </div>
      </ul>
    </scroller>
    <router-link tag="div" to="/message" class="my_message ">
      <p>
        <i class="iconfont icon-xiaoxi"></i>
        <span></span>
      </p>
    </router-link>
    <tabnav></tabnav> 
  </div>
</template>

<script>
    const $url = 'https://www.13cai.com.cn/api/v1';
    export default {
        name: "index",
        data() {
            return {
                msg: [],
                limit: '',
                page: 1,
                size: 5,
                countdown: 0
            }
        },
        methods: {
            countdownend() {
                //     this.$emit('countdownend');
                //     let title = $("#a_title").text();
                //     let status = 2;
                //     let data = {
                //         title,
                //         status
                //     }
                //     console.log("显示页面是否刷新请求数据了")
                //     this.$axios.get('/topic',{params:data}).then(res=>{
                //     this.msg = res.data.list;
                //   });
            },
            getIndexData: function() {
                this.noData = '';
                const data = {
                    limit: this.page * this.size,
                    sort: JSON.stringify({
                        time: 0
                    })
                }
                this.$axios.get('/topic', {
                    params: data
                }).then(res => {
                    this.countdown = res.data.countDown;
                    console.log(this.countdown)
                    this.msg = res.data.list;
                    const limit = this.page * this.size;
                    if (this.msg.length <= limit) {
                        this.noData = '没有更多数据';
                    }
                });
            },
            refresh(done) {
                setTimeout(() => {
                    this.size = 5;
                    this.page = 1;
                    this.getIndexData();
                    done()
                }, 1500)
            },
            infinite(done) {
                if (this.noData) {
                    setTimeout(() => {
                        done(true);
                    });
                    return;
                }
                setTimeout(() => {
    
                    this.page++;
                    const data = {
                        limit: this.page * this.size,
                        sort: JSON.stringify({
                            time: 0
                        })
                    }
                    this.$axios.get('/topic', {
                        params: data
                    }).then(res => {
                        this.msg = res.data.list;
                        this.countdown = res.data.countDown;
                    });
                    const limit = this.page * this.size;
                    if (this.msg.length <= limit) {
                        this.noData = '没有更多数据';
                    }
                    done()
                }, 3000);
            },
            gotoDetail: function(event) {
                const topicid = event.currentTarget.dataset.tid; //问题id
                const readnum = event.currentTarget.dataset.rnum; //阅读数
                const answernum = event.currentTarget.dataset.anum; //评论数
                const status = event.currentTarget.dataset.status; //状态
                const time = event.currentTarget.dataset.time; //倒计时时间
                const title = event.currentTarget.dataset.title; //问题标题
    
                const query = {
                    topicid: topicid,
                    readnum: readnum,
                    answernum: answernum,
                    status: status,
                    time: time,
                    title: title
                }
                localStorage.setItem("query", JSON.stringify(query));
                this.$router.push('/answerDetail');
            },
            goSiglepai: function(event) {
                const topicid = event.currentTarget.dataset.tid; //问题id
                const title = event.currentTarget.dataset.title; //问题标题
                const squery = {
                    topicid: topicid,
                    title: title
                }
                localStorage.setItem("squery", JSON.stringify(squery));
                this.$router.push('/singlepai');
            }
        },
        mounted() {
            this.getIndexData();
            //清除缓存
            if (localStorage.getItem("answernum")) {
                localStorage.removeItem("answernum");
            }
        },
    }
</script>

<style lang="scss" scoped>
    $x:37.5;
    .box {
        overflow: hidden;
    }
    
    .nav {
        margin-top: 15rem/$x;
        background: #ffffff;
    }
    
    .countdown {
        font-family: STHeitiSC-Medium;
        font-size: 13px;
        color: #333333;
        letter-spacing: -0.39px;
        padding-right: 15rem/$x;
    }
    
    .counttest {
        font-family: STHeitiSC-Medium;
        font-size: 13px;
        color: #333333;
        letter-spacing: -0.39px;
        text-align: left;
    }
    
    .my_message {
        position: fixed;
        width: 40rem/$x;
        height: 40rem/$x;
        border-radius: 40rem/$x;
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        right: 15rem/$x;
        bottom: 64rem/$x;
    }
    
    .my_message>p {
        width: 100%;
        height: 100%;
        line-height: 40rem/$x;
        position: relative;
    }
    
    .my_message .iconfont:nth-of-type(1) {
        font-size: 24px;
    }
    
    .my_message span {
        display: block;
        width: 8rem/$x;
        height: 8rem/$x;
        border-radius: 8rem/$x;
        position: absolute;
        background: #EF5350;
        right: 8rem/$x;
        top: 8rem/$x;
    }
    
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    
    .btn_t1>.height_light {
        background: #FDD545;
    }
    
    ul {
        padding: 0;
    }
    
    .box {
        width: 100%;
        height: 100%;
    }
    
    .nav {
        width: 345rem/$x;
        height: 35rem/$x;
        margin: 0 auto;
        border-radius: 100rem/$x;
        border: 1px solid #FDD545;
        line-height: 35rem/$x;
        margin-top: 17rem/$x;
        text-align: center;
        position: relative;
        background: #FFFFFF;
    }
    
    .nav>span:nth-of-type(3) {
        display: block;
        position: absolute;
        width: auto;
        height: 100%;
        line-height: 35rem/$x;
        font-size: 13rem/$x;
        color: #FDD545;
        top: 0;
        right: 15rem/$x;
    }
    
    ul,
    li {
        list-style: none;
        -webkit-padding-start: 0;
    }
    
    .btn {
        padding: 0;
    }
    
    .btn>li {
        width: 345rem/$x;
        height: 105rem/$x;
        border: 10rem/$x;
        box-shadow: 0 2px 6px 0 #dddddd;
        margin: 20rem/$x auto;
        border-radius: 10rem/$x;
        overflow: hidden;
    }
    
    .btn_t1 {
        width: 345rem/$x;
        height: 105rem/$x;
        position: relative;
        overflow: hidden;
        background: #fff;
    }
    
    .loading {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-top: 50px solid #FDD545;
        border-right: 50px solid transparent;
    }
    
    .end {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
        border-top: 50px solid #666;
        border-right: 50px solid transparent;
    }
    
    .loading>p {
        width: 50rem/$x;
        transform: rotate(-45deg);
        font-family: STHeitiSC-Medium;
        font-size: 12rem/$x;
        color: #333;
        letter-spacing: -0.29px;
        text-align: left;
        position: absolute;
        left: 0;
        top: -45rem/$x;
    }
    
    .end>p {
        width: 50rem/$x;
        transform: rotate(-45deg);
        font-family: STHeitiSC-Medium;
        font-size: 12rem/$x;
        color: #fff;
        letter-spacing: -0.29px;
        text-align: left;
        position: absolute;
        left: 0;
        top: -45rem/$x;
    }
    
    .btn_t1>p {
        font-size: 18rem/$x;
        color: #333333;
        height: 60rem/$x;
        width: 256rem/$x;
        margin: 0 auto;
        margin-top: 10rem/$x;
        text-align: left;
        font-weight: 500;
    }
    
    .btn_t1>ul {
        width: 345rem/$x;
        height: 35rem/$x;
        padding: 0;
        border-radius: 10rem/$x;
    }
    
    .btn_t1>ul>li {
        width: 115rem/$x;
        height: 35rem/$x;
        float: left;
        line-height: 35rem/$x;
        margin: 0 0;
        background-color: #fafafa;
        position: relative;
    }
    
    .btn_t1>ul>li>span {
        margin-left: 10rem/$x;
    }
    
    .block {
        width: 375rem/$x;
        height: 50rem/$x;
    }
    .line_l{
        width: 1rem/$x;
        height: 19rem/$x;
        background: #DDDDDD;
        position: absolute;
        left: 0;
        top: 8rem/$x;
    }
    .line_r{
        width: 1rem/$x;
        height: 19rem/$x;
        background: #DDDDDD;
        position: absolute;
        right: -1rem/$x;
        top: 8rem/$x;    }
</style>

