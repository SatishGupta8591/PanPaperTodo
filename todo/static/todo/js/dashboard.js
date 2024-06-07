document.addEventListener('DOMContentLoaded', function() {
    var datePicker = document.getElementById('datePicker');
    var nextDayButton = document.getElementById('nextDayButton');
    var prevDayButton = document.getElementById('prevDayButton');
    
    // Function to update the URL with the selected date
    function updateUrl(date) {
        var formattedDate = formatDate(date);
        var url = new URL(window.location.href);
        url.searchParams.set('task_date', formattedDate);
        window.location.href = url.toString();
    }

    // Function to format the date as YYYY-MM-DD
    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
        var day = date.getDate().toString().padStart(2, '0');
        return year + '-' + month + '-' + day;
    }

    // Function to handle click on the "Next Day" button
    nextDayButton.addEventListener('click', function() {
        var selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate.getTime())) {
            selectedDate = new Date(); // Fallback to current date if selected date is invalid
        }
        selectedDate.setDate(selectedDate.getDate() + 1); // Increment date by 1 day
        updateUrl(selectedDate);
    });

    // Function to handle click on the "Previous Day" button
    prevDayButton.addEventListener('click', function() {
        var selectedDate = new Date(datePicker.value);
        if (isNaN(selectedDate.getTime())) {
            selectedDate = new Date(); // Fallback to current date if selected date is invalid
        }
        selectedDate.setDate(selectedDate.getDate() - 1); // Decrement date by 1 day
        updateUrl(selectedDate);
    });

    // Function to handle change in the date picker
    datePicker.addEventListener('change', function() {
        var selectedDate = new Date(this.value);
        if (isNaN(selectedDate.getTime())) {
            selectedDate = new Date(); // Fallback to current date if selected date is invalid
        }
        updateUrl(selectedDate);
    });

    // Extract current date from URL and set it in the date picker when page loads
    var urlParams = new URLSearchParams(window.location.search);
    var taskDate = urlParams.get('task_date');
    if (taskDate) {
        datePicker.value = taskDate;
    }
});

document.getElementById('datePicker').addEventListener('change', function() {
    window.location.href = '?task_date=' + this.value;
});

