import axios from 'axios';
import wx from 'weixin-js-sdk'
const sharewechat = (url)=>{
    console.log("sharewechat")
    //微信js-sdk
    axios.get('/wechat_share', { params: {url: url}}).then(res => {
        console.log(res);
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

        wx.ready(function() {
            console.log("成功");
            wx.onMenuShareAppMessage({
                title: '筋灵十三猜', // 分享标题
                desc: '筋灵十三猜是一款竞猜的轻应用，问题和回答都很有趣，还在等什么，赶紧来加入吧', // 分享描述
                link: `${url}?shareUrl=`+url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: 'http://pic2.16pic.com/00/12/07/16pic_1207885_b.jpg', // 分享图标
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

    }).catch((error) => {
        console.log(error);
    });
}
export default sharewechat;