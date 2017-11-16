1. Make sure you have a recent version of Node.js installed.
    https://nodejs.org/en/

2. set npm 镜像
   -- 将npm 设置成淘宝的镜像源 --
   $ npm config set registry https://registry.npm.taobao.org
   -- 验证是否成功 --
   $ npm config get registry

3. 项目环境配置
   $ npm install

4. 开发环境启动
   $ yarn start
   -- http://localhost:3000 浏览器访问（press F12，change to mobile device）

5. 生产部署
   $ yarn build
   -- 生成build 部署文件夹 --