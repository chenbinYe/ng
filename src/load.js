/**
 * Created by Game-netease on 2014/11/4.
 */



seajs.config({

    base: G.path.root,
    alias: {
        'angular': 'lib/common/angular.js',
        'jquery': 'lib/common/jquery.js',
        'zepto': 'lib/common/zepto.js',
        'frozen': 'lib/common/frozen.js',
    },
    'map': [[/^(.*\.(?:css|js))(?!\?)(.*)$/i, '$1?' + G.load_version]],

    paths: {
        'app': 'src/app',
        'mod': 'src/mod',
        'lib': 'src/lib',
        'common': 'src/lib/common',
        //'weixin': 'src/lib/weixin',
        'plugin': 'src/lib/plugin',
        'directive': 'src/directive'
    }
});


//基础库加载
seajs.use([
    'zepto',
    'app/function',
    'lib/common/store',
  //  'site/' + G.query.ent_code//获取商城对应的静态数据
], function () {

    //angular 模块库加载
    var bootstrap_ng = function () {
        seajs.use([
           // 'frozen',
            'angular',
            'common/angular-route',
            'common/angular-sanitize',
            'app/ngsea',
            'app/app',
            'app/route',
            'app/directive',
            'app/service'
        ], function () {
            //console.log('bootstrap_ng')
            angular.bootstrap(document, ["app"])
            //初始化微信函数
            if (G.debug != 2){
                seajs.use([
                    //G.wx_config_host + 'jsapi/config.js?appId=' + G.user.appId + '&isDebug=false',
                    //G.site.tongji
                ])
            }
        })
    }
    //定义网站头
    G.site_name = G.site.name || G.site_name


    if ((!G.user || G.user.version != G.user_version || !localToken) && G.debug != 2  && 1==0) {
        //请求新数据
        $.ajax({
            //url: G.paiplus_host + 'app/member/' + G.query.ent_code + '/openApi/get?rmd=' + Math.random(),
            url: G.wx_config_host + 'client/info?rmd=' + Math.random(),
            headers: {'X-Client-Token': localToken},
            success: function (res) {
                if (res.errcode === 0) {
                    if (res.data && res.data.user) {

                        //用户全局赋值
                        G.user = res.data.user
                        G.user.name = G.user.name || G.user.nickName
                        G.user.id = G.user.id || G.user.mid
                        G.user.version = G.user_version
                        G.user.appId = res.data.enterprise.appId
                        G.user.ent_code = res.data.enterprise.ent_code
                        //启动angular操作
                        bootstrap_ng()
                        //判断是否需要定位到特定的页面
                    } else {
                        _cb_to_oauth(res.data)
                    }
                } else {
                    _cb_to_oauth(res.data)
                }
            },
            error: function (e) {
                console.log('load api error', e)
            }
        })
    } else {
        //G.user.ent_code = G.query.ent_code
        //启动angular操作
        bootstrap_ng()
    }

})