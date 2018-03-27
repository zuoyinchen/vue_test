<template>
  <div class="box">
       <div class="countdown" v-if="status==1">
          <span class="counttest">倒计时</span>
          <span>
                <countdown :time="time" class="countdown">
                        <template slot-scope="props" >{{ props.minutes }}:{{ props.seconds }} </template>
                </countdown>
          </span>
      </div>
      <div class="btn">
          <p>{{title}}</p>
          <div class="clearfix">
              <div><i class="iconfont icon-xianshimima"></i><span>{{readnum}}</span></div>
              <div><i class="iconfont icon-pinglun"></i><span>{{answernum}}</span></div>
          </div>
      </div>
      <form action="" method="post">
        <textarea name="" class="int" id="ctn"></textarea>
        <input  type="button" name="button" value="提交" class="int_sub" @click="submit"/> 
      </form>
  </div>
</template>
<script>
 // const $url = 'https://www.13cai.com.cn/api/v1';
 const $url = 'https://www.13cai.com.cn/api/v1';
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
        }
    },
    methods:{
        submit:function(){
            const body = $('#ctn').val();
            const userQuestion = localStorage.getItem("userQuestion");//参数集合
            const userQuestionobj = JSON.parse(userQuestion);
            const topic = userQuestionobj.topicid;
            const createdBy = localStorage.getItem('userid');
            console.log(newMsg)
            const newMsg = {
                body,
                topic,
                createdBy
            }
            this.$http.post($url+'/answer',JSON.stringify(newMsg)).then(res=>{
               if (res.status === 200 || res.status === 201) {
                    
                    this.$router.replace('/answerDetail');
                }
           
            });
        }
    },
    mounted(){
        const userQuestion = localStorage.getItem("userQuestion");//参数集合
        const userQuestionobj = JSON.parse(userQuestion);
        this.title = userQuestionobj.title;
        this.time = Number(userQuestionobj.time);
        this.status = userQuestionobj.status;
        this.readnum = Number(userQuestionobj.readnum);
        this.answernum =  Number(userQuestionobj.answernum);
        this.topicid = userQuestionobj.topicid;
        console.log(this.title);
        // const $url = 'http://192.168.1.116:1337';
        // const topicid = this.topicid;//问题id

        // const data ={
        //     search:JSON.stringify({topic: topicid}),
        //     userid:$userid
        // };
        // this.$http.get($url+'/answer', {params:data}).then(res=>{
        //     this.msg = res.data;
        // }).catch((error)=>{
        //     console.log(error);
        // });

    }
}
</script>
<style lang="scss" scoped>
    $x:37.5;
    .countdown{font-family: STHeitiSC-Medium;
font-size: 14px;
color: #333333;
letter-spacing: -0.39px;}
    .counttest{
        font-family: STHeitiSC-Medium;
font-size: 14px;
color: #333333;
letter-spacing: -0.39px;
    }
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
    .btn{
        background: #FFFFFF;box-shadow: 0 2px 6px 0 #DDDDDD;border-radius: 10px;margin: 0 auto;overflow: hidden;
        margin-top: 15rem/$x;text-align: left;
    }
    .btn>p:nth-of-type(1){
        font-family: STHeitiSC-Medium;font-size: 18px;color: #333333;letter-spacing: 0.22px;
        margin: 15rem/$x;
    }
    .btn>p:nth-of-type(1)>div{
        float: left;margin: 15rem/$x;
    }
    .btn>div:nth-of-type(1)>div:nth-of-type(1){
        font-family: STHeitiSC-Medium;font-size: 12px;color: #BDBDBD;letter-spacing: -0.26px;
        float: left;margin: 15rem/$x;
    }
    .btn>div:nth-of-type(1)>div:nth-of-type(2){
        font-family: STHeitiSC-Medium;font-size: 12px;color: #BDBDBD;letter-spacing: -0.26px;
        float: left;margin: 15rem/$x 5rem/$x;
    }
    .int{
        width: 345rem/$x;height: 240rem/$x;margin-top: 20rem/$x;
    }
    .int_sub{
        width: 345rem/$x;height: 42rem/$x;margin-top: 20rem/$x;
        background: #FDD545;border-radius: 4px;font-family: STHeitiSC-Medium;
font-size: 17rem/$x;
color: #333333;
line-height: 42rem/$x;
    }
</style>


