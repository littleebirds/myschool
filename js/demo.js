window.onload=function () {
    var oWel=document.getElementById('welcome');
    var oBox=document.getElementById('box');
    var oPage1=fun.getClass2(document,'page1')[0];
    var oPage2=fun.getClass2(document,'page2')[0];
    var oPage3=fun.getClass2(document,'page3')[0];
    var oPage4=fun.getClass2(document,'page4')[0];
    var oPage =fun.getClass2(document,'page');
    var oMusic=document.getElementById('music').getElementsByTagName('img')[0];
    var oAudio=document.getElementsByTagName('audio')[0];
    var angle=0;
    var speed=90;
    var rate=parseInt(fun.getStyle2(oBox,'width'))/180;
    var disx=0;
    var timer1=null;


    //  跨终端定义事件类型
    var startE,moveE,endE;
    if('ontouchstart' in window){
        startE='touchstart';
        moveE='touchmove';
        endE='touchend';
    }else{
        startE='mousedown';
        moveE='mousemove';
        endE='mouseup';
    }
    //控制音乐播放

    fun.addEvent1(oMusic,startE,function(){
        if(oAudio.paused){
            oAudio.play();
        }else{
            oAudio.pause();
        }
    });

    //首页淡出
    moveDir(oWel,function() {
        oWel.className+='fadeOut';
        setTimeout(function(){
            oWel.style.display='none';},
            1000);
        if(fun.getStyle1(oBox,'display')=='none'){
            oBox.style.display='block';
        }


        oBox.className+=' fadeIn';


        //Box盒子动作完成后，执行当前页面动画
        setTimeout(function () {
            oBox.style.transform='rotate(0deg)';
            //第一页
            one();
        },1000);
    });
    //手势翻转
    moveDir(oBox,fnr,"",fnl,"");

    //监听横屏
    window.onorientationchange=function () {

    };

    //右旋转函数
    function fnr() {
        angle+=90;
        oBox.style.transform='rotateY('+angle+'deg)';
        var iNum=(oBox.style.transform.slice(8,-4))%360;
        xx(iNum);
    }
    //左旋转函数
    function fnl(){
        angle-=90;
        oBox.style.transform='rotateY('+angle+'deg)';
        var iNum=(oBox.style.transform.slice(8,-4))%360;
        xx(iNum);
    }

    //判断当前显示页面为哪一页
    function xx(iangle) {
        switch (iangle){
            case 0:
                one();
                break;
            case -90:
            case 270:
                two();
                break;
            case  180:
            case -180:
                three();
                break;
            case   90:
            case -270:
                four();
        }
    }
    //显示为第一页要执行的函数
    function one() {
        for(var i=0;i<5;i++){
            clearInterval(oPage2.getElementsByTagName('img')[i].timer);
        }
        var oLogo=fun.getClass2(oBox,'logo')[0];
        var op1School=fun.getClass2(oBox,'p1-school')[0];
        var oP=oBox.getElementsByTagName('p')[0];
        var oPerson=fun.getClass2(oBox,'person')[0];
        var otitle=fun.getClass2(oBox,'title')[0];
        setTimeout(function () {
            miaovStartMove(oLogo,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                oPerson.style.display='block';
                miaovStartMove(oPerson,{left:0,opacity:100},MIAOV_MOVE_TYPE.FLEX,function () {
                    miaovStartMove(otitle,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                        miaovStartMove(op1School,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                            miaovStartMove(oP,{opacity:100},MIAOV_MOVE_TYPE.BUFFER)
                        })
                    })
                })
            });
        },500);
    }

    //显示为第二页要执行的函数
   /* var opage2_img=oPage2.getElementsByTagName('img');
    for(var u=0;u<opage2_img.length;u++){
        fun.addEvent1(opage2_img[i],startE,function(){
            clearInterval(this.timer);
        })
    }*/
    function two() {
        op3Box.style.display='none';
        op3Box.innerHTML=op3BoxInner;
        var oLogo=fun.getClass2(oBox,'logo')[1];
        var oPerson=fun.getClass2(oBox,'person')[1];
        var oTitle=fun.getClass2(oBox,'title')[1];
        var op2Box=fun.getClass2(oBox,'p2-box')[0];
        var op2Board=fun.getClass2(oBox,'p2-board')[0];

        setTimeout(function () {
            miaovStartMove(oLogo,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                oPerson.style.display='block';
                miaovStartMove(oPerson,{left:0,opacity:100},MIAOV_MOVE_TYPE.FLEX,function () {
                    miaovStartMove(oTitle,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                        miaovStartMove(op2Box,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                            for(var i=0;i<5;i++){
                                oPage2.getElementsByTagName('img')[i].style.display='block';
                            }
                            op2BoxFun();
                            miaovStartMove(op2Board,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                                var oP2Word=fun.getClass2(oPage2,'p2-word')[0];
                                oP2Word.scrollTop=0;
                                var oUl1=oP2Word.getElementsByTagName('ul')[0];
                                var oUl2=oP2Word.getElementsByTagName('ul')[1];
                                if(oUl2.innerHTML==''){
                                    oUl2.innerHTML=oUl1.innerHTML;
                                }
                                oP2Word.scrollTop=0;
                                clearInterval(timer1);
                                timer1=setInterval(function () {
                                    if(oP2Word.scrollTop>=oUl1.scrollHeight){
                                        oP2Word.scrollTop=0;
                                    }else{
                                        ++oP2Word.scrollTop;
                                    }
                                },30);
                            })
                        })
                    })
                })
            });
        },500);
       //第二页3D立体特效
        function op2BoxFun(){
            var oBox_3d=fun.getClass2(oPage2,'box-3d')[0];
            var oCounts=5;    //初始图片数量
            var aImg=oPage2.getElementsByTagName('img');
            var oImg=[];//存储图片的数组
            var l=0;

            for(var j=0;j<oCounts;j++){
                oImg[j]=aImg[j];
                var dis1=-(j+1)*400;
                pos(aImg[j],dis1);
                //oBox_3d.appendChild(aImg[j]);
                move(aImg[j],80)
            }
            //开启运动
            function move(obj,iTarget) {
                clearInterval(obj.timer);
                obj.timer= setInterval(function () {
                    if(obj.nowT==iTarget){
                        stopMove(obj);
                        xunhuan(obj);
                    }else{
                        obj.nowT+=1;
                        obj.style.transform='translateZ('+obj.nowT+'vw)';
                    }
                },5)
            }
            //清楚定时器
            function stopMove(obj) {
                clearInterval(obj.timer);
            }

            function xunhuan(obj) {
                oBox_3d.removeChild(obj);
                pos(oImg[l],-2000);
                oBox_3d.appendChild(oImg[l]);
                move(oImg[l],80);
                if(l>=4){
                    l=0
                }else{
                    ++l;
                }
            }
            //随机定位元素
            function pos(obj,trZ) {
                var iRomL=Math.round(Math.random()*40);
                var iRomT=Math.round(Math.random()*65);
                obj.style.left=iRomL+'vw';
                obj.style.top=iRomT+'vw';
                obj.timer=null;
                obj.style.transform='translateZ('+trZ+'vw)';
                obj.nowT=parseInt(obj.style.transform.slice(11,-3));
            }
        };

    }
    var oBox_3d=fun.getClass2(oPage2,'box-3d')[0];
    var op3Box=fun.getClass2(oPage3,'p3-box')[0];
    var op3BoxInner=op3Box.innerHTML;
    //显示为第三页要执行的函数
    function three() {
        for(var i=0;i<5;i++){
            clearInterval(oPage2.getElementsByTagName('img')[i].timer);
        }
        var oLogo=fun.getClass2(oBox,'logo')[2];
        var oPerson=fun.getClass2(oBox,'person')[2];
        var oTitle=fun.getClass2(oBox,'title')[2];
        var op3Box=fun.getClass2(oPage3,'p3-box')[0];

        setTimeout(function () {
            miaovStartMove(oLogo,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                oPerson.style.display='block';
                miaovStartMove(oPerson,{left:0,opacity:100},MIAOV_MOVE_TYPE.FLEX,function () {
                    miaovStartMove(oTitle,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                        setTimeout(function () {
                            op3Box.style.display='block';
                            p3pic();
                        },500);

                    })
                })
            });
        },500);

        function p3pic() {

            //输出所有图片
            var data={
                obj1:{
                    path:'photo/001-800-450.jpg',
                    title:'第一张图片',
                    desc:'描述1'
                },
                obj2:{
                    path:'photo/002-800-450.jpg',
                    title:'第二张图片',
                    desc:'描述2'
                },
                obj3:{
                    path:'photo/003-800-450.jpg',
                    title:'第三张图片',
                    desc:'描述3'
                },
                obj4:{
                    path:'photo/004-800-450.jpg',
                    title:'第四张图片',
                    desc:'描述4'
                },
                obj5:{
                    path:'photo/005-800-450.jpg',
                    title:'第五张图片',
                    desc:'描述5'
                },
                obj6:{
                    path:'photo/006-800-450.jpg',
                    title:'第六张图片',
                    desc:'描述6'
                },
                obj7:{
                    path:'photo/007-800-450.jpg',
                    title:'第七张图片',
                    desc:'描述7'
                },
                obj8:{
                    path:'photo/008-800-450.jpg',
                    title:'第八张图片',
                    desc:'描述8'
                },
                obj9:{
                    path:'photo/009-800-450.jpg',
                    title:'第九张图片',
                    desc:'描述9'
                },
                obj10:{
                    path:'photo/010-800-450.jpg',
                    title:'第十张图片',
                    desc:'描述10'
                },
                obj11:{
                    path:'photo/011-800-450.jpg',
                    title:'第十一张图片',
                    desc:'描述11'
                }
            };
            function  addPhoto() {
                var temp=op3Box.innerHTML;
                var html=[];
                for(var s in data){
                    var _html=temp
                        .replace('{{path}}',data[s].path)
                        .replace('{{title}}',data[s].title)
                        .replace('{{desc}}',data[s].desc);
                    html.push(_html);
                }
                op3Box.innerHTML=html.join('');
            }
            addPhoto();

            var ophoto=fun.getClass2(op3Box,'photo');

            for(var i=0;i<ophoto.length;i++){
                ophoto[i].index=i;
                // ophoto[i].startE=function () {
                //     turn(this);
                // };
                fun.addEvent1(ophoto[i],startE,function (e) {
                    turn(this)
                    e.preventDefault();
                })
            }
            rrSort(rand([0,10]));
            //排序图片
            function rrSort(n){
                var photos=[];

                for(var i=0;i<ophoto.length;i++){
                    ophoto[i].style="";
                    ophoto[i].style.transform="scale(1.5)";
                    ophoto[i].className='photo photo-front';

                    photos.push(ophoto[i]);
                }
                var p_center=ophoto[n];
                p_center.className+=' photo-center';
                p_center=photos.splice(n,1)[0];

                //把海报分为上下两个区域
                var photos_top=photos.splice(0,Math.ceil(photos.length/2));
                var photos_bottom=photos;

                var rans=range();
                for(var j in photos_top){
                    photos_top[j].style.transform='translate3d('+rand(rans.top.x)+'px,'+rand(rans.top.y)+'px,0) rotate('+rand([-270,270])+'deg) scale(1)';
                }
                for(var l in photos_bottom){
                    photos_bottom[l].style.transform='translate3d('+rand(rans.bottom.x)+'px,'+rand(rans.bottom.y)+'px,0) rotate('+rand([-270,270])+'deg) scale(1)';
                }
            }
            //简单的翻转效果
            function turn(obj) {
                var cls=obj.className;
                if(!/photo-center/.test(cls)){
                    return rrSort(obj.index);
                }
                if(/photo-front/.test(cls)){
                    cls= cls.replace(/photo-front/,'photo-back')
                }else{
                    cls= cls.replace(/photo-back/,'photo-front')
                }
                obj.className=cls;
            }

            //随机函数
            function rand(range) {
                var max=Math.max(range[0],range[1]);
                var min=Math.min(range[0],range[1]);

                var diff=max-min;
                var num=Math.ceil(Math.random()*diff+min);
                return num;
            }

            //计算取值范围
            function range() {
                var range={top:{x:[],y:[]},bottom:{x:[],y:[]}};

                range.top.x=[0-(op3Box.clientWidth/2),op3Box.clientWidth/2+ophoto[0].clientWidth];
                range.top.y=[0-op3Box.clientHeight/2,-ophoto[0].clientWidth/2];

                range.bottom.x=[0-(op3Box.clientWidth/2),op3Box.clientWidth/2+ophoto[0].clientWidth];
                range.bottom.y=[ophoto[0].clientHeight/2,op3Box.clientHeight/2];

                return range;
            }
        }
    }
    //显示为第四页要执行的函数
    function four() {
        op3Box.style.display='none';
        op3Box.innerHTML=op3BoxInner;

        var oLogo=fun.getClass2(oBox,'logo')[3];
        var op1School=fun.getClass2(oBox,'p4-school')[0];
        var oP=oPage4.getElementsByTagName('p')[0];
        var oPerson=fun.getClass2(oBox,'person')[3];
        var otitle=fun.getClass2(oBox,'title')[3];
        setTimeout(function () {
            miaovStartMove(oLogo,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                oPerson.style.display='block';
                miaovStartMove(oPerson,{left:0,opacity:100},MIAOV_MOVE_TYPE.FLEX,function () {
                    miaovStartMove(otitle,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                        miaovStartMove(op1School,{opacity:100},MIAOV_MOVE_TYPE.BUFFER,function () {
                            miaovStartMove(oP,{opacity:100},MIAOV_MOVE_TYPE.BUFFER)
                        })
                    })
                })
            });
        },500);
    }

    //跨终端获取点的位置
    var getTouchpos=function (e) {
        var touches=e.touches;
        if(touches && touches[0]){
            return {
                x:touches[0].clientX,
                y:touches[0].clientY
            };
        }
        return {
            x:e.clientX,y:e.clientY
        }
    };

};




