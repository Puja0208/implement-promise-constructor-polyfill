// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

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
    if (isFulfilled && !isCalled){
      onResolve(value);
      isCalled = true;
    };
    return this;
  };
  this.catch = function (catchHandler) {
    onReject = catchHandler;
    if(isRejected && !isCalled){
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
