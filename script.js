
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

    for (var hour = options.startHour; hour <= options.endHour; hour++) {

        // load the task from local storage
        var savedTask = localStorage.getItem(hour);

        var timeSlot = $('<div>').addClass('row time-block');
        timeSlot.attr('data-hour', hour);

        var hourSlot = $('<div>').addClass('col-sm-2 hour').text(moment(hour, 'h').format('h A'));
        var description = $('<div>').addClass('col-sm-8 row');
        var textArea = $('<textarea>').addClass('col-md-12 description');
        textArea.val(savedTask);

        var saveContainer = $('<div>').addClass('saveBtn d-flex justify-content-center align-items-center col-1');
        saveContainer.on('click', onSaveTask);
        var saveButton = $('<i>').addClass('fas fa-save');


        timeSlot.append(hourSlot);
        timeSlot.append(description);
        description.append(textArea);
        timeSlot.append(saveContainer);
        saveContainer.append(saveButton);

        $('.container').append(timeSlot);
    }
    /*
    <div class="row">
        <div class="col-sm-2 hour">9AM</div>
        <div class="col-sm-8 row past">
            <textarea class="col-md-10 description"></textarea>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-primary saveBtn">Save</button>
        </div>
    </div>
    */
}

function init() {

    // Load in tjhe timeslots
    generateTimeslots();

    // Update the timeslot's backgroud colours based ont he time of day
    updateTimeslots();

    // Set the current day
    var currentDay = moment().format('dddd MMMM Do YYYY, h:mm:ss a');
    $('#currentDay').text(currentDay);

    // Set up the Time Poller
    setInterval(function () {

        updateTimeslots();

    }, 10000);
}

init();