<template>
  <div class="box">
      
      <scroller class="list_wrap" v-if="pailist.length > 0">
        <!-- <div class="top">
          <div class="top_img">
              <img src="../assets/images/worldlist.png" alt=
              "" >
          </div>
      </div> -->
      <img src="../assets/images/top_bg.png" alt="">
        <ul class="paihang_list">
            <li class="ctn clearfix" v-for="(item,index) in pailist" :key="index">
                    <img class="paiimg" src="../assets/images/gold-medal-1@3x.png" alt="" v-if="index == '0'">
                    <img class="paiimg" src="../assets/images/silver-medal-1@3x.png" alt="" v-else-if="index == '1'">
                    <img class="paiimg" src="../assets/images/bronze-medal-1@3x.png" alt="" v-else-if="index == '2'">
                    <span class="indexname" v-else>{{index+1}}</span>
                    <img :src="item.avatarUrl" alt="" class="avtalimg" v-if="Boolean(item.avatarUrl)">
                    <img src="../assets/images/logo.png" alt="" class="avtalimg" v-else>
                    <span class="nickname">{{item.nickName}}</span>
                    <p class="upVotes_box">
                      <i class="iconfont icon-dianzan1"></i>
                      <span>{{item.ups}}</span>
                    </p>
            </li>
            <div class="block">

            </div>
        </ul>
        
      </scroller>  
      <span class="showempty" v-else>暂无用户上榜</span>
      <div class="my_listbox">
        <div class="my_list clearfix">
            <div class="my_list_l">
                  <i>{{myGrade}}</i>
                  <img :src="myavtalUrl" alt="a" v-if="Boolean(myavtalUrl)" >
                  <img src="../assets/images/logo.png" alt="" v-else>
                  <span>我的排名</span>
            </div>
            <div class="my_list_r">
                <i class="iconfont icon-dianzan1"></i>
                <span>{{myStar}}</span>
            </div>
        </div>
      </div>
      
      <tabnav></tabnav>
  </div>
  
</template>
<script>
import "mint-ui/lib/style.css";
import sharewechat from "../router/sharewechat";
import { MessageBox, Toast, Indicator } from "mint-ui";
export default {
  name: "paihang",
  data() {
    return {
      pailist: [],
      iswho: 0,
      myavtalUrl: "",
      myStar: 0,
      myGrade: "-"
    };
  },
  methods: {
    getWorld: function() {
      this.iswho = 0;
      Indicator.open();
      //获取世界榜
      const $userid = localStorage.getItem("userid"); //userid
      this.$axios
        .get("/rank")
        .then(res => {
          if (res.data && res.data.length) {
            Indicator.close();
            this.pailist = res.data;
            const idarr = [];
            for (let i = 0; i < this.pailist.length; i++) {
              idarr.push(this.pailist[i].id);
            }
            if (idarr.indexOf($userid) != -1) {
              const myindex = idarr.indexOf($userid);
              this.myGrade = Number(idarr.indexOf($userid)) + 1;
              this.myStar = this.pailist[myindex].ups;
              this.myavtalUrl = this.pailist[myindex].avatarUrl
                ? this.pailist[myindex].avatarUrl
                : localStorage.getItem("headimg");
            } else {
              this.myGrade = "-";
              this.myStar = 0;
            }
          } else {
            this.pailist = [];
            this.myGrade = "-";
            this.myStar = 0;
          }
        })
        .catch(function(error) {
          Indicator.close();
          console.log(error);
        });
    }
    // getFriend:function(){
    //   this.iswho = 1;
    //   Indicator.open();
    //   //获取好友榜
    //   const $userid = localStorage.getItem("userid");//userid
    //   const data ={search: {id:$userid} }
    //   this.$axios.get('/friend',{params:data}).then((res)=>{
    //      if (res.status === 200) {
    //         Indicator.close();
    //         if(res.data.allFriendIds){
    //           const allFriendIds =JSON.stringify(res.data.allFriendIds);
    //           const answer ={allFriendIds:allFriendIds};
    //           this.$axios.get('/answerRank',{params:answer}).then((data)=>{
    //             console.log(data);
    //             this.pailist =data.data.createdBys;
    //             const idarr = [];
    //             for(let i=0;i<this.pailist.length;i++){
    //               idarr.push(this.pailist[i].id);
    //             }
    //             if(idarr.indexOf($userid) != -1){
    //               const myindex = idarr.indexOf($userid);
    //               this.myGrade = Number(idarr.indexOf($userid))+1;
    //               this.myStar = this.pailist[myindex].ups;
    //               this.myavtalUrl = this.pailist[myindex].avatarUrl? this.pailist[myindex].avatarUrl :localStorage.getItem("headimg");
    //             }else{
    //               this.myGrade ='-';
    //               this.myStar = 0;
    //             }
    //           }).catch((error)=>{
    //             console.log(error);
    //           })
    //         }else{
    //           this.pailist = [];
    //           this.myGrade ='-';
    //           this.myStar = 0;
    //         }
    //      }
    //   }).catch(function(error){
    //      Indicator.close();
    //       console.log(error);
    //   });
    // }
  },
  mounted: function() {
    this.getWorld();
    const url = encodeURIComponent(window.location.href.split("#")[0]);
    // this.sharewechat(url,false);
  },
  beforeCreate: function() {
    //获取世界榜
    const $userid = localStorage.getItem("userid"); //userid
    const data = { userid: $userid };
    Indicator.open();
  },
  destroyed: function() {
    Indicator.close();
  }
};
</script>
<style lang="scss" scoped>
$x: 37.5;
.clearfix:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}

