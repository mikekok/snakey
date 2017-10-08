// Logo Tooltip
tippy('.logo > img', {
  position: 'right',
  delay: [400, 100],
  distance: 25,
  arrow: true,
  inertia: true
})

// Shorten URL
$('#shorten').submit(function (e) {
  e.preventDefault()
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