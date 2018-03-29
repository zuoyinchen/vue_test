<template>
	<div class="box">
		<scroller  v-if="prolist.length>0" :on-refresh="refresh"
  :on-infinite="infinite" ref="myscroller">
			<ul class="box-list">
				<li v-for="(item,index) in prolist" to="" :key="index">
					<span class="status-bac status-bac-yellow" v-if="item.status == 1"></span>
					<span class="status-bac" v-else-if="item.status==2"></span>
					<span class="status" v-if="item.status == 1">进行中</span>
					<span class="status" v-else-if="item.status == 2">已结束</span>
					<span class="status" v-else></span>
	                <p class="title" @click="gotoDetail($event)" :data-title="item.title" :data-rnum="item.readNum" :data-anum="item.messageNum" :data-status="item.status" :data-tid="item.id" :data-time="item.time">{{item.title}}</p>
					<ul class="clearfix">
					  <li v-if="item.status==2" @click="goSiglepai($event)" :data-tid="item.id" :data-title="item.title">
	                        <i class="iconfont icon-paihangbang"></i>
	                  		<span>排行榜</span>
	                  </li>
	                  <li>
	                  	<i class="iconfont icon-xianshimima"></i>
	                  	<span>{{item.readNum?item.readNum:0}}</span>
	                  </li>
	                  <li @click="gotoDetail($event)" :data-title="item.title" :data-rnum="item.readNum? item.readNum : 0" :data-anum="item.messageNum?item.messageNum :0" :data-status="item.status" :data-tid="item.id" :data-time="item.time">
	                  	<i class="iconfont icon-pinglun"></i>
	                  	<span>{{item.messageNum?item.messageNum :0}}</span>
	                  </li>
	                  <li class="time" v-show="item.status==1">
	                  	<i></i>
	                  	<span>倒计时</span>
	                  	<span>
	                  		<countdown :time="item.time" class="countdown">
	                            <template slot-scope="props" >{{ props.hours }}:{{ props.minutes }}:{{ props.seconds }} </template>
	                        </countdown>
	                  	</span>
	                  </li>
	              </ul>
				</li>
			</ul>
		</scroller>
		<div v-show="isShow" class="no_data">
            <img src="../assets/images/canyuchang.png">
            <p>您还没有参与的场次</p>
            <router-link tag="a" class="goHome" to="./">去逛逛</router-link>
        </div>
	</div>	
</template>
<script type="text/javascript">
	import 'mint-ui/lib/style.css'
    import { MessageBox,Toast,Indicator} from 'mint-ui';
	const $userid = localStorage.getItem("userid");//userid
	export default{
		name: 'userproject',
		data(){
			return {
				prolist:[],
				page:1,
				size:5,
				isShow:false
			}
		},
		methods:{
			getInitialData:function(){
				this.noData='';
	            const data = {
	                limit : this.page*this.size,
	                sort:JSON.stringify({ createdAt:0}),
	                search: { createdBy:$userid }
	            }
	            this.$axios.get('/answers',{params:data}).then((res)=>{
	            	console.log(res);
	                Indicator.close();
	                if(res.data&&res.data.length){
	                    this.prolist = res.data;
	                }else{
	                    this.isShow = true;
	                }
		        }).catch((error)=>{
		        	Indicator.close();
	                Toast({message:"网络错误，请刷新",duration:-1});
                	console.log(error);
                });
			},
			refresh:function(done) {
              setTimeout(() => {
                this.size = 5;
                this.page = 1;
                this.getInitialData();
                done();
              }, 1500);
            },
            infinite:function(done) {
              if(this.noData) {
                  setTimeout(()=>{
                      done(true);
                  });
                return;
              }
              setTimeout(() => {
                this.page++;
                const data = {
	                limit : this.page*this.size,
	                sort:JSON.stringify({ createdAt:0}),
	                search: { createdBy:$userid }
	            }
                this.$axios.get('/answers',{params:data}).then((res)=>{
		            this.prolist = res.data;
		        }).catch((error)=>{
                	console.log('error');
                });
                const limit = this.page*this.size;
                if(this.prolist.length <= limit){
                  this.noData='没有更多数据';
                }
                 done();
              }, 3000);
            },
            gotoDetail:function(event){
	          const topicid = event.currentTarget.dataset.tid;//问题id
	          const readnum = event.currentTarget.dataset.rnum;//阅读数
	          const answernum = event.currentTarget.dataset.anum;//评论数
	          const status = event.currentTarget.dataset.status;//状态
	          const time = event.currentTarget.dataset.time;//倒计时时间
	          const title = event.currentTarget.dataset.title;//问题标题

	          const query = {
	            topicid : topicid,
	            readnum : readnum,
	            answernum : answernum,
	            status : status,
	            time : time,
	            title : title
	          }

	          localStorage.setItem("query",JSON.stringify(query));
	          this.$router.push('/answerDetail');
	        },
	        goSiglepai:function(event){
	          const topicid = event.currentTarget.dataset.tid;//问题id
	          const title = event.currentTarget.dataset.title;//问题标题
	          const squery = {
	            topicid : topicid,
	            title : title
	          }
	          localStorage.setItem("squery",JSON.stringify(squery));
	          this.$router.replace('/singlepai');
	        }
		},
		mounted:function(){
			this.getInitialData();
		},
		beforeCreate:function(){
			Indicator.open();
		}
	}
