$(document).ready(async () => {

  // show the modal on load
  $(".modal").modal('show');

  // focus the textarea when the modal is opened
  $('.modal').on('shown.bs.modal',function() {
    $('textarea#input').focus();
  });

  // process input latin text
  $("#cislate").click(async () => {

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
    $('textarea#input').val('');

    // delete any translations from the translation textarea
    $("pre").html('');

    // show the instructions
    $("#instructions").show();

    // add onclick translation
    $("span#word").click(async (event) => {

      // show spinner until ajax request returns
      $("pre").html(`<div id="spinner" class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
      </div>`);

      // post translation request to CherryPy proxy server
      const url = 'https://nqhfwgv4ib.execute-api.us-east-2.amazonaws.com/default/cislate?latin=' + $(event.target).text();
      const data = await fetch(url, {
        method: 'GET',
        headers: {
          'x-api-key': 'zDy6OMHcqi89AYF4J0kXO8bbxOzCUXb5afeHAkNs',
          'Content-Type': 'text/html'
        }
      });
      console.log(data);
      const translation = await data.text();
      $("pre").text(translation);
    });
  });
});
