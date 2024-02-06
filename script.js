function getExercisesByMuscle(muscle) {
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
        headers: { 'X-Api-Key': 'guqAOiCrO5L+hFVjBvZTVA==AocKB4f99pbwFKgB'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
}
// Arms
getExercisesByMuscle('biceps');
getExercisesByMuscle('forearms');
getExercisesByMuscle('triceps');

// Legs
getExercisesByMuscle('calves');
getExercisesByMuscle('glutes');
getExercisesByMuscle('hamstrings');
getExercisesByMuscle('abductors');
getExercisesByMuscle('adductors');
getExercisesByMuscle('quadriceps');

// Back
getExercisesByMuscle('lats');
getExercisesByMuscle('traps');
getExercisesByMuscle('neck');
getExercisesByMuscle('middle_back');
getExercisesByMuscle('lower_back');

// Shoulders

// Chest
getExercisesByMuscle('chest'); 