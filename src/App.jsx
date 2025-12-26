import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import About from './pages/About';
import ExecutiveCommittee from './pages/ExecutiveCommittee';
import Events from './pages/Events';
import News from './pages/News'; // নতুন import
import Resources from './pages/Resources';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Routes>
      {/* Main layout with Navbar and Footer */}
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="executive-committee" element={<ExecutiveCommittee />} />
        <Route path="events" element={<Events />} />
        <Route path="news" element={<News />} /> {/* নতুন রাউট */}
        <Route path="resources" element={<Resources />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="portal" element={<Portal />} />
      </Route>
      
      {/* Authentication pages without Navbar/Footer */}
      <Route path="signin" element={<SignIn />} />
      <Route path="signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;