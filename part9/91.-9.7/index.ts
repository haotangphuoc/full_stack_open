import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get(`/bmi`, (req, res) => {
  const {weight , height} = req.body as {weight: number, height: number};

  if (!weight || !height) {
    res.status(400).send("malformatted parameters");
    return;
  }

  res.send({
    weight,
    height,
    bmi: calculateBMI(height, weight)
  });
});

app.post('/exercises', (req, res) => {
  const {target, daily_exercises} = req.body as {target: number, daily_exercises: number[]};

  if(!target || !daily_exercises) {
    res.status(400).send("parameters missing");
    return;
  }

  const isTargetNum : boolean = typeof target === "number";
  const isDailyExercisesArrayNum : boolean = daily_exercises instanceof Array && daily_exercises.reduce((prev, curr) => {
    return prev && (typeof curr === "number");
  }, true);

  if(!isTargetNum || !isDailyExercisesArrayNum) {
    res.status(400).send("malformatted paramaters");
    return;
  }

  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});