.showempty {
  position: fixed;
  width: 100%;
  font-family: STHeitiSC-Medium;
  font-size: 17px;
  color: #666666;
  letter-spacing: 0.2px;
  left: 50%;
  top: 50%;
  margin-left: -50%;
}
.box {
  height: 100%;
  background: #fff;
  position: relative;
  box-sizing: border-box;
  padding: 0 15rem/$x;
  box-sizing: border-box;
  padding-top: 130rem/$x;
  display: flex;
  overflow: hidden;
}
.top {
  width: 120%;
  height: 307rem/$x;
  background: #fdd545;
  border-radius: 60%/153.5px;
  padding-top: 201rem/$x;
  box-sizing: border-box;
  position: absolute;
  left: -10%;
  top: -173.5rem/$x;
  z-index: 5;
}
.top_title {
  width: 175rem/$x;
  height: 44rem/$x;
  margin: 0 auto;
}
.top_title > div {
  font-family: AppleSystemUIFont;
  font-size: 17px;
  color: #030303;
  letter-spacing: -0.41px;
}
.top_img {
  width: 275rem/$x;
  height: 51rem/$x;
  padding-top: 8rem/$x;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 10rem/$x;
}
.top_img > img {
  width: 186rem/$x;
  height: 44rem/$x;
  margin-top: 10rem/$x;
}
.top_btn {
  width: 75rem/$x;
  height: 20rem/$x;
  border: 1px solid #333;
  border-radius: 100rem/$x;
  margin: 0 auto;
  font-size: 8rem/$x;
  text-align: center;
  line-height: 20rem/$x;
}
.top_btn > b {
  font-weight: 600;
}
// .list_wrap{
//   padding-top:130rem/$x;
//   box-sizing:border-box;
// }
.paihang_list {
  width: 100%;
  flex: 1;
  position: relative;
  ._v-content {
    height: 100%;
  }
}
.ctn {
  width: 100%;
  padding: 0 30rem/$x;
  height: 48rem/$x;
  line-height: 48rem/$x;
  margin: 10rem/$x auto;
  box-sizing: border-box;
}
.paiimg {
  width: 20rem/$x;
  height: 32rem/$x;
  float: left;
  padding: 8rem/$x 0;
}
.avtalimg {
  width: 48rem/$x;
  height: 48rem/$x;
  float: left;
  background: #fdd545;
  border-radius: 50%;
  margin: 0 10rem/$x;
}
.nickname {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
  float: left;
}
.indexname {
  width: 20rem/$x;
  height: 32rem/$x;
  float: left;
  padding: 8rem/$x 0;
  font-family: STHeitiSC-Medium;
  font-size: 18px;
  line-height: 32rem/$x;
  color: #333333;
  letter-spacing: 0.22px;
}
.upVotes_box {
  float: right;
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
}
.upVotes_box > i {
  color: #fdd545;
}
.my_listbox {
  width: 100%;
  padding: 0 15rem/$x;
  height: 80rem/$x;
  box-sizing: border-box;
  margin-top: 15rem/$x;
  position: absolute;
  bottom: 59rem/$x;
  left: 0;
}
.my_list {
  width: 100%;
  height: 100%;
  background: #fdd545;
  box-shadow: 0 2px 6px 0 #dddddd;
  border-radius: 10px;
  margin: 0 auto;
}
.my_list_l {
  width: 200rem/$x;
  float: left;
  text-align: left;
}
.my_list_l > i:nth-of-type(1) {
  margin-left: 20rem/$x;
  float: left;
  padding: 30rem/$x 0;
  font-size: 18px;
}
.my_list_l > img:nth-of-type(1) {
  width: 48rem/$x;
  height: 48rem/$x;
  float: left;
  background: #ffffff;
  border-radius: 50%;
  float: left;
  margin: 10rem/$x 15rem/$x;
  margin-right: 12rem/$x;
  margin-left: 18rem/$x;
}
.my_list_l > span:nth-of-type(1) {
  font-family: STHeitiSC-Medium;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0.17px;
  float: left;
  padding: 30rem/$x 0;
}
.my_list_r {
  width: 145rem/$x;
  float: right;
}
.my_list_r > i:nth-of-type(1) {
  color: #ffffff;
  margin: 30rem/$x 0;
  display: inline-block;
  padding-left: 84rem/$x;
}
.my_list_r > span:nth-of-type(1) {
  color: #333333;
  letter-spacing: 0.17px;
  font-weight: 500;
}
.block {
  width: 345rem/$x;
  height: 140rem/$x;
}
</style>

