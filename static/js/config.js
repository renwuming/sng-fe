// var baseUrl = "http://localhost:9999";
var baseUrl = "https://api.playmoment.cn/sng/";

function getQuery(key) {
  console.log(key, location.search);
  var result = location.search
    .substr(1)
    .match(new RegExp("(?:^|&)" + key + "=(.+?)(?:$|&)"));
  return result ? result[1] : result;
}
