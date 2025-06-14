import './App.css';
import { navigate ,Link, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Home from './components/pages/home';
import HomeRecruter from './components/pages/homeRecruter';
import HomeUser from './components/pages/homeUser';
import Candidates from './components/pages/recruter-components/candidates';
import ManageJobs   from './components/pages/recruter-components/manage-jobs';
import PostJob from './components/pages/recruter-components/post-job';
import EditProfile from './components/pages/recruter-components/profile';
import UserProfile from './components/pages/user-components/profile';
import Applications from './components/pages/user-components/applications';
import Jobs from './components/pages/user-components/jobs';
import SavedJobs from './components/pages/user-components/saved-jobs';
// import { AppliedJobs } from '../../backend/controllers/userController';

// import Candidates from './components/pages/recruter-components/candidates';

function App() {
  return (
    <div className="App">
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homeRecruter" element={<HomeRecruter />} />
            <Route path="/homeUser" element={<HomeUser />} />
            <Route path="/homeRecruter/candidates" element={<Candidates />} />
            {/* <Route path="/homeUser/candidates" element={<Applications />} /> */}
            <Route path="/homeRecruter/manage-jobs" element={<ManageJobs />} />
            <Route path="/homeUser/jobs" element={<Jobs />} />
            <Route path="/homeRecruter/post-job" element={<PostJob />} />
            <Route path="/homeRecruter/profile" element={<EditProfile />} />
            <Route path="/homeUser/profile" element={<UserProfile />} />
            <Route path="/homeUser/applied" element={<Applications />} />
            <Route path="/homeUser/saved-jobs" element={<SavedJobs />} />

            </Routes>
    </div>
  );
}

export default App;
