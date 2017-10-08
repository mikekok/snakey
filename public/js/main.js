$(document).ready(function () {
  // Logo Tooltip
  tippy('.logo > img', {
    position: 'right',
    delay: [400, 100],
    distance: 25,
    arrow: true,
    inertia: true
  })
})

// Shorten URL
$('#shorten').submit(function (e) {
  e.preventDefault()
  if (!validateURL($('#url').val())) return
  $('.notification').remove()
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url').val()},
    success: function (data) {
      var newElement = $('<div class="notification"><a id="newLink" title="Click to copy" data-clipboard-target="#newLink">' + data.short_url + '</a></div>').hide()
      $('.container').append(newElement)
      newElement.fadeIn()
      // Tooltip
      tippy('.notification > a', {
        position: 'right',
        size: 'small',
        theme: 'transparent',
        distance: 15,
        arrow: true
      })
      // Clipboard
      new Clipboard('#newLink');
    }
  })
})

// URL Validation
function validateURL (value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)
}