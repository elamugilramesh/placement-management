import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CompanyList from './components/companies/CompanyList';
import CompanyDetails from './components/companies/CompanyDetails';
import AdminDashboard from './components/admin/AdminDashboard';
import PeerExperiences from './components/experiences/PeerExperiences';
import HistoricalTrends from './components/trends/HistoricalTrends';
import FeedbackForm from './components/feedback/FeedbackForm';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate to="/" />;
};

// Feedback submission handler
const handleFeedbackSubmit = (feedback) => {
  console.log('Feedback submitted:', feedback);
  alert('Feedback submitted successfully!');
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <CompanyList />
              </PrivateRoute>
            }
          />
          <Route
            path="/companies/:id"
            element={
              <PrivateRoute>
                <CompanyDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/experiences"
            element={
              <PrivateRoute>
                <PeerExperiences handleFeedbackSubmit={handleFeedbackSubmit} />
              </PrivateRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <PrivateRoute>
                <HistoricalTrends />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute>
                <FeedbackForm onSubmit={handleFeedbackSubmit} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
