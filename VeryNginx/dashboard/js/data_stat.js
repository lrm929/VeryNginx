$.ajax({
    type: "GET",
    // url: "http://www.licaifan.com/nginx/summary",
    url: "/verynginx/summary",
    data_Type: "json",

    success: function (json_data) {

        console.log("异步请求成功");
        console.log(typeof json_data);

        var response = json_data;
        var url_index = 1;

        console.log(response);

        for (var key in response) {
            console.log(key);
            
            // 计算访问成功率
            if ("undefined" != typeof(json_data[key].status[200])) {
                var success = json_data[key].status[200] / json_data[key].count;
                console.log("not 0");
            } else { // 当200状态不存在的时候成功率为0
                var success = 0;
                console.log("is 0")
            };

            var count = parseInt(json_data[key].count);
            var size = parseFloat(json_data[key].size);
            var avg_size = size / count;
            var time = parseFloat(json_data[key].time);
            var avg_time = time / count;
            

            // 动态增加每一列关于各URL/URI的详细访问信息
            var dyn_tab =  "<tr><th style = \"width: 5%\">" + url_index + "</th>" +
                           "<th style = \"width: 35%\">" + key + "</th>" +
                           "<th style = \"width: 10%\">" + count + "</th>" +
                           "<th style = \"width: 10%\">" + size.toFixed(2) + "</th>" +
                           "<th style = \"width: 10%\">" + avg_size.toFixed(2) + "</th>" +
                           "<th style = \"width: 10%\">" + success.toFixed(4) * 100 + "%</th>" +
                           "<th style = \"width: 10%\">" + time.toFixed(3) + "</th>" +
                           "<th style = \"width: 10%\">" + avg_time.toFixed(3) + "</th></tr>";

            $('#url_details').append(dyn_tab);

            url_index++; // 增加访问序列
    
        }

        // 添加表格排序
        $('#url_table').DataTable( {
            paging: false,
            searching: true,
            "order": [[ 0, "asc" ]]
        } );
    }
})