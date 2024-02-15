import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Error404 from '../pages/Error404';
import Header from './Header';
import About from '../pages/About';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
