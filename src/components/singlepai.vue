<template>
	<div class="box">
		<div class="top">
          <div class="top_name">单场榜</div>
          <p class="top_answer">
          	<span>
	          	<i class="lefticon iconfont icon-baojiaquotation2"></i>
	          	<i class="righticon iconfont icon-baojiaquotation"></i>
          	</span>
          	<span class="answer_con">{{title}}</span>
          </p>
      	</div>
      	<scroller style="    z-index: 4; background: #fff;">
              <ul   class="paihang_list">
                  <li class="ctn clearfix" v-for="(item,index) in pailist" :key="index">
                    <div class="ctn_l clearfix">
                        <img class="paiimg" src="../assets/images/gold-medal-1@3x.png" alt="" v-if="index == '0'">
                        <img class="paiimg" src="../assets/images/silver-medal-1@3x.png" alt="" v-else-if="index == '1'">
                        <img class="paiimg" src="../assets/images/bronze-medal-1@3x.png" alt="" v-else-if="index == '2'">
                        <span class="indexname" v-else>{{index+1}}</span>
                        <img :src="item.createdBy.avatarUrl" alt="" class="avtalimg" v-if="Boolean(item.createdBy)&&Boolean(item.createdBy.avatarUrl)">
                        <img src="../assets/images/logo.png" alt="" class="avtalimg" v-else>
                        <span class="nickname" v-if="Boolean(item.createdBy)&&Boolean(item.createdBy.avatarUrl)">{{item.createdBy.nickName}}</span>
                        <span class="nickname" v-else>匿名用户</span>
                        <span class="paimoney" v-if="index == '0'">奖金:¥{{money}}</span>
                        <div class="ctn_r">
                            <i class="iconfont icon-dianzan1"></i>
                            <span>{{item.upVoteLen}}</span>
                        </div>
                    </div>
                    
                </li>
                <div class="block"></div>
              </ul>
          
      </scroller>
      <div class="mylist_box">
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
            <span class="showempty" v-show="pailist.length < 1">暂无用户上榜</span>
      </div>
       
	</div>
</template>
<script type="text/javascript">
  import "mint-ui/lib/style.css";
  import { MessageBox, Toast, Indicator } from "mint-ui";
  import sharewechat from "../router/sharewechat";
  const $userid = localStorage.getItem("userid");//userid
	export default {
		name : 'singlepai',
		data(){
			return {
				pailist:[],
        myavtalUrl:'',
        myStar:0,
        myGrade:'-',
        topic_title:'',
        title:'',
        topicid:'',
        money:0
			}
		},
		mounted:function(){
            this.topicid = this.$route.params.topicid;
            this.$axios.get(`/topic/${this.$route.params.topicid}`).then(res => {
                this.title = res.data.title;
            });
		    const data = {
		    	topicid : this.topicid
		    }
            Indicator.open();
		    this.$axios.get('/singleRank',{params:data}).then((res)=>{
            console.log(res.data);
            console.log("dajkdkabdhk")
            Indicator.close();
		        if(res.data && res.data.length){
                    this.pailist =res.data;
                    if(res.data.award){
                        this.money = res.data.award;
                        return this.money;
                    }else{
                        this.money = 13;
                        return this.money;
                    }
                
		            const idarr = [];
			        for(let i=0;i<this.pailist.length;i++){
			            idarr.push(this.pailist[i].createdBy.id);
			        }
			        if(idarr.indexOf($userid) != -1){
			            const myindex = idarr.indexOf($userid);
			            this.myGrade = Number(idarr.indexOf($userid))+1;
			            this.myStar = this.pailist[myindex].upVotes.length;
			            this.myavtalUrl = this.pailist[myindex].createdBy.avatarUrl?this.pailist[myindex].createdBy.avatarUrl:localStorage.getItem("headimg");
			        }
		        }else{
		            this.pailist = [];
		            this.myGrade ='-';
		            this.myStar = 0;
		        }
		    }).catch(function(error){
                Indicator.close();
		        console.log(error);
            });
            // sharewechat(window.location.href.split("#")[0]);
        },
        beforeRouteLeave (to, from, next) {
            next();
            const url = 'https://'+window.location.host+to.fullPath;
            // sharewechat(url);
        }
	}
</script>
<style lang="scss" scoped>
	$x:37.5;
     .block{
     width: 345rem/$x;
     height: 80rem/$x;
   }
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
      background: #FFFEF7;
      position: relative;
      box-sizing:border-box;
      padding:0 15rem/$x;
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
    .top_name{
    	font-family: STHeitiSC-Medium;
		font-size: 14px;
		color: #333333;
		letter-spacing: 0.43px;
    }
    .top_answer{
    	width:100%;
    	height:48rem/$x;
    	font-family: STHeitiSC-Medium;
		font-size: 18px;
		color: #333333;
		letter-spacing: 0.22px;
		// line-height: 48rem/$x;
		padding:0 60rem/$x;
		box-sizing:border-box;


    }
    .top_answer span{
    	display: inline-block;
    	width:100%;
    }
    .top_answer span .lefticon{
    	float: left;
    }
    .top_answer span .righticon{
    	float: right;
    }
    .top_answer .answer_con{
    	width: 100%;
    	padding:0 15rem/$x;
    	box-sizing:border-box;
    	text-align: center;
    	overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
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
        width: 100%;
        float: left;
        display: flex;
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
        text-align: left;
        flex:1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        float: right;
        padding: 15rem/$x 0;
        text-indent: 50rem/$x;
    }
    .ctn_r>i{color: #FDD545;}
    .mylist_box{
        width: 100%;
        height: 80rem/$x;
        margin-top: 15rem/$x;
        position: absolute;
        bottom:15rem/$x;
        left:0;
        box-sizing: border-box;
        padding:0 15rem/$x;
        z-index:5;
    }
    .my_list{
        width:100%;
        height:100%;
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
    .paimoney{
        margin-top: 16px;
    }
</style>