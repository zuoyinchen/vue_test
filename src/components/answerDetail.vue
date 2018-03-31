<template>
  <div class="box">
    <scroller>
      <div class="countdown"  v-if="status==1">
            <span class="counttest">倒计时</span>
            <span>
                <countdown :time="time" class="countdown">
                    <template slot-scope="props" >{{props.hours}}:{{ props.minutes }}:{{ props.seconds }}
                    </template>
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
                  <div class="icon_eye">
                      <i class="iconfont icon-xianshimima" ></i>
                      <span>{{readnum}}</span>
                  </div>
                  <div class="icon_pin">
                      <i class="iconfont icon-pinglun"></i>
                      <span>{{users.length}}</span>
                  </div>
              </div>
              <div class="theme_b_mark" @click="starAnswer($event)">
                <div class="icon_pin">
                    <i class="iconfont icon-shoucang2" style="color: #FFD62D" v-if="isMark"></i>
                    <i class="iconfont icon-shoucang1" v-else ></i>
                    <span>收藏</span>
                </div>
              </div>
          </div>
      </div>
        <div class="theme_b_sub" v-if="status==1">
            <p v-if="!isAnswer" @click="gotoQuestion($event)" :data-title="title" :data-rnum="readnum" :data-anum="answernum" :data-status="status" :data-tid="topicid" :data-time="time">立即抢答</p>
            <p v-else class="has_answered">已抢答</p>
        </div>
        
        <ul class="ctn">
            <li class="clearfix pin_list" v-for="(item,index) in users" :key="item.id"  @click="slideDown($event)" :data-index="index" :data-id="item.id" :data-isanswer="isAnswer">
                <div class="ctn_l">
                    <i>{{index+1}}</i>
                    <img v-if="!Boolean(item.createdBy)" src="../assets/images/logo.png" alt="1">
                    <img v-else-if="!Boolean(item.createdBy.avatarUrl)" src="../assets/images/logo.png" alt="1">
                    <img v-else :src="item.createdBy.avatarUrl" alt="2">
                </div>
                <div class="ctn_r">
                    <div>
                        <span v-if="!Boolean(item.createdBy)">{{'匿名用户'}}</span>
                        <span v-else-if="!Boolean(item.createdBy.nickName)">{{'匿名用户'}}</span>
                        <span v-else class="answer">{{item.createdBy.nickName}}</span>
                        <!-- <i class="iconfont icon-fenxiang" @click="gotoShare($event)"></i> -->
                        <i class="iconfont icon-shoucang2" v-if="item.isStar == true" @click="giveStar($event)" :data-id="item.id" :data-index="index"></i>
                        <i class="iconfont icon-shoucang1" v-else @click="giveStar($event)" :data-id="item.id" :data-index="index"></i>
                    </div>
                    <p>
                        {{item.body}}
                    </p>
                    <div class="clearfix">
                        <div>
                            <span>{{new Date(item.createdAt).toLocaleDateString().replace(/\//g,"-")}} {{new Date(item.createdAt).toLocaleTimeString().replace(/[\u4E00-\u9FA5]/g,'')}}</span>
                            <span class="delete_pinglun" v-show="item.isMe" @click="deleteAnswer($event)" :data-id="item.id">删除</span>
                        </div>
                        <div class="clearfix">
                            <div v-if="status == 1">
                                <i class="iconfont icon-dianzan1" v-if="item.upVote == true" @click="giveLike($event)" :data-id="item.id" :data-index="index"></i>
                                <i class="iconfont icon-dianzan" v-else @click="giveLike($event)" :data-id="item.id" :data-index="index"></i>
                                <span class="upVote_num">{{item.upVotes.length}}</span>
                            </div>
                            <div v-else @click="endTip($event)">
                                <i class="iconfont icon-dianzan"></i>
                                <span class="upVote_num">{{item.upVotes.length}}</span>
                            </div>
                            <div>
                                <i class="iconfont icon-pinglun"></i>
                                <span class="comment_num">{{item.comments.length}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="block"></div>
      </scroller>
      <div class="mylist_wrap">
        <div class="mylist" v-show="isAnswer"   @click="slideDown($event)" :data-index="mygrade-1" :data-id="myanswerid">
            <i class="iconfont icon-suoding"></i>
            <span>{{mygrade}}</span>
            <span>我的排名</span>
            <p class="my_pinlun">
              <i class="iconfont icon-pinglun"></i>
              <span>{{mycomment}}</span>
            </p>
            <p class="my_dianzan">
              <i class="iconfont icon-dianzan"></i>
              <span>{{myupvote}}</span>
            </p>
        </div>
        <div class="mylist" v-show="!isAnswer & status == 1">
            <i class="iconfont icon-suoding"></i>
            <span>-</span>
            <span>我的排名</span>
            <p class="go_answer">立即抢答</p>
        </div>
        <div class="mylist" v-show="!isAnswer & status == 2">
            <i class="iconfont icon-suoding"></i>
            <span>-</span>
            <span>我的排名</span>
            <p class="go_answer">未抢答</p>
        </div>

      </div>
  </div>
</template>

<script>
//引入微信js-sdk
// import wx from 'weixin-js-sdk'
import "mint-ui/lib/style.css";
import { MessageBox, Toast, Indicator } from "mint-ui";
const $userid = localStorage.getItem("userid"); //用户id
export default {
  name: "answerDetail",
  data() {
    return {
      msg: [],
      users: [],
      status: "",
      topicId: "",
      time: 0,
      title: "",
      readnum: "",
      answernum: "",
      id: "",
      defaulturl: "",
      isAnswer: false,
      myinfor: {},
      myupvote: 0, //我的点赞数
      mycomment: 0, //我的评论数
      mygrade: "", //我的排名
      stars: [],
      isMark: false,
      myanswerid: ""
    };
  },
  methods: {
    starAnswer: async function(event) {
      Indicator.open();
      // 收藏问题
      const { status, title } = this.$data;
      const query = localStorage.getItem("query"); //参数集合
      const queryobj = JSON.parse(query);
      this.topicid = queryobj.topicid;
      const stars_ = [];
      if (this.stars && this.stars.length) {
        this.stars.forEach(item => {
          if ($userid !== item.id) {
            stars_.push(item.id);
          }
        });
        if (stars_.length === this.stars.length) {
          stars_.push($userid);
        } 
      } else {
        stars_.push($userid);
      }
      const res = {
        status: Number(status),
        title,
        stars: stars_
      };
      let updateTopic = await this.$axios.put(`/topic/${this.topicid}`, res);
      if (updateTopic.status === 200) {
        if (this.isMark) {
          this.upDatedata("取消收藏");
          this.isMark = false;
        } else {
          this.upDatedata("收藏成功");
          this.isMark = true;
        }
        this.$axios.get(`/topic/${queryobj.topicid}`).then(res => {
          this.stars = res.data.stars;
          $.each(this.stars,function(i,v){
            if(v.id == $userid){
              this.isMark = true;
            }
          })
        });
      } else {
        Toast("收藏失败");
      }
      console.log("isMark", this.isMark);
    },
    endTip: function(event) {
      event.stopPropagation();
      MessageBox.alert("该场次已结束");
    },
    giveStar: function(event) {
      event.stopPropagation();
      const answerid = event.currentTarget.dataset.id;
      const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
      const $userid = localStorage.getItem("userid");
      console.log(this.msg[$index].stars);
      const stars = this.msg[$index].stars;
      const starsid = [];
      //循环当前评论收藏的信息，拿到此条评论的所有id
      for (let i = 0; i < stars.length; i++) {
        starsid.push(stars[i].id);
      }
      console.log(this.msg[$index].isStar);
      if (this.msg[$index].isStar) {
        console.log("取消收藏");
        starsid.splice(starsid.indexOf($userid), 1);
        var resultarr = starsid;
        console.log(resultarr);
      } else {
        console.log("收藏");
        starsid.push($userid);
        var resultarr = [...new Set(starsid)];
        console.log(resultarr);
      }
      const data = {
        stars: resultarr
      };
      Indicator.open();
      this.$axios
        .put("/answer/" + answerid, data)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (this.msg[$index].isStar) {
              this.msg[$index].isStar = false;
              this.upDatedata("取消收藏");
            } else {
              this.msg[$index].isStar = true;
              this.upDatedata("收藏成功");
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    giveLike: function(event) {
      event.stopPropagation();
      console.log(event.currentTarget.dataset);
      const answerid = event.currentTarget.dataset.id;
      console.log("点赞id |" + answerid);
      const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
      const $userid = localStorage.getItem("userid");
      console.log("点赞用户 |" + $userid);
      console.log(this.msg[$index].upVotes);
      const upVotes = this.msg[$index].upVotes;
      const upVotesid = [];
      //循环当前评论收藏的信息，拿到此条评论的所有id
      for (let i = 0; i < upVotes.length; i++) {
        upVotesid.push(upVotes[i].id);
      }
      console.log(this.msg[$index].upVote);
      console.log("当前用户点赞位置" + upVotesid.indexOf($userid));
      if (this.msg[$index].upVote) {
        upVotesid.splice(upVotesid.indexOf($userid), 1);
        var resultarr = upVotesid;
        $(".upVote_num")
          .eq($index)
          .text(resultarr.length);
      } else {
        upVotesid.push($userid);
        var resultarr = [...new Set(upVotesid)];
        $(".upVote_num")
          .eq($index)
          .text(resultarr.length);
      }
      const data = {
        upVotes: resultarr
      };
      Indicator.open();
      this.$axios
        .put("/answer/" + answerid, data)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (this.msg[$index].upVote) {
              this.msg[$index].upVote = false;
              this.upDatedata("取消点赞");
            } else {
              this.msg[$index].upVote = true;
              this.upDatedata("点赞成功");
            }
          }
        })
        .catch((error, errorcode) => {
          console.log(error);
        });
    },
    slideDown: function(event) {
      const index = event.currentTarget.dataset.index;
      localStorage.setItem("comment_index", index);
      const answerid = event.currentTarget.dataset.id;
      console.log("myanswerid", event.currentTarget.dataset.id);
      this.$router.push("/answercomment");
    },
    timeReplace: function(str) {
      return str.replace("T", " ").slice(0, str.indexOf("."));
    },
    gotoQuestion: function(event) {
      const topicid = event.currentTarget.dataset.tid; //问题id
      const readnum = event.currentTarget.dataset.rnum; //阅读数
      console.log(this.users.length);
      const answernum = this.users.length; //评论数
      const status = event.currentTarget.dataset.status; //状态
      // const time = event.currentTarget.dataset.time;//倒计时时间
      const title = event.currentTarget.dataset.title; //问题标题
      const userQuestion = {
        topicid: topicid,
        readnum: readnum,
        answernum: answernum,
        status: status,
        time: this.time,
        title: title
      };
      console.log(JSON.stringify(userQuestion));

      localStorage.setItem("userQuestion", JSON.stringify(userQuestion));

      this.$router.push("/answerQuestions");
    },
    // gotoShare:function(){
    //  wx.onMenuShareAppMessage({
    //    title: '这是个问题吗', // 分享标题
    //    desc: '回答问题', // 分享描述
    //    link: 'https://www.13cai.com.cn/get_wxlogin', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //    imgUrl: '../assets/images/logo.png', // 分享图标
    //    type: '', // 分享类型,music、video或link，不填默认为link
    //    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //    success: function () {
    //        // 用户确认分享后执行的回调函数
    //        console.log("成功");
    //    },
    //    cancel: function () {
    //      console.log("取消");
    //    // 用户取消分享后执行的回调函数
    //    }
    //  });
    // },
    deleteAnswer: function(event) {
      event.stopPropagation();
      const answerid = event.currentTarget.dataset.id;
      console.log(answerid);

      MessageBox.confirm("您确定要删除此回答?").then(
        action => {
          Indicator.open();
          this.$axios
            .delete("/answer/" + answerid)
            .then(res => {
              localStorage.setItem("isAnswer", false);
              this.upDatedata("删除成功");
              Indicator.close();
            })
            .catch((error, errorcode) => {
              Toast("网络错误，删除不成功");
              console.log(error);
            });
        },
        res => {
          console.log("取消");
        }
      );
    },
    upDatedata: function(title) {
      const query = localStorage.getItem("query"); //参数集合
      const queryobj = JSON.parse(query);
      this.topicid = queryobj.topicid;

      const topicid = this.topicid; //问题id
      const data = {
        search: JSON.stringify({ topic: topicid }),
        userid: $userid
      };
      if (localStorage.getItem("isAnswer")) {
        if (
          localStorage.getItem("isAnswer") == "false" ||
          localStorage.getItem("isAnswer") == "undefined"
        ) {
          console.log("没答题");
          this.isAnswer = false;
        } else {
          console.log("答题");
          this.isAnswer = true;
        }
      }
      Indicator.close();

      this.$axios
        .get("/answer", { params: data })
        .then(res => {
          if(title){
            Toast(title);
          }
          
          if (res.data && res.data.length) {
            this.msg = res.data;
            var grade, upvote, comments, isAnswer;
            //拿到所有答题者的id
            $.each(this.msg, function(i, v) {
              v.isMe = false;
              if (v.createdBy) {
                if (v.createdBy.id == $userid) {
                  grade = i;
                  v.isMe = true;
                  upvote = v.upVotes.length;
                  comments = v.comments.length;
                  isAnswer = true;
                }
              }
            });
            this.users = this.msg;
            console.log(this.users);
            this.answernum = this.users.length;
            this.mygrade = grade + 1;
            this.myupvote = upvote;
            this.mycomment = comments;
            this.isAnswer = isAnswer;
            localStorage.setItem("isAnswer", isAnswer);
          } else {
            this.users = res.data;
            console.log(this.users);
          }
        })
        .catch(error => {
          Toast({ message: "网络错误，操作不成功" });
          console.log(error);
        });
    }
  },
  mounted: function() {
    const query = localStorage.getItem("query"); //参数集合
    const queryobj = JSON.parse(query);
    this.title = queryobj.title;
    this.time = Number(queryobj.time);
    this.status = queryobj.status;

    this.$axios.get(`/topic/${queryobj.topicid}`).then(res => {
      this.stars = res.data.stars;
      this.stars.forEach(item => {
        if ($userid === item.id) {
          this.isMark = true;
        }
      });
    });

    if (localStorage.getItem("isAnswer")) {
      if (
        localStorage.getItem("isAnswer") == "false" ||
        localStorage.getItem("isAnswer") == "undefined"
      ) {
        console.log("没答题");
        this.isAnswer = false;
      } else {
        console.log("答题");
        this.isAnswer = true;
      }
    }

    this.readnum = Number(queryobj.readnum);
    this.topicid = queryobj.topicid;

    const topicid = this.topicid; //问题id

    const data = {
      search: JSON.stringify({
        topic: topicid
      }),
      userid: $userid
    };
    console.log(data);

    this.$axios
      .get("/answer", { params: data })
      .then(res => {
        Indicator.close();
        if (res.data && res.data.length) {
          this.msg = res.data;
          var grade, upvote, comments, isAnswer, myanswerid;
          //拿到所有答题者的id
          $.each(this.msg, function(i, v) {
            v.isMe = false;
            if (v.createdBy) {
              if (v.createdBy.id == $userid) {
                grade = i;
                v.isMe = true;
                upvote = v.upVotes.length;
                comments = v.comments.length;
                isAnswer = true;
                myanswerid = v.id;
              }
            }
          });
          this.users = this.msg;
          console.log(this.users);
          localStorage.setItem("answernum",this.users.length);
          this.answernum = this.users.length;
          this.mygrade = grade + 1;
          this.myupvote = upvote;
          this.mycomment = comments;
          this.isAnswer = isAnswer;
          localStorage.setItem("isAnswer", isAnswer);
          this.myanswerid = myanswerid;
          console.log("哈哈");
          console.log(this.myanswerid);
        }
      })
      .catch(error => {
        Indicator.close();
        Toast({ message: "网络错误，请刷新" });
        console.log(error);
      });

    //微信js-sdk
    // this.$axios.get('/wechat_share', { params: {url: window.location.href}}).then(res => {
    //     console.log(res);
    //     const appid = res.data.appId;
    //     const nonceStr = res.data.nonceStr;
    //     const signature = res.data.signature;
    //     const timestamp = res.data.timestamp;

    //     //配置微信js-sdk
    //     wx.config({
    //         debug: false, //
    //         appId: appid, // 必填，公众号的唯一标识
    //         timestamp: timestamp, // 必填，生成签名的时间戳
    //         nonceStr: nonceStr, // 必填，生成签名的随机串
    //         signature: signature, // 必填，签名
    //         jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    //     });

    //     wx.ready(function() {
    //         console.log("成功");
    //     });
    //     wx.error(function(res) {
    //         console.log("失败");
    //     });

    // }).catch((error) => {
    //     console.log(error);
    // })
  },
  beforeCreate: async function() {
    Indicator.open();
  },
  destroyed:function(){
    Indicator.close();
  }
};
</script>
<style lang="scss" scoped>
$x: 37.5;
.block {
  width: 375rem/$x;
  height: 50rem/$x;
}
.theme_b_mark {
  float: right;
  line-height: 24rem/$x;
  color: #666666;
}
.theme_b_sub > p {
  text-align: center;
  margin: 15px auto;
  width: 345rem/$x;
  padding: 10rem/$x 0;
  background: #fdd545;
  border-radius: 4px;
}
.theme_b_sub .has_answered {
  height: 100%;
  border-radius: 4px;
  background: #666666;
  color: #fff;
}
.countdown {
  font-family: STHeitiSC-Medium;
  font-size: 13px;
  color: #333333;
  margin-left: 15rem/$x;
  letter-spacing: -0.39px;
}
.counttest {
  font-family: STHeitiSC-Medium;
  font-size: 13px;
  color: #333333;
  letter-spacing: -0.39px;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 345rem/$x;
  height: 100%;
  margin: 0 auto;
  padding-top: 10rem/$x;
  box-sizing: border-box;
}

.counttest {
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

* {
  margin: 0;
  padding: 0;
}

.box {
  width: 345rem/$x;
  margin: 0 auto;
  padding-top: 10rem/$x;
  box-sizing: border-box;
}

.countdown {
  width: 110rem/$x;
  height: 30rem/$x;
  border-radius: 100rem/$x;
  background: #fdd545;
  line-height: 30rem/$x;
  margin-top: 10rem/$x;
  font-family: STHeitiSC-Medium;
  font-size: 13px;
  color: #333333;
  margin-left: 15rem/$x;
  letter-spacing: -0.39px;
}

.countdown > span:nth-of-type(1) {
  padding-left: 2px;
  font-size: 13px;
  letter-spacing: -0.39rem/$x;
}

.countdown > span:nth-of-type(2) {
  margin-left: -10rem/$x;
  font-size: 8rem/$x;
  letter-spacing: -0.39rem/$x;
}
.theme {
  width: 345rem/$x;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 #dddddd;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 15rem/$x;
}

.theme_t {
  font-family: STHeitiSC-Medium;
  font-size: 18rem/$x;
  letter-spacing: 0.22rem/$x;
  color-interpolation-filters: #333;
  text-align: left;
  font-weight: 500;
  color: #333333;
  letter-spacing: 0.22px;
  margin: 15rem/$x;
  font-weight: 500;
  line-height: 22rem/$x;
}

.theme_b {
  width: 100%;
  padding: 15rem/$x;
  box-sizing: border-box;
}

.theme_b_l {
  // width: 100rem/$x;
  float: left;
  height: 24rem/$x;
  color: #bdbdbd;
}

.theme_b_l > div:nth-of-type(1) {
  // width: 45rem/$x;
  float: left;
  line-height: 24rem/$x;
}

.theme_b_l > div:nth-of-type(2) {
  // width: 45rem/$x;
  float: left;
  line-height: 24rem/$x;
}

.theme_b_r {
  width: 76rem/$x;
  float: right;
  height: 24rem/$x;
  background: #fdd545;
  border-radius: 4px;
}

.theme_b_l > div:nth-of-type(2) {
  margin-left: 10rem/$x;
}

.icon-wode {
  font-size: 12px;
  color: #bdbdbd;
}

.icon-pinglun {
  font-size: 12px;
  color: #bdbdbd;
}

.icon-dianzan,
.icon-dianzan1 {
  font-size: 12px;
  color: #bdbdbd;
}

ul,
li {
  list-style: none;
}

.ctn > li {
  width: 345rem/$x;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 #dddddd;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 15rem/$x;
}

.ctn_l {
  position: relative;
  width: 62rem/$x;
  float: left;
}

.ctn_l > i {
  width: 17rem/$x;
  height: 17rem/$x;
  background: #fdd545;
  display: inline-block;
  border-radius: 50%;
  position: absolute;
  top: 10rem/$x;
  left: 12rem/$x;
  line-height: 18rem/$x;
}

.ctn_l > img {
  width: 32rem/$x;
  height: 32rem/$x;
  background: #fdd545;
  display: inline-block;
  border-radius: 50%;
  margin-left: 15rem/$x;
  margin-top: 15rem/$x;
}

.ctn_r {
  width: 283rem/$x;
  float: left;
  text-align: left;
  overflow: hidden;
  margin-top: 15rem/$x;
}

.ctn_r > div:nth-of-type(1) > span {
  font-family: STHeitiSC-Medium;
  font-size: 16rem/$x;
  color: #333333;
  letter-spacing: 0.19px;
}

.ctn_r > div:nth-of-type(1) > i {
  float: right;
  color: #fdd545;
  margin-right: 15rem/$x;
  padding: 2rem/$x;
}

.ctn_r > div:nth-of-type(1) > i:nth-of-type(2) {
  float: right;
  color: #fdd545;
  margin-right: 5rem/$x;
}

.ctn_r > p:nth-of-type(1) {
  width: 268rem/$x;
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0.17px;
  margin-top: 10rem/$x;
}

.ctn_r > div:nth-of-type(2) {
  margin-top: 16rem/$x;
}

.ctn_r > div:nth-of-type(2) > div:nth-of-type(1) {
  float: left;
  font-family: STHeitiSC-Medium;
  font-size: 12rem/$x;
  color: #bdbdbd;
  letter-spacing: 0.14rem/$x;
  padding-bottom: 15rem/$x;
}

.ctn_r > div:nth-of-type(2) > div:nth-of-type(2) {
  float: right;
}

.ctn_r > div:nth-of-type(2) > div:nth-of-type(2) > div {
  float: left;
  margin-right: 15rem/$x;
  color: #bdbdbd;
  width: 36rem/$x;
}

.countend {
  background: #666666;
  border-radius: 100rem/$x;
}

.countend > span {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: -0.39px;
}

.slide {
  margin-top: 0;
  border-radius: 0;
  background: #fafafa;
}

.slide_l {
  float: left;
  text-align: left;
  width: 62rem/$x;
}

.slide_l > img {
  width: 32rem/$x;
  height: 32rem/$x;
  background: #fdd545;
  display: inline-block;
  border-radius: 50%;
  margin: 15rem/$x;
}

.slide_r {
  float: left;
  width: 283rem/$x;
}

.slide_rt {
  width: 283rem/$x;
  margin-top: 15rem/$x;
}

.slide_rt > div:nth-of-type(1) {
  font-family: STHeitiSC-Medium;
  font-size: 12px;
  color: #333333;
  letter-spacing: 0.14px;
  float: left;
}

.slide_rt > div:nth-of-type(2) {
  font-family: STHeitiSC-Medium;
  font-size: 12px;
  color: #bdbdbd;
  letter-spacing: 0.14px;
  float: right;
  margin-right: 15rem/$x;
}

.slide_rb {
  text-align: left;
  font-family: STHeitiSC-Medium;
  font-size: 12px;
  color: #666666;
  letter-spacing: 0.14px;
  margin-top: 10rem/$x;
}

.hide {
  display: none;
}

.delete_pinglun {
  font-family: STHeitiSC-Medium;
  font-size: 12px;
  color: #1e88e5;
  letter-spacing: 0.14px;
}

.int {
  width: 345rem/$x;
  height: 33rem/$x;
  position: fixed;
  bottom: 33rem/$x;
  left: 15rem/$x;
}

.int_l {
  float: left;
  background: #f4f4f4;
  // border-right:1px solid #000;
  width: 54rem/$x;
  height: 33rem/$x;
}

.int_m {
  float: left;
  width: 207rem/$x;
  background: #f4f4f4;
  height: 33rem/$x;
  outline: medium;
}

.int_r {
  float: left;
  background: #f4f4f4;
  width: 46rem/$x;
  height: 35rem/$x;
}
.mylist_wrap {
  width: 100%;
  height: 46rem/$x;
  padding: 0 15rem/$x;
  position: fixed;
  left: 0;
  bottom: 20rem/$x;
  box-sizing: border-box;
}
.mylist {
  background: #fdd545;
  box-shadow: 0 2px 6px 0 #dddddd;
  border-radius: 10px;
  width: 100%;
  height: 46rem/$x;
  margin: 0 auto;
  line-height: 46rem/$x;
  text-align: left;
  padding: 0 17rem/$x 0 10rem/$x;
  box-sizing: border-box;
}

.mylist > :nth-child(1) {
  color: #333333;
  font-size: 24rem/$x;
  vertical-align: middle;
  margin-right: 15rem/$x;
  float: left;
}

.mylist > :nth-child(2) {
  color: #333333;
  font-family: STHeitiSC-Medium;
  font-size: 18px;
  color: #333333;
  letter-spacing: 0.22px;
  float: left;
  margin-right: 10rem/$x;
}

.mylist > :nth-child(3) {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
  float: left;
}

.my_pinlun {
  color: #333333;
  float: right;
  margin-left: 22rem/$x;
  i {
    color: #333333;
  }
  span {
    margin-left: 5rem/$x;
  }
}

.my_dianzan {
  font-family: STHeitiSC-Medium;
  font-size: 12px;
  color: #333333;
  letter-spacing: -0.26px;
  float: right;
  i {
    color: #333333;
  }
  span {
    margin-left: 5rem/$x;
  }
}
.go_answer {
  float: right;
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
  cursor: pointer;
}

.icon_eye {
  // width: 36rem/$x;
}
.icon_eye > i:nth-of-type(1) {
  font-size: 14px;
}
.icon_eye > span:nth-of-type(1) {
  padding-left: 8rem/$x;
}
.icon_pin {
  // width: 36rem/$x;
}
.icon_pin > span:nth-of-type(1) {
  padding-left: 8rem/$x;
}
</style>

