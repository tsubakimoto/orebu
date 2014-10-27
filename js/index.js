$(function() {
  
  function getDate(d, addDay) {
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() + addDay;
    if (month < 10) { month = "0" + month; }
    if (day < 10) { day = "0" + day; }
    return year + "-" + month + "-" + day;
  }
  
  $('#date').val(getDate(new Date(), 0));
  
  $('#search').click(function() { loadFeed(); });
  
  loadFeed();
  
  function loadFeed() {
    clearBookmark();

    var d = getDate(new Date($('#date').val()), 0).replace(/-/g,"");
    var url = 'http://b.hatena.ne.jp/tech-tsubaki/rss?of=50&date=' + d;

    $('#feed').rssfeed(url, {
      limit: 30,
      header: false,
      titletag: 'h3 class="title"',
      dateformat: 'date',
      snippet: false,
      linktarget: '_blank',
      sort: 'date',
      sortasc: false
    }, function() {
      showBookmark($('#date').val());
    });
  }
  
  function clearBookmark() {
    $('#myfeed').empty();
  }
  
  function showBookmark(date) {
    var rssRows = $('#feed .rssRow');
    var s = '### <time>' + date + '</time> のブックマーク\n'
          + '\n'
          + '| タイトル | ブクマ数 | タグ |\n'
          + '| --- | --- | --- |\n';
      
    for (var i = 0; i < rssRows.length; i++) {
      var title = $(rssRows[i]).find('.title').find('a').removeAttr('title').end().html();
      var bookmark = $(rssRows[i]).find('blockquote > p:last').html();// > a:first').html();
      var tags = $(rssRows[i]).find('a[rel="tag"]');
      var tag = '';
      for(var j=0;j<tags.length;j++){
        var t = $(tags[j]).removeAttr('rel').get(0).outerHTML;
        if (tag == '') {
          tag = t;
        } else {
          tag = tag + ', ' + t;
        }
      }
      
      s = s + '| ' + title + ' | ' + bookmark + ' | ' + tag + '\n';
    }

    var val = $('#myfeed').val();
    if (val === '') {
      val = s;
    } else {
      val = '\n' + s;
    }
    $('#myfeed').val(val);
  }
});
