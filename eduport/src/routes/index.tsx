import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

// Demos Pages
const DemosDefault = lazy(() => import('@/app/demos/default/home/page'))
const Eduction = lazy(() => import('@/app/demos/education/home/page'))
const Academy = lazy(() => import('@/app/demos/academy/home/page'))
const Course = lazy(() => import('@/app/demos/course/home/page'))
const University = lazy(() => import('@/app/demos/university/home/page'))
const Kindergarten = lazy(() => import('@/app/demos/kindergarten/home/page'))
const Landing = lazy(() => import('@/app/demos/landing/home/page'))
const Tutor = lazy(() => import('@/app/demos/tutor/home/page'))
const School = lazy(() => import('@/app/demos/school/home/page'))
const Abroad = lazy(() => import('@/app/demos/abroad/home/page'))
const Workshop = lazy(() => import('@/app/demos/workshop/home/page'))

// pages
const Categories = lazy(() => import('@/app/pages/course/categories/page'))
const Grid = lazy(() => import('@/app/pages/course/grid/page'))
const Grid2 = lazy(() => import('@/app/pages/course/grid-2/page'))
const List = lazy(() => import('@/app/pages/course/list/page'))
const List2 = lazy(() => import('@/app/pages/course/list-2/page'))
const Detail = lazy(() => import('@/app/pages/course/detail/page'))
const DetailMinimal = lazy(() => import('@/app/pages/course/detail-min/page'))
const DetailAdvance = lazy(() => import('@/app/pages/course/detail-adv/page'))
const DetailModule = lazy(() => import('@/app/pages/course/detail-module/page'))
const VideoPlayer = lazy(() => import('@/app/pages/course/video-player/page'))
const InstructorList = lazy(() => import('@/app/pages/instructors/page'))
const InstructorSingle = lazy(() => import('@/app/pages/instructors/[instructorId]/page'))
const InstructorBecome = lazy(() => import('@/app/pages/become-instructor/page'))
const AbroadSingle = lazy(() => import('@/app/pages/abroad-single/page'))
const WorkshopDetail = lazy(() => import('@/app/pages/workshop-detail/page'))
const EventDetail = lazy(() => import('@/app/pages/event-detail/page'))
const RequestDemo = lazy(() => import('@/app/pages/form/request-demo/page'))
const BookClass = lazy(() => import('@/app/pages/form/book-class/page'))
const RequestAccess = lazy(() => import('@/app/pages/form/request-access/page'))
const AdmissionForm = lazy(() => import('@/app/pages/form/admission-form/page'))

// about pages
const AboutUs = lazy(() => import('@/app/pages/about/about-us/page'))
const ContactUs = lazy(() => import('@/app/pages/about/contact-us/page'))
const BlogGrid = lazy(() => import('@/app/pages/about/blog-grid/page'))
const BlogMasonry = lazy(() => import('@/app/pages/about/blog-masonry/page'))
const Pricing = lazy(() => import('@/app/pages/about/pricing/page'))
const BlogDetail = lazy(() => import('@/app/pages/about/blog-grid/[blogId]/page'))

//shop
const Shop = lazy(() => import('@/app/shop/page'))
const ProductDetail = lazy(() => import('@/app/shop/product-detail/[productId]/page'))
const Cart = lazy(() => import('@/app/shop/cart/page'))
const Checkout = lazy(() => import('@/app/shop/checkout/page'))
const EmptyCart = lazy(() => import('@/app/shop/empty-cart/page'))
const Wishlist = lazy(() => import('@/app/shop/wishlist/page'))

// help
const HelpCenter = lazy(() => import('@/app/help/center/page'))
const HelpCenterDetails = lazy(() => import('@/app/help/center-detail/page'))

//other
const Faq = lazy(() => import('@/app/faq/page'))
const Error404 = lazy(() => import('@/app/(other)/(error-pages)/error-404/page'))
const ComingSoon = lazy(() => import('@/app/coming-soon/page'))

//Auth
const SignIn = lazy(() => import('@/app/(other)/auth/sign-in/page'))
const SignUp = lazy(() => import('@/app/(other)/auth/sign-up/page'))
const ForgotPassword = lazy(() => import('@/app/(other)/auth/forgot-password/page'))

