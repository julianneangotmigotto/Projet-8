import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home';
import Error404 from '../pages/Error404';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
