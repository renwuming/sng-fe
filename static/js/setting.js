var levelList = [];

var $sb = $("#smallBlind");
var $ante = $("#ante");
var $name = $("#name");
var $timePicker = $("#timePicker");
var $sumTime = $("#sumTime");
var $blindList = $("#blindList");
// 初始化SUI
$.init();

$("#addLevel").on("click", function () {
  var sb = +$sb.val();
  if (isNaN(sb) || !sb) {
    $.toast("小盲不能为空");
    return;
  }
  var bb = 2 * sb;
  var ante = $ante.val() || 0;
  levelList.push({
    sb: sb,
    bb: bb,
    ante: ante,
  });

  handleLevelList();
  $sb.val("");
  $ante.val("");
});

function handleLevelList() {
  var html =
    '<li><div class="item-content"><div class="item-media"><i class="icon icon-form-name"></i></div><div class="item-inner"><div class="item-title">级别</div><div class="item-after">小盲</div><div class="item-after">大盲</div><div class="item-after">ante</div><div class="item-after" style="visibility:hidden;">操作</div></div></div></li>';
  for (var i = 0, L = levelList.length; i < L; i++) {
    var level = levelList[i];
    html +=
      '<li><div class="item-content"><div class="item-media"><i class="icon icon-form-name"></i></div><div class="item-inner">' +
      '<div class="item-title">' +
      (i + 1) +
      "</div>" +
      '<div class="item-after">' +
      level.sb +
      "</div>" +
      '<div class="item-after">' +
      level.bb +
      "</div>" +
      '<div class="item-after">' +
      level.ante +
      "</div>" +
      '<div class="item-after"><svg index="' +
      i +
      '" t="1562229819452" class="icon delete-level" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4386" width="25" height="25"><path d="M512 64.021106c-247.405763 0-447.978894 200.572108-447.978894 447.978894s200.572108 447.978894 447.978894 447.978894S959.977871 759.405763 959.977871 512 759.405763 64.021106 512 64.021106z m223.987401 478.152101H288.008506c-17.671475 0-31.997762-14.326287-31.998785-31.998785 0.001023-17.673521 14.326287-31.998785 31.999809-31.999808h447.978894c17.671475 0 31.997762 14.326287 31.998785 31.998784-0.002047 17.673521-14.326287 31.997762-31.999808 31.999809z" p-id="4387" fill="#d81e06"></path></svg></div></div></div></li>';
  }
  $blindList.html(html);
  handleSumTime();
}

function handleSumTime() {
  var blindTime = +$timePicker.val();
  var sumTime = levelList.length * blindTime;
  $sumTime.html(sumTime);
}

$timePicker.picker({
  toolbarTemplate:
    '<header class="bar bar-nav">\
  <h1 class="title">单位（分钟）</h1>\
  <button class="button button-link pull-right close-picker">确定</button>\
  </header>',
  cols: [
    {
      textAlign: "center",
      values: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
    },
  ],
});

$timePicker.on("change", function () {
  handleSumTime();
});

$blindList.on("click", ".delete-level", function (e) {
  var index = $(e.currentTarget).attr("index");
  levelList.splice(index, 1);
  handleLevelList();
});

$("#create").on("click", function () {
  var name = $name.val();
  var blindTime = $timePicker.val();
  if (!name) {
    $.toast("比赛名称不能为空");
    return;
  }
  if (!blindTime) {
    $.toast("升盲时间不能为空");
    return;
  }
  if (levelList.length <= 0) {
    $.toast("盲注级别不能为空");
    return;
  }
  // 创建比赛
  $.ajax({
    url: baseUrl + "/game",
    data: JSON.stringify({
      name: name,
      blindTime: blindTime,
      levelList: levelList,
    }),
    contentType: "application/json",
    type: "POST",
    dataType: "json",
    success: function (res) {
      if (res.id) {
        window.location = "./index?id=" + res.id;
      }
    },
  });
});

$("#temp1").on("click", function () {
  $name.val(`德州俱乐部-${new Date().toLocaleDateString()}`);
  $timePicker.val(30);

  levelList = [
    {
      sb: 100,
      bb: 200,
      ante: 0,
    },
    {
      sb: 200,
      bb: 400,
      ante: 0,
    },
    {
      sb: 400,
      bb: 800,
      ante: 0,
    },
    {
      sb: 800,
      bb: 1500,
      ante: 0,
    },
    {
      sb: 1500,
      bb: 3000,
      ante: 0,
    },
    {
      sb: 2500,
      bb: 5000,
      ante: 0,
    },
    {
      sb: 5000,
      bb: 10000,
      ante: 0,
    },
    {
      sb: 10000,
      bb: 20000,
      ante: 0,
    },
    {
      sb: 20000,
      bb: 40000,
      ante: 0,
    },
    {
      sb: 40000,
      bb: 80000,
      ante: 0,
    },
  ];

  handleLevelList();
  $sb.val("");
  $ante.val("");
});
