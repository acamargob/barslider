barslider
=========

JQuery plugin that renders a JQueryUI Slider along a bar chart.

Based on the <a href="http://www.nytimes.com/interactive/2014/upshot/buy-rent-calculator.html" targe="_blank">rent or buy calculator by Mike Bostock, Shan Carter and Archie Tse</a>

##Usage

Include jQuery and jQueryUI on your page
```html
<html>
    <head>
        <script type="text/javascript" src="jquery.js"></script>
        <link rel="stylesheet" href="jquery-ui.css" />
        <script src="jquery-ui.min.js"></script>
        <script type="text/javascript" src="barslider.js"></script>
        <link rel="stylesheet" href="barslider.css" />
    </head>
```

Create an empty div for the slider

```html
<body>
...
    <div id ="barSlider"></div>
...
</body>
```

And initialize the plugin

```js
$(document).ready(function(){
    $('#barSlider').barslider({
        min     :   0,
        max     :   100,
        fn      :   function(value){return Math.sin(value/10)+1;},
        barStyle:   {
            padding     :   0,
        }
    });
});
```

###Configuration

At the moment, the following options can be set to alter the plugin's behaviour:

* min: The minimum value of the slider
* max: The maximum value of the slider
* step: Determines the size or amount of each interval or step the slider takes 
between the min and max. The full specified value range of the slider (max - min) 
should be evenly divisible by the step.
* callback: A function executed after every redraw
* fn: The function used to evaluate the height of every column
* barStyle: Styling options for the bar chart
    * fillStyle: The unselected bar's color.
    * strokeStyle: The color for the bars border.
    * highlightColor: The color for the selected bar.
    * padding: The number of pixels left empty between bars.
* label: Styling options vor the selected bar label.
    * font: Canvas font property for the label.
    * format: A function to format the label.
    
the fillStyle, strokeStyle and font options follow canvas' javascript syntax.
```js
$('#barSlider').barslider({
    min     :   0,
    max     :   5,
    step    :   1,
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
});
```