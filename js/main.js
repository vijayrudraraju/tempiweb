// required knowledge:
// jquery
// processingjs(javascript only method) - processing.org/learning
// evently(jquery plugin) - github.com/jchris/evently

// console.log is a function that google chrome uses to display debug information in its javascript console 

// global processing object containing processing methods for drawing
var gP;
$(document).ready(function() {
        $(document).evently({
            _init: function() {
            },
            keypress: function(e) {
            },
            keydown: function(e) {
            },
            keyup: function(e) {
            }
        });

        $('#nodeDiv').evently({
            _init: function() {
                $(this).data('idCounter',1);
                $(this).data('nodeList',{});
            }
        });

        $('#globalCanvas').evently({
            _init: function() {
                $(this).data('canvasWidth',800);
                $(this).data('canvasHeight',600);
            
                console.log('_init');
                gP = new Processing($('#globalCanvas')[0],gP);
                $(this).trigger('requestdraw');
                gP.noLoop();
            },
            setupcanvas: function() {
            },
            updatestates: function() {
                console.log('updatestates triggered');
                updateAllNodeMouseStates();
            },
            draw: function() {
                console.log('draw triggered');
                // clear canvas
                gP.background(0,0,0);
                // redraw canvas
                drawAllNodes();
            },
            requestdraw: function() {
                console.log('requestdraw triggered');
                gP.redraw();
            },
            createnode: function() {
                var myType = 'foo';
                createNode(myType);
            },
            drag: function() {
                detectNodeMouseDrag();
            }
        });
});

function gP(p) {
    p.mouseDragged = function() {
        $('#globalCanvas').trigger('drag');
        $('#globalCanvas').trigger('requestdraw');
    };

	p.mouseMoved = function() {
        $('#globalCanvas').trigger('updatestates');
        $('#globalCanvas').trigger('requestdraw');
	};

	p.mouseClicked = function() {
        $('#globalCanvas').trigger('createnode');
        $('#globalCanvas').trigger('requestdraw');
	};

    // p.setup has to complete before gP(global processing object) is accesible
	p.setup = function() {
        console.log('available fonts:'+p.PFont.list());
        p.size($('#globalCanvas').data('canvasWidth'),$('#globalCanvas').data('canvasHeight'));
        $('#globalCanvas').data('font',p.loadFont('sans-serif'));
        // initialize colors to none
        p.noStroke();
        p.noFill();
	};

	p.draw = function() {
        $('#globalCanvas').trigger('draw');
	};
}
