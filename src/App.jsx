import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Common
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Pages
import Hero from './components/Hero.jsx';
import IntroSection from './components/IntroSection.jsx';
import About from './components/About.jsx';
import Planner from './components/Planner.jsx';
import TourList from './components/TourList.jsx';
import Gallery from './components/Gallery.jsx';
import Transport from './components/Transport.jsx';
import TourDetails from './components/TourDetails.jsx';

// Admin
import AdminDashboard from './components/Admin/Dashboard.jsx';
import AddTour from './components/Admin/AddTour.jsx';




function App() {
  return (
    <Router>
      <main className="bg-[#0a0a0a] min-h-screen selection:bg-blue-500 selection:text-white">
        <Navbar />
        <Routes>
          {/* Main Home Page */}
          <Route path="/" element={
            <div className="relative z-10">
              <Hero />
              <IntroSection />
              <Planner />
              <TourList />
              <Gallery />
              <About />
              
              
            </div>
          } />

          {/* Transport Page */}
          <Route path="/transport" element={<Transport />} />

          {/* Tour Details Page */}
          <Route path="/tour/:id" element={<TourDetails />} />

          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-tour" element={<AddTour />} />
         
          
          
          
          
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

export default App;