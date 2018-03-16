<template>
  <div class="box">
      <div class="top">
          <div class="top_title">
              <div>
                  排行榜
              </div>
          </div>
          <div class="top_img">
              <img src="../assets/images/friendList.png" alt="">
          </div>
          <div class="top_btn">
              <span>切换世界榜</span>
          </div>
      </div>
      <ul>
          <li class="ctn clearfix">
              <div class="ctn_l clearfix">
                  <img src="../assets/images/gold-medal-1@3x.png" alt="">
                  <img src="" alt="">
                  <span>李强</span>
              </div>
              <div class="ctn_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>1313</span>
              </div>
          </li>
           <li class="ctn clearfix">
              <div class="ctn_l clearfix">
                  <img src="../assets/images/gold-medal-1@3x.png" alt="">
                  <img src="" alt="">
                  <span>李强</span>
              </div>
              <div class="ctn_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>1313</span>
              </div>
          </li>
           <li class="ctn clearfix">
              <div class="ctn_l clearfix">
                  <img src="../assets/images/gold-medal-1@3x.png" alt="">
                  <img src="" alt="">
                  <span>李强</span>
              </div>
              <div class="ctn_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>1313</span>
              </div>
          </li>
           <li class="ctn clearfix">
              <div class="ctn_l clearfix">
                  <img src="../assets/images/gold-medal-1@3x.png" alt="">
                  <img src="" alt="">
                  <span>李强</span>
              </div>
              <div class="ctn_r">
                  <i class="iconfont icon-dianzan1"></i>
                  <span>1313</span>
              </div>
          </li>
      </ul>
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
  </div>
</template>
<script>
export default {
  data(){
      return {

      }
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
    *{
        margin: 0;padding: 0;
    }
    ul,li{
        list-style: none;
    }
    .top{
        width: 375rem/$x;height: 170rem/$x;background: #FDD545;border-bottom-left-radius: 200rem/$x 50rem/$x;
        border-bottom-right-radius: 200rem/$x 50rem/$x;margin: 0 auto;
    }
    .top_title{
        width: 175rem/$x;height: 44rem/$x;margin: 0 auto;
    }
    .top_title>div{
        font-family: AppleSystemUIFont;font-size: 17px;color: #030303;letter-spacing: -0.41px;
    }
    .top_img{
        width: 275rem/$x;height: 51rem/$x;margin: 0 auto;
    }
    .top_img>img{
        width: 186rem/$x;height: 44rem/$x;
    }
    .top_btn{width: 70rem/$x;height: 20rem/$x;border: 1px solid #333333;border-radius: 100rem/$x;
    margin: 0 auto;
    }
    .top_btn>span{
        font-size: 8px;
    }
    .ctn{
        width: 345rem/$x;margin: 0 auto;margin-top: 15rem/$x;
    }
    .ctn_l{
        width: 200rem/$x;float: left;
    }
    .ctn_l>img:nth-of-type(1){
        width: 20rem/$x;height: 32rem/$x;float: left;padding: 8rem/$x 0;
    }
    .ctn_l>img:nth-of-type(2){
        width: 48rem/$x;height: 48rem/$x;float: left;background: #FDD545;border-radius: 50%;
        margin: 0 10rem/$x;
    }
    .ctn_l>span:nth-of-type(1){
        font-family: STHeitiSC-Medium;font-size: 14px;color: #333333;letter-spacing: 0.17px;
        float: left;padding: 17rem/$x 0;
    }
    .ctn_r{
        float: right;width: 145rem/$x;padding: 15rem/$x 0;text-indent: 50rem/$x;
    }
    .ctn_r>i{color: #FDD545;}
    
    .my_list{
        width: 345rem/$x;height: 100%;background: #FDD545;box-shadow: 0 2px 6px 0 #DDDDDD;border-radius: 10px;
        margin: 0 auto;margin-top: 15rem/$x;
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

