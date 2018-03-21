<template>
  <div class="box">
      <span v-show="false" id="status">{{$route.params.status}}</span>
      <span v-show="false" id="topicId">{{$route.params.id}}</span>
      <div class="countdown"  v-if="status==1">
            <span class="counttest">倒计时</span>
            <span>
                <countdown :time="time" class="countdown">
                    <template slot-scope="props" >{{ props.minutes }}:{{ props.seconds }} </template>
                </countdown>
            </span>
      </div>
      <div v-if="status== 2" class="countdown countend">
            <span class="counttest">已结束</span>
      </div>
      <div class="theme">
          <p class="theme_t">
              {{title}}
          </p>
          <div class="theme_b clearfix">
              <div class="theme_b_l">
                  <div>
                      <i class="iconfont icon-wode"></i>
                      <span>{{readNum}}</span>
                  </div>
                  <div>
                      <i class="iconfont icon-pinglun"></i>
                      <span>{{toAnswer}}</span>
                  </div>
              </div>
              <div class="theme_b_r" v-if="status==1">
                  <router-link tag="p" :to="{name:'answerQuestions',params:{title:''+title+'',readNum:''+readNum+'',toAnswer:''+toAnswer+'',time:''+time+''}}">
                       <p>立即抢答</p>
                  </router-link>
                  
              </div>
              <div class="theme_b_r" v-if="status==2" v-show="false">
                  <router-link tag="p" :to="{name:'answerQuestions'}">
                       <p>立即抢答</p>
                  </router-link> 
              </div>
          </div>
      </div>
      <ul class="ctn">
          <li class="clearfix" v-for="(item,index) in msg" :key="item.id">
              <div class="ctn_l">
                  <i>{{index+1}}</i>
            <!--      <img v-if="item.createdBy.avatarUrl.length<0" src="" alt="">    -->
                  <img :src="item.upVotes.avatarUrl" alt="">
              </div>
              <div class="ctn_r">
                  <div>
                      <!-- <span v-if="item.user.username==null">{{'匿名用户'}}</span> -->
                      <span>{{item.username}}</span>
                      <i class="iconfont icon-fenxiang"></i>
                      <i class="iconfont icon-shoucang1"></i>
                  </div>
                  <p>
                      {{item.body}}
                  </p>
                  <div class="clearfix">
                      <div>
                          <span>{{item.createdAt}}</span>
                      </div>
                      <div class="clearfix">
                          <div>
                              <i class="iconfont icon-dianzan"></i>
                              <span>{{item.topic.downVotes}}</span>
                          </div>
                          <div @click="slideDown">
                              <i class="iconfont icon-pinglun"></i>
                              <span>{{item.topic.messageNum}}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
    name:"answerDetail",
    data(){
        return {
            msg:[],
            users:[],
            status:'',
            topicId:'',
            time:'',
            limit:'',
            userid:'',
            title:'',
            readNum:'',
            toAnswer:''


        }
    },
    methods:{
        slideDown:function(){
            
        }
    },
    beforeCreate(){
        this.topicId = this.$route.params.id
        const $url = 'http://192.168.1.116:1337';
        const $userid = localStorage.getItem("userid");
        const data ={search:JSON.stringify({topic: this.topicId}),userid:$userid};
          this.$http.get($url+'/answer', {params:data}).then(res=>{
            this.msg = res.data;
            console.log(this.msg);

          });
      }
    // ,
    // beforeCreate(){
    //     //console.log(this.status)
    //     this.topicId = this.$route.params.id
    //     // this.title = this.$route.params.title
    //     // console.log(this.topicId);
    //     this.$http.get(`//192.168.1.116:1337/topic/${this.topicId}`).then(res=>{
    //         this.msg = res.data
    //         // this.title = res.data.title
    //         console.log(res.data)
    //     });
    // }
    ,
    mounted(){
        this.time = Number(this.$route.params.time);
        this.status = $('#status').text();
        this.topicId = this.$route.params.id
        this.title = this.$route.params.title
        this.readNum = this.$route.params.readNum
        this.toAnswer = this.$route.params.toAnswer
    }
    
}
</script>
<style lang="scss" scoped>
    $x:37.5;
    .countdown{font-family: STHeitiSC-Medium;
font-size: 14px;
color: #333333;
letter-spacing: -0.39px;}
    .counttest{
        font-family: STHeitiSC-Medium;
font-size: 14px;
color: #333333;
letter-spacing: -0.39px;
    }
    .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    }
    *{
        margin: 0;padding: 0;
    }
    .box{
        width: 345rem/$x;margin: 0 auto;
    }
    .countdown{
        width: 106rem/$x;height: 30rem/$x;border-radius: 100rem/$x;background: #fdd545;
        line-height: 30rem/$x;
    }
    .countdown>span:nth-of-type(1){
        font-size: 14rem/$x;letter-spacing: -0.39rem/$x;
    }
    .countdown>span:nth-of-type(2){
        font-size: 14rem/$x;letter-spacing: -0.39rem/$x;
    }
    .theme{
        width: 345rem/$x;height: 100%;background: #FFFFFF;box-shadow: 0 2px 6px 0 #DDDDDD;border-radius: 10px;
        overflow: hidden;margin-top: 15rem/$x;
    }
    .theme_t{
       font-family: STHeitiSC-Medium;font-size: 18rem/$x;letter-spacing: 0.22rem/$x;color-interpolation-filters: #333;
       text-align: left;margin-left: 15rem/$x;margin-top: 15rem/$x;
    }
    .theme_b{
        width: 345rem/$x;margin-left: 15rem/$x;margin-bottom: 15rem/$x;margin-top: 15rem/$x;
    }
    .theme_b_l{
        width: 100rem/$x;float: left;height: 24rem/$x;color: #BDBDBD; 
    }
    .theme_b_l>div:nth-of-type(1){
        width: 45rem/$x;float: left;line-height: 24rem/$x;
    }
    .theme_b_l>div:nth-of-type(2){
        width: 45rem/$x;float: left;line-height: 24rem/$x;
    }
    .theme_b_r{
        width: 76rem/$x;float: right;height: 24rem/$x;margin-right: 30rem/$x;
        background: #FDD545;
        border-radius: 4px;
    }
    .theme_b_r > p{
        font-family: STHeitiSC-Medium;font-size: 14px;color: #333333;letter-spacing: 0.17px;padding: 4rem/$x 9rem/$x 6 rem/$x 10rem/$x;
        line-height: 24rem/$x;
    }
    .theme_b_l>div:nth-of-type(2){
        margin-left: 10rem/$x;
    }
    .icon-wode{
        font-size: 12px;color: #BDBDBD;
    }
    .icon-pinglun{
        font-size: 12px;color: #BDBDBD; 
    }
    .icon-dianzan{
        font-size: 12px;color: #BDBDBD;
    }
    ul,li{list-style: none;}
    .ctn>li{
        width: 345rem/$x;height:100%;
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        margin-top: 15rem/$x;
    }
    .ctn_l{position: relative;width: 62rem/$x;float: left;}
    .ctn_l>i{width: 17rem/$x;height: 17rem/$x;background: #FDD545;display: inline-block;border-radius: 50%;position: absolute;
    top:10rem/$x;left: 12rem/$x;}
    .ctn_l>img{width: 32rem/$x;height: 32rem/$x;background: #FDD545;display: inline-block;border-radius: 50%;margin-left: 15rem/$x;margin-top: 15rem/$x;}
    .ctn_r{
        width: 283rem/$x;float: left;text-align: left;overflow: hidden;margin-top: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(1)>span{
        font-family: STHeitiSC-Medium;
        font-size: 16rem/$x;
        color: #333333;
        letter-spacing: 0.19px;
    }
    .ctn_r>div:nth-of-type(1)>i{
        float: right;color: #fdd545;margin-right: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(1)>i:nth-of-type(2){
        float: right;color: #fdd545;margin-right: 5rem/$x;
    }
    .ctn_r>p:nth-of-type(1){
        width: 268rem/$x;
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0.17px;
        margin-top: 10rem/$x;
    }
    .ctn_r>div:nth-of-type(2){
        margin-top: 16rem/$x;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(1){
        float: left;font-family: STHeitiSC-Medium;
        font-size: 12rem/$x;
        color: #BDBDBD;
        letter-spacing: 0.14rem/$x;
        padding-bottom: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(2){
            float: right;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(2)>div{float: left;margin-right: 15rem/$x;color: #BDBDBD;}
    .countend{
        background: #666666;border-radius: 100rem/$x;
    }
    .countend>span{
        font-family: STHeitiSC-Medium;font-size: 14px;color: #FFFFFF;letter-spacing: -0.39px;
    }
</style>

