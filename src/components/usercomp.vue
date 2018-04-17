<template>
	<div class="container">
			<scroller :on-refresh="refresh"
  :on-infinite="infinite" ref="myscroller" class="myscroller"  v-if="prolist.length>0">
                <ul>
                    <li class="list-item" v-for="(item,index) in prolist" :key="index"  data-type="0" >
                        <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd" @click="gotoDetail($event)" :data-title="item.topic.title" :data-rnum="item.topic.readNum? item.topic.readNum : 0" :data-anum="item.comments.length" :data-status="item.topic.status" :data-tid="item.topic.id" :data-time="item.topic.time">
                            <p class="t_componet">{{item.body}}</p>
                            <p class="title">来自问题：{{item.topic.title}}</p>
                            <p class="title-infor">
                                <span>
                                    <span class="seenum">{{item.comments.length}}</span>
                                    人回答
                                </span>
                                <span>
                                    <span class="componet-num">{{item.stars.length}}</span>
                                    人收藏
                                </span>
                            </p>
                            
                        </div>
                        <div class="delete iconfont icon-shanchu" @click="deleteItem" :data-index="index" :data-body="item.body" :data-id="item.id">
                        </div>
                    </li>
                </ul>
			</scroller>
			<div v-show="isShow" class="no_data">
	            <img src="../assets/images/shoucang@2x.png">
	            <p>您的收藏还是空的</p>
	            <router-link tag="a" class="goHome" to="../">去逛逛</router-link>
	        </div>
	</div>
