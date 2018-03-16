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
          <li class="clearfix">
              <div class="ctn_l">
                  <i>1</i>
                  <img src="" alt="">
              </div>
              <div class="ctn_r">
                  <div>
                      <span>李强</span>
                      <i class="iconfont icon-fenxiang"></i>
                      <i class="iconfont icon-shoucang1"></i>
                  </div>
                  <p>
                      开场白？耳光太响没听清反对撒方式方法反反复复反反复复
                      反对撒方式方法反反复复反反复复
                      反对撒方式方法反反复复反反复复
                      反对撒方式方法反反复复反反复复
                      反对撒方式方法反反复复反反复复

                      反对撒方式方法反反复复反反复复
                  </p>
                  <div class="clearfix">
                      <div>
                          <span>2018-1-29 13:13</span>
                      </div>
                      <div class="clearfix">
                          <div>
                              <i class="iconfont icon-dianzan"></i>
                              <span>1212</span>
                          </div>
                          <div>
                              <i class="iconfont icon-pinglun"></i>
                              <span>1313</span>
                          </div>
                      </div>
                  </div>
              </div>
          </li>
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
    },
    beforeCreate(){
        this.$http.get('//192.168.1.148:1337/topic').then(res=>{
                this.msg = res.data
               // console.log(res.data);
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
        font-size: 12px;color: #BDBDBD;
    }
    .icon-pinglun{
        font-size: 12px;color: #BDBDBD; 
    }
    .icon-dianzan{
        font-size: 12px;color: #BDBDBD;
    }
    ul,li{list-style: none;}
    .ctn>li{
        width: 345rem/$x;height:100%;
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        margin-top: 15rem/$x;
    }
    .ctn_l{position: relative;width: 62rem/$x;float: left;}
    .ctn_l>i{width: 17rem/$x;height: 17rem/$x;background: #FDD545;display: inline-block;border-radius: 50%;position: absolute;
    top:10rem/$x;left: 12rem/$x;}
    .ctn_l>img{width: 32rem/$x;height: 32rem/$x;background: #FDD545;display: inline-block;border-radius: 50%;margin-left: 15rem/$x;margin-top: 15rem/$x;}
    .ctn_r{
        width: 283rem/$x;float: left;text-align: left;overflow: hidden;margin-top: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(1)>span{
        font-family: STHeitiSC-Medium;
        font-size: 16rem/$x;
        color: #333333;
        letter-spacing: 0.19px;
    }
    .ctn_r>div:nth-of-type(1)>i{
        float: right;color: #fdd545;margin-right: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(1)>i:nth-of-type(2){
        float: right;color: #fdd545;margin-right: 5rem/$x;
    }
    .ctn_r>p:nth-of-type(1){
        width: 268rem/$x;
        font-family: STHeitiSC-Medium;
        font-size: 14px;
        color: #666666;
        letter-spacing: 0.17px;
        margin-top: 10rem/$x;
    }
    .ctn_r>div:nth-of-type(2){
        margin-top: 16rem/$x;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(1){
        float: left;font-family: STHeitiSC-Medium;
        font-size: 12rem/$x;
        color: #BDBDBD;
        letter-spacing: 0.14rem/$x;
        padding-bottom: 15rem/$x;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(2){
            float: right;
    }
    .ctn_r>div:nth-of-type(2)>div:nth-of-type(2)>div{float: left;margin-right: 15rem/$x;color: #BDBDBD;}
</style>

