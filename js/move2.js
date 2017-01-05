function move(obj,json,fn) {
    var speed;
    clearInterval(obj.timer);
    obj.timer=setInterval(function () {
        for(var attr in json){
            var icu=null;
            if(attr=='opacity'){
                icu=parseInt(parseFloat(getStyle(obj,attr))*100);
                //小数问题，在前面在加个parseInt();
            }else{
                icu=parseInt(getStyle(obj,attr));
            }
            speed=(json[attr]-icu)/10;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            //缓冲运动
            if (icu==json[attr]){
                clearInterval(obj.timer);
                if(fn){
                    fn();
                }
            }else{
                if(attr=='opacity'){
                    obj.style.opacity=(icu+speed)/100;
                    obj.style.filter='alpha(opacity:'+(icu+speed)+')';
                }
                obj.style[attr]=icu+speed+'vw';
            }
        }
    },30)
}
function move2(obj,iTarget) {
    clearInterval(obj.timer);
    var speed=0;
    var left=0;
    obj.timer=setInterval(function () {
        speed+=(iTarget-obj.offsetLeft)/5;   //左右摇摆
        speed*=0.7;   //摩擦系数

        left+=speed;   //通过引用变量使物体严格对准目标值

        if(Math.abs(speed)<1 && Math.abs(left-iTarget)<1){           //停止条件，关闭定时器，避免占用系统资源
            clearInterval(obj.timer);
        }else{
            obj.style.left=left+'vw';
        }
    },30); //不适用的地方，当往复运动值使得物体的宽高等不能为负的值为负时会报错。
}
function getStyle(elem,name) {
    if(elem.currentStyle){
        return elem.currentStyle[name];
    }else{
        return getComputedStyle(elem,false)[name];
    }
}