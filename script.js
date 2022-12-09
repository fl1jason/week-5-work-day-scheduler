
var options = {
    startHour: 9,
    endHour: 17,
}

function updateTimeslots() {

    var currentHour = moment().hour();

    $('.time-block').each(function (index, element) {

        var hour = $(element).attr('data-hour');

        if (hour < currentHour) {
            $(element).find('.description').addClass('past');
        }
        else if (hour == currentHour) {
            $(element).find('.description').addClass('present');
        }
        else {
            $(element).find('.description').addClass('future');
        }
    });
}

function onSaveTask(e) {

    var hour = $(e.target).parent().parent().attr('data-hour');
    var task = $(e.target).parent().prev().children().val();

    localStorage.setItem(hour, task);

    console.log('saved')
}

function generateTimeslots() {

    for (hour = options.startHour; hour <= options.endHour; hour++) {

        // load the task from local storage
        var savedTask = localStorage.getItem(hour) || '';
        var html = `<div class="row" data-hour="${hour}">
            <div class="col-sm-2 hour">${hour}</div>
            <div class="col-sm-8 row past">
                <textarea class="col-md-10 description">${savedTask}</textarea>
            </div>
            <div class="col-sm-2">
                <button class="btn btn-primary saveBtn">Save</button>
            </div>
        </div>
    `
        $('.container').append(html);
    }
}

function init() {

    // Load in tjhe timeslots
    generateTimeslots();

    // Update the timeslot's backgroud colours based ont he time of day
    updateTimeslots();

    // Set up the save button
    $('.saveBtn').on('click', onSaveTask);

    // Set the current day
    var currentDay = moment().format('dddd MMMM Do YYYY, h:mm:ss a');
    $('#currentDay').text(currentDay);

    // Set up the Time Poller
    setInterval(function () {

        updateTimeslots();

    }, 10000);
}

init();