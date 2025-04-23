import CreateCourseContextBoundary from './context/CreateCourseContext';
import CreateCourse from './CreateCourse';

const CreateCoursePage = () => {
    return (
        <CreateCourseContextBoundary>
            <CreateCourse />;
        </CreateCourseContextBoundary>
    );
};

export default CreateCoursePage;
