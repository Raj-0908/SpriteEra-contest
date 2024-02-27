window.onload = function() {
    var startTime = new Date().getTime();
    var timerDisplay = document.getElementById("timer");
    var totalRightAnswers = 0;
    var totalWrongAnswers = 0;
    var quizForm = document.getElementById("quiz-form");

    // Function to update the timer display
    function updateTimer() {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - startTime) / 1000; // Time elapsed in seconds

        var minutes = Math.floor(elapsedTime / 60);
        var seconds = Math.floor(elapsedTime % 60);

        // Display the time in MM:SS format
        timerDisplay.textContent = (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        // Check if 5 minutes (300 seconds) have passed
        if (elapsedTime >= 300) {
            // Auto-submit the form
            quizForm.submit();
        }
    }

    // Update the timer display every second
    setInterval(updateTimer, 1000);

    // Event listener for form submission
    quizForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var endTime = new Date().getTime();
        var timeTaken = (endTime - startTime) / 1000; // Time taken in seconds

        // Convert time taken to minutes and seconds
        var minutes = Math.floor(timeTaken / 60);
        var seconds = Math.floor(timeTaken % 60);

        // Construct the URL with time taken in minutes and seconds
        var url = this.action + "?time=" + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        // Get selected options
        var selectedOptions = [];
        var questionInputs = document.querySelectorAll('input[type="radio"]:checked');
        questionInputs.forEach(function(input) {
            selectedOptions.push(input.name + "=" + input.value);
        });

        // Count right and wrong answers
        questionInputs.forEach(function(input) {
            var parentLi = input.closest('li');
            var correctAnswer = parentLi.querySelector('input[type="radio"][value="A"]');
            if (input.value === "A" && input.checked) {
                totalRightAnswers++;
            } else if (input.checked && input !== correctAnswer) {
                totalWrongAnswers++;
            }
        });

        // Append selected options to the URL
        if (selectedOptions.length > 0) {
            url += "&" + selectedOptions.join("&");
        }

        // Add total right and wrong answers to URL parameters
        url += "&totalRightAnswers=" + totalRightAnswers + "&totalWrongAnswers=" + totalWrongAnswers;

        // Redirect to result page
        window.location.href = url;
    });
};
