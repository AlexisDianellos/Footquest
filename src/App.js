import './Assets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home'
import About from './Pages/About';
import Questions from './Pages/Questions';
import Footer from './Components/Footer';

function App() {
  return (   
    <Router>
      <div className="min-h-screen bg-purple-300 flex flex-col">
        <Navbar />
      <div className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
