import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage, { Navbar, Footer, MainBackground, MouseBackground } from './components/LandingPage.jsx';
import Contact from './pages/Contact.jsx';
import './App.css';

// We'll use a wrapper to provide the layout for all pages
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter = location.pathname !== '/contact';

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
          {/* We render the existing LandingPage sections on the Home route for now */}
          <Route path="/" element={<LandingPage isRoute={true} />} />
          <Route path="/contact" element={<Contact />} />
          {/* Placeholders for other pages to prevent 404s */}
          <Route path="/programs" element={<div className="pt-32 pb-20 text-center text-2xl font-bold">Programs Page (Coming Soon)</div>} />
          <Route path="/services" element={<div className="pt-32 pb-20 text-center text-2xl font-bold">Services Page (Coming Soon)</div>} />
          <Route path="/industries" element={<div className="pt-32 pb-20 text-center text-2xl font-bold">Industries Page (Coming Soon)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}