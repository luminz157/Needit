import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LandingPage, { Navbar, Footer, MainBackground, MouseBackground } from './components/LandingPage.jsx';
import Contact from './pages/Contact.jsx';
import Services from './pages/Services.jsx';
import Programs from './pages/Programs.jsx';
import Industries from './pages/Industries.jsx';
import Blogs from './pages/Blogs.jsx';
import Partnership from './pages/Partnership.jsx';
import './App.css';

// We'll use a wrapper to provide the layout for all pages
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/contact';
  const showNavbar = true;

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-rose-500 selection:text-white overflow-x-hidden bg-[#eefcf9]" style={{ fontFamily: "'Lato', sans-serif" }}>
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
          <Route path="/services" element={<Services />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/partnership" element={<Partnership />} />
          {/* Catch all route - Redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
