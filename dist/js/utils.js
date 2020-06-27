function getParams(key) {
    var result = {};
    var str = window.location.search;
    if (str.startsWith("?")) {
      var strParams = str.split("?")[1];
      var arrParams = strParams.split("&");
      arrParams.forEach((item) => {
        var temKey = item.split("=")[0];
        var temVal = item.split("=")[1];
        result[temKey] = temVal;
      });
    }
    return result[key];
}