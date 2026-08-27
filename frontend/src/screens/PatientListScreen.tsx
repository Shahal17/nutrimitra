import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const PatientListScreen = () => {
  const [patients, setPatients] = useState<any[]>([]);
  useEffect(() => { fetch('/api/patients').then((r) => r.json()).then(setPatients); }, []);
  return <section><h2>Patient List</h2><ul>{patients.map((p) => <li key={p.id}><Link to={`/patients/${p.id}`}>{p.userId} — {p.carePlan}</Link></li>)}</ul></section>;
};
