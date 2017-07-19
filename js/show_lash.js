(function () {
    $(function () {
        //选择日期，调用datePicker插件
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        if(month == 0) {
        	month = 12;
        	year = year - 1;
        }
        month = month >= 10 ? month : '0' + month;
        $('#date_choose p').eq(0).find('.year').text(year);
        $('#date_choose p').eq(0).find('.month').text(month);
        //欠款明细渲染
        getLashList(getPort() + 'selectArrearsDetail', { 'userCode': getCookie('userCode'), 'datatime': '2017-' + month });
        //欠费明细列表查询
        function getLashList(url, data) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    var str = '';
                    console.log(data);
                    if (data.statusCode == 1) {
                        var res = data.list[0];//取出列表中的第[0]项；
                        $('#show_own').show();
                        $('.provinceO').text(res.userinfo.userProvince);
                        $('.areaLoc').text(res.userinfo.userRegion);
                        $('.director').text(res.userinfo.userName);
                        $('.rules').text(res.arrOrderAllocation);
                        $('.dataPrice').text(res.arrDataFee);
                        $('.market').text(res.arrShare);
                        $('.shouldPrice').text(res.arrAccounts);
                        $('.spreadPrice').text(res.arrPromotion);
                        $('.arrPrice').text(res.arrTotalArrears);
                        $('.arrShould').text(res.arrTicket);
                        $('.priceMethod').text(res.arrDebit == 0 ? res.arrDebit : (res.arrDebit == 1 ? '帐内自动扣' : '自行打回公司'));
                    } else if (data.statusCode == 0) {
                    	$('#show_own').hide();
                        layer.open({
                            content: data.message
                            , skin: 'msg'
                            , time: 2 //2秒后自动关闭
                        });
                    }
                }
            });
        }
    });
})();