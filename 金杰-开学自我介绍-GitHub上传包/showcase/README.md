# Showcase 作品导入说明

此目录用于放置「科技作品展示区」的自有代码文件。

## 快速上手

1. 把你的代码文件（`.py` / `.c` / `.cpp` / `.js` / `.ino` 等）放到 `projects/` 子目录，例如：
   ```
   showcase/
   └── projects/
       ├── hello.c
       └── ofdm_demo.py
   ```

2. 在 `index.html` 中引入（放在 `showcase/data.js` 之前）：
   ```html
   <script>
     // 用 fetch 读取文件并挂到全局，或者直接把代码内容写到对象里
     window.MY_CODE = {};
   </script>
   <script src="showcase/projects/hello.c"></script>
   ```

   > 更简单的做法：直接把代码内容以字符串形式写在 `showcase/data.js` 的 `code` 字段中（推荐，无需额外文件）。

3. 编辑 `showcase/data.js`，在 `SHOWCASE_DATA` 数组中添加一条：
   ```js
   {
     id: "hello-c",
     name: "Hello, Hrbust!",
     icon: "🔧",
     description: "第一个 C 语言示例程序",
     tags: ["C", "入门"],
     language: "c",
     code: '#include <stdio.h>\nint main() {\n    printf("Hello Hrbust!\\n");\n    return 0;\n}'
   }
   ```

## `language` 字段支持的值

目前已引入以下 Prism.js 语言组件，填写 `language` 时对应下列之一即可：

| 语言 | 填写值 |
|------|--------|
| C | `c` |
| C++ | `cpp` |
| Python | `python` |
| JavaScript | `javascript` |
| Arduino (.ino) | `arduino` |

如果需要其他语言（Java / Go / Rust / TS ...），在 `index.html` 底部再引入对应组件，例如：

```html
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-java.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-go.min.js"></script>
```

然后在 `language` 字段填写 `java` / `go` 即可。
