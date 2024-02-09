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

function customAllSettled(promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    promises.forEach((promise) => {
      promise.then(
        function (value) {
          result.push({
            status: 'fulfilled',
            value,
          });
          if (result.length === promises.length) resolve(result);
        },
        function (error) {
          result.push({
            status: 'rejected',
            reason: error,
          });
          if (result.length === promises.length) resolve(result);
        }
      );
    });
  });
}
function customAny(promises) {
  let error = [];
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(
        function (value) {
          resolve(value);
        },
        function (err) {
          error.push(err);
          if (error.length === promises.length) {
            reject(error);
          }
        }
      );
    });
  });
}

let customPromiseAll = (promises) => {
  let result = [];
  let fulfilledCount = 0;
  promises.forEach((promise, index) => {
    promise
      .then((value) => {
        result[index] = value;
        fulfilledCount++;
        if (fulfilledCount === promises.length) {
          resolve(result);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let deepClone = (input) => {
  if (input == null || typeof input !== object) {
    return input;
  }
  let output = Array.isArray(input) ? [] : {};
  for (let key of Object.keys(input)) {
    output[key] = deepClone(input(key));
  }
  return output;
};

const deepCopy = (val) => {
  if (['string', 'boolean', 'number'].includes(typeof val)) {
    return val;
  } else if (Array.isArray(val)) {
    return val.map((item) => deepCopy(item));
  } else {
    return Object.keys(val).reduce((acc, key) => {
      acc[key] = deepCopy(val[key]);
      return acc;
    }, {});
  }
};
