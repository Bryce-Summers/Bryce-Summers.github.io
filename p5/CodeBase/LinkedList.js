/*
 * Java Script Linked List Class.
 *
 * Written by Bryce Summers on 6/12/2015.
 */
 
 
 function List()
 {
	this.size = 0;
	this.head = new ListNode(null);
	
	// tail will always point to a null node at the end, this keeps things simple.
	this.tail = this.head;
 }
 
List.prototype =
{
	// Stack Functions.
	
	// Adds an element to the beginning of the list.
	push(elem)
	{
		var new_head = new ListNode(elem, this.head);
		this.head = new_head;
		this.size++;
	},
	
	// Removes an element from the beginning of the list.
	// Returns the element.
	pop()
	{
		var output = this.head.data;
		this.head = this.head.next;
		return output;
	},
	
	// -- Queue Operations.
	
	// Adds an element to the end of the list.
	enq(elem)
	{
		this.tail.data = elem;
		this.tail.next = new ListNode(null, null);
		this.tail = this.tail.next;
	},
	
	// Removes an element from the beginning of the list.
	deq()
	{
		return pop();
	},
	
	iterator()
	{
		return new ListIterator(this.head);
	},
	
	isEmpty()
	{
		return this.size == 0;
	}

}

function ListNode(data, next)
{
	// The Data that this node stores.
	this.data = data;
	
	// A link to the next node in the list.
	this.next = next;
}

ListNode.prototype =
{
}

// Input: ListNode node.
function ListIterator(node)
{
	this.node = List;
}

ListIterator.prototype =
{
	hasNext()
	{
		return this.node.next != null;
	}

	// Returns the next element in the linked list.
	next()
	{
		var output = this.node.data;
		this.node = this.node.next;
		return output;
	}
}