</template>
<script type="text/javascript">
import "mint-ui/lib/style.css";
import { MessageBox, Toast, Indicator } from "mint-ui";
import sharewechat from "../router/sharewechat";
const $userid = localStorage.getItem("userid"); //userid
export default {
  name: "usecomp",
  data() {
    return {
      prolist: [],
      startX: 0,
      endX: 0,
      noData: "",
      page: 1,
      size: 5,
      noData: "",
      isShow: false
    };
  },
  methods: {
    gotoDetail: async function(event) {
      if (this.checkSlide()) {
        this.restSlide();
        return false;
      }
      const topicid = event.currentTarget.dataset.tid; //问题id
      let readnum = event.currentTarget.dataset.rnum; //阅读数
      const answernum = event.currentTarget.dataset.anum; //评论数
      const status = event.currentTarget.dataset.status; //状态
      const time = event.currentTarget.dataset.time; //倒计时时间
      const title = event.currentTarget.dataset.title; //问题标题
      console.log("gotoDetail", event.currentTarget.dataset);
      const query = {
        topicid: topicid,
        readnum: readnum,
        answernum: answernum,
        status: status,
        time: time,
        title: title
      };
      console.log(query);
      readnum++;
      const clickNum = {
        status: Number(status),
        title,
        readNum: readnum
      };
      await this.$axios.put(`/topic/${topicid}`, clickNum);
      query.readnum = readnum;
      localStorage.setItem("query", JSON.stringify(query));
      this.$router.push("/answerDetail/1/0/"+topicid);
    },
    //跳转
    skip: function() {
      if (this.checkSlide()) {
        this.restSlide();
      }
    },
    //滑动开始
    touchStart: function(e) {
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd: function(e) {
      let parentElement = e.currentTarget.parentElement;
      this.endX = e.changedTouches[0].clientX;

      if (parentElement.dataset.type == 0 && this.startX - this.endX > 16) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }

      if (parentElement.dataset.type == 1 && this.startX - this.endX < -16) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }

      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide: function() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //一次只能滑动一个
    restSlide: function() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem: function(e) {
      let index = e.currentTarget.dataset.index; //删除的当前索引值
      let $body = e.currentTarget.dataset.body; //所删除评论的body
      let $id = e.currentTarget.dataset.id; //所删除评论的id
      const stars = this.prolist[index].stars; //拿到当前点击的收藏的stars
      //拿到所有收藏的用户id
      const starid = [];
      for (let i = 0; i < stars.length; i++) {
        starid.push(stars[i].id);
      }
      //拿到我自己id的索引值
      const myindex = starid.indexOf($userid);
      //根据索引值删除我的
      stars.splice(myindex, 1);
      const data = {
        stars: stars,
        body: $body
      };
      Indicator.open();
      this.$axios
        .put("/answer/" + $id, data)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.restSlide();
            this.prolist.splice(index, 1);
            this.getIndexData("删除成功");
          }
        })
        .catch(error => {
          console.log("error");
        });
    },
    getIndexData: function(msg) {
      this.noData = "";
      const data = {
        pages: this.page * this.size,
        sort: JSON.stringify({ createdAt: 0 }),
        userid: $userid
      };
      this.$axios
        .get("/answer", { params: data })
        .then(res => {
          Indicator.close();
          if (msg) {
            Toast(msg);
          }
          if (res.data && res.data.length) {
            this.prolist = res.data;
          } else {
            this.isShow = true;
          }
        })
        .catch(error => {
          Indicator.close();
          console.log(error);
        });
    },
    refresh: function(done) {
      setTimeout(() => {
        this.size = 5;
        this.page = 1;
        this.getIndexData();
        done();
      }, 1500);
    },
    infinite: function(done) {
      if (this.noData) {
        setTimeout(() => {
          done(true);
        });
        return;
      }
      setTimeout(() => {
        this.page++;
        const data = {
          pages: this.page * this.size,
          sort: JSON.stringify({ createdAt: 0 }),
          userid: $userid
        };
        this.$axios
          .get("/answer", { params: data })
          .then(res => {
            this.prolist = res.data;
          })
          .catch(error => {
            console.log(error);
          });
        const pages = this.page * this.size;
        if (this.prolist.length <= pages) {
          this.noData = "没有更多数据";
        }
        done();
      }, 3000);
    }
  },
  mounted: function() {
    this.getIndexData();
  },
  beforeCreate: function() {
    Indicator.open();
  },
  destroyed: function() {
    Indicator.close();
  }
};
</script>
<style scoped lang="scss">
$unit: 37.5;
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  list-style: none;
  padding-top: 70rem/$unit;
  box-sizing: border-box;
  .myscroller {
    padding-top: 1.86667rem;
    box-sizing: border-box;
  }
  ul {
    height: 100%;
    padding: 0 15rem/$unit;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .list-item {
    width: 100%;
    height: 125rem/$unit;
    margin: 0 auto;
    position: relative;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
    margin-bottom: 15rem/$unit;
  }
  .list-item[data-type="0"] {
    transform: translate3d(0, 0, 0);
  }
  .list-item[data-type="1"] {
    transform: translate3d(-2rem, 0, 0);
  }

  .list-box {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    box-shadow: 0 2px 6px 0 #dddddd;
    border-radius: 10px;
    overflow: hidden;

    .title {
      width: 100%;
      height: auto;
      font-family: STHeitiSC-Medium;
      font-size: 14px;
      color: #666666;
      letter-spacing: 0.22px;
      padding: 10rem/$unit 18rem/$unit 10rem/$unit 15rem/$unit;
      box-sizing: border-box;
      text-align: left;
      float: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .t_componet {
      width: 100%;
      margin-top: 15rem/$unit;
      max-height: 44rem/$unit;
      box-sizing: border-box;
      padding: 0 18rem/$unit 0 15rem/$unit;
      text-align: left;
      font-family: STHeitiSC-Medium;
      font-size: 18px;
      line-height: 22rem/$unit;
      color: #333333;
      letter-spacing: 0.17px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .title-infor {
      width: auto;
      margin: 0 auto;
      height: auto;
      overflow: hidden;
      position: absolute;
      left: 15rem/$unit;
      bottom: 15rem/$unit;
    }
    .title-infor > span {
      width: auto;
      margin-right: 15rem/$unit;
      float: left;
      font-family: STHeitiSC-Medium;
      font-size: 12px;
      color: #bdbdbd;
      letter-spacing: 0.14px;
    }
  }
  .list-item .delete {
    width: 32rem/$unit;
    height: 32rem/$unit;
    border-radius: 16rem/$unit;
    background: #ff5722;
    font-size: 17px;
    color: #fff;
    text-align: center;
    line-height: 32rem/$unit;
    position: absolute;
    top: 50%;
    left: 106%;
    margin-top: -16rem/$unit;
  }
}

.no_data {
  width: 100%;
  text-align: center;
  line-height: 20rem/$unit;
  font-family: PingFangSC-Regular;
  font-size: 13px;
  color: #4c3a30;
  letter-spacing: 0.26px;
  img {
    width: 132rem/$unit;
    height: 119rem/$unit;
    display: inline-block;
    margin-top: 48rem/$unit;
    margin-bottom: 20rem/$unit;
  }
}
.goHome {
  width: auto;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #ff8500;
  letter-spacing: 0;
}
</style>