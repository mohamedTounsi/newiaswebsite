// Home page (page.js)
import Navbar from './components/Navbar';
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IndustryPulse from './components/IndustryPulse';
import InnovationWaves from './components/InnovationWaves';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      
      {/* Hero section with extra bottom padding to create space for floating stats */}
      <div className="relative">
        <Hero />
        
 
      </div>

      {/* Features with top padding to make space for overlapping stats */}

        <Features />
        <IndustryPulse/>
        <Team/>
        <InnovationWaves/>
        <Contact/>
        <Footer/>

    </div>
  );
}