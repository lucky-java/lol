$(function(){
    //添加商品
    // $.ajax({
    //     type:"post",
    //     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
    //     data: {
    //         pimg:"https://game.gtimg.cn/images/daojushop/zb/ad/202006/20200622093421_419399.jpg",
    //         pname:"符文之地的故事",
    //         pprice:199,
    //         pdesc:"book",
    //         uid: 34468
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    // $.ajax({
    //     type:"post",
    //     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
    //     data: {
    //         pimg:"https://game.gtimg.cn/images/daojushop/zb/ad/202006/20200624120059_949769.jpg",
    //         pname:"螃蟹短袖",
    //         pprice:150,
    //         pdesc:"服饰",
    //         uid: 34468
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    // $.ajax({
    //     type:"post",
    //     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
    //     data: {
    //         pimg:"https://game.gtimg.cn/images/daojushop/zb/ad/202006/20200611114943_704702.jpg",
    //         pname:"艾瑞莉娅",
    //         pprice:599,
    //         pdesc:"手办",
    //         uid: 34468
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    // $.ajax({
    //     type:"post",
    //     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
    //     data: {
    //         pimg:"https://game.gtimg.cn/images/daojushop/zb/ad/202006/20200613093909_250080.jpg",
    //         pname:"甜筒怒角 坐姿毛绒",
    //         pprice:130,
    //         pdesc:"玩偶",
    //         uid: 34468
    //     },
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    // $.ajax({
    //     type:"post",
    //     url: "http://jx.xuzhixiang.top/ap/api/goods/goods-add.php",
    //     data:[
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202004/20200408115801_12723.big.jpg",
    //             pname:"愚人节迷你手办套装",
    //             pprice:280.00,
    //             pdesc:"手办",
    //             uid: 34281
    //         },
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/201911/20191110114539_25606.big.jpg",
    //             pname:"True Damage迷你手办套装",
    //             pprice:220.00,
    //             pdesc:"手办",
    //             uid: 34281
    //         },
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202006/20200612200142_80692.big.jpg",
    //             pname:"甜筒怒角 坐姿毛绒",
    //             pprice:130.00,
    //             pdesc:"玩偶",
    //             uid: 34281
    //         },
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202003/20200331135548_84130.big.jpg",
    //             pname:"柯基库奇 毛绒",
    //             pprice:249.00,
    //             pdesc:"玩偶",
    //             uid: 34281
    //         },
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202005/20200522204713_59585.big.jpg",
    //             pname:"2020 L Logo卫衣",
    //             pprice:390.00,
    //             pdesc:"服饰",
    //             uid: 34281
    //         },
    //         {
    //             pimg:"https://game.gtimg.cn/images/zb/x5/uploadImg/goods/202001/20200102113518_85881.big.jpg",
    //             pname:"悠米卫衣",
    //             pprice:270.00,
    //             pdesc:"服饰",
    //             uid: 34281
    //         }
    //     ],
    //     dataType: "json",
    //     success: function (data) {
    //         console.log(data);
    //     }
    // });
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/productlist.php",
        data: {uid:34281},
        dataType: "json",
        success: function (data) {
            console.log(data.data[2]);
            if(data.data){
                ShowList(data.data);
            }
        }
    });
    function ShowList(data){
        var str = "";
        for(let index in data){
            str += `
            <li>
                <i class="ico-menu gl-like"></i>
                <a class="gl-link" href="detail.html?id=${data[index].pid}"> 
                    <div class="gl-img">
                        <img src="${data[index].pimg}" alt="" width="527" height="506">
                    </div>                               
                </a>
                <p class="gl-name">${data[index].pname}</p>
                <p class="gl-pri">￥${data[index].pprice}</p>
            </li>
            `;
        }
        //console.log(str);
        console.log($("#blk_productlist_product"));
        $("#blk_productlist_product ul").append(str);
    }
})