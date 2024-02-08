// Body Mass Index API Fuction
$(document).ready(function() {
    $('#calculate-bmi-button').click(function() {
        var heightFeet = parseInt($('#height-feet-input').val());
        var heightInches = parseInt($('#height-inches-input').val());
        var weightPounds = parseFloat($('#weight-pounds-input').val());

        // Convert height to inches
        var heightInInches = heightFeet * 12 + heightInches;

        // Check if height and weight are valid
        if (isNaN(heightInInches) || isNaN(weightPounds) || heightInInches <= 0 || weightPounds <= 0) {
            $('#bmi-results').html('Please enter valid height and weight values.');
            return;
        }

        // Calculate BMI
        var bmi = (weightPounds / (heightInInches * heightInInches)) * 703;

        // Display BMI
        $('#bmi-results').html('Your BMI is: ' + bmi.toFixed(2));

        // Display BMI category
        var bmiCategory = getBmiCategory(bmi);
        $('#bmi-category').html('BMI Category: ' + bmiCategory);
    });

    $('#arms-button, #legs-button, #back-button, #chest-button').click(function() {
        var muscle = $(this).data('muscle');
        getExercisesByMuscle(muscle, muscle + '-results');
    });
});

function getBmiCategory(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal weight';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obesity';
    }
}

function getExercisesByMuscle(muscle, containerId) {
    var sex = $('#sex-select').val(); // Get the selected sex value
    $.ajax({
        method: 'GET',
        url: 'https://zylalabs.com/api/428/fitness+calculator+api/328/get+body+mass+index?us_ftin_lbs=' + $('#height-feet-input').val() + ',' + $('#height-inches-input').val() + ',' + $('#weight-pounds-input').val() + '&sex=' + sex, // Include sex parameter in the URL
        headers: { 'x-rapidapi-key': '3430|vxEC1gdwhsRpP3Z9AL87eCvxzJY8chtaYMIOWTYX' },
        success: function(result) {
            console.log(result); // Log the API response to check data
            $('#bmi-results').html('BMI: ' + result.bmi.toFixed(2));
            var bmiCategory = getBmiCategory(result.bmi);
            $('#bmi-category').html('BMI Category: ' + bmiCategory);
        },
        error: function(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            $('#bmi-results').html('Error fetching BMI data. Please try again later.');
        }
    });
}
// End of BMI Fucntion 

