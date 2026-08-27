import { useEffect, useState } from 'react';

export const VisitCalendarScreen = () => {
  const [visits, setVisits] = useState<any[]>([]);
  useEffect(() => { fetch('/api/visits').then((r) => r.json()).then(setVisits); }, []);
  return <section><h2>Visit Calendar</h2><ul>{visits.map((v) => <li key={v.id}>{v.id} — {v.status} — {v.startTime}</li>)}</ul></section>;
};
