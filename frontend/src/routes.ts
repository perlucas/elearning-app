import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
    layout('layouts/app.tsx', [
        index('views/index.tsx'),
        route('/dev/:name', 'views/DevPage.tsx'),
        route('/dashboard', 'views/dashboard/index.tsx'),
        route('/courses/new', 'views/instructors/courses/createCourse/CreateCoursePage.tsx'),
    ]),
] satisfies RouteConfig;
