import { useEffect, useState } from 'react';

export const AdminDashboard = () => {
  const [visits, setVisits] = useState<any[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/visits').then((r) => r.json()).then(setVisits);
    fetch('/api/audit-logs').then((r) => r.json()).then(setAudits);
  }, []);
  const completed = visits.filter((v) => v.status === 'completed').length;
  const adherence = Math.round((completed / Math.max(visits.length, 1)) * 100);
  return <section><h2>Admin Analytics</h2><p>Visits/day: {visits.length}</p><p>Adherence %: {adherence}</p><p>Audit log entries: {audits.length}</p></section>;
};
