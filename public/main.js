$(function(){
    $(window).resize(function(){
        var w = window.innerWidth;
        var h = window.innerHeight;
        if(w>h*1.55){ //화면이 가로로 긴 경우
            $('.container-fluid').css('width', h*1.64);
            $('.container-fluid').css('height', h);
        }else{
            $('.container-fluid').css('width', w);
            $('.container-fluid').css('height', h);
        }
    }).resize();
});

//초기화
$(init);
//클릭->터치 이벤트(모바일용)
function touchHandler(event) {
    var touch = event.changedTouches[0];
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[event.type], true, true, window, 1,
        touch.screenX, touch.screenY,
        touch.clientX, touch.clientY, false,
        false, false, false, 0, null);
    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
    //우클릭금지
    $(document).bind('contextmenu', function(e) {
        return false;
    });
    matchImg();
}


function matchImg(){

    $(document).on('click touchstart', function(){
        $('.item').on('click');
    })

    //아이템 클릭 시 z-index값 조정
    $('#itemList .item').bind('mousedown touchstart',function(){
        $(this).css('z-index','9999');
        $(this).siblings('.item').css('z-index','999');
    });

    //아이템 클릭 시 크기 조정
    $('#itemList .item').bind('mousedown touchstart',function(){
        $(this).find('img').css('transform','scale(1.5)');
    });
    $('#itemList .item').bind('mouseup touchend',function(){
        $(this).find('img').css('transform','scale(1)');
    });


    //드래그-드롭
    $('#itemList .item').draggable({
        containment : ".container-fluid",
        start: function(event, ui){
            $(this).draggable("option","revert",true);
        }
    });
    $('.matchList').droppable({
        drop:function(event, ui){
            var dragName, dropName, dragImgSrc;
            dragName = ui.draggable.attr('name');
            dropName = $(this).attr('name');
            dragImgSrc = ui.draggable.find('img').attr('src');
            
            // console.log(dragImgSrc);
            // console.log('dragName : '+dragName);
            // console.log('dropName : '+dropName);

            if(dragName === dropName){ //답 맞췄을 때
                ui.draggable.draggable("option", "revert", false);
                ui.draggable.animate({opacity:0},500);
                $(this).addClass('right');
                $(this).find('img').attr('src', dragImgSrc);
            }

            //정답 개수 확인
            var rightNum = $('.right').length;
            console.log(rightNum);
        }
    });

}