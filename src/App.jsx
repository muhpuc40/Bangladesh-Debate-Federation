
import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import MissionVision from './pages/MissionVision';
import HallOfFame from './pages/HallOfFame';
import AdvisorPanel from './pages/AdvisorPanel';
import ExecutiveCommittee from './pages/ExecutiveCommittee';
import PresidiumMember from './pages/PresidiumMember';
import DebateClubDirectory from './pages/DebateClubDirectory';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import News from './pages/News';
import NewsDetails from './pages/NewsDetails'; 
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DevelopersInfo from './pages/DevelopersInfo';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
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
        <Route path="portal" element={<Portal />} />
        <Route path="developers-info" element={<DevelopersInfo />} />
      </Route>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;