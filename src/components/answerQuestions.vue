<template>
    <div class="box">
        <div class="countdown" v-if="status==1">
            <span class="counttest">倒计时</span>
            <span>
                                    <countdown :time="time" class="countdown" :key="time">
                                            <template slot-scope="props" >{{props.hours}}:{{ props.minutes }}:{{ props.seconds }}
</template>
                </countdown>
          </span>
      </div>
      <div class="btn">
          <p>{{title}}</p>
          <div class="clearfix">
              <div class="icon_eye"><i class="iconfont icon-xianshimima"></i><span>{{readnum}}</span></div>
              <div class="icon_pin"><i class="iconfont icon-pinglun"></i><span>{{answernum}}</span></div>
          </div>
      </div>
      <div>
        <textarea name="" class="int" id="ctn" v-model="message" placeholder="请输入......"></textarea>
        <button type="button"class="int_sub"@click="submit($event)" :data-message="message">提交</button>
      </div>
  </div>
</template>

<script>
 import 'mint-ui/lib/style.css'
 import { MessageBox,Toast,Indicator} from 'mint-ui';
 import sharewechat from "../router/sharewechat";
 export default {
    name:'answerQuestions',
    data(){
        return {
            status:'',
            topicid:'',
            time:0,
            title:'',
            readnum:'',
            answernum:'',
            message:''
        }
    },
    methods:{
        
        submit:async function(event){
            console.log(event.currentTarget.dataset);
            const message = event.currentTarget.dataset.message;
            const userQuestion = localStorage.getItem("userQuestion");//参数集合
            const userQuestionobj = JSON.parse(userQuestion);
            const topicid= userQuestionobj.topicid;
            const createdBy = localStorage.getItem('userid');

            if(!createdBy){
                MessageBox.alert('您还未关注筋灵十三猜公众号，关注后进入筋灵十三猜菜单即可答题').then(action=>{

                });
                return false;
            }
            //提交答案不能为空
            if(!message){
                Toast("提交答案不能为空");
                return false;
            }
            Indicator.open();
            const newMsg = {
                body:message,
                topic:topicid,
                createdBy:localStorage.getItem('userid')
            }
            await this.$axios.post('/answer',newMsg).then(res=>{
                console.log(res);
               if (res.status === 200 || res.status === 201) {
                    Indicator.close();
                    localStorage.setItem("isAnswer",true);
                    console.log(this.$route.params.frompage);
                    if(this.$route.params.frompage == 1){
                        this.$router.go(-1);
                    }else{
                        this.$router.go(-2);
                    }
                    
                }
                console.log(newMsg)
            }).catch((error)=>{
                if(error.response.data.code == 505){
                    console.log("敏感");
                    let instance = Toast('提交含有敏感词， 请检查提交文本');
                    setTimeout(() => {
                      instance.close();
                    }, 1000);
                    
                }else{
                    console.log("不敏感");
                    let instance = Toast('网络错误，请刷新');
                    setTimeout(() => {
                      instance.close();
                    }, 1000);
                }
            });
        }
    },
    mounted() {
        this.topicid = this.$route.params.topicid;
        this.$axios.get(`/topic/${this.$route.params.topicid}`).then(res => {
            this.title = res.data.title;
            this.time = res.data.second;
            this.status = res.data.status;
            this.readnum = res.data.readNum;
            this.answernum = res.data.messageNum;
        });
        
        console.log(this.title);
        sharewechat(window.location.href.split("#")[0],true);
    },
    beforeRouteLeave (to, from, next) {
        next();
        const url = 'https://'+window.location.host+to.fullPath;
        sharewechat(url);
    }
}
</script>

<style lang="scss" scoped>
    $x:37.5;
    .countdown{
      font-family: STHeitiSC-Medium;
      font-size: 13px;
      color: #333333;
      letter-spacing: -0.39px;
    }
    .counttest{
      font-family: STHeitiSC-Medium;
      font-size: 13px;
      color: #333333;
      letter-spacing: -0.39px;
    }
    .clearfix:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    
    .box {
        width: 345rem/$x;
        height: 100%;
        margin: 0 auto;
    }
    
    .countdown {
        width: 110rem/$x;
        height: 30rem/$x;
        border-radius: 100rem/$x;
        background: #fdd545;
        line-height: 30rem/$x;
        margin-top:10rem/$x;
    }
    
    .countdown>span:nth-of-type(1) {
        font-size: 13px;
        letter-spacing: -0.39rem/$x;
    }
    
    .countdown>span:nth-of-type(2) {
        margin-left: 5rem/$x;
        font-size: 8rem/$x;
        letter-spacing: -0.39rem/$x;
    }
    
    .btn {
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        margin: 0 auto;
        overflow: hidden;
        margin-top: 15rem/$x;
        text-align: left;
    }
    
    .btn>p:nth-of-type(1) {
        font-family: STHeitiSC-Medium;
        font-size: 18px;
        color: #333333;
        letter-spacing: 0.22px;
        margin: 15rem/$x;
        font-weight: 500;
        line-height: 22rem/$x;
    }
    
    .btn>p:nth-of-type(1)>div {
        float: left;
        margin: 15rem/$x;
    }
    
    .btn>div:nth-of-type(1)>div:nth-of-type(1) {
        font-family: STHeitiSC-Medium;
        font-size: 12px;
        color: #BDBDBD;
        letter-spacing: -0.26px;
        float: left;
        margin: 13rem/$x;
    }
    
    .btn>div:nth-of-type(1)>div:nth-of-type(2) {
        font-family: STHeitiSC-Medium;
        font-size: 12px;
        color: #BDBDBD;
        letter-spacing: -0.26px;
        float: left;
        margin: 15rem/$x 5rem/$x;
    }
    
    .int {
        width: 345rem/$x;
        height: 240rem/$x;
        margin-top: 20rem/$x;
        padding:10rem/$x;
        border: none;
        background: #FFFFFF;
        box-shadow: 0 2px 6px 0 #DDDDDD;
        border-radius: 10px;
        box-sizing: border-box;
        font-size: 14rem/$x;
        text-indent: 5rem/$x;
        line-height: 24rem/$x;
    }
    .int_sub{
        width: 345rem/$x;
        height: 42rem/$x;
        margin-top: 20rem/$x;
        border:none;
        background: #FDD545;
        border-radius: 4px;
        font-family: STHeitiSC-Medium;
        font-size: 17rem/$x;
        color: #333333;
        line-height: 42rem/$x;
        margin-bottom: 40rem/$x;
    }
    input,
    select,
    textarea {
        -webkit-appearance: none;
        appearance: none;
    }
    .icon_eye{
       
    }
    .icon_eye>i:nth-of-type(1){
        font-size: 14px;
    }
    .icon_eye>span:nth-of-type(1){
        padding-left: 8rem/$x;
    }
    .icon_pin{
        
    }
    .icon_pin>i:nth-of-type(1){
        font-size: 12px;
    }
    .icon_pin>span:nth-of-type(1){
        padding-left: 8rem/$x;
    }
</style>


