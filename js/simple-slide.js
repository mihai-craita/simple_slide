$(document).ready(function() {
    var simple_slide = {};
    simple_slide.slides = $('.slide');
    simple_slide.index = 0;
    simple_slide.width = $('.slide').width();
    simple_slide.height = $('.slide').height();
    simple_slide.delay = 2000;
    
    simple_slide.slides.wrapAll('<div class="slideWrap" />');

    $('.slideWrap').height(simple_slide.height)
    .width(simple_slide.width)
    .css({'position':'relative','overflow':'hidden'});

    $('.slide').each( function(index) {
        $(this).css({'z-index':simple_slide.slides.length - index,'position':'absolute'});
    });

    simple_slide.next = function()
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
        setTimeout( function() { simple_slide.next() },simple_slide.delay );
    }

    setTimeout( function() { simple_slide.next() },simple_slide.delay );

});
