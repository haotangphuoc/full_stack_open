interface exerciseResulObj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exerciseHours: Array<number>, target: number): exerciseResulObj => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hour => hour > 0).length
  const success = exerciseHours.map(hour => hour >= target).reduce((prev, curr) => prev && curr, true);
  
  if(periodLength - trainingDays <= 1) {
    var rating = 3;
    var ratingDescription = "Great job!";
  }
  else if(periodLength - trainingDays <= 3) {
    var rating = 2;
    var ratingDescription = "not too bad but could be better!";
  }
  else {
    var rating = 1;
    var ratingDescription = "Try harder!";
  }
    
  const average = exerciseHours.reduce((prev, curr) => prev + curr, 0)/ periodLength;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}


const exerciseHours = process.argv.slice(5).map(hour => Number(hour));
const target = Number(process.argv[4]);
console.log(calculateExercises(exerciseHours, target));