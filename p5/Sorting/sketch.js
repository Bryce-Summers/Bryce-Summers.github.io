

var sort;
var swap_index;
var swap_index_max;
var array;
var original_array;

var room_w;
var sorting_w;
var room_h;


// Initialized in resetState();
var head1_history;
var head2_history;
var head3_history;

var head1;
var head2;
var head3;

var region1;
var region2;
var region_history;
var function_calls;
var function_history;

var unset_history;

function setup() {
  room_w = 1600;	
  room_h = 800;
  sorting_w = 800;
  
  createCanvas(room_w, room_h);
  noLoop();
  stroke(0, 102);
  
  InsertionSort();
  
    
  array = newA();
  
  
  // Buttons.
  var x = sorting_w;
  var y = 700;
  var y_offset = 50;
  var x_offset = 0;//100
  
  button = createButton('Selection Sort');
  button.position(x, y);
  button.mousePressed(SelectionSort);
  x += x_offset;
  y += y_offset;
    
  button = createButton('Insertion Sort');
  button.position(x, y);
  button.mousePressed(InsertionSort);
  x += x_offset;
  y += y_offset;
  
  button = createButton('Quick Sort');
  button.position(x, y);
  button.mousePressed(QuickSort);
  x += x_offset;
  y += y_offset;
  
  button = createButton('Merge Sort');
  button.position(x, y);
  button.mousePressed(MergeSort);
  x += x_offset;
  y += y_offset;
 
}

function SelectionSort()
{
	sort = new Sort();
	sort.swaps = [];
	array = newA();
	original_array = array.slice();
	sort.selection_sort(array);
	array = original_array.slice();

	resetState();
}

function InsertionSort()
{
	sort = new Sort();
	sort.swaps = [];
	array = newA();
	original_array = array.slice();
	sort.insertion_sort(array);
	array = original_array.slice();
	
	resetState();
}

function QuickSort()
{
	sort = new Sort();
	sort.swaps = [];
	array = newA();
	original_array = array.slice();
	sort.quick_sort(array);
	array = original_array.slice();

	resetState();
}

function MergeSort()
{
	sort = new Sort();
	sort.swaps = [];
	array = newA();
	original_array = array.slice();
	sort.merge_sort(array);
	array = original_array.slice();
	
	resetState();
}

function resetState()
{
	head1 = -1;
	head2 = -1;
	head3 = -1;
	
	head1_history = [];
	head2_history = [];
	head3_history = [];
	
	swap_index_max = sort.swaps.length;
	swap_index = 0;
	
	region1 = -1;
	region2 = -1;
	
	region_history = [];
	function_calls  = [];
	function_history = [];
	unset_history = [];
	
	redraw();
}

function newA()
{
  var output = [];

  for(var i = 100; i > 0; i--)
  {
	output.push(i);
  }
    
  return shuffle(output);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function draw() {

  fill(255);
  background();
  
  var len = array.length;
  
  var bar_length = sorting_w/len;
  
  // Draw Sorting Bars.
  for(var i = 0; i < len; i++)
  {
	if(head1 === i || head2 === i)
	{
		fill(255, 0, 0);
	}
	else if(head3 === i)
	{
		fill(0, 0, 255);
	}
	else if(region1 <= i && i < region2)
	{
		fill(50);
	}
	else
	{
		fill(0);
	}
	var y = room_h - (array[i]*room_h/100);
	var x = i*bar_length;
	rect(x, y, bar_length, room_h - y);
  }
  
  var y = 50;
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  var x = (sorting_w + room_w)/2;
  for(var i = 0; i < function_calls.length; i++)
  {
	text(function_calls[i], x, y);
	y += 48;
  }
}


function keyPressed()
{
  if (keyCode === RIGHT_ARROW && swap_index < swap_index_max)
  {
	var name = sort.swaps[swap_index];
	if(name === "SWAP")
	{
		swap(array, sort.swaps[swap_index + 1], sort.swaps[swap_index + 2]);
	}
	else if(name === "SET")
	{
		var index = sort.swaps[swap_index + 1];
		var val   = sort.swaps[swap_index + 2];
		unset_history.push(index);
		unset_history.push(array[index]);
		array[index] = val;
	}
	else if(name === "HEAD1")
	{
		head1_history.push(head1);
		head1 = sort.swaps[swap_index + 1];
	}
	else if(name === "HEAD2")
	{
		head2_history.push(head2);
		head2 = sort.swaps[swap_index + 1];
	}
	else if(name === "HEAD3")
	{
		head3_history.push(head3);
		head3 = sort.swaps[swap_index + 1];
	}
	else if(name === "REGION")
	{
		region_history.push(region1);
		region_history.push(region2);
		region1 = sort.swaps[swap_index + 1];
		region2 = sort.swaps[swap_index + 2];
	}
	else if(name === "FUNCTION_CALL")
	{
		function_calls.push(sort.swaps[swap_index + 1]);
	}
	else if(name === "FUNCTION_RETURN")
	{
		function_history.push(function_calls.pop());
	}
		
	swap_index += 3;
  }
  else if(keyCode === LEFT_ARROW && swap_index > 0)
  {
  
	swap_index -= 3;	
  
	// UNDO functions.
	var name = sort.swaps[swap_index];
	if(name === "SWAP")
	{	
		swap(array, sort.swaps[swap_index + 1], sort.swaps[swap_index + 2]);
		
	}
	// unset a SET command.
	else if(name === "SET")
	{
		var val   = unset_history.pop();
		var index = unset_history.pop();
				
		array[index] = val;
	}
	else if(name === "HEAD1")
	{
		head1 = head1_history.pop();
	}
	else if(name === "HEAD2")
	{
		head2 = head2_history.pop();
	}
	else if(name === "HEAD3")
	{
		head3 = head3_history.pop();
	}
	else if(name === "REGION")
	{
		region2 = region_history.pop();
		region1 = region_history.pop();
	}
	else if(name === "FUNCTION_CALL")
	{
		function_calls.pop();
	}
	else if(name === "FUNCTION_RETURN")
	{
		function_calls.push(function_history.pop());
	}
	
  }
  
  redraw();
}

function swap(array, index1, index2)
{
	var temp = array[index1];
	array[index1] = array[index2];
	array[index2] = temp;
}