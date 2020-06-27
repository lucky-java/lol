$(function(){
    var id =  getParams("id");
    $.ajax({
        type: "get",
        url: "http://jx.xuzhixiang.top/ap/api/detail.php",
        data: {id:id},
        dataType: "json",
        success: function (data) {
           // console.log(data);
            if(data){
               showImg(data.data.pimg);
               showText(data.data.pname,data.data.pprice);
            }
        }
    });
    function showImg(imgSrc){
        var str = "";
        str = `
        <img src="${imgSrc}" alt="" width="34" height="34">
        `;
        var str1 = "";
        str1 = `
            <img  id="big_pic" class="jqzoom" 
            src="${imgSrc}" 
            alt="" srcset="" width="570" height="570">
        `;
        var str3 = `
            <img src="${imgSrc}" alt="">
        `;
        $("#main-image-0").append(str);
        $("#main-image-1").append(str);
        $("#main-image-2").append(str);
        $("#main-image-3").append(str);
        $("#main-image-4").append(str);
        $("#main-image").append(str1);
        $("#blk_detail_tab_desc p").append(str3);
    }
    function showText(name , price){
        var str = "";
        str = `
        <h3>${name}</h3>
        `;
        var str1 = "";
        str1 = `<font class="f20 fb pro3">￥</font>${price}`;
        $(".xiangq_fonttop").append(str);
        $(".jiage").append(str1);
    }
    //console.log($("#blk_detail_main_btn input").val());
    $("#blk_detail_main_btn input").change(function(){
        var num =  Number($("#blk_detail_main_btn input").val());
        //console.log(num);
        if( num < 1){
            $("#blk_detail_main_btn input").val("1");
        }
    });
    $("#blk_detail_main_btn .jian").click(function () { 
        var num =  Number($("#blk_detail_main_btn input").val());
        console.log(num);
        if( num == 1){
            $("#blk_detail_main_btn input").val("1")  ;
        }else{
            $("#blk_detail_main_btn input").val(num - 1)  ;
        }
        
    });
    $("#blk_detail_main_btn .jia").click(function () { 
        var num =  Number($("#blk_detail_main_btn input").val());
        $("#blk_detail_main_btn input").val(num + 1) ;  
    });

    $(".buy_nobot").click(function(){
        var userStr = localStorage.getItem("user");
        if(userStr){
            var user = JSON.parse(userStr);
            //console.log(user.id);
            var num = Number($("#blk_detail_main_btn input").val());
            $.ajax({
                type: "get",
                url: "http://jx.xuzhixiang.top/ap/api/add-product.php",
                data: {
                    uid: user.id,
                    pid: id,
                    pnum: num,
                },
                dataType: "json",
                success: function (data) {
                    //console.log(data);
                    location.href = "cart.html";
                }
            });
            // $.ajax({
            //     type: "get",
            //     url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
            //     data: {id:user.id},
            //     dataType: "json",
            //     success: function (data) {
            //         //console.log(data);
            //     }
            // });
        }else{
            alert("请先登录，再添加购物车");
        }
        
    });
   
})