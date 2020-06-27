$(function(){
    //console.log($("#login_userName_sapn"));
        // $.ajax({
        //     type: "get",
        //     url: "http://jx.xuzhixiang.top/ap/api/reg.php",
        //     data: {
        //         username:"lucky",
        //         password:"3127183211",
        //     },
        //     dataType: "json",
        //     success: function (data) {
        //         console.log(data);
        //     }
        // });
    
    $("#login_button").click(function () { 
        let userName = $("#u").val();
        let passWord = $("#p").val();
        $.ajax({
            type: "get",
            url: "http://jx.xuzhixiang.top/ap/api/login.php",
            dataType: "json",
            data:{
                username:userName,
                password:passWord,
            },
            success: function (data) {
                console.log(data.data);
                 if(data.code == 1){
                     var user = JSON.stringify(data.data);
                     location.href = "index.html";
                     localStorage.setItem("user",user);
                 }else{
                     alert("登陆失败，请重新登录");
                 }
            }
        });
    });
    $("#uni_del").click(function(){  
        $("#u").val("");
    })
    
})