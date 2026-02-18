import { Link, Route, Routes } from 'react-router-dom';
import { AdminDashboard } from './screens/AdminDashboard';
import { LoginScreen } from './screens/LoginScreen';
import { MessagesScreen } from './screens/MessagesScreen';
import { PatientDetailScreen } from './screens/PatientDetailScreen';
import { PatientListScreen } from './screens/PatientListScreen';
import { TelehealthRoomScreen } from './screens/TelehealthRoomScreen';
import { VisitCalendarScreen } from './screens/VisitCalendarScreen';
import { VisitWorkflowScreen } from './screens/VisitWorkflowScreen';

export const App = () => (
  <div>
    <header>
      <h1>CareNest</h1>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/workflow">Visit Workflow</Link>
        <Link to="/telehealth">Telehealth</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/admin">Admin</Link>
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/patients" element={<PatientListScreen />} />
        <Route path="/patients/:id" element={<PatientDetailScreen />} />
        <Route path="/calendar" element={<VisitCalendarScreen />} />
        <Route path="/workflow" element={<VisitWorkflowScreen />} />
        <Route path="/telehealth" element={<TelehealthRoomScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </main>
  </div>
);
