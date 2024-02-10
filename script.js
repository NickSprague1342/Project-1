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