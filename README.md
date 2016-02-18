# jcarouselFade
Adds new method 'fade' which use fade animation for switching slides.

## Features
* fade animation
* work with jcarouselSwipe
* easy to use

## Requirments
* jQuery
* jquery.jcarousel-core.js(minimum) also you may use bundle version: jquery.jcarousel.js

## How to use
To use the plugin include jquery, jcarousel, jcarouselSwipe(if you need) and jcarouselFade source files into your HTML document:
``` HTML
<script type="text/javascript" src="js/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery.jcarousel.min.js"></script>
<script type="text/javascript" src="js/jquery.jcarousel-swipe.min.js"></script>
<script type="text/javascript" src="js/jquery.jcarousel-fade.min.js"></script>
```
and set method option to 'fade':
``` javascript
$('.jcarousel')
    .jcarousel()          // init jcarousel
    .jcarouselSwipe({     
        draggable: false, // to work correctly you need to set draggable: false
        method: 'fade'    // and of course set method: fade
    });  
    
$('.jcarousel-pagination')
	.jcarouselPagination({
        method: 'fade'
    });
    
$('.jcarousel-control-prev')
    .jcarouselControl({
        target: '-=1',
        method: 'fade'
    });

$('.jcarousel-control-next')
    .jcarouselControl({
        target: '+=1',
        method: 'fade'
    });
```

## Examples
You can find examples in [the corresponding directory](examples/).

## License
Copyright (c) 2016 Evgeniy Pelmenev. Released under the MIT license.