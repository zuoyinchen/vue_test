<template>
  <div class="box">
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
                      <span>{{readnum}}</span>
                  </div>
                  <div>
                      <i class="iconfont icon-pinglun"></i>
                      <span>{{answernum}}</span>
                  </div>
              </div>
              <div class="theme_b_r" v-if="status==1">
                  <p @click="gotoQuestion($event)" :data-title="title" :data-rnum="readnum" :data-anum="answernum" :data-status="status" :data-tid="topicid" :data-time="time">立即抢答</p>
                  <!-- <router-link tag="p" :to="{name:'answerQuestions',params:{title:''+title+'',readNum:''+readNum+'',toAnswer:''+toAnswer+'',time:''+time+''}}">
                       <p>立即抢答</p>
                  </router-link> -->
                  
              </div>
              <div class="theme_b_r" v-if="status==2" v-show="true">
                  <router-link tag="p" :to="{name:'answerQuestions'}">
                       <p>立即抢答</p>
                  </router-link> 
              </div>
          </div>
      </div>
      <ul class="ctn">
          <li class="clearfix pin_list" v-if="msg!=null" v-for="(item,index) in users" :key="item.id">
              <div class="ctn_l">
                  <i>{{index+1}}</i>
                  <img v-if="!Boolean(item.createdBy)" :src="defaulturl" alt="1">
                  <img v-else-if="!Boolean(item.createdBy.avatarUrl)" :src="defaulturl" alt="1">
                  <img v-else :src="item.createdBy.avatarUrl" alt="2">
              </div>
              <div class="ctn_r">
                  <div>
                      <span v-if="!Boolean(item.createdBy)">{{'匿名用户'}}</span>
                      <span v-else-if="!Boolean(item.createdBy.username)">{{'匿名用户'}}</span>
                      <span v-else class="answer">{{item.createdBy.username}}</span>
                      <i class="iconfont icon-fenxiang" @click="gotoShare($event)"></i>
                      <i class="iconfont icon-shoucang2" v-if="item.isStar == true" @click="giveStar($event)" :data-id="item.id" :data-index="index"></i>
                      <i class="iconfont icon-shoucang1" v-else @click="giveStar($event)" :data-id="item.id" :data-index="index"></i>
                  </div>
                  <p>
                      {{item.body}}
                  </p>
                  <div class="clearfix">
                      <div>
                          <span>{{item.createdAt}}</span>
                          <span class="delete_pinglun" v-show="item.isMe" @click="deleteAnswer()" :data-id="item.id">删除</span>
                      </div>
                      <div class="clearfix">
                          <div>
                              <i class="iconfont icon-dianzan1" v-if="item.upVote == true" @click="giveLike($event)" :data-id="item.id" :data-index="index"></i>
                              <i class="iconfont icon-dianzan" v-else @click="giveLike($event)" :data-id="item.id" :data-index="index"></i>
                              <span class="upVote_num">{{item.upVotes.length}}</span>
                          </div>
                          <div @click="slideDown($event)" :data-index="index" :data-id="item.id">
                              <i class="iconfont icon-pinglun"></i>
                              <span class="comment_num">{{item.comments.length}}</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div v-show="item.comments.length>0" class="slide clearfix hide" v-for="i in item.comments" :key="i.id">
                <div class="slide_l">
                    <img src="" alt="">
                </div>
                <div class="slide_r">
                    <div class="slide_rt clearfix">
                        <div>
                            <span v-if="!Boolean(i.username)">{{'匿名用户'}}</span>
                            <span v-else>{{i.username}}</span>
                        </div>
                        <div>
                            <span v-show="i.isMe" class="delete_pinglun" @click="deletePinlun()" :data-id="i.id" :data-index="index">删除</span>
                            <span>{{i.createdAt}}</span>
                        </div>
                    </div>
                    <p class="slide_rb">
                        {{i.body}}
                    </p>
                </div>
              </div>
          </li>
      </ul>
      <div class="int" v-show="false">
          <div class="int_l"></div>
          <form action="">
            <input type="text" class="int_m">
          </form>
          <div class="int_r"></div>
      </div>
  </div>
