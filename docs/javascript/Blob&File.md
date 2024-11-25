# `Blob` 和 `File`

![流程](./images/Blob&file.svg "流程")

## `Blob` (`Binary Large Object`)
- 一个**不可变**的高层次的二进制数据封装的**二进制容器**（只读）
- 可用来处理的二进制数据的**大对象**或将数据传递到服务器
- 包含但不限于 `File`
- 使用场景
  1. 文件处理
     - 处理页面选择上传的文件，例如处理文件后作为 `blob` 保存
     - 上传服务器，通常配合 `FormData` `formData.append('file', blob, 'file.png')`
     - 使用 `XMLHttpRequest` 或 `fetch` 请求二进制数据时需要设置 `responseType：'blob'`
  2. 创建链接: 通过 `URL.createObjectURL()` 创建链接，用于引用文件
  3. 二进制数据处理: 图像，音视频等媒体数据一般都是使用 `blob` 保存


```js title="创建blob"
const content = { name: 'bbk' }
const data = JSON.stringify(content, null, 2)
// 传递内容数据 data，以及文件 MIME 类型
const blob = new Blob(data, { type: "application/json" })
console.log(blob.size) // 拿到数据大小
console.log(blob.type) // 拿到MIME类型
```
### 数据格式转换

#### `Blob` 转其他格式
##### `Blob` 自带实例方法 (推荐)
- `arrayBuffer()`: 转为 `ArrayBuffer`，返回一个 `Promise`
- `stream()`: 返回一个 `ReadableStream` 对象
- `text()`: `blob` 内容的 `UTF-8` 格式的字符串，不适合大文件，返回一个 `Promise`
  - `Blob.text()` 总是使用 `UTF-8` 进行编码，而 `FileReader.readAsText()` 可以使用不同编码方式，取决于 `blob` 的类型和一个指定的编码名称

##### `FileReader`
- `readAsDataURL`: 转为 `data URL`
- `readAsArrayBuffer`: 转为 `ArrayBuffer`，适合大文件
- `readAsText`: 转为 `blob` 指定编码的的字符串文本，不适合大文件
```js
const reader = new FileReader();
reader.readAsDataURL(blob);  // 读取为 data URL
reader.readAsArrayBuffer(blob);  // 读取为 ArrayBuffer
reader.readAsText(blob);  // 读取为 字符串文本

reader.onload = function (event) {
  // 读取结果（可以是 text、ArrayBuffer、Data URL）
  console.log(event.target.result);  
};
```
:::tip 大文件读取时可以使用流的方式或者 `ArrayBuffer` 分片读取
:::

#### 其他格式转 `Blob`
- 通过 `new Blob()` 构造函数将 `ArrayBuffer` `Uint8Array` 和 字符串创建成一个 `blob`

## `File`
- `Blob` 的唯一子类，扩展了 `Blob` 类型，添加了最后修改时间，文件名称，表示文件对象
- 通常是通过 `<input type="file">` 拿到的文件


## 生成`url`
- 生成的`url`在 `img` `video` `audio` `iframe` `a` `script` `embed` `object` 的src属性使用
- 生成的方式主要有两种， `FileReader` 和 `URL.createObjectURL`

### `FileReader`
- `Base64`编码的`Data Url`，编码后大小会增加`33%`
- 内存占用较大，**适合较小的文件**

```js
const input = document.querySelector('#fileInput');
input.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const dataUrl = e.target.result; // Base64 编码的 Data URL
    const img = document.createElement('img');
    img.src = dataUrl;
    document.body.appendChild(img);
  };

  reader.readAsDataURL(file);
});
```
:::tip 截取`base64`后的内容文本，通过 `new Blob new File` 构造函数来转回对应的格式
:::
### `URL.createObjectURL`
- 创建临时的`MediaStream` `MediaSource ` `Blob` `File`对象的`url`,指向对应的对象
- `Blob` 数据如果没有明确设置对应的 `MIME` 类型只能由浏览器推断可能会导致在使用如 `img` 标签展示错误
- 浏览器可以高效地解析，效率更高，**适合大文件**
- 会造成**内存泄露**，要手动`URL.revokeObjectURL(url)`释放
- 刷新页面链接失效也会造成内存泄露，要在页面卸载的时候处理卸载
- 不同标签页不可共享

:::tip  在处理流文件情况下 `video` 和 `audio` 可以直接使用 `srcObject`
- 在处理播放`MediaSource`实时音视频对象（流媒体）的时候，可以直接将对象赋值给`srcObject`属性
- 处理本地音视频文件的时候还是要使用`URL.createObjectURL`
:::
