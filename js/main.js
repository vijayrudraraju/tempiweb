// required knowledge:
// jquery
// processingjs
// evently (jquery plugin)

// console.log is a function that google chrome uses to display debug information in its javascript console 

var gP;
$(document).ready(function() {
        $(document).evently({
            _init: function() {
            },
            keypress: function(e) {
                //e.preventDefault();
            },
            keydown: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                } else if(e.which=='13') {
                    e.preventDefault();
                }
            },
            keyup: function(e) {
                if(e.which=='9') {
                    //e.preventDefault();
                } else if(e.which=='13') {
                    e.preventDefault();
                    $('#globalCanvas').trigger("enter");
                }
                console.log('keyup: '+e.which);
            }
        });

        $('#globalCanvas').evently({
            _init: function() {
                $(this).data('canvasWidth',640);
                $(this).data('canvasHeight',640);
            
                gP = new Processing($('#globalCanvas')[0],gP);
                $(this).trigger('redraw');
                gP.noLoop();
            },
            updatebackground: function() {
            },
            updategraph: function() {
                console.log('updategraph triggered');
            },
            redraw: function() {
                gP.redraw();
                console.log('redraw triggered');
            },
            tab: function() {
            },
            enter: function() {
            }
        });
});

function gP(p) {
	p.mouseMoved = function() {
        $('#globalCanvas').trigger('redraw');
	};

	p.mouseClicked = function() {
        $('#globalCanvas').trigger('updategraph');
        $('#globalCanvas').trigger('redraw');
	};

	p.setup = function() {
		console.log(p.PFont.list());

		p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
		$('#globalCanvas').data('font',p.loadFont('sans-serif'));
	};

	p.draw = function() {
	};
}
