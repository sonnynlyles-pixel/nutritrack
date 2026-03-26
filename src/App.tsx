import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import FoodLog from './pages/FoodLog';
import CalendarView from './pages/CalendarView';
import Progress from './pages/Progress';
import Goals from './pages/Goals';
import CustomFoods from './pages/CustomFoods';
import OnboardingWizard from './components/Onboarding/OnboardingWizard';
import { useStore } from './store/useStore';
import { useEffect } from 'react';
import { pruneOldData, seedFoods } from './db/database';
import { setUsdaApiKey } from './utils/foodApi';

export default function App() {
  const { profile, usdaApiKey } = useStore();

  useEffect(() => { pruneOldData(); seedFoods(); }, []);
  useEffect(() => { setUsdaApiKey(usdaApiKey); }, [usdaApiKey]);

  if (!profile.setupComplete) return <OnboardingWizard />;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<FoodLog />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/settings" element={<Goals />} />
          <Route path="/foods" element={<CustomFoods />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
