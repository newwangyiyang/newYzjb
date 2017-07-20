(function(){
    $(function(){
        $('.name_res').text(getCookie("userName"));
        if(getCookie('userSex') == 1) {
            $('.gender_res').text('男');
        }else if(getCookie('userSex') == 0) {
            $('.gender_res').text('女');
        }else {
            $('.gender_res').html('&nbsp;');
        }
        $('.tel_res').text(getCookie('userMob'));
        $('.province_res').text(getCookie('userProvince'));
        $('.area_res').text(getCookie('userRegion'));
        $('.code_res').text(getCookie('userId'));
    });
})();