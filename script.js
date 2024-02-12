// Placeholder for the API key
const EXERCISE_DB_API_KEY = 'c9de07b8dcmsh74e6f8113b3952cp195de0jsn717baea31d4f';
let apiRes;

// Function to get exercises by body part from ExerciseDB API
async function getExercisesByBodyPart(bodyPart) {
    try {
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': EXERCISE_DB_API_KEY,
                'X-RapidAPI-Host': "exercisedb.p.rapidapi.com"
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch exercises by body part');
        }
        const data = await response.json();
        apiRes = data;
        console.log(apiRes)
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch exercises by body part');
    }
}

// Function to shuffle array elements (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Function to randomly select a subset of exercises
function selectRandomExercises(exercises, count = 6) {
    shuffleArray(exercises); // Shuffle the array first
    return exercises.slice(0, count); // Then slice it to get the first 'count' elements
}

// Function to handle clicking on body part buttons and display exercises
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function (event) {
            const bodyPart = this.getAttribute('data-href').substring(1);
            loadExercises(bodyPart);
        });
    });
});

async function loadExercises(bodyPart) {
    try {
        const exercises = await getExercisesByBodyPart(bodyPart);
        const selectedExercises = selectRandomExercises(exercises); // Get a random subset of exercises
        displayExercises(selectedExercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
}

// Display a random subset of exercises and their gifs, and instructions
function displayExercises(exercises) {
    const container = document.getElementById('exerciseList');
    container.innerHTML = ''; // Clear existing content
    exercises.forEach(exercise => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.classList.add('exercise-item');

        const nameElement = document.createElement('h4');
        nameElement.innerText = exercise.name;
        exerciseDiv.appendChild(nameElement);

        if (exercise.gifUrl) {
            const img = document.createElement('img');
            img.src = exercise.gifUrl;
            img.alt = "Exercise Animation";
            exerciseDiv.appendChild(img);
        }

        if (exercise.instructions) {
            const instructionElement = document.createElement('p');
            instructionElement.innerText = exercise.instructions;
            exerciseDiv.appendChild(instructionElement);
        }

        container.appendChild(exerciseDiv);
    });
}

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