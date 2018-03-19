<template>
  <div class="box">
      <div class="top">
          <div class="top_img">
              <img src="../assets/images/worldlist.png" alt=
              "" v-if="iswho == 0">
              <img src="../assets/images/friendList.png" alt="" v-else>
          </div>
          <div class="top_btn" @click="this.getFriend" v-if="iswho == 0">
            切换好友榜
          </div>
           <div class="top_btn" @click="this.getWorld"v-else>
            切换世界榜
          </div>

      </div>
      <ul class="paihang_list">
          <li class="ctn clearfix" v-for="(item,index) in pailist">
              <div class="ctn_l clearfix">
                  <img class="paiimg" src="../assets/images/gold-medal-1@3x.png" alt="" v-if="index == '0'">
                  <img class="paiimg" src="../assets/images/silver-medal-1@3x.png" alt="" v-else-if="index == '1'">
                  <img class="paiimg" src="../assets/images/bronze-medal-1@3x.png" alt="" v-else-if="index == '2'">
                  <span class="indexname"v-else>{{index+1}}</span>
                  <img src="" alt="" class="avtalimg">
                  <span class="nickname">{{item.nickname}}</span>
              </div>
              <div class="ctn_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>{{item.upVotes}}</span>
              </div>
          </li>
          <div class="my_list clearfix">
              <div class="my_list_l">
                    <i>-</i>
                    <img src="" alt="">
                    <span>我的排名</span>
              </div>
              <div class="my_list_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>12</span>
              </div>
          </div>
      </ul>
      <tabnav></tabnav>
  </div>
</template>
<script>
export default {
  name:'paihang',
  data(){
      return {
        pailist:[
          {
            nickname:'1111',
            upVotes:22

          },{
            nickname:'222',
            upVotes:20
          },{
            nickname:'小小鱼',
            upVotes:24
          },{
            nickname:'骑着扫把的小猪',
            upVotes:24
          }
        ],
        iswho:0
      }
  },
  methods:{
    getWorld:function(){
      this.iswho = 0;
      console.log(this.iswho);
      const $url = 'http://192.168.1.120:1337';
      //获取世界榜
      const $userid = localStorage.getItem("userid");//userid
      const data ={userid:$userid} 
      this.$axios.get($url+'/rank').then((res)=>{
          console.log(res);
          this.pailist =res.data;
      }).catch(function(error){
          console.log(error);
      })
    },
    getFriend:function(){
      this.iswho = 1;
      console.log(this.iswho);
      console.log("好友榜");
      const $url = 'http://192.168.1.120:1337';
      //获取世界榜
      const $userid = localStorage.getItem("userid");//userid
      const data ={search: { createdBy:$userid } }
      this.$axios.get($url+'/friend',{params:data}).then((res)=>{
          console.log(res);
          this.pailist =res.data;
      }).catch(function(error){
          console.log(error);
      })
    }

  },  
  beforeCreate:function(){
    console.log("世界榜");
    const $url = 'http://192.168.1.120:1337';
    //获取世界榜
    const $userid = localStorage.getItem("userid");//userid
    const data ={userid:$userid} 
    this.$axios.get($url+'/rank').then((res)=>{
        console.log(res);
        this.pailist =res.data;
    }).catch(function(error){
        console.log(error);
    })
  }
}
</script>
<style lang="scss" scoped>
    $x:37.5;
    .clearfix:after {
      content: "";
      display: block;
      height: 0;
      clear: both;
    }
    .box{
      height:100%;
      background:#fff;
      position: relative;
      box-sizing:border-box;
      padding:0 15rem/$x;
    }
    .top{
        width: 100%;
        height: 130rem/$x;
        background: #FDD545;
        border-bottom-left-radius: 250rem/$x 75rem/$x;
        border-bottom-right-radius:250rem/$x 75rem/$x;
        margin: 0 auto;
        padding-top: 24rem/$x;
        box-sizing:border-box;
        position: absolute;
        left:0;
        top:0;
        z-index: 5;
    }
    .top_title{
        width: 175rem/$x;height: 44rem/$x;margin: 0 auto;
    }
    .top_title>div{
        font-family: AppleSystemUIFont;
        font-size: 17px;color: #030303;letter-spacing: -0.41px;
    }
    .top_img{
        width: 275rem/$x;
        height: 51rem/$x;
        padding-top:8rem/$x;
        box-sizing:border-box;
        margin: 0 auto;
        margin-bottom:10rem/$x;
        
    }
    .top_img>img{
        width: 186rem/$x;
        height: 44rem/$x;
    }
    .top_btn{
      width: 75rem/$x;
      height: 20rem/$x;
      border: 1px solid #333333;
      border-radius: 100rem/$x;
      margin: 0 auto;
      font-size:8px;
      text-align: center;
      line-height: 20rem/$x;
    }
    .paihang_list{
      width:100%;
      height:100%;
      box-sizing:border-box;
      padding-top:130rem/$x;
      padding:130rem/$x 0 49rem/$x;
      overflow-y:scroll;
      position: relative;
      z-index: 1;
    }
    .ctn{
        width: 345rem/$x;margin: 0 auto;margin-top: 15rem/$x;
    }
    .ctn_l{
        width: 200rem/$x;float: left;
    }
    .ctn_l .paiimg{
        width: 20rem/$x;
        height: 32rem/$x;
        float: left;
        padding: 8rem/$x 0;
    }
    .ctn_l .avtalimg{
        width: 48rem/$x;
        height: 48rem/$x;
        float: left;
        background: #FDD545;
        border-radius: 50%;
        margin: 0 10rem/$x;
    }
    .ctn_l .nickname{
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
        float: left;
        padding: 17rem/$x 0;
    }
    .ctn_l .indexname{
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
    .ctn_r{
        float: right;width: 145rem/$x;padding: 15rem/$x 0;text-indent: 50rem/$x;
    }
    .ctn_r>i{color: #FDD545;}
    
    .my_list{
        width: 100%;
        height: 80rem/$x;
        background: #FDD545;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        margin: 0 auto;
        margin-top: 15rem/$x;
        position: absolute;
        bottom:59rem/$x;
        left:0;
    }
    .my_list_l{
        width: 200rem/$x;float: left;text-align: left;
    }
    .my_list_l>i:nth-of-type(1){
        margin-left: 10rem/$x;float: left;padding: 30rem/$x 0;
    }
    .my_list_l>img:nth-of-type(1){
        width: 48rem/$x;height: 48rem/$x;float: left;background: #ffffff;border-radius: 50%;
        float: left;margin: 10rem/$x 15rem/$x;margin-right: 12rem/$x;
    }
    .my_list_l>span:nth-of-type(1){
         font-family: STHeitiSC-Medium;font-size: 14px;color: #333333;letter-spacing: 0.17px;
        float: left;padding: 30rem/$x 0;
    }
    .my_list_r{
        width: 145rem/$x;float: right;
    }
    .my_list_r>i:nth-of-type(1){
        color: #ffffff;margin:30rem/$x 0;display: inline-block;padding-left: 36rem/$x;
    }
    .my_list_r>span:nth-of-type(1){
        
    }
</style>

