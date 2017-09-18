 //商品展示信息回显
 var n = 6;
 var j = 0;
 var k;
 $.get('http://139.199.192.48:9090/api/getinlanddiscount', function(data) {
         $(".pageloading").show();
         k = Math.floor((data.result.length - 6) / 4);
         var list = [];
         for (var i = 0; i < n; i++) {
             list[list.length] = data.result[i];
         }
         $("#menu").html(template("sampleList", list));
         $(".pageloading").hide();
     })
     //商品详情展示
 $("#menu").on("click", "a", function() {
     var data = parseInt($(this).attr("data-id"));
     location.href = './html/sample/sample.html?productid=' + data;
 })

 //滚动加载
 $(window).on("scroll", function() {
     var offsetTop = $("#menu").offset().top; //$("#menu")的顶部距离顶端的距离
     var itemHeight = $("#menu").height();
     var screenHeight = $(this).height(); //屏幕的高度
     var scrollHeight = $(this).scrollTop(); //页面被卷去的高度
     if (offsetTop + itemHeight - screenHeight - scrollHeight < 100 && !$("#menu").hasClass("loading")) {
         j++;
         $("#menu").addClass("loading");
         if (j > k) {
             $.get('http://139.199.192.48:9090/api/getinlanddiscount', function(data) {
                 $(".pageloading").show();
                 $("#menu").html(template("sampleList", data.result));
                 $(".pageloading").hide();
             })
             return;

         }

         $.get('http://139.199.192.48:9090/api/getinlanddiscount', function(data) {
             $(".pageloading").show();
             var list = [];
             n = 6 + j * 4;
             for (var i = 0; i < n; i++) {
                 list[list.length] = data.result[i];
             }
             $("#menu").html(template("sampleList", list));
             $(".pageloading").hide();
             $("#menu").removeClass("loading");
         })
     }

 })