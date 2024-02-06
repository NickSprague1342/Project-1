// Placeholder for API keys
const EXERCISE_DB_API_KEY = 'c9de07b8dcmsh74e6f8113b3952cp195de0jsn717baea31d4f';
let apiRes;

// Function to get exercises by body part from ExerciseDB API
async function getExercisesByBodyPart(bodyPart) {
    try {
        const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=10`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': EXERCISE_DB_API_KEY, // 
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
};

// Function to handle clicking on body part buttons and display exercises
document.addEventListener('DOMContentLoaded', () => {
    // Target all workout buttons
    document.querySelectorAll('.button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            const bodyPart = this.getAttribute('href').substring(1); 
            loadExercises(bodyPart);
        });
    });
});

async function loadExercises(bodyPart) {
    try {
        const exercises = await getExercisesByBodyPart(bodyPart);
        displayExercises(exercises);
    } catch (error) {
        console.error('Error fetching exercises:', error);
    }
}
//Display exercises
function displayExercises(exercises) {
    const container = document.getElementById('exerciseList');
    container.innerHTML = ''; 
    exercises.forEach(exercise => {
        const element = document.createElement('div');
        element.innerText = exercise.name; 
        container.appendChild(element);
    });
}
