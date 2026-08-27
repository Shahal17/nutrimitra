import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const PatientDetailScreen = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<any>();
  useEffect(() => {
    fetch('/api/patients').then((r) => r.json()).then((items) => setPatient(items.find((p: any) => p.id === id)));
  }, [id]);
  if (!patient) return <p>Loading...</p>;
  return <article><h2>Patient Detail</h2><p>Care plan: {patient.carePlan}</p><p>Allergies: {patient.allergies.join(', ')}</p></article>;
};