//Instructor
const InstructorDashboard = lazy(() => import('@/app/instructor/dashboard/page'))
const InstructorCourses = lazy(() => import('@/app/instructor/manage-course/page'))
const InstructorCreateCourse = lazy(() => import('@/app/(other)/instructor/create-course/page'))
const InstructorCourseAdd = lazy(() => import('@/app/(other)/instructor/course-added/page'))
const Quiz = lazy(() => import('@/app/instructor/quiz/page'))
const Earnings = lazy(() => import('@/app/instructor/earning/page'))
const StudentsList = lazy(() => import('@/app/instructor/student-list/page'))
const Orders = lazy(() => import('@/app/instructor/order/page'))
const InstructorReviews = lazy(() => import('@/app/instructor/review/page'))
const Payout = lazy(() => import('@/app/instructor/payout/page'))
const EditProfile = lazy(() => import('@/app/instructor/edit-profile/page'))
const Settings = lazy(() => import('@/app/instructor/setting/page'))
const DeleteAccount = lazy(() => import('@/app/instructor/delete-account/page'))

//Student
const StudentDashboard = lazy(() => import('@/app/student/dashboard/page'))
const Subscription = lazy(() => import('@/app/student/subscription/page'))
const StudentCourseList = lazy(() => import('@/app/student/course-list/page'))
const CourseResume = lazy(() => import('@/app/student/course-resume/page'))
const StudentQuiz = lazy(() => import('@/app/student/quiz/page'))
const PaymentInfo = lazy(() => import('@/app/student/payment-info/page'))
const StudentWishlist = lazy(() => import('@/app/student/bookmark/page'))
const StudentEditProfile = lazy(() => import('@/app/student/edit-profile/page'))
const StudentSetting = lazy(() => import('@/app/student/setting/page'))
const StudentDeleteAccount = lazy(() => import('@/app/student/delete-account/page'))

//Admin
const AdminDashboard = lazy(() => import('@/app/admin/dashboard/page'))
const AllCourses = lazy(() => import('@/app/admin/all-courses/page'))
const CourseCategory = lazy(() => import('@/app/admin/course-category/page'))
const CourseDetail = lazy(() => import('@/app/admin/course-detail/page'))
const AdminStudents = lazy(() => import('@/app/admin/students/page'))
const AdminInstructors = lazy(() => import('@/app/admin/instructors/page'))
const AdminInstructorsDetails = lazy(() => import('@/app/admin/instructor-detail/page'))
const AdminInstructorRequests = lazy(() => import('@/app/admin/instructor-requests/page'))
const AdminReviews = lazy(() => import('@/app/admin/reviews/page'))
const AdminEarnings = lazy(() => import('@/app/admin/earnings/page'))
const AdminSettings = lazy(() => import('@/app/admin/admin-settings/page'))
const NotFound = lazy(() => import('@/app/admin/error-404/page'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/demos/default/home" />,
  },
]

export const demosRoutes: RoutesProps[] = [
  {
    path: '/demos/default/home',
    name: 'Demos',
    element: <DemosDefault />,
  },
  {
    path: '/demos/education/home',
    name: 'Home Eduction',
    element: <Eduction />,
  },
  {
    path: '/demos/academy/home',
    name: 'Home Academy',
    element: <Academy />,
  },
  {
    path: '/demos/course/home',
    name: 'Home Course',
    element: <Course />,
  },
  {
    path: '/demos/university/home',
    name: 'Home University',
    element: <University />,
  },
  {
    path: '/demos/kindergarten/home',
    name: 'Home Kindergarten',
    element: <Kindergarten />,
  },
  {
    path: '/demos/landing/home',
    name: 'Home Landing',
    element: <Landing />,
  },
  {
    path: '/demos/tutor/home',
    name: 'Home Tutor',
    element: <Tutor />,
  },
  {
    path: '/demos/school/home',
    name: 'Home School',
    element: <School />,
  },
  {
    path: '/demos/abroad/home',
    name: 'Home Abroad',
    element: <Abroad />,
  },
  {
    path: '/demos/workshop/home',
    name: 'Home Workshop',
    element: <Workshop />,
  },
]

