// JavaScript Document
//拖拽函数，当两个参数时，第二个参数是移动时间
	function drag(obj,fndown,fnmove,fnup){
		if(!obj){return ;}else{}
		if(arguments.length==2){
			var fnmove=fndown;
			fndown=null;
		}else{
}
		var mousedown=function(ev){
			var oEvent = ev||event;
			var oldX = oEvent.clientX;
			var oldY = oEvent.clientY;
			fndown&&fndown();
			var mousemove=function(ev){
				var oEvent = ev||event;
				var newX = oEvent.clientX;
				var newY = oEvent.clientY;
				fnmove&&fnmove(newX-oldX,newY-oldY);
			};
			document.addEventListener('mousemove',mousemove);
			
			var mouseup=function(){
				document.removeEventListener('mousemove',mousemove);
				document.removeEventListener('mousemove',mousemove);
				fnup&&fnup();
				obj.releaseCapture&&obj.releaseCapture();
			};
			document.addEventListener('mouseup',mouseup);
			obj.setCapture&&obj.setCapture();
			ev.preventDefault();
		};
		obj.addEventListener('mousedown',mousedown);
	}


  export const handleDrag = (
  element: HTMLElement,
  moveFn: NUtils.MouseMoveHandler,
  option?: NUtils.IHandleDragOptions
) => {
  const { stopChildProp = false, moveStart, moveEnd } = option || {}
  const mousedown = function (e: MouseEvent) {
    if (stopChildProp && e.target !== element) return
    let oldX = e.clientX
    let oldY = e.clientY
    let newX: number
    let newY: number
    if (moveStart) moveStart(e, oldX, oldY)
    const mousemove = function (e2: MouseEvent) {
      newX = e2.clientX
      newY = e2.clientY
      if (moveFn) moveFn(e2, newX - oldX, newY - oldY, newX, newY)
      oldX = newX
      oldY = newY
    }
    document.addEventListener('mousemove', mousemove)

    const mouseup = function (e3: MouseEvent) {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
      if (moveEnd) moveEnd(e3, newX, newY)
      // element.releaseCapture&&element.releaseCapture();
    }
    document.addEventListener('mouseup', mouseup)
    // element.setCapture&&element.setCapture();
    // e.preventDefault();
  }
  element.addEventListener('mousedown', mousedown)
}