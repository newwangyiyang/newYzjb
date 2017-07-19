(function(){
    $(function(){
        $('.name_res').text(getCookie("userName"));
        getCookie('userSex') == 1 ? $('.gender_res').text('男') : $('.gender_res').text('女');
        $('.tel_res').text(getCookie('userMob'));
        $('.province_res').text(getCookie('userProvince'));
        $('.area_res').text(getCookie('userRegion'));
        $('.code_res').text(getCookie('userCode'));
    });
})();