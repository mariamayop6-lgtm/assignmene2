
//part 1
//1-the event loop is amachanism in node.js that allows it to handle async operations without blocking the main theard.

//2-libuv is library used by node.js to handle async 1/0 operations.

//3-used the event loop ,libuv,callbacks,and the underlying system apls without blocking the main thread.

//4-
//-call stack = executes functions.
//-Event queue = stores callbacks waiting to be executed.
//-Event loop = moves callbacks from the queue to the call stack when it is empty.

//5-The Node.js Thread Pool is a group of threads used to handle certain expensive 
// asynchronous operations. Its default size is 4 and it can be changed using UV_THREADPOOL_SIZE.

//6-Blocking code stops the execution until
//  the operation is completed, while non-blocking code allows Node.js to continue executing other tasks.