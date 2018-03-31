<template>
  <div class="box">
    <scroller>
      <div class="countdown"  v-if="status==1">
            <span class="counttest">倒计时</span>
            <span>
                <countdown :time="time" class="countdown">
                    <template slot-scope="props" >{{props.hours}}:{{ props.minutes }}:{{ props.seconds }} </template>
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
                      <i class="iconfont icon-xianshimima"></i>
                      <span>{{readnum}}</span>
                  </div>
                  <div class="icon_pin">
                      <i class="iconfont icon-pinglun"></i>
                      <span>{{answernum}}</span>
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
          <li class="clearfix pin_list" v-for="(item,index) in list" :key="index">
            <div class="answer_wrap">
              <div class="ctn_l">
                  <i>{{answerindex+1}}</i>
                  <img v-if="!Boolean(item.createdBy)" src="../assets/images/logo.png" alt="1">
                  <img v-else-if="!Boolean(item.createdBy.avatarUrl)" src="../assets/images/logo.png" alt="1">
                  <img v-else :src="item.createdBy.avatarUrl" alt="2">
              </div>
              <div class="ctn_r">
                  <div>
                      <span v-if="!Boolean(item.createdBy)">{{'匿名用户'}}</span>
                      <span v-else-if="!Boolean(item.createdBy.nickName)">{{'匿名用户'}}</span>
                      <span v-else>{{item.createdBy.nickName}}</span>
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
                          <span class="delete_pinglun" v-show="item.isMe" @click="deleteAnswer()" :data-id="item.id">删除</span>
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

                          <div >
                              <i class="iconfont icon-pinglun"></i>
                              <span class="comment_num">{{item.comments.length}}</span>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
            <div class="slide clearfix" v-for="i in comments" :key="i.id">
              <div class="slide_l">
                  <img v-if="Boolean(i.createdBy.avatarUrl)" :src="i.createdBy.avatarUrl" alt="">
                  <img v-else src="../assets/images/logo.png" alt="">
              </div>
              <div class="slide_r">
                  <div class="slide_rt clearfix">
                      <div>
                          <span v-if="!Boolean(i.createdBy.nickName)">{{'匿名用户'}}</span>
                          <span v-else>{{i.createdBy.nickName}}</span>
                      </div>
                      <div>
                          <span v-show="i.isMe" class="delete_pinglun" @click="deletePinlun()" :data-id="i.id" :data-index="index">删除</span>
                          <span>{{new Date(i.createdAt).toLocaleDateString().replace(/\//g,"-")}} {{new Date(i.createdAt).toLocaleTimeString().replace(/[\u4E00-\u9FA5]/g,'')}}</span>
                      </div>
                  </div>
                  <p class="slide_rb">
                      {{i.body}}
                  </p>
              </div>
            </div>
          </li>
      </ul>
      <div class="block"></div>
    </scroller>
      <div class="comment_box">
        <input type="text" name="" class="comment_input" placeholder=" 请输入评论..." v-model="message" :focus="inputFocus()" ref="comment_input">
        <button type="button" class="send_com" @click="gotoComment($event)" :data-message="message" >发布</button>
        
      </div>
  </div>
</template>
<script>
//引入微信js-sdk
// import wx from 'weixin-js-sdk'
import "mint-ui/lib/style.css";
import { MessageBox, Toast, Indicator } from "mint-ui";
const $userid = localStorage.getItem("userid"); //用户id
// const $userid = '5abcbe54587bde833d1bdffd';//用户id
export default {
  name: "answercomment",
  data() {
    return {
      comments: [],
      answerindex: 0,
      clist: [],
      list: [], //答案数组
      body: "", //答案
      answerid: "", //答案ID
      message: "",
      status: "",
      topicId: "",
      time: 0,
      title: "",
      readnum: "",
      answernum: "",
      defaulturl: "",
      isAnswer: false,
      stars: [],
      isMark: false
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
    inputFocus: function() {
      setTimeout(function() {
        window.scrollTo(0, document.body.clientHeight);
      }, 500);
    },
    giveStar: function(event) {
      const answerid = event.currentTarget.dataset.id;
      const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
      const stars = this.list[$index].stars;
      const starsid = [];
      //循环当前评论收藏的信息，拿到此条评论的所有id
      for (let i = 0; i < stars.length; i++) {
        starsid.push(stars[i].id);
      }
      if (this.list[$index].isStar) {
        starsid.splice(starsid.indexOf($userid), 1);
        var resultarr = starsid;
        console.log(resultarr);
      } else {
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
            if (this.list[$index].isStar) {
              this.upDatedata("取消收藏");
              this.list[$index].isStar = false;
            } else {
              this.upDatedata("收藏成功");
              this.list[$index].isStar = true;
            }
          }
        })
        .catch((error, errorcode) => {
          console.log(error);
        });
    },
    giveLike: function(event) {
      const answerid = event.currentTarget.dataset.id;
      const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
      const upVotes = this.list[$index].upVotes;
      const upVotesid = [];
      //循环当前评论收藏的信息，拿到此条评论的所有id
      for (let i = 0; i < upVotes.length; i++) {
        upVotesid.push(upVotes[i].id);
      }
      if (this.list[$index].upVote) {
        upVotesid.splice(upVotesid.indexOf($userid), 1);
        console.log("取消点赞");
        var resultarr = upVotesid;
        console.log(resultarr);
      } else {
        upVotesid.push($userid);
        console.log("点赞");
        var resultarr = [...new Set(upVotesid)];
        console.log(resultarr);
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
            if (this.list[$index].upVote) {
              this.list[$index].upVote = false;
              this.upDatedata("取消点赞");
              $(".upVote_num")
                .eq($index)
                .text(resultarr.length);
            } else {
              this.upDatedata("点赞成功");
              this.list[$index].upVote = true;
              upVotesid.push($userid);
              $(".upVote_num")
                .eq($index)
                .text(resultarr.length);
            }
          }
        })
        .catch((error, errorcode) => {
          console.log(error);
        });
    },
    timeReplace: function(str) {
      return str.replace("T", " ").slice(0, str.indexOf("."));
    },
    // gotoShare:function(){
    //   wx.onMenuShareAppMessage({
    //     title: '这是个问题吗', // 分享标题
    //     desc: '回答问题', // 分享描述
    //     link: 'https://www.13cai.com.cn/get_wxlogin', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: '../assets/images/logo.png', // 分享图标
    //     type: '', // 分享类型,music、video或link，不填默认为link
    //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //     success: function () {
    //         // 用户确认分享后执行的回调函数
    //         console.log("成功");
    //     },
    //     cancel: function () {
    //       console.log("取消");
    //     // 用户取消分享后执行的回调函数
    //     }
    //   });
    // },
    gotoQuestion: function(event) {
      const topicid = event.currentTarget.dataset.tid; //问题id
      const readnum = event.currentTarget.dataset.rnum; //阅读数
      const answernum = event.currentTarget.dataset.anum; //评论数
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
    deleteAnswer: function() {
      const answerid = event.currentTarget.dataset.id;
      MessageBox.confirm("您确定要删除此回答?").then(
        action => {
          Indicator.open();
          this.$axios
            .delete("/answer/" + answerid)
            .then(res => {
              Indicator.close();
              localStorage.setItem("isAnswer", false);
              this.$router.replace("/answerDetail");
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
    deletePinlun: function() {
      const commentid = event.currentTarget.dataset.id;
      const answerindex = event.currentTarget.dataset.index; //所评论的问题索引
      MessageBox.confirm("您确定要删除此评论?").then(
        action => {
          Indicator.open();
          this.$axios
            .delete("/comment/" + commentid)
            .then(res => {
              let comment_num = $(".pin_list")
                .eq(answerindex)
                .find(".comment_num")
                .text();
              comment_num -= 1;
              $(".pin_list")
                .eq(answerindex)
                .find(".comment_num")
                .text(comment_num);
              this.upDatedata("删除成功");
            })
            .catch((error, errorcode) => {
              console.log(error);
            });
        },
        res => {
          console.log("取消");
        }
      );
    },
    upDatedata: function(title) {
      this.message = "";

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
      const query = localStorage.getItem("query"); //参数集合
      const queryobj = JSON.parse(query);
      this.topicid = queryobj.topicid;
      const topicid = this.topicid; //问题id
      const data = {
        search: JSON.stringify({ topic: topicid }),
        userid: $userid
      };
      this.$axios
        .get("/answer", { params: data })
        .then(res => {
          const cindex = localStorage.getItem("comment_index");
          this.answerindex = Number(cindex);
          this.list = res.data.splice(cindex, 1);
          //拿到所有答题者的id
          $.each(this.list, function(i, v) {
            v.isMe = false;

            this.body = v.body;
            if (v.createdBy) {
              if (v.createdBy.id == $userid) {
                //判断答题者的id中是否有自己
                v.isMe = true;
                localStorage.getItem("isAnswer", true);
              }
            }
          });
          this.clist = this.list;
          this.answerid = this.list[0].id;
          //根据答案ID获取评论
          const search_comment = {
            search: {
              answer: this.list[0].id,
              sort: {
                createdAt: 0
              }
            }
          };
          this.$axios
            .get("/comment", { params: search_comment })
            .then(res => {
              Indicator.close();
              Toast(title);
              console.log(res);
              if (res.status == 200) {
                this.comments = res.data;
                $.each(res.data, function(i, v) {
                  //循环评论判断评论者的ID 是否是自己
                  v.isMe = false;
                  if (v.createdBy.id == $userid) {
                    v.isMe = true;
                  }
                });
                Indicator.close();
              }
            })
            .catch(error => {});
        })
        .catch(error => {
          Indicator.close();
          Toast({ message: "网络错误，操作不成功" });
          console.log(error);
        });
    },
    //评论答案
    gotoComment: function(event) {
      if (!$userid) {
        MessageBox.alert("您还未关注筋灵十三猜公众号，请先关注公众号").then(
          action => {}
        );
        return false;
      }
      //提交答案不能为空
      if (!this.message) {
        Toast("评论不能为空");
        return false;
      }
      console.log(this.answerid);
      const data = {
        body: this.message,
        answer: this.answerid,
        createdBy: $userid
      };
      console.log(data);
      Indicator.open();
      this.$axios
        .post("/comment", data)
        .then(res => {
          console.log(res.data);
          this.upDatedata("发布成功");
          Indicator.close();
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
          Toast("操作不成功");
        });
    }
  },
  mounted() {
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
    console.log(this.isAnswer);
    const query = localStorage.getItem("query"); //参数集合
    const queryobj = JSON.parse(query);
    this.title = queryobj.title;
    this.time = Number(queryobj.time);
    this.status = queryobj.status;
    this.readnum = Number(queryobj.readnum);
    if (localStorage.getItem("answernum")) {
      this.answernum = localStorage.getItem("answernum");
    } else {
      localStorage.setItem("answernum", Number(queryobj.answernum));
      this.answernum = localStorage.getItem("answernum");
    }

    this.topicid = queryobj.topicid;

    this.$axios.get(`/topic/${queryobj.topicid}`).then(res => {
      this.stars = res.data.stars;
      this.stars.forEach(item => {
        if ($userid === item.id) {
          this.isMark = true;
        }
      });
    });

    const topicid = this.topicid; //问题id
    const data = {
      search: JSON.stringify({ topic: topicid }),
      userid: $userid
    };
    //获取所要评论的答案
    this.$axios
      .get("/answer", { params: data })
      .then(res => {
        console.log(localStorage.getItem("comment_index"));
        const cindex = localStorage.getItem("comment_index");
        this.answerindex = Number(cindex);
        this.list = res.data.splice(cindex, 1);

        var isAnswer;
        //拿到所有答题者的id
        $.each(this.list, function(i, v) {
          v.isMe = false;
          this.answerid = v.id;
          this.body = v.body;
          if (v.createdBy) {
            if (v.createdBy.id == $userid) {
              //判断答题者的id中是否有自己
              v.isMe = true;
              localStorage.getItem("isAnswer", true);
            }
          }
        });
        this.answerid = this.list[0].id;
        console.log(this.isAnswer);
        //根据答案ID获取评论
        var search_comment = {
          search: {
            answer: this.list[0].id
          }
        };
        console.log(search_comment);
        this.$axios
          .get("/comment", { params: search_comment })
          .then(res => {
            if (res.status == 200) {
              Indicator.close();
              $.each(res.data, function(i, v) {
                //循环评论判断评论者的ID 是否是自己
                v.isMe = false;
                if (v.createdBy.id == $userid) {
                  v.isMe = true;
                }
              });
              this.comments = res.data;
              console.log(this.comments);
            }
          })
          .catch(error => {});
      })
      .catch(error => {
        Indicator.close();
        Toast("网络错误请刷新");
        console.log(error);
      });

    //微信js-sdk
    // this.$axios.get('/wechat_share',{params:{url:window.location.href}}).then(res=>{
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
    //         signature: signature,// 必填，签名
    //         jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    //     });

    //     wx.ready(function(){
    //         console.log("成功");
    //     });
    //     wx.error(function(res){
    //         console.log("失败");
    //     });

    // }).catch((error)=>{
    //   console.log(error);
    // })
  },
  beforeCreate: function() {
    Indicator.open();
    console.log(this.isAnswer);
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
  },
  created() {
    //获取页面高度
    var clientHeight = document.body.clientHeight;
    console.log(clientHeight)
    //设置监听聚焦事件
    document.body.addEventListener(
      "focus",
      function(e) {
        var focusElem = document.getElementById("input");
      },
      true
    );
    //设置监听窗口变化时间
    window.addEventListener("resize", function() {
      if (focusElem && document.body.clientHeight < clientHeight) {
        //使用scrollIntoView方法来控制输入框
        focusElem.scrollIntoView(false);
      }
    });
  }
};
</script>
<style lang="scss" scoped>
$x: 37.5;
.error_tip {
  margin-top: 20rem/$x;
}
.theme_b_mark {
  float: right;
  line-height: 0.64rem;
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
.comment_box {
  width: 100%;
  height: 55rem/$x;
  background: #fff;
  padding: 10rem/$x;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0 1px 5px 2px rgba(204, 204, 204, 0.25);
  display: flex;
  .comment_input {
    flex: 1;
    font-family: STHeitiSC-Medium;
    font-size: 14px;
    color: #999999;
    letter-spacing: 0.17px;
    padding-left: 15rem/$x;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
    outline: none;
    caret-color: #fbce01;
  }
  //   .comment_input:focus{
  //       position: absolute;
  //       bottom: 200rem/$x;
  //   }
  .send_com {
    width: 65rem/$x;
    height: 36rem/$x;
    background: #fbce01;
    border: none;
    border-radius: 5px;
    float: right;
    font-family: PingFangHK-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0.17px;
    margin-left: 10rem/$x;
  }
}

.countdown {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: -0.39px;
  margin: 10rem/$x 0 10rem/$x 15rem/$x;
}
.counttest {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: -0.39px;
}
.answer_wrap {
  height: auto;
  overflow: hidden;
}
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.box {
  width: 345rem/$x;
  height: 100%;
  margin: 0 auto;
  padding-top: 10rem/$x;
  box-sizing: border-box;
  padding-bottom: 65rem/$x;
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
  font-size: 14rem/$x;
  letter-spacing: -0.39rem/$x;
}
.countdown > span:nth-of-type(2) {
  font-size: 14rem/$x;
  letter-spacing: -0.39rem/$x;
  margin-left: -10rem/$x;
}

.theme {
  width: 345rem/$x;
  height: 100%;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 #dddddd;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 15rem/$x;
  margin: 0 auto;
}
.theme_t {
  font-family: STHeitiSC-Medium;
  font-size: 18rem/$x;
  letter-spacing: 0.22rem/$x;
  color-interpolation-filters: #333;
  text-align: left;
  margin-left: 15rem/$x;
  margin-top: 15rem/$x;
}
.theme_b {
  width: 100%;
  padding: 0.4rem;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.theme_b_l {
  width: 100rem/$x;
  float: left;
  height: 24rem/$x;
  color: #bdbdbd;
}
.theme_b_l > div:nth-of-type(1) {
  width: 45rem/$x;
  float: left;
  line-height: 24rem/$x;
}
.theme_b_l > div:nth-of-type(2) {
  width: 45rem/$x;
  float: left;
  line-height: 24rem/$x;
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
  margin-bottom: 55rem/$x;
}
.ctn_l {
  position: relative;
  width: 62rem/$x;
  float: left;
}
.ctn_l > i {
  width: 17rem/$x;
  height: 17rem/$x;
  line-height: 17rem/$x;
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
.block {
  width: 375rem/$x;
  height: 50rem/$x;
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
