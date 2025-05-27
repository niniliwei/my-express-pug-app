# 🌍 旅行日记 - Travel Blog

一个使用 Express.js 和 Pug 模板引擎构建的现代旅行博客应用程序。

## ✨ 特性

- **响应式设计**: 支持桌面和移动设备
- **旅行内容管理**: 博客文章、目的地介绍
- **搜索功能**: 快速找到感兴趣的内容
- **分类浏览**: 按目的地和标签分类
- **精选文章**: 突出显示重要内容
- **SEO 友好**: 优化的页面标题和结构

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 生产构建

```bash
npm run build
npm start
```

## 🧪 测试

### 运行所有测试

```bash
npm test
```

### 监视模式运行测试

```bash
npm run test:watch
```

### 生成测试覆盖率报告

```bash
npm run test:coverage
```

## 📁 项目结构

```
src/
├── app.ts                 # 应用程序入口点
├── controllers/           # 控制器
│   ├── index.ts
│   └── index.test.ts
├── routes/               # 路由定义
│   ├── index.ts
│   └── index.test.ts
├── services/             # 业务逻辑服务
│   ├── blogService.ts
│   └── blogService.test.ts
├── types/                # TypeScript 类型定义
│   └── index.ts
└── views/               # Pug 模板
    ├── index.pug
    ├── posts.pug
    ├── post.pug
    ├── destinations.pug
    ├── destination.pug
    ├── search.pug
    └── 404.pug
__tests__/               # 测试配置和 E2E 测试
├── setup.ts
└── e2e.test.ts
```

## 🎯 API 路由

- `GET /` - 首页，显示精选文章和最新文章
- `GET /posts` - 所有博客文章列表
- `GET /posts/:id` - 单个博客文章详情
- `GET /destinations` - 所有目的地列表
- `GET /destinations/:id` - 单个目的地详情及相关文章
- `GET /search?q=keyword` - 搜索文章

## 🧪 测试策略

### 单元测试
- **服务层测试**: 测试 `BlogService` 的所有方法
- **控制器测试**: 测试路由处理逻辑和错误处理
- **路由测试**: 测试 HTTP 路由和状态码

### 集成测试
- **应用程序测试**: 端到端的 HTTP 请求测试
- **模板渲染测试**: 验证 Pug 模板正确渲染
- **错误处理测试**: 测试 404 和其他错误情况

### E2E 测试
- **用户流程测试**: 完整的用户浏览体验
- **性能测试**: 并发请求处理
- **内容验证**: 确保正确的旅行内容展示

## 🛡️ 测试覆盖率

项目包含全面的测试套件，覆盖：

- ✅ 所有控制器方法
- ✅ 业务逻辑服务
- ✅ 路由处理
- ✅ 错误处理
- ✅ 模板渲染
- ✅ 搜索功能
- ✅ 数据验证

## 🔧 技术栈

- **后端**: Node.js, Express.js, TypeScript
- **模板引擎**: Pug
- **测试**: Jest, Supertest
- **开发工具**: ts-node, ts-node-dev
- **环境配置**: dotenv

## 📝 开发指南

### 添加新的博客文章

1. 在 `src/services/blogService.ts` 中的 `posts` 数组添加新文章
2. 确保包含所有必需字段：`id`, `title`, `content`, `destination`, `country`, `tags`, `publishedAt`, `featured`
3. 运行测试确保没有破坏现有功能

### 添加新的目的地

1. 在 `src/services/blogService.ts` 中的 `destinations` 数组添加新目的地
2. 更新相应目的地的 `postCount`
3. 添加相应的测试用例

### 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add amazing feature'`
4. 推送到分支：`git push origin feature/amazing-feature`
5. 开启 Pull Request

## 🚀 部署

项目包含 GitHub Actions CI/CD 工作流，支持：

- 自动化测试
- 代码覆盖率报告
- 安全审计
- 多 Node.js 版本测试

## 📄 许可证

MIT License

## 🤝 贡献者

感谢所有为这个项目做出贡献的开发者！

---

**享受你的旅行日记体验！** 🌟