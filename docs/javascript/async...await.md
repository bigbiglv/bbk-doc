# `async...await`
- 是生成器函数的语法糖

## 实现原理
就是将 `Generator` 函数和自动执行器，包装在一个函数里

```ts
async function fn(args) {
  // ...
}
// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}

function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch(e) {
        return reject(e);
      }
      if(next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(function(v) {
        step(function() { return gen.next(v); });
      }, function(e) {
        step(function() { return gen.throw(e); });
      });
    }
    step(function() { return gen.next(undefined); });
  });
}
```

## 一些操作
使用`for`加`try...catch`实现错误重试
```ts
async function test() {
  let NUM_RETRIES = 3;
  for (let i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      // 成功则退出循环
      break;
    } catch(err) {}
  }
}
```
多个不相互依赖的异步操作如果都使用`await`就不能并发执行了，比较耗时
```ts
async function getData() {
  // 两个请求互不依赖 此时需要等到fetch1请求完毕才能发起fetch2
  const res1 = await fetch1()
  const res2 = await fetch2()
  // 使用 Promise.all 同时处理多个任务
  const [ res1, res2 ] = await Promise.all([fetch1(), fetch1()])
}
```