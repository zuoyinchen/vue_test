import axios from 'axios';
import wx from 'weixin-js-sdk'
const sharewechat = {
    shareConfig:(url, sflag)=>{
        let sharedesc;
        if(sflag){
            sharedesc = '我在“筋灵十三猜”发现了一个很有内涵的问题,你确定不来看看吗？';
        }else{
            sharedesc = '筋灵十三猜，一款靠谱的说人话、找答案、有内涵的趣味百科轻应用。在这里，你可以分享自己的观点、经验，并发现其他有趣的灵魂。还等什么？赶紧来玩吧!';
        }
        //微信js-sdk
        axios.get('/wechat_share', { params: {url: url}}).then(res => {
            console.log('wechat_share', res.data);
            const appid = res.data.appId;
            const nonceStr = res.data.nonceStr;
            const signature = res.data.signature;
            const timestamp = res.data.timestamp;
            //配置微信js-sdk
            wx.config({
                debug: true, //
                appId: appid, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名
                jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
            });   
            sharewechat.shareReady(url, sharedesc);
        }).catch((error) => {
            console.log('wechat_share_error', error);
        });
    },
    shareReady: (url, sharedesc) => {
        wx.ready(function() {
            console.log("wx.ready-url", url);
            wx.onMenuShareAppMessage({
                title: '筋灵十三猜', // 分享标题
                desc: sharedesc, // 分享描述
                link: `${url}?shareUrl=`+url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://cdn.zg18.com/13cai_logo.png', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                    console.log("成功");
                },
                cancel: function () {
                    console.log("取消");
                // 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function(res) {
            console.log("失败");
        });
    }
}
export default sharewechat;