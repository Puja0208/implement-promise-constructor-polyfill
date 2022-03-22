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


//Polyfill for isArray mehod for arrays
function isArray(arg){
  if(Object.prototype.toString.call(arg)==='[object Array]'){
    return true;
  }
  else{
    return false;
  }
}

//Poyfill for reduce method for arrays
function myReduce(callbackFn,initialValue){
  let context = this;
  let acc = initialValue;
  for(let i=0;i<context.length;i++){
    if(acc!==undefined){
      acc = callbackFn(acc,this[i],i,this)
    }
    else{
      acc=initialValue;
    }
  }
}