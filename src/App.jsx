import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import About from './pages/About';
import ExecutiveCommittee from './pages/ExecutiveCommittee'; 
import DebateClubDirectory from './pages/DebateClubDirectory'; // নতুন ইম্পোর্ট
import Events from './pages/Events';
import News from './pages/News';
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="executive-committee" element={<ExecutiveCommittee />} /> 
        <Route path="debate-club-directory" element={<DebateClubDirectory />} /> {/* নতুন রাউট */}
        <Route path="events" element={<Events />} />
             <Route path="news" element={<News />} />
        <Route path="resources" element={<Resources />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portal" element={<Portal />} />
      </Route>
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;