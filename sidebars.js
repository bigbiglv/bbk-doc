/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

  web: [
    {
      type: 'category',
      label: 'Javascript',
      items: [
        {
          type: 'category',
          label: '功能案例',
          items: [
            'javascript/功能案例/文件上传',
          ]
        },
        {
          type: 'category',
          label: '设计模式',
          items: [
            'javascript/设计模式/发布订阅模式',
            'javascript/设计模式/观察者模式',
            'javascript/设计模式/单例模式',
            'javascript/设计模式/工厂模式',
            'javascript/设计模式/策略模式',
          ]
        },
        'javascript/Blob&File',
        'javascript/栈和队列',
        'javascript/链表',
        'javascript/生成器',
        'javascript/迭代器',
        'javascript/Set和Map数据结构',
        'javascript/async...await',
        'javascript/解构赋值',
        'javascript/模块',
        'javascript/事件循环',
        'javascript/变量提升',
        'javascript/数组遍历相关',
        'javascript/浏览器事件',
        'javascript/AudioContext',
      ],
    },
    {
      type: 'category',
      label: 'TypeScript',
      items: [
        'typescript/class',
        'typescript/内置类型',
        'typescript/函数重载',
        'typescript/基础配置',
        'typescript/声明类型',
        'typescript/常见问题',
        'typescript/接口inteface',
        'typescript/泛型',
        'typescript/类型别名type',
        'typescript/类型推断',
        'typescript/高级类型',
        'typescript/tsconfigJson',
      ],
    },
    {
      type: 'category',
      label: 'Vue3',
      items: [
        {
          type: 'category',
          label: '基础语法',
          items: [
            'vue3/syntax/computed',
            'vue3/syntax/css',
            'vue3/syntax/defineExpose',
            'vue3/syntax/ref和reactive原理',
            'vue3/syntax/teleport',
            'vue3/syntax/v-model',
            'vue3/syntax/watch数据监听',
            'vue3/syntax/与vue2比较',
            'vue3/syntax/列表过渡动画',
            'vue3/syntax/响应式数据处理',
            'vue3/syntax/提取响应式对象属性',
            'vue3/syntax/生命周期',
            'vue3/syntax/组件传参',
            'vue3/syntax/组件异步引入',
            'vue3/syntax/组合式api和选项式api',
            'vue3/syntax/自定义hooks',
            'vue3/syntax/自定义ref',
            'vue3/syntax/过渡和动画',
            'vue3/syntax/透传',
            'vue3/syntax/问题合集',
          ],
        },
        {
          type: 'category',
          label: 'vue-router@4',
          items: [
            'vue3/vue-router/vue-router@4',
          ],
        },
        {
          type: 'category',
          label: 'Pinia',
          items: [
            'vue3/pinia/安装',
            'vue3/pinia/数据响应式',
            'vue3/pinia/state',
            'vue3/pinia/actions',
            'vue3/pinia/getter',
            'vue3/pinia/修改、重置和监听',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'React',
      items: [
        'react/JSX语法',
        'react/Props',
        'react/state',
        'react/useCallback',
        'react/useEffect',
        'react/useMemo',
        'react/事件处理',
        'react/函数式和类式组件',
        'react/生命周期',
        'react/组件传参',
        'react/虚拟Dom渲染',
        'react/跨域代理',
      ],
    },
    {
      type: 'category',
      label: 'Vite',
      items: [
        'vite/scss和less',
        'vite/常用插件',
        'vite/接口代理',
        'vite/资源导入',
        'vite/路径别名',
        'vite/问题合集',
      ],
    },
    {
      type: 'category',
      label: 'Axios',
      items: [
        'axios/axios实例',
        'axios/发送请求',
        'axios/取消请求',
        'axios/拦截器',
        'axios/错误处理',
      ],
    },
    {
      type: 'category',
      label: 'Svelte',
      items: [
        'svelte/事件处理',
        'svelte/双向绑定',
        'svelte/基本语法',
        'svelte/富文本',
        'svelte/数据响应式',
        'svelte/数据监听',
        'svelte/组件传参',
        'svelte/计算属性',
      ],
    },
    {
      type: 'category',
      label: 'NPM',
      items: [
        'npm/安装和卸载',
        'npm/切换镜像',
        'npm/发布和删除',
        'npm/packageJson',
        'npm/遇到的问题',
      ],
    },
    {
      type: 'category',
      label: '动效库',
      items: ['动效库/动效库'],
    },
    {
      type: 'category',
      label: '笔记',
      items: [
        '笔记/git新建空文件夹',
        '笔记/git新建空白分支',
        '笔记/vscode i18n-ally扩展',
      ],
    },
    {
      type: 'category',
      label: '网络',
      items: [
        '网络/网络协议',
        '网络/http缓存策略',
        '网络/http版本',
        '网络/常见请求体',
        '网络/资源和URI',
        '网络/预检请求',
      ],
    },
    {
      type: 'category',
      label: '鸿蒙',
      items: ['鸿蒙/ui'],
    },
    {
      type: 'category',
      label: 'HTTP',
      items: ['http/http缓存'],
    },
  ],
  server: [
    {
      type: 'category',
      label: 'NestJS',
      items: [
        'nestjs/起步',
        'nestjs/服务',
        'nestjs/控制器',
        'nestjs/管道',
        'nestjs/模块',
        'nestjs/中间件',
        'nestjs/异常过滤器',
        {
          type: 'category',
          label: '功能',
          items: [
            'nestjs/功能/文件',
            'nestjs/功能/SSE',
            'nestjs/功能/Redis',
          ]
        },
      ],
    },
  ],
  git: [
    {
      type: 'category',
      label: 'Git',
      items: [
        'git/分支',
        'git/Stash',
        'git/修改commit信息',
        'git/发布版本',
        'git/合并分支',
        'git/复制commit',
        'git/多个源',
        'git/撤销修改',
        'git/故障分支',
        'git/查看版本号',
        'git/添加多个源',
        'git/版本回退',
        'git/自定义命令',
        'git/配置多个ssh',
        'git/常见问题',
        'git/面试题',
      ],
    },
  ],
  markdown: [
    {
      type: 'category',
      label: 'Markdown',
      items: [
        'markdown/基本语法',
        'markdown/代码块',
      ],
    },
  ],
  interview: [
    {
      type: 'category',
      label: '面试题',
      items: [
        '面试题/网络',
      ],
    },
  ],
  leetcode: [
    {
      type: 'category',
      label: 'leetcode',
      items: [
        'leetcode/88合并两个有序数组',
      ],
    },
  ]
};

export default sidebars;
