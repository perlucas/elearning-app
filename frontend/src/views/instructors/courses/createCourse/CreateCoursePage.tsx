import CreateCourseContextComponent from './context/CreateCourseContext';
import CreateCourse from './CreateCourse';

const CreateCoursePage = () => {
    return (
        <CreateCourseContextComponent>
            <CreateCourse />;
        </CreateCourseContextComponent>
    );
};

export default CreateCoursePage;
