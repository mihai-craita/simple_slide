var simple_slide = {};
$(document).ready(function() {
        simple_slide.slider = $('.slider');
        simple_slide.default_delay = 2000;
        simple_slide.stop_on_mouse_over = false;
        simple_slide.slider.each( function ( index )
            {
                simple_slide.slider[index].slides = $(this).find('.slide'); 
                simple_slide.slider[index].nb_of_slides = simple_slide.slider[index].slides.length; 
                simple_slide.slider[index].width = simple_slide.slider[index].slides.width();
                simple_slide.slider[index].height = simple_slide.slider[index].slides.height();
                simple_slide.slider[index].index = 0;
                simple_slide.slider[index].delay = simple_slide.default_delay;
                simple_slide.slider[index].slides.wrapAll('<div class="slideWrap" />');
                if(simple_slide.stop_on_mouse_over)
                {
                    simple_slide.slider[index].slides.on('mouseover', function() {simple_slide.slider[index].stop()});
                    simple_slide.slider[index].slides.on('mouseout', function() {simple_slide.slider[index].next()});
                }

                simple_slide.slider[index].wrap = $(this).find('.slideWrap');

                simple_slide.slider[index].wrap.height(simple_slide.slider[index].height) .width(simple_slide.slider[index].width) .css({'position':'relative','overflow':'hidden'});

                simple_slide.slider[index].slides.each( function(slide_index) {
                        $(this).css({
                                'z-index':simple_slide.slider[index].nb_of_slides - slide_index,
                                'position':'absolute',
                                'left': simple_slide.slider[index].width + 'px'
                        });
                        if(slide_index == 0)
                            $(this).css({'left':'0'});
                });


                simple_slide.slider[index].next_slide = function()
                {
                    if(simple_slide.slider[index].index == simple_slide.slider[index].nb_of_slides-1)
                    {
                        simple_slide.slider[index].slides.eq(0).css({'left':simple_slide.slider[index].width+'px','z-index':'0'});
                    }
                    if(simple_slide.slider[index].index == simple_slide.slider[index].nb_of_slides)
                    {
                        simple_slide.slider[index].index = 0;
                        simple_slide.slider[index].slides.each( function(slide_index) {
                                $(this).css({
                                        'z-index':simple_slide.slider[index].nb_of_slides - slide_index,
                                        'left': simple_slide.slider[index].width + 'px'
                                });
                                if(slide_index == 0)
                                    $(this).css({'left':'0'});
                        });
                        simple_slide.slider[index].slides.eq(simple_slide.slider[index].index).css('z-index', simple_slide.slider[index].nb_of_slides);
                    }
                    simple_slide.slider[index].slides.eq(simple_slide.slider[index].index).animate({"left":"-="+simple_slide.slider[index].width+"px"},"slow");
                    if(simple_slide.slider[index].index == simple_slide.slider[index].nb_of_slides-1)
                    {
                        simple_slide.slider[index].slides.eq(0).animate({"left":"-="+simple_slide.slider[index].width+"px"},"slow");
                    }
                    else
                    {
                        simple_slide.slider[index].slides.eq(simple_slide.slider[index].index+1).animate({"left":"-="+simple_slide.slider[index].width+"px"},"slow");
                    }
                    simple_slide.slider[index].index ++;
                }

                simple_slide.slider[index].previous_slide = function()
                {
                    if(simple_slide.slider[index].index == simple_slide.slider[index].nb_of_slides)
                    {
                        simple_slide.slider[index].slides.css({'left':'-'+simple_slide.slider[index].width+"px"});
                        simple_slide.slider[index].slides.eq(0).css({'left':simple_slide.slider[index].width+'px'});
                    }
                    if(simple_slide.slider[index].index == 1)
                    {
                        simple_slide.slider[index].slides.eq(0).css({'left':'-'+simple_slide.slider[index].width+"px"});
                    }
                    if(simple_slide.slider[index].index == 0)
                    {
                        simple_slide.slider[index].slides.css({'left':'-'+simple_slide.slider[index].width+"px"});
                        simple_slide.slider[index].slides.eq(simple_slide.slider[index].index).css({'left':'0','z-index':'0'});
                        simple_slide.slider[index].index = simple_slide.slider[index].slides.length;
                    }
                    if(simple_slide.slider[index].index == simple_slide.slider[index].nb_of_slides)
                        simple_slide.slider[index].slides.eq(0).animate({"left":"+="+simple_slide.slider[index].width+"px"},"slow");
                    else
                        simple_slide.slider[index].slides.eq(simple_slide.slider[index].index).animate({"left":"+="+simple_slide.slider[index].width+"px"},"slow");
                    simple_slide.slider[index].index --;
                    simple_slide.slider[index].slides.eq(simple_slide.slider[index].index).animate({"left":"+="+simple_slide.slider[index].width+"px"},"slow");
                }

                simple_slide.slider[index].stop = function ()
                {
                    console.log('stop');
                    clearInterval(simple_slide.slider[index].timer);
                }

                simple_slide.slider[index].previous = function()
                {
                    if(event)
                        event.preventDefault();
                    if(simple_slide.slider[index].delay > 0)
                    {
                        clearInterval(simple_slide.slider[index].timer);
                        simple_slide.slider[index].previous_slide();
                        simple_slide.slider[index].timer = setInterval( function() { simple_slide.slider[index].next() },simple_slide.slider[index].delay );
                    }
                    else
                    {
                        simple_slide.slider[index].previous_slide();
                    }
                }

                simple_slide.slider[index].next = function()
                {
                    if(event)
                        event.preventDefault();
                    if(simple_slide.slider[index].delay > 0)
                    {
                        clearInterval(simple_slide.slider[index].timer);
                        simple_slide.slider[index].next_slide();
                        simple_slide.slider[index].timer = setInterval( function() { simple_slide.slider[index].next() },simple_slide.slider[index].delay );
                    }
                    else
                    {
                        simple_slide.slider[index].next_slide();
                    }
                }

                if(simple_slide.slider[index].nb_of_slides > 1 && simple_slide.slider[index].delay > 0)
                    simple_slide.slider[index].timer = setInterval( function() { simple_slide.slider[index].next() },simple_slide.slider[index].delay );

        });


});
