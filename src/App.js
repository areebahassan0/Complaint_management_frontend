import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ComplaintHome from './components/ComplaintHome';
// import CategorySelection from './components/CategorySelection';
// import ComplaintForm from './components/ComplaintForm';

function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/complaints" element={<ComplaintHome />}/>
        {/* <Route path="/complaints/:category" element={<ComplaintCategory/>}/> */}
        {/* <Route path="/complaints/:category/:type" element={<ComplaintForm />}/> */}
      </Routes>
    </Router>
  )
}
export default App;
