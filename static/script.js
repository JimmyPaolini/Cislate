$(document).ready(function(){

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
    latin.split(/\s/).forEach(function(e) {
      if (e === '\n') processedLatin += '<br>';
      else processedLatin += "<span id='word'>"+e+"</span>\n";
    });
    // display the input latin text
    $("#latin").html(processedLatin);

    // delete the latin from the textarea
    $('textarea#input').val("");

    // show the instructions
    $("#instructions").show();

    // add onclick translation
    $("span#word").click(function() {

      // show spinner until ajax request returns
      $("pre").html(`<div id="spinner" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
      </div>`);

      // post translation request to CherryPy proxy server
      $.post("/translate",
      {latin: $(this).text()},
      function(data) {
        $("pre").text(data);
      });
    });
  });
});
