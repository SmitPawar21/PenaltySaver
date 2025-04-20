import React, { useState } from 'react';
import './App.css';

function App() {
  const [jobs, setJobs] = useState([
    { id: 1, dueDay: "", cost: "", penalty: "" },
    { id: 2, dueDay: "", cost: "", penalty: "" },
    { id: 3, dueDay: "", cost: "", penalty: "" },
    { id: 4, dueDay: "", cost: "", penalty: "" },
    { id: 5, dueDay: "", cost: "", penalty: "" },
  ]);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (id, field, value) => {
    setJobs(
      jobs.map(job =>
        job.id === id ? { ...job, [field]: value } : job
      )
    );
  };

  const addNewRow = () => {
    const newId = jobs.length > 0 ? Math.max(...jobs.map(job => job.id)) + 1 : 1;
    setJobs([...jobs, { id: newId, dueDay: "", cost: "", penalty: "" }]);
  };

  const removeRow = (id) => {
    if (jobs.length > 1) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const validateJobs = () => {
    // Filter out empty rows
    const filledJobs = jobs.filter(
      job => job.dueDay !== "" && job.cost !== "" && job.penalty !== ""
    );

    // Validate each job has valid numbers
    for (const job of filledJobs) {
      if (isNaN(parseInt(job.dueDay)) || isNaN(parseFloat(job.cost)) || isNaN(parseFloat(job.penalty))) {
        setError("All fields must contain valid numbers.");
        return null;
      }
      if (parseInt(job.dueDay) <= 0) {
        setError("Due days must be positive numbers.");
        return null;
      }
    }

    // Check if we have at least one valid job
    if (filledJobs.length === 0) {
      setError("Please add at least one job with all fields filled.");
      return null;
    }

    setError(null);
    return filledJobs.map(job => ({
      ...job,
      dueDay: parseInt(job.dueDay),
      cost: parseFloat(job.cost),
      penalty: parseFloat(job.penalty)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validJobs = validateJobs();

    if (!validJobs) return;

    setLoading(true);

    try {
      // In a real app, replace with your actual API endpoint
      // const response = await fetch('https://your-api-endpoint.com/minimize-cash-flow', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(validJobs),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // const data = await response.json();

      // Mock response for demo purposes
      setTimeout(() => {
        // This is a mock response - replace with actual API call in production
        const mockResponse = {
          schedule: validJobs.map((job, index) => ({
            payDay: index + 1,
            jobId: job.id
          })),
          lateJobs: validJobs.length > 3 ? [validJobs[validJobs.length - 1].id] : [],
          totalCost: validJobs.reduce((sum, job) => sum + job.cost, 0) +
            (validJobs.length > 3 ? validJobs[validJobs.length - 1].penalty : 0),
          extraCost: validJobs.length > 3 ? validJobs[validJobs.length - 1].penalty : 0
        };

        setResults(mockResponse);
        setLoading(false);
      }, 1000);

    } catch (error) {
      setError('Failed to process the request. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Penalty Saver</h1>
        <p>Enter your payment obligations to optimize your payment schedule</p>
        <h3 style={{marginTop:'30px'}}>Cash Flow Minimizer</h3>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Job ID</th>
                <th>Deadline (Day)</th>
                <th>Cost</th>
                <th>Penalty</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={job.dueDay}
                      onChange={(e) => handleInputChange(job.id, 'dueDay', e.target.value)}
                      placeholder="Day"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={job.cost}
                      onChange={(e) => handleInputChange(job.id, 'cost', e.target.value)}
                      placeholder="Amount"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={job.penalty}
                      onChange={(e) => handleInputChange(job.id, 'penalty', e.target.value)}
                      placeholder="Penalty"
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="remove-btn"
                      onClick={() => removeRow(job.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button type="button" onClick={addNewRow} className="add-btn">
            Add Row
          </button>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Calculate Optimal Payment Schedule'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </form>

      {results && (
        <div className="results-section">
          <h2>Optimized Payment Schedule</h2>

          <div className="timeline-view">
            <h3>Payment Schedule</h3>
            <div className="timeline">
              {results.schedule.map((item) => (
                <div key={item.jobId} className="timeline-item">
                  <div className="timeline-day">Day {item.payDay}</div>
                  <div className="timeline-job">Job #{item.jobId}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="late-jobs">
            <h3>Late Jobs</h3>
            {results.lateJobs.length > 0 ? (
              <ul>
                {results.lateJobs.map((jobId) => (
                  <li key={jobId}>Job #{jobId}</li>
                ))}
              </ul>
            ) : (
              <p>No late jobs!</p>
            )}
          </div>

          <div className="cost-summary">
            <h3>Cost Summary</h3>
            <div className="cost-item">
              <span>Total Cost:</span>
              <span>${results.totalCost.toFixed(2)}</span>
            </div>
            <div className="cost-item">
              <span>Extra Penalty Cost:</span>
              <span>${results.extraCost.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;