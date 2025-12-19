import React, { useEffect, useState } from 'react';
import ScorecardModal from './ScorecardModal';

const LiveScore = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState(null);

    const fetchMatches = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/matches');
            const data = await response.json();
            setMatches(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching matches:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatches();
        const interval = setInterval(fetchMatches, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const handleViewScorecard = (matchId) => {
        setSelectedMatch(matchId);
    };

    const handleCloseModal = () => {
        setSelectedMatch(null);
    };

    if (loading) return <div className="loading">Loading Live Scores...</div>;

    return (
        <section className="live-score-section">
            <h2 className="section-title">Live Cricket Scores</h2>
            <div className="matches-grid">
                {matches.length > 0 ? (
                    matches.map((match) => (
                        <div key={match.id} className="match-card">
                            <div className="series-name">{match.series}</div>
                            <div className="match-status-badge">{match.live ? 'LIVE' : 'RESULT'}</div>

                            <div className="teams">
                                <div className="team">
                                    <span className="team-name">{match.team1}</span>
                                    <span className="team-score">{match.score1}</span>
                                </div>
                                <div className="team">
                                    <span className="team-name">{match.team2}</span>
                                    <span className="team-score">{match.score2}</span>
                                </div>
                            </div>

                            <div className="match-result">{match.status}</div>
                            <button
                                className="view-scorecard-btn"
                                onClick={() => handleViewScorecard(match.id)}
                            >
                                View Scorecard
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-data-message">
                        <p>No matches available or unable to connect to server.</p>
                        <p>Please ensure the backend server is running.</p>
                    </div>
                )}
            </div>

            {selectedMatch && (
                <ScorecardModal matchId={selectedMatch} onClose={handleCloseModal} />
            )}
        </section>
    );
};

export default LiveScore;
