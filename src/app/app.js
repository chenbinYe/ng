/**
 * Created by Game-netease on 2014/11/4.
 */
define(['angular'], function(require, exports, module) {


    var app = angular.module('app', ['ngRoute', 'ngSanitize', 'ngsea', ])
        .run(['$rootScope', '$timeout', '$ngsea', '$location', function($rootScope, $timeout, $ngsea, $location) {
            $rootScope.G = G;
            $rootScope.F = F;
            //var conf = {module: 'shop', controller: 'index', action: 'coupon', version: G.load_version || ''}
            //var conf = {module: 'shop', controller: 'special', action: 'liuyi', version: G.load_version || ''}
            //var conf = {module: 'shop', controller: 'game', action: 'seckill', version: G.load_version || ''}
            var conf = {
                module: 'test',
                controller: 'index',
                action: 'index',
                version: G.load_version || ''
            }
            $ngsea(app, conf)
                //
            $rootScope.$on('$routeChangeSuccess', function(e, target) {
                    $('body').scrollTop(0)
                })
                // $('#load_view').show()
                /**
                 * F函数
                 */
            G.once_load = []

            //全局变量
            $rootScope._load_message = false
            $rootScope._diabled = false
            $rootScope.footer_nav_show = false
            $rootScope.site_title = ''


            var _ios_set_title = function(title) {
                var $body = $('body');
                document.title = title
                var $iframe = $('<iframe src="./favicon.ico"></iframe>').hide().on('load', function() {
                    setTimeout(function() {
                        $iframe.off('load').remove()
                    }, 0)
                }).appendTo($body)
            }

            F.title = function(title, i) {
                if (i) {
                    $rootScope.site_title = title
                } else {
                    $rootScope.site_title = title && (title + '-' + G.site_name) || G.site_name
                }
                if (['iphone', 'ipad'].indexOf(F.check_device()) > -1) _ios_set_title($rootScope.site_title)
            }

            F.title()


            //全局tips功能
            F.tips = function(msg, timeout, disabled) {

                    if (msg !== true) $rootScope._tips_message = msg
                    if (disabled) $rootScope._tips_diabled = true
                    if ($rootScope._tips_message == false) $rootScope._tips_diabled = false

                    if (timeout && timeout > 0) {
                        return $timeout(function() {
                            $rootScope._tips_message = false
                            $rootScope._tips_diabled = false
                        }, timeout)
                    }
                }
                //全局load功能
            F.load = function(msg, timeout, disabled) {

                    if (msg !== true) $rootScope._load_message = msg
                    if (disabled) $rootScope._load_diabled = true
                    if ($rootScope._load_message == false) $rootScope._load_diabled = false

                    if (timeout && timeout > 0) {
                        $timeout(function() {
                            $rootScope._load_message = false
                            $rootScope._load_diabled = false
                        }, timeout)
                    }
                }
                //弹出确认框
            F.confirm = function(title, content) {
                if (title !== true) $rootScope._confirm_title = title
                if (content !== true) $rootScope._confirm_content = content
                    //return false
            }

            F.cancel_receive = function(status) {
                $rootScope._confirm_title = false
                $rootScope.$broadcast('confirmOrder', status);
            }

        }])
})
