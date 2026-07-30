import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './auth';
import Landing from './pages/Landing';
import Login from './pages/Login';
import LegacyLogin from './pages/LegacyLogin';
import Settings from './pages/Settings';
import LinkWizard from './pages/LinkWizard';
import MockKakaoFirst from './pages/MockKakaoFirst';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/legacy" element={<LegacyLogin />} />
        <Route path="/welcome" element={<LinkWizard />} />
        <Route path="/mock/kakao-first" element={<MockKakaoFirst />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}
