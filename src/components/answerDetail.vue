<template>
  <div class="box">
      <div class="countdown">
          <span>倒计时</span>
          <span>7:59</span>
      </div>
      <div class="theme">
          <p class="theme_t">
              你妈打你前，都说什么开场白？
          </p>
          <div class="theme_b clearfix">
              <div class="theme_b_l">
                  <div>
                      <i class="iconfont icon-wode"></i>
                      <span>1313</span>
                  </div>
                  <div>
                      <i class="iconfont icon-pinglun"></i>
                      <span>1313</span>
                  </div>
              </div>
              <div class="theme_b_r">
                  <p>立即抢答</p>
              </div>
          </div>
      </div>
      <ul class="ctn">
          <li>
              <div class="ctn_l">
                  <i>1</i>
                  <img src="" alt="">
              </div>
              <div class="ctn_r">
                  <div>
                      <span></span>
                      <i></i>
                      <i></i>
                  </div>
                  <p>

                  </p>
                  <div>
                      <div>
                          <span></span>
                      </div>
                      <div>
                          <div>
                              <i></i>
                              <span></span>
                          </div>
                          <div>
                              <i></i>
                              <span></span>
                          </div>
                      </div>
                  </div>
              </div>
          </li>
          <li></li>
          <li></li>
          <li></li>
      </ul>
  </div>
</template>
<script>
export default {
    name:"answerDetail",
    data(){
        return {
            msg:""
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
    .box{
        width: 345rem/$x;height: 100%;margin: 0 auto;
    }
    .countdown{
        width: 106rem/$x;height: 30rem/$x;border-radius: 100rem/$x;background: #fdd545;
        line-height: 30rem/$x;
    }
    .countdown>span:nth-of-type(1){
        font-size: 14rem/$x;letter-spacing: -0.39rem/$x;
    }
    .countdown>span:nth-of-type(2){
        font-size: 14rem/$x;letter-spacing: -0.39rem/$x;
    }
    .theme{
        width: 345rem/$x;height: 100%;background: #FFFFFF;box-shadow: 0 2px 6px 0 #DDDDDD;border-radius: 10px;
        overflow: hidden;margin-top: 15rem/$x;
    }
    .theme_t{
       font-family: STHeitiSC-Medium;font-size: 18rem/$x;letter-spacing: 0.22rem/$x;color-interpolation-filters: #333;
       text-align: left;margin-left: 15rem/$x;margin-top: 15rem/$x;
    }
    .theme_b{
        width: 345rem/$x;margin-left: 15rem/$x;margin-bottom: 15rem/$x;margin-top: 15rem/$x;
    }
    .theme_b_l{
        width: 100rem/$x;float: left;height: 24rem/$x;color: #BDBDBD; 
    }
    .theme_b_l>div:nth-of-type(1){
        width: 45rem/$x;float: left;line-height: 24rem/$x;
    }
    .theme_b_l>div:nth-of-type(2){
        width: 45rem/$x;float: left;line-height: 24rem/$x;
    }
    .theme_b_r{
        width: 76rem/$x;float: right;height: 24rem/$x;margin-right: 30rem/$x;
        background: #FDD545;
        border-radius: 4px;
    }
    .theme_b_r > p{
        font-family: STHeitiSC-Medium;font-size: 14px;color: #333333;letter-spacing: 0.17px;padding: 4rem/$x 9rem/$x 6 rem/$x 10rem/$x;
        line-height: 24rem/$x;
    }
    .theme_b_l>div:nth-of-type(2){
        margin-left: 10rem/$x;
    }
    .icon-wode{
        font-size: 12px;
    }
    .icon-pinglun{
        font-size: 12px; 
    }
</style>

