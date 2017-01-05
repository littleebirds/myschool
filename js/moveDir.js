function moveDir(obj,fnR,fnT,fnL,fnB) {
    //获取touch的点
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

    //计算两点之间的距离
    var getDist=function (p1,p2) {
        if(!p1 || !p2) return 0;
        else{
            return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y));
        }
    };


    //计算两点之间的角度
    var getAngle=function (p1,p2) {
        var r=Math.atan2(p2.y-p1.y,p2.x-p1.x);    //r为atan2方法返回的PI值
        var a=r*180/Math.PI;                      //转化为度数值
        return a;
    };


    //获取swipe的方向
    var getSwipeDirection=function (p2,p1) {
        var dx=p2.x-p1.x;
        var dy=-p2.y+p1.y;
        var angel=Math.atan2(dy,dx)*180/Math.PI;
        if(angel<45 && angel >-45) return "right";
        if(angel>=45 && angel <135) return "top";
        if(angel>=135 || angel <-135) return "left";
        if(angel<=-45 && angel >=-135) return "bottom";
    };

    var startEvtHandler=function (e) {
        var touches=e.touches;
        if(!touches || touches.length==1){   //touches为空，代表鼠标点击
            point_start=getTouchpos(e);
            time_start=Date.now();
        }

    };
    var moveEventHandler=function (e) {
        point_end=getTouchpos(e);
        e.preventDefault();
        return false;
    };

    var endEvenetHandler=function () {
        time_end=Date.now();

        //时间距离都符合
        if(getDist(point_start,point_end)>SWIP_DISTANCE && (time_end-time_start)<SWIP_TIME ){
            var dir=getSwipeDirection(point_end,point_start);
            switch (dir){
                case 'right':
                    if(fnR){        //判断为右执行的函数
                        fnR();
                    }
                    break;
                case 'top':
                    if(fnT){        //判断为上执行的函数
                        fnT();
                    }
                    break;
                case 'left':
                    if(fnL){        //判断为左执行的函数
                        fnL();
                    }
                    break;
                default:
                    if(fnB){        //判断为下执行的函数
                        fnB();
                    }
            }
        }
    };


    var SWIP_DISTANCE=30;
    var SWIP_TIME=500;
    var point_start,time_start,point_end,time_end;

    //判断是PC或者移动设备
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
    obj.addEventListener(startE,startEvtHandler,false);
    obj.addEventListener(moveE,moveEventHandler,false);
    obj.addEventListener(endE,endEvenetHandler,false);

}
