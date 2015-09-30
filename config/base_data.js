var G = {
    api_host: 'http://ecom.wxpai.cn/ecomm/',
    cdn_host: 'http://fs.wxpai.cn/',
    paiplus_host: 'http://piplus.wxpai.cn/',
    wx_config_host: 'https://api.wxpai.cn/open/',
    path: {
        root: './',
        directive: './src/directive',
        mod: './src/mod',
        public: './src/public'
    },
    query: {},//获取get值参数
    user: {},//全局站点配置信息
    site: {},//全局用户信息
    site_name: '微商城',//默认标题
    user_version: '20150619.06',//用户数据版本
    load_version: '20150619.06',//文件加载版本
    debug: 0//正式环境 0 debug模式设置为1 微信模式 2 PC模式
}, F = {};


//测试数据 debug 模式
if (G.debug) {
    if (G.debug === 2) {
        G.user = {
            id: 1,
            name: 'ken',
            ent_code: G.query.ent_code
        }
    }
    G.load_version = Math.random()
}


//base function load
G.LoadProjectFunctionFlag = false
G.LoadFunction = [
    '1',
    '2'
]
