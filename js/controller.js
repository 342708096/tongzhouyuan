$(document).ready(function(){

  var page = {

    init: function() {
      this.nav = $('header');
      this.erweima = $('#erweima');
      this.cuxiao = $('#cuxiao');
      this.activateNav();
      this.attachScrollMonitor();
      $('body').scrollspy({ target: 'nav',offset: 40 });
      this.carousel();
    },

    attachScrollMonitor: function() {
      var self = this;

      //Create a watcher on the header. If not in viewport show footer
      var watcher = scrollMonitor.create($('#section1'));
      //
      //
      // //Don't want a footer when header is visible…period
      // watcher.enterViewport(function() {
      //   self.nav.removeClass('black');
      // });
      //
      // watcher.exitViewport(function(){
      //   self.nav.addClass('black');
      // });

      var watcher2 = scrollMonitor.create($('#content'));

      watcher.enterViewport(function() {
        self.erweima.removeClass('fix-right-top').addClass('right-top');
        self.cuxiao.removeClass('fix-left-top').addClass('left-top')
      });

      watcher.exitViewport(function(){
        self.erweima.removeClass('right-top').addClass('fix-right-top');
        self.cuxiao.removeClass('left-top').addClass('fix-left-top');
      });

      //Listen for scroll since we don't want to show the footer until
      //user stops scrolling for alloted duration
    },



    activateNav: function() {
      var self = this;
      $buttons = self.nav.find('a');
      $buttons.on('click', function(e) {
        e.preventDefault();
        var id = e.currentTarget.hash;

        $.smoothScroll({
          scrollTarget: id,
          speed: 600,
          offset: -30
        });
      });

    },

    carousel:function(){
      $('#jingshuishebei').owlCarousel({
        loop:true,
        margin:10,
        items:1,
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:true
      });
      $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        autoplay:true,
        autoplayTimeout:6000,
        autoplayHoverPause:true,
        responsive:{
          0:{
            items:1
          },
          600:{
            items:2
          },
          1000:{
            items:4
          }
        }
      });


      // $('.owl-carousel').on('mousewheel', '.owl-stage', function (e) {
      //   if (e.deltaY>0) {
      //     $(this).trigger('next.owl');
      //   } else {
      //     $(this).trigger('prev.owl');
      //   }
      //   e.preventDefault();
      // });


    }


  };

  //INITIALIZE PAGE
  page.init();




  $(window).bind('scroll',function(){
    if($(window).scrollTop() > $('header').height()) {
      $('.navbar').addClass('navbar-fixed-top');
    } else{
      $('.navbar').removeClass('navbar-fixed-top');
    }
  });



    var imgUrl = "http://www.tz-songshui.com/images/tong2.png";  //图片LOGO注意必须是绝对路径
    var lineLink = "http://www.tz-songshui.com";   //网站网址，必须是绝对路径
    var descContent = '同洲源水站促销开始了，喝健康水，结通州缘。'; //分享给朋友或朋友圈时的文字简介
    var shareTitle = '同洲源送水站';  //分享title
    var appid = ''; //apiID，可留空

    function shareFriend() {
        WeixinJSBridge.invoke('sendAppMessage',{
            "appid": appid,
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('send_msg', res.err_msg);
        })
    }
    function shareTimeline() {
        WeixinJSBridge.invoke('shareTimeline',{
            "img_url": imgUrl,
            "img_width": "200",
            "img_height": "200",
            "link": lineLink,
            "desc": descContent,
            "title": shareTitle
        }, function(res) {
            //_report('timeline', res.err_msg);
        });
    }
    function shareWeibo() {
        WeixinJSBridge.invoke('shareWeibo',{
            "content": descContent,
            "url": lineLink,
        }, function(res) {
            //_report('weibo', res.err_msg);
        });
    }
    // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
    document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function(argv){
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function(argv){
            shareTimeline();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function(argv){
            shareWeibo();
        });
    }, false);
});