</script>
<style scoped lang="scss">
	$unit:37.5;
	.box{
		width:100%;
		height:100%;
		.box-list{
			width:345rem/$unit;
			height:auto;
			margin:0 auto;
			list-style: none;
			padding-top:15rem/$unit;
			overflow: hidden;

		}
		.box-list>li{
			width:100%;
		    height:105rem/$unit;
		    background: #FFFFFF;
			box-shadow: 0 2px 6px 0 #DDDDDD;
			border-radius: 10rem/$unit;
			float: left;
			position:relative;
			margin-bottom:15rem/$unit;
			overflow: hidden;
			.status-bac{
				display:inline-block;
				width:0;
				height:0;
			    border-width: 25rem/$unit;
			    border-color: #666 transparent transparent #666;
			    border-style: solid;
			    border-top-left-radius: 10px;
				position: absolute;
				left:0;
				top:0;
			}
			.status-bac.status-bac-yellow{
				border-color:#FDD545 transparent transparent #FDD545;
			}
			.status-bac.status-bac-white{
				border-color:#fff transparent transparent #fff;
			}

			.status{
				display: inline-block;
				line-height: 33.9rem/$unit;
				text-align: center;
				transform: rotate(-45deg);
				font-family: STHeitiSC-Medium;
				font-size: 12px;
				color: #FFFFFF;
				letter-spacing: -0.29px;
				position: absolute;
				left:0;
				top:0;
			}
			.title{
				width:256rem/$unit;
				height:auto;
				font-family: STHeitiSC-Medium;
				line-height: 19rem/$unit;
				font-size: 18px;
				color: #333333;
				letter-spacing: 0.22px;
				margin:15rem/$unit auto 20rem/$unit;
				border-radius: 10rem/$unit;
				text-align:left;
				overflow:hidden;
                text-overflow:ellipsis;
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
			}
			.title-infor{
				width:100%;
				height:35rem/$unit;
				line-height: 35rem/$unit;
				display: block;
				display:flex;
				background: #FAFAFA;
				font-family: STHeitiSC-Medium;
				font-size: 12px;
				color: #BDBDBD;
				letter-spacing: -0.26px;

			}
			.title-infor>span{
				width:auto;
				flex:1;
			}
			
		}
	}
	.clearfix:after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    }
	.box-list ul{
        width: 345rem/$unit;
        height: 35rem/$unit;
        padding: 0;
        border-radius: 10rem/$unit;
        position: absolute;
        left:0;
        bottom:0;
    }
    .box-list ul>li{
    	width: 115rem/$unit;
    	height: 35rem/$unit;
    	float: left;
    	line-height: 35rem/$unit;
    	margin: 0 0;
    	background-color: #fafafa;
    	position: relative;
    }
    .box-list ul .time{
    	background:#fdd545;
    	border-bottom-right-radius: 10px;
    }
    .box-list ul>li>span{
        margin-left: 10rem/$unit;
    }
    .no_data{
        width:100%;
        text-align: center;
        line-height: 20rem/$unit;
        font-family: PingFangSC-Regular;
		font-size: 13px;
		color: #4C3A30;
		letter-spacing: 0.26px;
        img{
            width:161rem/$unit;
            height:88rem/$unit;
            display: inline-block;
            margin-top: 48rem/$unit;
            margin-bottom: 20rem/$unit;
        }
    }
    .goHome{
        width:auto;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FF8500;
        letter-spacing: 0;
    }

</style>