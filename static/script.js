$(document).ready(function(){
  /* shutdown server on page unload
  $('#shutdown').click(function() {
    $.get("/shutdown", function(data) {
      console.log("shutdown")
    });
  });*/

  // show the modal on load
  $(".modal").modal('show');

  // focus the textarea when the modal is opened
  $('.modal').on('shown.bs.modal',function() {
    $('textarea#input').focus();
  });

  // process input latin text
  $("#cislate").click(function() {

    // process the input text into displayable html
    const latin = $("textarea").val();
    let processedLatin = '';
    latin.match(/\S+|\s/).forEach(function(e) {
      if (e === '\n') processedLatin += '<br>';
      else processedLatin += '<span>'+e+'</span>\n';
    });
    // display the input latin text
    $("#latin").html(processedLatin);

    // delete the latin from the textarea
    $('textarea#input').val("");

    // show the instructions
    $("#instructions").show();

    // add onclick translation
    $("span").click(function() {

      // show spinner until ajax request returns
      $("pre").html(`<div id="spinner" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
      </div>`);

      $.post("/translate",
      {latin: $(this).text()},
      function(data) {
        $("pre").text(data);
      });
    });
  });
});

/*
$(document).ready(function() {
// shutdown server on page unload
$('#shutdown').click(function() {
$.get("/shutdown", function(data) {
console.log("shutdown")
});
});

// show the modal on load
$(".modal").modal('show');

// focus the textarea when the modal is opened
$('.modal').on('shown.bs.modal',function() {
$('textarea#input').focus();
});

// process input latin text
$("#cislate").click(function() {

// process the input text into displayable html
const latin = $("textarea").val();
let processedLatin = '';
latin.match(/\S+|\n/).forEach(function(e) {
if (e === '\n') processedLatin += '<br>';
else processedLatin += '<span>'+e+'</span>\n';
});
// display the input latin text
$("#latin").html(processedLatin);

// delete the latin from the textarea
$('textarea').val("");

// show the instructions
$("#instructions").show();

// add onclick translation
$("span").click(function() {

// show spinner until ajax request returns
$("pre").html(`<div id="spinner" class="spinner-border text-primary" role="status">
<span class="sr-only">Loading...</span>
</div>`);

$.post('')

const cors = 'https://cors-anywhere.herokuapp.com/'
const william = 'http://archives.nd.edu/'
const whitakers = 'cgi-bin/wordz.pl?keyword='
const words = $(this).text()
const url = cors + william + whitakers + words;
headers = {
'Host': 'archives.nd.edu',
'Connection': 'keep-alive',
'Cache-Control': 'max-age=0',
'Upgrade-Insecure-Requests': '1',
'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,**;q=0.8,application/signed-exchange;v=b3',
'Referer': 'http://archives.nd.edu/words.html',
'Accept-Encoding': 'gzip, deflate',
'Accept-Language': 'en-US,en;q=0.9,la;q=0.8,lv;q=0.7',
};
fetch(url, {
method: 'GET',
//mode: 'no-cors',
//credentials: 'omit',
headers: headers
}).then(function(response) {
console.log(response.body)
$('pre').text(response.body);
}).catch(function() {
$('pre').text('Translation error, check your connection');
});
});
});
});

*/
