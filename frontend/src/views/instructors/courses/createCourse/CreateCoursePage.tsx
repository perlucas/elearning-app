import useSafeContext from '@/hooks/useSafeContext';
import CreateCourseContextBoundary, { CreateCourseContext } from './context/CreateCourseContext';
import CreateCourse from './CreateCourse';
import EditModule from './EditModule';
import EditLecture from './EditLecture';

const CreateCourseContent = () => {
    const { editingViewItem } = useSafeContext(CreateCourseContext);
    return editingViewItem ? editingViewItem.type === 'module' ? <EditModule /> : <EditLecture /> : <CreateCourse />;
};

const CreateCoursePage = () => {
    return (
        <CreateCourseContextBoundary>
            <CreateCourseContent />
        </CreateCourseContextBoundary>
    );
};

export default CreateCoursePage;
