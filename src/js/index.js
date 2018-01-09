import '../css/index.less'
$(function(){
  var rows=1;
  var page=1;
  $(".prev").click(function(){
    var len=$(".list li").length;//6
    var max=Math.ceil(len/rows); //297
    var box = $(".list").width();
    var width=$(".list li").width()+16;//1016
    var lt =parseInt($('.list').css('left')) ;
    if(page==max){//1 == 297
      page=0;
      $(".list").animate({
        left:-(width*page)
      },"slow");
      page++;
    }else{
      $(".list").animate({
        left:-(width*page)
      },"slow");
      page++;
    }
  });
  $(".next").click(function(){
    var len=$("li").length;
    var max=Math.ceil(len/rows);
    var lt = $('.list').css('left');
    if(lt == '0px'){
      return;
    }
    var width=$(".list li").width()+16;
    if(page==1){
      page=1;
      $(".list").animate({
        left:-(width*(page-2))
      },"slow");
      page--;
    }else{
      $(".list").animate({
        left:-(width*(page-2))
      },"slow");
      page--;
    }
  })
  $(".btn-ques").hover(function(){
    var flag = $(".btn-answ").is(":hidden");    
    if(flag){    
        $(".btn-answ").show();    
    }else{    
        $(".btn-answ").hide();    
    } 
  })
  
})
