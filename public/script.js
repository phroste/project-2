$(function() {
  $("#submit").on("click", function(event) {
    //when the submit button is clicked, grab the value from inside the text field
    var input = document.querySelector("#movie-title").value;
    //pass in the variable 'input' to the makeCall function
    makeCall(input);
  });

  //make an ajax call on the url
  //the parameter 'movietitle' being passed into the makeCall function is the same as 'input' on line 6
  function makeCall(movietitle) {
    $.ajax(
      //pass in the parameter movietitle as a string literal
      `http://www.omdbapi.com/?t=${movietitle}&apikey=a28799f5`,
      // `http://www.omdbapi.com/?t=${movietitle}&apikey=process.env.MY_API_KEY`,

      {
        success: function(responseData) {
          console.log(responseData);
          //invoke the getresponseData function below with 'responseData' passed in as parameter. performs a get request to retrieve responseData
          getresponseData(responseData);
        }
      }
    );
  }

  //retrieve the following responseData and store inside variables
  //the parameter 'responseData' is the same as 'responseData' being passed from line 18, just renamed for our sake
  function getresponseData(responseData) {
    var title = responseData.Title;
    var year = responseData.Year;
    var imdb = responseData.Ratings[0]["Value"];
    // var rottenTomatoes = responseData.Ratings[1]["Value"];
    var anticipation = responseData.Metascore;
    var poster = responseData.Poster;
    console.log(poster);
    //pass the variables in as parameters in the appendToDom function and invoke it
    appendToDom(title, year, imdb, anticipation, poster);
  }

  function appendToDom(title, year, imdb, anticipation, poster) {
    var $hiddenInput1 = $("<input>").attr({
      type: "hidden",
      value: title,
      name: "title"
    });

    var $hiddenInput2 = $("<input>").attr({
      type: "hidden",
      value: year,
      name: "year"
    });

    var $hiddenInput3 = $("<input>").attr({
      type: "hidden",
      value: imdb,
      name: "imdb"
    });

    var $hiddenInput4 = $("<input>").attr({
      type: "hidden",
      value: anticipation,
      name: "anticipation"
    });

    var $hiddenInput5 = $("<input>").attr({
      type: "hidden",
      value: poster,
      name: "poster"
    });

    var $title = $("<div/>", { text: `Title: ${title}` });
    var $year = $("<div/>", {
      text: `Year: ${year}`
    });
    var $imdb = $("<div/>", {
      text: `IMDB: ${imdb}`
    });
    var $anticipation = $("<div/>", {
      text: `Anticipation: ${anticipation}`
    });
    var $poster = $("<img/>", {
      id: "poster",
      src: `${poster}`
    });

    $("#movie-data").append($title, $year, $imdb, $anticipation, $poster);
    $("#result").append(
      $hiddenInput1,
      $hiddenInput2,
      $hiddenInput3,
      $hiddenInput4,
      $hiddenInput5
    );
  }

  function removePrevSearch() {
    $("#new-search").on("click", function() {
      location.reload();
    });
  }
  removePrevSearch();
}); // ends doc.ready
