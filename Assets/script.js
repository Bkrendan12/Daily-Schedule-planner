var submitBtn = $(".saveBtn");
var time = $(".time-block");
var textInputEl = $(".col-sm-10 description");
var currentHours = moment().hours(); //current hour in military standard

// timer function displaying the in time clock at top of page
function timer() {
  var rightNow = moment().format("MMM DD, YYYY [at] hh:mm:ss a");
  $("#currentDay").text(rightNow);
}

setInterval(timer, 1000);

time.each(function (index, element) {
  var elementTime = Number(element.id);

  // elementTime gives you all the timeblocks as numbers not strings
  // element is the time block div and element.id is grabbing the only id in the
  // div that has an ID which in our case is the timeblock div with our content.

  if (elementTime === currentHours) {
    // if the time block time is equal to the current hour, then style the block with the .present class (red)
    $(element).children(".description").addClass("present");
  } else if (elementTime > currentHours) {
    //if the time block given time (1:00pm for example) is higher than the current hour (10:00am for example), style with .future class (green)
    $(element).children(".description").addClass("future");
  } else {
    // if the time block given time (12:00pm for example) is less than current hour (2:00pm for example), style with .past (gray)
    $(element).children(".description").addClass("past");
  }

  // element is our timeblock div with the ID, first is the hour class that displays the set timeblock hour (10:00am for example) and we are setting the variable hour to the text from it, so if 10:00AM is the text, thats what the hour variable is set to
  var hour = $(element).first().text().trim();

  // because hour is set to text, we dont need to stringify it so we will be able to 'get-item' as the the key in local storage without any other action required
  var description = localStorage.getItem(hour);

  if (description) {
    $(element).children(".description").val(description);
  }
});

submitBtn.on("click", function (event) {
  var description = $(event.currentTarget)
    .parent()
    .children(".description")
    .val();

  var hour = $(event.currentTarget).parent().first().text().trim();

  localStorage.setItem(hour, description);
});
