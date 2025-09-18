import React, { useState } from 'react';

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState('');
  const [strengths, setStrengths] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const submit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/quiz/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interests, strengths: strengths.split(',').map(s => s.trim()) })
      });
      const data = await res.json();
      setResult(data);
      setStep(3);
    } catch (e) {
      setResult({ stream: 'Science', degrees: ['B.Sc'], strengths: [], recommendations: ['Try again later'] });
      setStep(3);
    }
    setLoading(false);
  };

  return (
    <div className="card card-hover" style={{ padding: '1rem', marginTop: '1rem' }}>
      <h2>🧭 Aptitude & Interest Quiz</h2>
      {step === 1 && (
        <div style={{ marginTop: '1rem' }}>
          <label>What interests you? (e.g., technology, business, helping people)</label>
          <textarea value={interests} onChange={e => setInterests(e.target.value)} rows={3} style={{ width: '100%', marginTop: '0.5rem' }} />
          <div style={{ marginTop: '0.75rem' }}>
            <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!interests.trim()}>Next</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div style={{ marginTop: '1rem' }}>
          <label>Your strengths (comma separated)</label>
          <input value={strengths} onChange={e => setStrengths(e.target.value)} style={{ width: '100%', marginTop: '0.5rem' }} />
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={submit} disabled={loading}>
              {loading ? <><i className="fas fa-spinner fa-spin"></i> Analyzing...</> : 'Get Recommendations'}
            </button>
          </div>
        </div>
      )}
      {step === 3 && result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Suggested Stream: {result.stream}</h3>
          <div style={{ marginTop: '0.5rem' }}>Degrees: {result.degrees?.join(', ')}</div>
          <div style={{ marginTop: '0.5rem' }}>Recommendations:</div>
          <ul>
            {result.recommendations?.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Quiz;


