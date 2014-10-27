$(window).load(function() {
    $("img.pic").lazyload({
        effect : "fadeIn"
    });
    $(window).resize();

    var $wrapper = $('div.wrapper');
    $wrapper.css("width",parseInt($('body').css("width")) - getScrollbarWidth());
    $wrapper.imagesLoaded(function(){
    $wrapper.masonry({
        itemSelector : '.picdiv',
        isAnimated: !Modernizr.csstransitions,
        columnWidth: function( containerWidth ) {
            return (containerWidth / 4);
    }
    });
    });
});

function jsonFlickrApi(o){
    $(document).ready(function() {
        // alert(o.photos.photo[1].width_l/o.photos.photo[1].height_l);
        // alert(((parseInt($('body').css("width"))-getScrollbarWidth())*0.225)/(o.photos.photo[1].height_l*(parseInt($('body').css("width"))-getScrollbarWidth())*0.225/o.photos.photo[1].width_l));
        for (var i=0; o.photos.photo[i]; i++){
            var image_big = o.photos.photo[i].url_l;
            var image_width = o.photos.photo[i].width_l;
            var image_widthRatio = (parseInt($('body').css("width"))-getScrollbarWidth())*0.225/image_width;
            var image_height = o.photos.photo[i].height_l*image_widthRatio;
            var newhtml = '<div class="picdiv"><a class="pic" href="' + image_big + '" rel="lightbox[slideshow]"><img class="pic" src="images/clear.png" data-original="' + image_big + '" style="height:'+image_height+'px"></div>';
            $('div.wrapper').append(newhtml);
        }
        $("img.pic").mouseover(function() {
            $(this).transition({ scale:1.03 }, 250);
        });
        $("img.pic").mouseout(function() {
            $(this).transition({ scale:1.00 }, 250);
        });
    });
}

$(document).ready(function(){
    sessionStorage.setItem("aboutCollapsed",1);
    $("div#about").click(function(){
    	if (sessionStorage.getItem("aboutCollapsed")==1) { //about box is collapsed
            //expand it, put in longer text
            $("p#shortabout").css("visibility", "hidden");
            $("p#longabout").css("visibility", "visible");
            $("div#about").addClass("expandabout");
            sessionStorage.setItem("aboutCollapsed",0);
        } else {
            //collapse it, hide text
            $("p#shortabout").css("visibility", "visible");
            $("p#longabout").css("visibility", "hidden");
            $("div#about").removeClass("expandabout");
            sessionStorage.setItem("aboutCollapsed",1);
        }
    });
});

function getScrollbarWidth()
{
    if(window.navigator.platform!="MacIntel"){
        var div = $('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div></div>');
        $('body').append(div);
        var w1 = $('div', div).innerWidth();
        div.css('overflow-y', 'auto');
        var w2 = $('div', div).innerWidth();
        $(div).remove();
        return(w1 - w2);
    } else {
        return(0);
    }
}
