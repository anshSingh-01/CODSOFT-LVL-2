import React, { useEffect, useState } from 'react';
import '../../css/recruter-components/candidates.css';
import { handleError, handleSuccess } from '../../../utils';

const Candidates = () => {
  const [candidates, setCandidates] = useState(
    []
  );

  const [loading, setLoading] = useState(true);
  const useEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const res = await fetch('http://localhost:5000/joblo/job/candidates', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ useEmail }),
        });
        const data = await res.json();
        if (res.ok) {
          setCandidates(data.candidates);
          console.log(data.candidates);
          
          handleSuccess('Candidates loaded successfully!');
        } else {
          handleError(data.message || 'Failed to fetch candidates');
        }
      } catch (err) {
        handleError('Error connecting to server');
      } finally {
        setLoading(false);
      }
    };
    fetchCandidates();
  }, [useEmail]);

  return (
    <div className="candidates-container">
      <h2>Candidates</h2>
     
      {loading && <p>Loading candidates...</p>}
      {!loading && candidates.length === 0 && (
        <p>No candidates have applied yet.</p>
      )}
      {!loading && candidates.length > 0 && (
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Applied For</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.name || candidate.candidateName || 'N/A'}</td>
                <td>{candidate.userEmail || candidate.candidateEmail || 'N/A'}</td>
                <td>{candidate.jobTitle || 'N/A'}</td>
                <td>
                  {candidate.resumeUrl ? (
                    <a href={candidate.resumeUrl} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Candidates;