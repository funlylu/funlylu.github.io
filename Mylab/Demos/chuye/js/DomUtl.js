//DOM操作兼容性方法

//获取节点样式
// 方式1：element.style 来获取DOM节点样式属性的方法
//-------这个方法只能获取到行内样式的样式属性，却无法获取内联或外联样式的属性

//方式2：

var DomStyleCtl = {
	//获取指定节点的某项css属性的值
	getEStyle:function(eObj,attr){
		 if (eObj.currentStyle) {//所有的ie
               return eObj.currentStyle[attr];
           } else if(window.getComputedStyle){//ie9+ chrome fireFox
               return document.defaultView.getComputedStyle(eObj, null)[attr];
            }
        return "";
	},
	setEStyle: function(eObj,attr,v){
		if (eObj.currentStyle) {//所有的ie
              eObj.currentStyle[attr] = v;
           } else if(window.getComputedStyle){//ie9+ chrome fireFox
                document.defaultView.getComputedStyle(eObj, null)[attr] = v;
            }
	}
};

