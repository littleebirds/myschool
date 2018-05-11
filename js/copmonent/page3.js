define(function (require, exports, module) {
    var oPage3 = `<div class="p3-box">
                    <div class="photo photo-front">
                        <div class="photo-wrap">
                            <div class="side side-front">
                                <p>
                                    <span><img src="{{path}}"></span>
                                </p>
                                <p><span>{{title}}</span></p >
                            </div>
                            <div class="side side-back">
                                <p>{{desc}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="logo"></div>
                <div class="person"></div>
                <div class="title p3-title"></div>`
    exports.page3HTML = oPage3
});