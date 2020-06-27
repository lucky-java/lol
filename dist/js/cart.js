$(function(){
    var userStr = localStorage.getItem("user");
    var strHtml = "";
    if(userStr){
        var user = JSON.parse(userStr);
        $.ajax({
            type: "get",
            url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
            data: {id : user.id},
            dataType: "json",
            success: function (data) {
                //console.log(data);
                showList(data.data);
                $("#cart-shop-list").html(strHtml);
                var jianList = $("#cart-shop-list .buysl .jian");
                var inputList = $("#cart-shop-list .buysl input");
                var jiaList = $("#cart-shop-list .buysl .jia");
                var AId = $("#cart-shop-list .buysl");
                var ADel = $("#cart-shop-list .btn-del");
                for(let i in ADel){
                    ADel[i].onclick = function(){
                        var pid = AId[i].getAttribute("data-id");
                        $.ajax({
                            type: "get",
                            url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                            data: {
                                uid :user.id,
                                pid : pid,
                            },
                            dataType: "json",
                            success: function (data) {
                                if(data){
                                    window.location.reload();
                                }
                            }
                        });
                    }
                }
                //商品数量
                for(let i in inputList){
                    inputList[i].onchange = function(){
                        var num =Number(inputList[i].value);
                        if( num < 1){
                            inputList[i].value = 1;
                        }else{
                            var AInput = $("#cart-shop-list .buysl input");
                            inputList[i].value = AInput[i].value;
                        }
                        var pid = $("#cart-shop-list .buysl").eq(i).attr("data-id");
                        $.ajax({
                            type: "get",
                            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
                            data: {
                                uid :user.id,
                                pid : pid,
                                pnum: Number(AInput[i].value) ,
                            },
                            dataType: "json",
                            success: function (data) {
                                // if(data.code == 1){
                                //     window.location.reload();
                                // } 
                            }
                        });
                    };
                }
                for(let i in jianList){
                    jianList[i].onclick = function(){
                        var num = Number(inputList[i].value);
                        if( num <= 1){
                            inputList[i].value = 0;
                        }else{
                            inputList[i].value = num-1;
                            //window.location.reload();
                        }
                        var pid = AId[i].getAttribute("data-id");
                        var AInput = $("#cart-shop-list .buysl input");
                        $.ajax({
                            type: "get",
                            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
                            data: {
                                uid :user.id,
                                pid : pid,
                                pnum: Number(AInput[i].value) ,
                            },
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                // if(data.code == 1){
                                //     window.location.reload();
                                // } 
                            }
                        });
                    };

                }
                for(let i in jiaList){
                    jiaList[i].onclick = function(){
                        var num = Number(inputList[i].value);
                        if( num < 0){
                            inputList[i].value = 0;
                        }else{
                            inputList[i].value = num+1;
                            //window.location.reload();
                        }
                        var pid = $("#cart-shop-list .buysl").eq(i).attr("data-id");
                        var AInput = $("#cart-shop-list .buysl input");
                        $.ajax({
                            type: "get",
                            url: "http://jx.xuzhixiang.top/ap/api/cart-update-num.php",
                            data: {
                                uid :user.id,
                                pid : pid,
                                pnum: Number(AInput[i].value) ,
                            },
                            dataType: "json",
                            success: function (data) {
                                // if(data.code == 1){
                                //     window.location.reload();
                                // } 
                            }
                        });
                    };
                }
                //总价
                var totalPrice = "";
                //总数
                var pNum = "";
                //全选
                $("#allcheck").click(function(){
                    if($("#allcheck").prop("checked")){
                        $("#cart-shop-list .li_inp input").prop("checked","checked");
                        

                    }else{
                        $("#cart-shop-list .li_inp input").prop("checked",false);
                    }
                    totalPrice = getAllTotalPrice();
                    pNum = getAllTotalPnum();
                    $("#tota").html(totalPrice);
                    $("#numcount").html(pNum);
                });
                var count = 0;
                //单选
                $("#cart-shop-list .li_inp input").click(function(){
                    if($(this).prop("checked")){
                        count++;   
                        if(count == $("#cart-shop-list .li_inp input").length){
                            $("#allcheck").prop("checked",true);
                        }                   
                    }else{
                        count--;
                        $("#allcheck").prop("checked",false);
                    }
                    
                    totalPrice = getAllTotalPrice();
                    $("#tota").html(totalPrice);
                    pNum = getAllTotalPnum();
                    $("#numcount").html(pNum);
                });
               //总价
               function getAllTotalPrice(){
                    var count = 0;
                    var pid = "";
                    for(let i in $("#cart-shop-list .li_inp input")){
                        if($("#cart-shop-list .li_inp input").eq(i).prop("checked")){
                                pid = $("#cart-shop-list .buysl").eq(i).attr("data-id");
                                count +=  getTotalPrice(pid);
                            }
                    }
                    return count;
                }
               //选中商品数量
               //console.log($("#numcount").html()) ;
               
               function getAllTotalPnum(){
                    var count = 0;
                    var pid = "";
                    for(let i in $("#cart-shop-list .li_inp input")){
                        if($("#cart-shop-list .li_inp input").eq(i).prop("checked")){
                                pid = $("#cart-shop-list .buysl").eq(i).attr("data-id");
                                count +=  getTotalNum(pid);
                                console.log(getTotalNum(pid));
                                console.log(count);
                            }
                    }
                    return count;
                }
                getAllTotalPnum();
            
            }
        });
    }
    function getTotalPrice(pid){
        var tolalPrice = 0;
        if(userStr){
            var user = JSON.parse(userStr);
            $.ajax({
                type: "get",
                url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
                async:false,
                data: {
                    id:user.id,
                },
                dataType: "json",
                success: function (data) {
                    for(let i in data.data){
                        if(data.data[i].pid == pid){
                            tolalPrice =Number(data.data[i].pprice) * Number(data.data[i].pnum);
                            console.log(tolalPrice);
                            
                        }
                    }
                }
            });
            return tolalPrice;
        }  
    }
    function getTotalNum(pid){
        var num = 0;
        if(userStr){
            var user = JSON.parse(userStr);
            $.ajax({
                type: "get",
                url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
                async:false,
                data: {
                    id:user.id,
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    for(let i in data.data){
                        if(data.data[i].pid == pid){
                            console.log(data.data[i].pnum);
                            console.log(Number(data.data[i].pnum))
                            num = Number(data.data[i].pnum);
                        }
                    }
                }
            });
            return num;
        }
    }
    function showList(data){
        var str = "";
        for(let i in data){
            str += `
                <ul class="j-cart-item buyli buylist cartlist clearf" data-id="${data[i].pid}">
                    <li class="li_inp">
                        <div class="j-radio buy_dianhover">
                            <input type="checkbox" name="单选" id="" >
                        </div>
                    </li>
                    <li class="li_sp">
                        <div class="buysp clearf">
                            <a href="./detail.html?id=${data[i].pid}">
                                <img src="${data[i].pimg}" alt="">
                            </a>
                            <div  class="buysp_wen fl">
                                <a href="./detail.html?id=${data[i].pid}"><span>${data[i].pname}</span></a>
                                <div>
                                    <div><span>颜色</span>:<span>色彩</span> </div>
                                    <div><span>尺码</span>:<span>均码</span> </div>
                                </div>
                            </div>
                        </div>
                        
                    </li>
                    <li class="li_dj f14">
                        <span>￥<span>${data[i].pprice}</span>元</span>
                    </li>
                    <li class="li_sl">
                        <div class="buysl" data-id="${data[i].pid}">
                            <a><span class="jian">-</span></a>
                            <input type="text" class="buy_inp cartNum" id="buy_inp" value="${data[i].pnum}" old_value="1">
                            <a><span class="jia">+</span></a>
                        </div>
                    </li>
                    <li class="li_jg">
                        <span class="f14">￥</span>
                        <span class="f14" name="cartFinalPrice">${data[i].pprice*data[i].pnum}</span>
                    </li>
                    <li class="li_zz">
                        <a class="c666 btn-del">删除</a>
                        <a class="c666 j-favor">收藏</a>
                    </li>
                </ul>
            `;

        }
        strHtml = str;
        $("#cart-shop-list").append(str);
    }
    $("#del_cart").click(function(){
        cleanCart();
       
       // window.location.reload();
    });
    //清空购物车
    function cleanCart(){
        if(userStr){
            var user = JSON.parse(userStr);
            $.ajax({
                type: "get",
                url: "http://jx.xuzhixiang.top/ap/api/cart-list.php",
                data: {id : user.id},
                dataType: "json",
                success: function (data) {
                    if(data){
                        for(let i in data.data){
                            $.ajax({
                                type: "get",
                                url: "http://jx.xuzhixiang.top/ap/api/cart-delete.php",
                                data: {
                                        uid:user.id,
                                        pid:data.data[i].pid
                                },
                                dataType: "json",
                                success: function (data) {
                                    console.log(data);
                                    
                                }
                            });
                        }
                        showList({});
                    }
                }
            });
        }
    }
     //window.location.reload();
     //全选
    //  allCheck(obj){
    //     var aCkBtn = document.querySelectorAll("#ck");
        
    //     obj.onclick = ()=>{
    //         for(let i = 0 ; i < aCkBtn.length ; i++){
    //             aCkBtn[i].checked = obj.checked;
    //         }
    //         this.getTotalPrice("SumPrice");
    //     }
    //     for(let i = 0 ; i < aCkBtn.length ; i++){
    //         aCkBtn[i].onclick = ()=>{
    //             var num = 0;
    //             for(let j = 0 ; j < aCkBtn.length ; j++){
    //                 if(aCkBtn[j].checked){
    //                     num++;
    //                 }
    //             }             
    //             if(num == aCkBtn.length){
    //                 obj.checked = true;
    //             }else{
    //                 obj.checked = false;
    //             }
    //             this.getTotalPrice("SumPrice");                  
    //         }           
    //     }
    // }
    var HtmlStr = $("#cart-shop-list");
    //console.log(HtmlStr);
    function allCheck(obj){
        
    }
})