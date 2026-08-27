import { useState } from 'react';

const queueKey = 'carenest-offline-visits';

export const VisitWorkflowScreen = () => {
  const [visitId, setVisitId] = useState('v_001');
  const [status, setStatus] = useState('');

  const startVisit = async () => {
    if (!navigator.onLine) {
      const queued = JSON.parse(localStorage.getItem(queueKey) ?? '[]');
      queued.push({ id: `offline_${Date.now()}`, caregiverId: 'u_cg1', patientId: 'pt_01', status: 'in_progress', startTime: new Date().toISOString() });
      localStorage.setItem(queueKey, JSON.stringify(queued));
      setStatus('Stored offline');
      return;
    }
    await fetch(`/api/visits/${visitId}/start`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ actor: 'u_cg1' }) });
    setStatus('Visit started');
  };

  const sync = async () => {
    const visits = JSON.parse(localStorage.getItem(queueKey) ?? '[]');
    const response = await fetch('/api/sync/visits', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ visits }) });
    if (response.ok) localStorage.removeItem(queueKey);
    setStatus('Sync complete');
  };

  return <section><h2>Visit Workflow</h2><input value={visitId} onChange={(e) => setVisitId(e.target.value)} /><button onClick={startVisit}>Start Visit</button><button onClick={sync}>Sync Offline Queue</button><p>{status}</p></section>;
};
