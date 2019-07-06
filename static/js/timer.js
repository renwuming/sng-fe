var startBtn = document.querySelector("#startBtn")
var openInfo = document.querySelector("#infoBtn")
var closeInfo = document.querySelector("#closeInfo")
var infoPopup = $('#infoPopup')
var $timer = $('#timer')
var music = $('#music').get(0)
var Timer

var id = getQuery('id')

var seconds

// 初始化SUI
$.init()
initData()

// 点击开始btn
startBtn.addEventListener("click", function () {
  $.ajax({
    url: baseUrl + '/game/' + id + '/start',
    type: "POST",
    dataType: 'json',
    success: function (res) {
      if (res.code) {
      } else {
        startTimer()
        startBtn.style.visibility = "hidden"
      }
    },
  })
})

function startTimer() {
  clearInterval(Timer)
  Timer = setInterval(function () {
    seconds--
    handleTimer()
  }, 1000)
}
// 点击详情btn
openInfo.addEventListener("click", function () {
  $.popup('#infoPopup')
  // 请求数据
  initData()
  permitMusic()
})
// 关闭详情
infoPopup.on("click", function () {
  $.closeModal()
})

// 移动端播放音频兼容
$('body').one('touchstart', function (e) {
  e.preventDefault()
  permitMusic()
});

function permitMusic() {
  music.play().then(function () {
    music.pause()
  }).catch(function () {
    music.play()
    music.pause()
  })
}


function handleTimer() {
  if (seconds < 0) {
    seconds = 0
    // 播放铃声
    music.play().catch(function () {
      music.play()
    })
    // 请求数据
    initData()
  }
  var hour = Math.floor(seconds / 60 / 60)
  var minutes = Math.floor(seconds / 60)
  var second = seconds % 60
  var minute = minutes % 60
  if (seconds < 60) {
    $timer.addClass('danger')
  } else {
    $timer.removeClass('danger')
  }
  document.querySelector('#hour').innerHTML = handleDoubleStr(hour)
  document.querySelector('#minute').innerHTML = handleDoubleStr(minute)
  document.querySelector('#second').innerHTML = handleDoubleStr(second)
}
function handleDoubleStr(num) {
  if (num < 10) {
    return '0' + num
  }
  return num
}



// 初始化数据
function initData() {
  $.ajax({
    url: baseUrl + '/game/' + id,
    type: "GET",
    dataType: 'json',
    success: function (res) {
      // 先展示时间
      if (res.end) {
        seconds = 0
        handleTimer()
        clearInterval(Timer)
      } else {
        seconds = res.lastTime
        handleTimer()
        if (!res.start) {
          startBtn.style.visibility = 'visible'
        } else {
          startTimer()
        }
      }
      handleData(res)
    },
  })
}

function handleData(data) {
  var currentIndex = data.currentLevel
  var currentLevel = data.levelList[ data.currentLevel ]
  if (!currentLevel) {
    currentIndex = data.levelList.length - 1
    currentLevel = data.levelList[ data.levelList.length - 1 ]
  }
  $('#curSB').html(currentLevel.sb)
  $('#curBB').html(currentLevel.bb)
  if (currentLevel.ante) {
    $('#curAnteWrapper').show()
    $('#curAnte').html(currentLevel.ante)
  } else {
    $('#curAnteWrapper').hide()
  }
  var nextLevel = data.levelList[ data.currentLevel + 1 ]
  if (nextLevel) {
    $('.next-level').get(0).style.display = 'flex'
    $('#nextSB').html(nextLevel.sb)
    $('#nextBB').html(nextLevel.bb)
    if (nextLevel.ante) {
      $('#nextAnteWrapper').show()
      $('#nextAnte').html(nextLevel.ante)
    } else {
      $('#nextAnteWrapper').hide()
    }
  } else {
    $('.next-level').hide()
  }
  // 详情部分
  $('#name').html(data.name)
  $('#blindTime').html(data.blindTime + '分钟')
  $('#sumTime').html(data.sumTime + '分钟')
  handleLevelList(data.levelList, currentIndex)
}


function handleLevelList(list, current) {
  var html = '<li><div class="item-content"><div class="item-media"><i class="icon icon-form-name"></i></div><div class="item-inner"><div class="item-title">级别</div><div class="item-after">小盲</div><div class="item-after">大盲</div><div class="item-after">ante</div></div></div></li>'
  for (var i = 0, L = list.length; i < L; i++) {
    var level = list[ i ]
    var className = i === current ? 'current' : ''
    html += '<li class="' + className + '"><div class="item-content"><div class="item-media"><i class="icon icon-form-name"></i></div><div class="item-inner">' +
      '<div class="item-title">' + (i + 1) + '</div>' +
      '<div class="item-after">' + level.sb + '</div>' +
      '<div class="item-after">' + level.bb + '</div>' +
      '<div class="item-after">' + level.ante + '</div>' +
      '</div></div></li>'
  }
  $('#blindList').html(html)
}
