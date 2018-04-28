<template>
  <div class="box">
    <scroller class="box_wrap">
      <!-- <div class="countdown"  v-if="status==1">
              <span class="counttest">倒计时</span>
              <span>
                  <countdown :time="time" class="countdown">
                      <template slot-scope="props" >{{props.hours}}:{{ props.minutes }}:{{ props.seconds }}
</template>
                </countdown>
            </span>
      </div> -->
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
          <p v-if="!isAnswer" @click="gotoQuestion($event)" :data-title="title" :data-rnum="readnum" :data-anum="answernum" :data-status="status" :data-tid="topicid" :data-time="time">立即回答</p>
          <p v-else class="has_answered">已回答</p>
      </div>
      <ul class="ctn">
          <li class="clearfix pin_list" >
            <div class="answer_wrap">
              <div class="ctn_l">
                  <i>{{answerindex}}</i>
                  <img v-if="!Boolean(list.createdBy)" src="../assets/images/logo.png" alt="1">
                  <img v-else-if="!Boolean(list.createdBy.avatarUrl)" src="../assets/images/logo.png" alt="1">
                  <img v-else :src="list.createdBy.avatarUrl" alt="2">
              </div>
              <div class="ctn_r">
                  <div>
                      <span v-if="!Boolean(list.createdBy)">{{'匿名用户'}}</span>
                      <span v-else-if="!Boolean(list.createdBy.nickName)">{{'匿名用户'}}</span>
                      <span v-else>{{list.createdBy.nickName}}</span>
                      <!-- <i class="iconfont icon-fenxiang" @click="gotoShare($event)"></i> -->
                      <i class="iconfont icon-shoucang2" v-if="list.isStar == true" @click="giveStar($event)" :data-id="list.id" ></i>
                      <i class="iconfont icon-shoucang1" v-else @click="giveStar($event)" :data-id="list.id"></i>
                  </div>
                  <p>
                      {{list.body}}
                  </p>
                  <div class="clearfix">
                      <div>
                          <span>{{new Date(list.createdAt).toLocaleDateString().replace(/\//g,"-")}} {{new Date(list.createdAt).toLocaleTimeString().replace(/[\u4E00-\u9FA5]/g,'')}}</span>
                          <span class="delete_pinglun" v-show="list.isMe" @click="deleteAnswer()" :data-id="list.id">删除</span>
                      </div>
                      <div class="clearfix">
                          <div v-if="status == 1">
                              <i class="iconfont icon-dianzan1" v-if="list.upVote == true" @click="giveLike($event)" :data-id="list.id"></i>
                              <i class="iconfont icon-dianzan" v-else @click="giveLike($event)" :data-id="list.id" ></i>
                              <span class="upVote_num">{{list.upVotes && list.upVotes.length || 0}}</span>
                          </div>
                          <div v-else @click="endTip($event)">
                              <i class="iconfont icon-dianzan"></i>
                              <span class="upVote_num">{{list.upVotes && list.upVotes.length || 0}}</span>
                          </div>

                          <div >
                              <i class="iconfont icon-pinglun"></i>
                              <span class="comment_num">{{list.comments && list.comments.length || 0}}</span>
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
                          <span v-show="i.isMe" class="delete_pinglun" @click="deletePinlun()" :data-id="i.id" >删除</span>
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
        <input type="text" name="" class="comment_input" placeholder=" 请输入评论..." v-model="message" @focus="inputFocus()" @blur="inputBlur()" ref="comment_input">
        <button type="button" class="send_com" @click="gotoComment($event)" :data-message="message" >发布</button>
        
      </div>
  </div>
</template>

<script>
  //引入微信js-sdk
  // import wx from 'weixin-js-sdk'
  import "mint-ui/lib/style.css";
  import {
    MessageBox,
    Toast,
    Indicator
  } from "mint-ui";
  import sharewechat from "../router/sharewechat";
  var interval;
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
        isMark: false,
        flag: false
      };
    },
    methods: {
      starAnswer: function(event) {
        let uniqueid = localStorage.getItem("uniqueid");
        this.$axios.get("/isflow" + '?uniqueid=' + uniqueid).then(res => {
          if (res.data.subscribe == 0) {
            MessageBox.alert('有趣、有钱、又有料，你还在犹豫神马？还不快关注？').then(action => {
              return this.flag;
            })
          } else {
            const {
              status,
              title
            } = this.$data;
            this.topicid = this.$route.params.topicid;
            console.log(this.topicid)
            const stars_ = [];
            if (this.stars && this.stars.length) {
              this.stars.forEach(item => {
                if (localStorage.getItem("userid") !== item.id) {
                  stars_.push(item.id);
                }
              });
              if (stars_.length === this.stars.length) {
                stars_.push(localStorage.getItem("userid"));
              }
            } else {
              stars_.push(localStorage.getItem("userid"));
            }
            const res = {
              status: Number(status),
              title,
              stars: stars_
            };
  
            this.$axios.put(`/topic/${this.topicid}`, res).then((data) => {
              console.log(data.status)
              if (data.status === 200) {
  
                if (this.isMark) {
                  this.upDatedata("取消收藏");
                  this.isMark = false;
                } else {
                  this.upDatedata("收藏成功");
                  this.isMark = true;
                }
              }
            });
          }
        })
  
      },
      endTip: function(event) {
        event.stopPropagation();
        MessageBox.alert("该场次已结束");
      },
      inputFocus: function() {
        interval = setInterval(function() { //设置一个计时器，时间设置与软键盘弹出所需时间相近
          document.body.scrollTop = document.body.scrollHeight; //获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
        }, 100);
      },
      inputBlur: function() {
        clearInterval(interval); //清除计时器
        document.body.scrollTop = document.body.scrollTop; //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
      },
      giveStar: function(event) {
        let uniqueid = localStorage.getItem("uniqueid");
        this.$axios.get("/isflow" + '?uniqueid=' + uniqueid).then(res => {
          if (res.data.subscribe == 0) {
            MessageBox.alert('有趣、有钱、又有料，你还在犹豫神马？还不快关注？').then(action => {
              return this.flag;
            })
          } else {
            event.stopPropagation();
            const answerid = event.currentTarget.dataset.id;
            const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
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
              starsid.splice(starsid.indexOf(localStorage.getItem("userid")), 1);
              var resultarr = starsid;
              console.log(resultarr);
            } else {
              console.log("收藏");
              starsid.push(localStorage.getItem("userid"));
              var resultarr = [...new Set(starsid)];
              console.log(resultarr);
            }
            const data = {
              stars: resultarr
            };
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
          }
        })
  
      },
      giveLike: function(event) {
        let uniqueid = localStorage.getItem("uniqueid");
        this.$axios.get("/isflow" + '?uniqueid=' + uniqueid).then(res => {
          if (res.data.subscribe == 0) {
            MessageBox.alert('有趣、有钱、又有料，你还在犹豫神马？还不快关注？').then(action => {
              return this.flag;
            })
          } else {
            event.stopPropagation();
            console.log(event.currentTarget.dataset);
            const answerid = event.currentTarget.dataset.id;
            console.log("点赞id |" + answerid);
            const $index = event.currentTarget.dataset.index; //所点击收藏的评论索引
            console.log(this.msg[$index].upVotes);
            const upVotes = this.msg[$index].upVotes;
            const upVotesid = [];
            //循环当前评论收藏的信息，拿到此条评论的所有id
            for (let i = 0; i < upVotes.length; i++) {
              upVotesid.push(upVotes[i].id);
            }
            console.log(this.msg[$index].upVote);
            console.log("当前用户点赞位置" + upVotesid.indexOf(localStorage.getItem("userid")));
            if (this.msg[$index].upVote) {
              upVotesid.splice(upVotesid.indexOf(localStorage.getItem("userid")), 1);
              var resultarr = upVotesid;
              $(".upVote_num")
                .eq($index)
                .text(resultarr.length);
            } else {
              upVotesid.push(localStorage.getItem("userid"));
              var resultarr = [...new Set(upVotesid)];
              $(".upVote_num")
                .eq($index)
                .text(resultarr.length);
            }
            const data = {
              upVotes: resultarr
            };
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
          }
        })
      },
      gotoQuestion: function(event) {
        const topicid = event.currentTarget.dataset.tid; //问题id
        this.$router.push("/answerQuestions/2/" + topicid);
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
                this.$router.back(-1);
              })
              .catch((error, errorcode) => {
                let instance = Toast("网络错误，删除不成功");
                setTimeout(() => {
                  instance.close();
                }, 1000);
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
        MessageBox.confirm("您确定要删除此评论?").then(
          action => {
            Indicator.open();
            this.$axios
              .delete("/comment/" + commentid)
              .then(res => {
                Indicator.close();
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
        if (title) {
          let instance = Toast(title);
          setTimeout(() => {
            instance.close();
          }, 1000);
        }
        this.message = "";
        this.topicid = this.$route.params.topicid;
        this.$axios.get(`/topic/${this.topicid}`).then(res => {
          this.title = res.data.title;
          this.time = res.data.second;
          this.status = res.data.status;
          this.readnum = res.data.readNum;
          this.answernum = res.data.messageNum;
          this.stars = res.data.stars;
          this.stars.forEach(item => {
            if (localStorage.getItem("userid") === item.id) {
              this.isMark = true;
            }
          });
        });
        if (localStorage.getItem("isAnswer")) {
          if (
            localStorage.getItem("isAnswer") === "false" ||
            localStorage.getItem("isAnswer") === "undefined"
          ) {
            console.log("没答题");
            this.isAnswer = false;
          } else {
            console.log("答题");
            this.isAnswer = true;
          }
        }
        const answerid = this.$route.params.answerid; //回答id
        //获取所要评论的答案
        this.$axios.get("/answer/" + answerid, {
          params: {
            userid: localStorage.getItem("userid")
          }
        }).then(res => {
          this.list = res.data;
          if (res.status == 200) {
            this.list = res.data;
            if (this.list.createdBy.id === localStorage.getItem("userid")) {
              console.log("享");
              this.list.isMe = true;
            }
          }
        }).catch(error => {
          Indicator.close();
          console.log(error);
        });
        //根据答案ID获取评论
        var search_comment = {
          search: {
            answer: answerid
          },
          sort: {
            createdAt: 0
          }
        };
        this.$axios.get("/comment", {
          params: search_comment
        }).then(res => {
          if (res.status == 200) {
            Indicator.close();
            $.each(res.data, function(i, v) {
              //循环评论判断评论者的ID 是否是自己
              v.isMe = false;
              if (v.createdBy.id == localStorage.getItem("userid")) {
                v.isMe = true;
              }
            });
            this.comments = res.data;
            console.log(this.comments);
          }
        }).catch(error => {});
  
      },
      //评论答案
      gotoComment: function(event) {
  
        Indicator.open();
        if (!localStorage.getItem("userid")) {
          MessageBox.alert("您还未关注筋灵十三猜公众号，请先关注公众号").then(
            action => {}
          );
          return false;
        }
        提交答案不能为空
        if (!this.message) {
          let instance = Toast("评论不能为空");
          setTimeout(() => {
            instance.close();
          }, 1000);
          return false;
        }
        console.log(this.answerid);
        const data = {
          body: this.message,
          answer: this.$route.params.answerid,
          createdBy: localStorage.getItem("userid"),
          username: localStorage.getItem("nickname")
        };
        console.log(data);
  
        this.$axios
          .post("/comment", data)
          .then(res => {
            console.log(res.data);
            this.upDatedata("发布成功");
            Indicator.close();
          })
          .catch((error) => {
            Indicator.close();
            if (error.response.data.code == 505) {
              console.log("敏感");
              let instance = Toast('提交含有敏感词， 请检查提交文本');
              setTimeout(() => {
                instance.close();
              }, 1000);
  
            } else {
              console.log("不敏感");
              let instance = Toast('网络错误，请刷新');
              setTimeout(() => {
                instance.close();
              }, 1000);
            }
          });
      }
  
  
    },
    mounted() {
      const answerid = this.$route.params.answerid; //回答id
      this.answerindex = this.$route.params.answerindex;
      if (localStorage.getItem("isAnswer")) {
        if (
          localStorage.getItem("isAnswer") === "false" ||
          localStorage.getItem("isAnswer") === "undefined"
        ) {
          console.log("没答题");
          this.isAnswer = false;
        } else {
          console.log("答题");
          this.isAnswer = true;
        }
      }
      this.topicid = this.$route.params.topicid;
      this.$axios.get(`/topic/${this.topicid}`).then(res => {
        this.title = res.data.title;
        this.time = res.data.second;
        this.status = res.data.status;
        this.readnum = res.data.readNum;
        this.answernum = res.data.messageNum;
        this.stars = res.data.stars;
        this.stars.forEach(item => {
          if (localStorage.getItem("userid") === item.id) {
            this.isMark = true;
          }
        });
      });
  
      //根据id获取所要评论的答案
      this.$axios.get("/answer/" + answerid, {
        params: {
          userid: localStorage.getItem("userid")
        }
      }).then(res => {
        console.log(res);
        this.list = res.data;
        if (res.status == 200) {
          this.list = res.data;
          console.log(this.list.createdBy.id);
          console.log(localStorage.getItem("userid"))
          this.list.isMe = false;
          if (this.list.createdBy.id === localStorage.getItem("userid")) {
            console.log("享");
            this.list.isMe = true;
          }
  
          console.log(this.list);
        }
      }).catch(error => {
        Indicator.close();
        console.log(error);
      });
      //根据答案ID获取评论
      var search_comment = {
        search: {
          answer: answerid
        },
        sort: {
          createdAt: 0
        }
      };
      console.log(search_comment);
      this.$axios.get("/comment", {
        params: search_comment
      }).then(res => {
        if (res.status == 200) {
          Indicator.close();
          $.each(res.data, function(i, v) {
            //循环评论判断评论者的ID 是否是自己
            v.isMe = false;
            if (v.createdBy.id == localStorage.getItem("userid")) {
              v.isMe = true;
            }
          });
          this.comments = res.data;
          console.log(this.comments);
        }
      }).catch(error => {});
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
    }
  };
</script>

<style lang="scss" scoped>
  $x: 37.5;
  .box_wrap {
    box-sizing: border-box;
    padding-bottom: 60rem/$x;
    z-index: 3;
    background: #FFFEF7;
  }
  
  .error_tip {
    margin-top: 20rem/$x;
  }
  
  .theme_b_mark {
    float: right;
    line-height: 0.64rem;
    color: #666666;
  }
  
  .theme_b_sub>p {
    text-align: center;
    margin: 15px auto;
    width: 9.2rem;
    height: 1.17333rem;
    background: #fdd545;
    border-radius: 4px;
    font-size: 0.37333rem;
    font-weight: 500;
    line-height: 1.17333rem;
  }
  
  .theme_b_sub .has_answered {
    height: 100%;
    border-radius: 4px;
    background: #DDDDDD;
    color: #fff;
  }
  
  .comment_box {
    width: 100%;
    height: 55rem/$x;
    background: #fff;
    padding: 10rem/$x;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #ffffff;
    box-shadow: 0 1px 5px 2px rgba(204, 204, 204, 0.25);
    display: flex;
    overflow-x: hidden;
    z-index: 99;
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
  
  .countdown>span:nth-of-type(1) {
    font-size: 14rem/$x;
    letter-spacing: -0.39rem/$x;
  }
  
  .countdown>span:nth-of-type(2) {
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
  
  .theme_b_l>div:nth-of-type(1) {
    width: 45rem/$x;
    float: left;
    line-height: 24rem/$x;
  }
  
  .theme_b_l>div:nth-of-type(2) {
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
  
  .icon-dianzan1 {
    color: #FDD545;
  }
  
  ul,
  li {
    list-style: none;
  }
  
  .ctn>li {
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
  
  .ctn_l>i {
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
  
  .ctn_l>img {
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
  
  .ctn_r>div:nth-of-type(1)>span {
    font-family: STHeitiSC-Medium;
    font-size: 16rem/$x;
    color: #333333;
    letter-spacing: 0.19px;
  }
  
  .ctn_r>div:nth-of-type(1)>i {
    float: right;
    color: #fdd545;
    margin-right: 15rem/$x;
  }
  
  .ctn_r>div:nth-of-type(1)>i:nth-of-type(2) {
    float: right;
    color: #fdd545;
    margin-right: 5rem/$x;
  }
  
  .ctn_r>p:nth-of-type(1) {
    width: 268rem/$x;
    font-family: STHeitiSC-Medium;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0.17px;
    margin-top: 10rem/$x;
  }
  
  .ctn_r>div:nth-of-type(2) {
    margin-top: 16rem/$x;
  }
  
  .ctn_r>div:nth-of-type(2)>div:nth-of-type(1) {
    float: left;
    font-family: STHeitiSC-Medium;
    font-size: 12rem/$x;
    color: #bdbdbd;
    letter-spacing: 0.14rem/$x;
    padding-bottom: 15rem/$x;
  }
  
  .ctn_r>div:nth-of-type(2)>div:nth-of-type(2) {
    float: right;
  }
  
  .ctn_r>div:nth-of-type(2)>div:nth-of-type(2)>div {
    float: left;
    margin-right: 15rem/$x;
    color: #bdbdbd;
  }
  
  .countend {
    background: #666666;
    border-radius: 100rem/$x;
  }
  
  .countend>span {
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
  
  .slide_l>img {
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
    font-size: 13px;
  }
  
  .slide_rt {
    width: 283rem/$x;
    margin-top: 15rem/$x;
  }
  
  .slide_rt>div:nth-of-type(1) {
    font-family: STHeitiSC-Medium;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.14px;
    float: left;
  }
  
  .slide_rt>div:nth-of-type(2) {
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
  
  .icon_eye>i:nth-of-type(1) {
    font-size: 14px;
  }
  
  .icon_eye>span:nth-of-type(1) {
    padding-left: 8rem/$x;
  }
  
  .icon_pin {
    // width: 36rem/$x;
  }
  
  .icon_pin>span:nth-of-type(1) {
    padding-left: 8rem/$x;
  }
</style>
