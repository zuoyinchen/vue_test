<template>
    <div class="box">
        <h1 class="feed_title">用户反馈</h1>
        <div class="feedback_box">
            <textarea name="" class="int" id="ctn" placeholder="请输入......"  v-model="message" minlength="6" maxlength="250"></textarea>
            <button type="button" class="int_sub" @click="submit($event)" :data-message="message">提交</button>
      </div>
    </div>
</template>
<script>
     import 'mint-ui/lib/style.css'
    import { MessageBox,Toast,Indicator} from 'mint-ui';
    export default{
        name : "feedback",
        data(){
            return {
                msg:"你好",
                message:""
            }
        },
        methods:{
            submit:function(event){
                console.log(event.currentTarget.dataset);
               const feedmsg = event.currentTarget.dataset.message;
               //提交答案不能为空
                if(!feedmsg){
                    let instance = Toast("提交答案不能为空");
                    setTimeout(() => {
                      instance.close();
                    }, 1000);
                    return false;
                }
                Indicator.open();
                const newmsg = {
                    message : feedmsg,
                }
                this.$axios.post('/feedback',newMsg).then(res=>{
                    if (res.status === 200 || res.status === 201) {
                            Indicator.close();
                            let instance = Toast("提交成功");
                            setTimeout(() => {
                            instance.close();
                            }, 1000);
                    }
                }).catch((error)=>{
                    console.log(error);
                });
            }
        }
    }
</script>
<style scoped lang="scss">
    $unit :37.5;
    .box{
        width: 345rem/$unit;
        height: 100%;
        margin: 0 auto;
        padding-top: 10rem/$unit;
        box-sizing: border-box;

        .feed_title{
            
        }

        .feedback_box{
            width:100%;
            height:auto;
            .int {
                width: 345rem/$unit;
                height: 240rem/$unit;
                margin-top: 20rem/$unit;
                padding:10rem/$unit;
                border: none;
                background: #FFFFFF;
                box-shadow: 0 2px 6px 0 #DDDDDD;
                border-radius: 10px;
                box-sizing: border-box;
                font-size: 14rem/$unit;
                text-indent: 5rem/$unit;
                line-height: 24rem/$unit;
            }
            .int_sub{
                width: 345rem/$unit;
                height: 42rem/$unit;
                margin-top: 20rem/$unit;
                border:none;
                background: #FDD545;
                border-radius: 4px;
                font-family: STHeitiSC-Medium;
                font-size: 17rem/$unit;
                color: #333333;
                line-height: 42rem/$unit;
                margin-bottom: 40rem/$unit;
            }
            input,
            select,
            textarea {
                -webkit-appearance: none;
                appearance: none;
            }
        }
    }
</style>