const pagesRoutes: RoutesProps[] = [
  {
    path: '/pages/course/categories',
    name: 'Course Categories',
    element: <Categories />,
  },
  {
    path: '/pages/course/grid',
    name: 'Course Grid Classic',
    element: <Grid />,
  },
  {
    path: '/pages/course/grid-2',
    name: 'Course Grid Minimal',
    element: <Grid2 />,
  },
  {
    path: '/pages/course/list',
    name: 'Course List Classic',
    element: <List />,
  },
  {
    path: '/pages/course/list-2',
    name: 'Course List Minimal',
    element: <List2 />,
  },
  {
    path: '/pages/course/detail',
    name: 'Course Detail Classic',
    element: <Detail />,
  },
  {
    path: '/pages/course/detail-min',
    name: 'Course  Detail Minimal',
    element: <DetailMinimal />,
  },
  {
    path: '/pages/course/detail-adv',
    name: 'Course Detail Advance',
    element: <DetailAdvance />,
  },
  {
    path: '/pages/course/detail-module',
    name: 'Course Detail Module',
    element: <DetailModule />,
  },
  {
    path: '/pages/course/video-player',
    name: 'Course Full Screen Video',
    element: <VideoPlayer />,
  },
  {
    path: '/pages/about/about-us',
    name: 'About Us',
    element: <AboutUs />,
  },
  {
    path: '/pages/about/contact-us',
    name: 'Contact Us',
    element: <ContactUs />,
  },
  {
    path: '/pages/about/blog-grid',
    name: 'Blog Grid',
    element: <BlogGrid />,
  },
  {
    path: '/pages/about/blog-masonry',
    name: 'Blog Masonry',
    element: <BlogMasonry />,
  },
  {
    path: '/pages/about/blog-grid/:blogId',
    name: 'Blog Detail',
    element: <BlogDetail />,
  },
  {
    path: '/pages/about/pricing',
    name: 'Pricing',
    element: <Pricing />,
  },
  {
    path: '/pages/instructors',
    name: 'Instructor List',
    element: <InstructorList />,
  },
  {
    path: '/pages/instructors/:instructorId',
    name: 'Instructor Single',
    element: <InstructorSingle />,
  },
  {
    path: '/pages/become-instructor',
    name: 'Become an Instructor',
    element: <InstructorBecome />,
  },
  {
    path: '/pages/abroad-single',
    name: 'Abroad Single',
    element: <AbroadSingle />,
  },
  {
    path: '/pages/workshop-detail',
    name: 'Workshop Detail',
    element: <WorkshopDetail />,
  },
  {
    path: '/pages/event-detail',
    name: 'Event Detail',
    element: <EventDetail />,
  },
  {
    path: '/pages/form/request-demo',
    name: 'Request a demo',
    element: <RequestDemo />,
  },
  {
    path: '/pages/form/book-class',
    name: 'Book a Class',
    element: <BookClass />,
  },
  {
    path: '/pages/form/request-access',
    name: 'Free Access',
    element: <RequestAccess />,
  },
  {
    path: '/pages/form/admission-form',
    name: 'Admission Form',
    element: <AdmissionForm />,
  },
]

export const shopRoutes: RoutesProps[] = [
  {
    path: '/shop',
    name: 'Shop grid',
    element: <Shop />,
  },
  {
    path: '/shop/product-detail/:eventId',
    name: 'Product detail',
    element: <ProductDetail />,
  },
  {
    path: '/shop/cart',
    name: 'Product detail',
    element: <Cart />,
  },
  {
    path: '/shop/checkout',
    name: 'Checkout',
    element: <Checkout />,
  },
  {
    path: '/shop/empty-cart',
    name: 'Empty Cart',
    element: <EmptyCart />,
  },
  {
    path: '/shop/wishlist',
    name: 'Wishlist',
    element: <Wishlist />,
  },
]

const helpRoutes: RoutesProps[] = [
  {
    path: '/help/center',
    name: 'Help Center',
    element: <HelpCenter />,
  },
  {
    path: '/help/center-detail',
    name: 'Help Center Single',
    element: <HelpCenterDetails />,
  },
]

const otherRoutes: RoutesProps[] = [
  {
    path: '/faq',
    name: 'FAQs',
    element: <Faq />,
  },
  {
    path: '/error-404',
    name: 'Error 404',
    element: <Error404 />,
  },
  {
    path: '/coming-soon',
    name: 'Coming Soon',
    element: <ComingSoon />,
  },
  {
    path: '/instructor/create-course',
    name: 'Create Course',
    element: <InstructorCreateCourse />,
  },
]

