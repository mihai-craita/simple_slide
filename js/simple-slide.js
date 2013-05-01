    var simple_slide = {};
$(document).ready(function() {
    simple_slide.slides = $('.slide');
    simple_slide.width = $('.slide').width();
    simple_slide.height = $('.slide').height();
    simple_slide.index = 0;
    simple_slide.delay = 3000;
    
    simple_slide.slides.wrapAll('<div class="slideWrap" />');

    $('.slideWrap').height(simple_slide.height)
    .width(simple_slide.width)
    .css({'position':'relative','overflow':'hidden'});

    $('.slide').each( function(index) {
        $(this).css({'z-index':simple_slide.slides.length - index,'position':'absolute'});
    });

    simple_slide.next_slide = function()
    {
        if(this.index == this.slides.length-1)
        {
            this.slides.eq(0).css({'left':'0','z-index':'0'});
        }
        if(this.index == this.slides.length)
        {
            this.index = 0;
            this.slides.css('left','0');
            this.slides.eq(this.index).css('z-index', simple_slide.slides.length);
        }
        this.slides.eq(this.index).animate({"left":"-="+simple_slide.width+"px"},"slow");
        this.index ++;
    }

    simple_slide.previous_slide = function()
    {
        if(this.index == this.slides.length)
        {
            this.slides.css({'left':'-'+simple_slide.width+"px"});
            this.slides.eq(this.index).css('left','0');
            this.slides.eq(0).css({'left':'0','z-index':'0'});
        }
        if(this.index == 1)
        {
            this.slides.eq(0).css('z-index', simple_slide.slides.length);
            this.slides.eq(0).css({'left':'-'+simple_slide.width+"px"});
        }
        if(this.index == 0)
        {
            this.slides.css({'left':'-'+simple_slide.width+"px"});
            this.slides.eq(this.index).css({'left':'0','z-index':'0'});
            this.index = this.slides.length;
        }
        this.index --;
        this.slides.eq(this.index).animate({"left":"+="+simple_slide.width+"px"},"slow");
    }

    simple_slide.previous = function()
    {
        clearInterval(this.timer);
        this.previous_slide();
        this.timer = setInterval( function() { simple_slide.next() },simple_slide.delay );
    }

    simple_slide.next = function()
    {
        clearInterval(this.timer);
        this.next_slide();
        this.timer = setInterval( function() { simple_slide.next() },simple_slide.delay );
    }

    if(simple_slide.slides.length > 1)
        simple_slide.timer = setInterval( function() { simple_slide.next() },simple_slide.delay );

});
