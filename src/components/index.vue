<template>
  <div class="box">
      <div class="nav clearfix">
          <div>
            <span class="counttest">下场开始时间</span>
            <span>
                <countdown :time="60 * 60 * 1000" class="countdown">
                    <template slot-scope="props" >{{ props.minutes }}:{{ props.seconds }} </template>
                </countdown>
            </span>
          </div>
          <div>
              <span><a href="">游戏规则</a></span>
         </div>
      </div>
      <ul class="btn">
          <li v-for="item in msg" :key="item.id">
              <div class="btn_t1">
                  <!--<img src="" alt="" class="loading"> -->
                  <div class="loading" v-if="item.status==1">
                      <p>进行中</p>
                  </div>
                  <div class="end" v-else>
                      <p>已结束</p>
                  </div>
                  <router-link tag="p" :to="{name:'answerDetail',params:{title:''+item.title+'',readNum:''+item.readNum+'',toAnswer:''+item.toAnswer.length+'',
                  status:''+item.status+'',id:''+item.id+'',time:''+item.second+''}}">
                        {{item.title}}
                  </router-link>
                  <ul class="clearfix">
                      <li v-if="item.status==1"><i class="iconfont icon-xianshimima"></i><span>{{item.readNum}}</span><i class="s"></i></li>
                      <li v-if="item.status==2"><i class="iconfont icon-paihangbang"></i><span>排行榜</span><i class="s"></i></li>
                  <router-link tag="li" :to="{name:'answerDetail',params:{title:''+item.title+'',readNum:''+item.readNum+'',toAnswer:''+item.toAnswer.length+'',
                  status:''+item.status+'',id:''+item.id+'',time:''+item.second+''}}">
                      <li v-if="item.status==1"><i class="iconfont icon-pinglun"></i><span>{{item.toAnswer.length}}</span><i class="s"></i></li>
                  </router-link>   
                      <!-- <li v-if="item.status==1"><i class="iconfont icon-pinglun"></i><span>{{item.toAnswer.length}}</span><i class="s"></i></li> -->
                      <li v-if="item.status==2"><i class="iconfont icon-wode"></i><span>{{item.readNum}}</span><i class="s"></i></li>
                      <li style="background:#fdd545;border-bottom-right-radius: 10px;" v-if="item.status==1">
                          <i></i>   <span class="counttest">倒计时</span>
                                    <span>
                                        <countdown :time="item.second" class="countdown">
                                            <template slot-scope="props" >{{ props.minutes }}:{{ props.seconds }} </template>
                                        </countdown>
                                    </span>
                      </li>
                      <li style="border-bottom-right-radius: 10px;" v-if="item.status==2"><i class="iconfont icon-pinglun"></i><span>{{item.toAnswer.length}}</span></li>
                  </ul>
              </div>
          </li>
        <div class="block">

        </div>
      
         
      </ul>
        
  <!--      <countdown :time="3 * 24 * 60 * 60 * 1000" class="ss">
  <template slot-scope="props" >Time Remaining：{{ props.days }} days, {{ props.hours }} hours, {{ props.minutes }} minutes, {{ props.seconds }} seconds.</template>
</countdown>  -->
       <tabnav></tabnav> 
  </div>
</template>
<script>
export default {
  name:"index",
  data(){
      return {
          msg:[],
          limit:'',
          page:2,
          size:2
      }
  },
  methods:{
       countdown:function(){

       }
  },
  created(){
            this.$http.get('//192.168.1.116:1337/topic',{limit: 2, sort:{ createdAt:0}}).then(res=>{
                 this.msg = res.data
                 console.log(res.data)
                
          });
  }
}
</script>
<style lang="scss" scoped>
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
    $x:37.5;
    .clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    }
    .btn_t1>.height_light{background: #FDD545;}
    ul{padding: 0;}
    .box{
       width: 100%;height: 100%;
    }
    .nav{
        width: 345rem/$x;height: 35rem/$x;margin:0 auto;border-radius: 100rem/$x;border: 1px solid #FDD545;

    }
    .nav>div:nth-of-type(1){
        width: 120rem/$x;height: 18rem/$x;font-size: 13rem/$x;letter-spacing: 0.16rem/$x;
        line-height: 18rem/$x;float: left;
        margin: 8rem/$x 0 0 116rem/$x;
    }
    .nav>div:nth-of-type(1)>span:nth-of-type(1){
        width: 90rem/$x;
    }
    .nav>div:nth-of-type(1)>span:nth-of-type(2){
        width: 24rem/$x;
    }
    .nav>div:nth-of-type(2){
         width: 53rem/$x;height: 18rem/$x;font-size: 13rem/$x;letter-spacing: 0.16rem/$x;
        line-height: 18rem/$x;float: right;margin: 8rem/$x 10rem/$x 0 0;
    }
    .nav>div:nth-of-type(2)>span:nth-child(1)>a{
        width: 53rem/$x;height: 18rem/$x;font-size: 13rem/$x;line-height: 18rem/$x;color: #FDD545;
        text-decoration: none;
    }
    ul,li{
        list-style: none;-webkit-padding-start: 0;
    }
    .btn{
        padding: 0;
    }
    .btn>li{
        width: 345rem/$x;height: 105rem/$x;border: 10rem/$x;box-shadow: 0 2px 6px 0 #dddddd;
        margin: 20rem/$x auto;border-radius: 10rem/$x;overflow: hidden;
    }
    .btn_t1{
        width: 345rem/$x;height: 105rem/$x;position: relative;overflow: hidden;
        background: #fff;
    }
    .loading{position: absolute;left: 0;top: 0;width: 0;
    height: 0;
    border-top: 50px solid #FDD545;
    border-right: 50px solid transparent;}
    .end{position: absolute;left: 0;top: 0;width: 0;
    height: 0;
    border-top: 50px solid #666;
    border-right: 50px solid transparent;}
    .loading>p{width: 50rem/$x;
        transform: rotate(-45deg);
    font-family: STHeitiSC-Medium;
    font-size: 12rem/$x;
    color: #333;
    letter-spacing: -0.29px;text-align: left;position: absolute;left: 0;top:-45rem/$x;}
    .end>p{width: 50rem/$x;
        transform: rotate(-45deg);
    font-family: STHeitiSC-Medium;
    font-size: 12rem/$x;
    color: #fff;
    letter-spacing: -0.29px;text-align: left;position: absolute;left: 0;top:-45rem/$x;}

    .btn_t1>p{font-size: 18rem/$x;color: #333333;height: 60rem/$x;width: 256rem/$x;margin: 0 auto;margin-top: 10rem/$x;
   text-align: left;
    }

    .btn_t1>ul{
        width: 345rem/$x;height: 35rem/$x;padding: 0;border-radius: 10rem/$x;
    }
    .btn_t1>ul>li{width: 115rem/$x;height: 35rem/$x;float: left;line-height: 35rem/$x;margin: 0 0;
    background-color: #fafafa;position: relative;}
    .btn_t1>ul>li>span{
        margin-left: 10rem/$x;
    }
    .block{
        width: 375rem/$x;height: 50rem/$x;
    }
</style>

