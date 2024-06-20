import Header from './Header';
import Content from './Content';
import Total from './Total';

const Course = ({course}) => {
    console.log(course);
    const exercises = course.parts.map((part) => part.exercises)
    const total = exercises.reduce((sum, curr) => sum + curr, 0);
    return (
        <div>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total total={total}/>
        </div>
    )
}

export default Course