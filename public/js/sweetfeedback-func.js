function drawGraph(canvas, data) {

    var graph;
    var xPadding = 30;
    var yPadding = 30;
    var xMax = 256;
    var yMax = 256;

    // Return the x pixel for a graph point
    function getXPixel(val) {
        return canvas.width() - (((canvas.width() - xPadding) / xMax) * val) + (xPadding * 0);
    }
    
    // Return the y pixel for a graph point
    function getYPixel(val) {
        return canvas.height() - (((canvas.height() - yPadding) / yMax) * val) - yPadding;
    }


    console.log(data);

    $(document).ready(function() {
        canvas = $(canvas);
        var c = canvas[0].getContext('2d'); 
	//	c.scale(0.5, 0.5);

	c.clearRect(0, 0, canvas.width(), canvas.height());
        c.lineWidth = 2;
        c.strokeStyle = '#333';
        c.font = 'italic 8pt sans-serif';
        c.textAlign = "center";
        
        // Draw the axises
        c.beginPath();
        c.moveTo(xPadding, 0);
        c.lineTo(xPadding, canvas.height() - yPadding);
        c.lineTo(canvas.width(), canvas.height() - yPadding);
        c.stroke();
        
        // Draw the Y value texts
        c.textAlign = "right"
        c.textBaseline = "middle";
        
        for(var i = 0; i < yMax; i += 10) {
            c.fillText(i, xPadding - 10, getYPixel(i));
        }

        c.strokeStyle = '#FF009A';
        c.beginPath();
        c.moveTo(getXPixel(0), getYPixel(0));

	$.each(data, function(key, value) {
	    //	    console.log( key + ":" + value);
	    c.lineTo(getXPixel(key), getYPixel(JSON.parse(value).sensor_0));

	});
	c.stroke();

        c.strokeStyle = '#001AFF';
        c.beginPath();
        c.moveTo(getXPixel(0), getYPixel(0));

	$.each(data, function(key, value) {
	    c.lineTo(getXPixel(key), getYPixel(JSON.parse(value).sensor_1));
	    //	    console.log( key + ":" + JSON.parse(value).sensor_1);
	});
	c.stroke();

        c.strokeStyle = '#00FF65';
        c.beginPath();
        c.moveTo(getXPixel(0), getYPixel(0));

	$.each(data, function(key, value) {
	    c.lineTo(getXPixel(key), getYPixel(JSON.parse(value).sensor_2));
	    //	    console.log( key + ":" + JSON.parse(value).sensor_1);
	});
	c.stroke();

        c.strokeStyle = '#FFE400';
        c.beginPath();
        c.moveTo(getXPixel(0), getYPixel(0));

	$.each(data, function(key, value) {
	    c.lineTo(getXPixel(key), getYPixel(JSON.parse(value).sensor_3));
	    //	    console.log( key + ":" + JSON.parse(value).sensor_1);
	});
	c.stroke();
    });
}

function getPrivacy(value) {
    return false;
}

function getNoisy(value) {
    if (value > 10)
	return true;
    return false;
}

function getCold(value) {
    if (value < 20)
	return true;
    return false;
}

function getBright(value) {
    if (value > 40)
	return true;
    return false;
}


function drawMap(map, value) {
    $('#cold').hide();
    $('#noisy').hide();
    $('#bright').hide();
    $('#privacy').hide();

    if (getNoisy((JSON.parse(value).sensor_0))) 
	$('#noisy').show();

    if (getBright((JSON.parse(value).sensor_1))) 
	$('#bright').show();

    if (getCold((JSON.parse(value).sensor_2))) 
	$('#cold').show();

}

function updateGumball(div_name, value) {

    $(div_name + " #gmbody").css({"opacity": 1.0});
    $(div_name + ' #cold').hide();
    $(div_name + ' #noisy').hide();
    $(div_name + ' #bright').hide();
    $(div_name + ' #privacy').hide();

    if (getNoisy((JSON.parse(value).sensor_0))) 
	$(div_name + ' #noisy').show();

    if (getBright((JSON.parse(value).sensor_1))) 
	$(div_name + ' #bright').show();

    if (getCold((JSON.parse(value).sensor_2))) 
	$(div_name + ' #cold').show();
}