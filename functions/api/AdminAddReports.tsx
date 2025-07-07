import React, { useState } from 'react';

const AREAS = [
  'Los Angeles, CA', 'Houston, TX', 'Miami, FL', /* ...etc */
];

const AdminAddReports: React.FC = () => {
  const [area, setArea] = useState(AREAS[0]);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/add-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, count }),
      });
      const data = await res.json();
      setResult(data.success ? `Added ${data.added} reports.` : 'Error.');
    } catch (err) {
      setResult('Error adding reports.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 rounded-xl shadow-md w-full max-w-sm mx-auto">
      <h2 className="text-xl mb-3 font-bold">Add ICE Reports</h2>
      <label className="block mb-2">Area:</label>
      <select value={area} onChange={e => setArea(e.target.value)} className="mb-3 w-full p-2 rounded">
        {AREAS.map(a => <option key={a}>{a}</option>)}
      </select>
      <label className="block mb-2">Number of reports:</label>
      <input
        type="number"
        value={count}
        min={1}
        max={50}
        onChange={e => setCount(Number(e.target.value))}
        className="mb-3 w-full p-2 rounded"
      />
      <button disabled={loading} type="submit" className="w-full bg-blue-600 text-white rounded py-2">
        {loading ? 'Adding...' : 'Add Reports'}
      </button>
      {result && <div className="mt-3 text-center">{result}</div>}
    </form>
  );
};

export default AdminAddReports;
