import './App.css';
import Form from './components/Form';
import Profile from './components/Profile';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  // // Check if profile data exists in local storage
  // const hasProfileData = !!localStorage.getItem('profile');

  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Form />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
