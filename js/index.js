$(function(){
   
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
        data: {uid:34468},
        dataType: "json",
        success: function (data) {
            //console.log(data);
            if(data.msg){
                showList(data.data);
            }
        }
    });
    //console.log($("#blk_rec_list"));
    function showList(data){
        var str = "";      
        str = `
            <li>
                <a href="list.html" target="_blank">
                    <img src="${data[3].pimg}" alt="首页推荐广告位" width="480" height="300">
                </a>
                <p class="inshop-tit">英雄联盟 符文之地的故事 设定集</p>
            </li>
        `;
        str = str + `
            <li>
                <a href="list.html" target="_blank">
                    <img src="${data[2].pimg}" alt="首页推荐广告位" width="480" height="300">
                </a>
                <p class="inshop-tit">原计划 艾瑞莉娅 中型雕塑</p>
            </li>
        `;
        str = str + `
            <li>
                <a href="list.html" target="_blank">
                    <img src="${data[0].pimg}" alt="首页推荐广告位" width="480" height="300">
                </a>
                <p class="inshop-tit">云顶周边新品</p>
            </li>
        `;
        str = str + `
            <li>
                <a href="list.html" target="_blank">
                    <img src="${data[1].pimg}" alt="首页推荐广告位" width="480" height="300">
                </a>
                <p class="inshop-tit">泳池派对系列周边</p>
            </li>
        `;
        $("#blk_rec_list").append(str);
    }
})