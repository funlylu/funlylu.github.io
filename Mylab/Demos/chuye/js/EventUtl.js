// 跨浏览器处理程序

var EventUtil={

   // 注册事件程序
  addHander:function(element,type,hander){
   if (element.addEventListener) {//DOM2新曾的 IE9+支持
       element.addEventListener(type,hander,false);
   }else if(element.attachEvent){//IE和opera浏览器支持
        element.attachEvent("on"+type, hander);
   }else{
   	    element["on"+type] = hander;//支持所有浏览器
   }
  },
  // 删除事件程序
  delHander:function(element,type,hander){
   if (element.removeEventListener) {
       element.removeEventListener(type,hander,false);
   }else if(element.detachEvent){
        element.detachEvent("on"+type, hander);
   }else{
   	    element["on"+type] = null;
   }
  },

  // 获取事件对象
  getEvent:function(event){//获取事件对象
    	return  event ? event:window.event;//ie的事件对象通过window.event获取
  },
  getTarget:function(event){//产生事件的目标
  		return event.taget || event.srcElement;//event.srcElement IE中获取事件目标的方式
  },
  preventDfault:function(event){//取消事件的默认行为
	   if (event.preventDfault) {
	   		event.preventDfault();
	   } else {
	   	    event.returnValue=false;
	   }
  },
  stopPropagation:function(event){//取消事件冒泡
  		if (event.stopPropagation) {
  			event.stopPropagation();
  		} else {
  			event.cancelBubble=true;//IE中不支持事件捕获，直接取消冒泡
  		}
  },
  //获取滚轮事件的Detail属性值
  getWheelDelta: function(event){
    if(event.wheelDelta){//支持mousewheel事件
      //opera 9.5的值的正负与其它浏览器相反 向前是-120 向后是+120
//    if(client.engine.opera){
//     return (client.engine.opera <9.5 ? -event.wheelDelta : event.wheelDelta);
//    }else return  event.wheelDelta; 
       return  event.wheelDelta;
       
    }else{
      return -event.detail*40;//火狐浏览器 ，向前是-3 向后是+3 支持的事件是“DOMMouseScroll
    }
  }
};







/*
 事件：JavaScript和HML之间的交互是通过事件是实现的。就是用户或者浏览器自身执行的某种动作。
 即可以为HTML的元素设定事件处理程序来预定事件，以便在事件发生的时执行相应的代码。
 
 事件流：描述的是从页面中接收事件的顺序。例如当点击一个按钮这样的事件产生的时候，并不只是
 		当前的按钮元素接收到这个点击事件，这个按钮的父级容器甚至整个页面文档都接收到了这个事件。
 		事件流要描述的问题就是，这个点击事件它是从父级容器传到按钮本身，还是从按钮本身传到个个父级容器的。


事件流的分歧：
  1.IE的事件冒泡，事件由最具体的元素开始接收，然后逐级向上传到较为不具体的节点。
  2.Netscape 的事件捕获，与IE的顺序相反。
  
  主流的浏览器都支持这两种事件流模型。开发时一般使用事件冒泡。

  DOM事件流：
     综合了以上两个模型，将事件流分为三个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。
  

  绑定事件监听器的方法：
   1.HTML事件处理程序
     在html元素上面对相应的事件属性添加JavaScript事件处理代码
	<button lang-id="button.login" type="submit" id="login-btn" onclick="login()">登录</button>
   缺点：不够灵活，html和JavaScript代码的耦合度太高
  


  2.单纯的用JavaScript指定事件处理程序

   （1）元素级方法——DOM0级方法
      优点：简单，跨浏览器
      缺点：只支持一个事件处理程序

     var btn=docment.getElementById("login-btn");
     //添加监听器
     btn.onclick=function(){
	    //dealing code.........
     };
     //删除
     btn.onclick=null;

   （2）DOM2级方法
     使用 addEventListener()和 removeEventListener()两个方法来添加和删除
     参数：事件名，处理函数（最好写函数名,写匿名函数删除不了监听器），布尔值
     布尔值：true 表示在捕获阶段执行处理  false在冒泡阶段执行处理
     支持的浏览器：主流的浏览器,IE9+

     优点：支持添加多个事件处理程序，按照添加的顺序被执行

     btn.addEventListener("click",hander,false);
     btn.removeEventListener("click",hander,false);
      


    3.IE事件处理程序
    使用：attachEvent() 和 detachEvent() 
    参数：事件名、 处理函数
    btn.attachEvent("click",hander);
    btn.detachEvent("click",hander); 
    支持的浏览器：opera和IE
    优点：支持添加多个事件处理程序，按照添加的顺序反向被执行

   事件对象
    在事件被触发的时候会产生一个事件对象event，保存着与事件相关的属性和方法。
    
    1.DOM事件对象
     在兼容DOM事件流的浏览器中，event对象会作为事件处理函数的一个参数被传到函数中。

    2.IE中事件对象的获取方式稍有点复杂
    在IE获取事件对象的方式，是根据指定事件处理程序的方式不同而不同的。
    （1）使用DOM0级方式添加事件处理程序
       btn.onclick=function(){
	      var e=window.event;//通过window对象获取
       };

    （2）使用attachEvent方法添加
        a、event对象会作为事件处理函数的一个参数被传到函数中
        b、和DOM0级方式一样通过window.event访问

  兼容性问题：最讨厌的就是TMD兼容性
   对于DOM和IE的事件对象它们的属性和方法是有区别的。虽然实现的功能一样但是名字并不统一。
 */


