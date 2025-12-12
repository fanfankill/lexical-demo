# GitHub Pages 部署指南

## 📋 前提条件
- 你的代码已经推送到 GitHub 仓库
- 你有该仓库的管理员权限

## 🚀 部署步骤

### 1. 推送代码到 GitHub

如果还没有创建 GitHub 仓库：

```bash
# 初始化 git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 添加远程仓库（替换为你的 GitHub 仓库地址）
git remote add origin https://github.com/你的用户名/lexical-demo.git

# 推送到 GitHub
git push -u origin main
```

### 2. 在 GitHub 上启用 Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - Source: 选择 **GitHub Actions**
5. 保存设置

### 3. 触发部署

有两种方式触发部署：

**方式一：自动触发**
- 只要你推送代码到 main 分支，就会自动触发部署

```bash
git add .
git commit -m "Update"
git push
```

**方式二：手动触发**
1. 进入仓库的 **Actions** 标签
2. 选择 **Deploy to GitHub Pages** 工作流
3. 点击 **Run workflow** 按钮

### 4. 查看部署状态

1. 进入仓库的 **Actions** 标签
2. 查看最新的工作流运行状态
3. 等待部署完成（通常需要 1-3 分钟）

### 5. 访问你的网站

部署成功后，你的网站将在以下地址可用：

```
https://你的用户名.github.io/lexical-demo/
```

## ⚙️ 配置说明

### vite.config.ts
- `base: '/lexical-demo/'` - 这个必须与你的仓库名称匹配
- 如果你的仓库名不是 `lexical-demo`，请修改这个值

### 工作流文件
- `.github/workflows/deploy.yml` - 自动化部署配置
- 如果你的主分支不是 `main`（比如是 `master`），需要修改工作流中的分支名

## 🔧 故障排除

### 问题1：页面显示 404
- 确认 `vite.config.ts` 中的 `base` 路径与仓库名匹配
- 确认 GitHub Pages 设置中选择了 **GitHub Actions** 作为 Source

### 问题2：资源文件加载失败
- 检查 `base` 配置是否正确
- 确认 `public/.nojekyll` 文件存在

### 问题3：部署失败
- 检查 Actions 标签中的错误日志
- 确认 `package.json` 中的依赖都能正常安装
- 确认 Node.js 版本要求（>=18.0.0）

## 📝 本地测试生产构建

在推送到 GitHub 之前，建议先本地测试：

```bash
# 构建
pnpm run build

# 预览构建结果
pnpm run preview
```

## 🔄 更新部署

每次你推送代码到 main 分支，GitHub Actions 会自动重新构建和部署：

```bash
git add .
git commit -m "你的更新描述"
git push
```

## 📚 更多资源

- [GitHub Pages 官方文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

