(function(){
    $(function(){
        var str = '<li>'
                +'<i>姓名</i>'
                +'<span>'+getCookie('userName')+'</span>'
                +'</li>'
                +'<li>'
                +'<i>手机号</i>'
                +'<span>'+getCookie('userMob')+'</span>'
                +'</li>'
                +'<li>'
                +'<i>地区</i>'
                +'<span>'+getCookie('userProvince')+'('+getCookie('userRegion')+')'+'</span>'
                +'</li>';
        $('.user_info').html(str);
    });
})();