export const authRoutes: RoutesProps[] = [
  {
    path: '/auth/sign-in',
    name: 'Sign In',
    element: <SignIn />,
  },
  {
    path: '/auth/sign-up',
    name: 'Sign Up',
    element: <SignUp />,
  },
  {
    path: '/auth/forgot-password',
    name: 'Forgot Password',
    element: <ForgotPassword />,
  },
]

export const InstructorRoutes: RoutesProps[] = [
  {
    path: '/instructor/dashboard',
    name: 'Dashboard',
    element: <InstructorDashboard />,
  },
  {
    path: '/instructor/manage-course',
    name: 'Courses',
    element: <InstructorCourses />,
  },
  {
    path: '/instructor/course-added',
    name: 'Course Added',
    element: <InstructorCourseAdd />,
  },
  {
    path: '/instructor/quiz',
    name: 'Quiz',
    element: <Quiz />,
  },
  {
    path: '/instructor/earning',
    name: 'Earnings',
    element: <Earnings />,
  },
  {
    path: '/instructor/student-list',
    name: 'Students',
    element: <StudentsList />,
  },
  {
    path: '/instructor/order',
    name: 'Orders',
    element: <Orders />,
  },
  {
    path: '/instructor/review',
    name: 'Reviews',
    element: <InstructorReviews />,
  },
  {
    path: '/instructor/payout',
    name: 'Payout',
    element: <Payout />,
  },
  {
    path: '/instructor/edit-profile',
    name: 'Edit Profile',
    element: <EditProfile />,
  },
  {
    path: '/instructor/setting',
    name: 'Settings',
    element: <Settings />,
  },
  {
    path: '/instructor/delete-account',
    name: 'Admin',
    element: <DeleteAccount />,
  },
]

export const studentRoutes: RoutesProps[] = [
  {
    path: '/student/dashboard',
    name: 'Dashboard',
    element: <StudentDashboard />,
  },
  {
    path: '/student/subscription',
    name: 'Subscription',
    element: <Subscription />,
  },
  {
    path: '/student/course-list',
    name: 'Courses',
    element: <StudentCourseList />,
  },
  {
    path: '/student/course-resume',
    name: 'Course Resume',
    element: <CourseResume />,
  },
  {
    path: '/student/quiz',
    name: 'Quiz',
    element: <StudentQuiz />,
  },
  {
    path: '/student/payment-info',
    name: 'Payment Info',
    element: <PaymentInfo />,
  },
  {
    path: '/student/bookmark',
    name: 'Wishlist',
    element: <StudentWishlist />,
  },
  {
    path: '/student/edit-profile',
    name: 'Edit Profile',
    element: <StudentEditProfile />,
  },
  {
    path: '/student/setting',
    name: 'Setting',
    element: <StudentSetting />,
  },
  {
    path: '/student/delete-account',
    name: 'Delete Account',
    element: <StudentDeleteAccount />,
  },
]

export const adminRoutes: RoutesProps[] = [
  {
    path: '/admin/dashboard',
    name: 'Admin',
    element: <AdminDashboard />,
  },
  {
    path: '/admin/all-courses',
    name: 'All Courses',
    element: <AllCourses />,
  },
  {
    path: '/admin/course-category',
    name: 'Course Category',
    element: <CourseCategory />,
  },
  {
    path: '/admin/course-detail',
    name: 'Course Detail',
    element: <CourseDetail />,
  },
  {
    path: '/admin/students',
    name: 'Students',
    element: <AdminStudents />,
  },
  {
    path: '/admin/instructors',
    name: 'Instructors',
    element: <AdminInstructors />,
  },
  {
    path: '/admin/instructor-detail',
    name: 'Instructor Detail',
    element: <AdminInstructorsDetails />,
  },
  {
    path: '/admin/instructor-requests',
    name: 'Instructor Requests',
    element: <AdminInstructorRequests />,
  },
  {
    path: '/admin/reviews',
    name: 'Reviews',
    element: <AdminReviews />,
  },
  {
    path: '/admin/earnings',
    name: 'Earnings',
    element: <AdminEarnings />,
  },
  {
    path: '/admin/admin-settings',
    name: 'Admin Settings',
    element: <AdminSettings />,
  },
  {
    path: '/admin/not-found',
    name: 'Not Found',
    element: <NotFound />,
  },
]

export const appRoutes = [...initialRoutes, ...demosRoutes, ...otherRoutes, ...pagesRoutes, ...helpRoutes]
