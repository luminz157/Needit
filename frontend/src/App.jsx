import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage, { Navbar, Footer, MainBackground, MouseBackground } from './components/LandingPage.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import Services from './pages/Services.jsx';
import Programs from './pages/Programs.jsx';
import Industries from './pages/Industries.jsx';
import Blogs from './pages/Blogs.jsx';
import './App.css';

// We'll use a wrapper to provide the layout for all pages
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/contact' && location.pathname !== '/admin';

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#1e0a3c] selection:text-white overflow-x-hidden bg-white" style={{ fontFamily: "'Lato', sans-serif" }}>
      <MainBackground />
      <MouseBackground />
      <Navbar />
      <main className="flex-grow flex flex-col relative z-10">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage isRoute={true} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Layout>
    </Router>
  );
}