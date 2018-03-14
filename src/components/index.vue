<template>
  <div class="box">
      <div class="nav clearfix">
          <div>
              <span>下场开始时间</span>
              <span>13:13</span>
          </div>
          <div>
              <span>游戏规则</span>
         </div>
      </div>
      <ul class="btn">
          <li>
              <div class="btn_t1">
                  <img src="" alt="" class="loading">
                  <p>{{msg}}</p>
                  <ul class="clearfix">
                      <li><i class="iconfont icon-wode"></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li style="background:#fdd545;border-bottom-right-radius: 10px;"><i></i><span>倒计时</span><span>12:59</span></li>
                  </ul>
              </div>
          </li>
          <li>
              <div class="btn_t1">
                  <img src="" alt="" class="loading">
                  <p>有哪些道理，大家不说但心里都明白？</p>
                  <ul class="clearfix">
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span></li>
                  </ul>
              </div>
          </li>
          <li>
              <div class="btn_t1">
                  <img src="" alt=""  class="loading">
                  <p>哪一瞬间让你发现贫穷限制了你的想象力？</p>
                  <ul class="clearfix">
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span></li>
                  </ul>
              </div>
          </li>
          <li>
              <div class="btn_t1">
                  <img src="" alt="" class="loading">
                  <p>你在酒店做过最丧心病狂的事是什么？</p>
                  <ul class="clearfix">
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span><i class="s"></i></li>
                      <li><i></i><span>1616</span></li>
                  </ul>
              </div>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  name:"index",
  data(){
      return {
          msg:"你妈打你前，都说什么开场白？"
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
    .btn_t1>.height_light{background: #FDD545;}
   ul{padding: 0;}
    .nav{
        width: 345rem/$x;height: 35rem/$x;margin:0 auto;border-radius: 100rem/$x;border: 1px solid #FDD545;

    }
    .nav>div:nth-of-type(1){
        width: 120rem/$x;height: 18rem/$x;font-size: 13rem/$x;letter-spacing: 0.16rem/$x;
        line-height: 18rem/$x;float: left;
        margin: 8rem/$x 0 0 116rem/$x;
    }
    .nav>div:nth-of-type(1)>span:nth-of-type(1){
        width: 90rem/$x;
    }
    .nav>div:nth-of-type(1)>span:nth-of-type(2){
        width: 24rem/$x;
    }
    .nav>div:nth-of-type(2){
         width: 53rem/$x;height: 18rem/$x;font-size: 13rem/$x;letter-spacing: 0.16rem/$x;
        line-height: 18rem/$x;float: right;margin: 8rem/$x 10rem/$x 0 0;
    }
    .nav>div:nth-of-type(2)>span:nth-child(1){
        width: 53rem/$x;height: 18rem/$x;font-size: 13rem/$x;line-height: 18rem/$x;color: #FDD545;
    }
    ul,li{
        list-style: none;-webkit-padding-start: 0;
    }
    .btn{
        padding: 0;
    }
    .btn>li{
        width: 345rem/$x;height: 105rem/$x;border: 10rem/$x;box-shadow: 0 2px 6px 0 #dddddd;
        margin: 20rem/$x auto;border-radius: 10rem/$x;
    }
    .btn_t1{
        width: 345rem/$x;height: 105rem/$x;position: relative;overflow: hidden;
    }
    .loading{position: absolute;left: 0;top: 0;}
    .btn_t1>p{font-size: 18rem/$x;color: #333333;height: 60rem/$x;width: 256rem/$x;margin: 0 auto;margin-top: 10rem/$x;
   text-align: left;
   }

    .btn_t1>ul{
        width: 345rem/$x;height: 35rem/$x;padding: 0;border-radius: 10rem/$x;
    }
    .btn_t1>ul>li{width: 115rem/$x;height: 35rem/$x;float: left;line-height: 35rem/$x;margin: 0 0;
    background-color: #fafafa;position: relative;}
    
</style>

