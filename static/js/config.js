// var baseUrl = 'http://localhost:3000'
var baseUrl = 'https://www.renwuming.cn/sng/'

function getQuery(key) {
  var result = location.search.substr(1).match(new RegExp('(?:^|&)' + key + '=(.+?)(?:$|&)'));
  return result ? result[ 1 ] : result;
}
