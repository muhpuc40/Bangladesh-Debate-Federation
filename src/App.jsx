import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Root from './Root';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const MissionVision = lazy(() => import('./pages/MissionVision'));
const HallOfFame = lazy(() => import('./pages/HallOfFame'));
const AdvisorPanel = lazy(() => import('./pages/AdvisorPanel'));
const ExecutiveCommittee = lazy(() => import('./pages/ExecutiveCommittee'));
const PresidiumMember = lazy(() => import('./pages/PresidiumMember'));
const DebateClubDirectory = lazy(() => import('./pages/DebateClubDirectory'));
const Events = lazy(() => import('./pages/Events'));
const EventDetails = lazy(() => import('./pages/EventDetails'));
const News = lazy(() => import('./pages/News'));
const NewsDetails = lazy(() => import('./pages/NewsDetails'));
const Resources = lazy(() => import('./pages/Resources'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));

const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DevelopersInfo = lazy(() => import('./pages/DevelopersInfo'));
const Profile = lazy(() => import('./pages/Profile'));
const Blog = lazy(() => import('./pages/Blog'));

const Spinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>

        <Route path="/" element={<Root />}>

          {/* Public */}
          <Route index element={<Home />} />
          <Route path="mission-vision" element={<MissionVision />} />
          <Route path="hall-of-fame" element={<HallOfFame />} />
          <Route path="advisor-panel" element={<AdvisorPanel />} />
          <Route path="executive-committee" element={<ExecutiveCommittee />} />
          <Route path="presidium-member" element={<PresidiumMember />} />
          <Route path="debate-club-directory" element={<DebateClubDirectory />} />
          <Route path="events" element={<Events />} />
          <Route path="event/:id" element={<EventDetails />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetails />} />
          <Route path="resources" element={<Resources />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="developers-info" element={<DevelopersInfo />} />

          {/* Protected — must be logged in */}
          <Route path="profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="blog" element={
            <ProtectedRoute><Blog /></ProtectedRoute>
          } />

          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />


        </Route>



      </Routes>
    </Suspense>
  );
}

export default App;