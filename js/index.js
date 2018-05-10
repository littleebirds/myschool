define(function (require,exports,module) {
    //main.js
    var fun = require('./m-fun.js');
    var oWel = document.getElementById('welcome');      //应用首页
    var oBox = document.getElementById('box');          //应用主题盒子
    var oPage1 = fun.getClass2(document, 'page1')[0];   
    var oPage2 = fun.getClass2(document, 'page2')[0];
    var oPage3 = fun.getClass2(document, 'page3')[0];
    var oPage4 = fun.getClass2(document, 'page4')[0];
    var oPage = fun.getClass2(document, 'page');
    var oMusic = document.getElementById('music').getElementsByTagName('img')[0];
    var oAudio = document.getElementsByTagName('audio')[0];
    var angle = 0;
    var speed = 90;
    var rate = parseInt(fun.getStyle2(oBox, 'width')) / 180;
    var disx = 0;
    var timer1 = null;

    //页面1
    var t1 = new TimelineMax({repeat:0});
    //页面2
    var t2 = new TimelineMax({ repeat: 0 });
    //页面3
    var t3 = new TimelineMax({ repeat: 0 });
    //页面4
    var t4 = new TimelineMax({ repeat: 0 });

    //控制音乐播放
    fun.addEvent1(oMusic, 'click', function () {
        if (oAudio.paused) {
            oAudio.play();
        } else {
            oAudio.pause();
        }
    });

    //首页时间
    var indexTimer;
    setTime()

    //首页淡出 ，右滑
    fun.handSlip(oWel, function () {

        clearInterval(indexTimer) //清楚首页的定时器

        oWel.className += 'fadeOut';
        setTimeout(function () {
            oWel.style.display = 'none';
        },
            1000);
        if (fun.getStyle1(oBox, 'display') == 'none') {
            oBox.style.display = 'block';
        }


        oBox.className += ' fadeIn';


        //Box盒子动作完成后，执行当前页面动画
        setTimeout(function () {
            oBox.style.transform = 'rotate(0deg)';
            //第一页
            one();
        }, 1000);
    });
    //手势翻转
    fun.handSlip(oBox, fnr, "", fnl, "");


    //右旋转函数
    function fnr() {
        angle += 90;
        oBox.style.transform = 'rotateY(' + angle + 'deg)';
        var iNum = (oBox.style.transform.slice(8, -4)) % 360;
        nowPage(iNum);
    }
    //左旋转函数
    function fnl() {
        angle -= 90;
        oBox.style.transform = 'rotateY(' + angle + 'deg)';
        var iNum = (oBox.style.transform.slice(8, -4)) % 360;
        nowPage(iNum);
    }

    //判断当前显示页面为哪一页
    function nowPage(iangle) {
        switch (iangle) {
            case 0:
                one();
                break;
            case -90:
            case 270:
                two();
                break;
            case 180:
            case -180:
                three();
                break;
            case 90:
            case -270:
                four();
        }
    }
    //显示为第一页要执行的函数
    function one() {

        var oLogo = fun.getClass2(oBox, 'logo')[0];
        var op1School = fun.getClass2(oBox, 'p1-school')[0];
        var oP = oBox.getElementsByTagName('p')[0];
        var oPerson = fun.getClass2(oBox, 'person')[0];
        var otitle = fun.getClass2(oBox, 'title')[0];
        t1.to(oLogo,1,{opacity:1,ease:Linear.easeIn})
            .to(oPerson, 1, { display: 'block', left: 0, opacity: 1, ease: Elastic.easeOut})
            .to(otitle, 1, { opacity: 1, ease: Linear.easeIn})
            .to(op1School, 1, { opacity: 1, ease: Linear.easeIn})
            .to(oP, 1, { opacity: 1, ease: Linear.easeIn})
    }

    //显示为第二页要执行的函数
    function two() {
        op3Box.style.display = 'none';
        op3Box.innerHTML = op3BoxInner;
        var oLogo = fun.getClass2(oBox, 'logo')[1];
        var oPerson = fun.getClass2(oBox, 'person')[1];
        var oTitle = fun.getClass2(oBox, 'title')[1];
        var op2Box = fun.getClass2(oBox, 'p2-box')[0];
        var op2Board = fun.getClass2(oBox, 'p2-board')[0];

        t2.to(oLogo, 1, { opacity: 1, ease: Linear.easeIn })
            .to(oPerson, 1, { display: 'block', left: 0, opacity: 1, ease: Elastic.easeOut })
            .to(oTitle, 1, { opacity: 1, ease: Linear.easeIn })
            .to(op2Box, 1, { opacity: 100, ease: Linear.easeIn,onComplete:function() {

            }})
            .to(op2Board,1,{opacity:1,ease:Linear.easeIn,onComplete:function () {
                var oP2Word = fun.getClass2(oPage2, 'p2-word')[0];
                oP2Word.scrollTop = 0;
                var oUl1 = oP2Word.getElementsByTagName('ul')[0];
                var oUl2 = oP2Word.getElementsByTagName('ul')[1];
                if (oUl2.innerHTML == '') {
                    oUl2.innerHTML = oUl1.innerHTML;
                }
                oP2Word.scrollTop = 0;
                clearInterval(timer1);
                timer1 = setInterval(function () {
                    if (oP2Word.scrollTop >= oUl1.scrollHeight) {
                        oP2Word.scrollTop = 0;
                    } else {
                        ++oP2Word.scrollTop;
                    }
                }, 30);
            }})
    }
    var oBox_3d = fun.getClass2(oPage2, 'box-3d')[0];
    var op3Box = fun.getClass2(oPage3, 'p3-box')[0];
    var op3BoxInner = op3Box.innerHTML;
    //显示为第三页要执行的函数
    function three() {
        var oLogo = fun.getClass2(oBox, 'logo')[2];
        var oPerson = fun.getClass2(oBox, 'person')[2];
        var oTitle = fun.getClass2(oBox, 'title')[2];
        var op3Box = fun.getClass2(oPage3, 'p3-box')[0];
        t3.to(oLogo, 1, { opacity: 1, ease: Linear.easeIn })
            .to(oPerson, 1, { display: 'block', left: 0, opacity: 1, ease: Elastic.easeOut })
            .to(oTitle, 1, {opacity: 1,ease: Linear.easeIn, onComplete: function () {
                    setTimeout(function () {
                        op3Box.style.display = 'block';
                        p3pic();
                    }, 500);
                }
            })
        function p3pic() {

            //输出所有图片
            var data = {
                obj1: {
                    path: 'photo/001-800-450.jpg',
                    title: '第一张图片',
                    desc: '描述1'
                },
                obj2: {
                    path: 'photo/002-800-450.jpg',
                    title: '第二张图片',
                    desc: '描述2'
                },
                obj3: {
                    path: 'photo/003-800-450.jpg',
                    title: '第三张图片',
                    desc: '描述3'
                },
                obj4: {
                    path: 'photo/004-800-450.jpg',
                    title: '第四张图片',
                    desc: '描述4'
                },
                obj5: {
                    path: 'photo/005-800-450.jpg',
                    title: '第五张图片',
                    desc: '描述5'
                },
                obj6: {
                    path: 'photo/006-800-450.jpg',
                    title: '第六张图片',
                    desc: '描述6'
                },
                obj7: {
                    path: 'photo/007-800-450.jpg',
                    title: '第七张图片',
                    desc: '描述7'
                },
                obj8: {
                    path: 'photo/008-800-450.jpg',
                    title: '第八张图片',
                    desc: '描述8'
                },
                obj9: {
                    path: 'photo/009-800-450.jpg',
                    title: '第九张图片',
                    desc: '描述9'
                },
                obj10: {
                    path: 'photo/010-800-450.jpg',
                    title: '第十张图片',
                    desc: '描述10'
                },
                obj11: {
                    path: 'photo/011-800-450.jpg',
                    title: '第十一张图片',
                    desc: '描述11'
                }
            };
            function addPhoto() {
                var temp = op3Box.innerHTML;
                var html = [];
                for (var s in data) {
                    var _html = temp
                        .replace('{{path}}', data[s].path)
                        .replace('{{title}}', data[s].title)
                        .replace('{{desc}}', data[s].desc);
                    html.push(_html);
                }
                op3Box.innerHTML = html.join('');
            }
            addPhoto();

            var ophoto = fun.getClass2(op3Box, 'photo');

            for (var i = 0; i < ophoto.length; i++) {
                ophoto[i].index = i;
                // ophoto[i].startE=function () {
                //     turn(this);
                // };
                fun.addEvent1(ophoto[i], 'click', function (e) {
                    turn(this)
                    e.preventDefault();
                })
            }
            rrSort(rand([0, 10]));
            //排序图片
            function rrSort(n) {
                var photos = [];

                for (var i = 0; i < ophoto.length; i++) {
                    ophoto[i].style = "";
                    ophoto[i].style.transform = "scale(1.5)";
                    ophoto[i].className = 'photo photo-front';

                    photos.push(ophoto[i]);
                }
                var p_center = ophoto[n];
                p_center.className += ' photo-center';
                p_center = photos.splice(n, 1)[0];

                //把海报分为上下两个区域
                var photos_top = photos.splice(0, Math.ceil(photos.length / 2));
                var photos_bottom = photos;

                var rans = range();
                for (var j in photos_top) {
                    photos_top[j].style.transform = 'translate3d(' + rand(rans.top.x) + 'px,' + rand(rans.top.y) + 'px,0) rotate(' + rand([-270, 270]) + 'deg) scale(1)';
                }
                for (var l in photos_bottom) {
                    photos_bottom[l].style.transform = 'translate3d(' + rand(rans.bottom.x) + 'px,' + rand(rans.bottom.y) + 'px,0) rotate(' + rand([-270, 270]) + 'deg) scale(1)';
                }
            }
            //简单的翻转效果
            function turn(obj) {
                var cls = obj.className;
                if (!/photo-center/.test(cls)) {
                    return rrSort(obj.index);
                }
                if (/photo-front/.test(cls)) {
                    cls = cls.replace(/photo-front/, 'photo-back')
                } else {
                    cls = cls.replace(/photo-back/, 'photo-front')
                }
                obj.className = cls;
            }

            //随机函数
            function rand(range) {
                var max = Math.max(range[0], range[1]);
                var min = Math.min(range[0], range[1]);

                var diff = max - min;
                var num = Math.ceil(Math.random() * diff + min);
                return num;
            }

            //计算取值范围
            function range() {
                var range = { top: { x: [], y: [] }, bottom: { x: [], y: [] } };

                range.top.x = [0 - (op3Box.clientWidth / 2), op3Box.clientWidth / 2 + ophoto[0].clientWidth];
                range.top.y = [0 - op3Box.clientHeight / 2, -ophoto[0].clientWidth / 2];

                range.bottom.x = [0 - (op3Box.clientWidth / 2), op3Box.clientWidth / 2 + ophoto[0].clientWidth];
                range.bottom.y = [ophoto[0].clientHeight / 2, op3Box.clientHeight / 2];

                return range;
            }
        }
    }
    //显示为第四页要执行的函数
    function four() {
        op3Box.style.display = 'none';
        op3Box.innerHTML = op3BoxInner;

        var oLogo = fun.getClass2(oBox, 'logo')[3];
        var op1School = fun.getClass2(oBox, 'p4-school')[0];
        var oP = oPage4.getElementsByTagName('p')[0];
        var oPerson = fun.getClass2(oBox, 'person')[3];
        var otitle = fun.getClass2(oBox, 'title')[3];
        t4.to(oLogo, 1, {
                opacity: 1,
                ease: Linear.easeIn
            })
            .to(oPerson, 1, {
                display: 'block',
                left: 0,
                opacity: 1,
                ease: Elastic.easeOut
            })
            .to(otitle, 1, {
                opacity: 1,
                ease: Linear.easeIn
            })
            .to(op1School,1,{
                opacity: 1,
                ease: Linear.easeIn
            })
            .to(oP,1,{
                opacity: 1,
                ease: Linear.easeIn
            })
    }


    function setTime() {
            //初始化
            getTime();
            //设置定时器
            indexTimer = setInterval(function () {
                getTime();
            }, 1000)
            function getTime() {
                var nowDate = new Date();
                var month = nowDate.getMonth() + 1;
                var day = nowDate.getDate();
                var week = nowDate.getDay();
                var strWeek;
                var h = nowDate.getHours();
                var m = nowDate.getMinutes() < 10 ? '0' + nowDate.getMinutes() : nowDate.getMinutes();
                var oNowTime = fun.getClass2(document, 'nowTime')[0];
                var oNowDate = fun.getClass2(document, 'nowDate')[0];
                switch (week) {
                    case 0:
                        strWeek = '日'
                        break;
                    case 1:
                        strWeek = '一';
                        break;
                    case 2:
                        strWeek = '二'
                        break;
                    case 3:
                        strWeek = '三';
                        break;
                    case 4:
                        strWeek = '四'
                        break;
                    case 5:
                        strWeek = '五';
                        break;
                    default:
                        strWeek = '六'
                        break;
                }
                oNowTime.innerHTML = h + ":" + m;
                oNowDate.innerHTML = month + "月" + day + "日   " + "星期" + strWeek;
            }
    }

})