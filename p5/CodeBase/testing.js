
function is_sorted(array)
{
	var len = array.length;
	
	var val = array[0];
	
	for(var i = 1; i < len; i++)
	{
		var next_val = array[i];
	
		if(next_val < val)
		{
			return false;
		}
		
		val = next_val;
	}
	
	return true;
}

function test_array()
{
	return [1,3,2,5,4,7,7,9,13,0,2,1];
}

function test_sort(func, name)
{
	var test = test_array();
	func(test);
	console.log(name + " " + is_sorted(test));
}

// -- Testing Code.
var sort = new Sort();
var test;

test = test_array();
console.log("UnSorted Array : " + test);
console.log("isSorted = " + is_sorted(test));
console.log("Insertion Sort.");
sort.insertion_sort(test);
console.log("Sorted Array : " + test);
console.log("isSorted = " + is_sorted(test));
console.log("");

test = test_array();
sort.quick_sort(test);
console.log("Selection Sort = " + is_sorted(test));

test = test_array();
sort.insertion_sort(test);
console.log("Insertion Sort = " + is_sorted(test));

test = test_array();
sort.quick_sort(test);
console.log("Quick Sort = " + is_sorted(test));

test = test_array();
sort.merge_sort(test);
console.log("Merge Sort = " + is_sorted(test));

console.log(test);