</template>
<script>
  //引入微信js-sdk
 import wx from 'weixin-js-sdk'
  const $userid = localStorage.getItem("userid");//用户id
  const $url = 'https://www.13cai.com.cn/api/v1';
  //const $url = 'http://192.168.1.116:1337/api/v1'
  // const $userid = '5ab62034992ae628add1f2eb';//用户id
  export default {
      name:"answerDetail",
      data(){
          return {
              msg:[],
              users:[],
              status:'',
              topicId:'',
              time:0,
              title:'',
              readnum:'',
              answernum:'',
              id:'',
              defaulturl:'http://thirdwx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0'
          }
      },
      methods:{
        giveStar:function(event){
          console.log(event.currentTarget.dataset);
          const answerid = event.currentTarget.dataset.id;
          console.log('问题id |'+answerid);
          const $index = event.currentTarget.dataset.index;//所点击收藏的评论索引
          const $userid = localStorage.getItem("userid");
          console.log(this.msg[$index].stars);
          const stars = this.msg[$index].stars;
          const starsid = [];
          //循环当前评论收藏的信息，拿到此条评论的所有id
          for(let i=0;i<stars.length;i++){
            starsid.push(stars[i].id);
          }
          console.log(this.msg[$index].isStar);
          console.log('总');
          console.log(starsid);
          console.log('位置'+starsid.indexOf($userid));
          if(this.msg[$index].isStar){
            console.log("取消收藏");
            starsid.splice(starsid.indexOf($userid),1)
            var resultarr = starsid;
            console.log(resultarr);
          }else{
            console.log("收藏");
            starsid.push($userid);
            var resultarr = [...new Set(starsid)]
            console.log(resultarr);
          }
          const data = {
            'stars' : resultarr
          }
          this.$axios.put($url+'/answer/'+answerid,data).then((res)=>{
            console.log(res);
            if(res.status == 200){
              if(this.msg[$index].isStar){
                this.msg[$index].isStar = false;
              }else{
                this.msg[$index].isStar = true;
              }
            }
          }).catch((error,errorcode)=>{
            console.log(error);
          });
        },
        giveLike:function(event){
          console.log(event.currentTarget.dataset);
          const answerid = event.currentTarget.dataset.id;
          console.log('点赞id |'+answerid);
          const $index = event.currentTarget.dataset.index;//所点击收藏的评论索引
          const $userid = localStorage.getItem("userid");
          console.log('点赞用户 |'+$userid);
          console.log(this.msg[$index].upVotes);
          const upVotes = this.msg[$index].upVotes;
          const upVotesid = [];
          //循环当前评论收藏的信息，拿到此条评论的所有id
          for(let i=0;i<upVotes.length;i++){
            upVotesid.push(upVotes[i].id);
          }
          console.log(this.msg[$index].upVote);
          console.log('当前用户点赞位置'+upVotesid.indexOf($userid));
          if(this.msg[$index].upVote){
            upVotesid.splice(upVotesid.indexOf($userid),1)
            var resultarr = upVotesid;
            $(".upVote_num").eq($index).text(resultarr.length);
          }else{
            upVotesid.push($userid);
            var resultarr = [...new Set(upVotesid)];
            $(".upVote_num").eq($index).text(resultarr.length);
          }
          const data = {
            'upVotes' : resultarr
          }
          this.$axios.put($url+'/answer/'+answerid,data).then((res)=>{
            console.log(res);
            if(res.status == 200){
              if(this.msg[$index].upVote){
                this.msg[$index].upVote = false;

              }else{
                this.msg[$index].upVote = true;
              }
            }
          }).catch((error,errorcode)=>{
            console.log(error);
          })
        },
        slideDown:function(event){
          const index = event.currentTarget.dataset.index;
          const id = event.currentTarget.dataset.id;
          const answer = $('.answer').text();
          localStorage.setItem('answer',answer); 
          localStorage.setItem("oneuser",id);
          
          this.$router.push('/comments');
        //   $('.pin_list').eq(index).find(".slide").toggle();
        },
        timeReplace:function(str) {
        return str.replace('T', ' ').slice(0, str.indexOf('.'));
        },
        gotoQuestion:function(event){
          const topicid = event.currentTarget.dataset.tid;//问题id
          const readnum = event.currentTarget.dataset.rnum;//阅读数
          const answernum = event.currentTarget.dataset.anum;//评论数
          const status = event.currentTarget.dataset.status;//状态
          // const time = event.currentTarget.dataset.time;//倒计时时间
          const title = event.currentTarget.dataset.title;//问题标题
          const userQuestion = {
            topicid : topicid,
            readnum : readnum,
            answernum : answernum,
            status : status,
            time : this.time,
            title : title
          }
          console.log(JSON.stringify(userQuestion));

          localStorage.setItem("userQuestion",JSON.stringify(userQuestion));
          this.$router.push('/answerQuestions');
        },
       gotoShare:function(){
        wx.onMenuShareAppMessage({
          title: '这是个问题吗', // 分享标题
          desc: '回答问题', // 分享描述
          link: 'https://www.13cai.com.cn/get_wxlogin', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '../assets/images/logo.png', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
              // 用户确认分享后执行的回调函数
              console.log("成功");
          },
          cancel: function () {
            console.log("取消");
          // 用户取消分享后执行的回调函数
          }
        });
       },
       deleteAnswer:function(){
          console.log("删除答案");
          const answerid = event.currentTarget.dataset.id;

          this.$axios.delete($url+'/answer/'+answerid).then((res)=>{
            console.log(res);
            this.answernum -=1;
            this.upDatedata();
          }).catch((error,errorcode)=>{
            console.log(error);
          })
       },
       deletePinlun:function(){
          const commentid = event.currentTarget.dataset.id;
          const answerindex = event.currentTarget.dataset.index;//所评论的问题索引
          let comment_num = $(".pin_list").eq(answerindex).find(".comment_num").text();
          comment_num -=1;
          $(".pin_list").eq(answerindex).find(".comment_num").text(comment_num);
          this.$axios.delete($url+'/comment/'+commentid).then((res)=>{
            console.log(res);
            
          }).catch((error,errorcode)=>{
            console.log(error);
          });
       },
       upDatedata:function(){
          const query = localStorage.getItem("query");//参数集合
          const queryobj = JSON.parse(query);
          this.topicid = queryobj.topicid;
          
          const topicid = this.topicid;//问题id
          const data ={
            search:JSON.stringify({topic: topicid}),
            userid:$userid
          };
          this.$http.get($url+'/answer', {params:data}).then(res=>{
              this.msg = res.data;
              //拿到所有答题者的id
              const userarr = [];//答题者id集合
              for(var i=0;i<this.msg.length;i++){
                  this.msg[i].isMe = false;
                  userarr.push(this.msg[i].id);
                  
              }
              this.users = this.msg;
              //判断答题者的id中是否有自己
              if(userarr.indexOf($userid) !== -1){
                console.log(this.users);
                this.users[userarr.indexOf($userid)].isMe = true;
                for(var j=0;j<this.users[userarr.indexOf($userid)].comments.length;j++){
                  this.users[userarr.indexOf($userid)].comments[j].isMe = true;
                  console.log(this.users[userarr.indexOf($userid)].comments[j]);
                }
              }else{
                $.each(this.users,function(i,v){
                  $.each(v.comments,function(i,v){
                    v.isMe = false;
                    if(v.id == $userid){
                      v.isMe = true;
                    };
                  })
                });
                console.log(this.users);
              }
          }).catch((error)=>{
            console.log(error);
          });
       }
      },
      mounted(){
        const query = localStorage.getItem("query");//参数集合
        const queryobj = JSON.parse(query);
        this.title = queryobj.title;
        this.time = Number(queryobj.time);
        this.status = queryobj.status;
        this.readnum = Number(queryobj.readnum);
        this.answernum =  Number(queryobj.answernum);
        this.topicid = queryobj.topicid;

        
        const topicid = this.topicid;//问题id
        
        const data ={
          search:JSON.stringify({topic: topicid}),
          userid:$userid
        };
        this.$http.get($url+'/answer', {params:data}).then(res=>{
            this.msg = res.data;
            //拿到所有答题者的id
            const userarr = [];//答题者id集合
            for(var i=0;i<this.msg.length;i++){
                this.msg[i].isMe = false;
                userarr.push(this.msg[i].id);
            }
            this.users = this.msg;
            // console.log(this.users)
            //判断答题者的id中是否有自己
            if(userarr.indexOf($userid) !== -1){
              console.log(this.users);
              this.users[userarr.indexOf($userid)].isMe = true;
              for(var j=0;j<this.users[userarr.indexOf($userid)].comments.length;j++){
                this.users[userarr.indexOf($userid)].comments[j].isMe = true;
                console.log(this.users[userarr.indexOf($userid)].comments[j]);
              }
            }else{
              $.each(this.users,function(i,v){
                $.each(v.comments,function(i,v){
                  v.isMe = false;
                  if(v.id == $userid){
                    v.isMe = true;
                  };
                })
              });
              console.log(this.users);
            }
        }).catch((error)=>{
          console.log(error);
        });

        //微信js-sdk
        this.$axios.get($url+'/wechat_share',{params:{url:window.location.href}}).then(res=>{
            console.log(res);
            const appid = res.data.appId;
            const nonceStr = res.data.nonceStr;
            const signature = res.data.signature;
            const timestamp = res.data.timestamp;

            //配置微信js-sdk
            wx.config({
                debug: true, // 
                appId: appid, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });

            wx.ready(function(){
                console.log("成功");
            });
            wx.error(function(res){
                console.log("失败");
            });

        }).catch((error)=>{
          console.log(error);
        })
      },
      beforeCreate:function(){
       
        
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
    .icon-dianzan,.icon-dianzan1{
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
    .slide{
        margin-top: 0;border-radius: 0;background: #FAFAFA;
    }
    .slide_l{
        float: left;text-align: left;width: 62rem/$x;
    }
    .slide_l>img{width: 32rem/$x;height: 32rem/$x;background: #FDD545;display: inline-block;
    border-radius: 50%;margin: 15rem/$x;}
    .slide_r{
        float: left;width: 283rem/$x;
    }
    .slide_rt{
        width: 283rem/$x;margin-top: 15rem/$x;
    }
    .slide_rt>div:nth-of-type(1){
        font-family: STHeitiSC-Medium;
        font-size: 12px;
        color: #333333;
        letter-spacing: 0.14px;
        float: left;
    }
    .slide_rt>div:nth-of-type(2){
        font-family: STHeitiSC-Medium;
        font-size: 12px;
        color: #BDBDBD;
        letter-spacing: 0.14px;
        float: right;
        margin-right: 15rem/$x;
    }
    .slide_rb{
        text-align: left;font-family: STHeitiSC-Medium;font-size: 12px;color: #666666;
        letter-spacing: 0.14px;margin-top: 10rem/$x;
    }
    .hide{
        display: none;
    }
    .delete_pinglun{
      font-family: STHeitiSC-Medium;
      font-size: 12px;
      color: #1E88E5;
      letter-spacing: 0.14px;
    }
    .int{
        width: 345rem/$x;
        height: 33rem/$x;
        position: fixed;
        bottom: 33rem/$x;
        left: 15rem/$x;
    }
    .int_l{
        float: left;
        background: #f4f4f4;
        // border-right:1px solid #000;
        width: 54rem/$x;
        height: 33rem/$x;
    }
    .int_m{
        float: left;
        width: 207rem/$x;
        background: #f4f4f4;
        height: 33rem/$x;
        outline:medium
        
    }
    .int_r{
        float: left;
        background: #f4f4f4;
        width: 46rem/$x;
        height: 35rem/$x;
    }
</style>

