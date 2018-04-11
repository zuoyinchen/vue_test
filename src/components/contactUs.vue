<template>
  <div class="box">
      <div class="top_bg">
          <img src="../assets/images/group.png" alt="">
      </div>
      <ul class="ctn">
          <li>
              <p>客服热线 : 185-1348-2046</p>
                  <a href="tel://18513482046" class="call">
                        <span>
                        拨打
                        </span>
                  </a>
          </li>
          <li>
              <p>客服邮箱 : zg-kefu@zg18.com</p>
                 <!-- <a href="mailto:zg-kefu@zg18.com" class="send">
                        <span>
                        发送
                        </span>
                 </a> -->
          </li>
      </ul>
  </div>
</template>
<script>
import sharewechat from "../router/sharewechat";
export default {
  data(){
      return{}
  },
  mounted(){
      sharewechat(window.location.href.split("#")[0]);
  }
}
</script>
<style lang="scss" scoped>
    $x:37.5;
    .top_bg{
        width: 375rem/$x;
        height: 200rem/$x;
        position: relative;
    }
    .top_bg>img{
        width: 97rem/$x;
        height: 97rem/$x;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .ctn>li{
        width: 375rem/$x;
        height: 55rem/$x;
        text-align: left;
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        background: #fff;
        line-height: 55rem/$x;
    }
    .ctn>li>p:nth-of-type(1){
        float: left;
        font-family: STHeitiSC-Medium;
        font-size: 15px;
        color: #333333;
        letter-spacing: 0.18px;
        margin-left: 15rem/$x;
        
    }
    .btn{
        float:right;
        position: relative;
        margin-right: 15rem/$x;
        width: 60rem/$x;
        height: 28rem/$x;
        background: #FDD545;
        border-radius: 24px;
        margin-top: 14rem/$x;
    }
    .call{
        display: inline-block;
        width: 68rem/$x;
        height: 33rem/$x;
        float: right;
        background: #FDD545;
        text-align: center;
        border-radius: 24px;
        margin-top: 12rem/$x;
        margin-right: 15rem/$x;
        color: #000;

    }
    .call>span{
        display: block;
        margin-top: -10rem/$x;
    }
    .send{
        display: inline-block;
        width: 68rem/$x;
        height: 33rem/$x;
        float: right;
        background: #FDD545;
        text-align: center;
        border-radius: 24px;
        margin-top: 12rem/$x;
        margin-right: 15rem/$x;
        color: #000;

    }
    .send>span{
        display: block;
        margin-top: -10rem/$x;
    }
    // .btn>p{
    //     position: absolute;
    //     left: 18px;
    //     top: -14px;
    //     font-family: STHeitiSC-Medium;
    //     font-size: 13px;
    //     color: #333333;
    //     letter-spacing: 0.16px;
    // }
</style>



