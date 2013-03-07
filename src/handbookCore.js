$(document).ready(function(){
	var ie = (navigator.userAgent.indexOf("MSIE") == -1) ? false : true;
	
	if(ie){
		$("#notIE").remove()
	}
	else{
		$("#IE").remove();
	}
	
	
	
	populateSlides();
	populateSlidesDescription();
	
	
	var $slides = $(".slide");
	var $arrows = $(".arrow");
	var $navigator = $(".navigator");
	var $header = $(".header");
	var $slide_info = $(".slide-description-content")
	
	var tot_slides_number = $slides.size();
	var current_slide;
	var is_in_fullscreen = false;
	init(0);
	
	function init(start_slide){
		current_slide = start_slide;
		$slides.hide();
		$slide_info.hide();
		$slide_info.eq(start_slide).show();
		$slides.eq(start_slide).show();
		populateNavigator(start_slide);
	}
	
	
	$(".forward").click(function(){
		goForward();
	});
	
	$(".back").click(function(){
		goBack();
	});
	
	$(".slide").click(function(){
		goToFullScreen();
	})
	
	$(document).keydown(function(event) {
                switch (event.keyCode) {
                    case 37: goBack(); break;
                    case 38: goBack(); break;
                    case 39: goForward(); break;
                    case 40: goForward(); break;
                    case 70: goToFullScreen(); break;
                }
            });
	
	function goForward(){
		var $current_slide = getCurrentSlide();
		var $current_slide_info = getCurrentSlideInfo();
		if(current_slide != tot_slides_number-1){
			(is_in_fullscreen)? goToFullScreen() : null;
			$current_slide.hide();
			$current_slide.next().show();
			$current_slide_info.hide();
			$current_slide_info.next().show();
			current_slide++;
			refreshNavigator(current_slide);
		}
	}
	
	function goBack(){
		if(current_slide != 0){
			(is_in_fullscreen)? goToFullScreen() : null;
			var $current_slide = getCurrentSlide();
			var $current_slide_info = getCurrentSlideInfo();
			$current_slide.hide();
			$current_slide.prev().show();
			$current_slide_info.hide();
			$current_slide_info.prev().show();
			current_slide--;
			refreshNavigator(current_slide);
		}
	}
	
	function goTo(index){
		var $current_slide = getCurrentSlide();
		var $current_slide_info = getCurrentSlideInfo();
		$current_slide.hide();
		$slides.eq(index).show();
		$current_slide_info.hide();
		$slide_info.eq(index).show();
		current_slide = index;
		refreshNavigator(current_slide);
	}
	
	
	
	function getCurrentSlide(){
		return $slides.eq(current_slide);
	}
	
	function getCurrentSlideInfo(){
		return $slide_info.eq(current_slide);
	}
	
	function getCurrentScreenshot(){
		return $(getCurrentSlide()).find(".screenshot");
	}
	
	function goToFullScreen(){
		var $screenshot = getCurrentScreenshot();
		var initial_padding = json_conf.init_padding;
		var full_padding = json_conf.full_padding;
		
		if(!is_in_fullscreen){
			$("#navigator_container").hide();
			$("#slide_info_container").hide();
			$("#header_container").hide();
			
			is_in_fullscreen = true;
		}
		else{
			
				$("#navigator_container").show();
				$("#slide_info_container").show();
				$("#header_container").show();
				
				is_in_fullscreen = false;
	
			
		}
		
	}
	
	
	function populateSlides(){
		
		var ret = "";
		
		if(!ie){
			_.each(json_slides,function(slide){
				ret +='<div class="slide" style="background-image:url('+slide.screenshot_url+')"></div>';
			});
		}
		else{

			_.each(json_slides,function(slide,index){

			
			var IE_rule = "filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+slide.screenshot_url+"',sizingMethod='scale');"+
							"-ms-filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+slide.screenshot_url+"',sizingMethod='scale');";

			ret +='<div class="slide" style="background-image:url('+slide.screenshot_url+');width:850px;height:476px;'+ IE_rule +'"></div>';
		});
		}
		
		
		$("#slides").append(ret);
	}
	
	
	function populateSlidesDescription(){
		var ret = "";
		_.each(json_slides,function(slide){
			ret +='<div class="slide-description-content">'+
					'<div class="slide-txt"><font class="slide-title">'+slide.title+': </font>'+slide.txt+'</div>'+
				'</div>';
		});
		
		$("#slides_description").append(ret);
	}
	
	
						
	
	function populateNavigator(start_slide){
		var ret = "";
		var index = 1;
		_.each(json_slides,function(slide){
			var current = (start_slide == index-1)? "current" : "";
			ret +='<div class="nav_item '+current+'">'+
						'<div class="nav_item_number">'+index+'</div>'+
						'<div class="nav_item_txt_container">'+
							'<div class="nav_item_txt">'+slide.title+'</div>'+
						'</div>'+
					'</div>';
					
			index++;
		});
		$navigator.append(ret);
		
		
		$navigator.find(".nav_item").click(function(){
			if(!$(this).is(".current")){
				var index = $(this).index();
				goTo(index);
			}
		})
	}
	
	
	function refreshNavigator(index){
		$navigator.find(".nav_item.current").removeClass("current");
		$navigator.find(".nav_item").eq(index).addClass("current");
	}

	
});

	
	
	
	
	
	
	
