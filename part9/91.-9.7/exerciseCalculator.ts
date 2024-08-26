interface exerciseResulObj {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (exerciseHours: Array<number>, target: number): exerciseResulObj => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(hour => hour > 0).length;
  const success = exerciseHours.map(hour => hour >= target).reduce((prev, curr) => prev && curr, true);
  let rating = 0;
  let ratingDescription = '';

  if(periodLength - trainingDays <= 1) {
    rating = 3;
    ratingDescription = "Great job!";
  }
  else if(periodLength - trainingDays <= 3) {
    rating = 2;
    ratingDescription = "not too bad but could be better!";
  }
  else {
    rating = 1;
    ratingDescription = "Try harder!";
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
  };
};

const exerciseHours = process.argv.slice(5).map(hour => Number(hour));
const target = Number(process.argv[4]);

if(require.main === module)
  console.log(calculateExercises(exerciseHours, target));

export default calculateExercises;