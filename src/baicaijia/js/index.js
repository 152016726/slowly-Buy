require('./sort.js');
$.get("http://139.199.192.48:9090/api/getbaicaijiatitle", function(data) {
    $(".category_nav").html(template("listSample", data.result));
    //设置第一个li的class类名
    $(".category_nav").children().eq(0).addClass("active");
})
$(".category_nav").on("click", "a", function() {
    var data = parseInt($(this).attr("data-id"));
    console.log($(this).attr("data-id"));
    $(".pageloading").show();
    $.get("http://139.199.192.48:9090/api/getbaicaijiaproduct", {
        titleid: data
    }, function(data) {
        $("#goods").html(template("listgoods", data.result));
        $(".pageloading").hide();
    })
})

//商品展示回显
$.get("http://139.199.192.48:9090/api/getbaicaijiaproduct", {
    titleid: 0
}, function(data) {
    $(".pageloading").show();
    $("#goods").html(template("listgoods", data.result));
    $(".pageloading").hide();
})