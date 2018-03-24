<template>
  <div class="box">
      <div class="top_bg">
          <img src="../assets/images/group.png" alt="">
      </div>
      <ul class="ctn">
          <li>
              <p>客服热线 : 185-1348-2046</p>
              <div class="btn">
                  <p>拨打</p>
              </div>
          </li>
          <li>
              <p>客服邮箱 : zg-kefu@zg18.com</p>
              <div class="btn">
                  <p>发送</p>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data(){
      return{

      }
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
    .btn>p{
        position: absolute;
        left: 18px;
        top: -14px;
        font-family: STHeitiSC-Medium;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0.16px;
    }
</style>



