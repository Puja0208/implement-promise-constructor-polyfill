// Import stylesheets
import './style.css';

// Write Javascript code!

//Poyfill for promise constructor

function CustomPromise(executor) {
  let isCalled = false;
  let onResolve;
  let onReject;
  let isFulfilled = false;
  let isRejected = false;
  let value;
  let error;
  this.then = function (thenHandler) {
    onResolve = thenHandler;
    if (isFulfilled && !isCalled) {
      onResolve(value);
      isCalled = true;
    }
    return this;
  };
  this.catch = function (catchHandler) {
    onReject = catchHandler;
    if (isRejected && !isCalled) {
      onReject(error);
      isCalled = true;
    }
    return this;
  };

  function resolve(val) {
    isFulfilled = true;
    value = val;
    if (typeof onResolve === 'function' && !isCalled) {
      onResolve(val);
      isCalled = true;
    }
  }

  function reject(err) {
    isRejected = true;
    error = err;
    if (typeof onReject === 'function' && !isCalled) {
      onReject(err);
      isCalled = true;
    }
  }
  executor(resolve, reject);
}

//Polyfill for isArray mehod for arrays
function isArray(arg) {
  if (Object.prototype.toString.call(arg) === '[object Array]') {
    return true;
  } else {
    return false;
  }
}

//Poyfill for reduce method for arrays
function myReduce(callbackFn, initialValue) {
  let context = this;
  let acc = initialValue;
  for (let i = 0; i < context.length; i++) {
    if (acc !== undefined) {
      acc = callbackFn(acc, this[i], i, this);
    } else {
      acc = initialValue;
    }
  }
}

//Polyfill for splice
function mySplice(startIndex, deleteCount) {
  let endIndex = startIndex + deleteCount;
  let arr = this;
  let itemsBeforSplice = [];
  let splicedItems = [];
  let itemsAfterSplice = [];
  for (let i = 0; i < arr.length; i++) {
    if (i < startIndex) {
      itemsBeforSplice.push(arr[i]);
    } else if (i >= startIndex && i < endIndex) {
      splicedItems.push(arr[i]);
    } else {
      itemsAfterSplice.push(arr[i]);
    }
  }

  for (let i = 2; i < arguments.length; i++) {
    itemsBeforSplice.push(arguments[i]);
  }

  let remainingItems = itemsBeforSplice.concat(itemsAfterSplice);

  for (
    let i = 0, len = Math.max(arr.length, remainingItems.length);
    i < len;
    i++
  ) {
    if (remainingItems.length > i) {
      arr[i] = remainingItems[i];
    } else {
      arr.pop();
    }
  }

  return splicedItems;
}

const arr = [1, 2, 3, 4, 5, 6];
const arr1 = [1, 2, 3, 4, 5, 6];
console.log(arr.splice(2, 2, 8, 9, 10));

// call custom splice() on array to add elements
console.log(mySplice.call(arr1, 2, 2, 8, 9, 10));
