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
           <div class="top_btn" @click="this.getWorld" v-else>
            切换世界榜
          </div>

      </div>
      <scroller class="list_wrap" v-if="pailist.length > 0">
        <ul class="paihang_list">
            <li class="ctn clearfix" v-for="(item,index) in pailist">
                    <img class="paiimg" src="../assets/images/gold-medal-1@3x.png" alt="" v-if="index == '0'">
                    <img class="paiimg" src="../assets/images/silver-medal-1@3x.png" alt="" v-else-if="index == '1'">
                    <img class="paiimg" src="../assets/images/bronze-medal-1@3x.png" alt="" v-else-if="index == '2'">
                    <span class="indexname" v-else>{{index+1}}</span>
                    <img :src="item.avatarUrl" alt="" class="avtalimg" v-if="Boolean(item.avatarUrl)">
                    <img src="../assets/images/logo.png" alt="" class="avtalimg" v-else>
                    <span class="nickname">{{item.username}}</span>
                    <p class="upVotes_box">
                      <i class="iconfont icon-dianzan1"></i>
                      <span>{{item.upVotes}}</span>
                    </p>
            </li>
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
export default {
  name:'paihang',
  data(){
      return {
        pailist:[
          
        ],
        iswho:0,
        myavtalUrl:'',
        myStar:0,
        myGrade:'-'
      }
  },
  methods:{
    getWorld:function(){
      this.iswho = 0;
      //获取世界榜
      const $userid = localStorage.getItem("userid");//userid
      this.$axios.get('/rank').then((res)=>{
          if(res.data && res.data.length){
            this.pailist =res.data;
            const idarr = [];
            for(let i=0;i<this.pailist.length;i++){
              idarr.push(this.pailist[i].id);
            }
            if(idarr.indexOf($userid) != -1){
              const myindex = idarr.indexOf($userid);
              this.myGrade = Number(idarr.indexOf($userid))+1;
              this.myStar = this.pailist[myindex].upVotes;
              this.myavtalUrl = this.pailist[myindex].avatarUrl? this.pailist[myindex].avatarUrl :localStorage.getItem("headimg");
            }else{
              this.myGrade ='-';
              this.myStar = 0;
            }
          }else{
            this.pailist = [];
            this.myGrade ='-';
            this.myStar = 0;
          }
      }).catch(function(error){
          console.log(error);
      })
    },
    getFriend:function(){
      this.iswho = 1;

      //获取好友榜
      const $userid = localStorage.getItem("userid");//userid
      const data ={search: {id:$userid} }
      this.$axios.get('/friend',{params:data}).then((res)=>{
         if (res.status === 200) {
            if(res.data.allFriendIds){
              const allFriendIds =JSON.stringify(res.data.allFriendIds);
              const answer ={allFriendIds:allFriendIds};
              this.$axios.get('/answerRank',{params:answer}).then((data)=>{
                console.log(data);
                this.pailist =data.data.createdBys;
                const idarr = [];
                for(let i=0;i<this.pailist.length;i++){
                  idarr.push(this.pailist[i].id);
                }
                if(idarr.indexOf($userid) != -1){
                  const myindex = idarr.indexOf($userid);
                  this.myGrade = Number(idarr.indexOf($userid))+1;
                  this.myStar = this.pailist[myindex].upVotes;
                  this.myavtalUrl = this.pailist[myindex].avatarUrl? this.pailist[myindex].avatarUrl :localStorage.getItem("headimg");
                }else{
                  this.myGrade ='-';
                  this.myStar = 0;
                }
              }).catch((error)=>{
                console.log(error);
              })
            }else{
              this.pailist = [];
              this.myGrade ='-';
              this.myStar = 0;
            }
         }
      }).catch(function(error){
          console.log(error);
      });
    }
  },  
  mounted:function(){
    
  },
  beforeCreate:function(){
    //获取世界榜
    const $userid = localStorage.getItem("userid");//userid
    const data ={userid:$userid} 

    this.$axios.get('/rank').then((res)=>{
        this.pailist =res.data;
        const idarr = [];
        for(let i=0;i<this.pailist.length;i++){
          idarr.push(this.pailist[i].id);
        }
        if(idarr.indexOf($userid) != -1){
          const myindex = idarr.indexOf($userid);
          this.myGrade = Number(idarr.indexOf($userid))+1;
          this.myStar = this.pailist[myindex].upVotes;
          this.myavtalUrl = this.pailist[myindex].avatarUrl? this.pailist[myindex].avatarUrl:localStorage.getItem("headimg");
        }else{
            this.pailist = [];
            this.myGrade ='-';
            this.myStar = 0;
        }
    }).catch(function(error){
        console.log(error);
    });
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
    
    .showempty{
      position: fixed;
      width:100%;
      font-family: STHeitiSC-Medium;
      font-size: 17px;
      color: #666666;
      letter-spacing: 0.2px;
      left:50%;
      top:50%;
      margin-left: -50%;
    }
    .box{
      height:100%;
      background:#fff;
      position: relative;
      box-sizing:border-box;
      padding:0 15rem/$x;
      box-sizing:border-box;
      padding-top:130rem/$x;
      display: flex;
    }
    .top{
        width: 120%;
        height: 307rem/$x;
        background: #FDD545;
        border-radius:60%/153.5px;
        padding-top: 201rem/$x;
        box-sizing:border-box;
        position: absolute;
        left:-10%;
        top:-173.5rem/$x;
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
    .list_wrap{
      padding-top:130rem/$x;
      box-sizing:border-box;
    }
    .paihang_list{
      width:100%;
      flex:1;
      position: relative;
      ._v-content{
        height:100%;
      }
    }
    .ctn{
        width: 100%;
        padding:0 30rem/$x;
        height:48rem/$x;
        line-height: 48rem/$x;
        margin: 10rem/$x auto;
        box-sizing:border-box;
    }
    .paiimg{
        width: 20rem/$x;
        height: 32rem/$x;
        float: left;
        padding: 8rem/$x 0;
    }
    .avtalimg{
        width: 48rem/$x;
        height: 48rem/$x;
        float: left;
        background: #FDD545;
        border-radius: 50%;
        margin: 0 10rem/$x;
    }
    .nickname{
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
        float: left;
    }
    .indexname{
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
    .upVotes_box{
        float: right;
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.17px;
    }
    .upVotes_box>i{color: #FDD545;}
    
    .my_listbox{
      width:100%;
      padding:0 15rem/$x;
      height:80rem/$x;
      box-sizing:border-box;
      margin-top: 15rem/$x;
      position: absolute;
      bottom:59rem/$x;
      left:0;
    }
    .my_list{
        width: 100%;
        height: 100%;
        background: #FDD545;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        margin: 0 auto;
        
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

