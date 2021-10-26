# 版本号
node -v
yarn -v
npm -v


# 设置为prod模式
export NODE_ENV=production
env | grep NODE_ENV

# 清理npm缓存
# npm cache clean -f
# 安装依赖，忽略关联脚本运行，加快安装速度
# npm install --ignore-scripts

npm install

npm run build

if [ $? -ne 0 ]; then
exit 1
fi


mkdir -p ./output/webroot
cp -r ./build/ ./output/webroot 
chmod -R 755 ./output/webroot