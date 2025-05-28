import CreateCourseContextBoundary from './context/CreateCourseContext';
import CreateCourse from './CreateCourse';
import EditModule from './EditModule';

const CreateCoursePage = () => {
    return (
        <CreateCourseContextBoundary>
            <CreateCourse />
            {/*<EditModule />*/}
        </CreateCourseContextBoundary>
    );
};

export default CreateCoursePage;
