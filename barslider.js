(function( $ ) {
 
    $.fn.barslider = function( options ) {
        
        this.addClass('barslider');
        
        this.filter("div").each(function() {
            $(this).html('<canvas></canvas><div></div>');
        });
        
        var canvas = this.children("canvas");
        var slider = this.children("div");
        
        var settings = $.extend(true,{
            min     :   0,
            max     :   5,
            step    :   1,
            height  :   135,
            callback:   function(){return;},
            fn      :   function(value){return value+1;},
            barStyle:   {
                fillStyle       :   '#BFBFBF',
                strokeStyle     :   '#CCFFCC',
                highlightColor  :   '#448844',
                padding         :   2
            },
            label   :   {
                font            :   'bold 15px Verdana',
                format          :   function(value){return value;}
            }      
        }, options);
        
        var originalWidth = this.width();
        
        
        this.addClass('barslider');
        
        this.filter("div").each(function() {
            $(this).html('<canvas></canvas><div></div>');
        });
        
        var canvas = this.children("canvas");
        var slider = this.children("div");
        
        $(canvas).height(settings.height);
        var numColumns = settings.max - settings.min + 1;
        slider.width(originalWidth/numColumns * (numColumns - 1));
        
        slider.slider({
            min     :   settings.min,
            max     :   settings.max,
            range   :   'min',
            change  :   function(event, ui){
                settings.callback(ui.value,drawGraph(canvas, settings, ui.value, originalWidth));
            }
        });
        
        settings.callback(settings.min,drawGraph(canvas, settings, settings.min, originalWidth));
        
 
        return this;
 
    };
    
    //Draws the bar graph
    //element: The canvas tag where the graph will be drawn
    //settings: The plugin settings
    //selected: The currently selected value in the slider
    //width: The canvas width
    function drawGraph(element, settings, selected, width) {
        var contextHeight;
        var contextWidth;
        var canvasId;
        var canvas;
        var context;
        var contextWidth;
        var numBars;
        var barWidth;
        var maxHeight;
        var xPos;
        var yPos;
        var maxValue;
        var value;
        var barHeight;
        var result;
        
        result = settings.fn(settings.min);
        
        contextHeight = settings.height;
        contextWidth = width;
        canvasId = $(element).attr("id");
        canvas = $(element)[0];
        canvas.width = width;
        context = canvas.getContext('2d');
                
        numBars = ((settings.max - settings.min + 1) / settings.step);
        barWidth = contextWidth / numBars;
        maxHeight = contextHeight - 15;
        
        xPos = contextWidth - barWidth;
        
        //Guess the max height of any bar from a three point sample
        maxValue = Math.max(
            settings.fn(settings.min), 
            settings.fn(settings.max),
            settings.fn((settings.max-settings.min) / 2)
        );
        for (i = settings.max; i >= settings.min; i -= settings.step) {
            value = settings.fn(i);
            barHeight = maxHeight * (value/maxValue);
            yPos = contextHeight - barHeight;
            if(Math.abs(i-selected)<settings.step/2) {
                context.fillStyle = settings.barStyle.highlightColor;
                context.font = settings.label.font;
                context.fillText(settings.label.format(value),xPos,yPos-4);
                result = value;
            } else {
                context.fillStyle = settings.barStyle.fillStyle;
                context.strokeStyle = settings.barStyle.strokeStyle;
            }
            context.fillRect(
                xPos + (settings.barStyle.padding / 2), 
                yPos, 
                barWidth - (settings.barStyle.padding / 2), 
                barHeight
            )
            context.strokeRect(
                xPos + (settings.barStyle.padding / 2), 
                yPos, 
                barWidth - (settings.barStyle.padding / 2), 
                barHeight
            )
            xPos -= barWidth;
        }
        return result;
    }
}( jQuery ));