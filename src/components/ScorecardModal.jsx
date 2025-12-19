import React, { useEffect, useState } from 'react';

const ScorecardModal = ({ matchId, onClose }) => {
    const [scorecard, setScorecard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/api/matches/${matchId}/scorecard`)
            .then(res => res.json())
            .then(data => {
                setScorecard(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [matchId]);

    if (!scorecard && !loading) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>&times;</button>

                {loading ? (
                    <div className="loading">Loading Scorecard...</div>
                ) : (
                    <>
                        <div className="tabs">
                            {scorecard.innings.map((inning, index) => (
                                <button
                                    key={index}
                                    className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                                    onClick={() => setActiveTab(index)}
                                >
                                    {inning.team} ({inning.score})
                                </button>
                            ))}
                        </div>

                        <div className="scorecard-body">
                            {scorecard.innings[activeTab] && (
                                <>
                                    <div className="batting-section">
                                        <h3>Batting</h3>
                                        <div className="table-responsive">
                                            <table className="score-table">
                                                <thead>
                                                    <tr>
                                                        <th>Batter</th>
                                                        <th>R</th>
                                                        <th>B</th>
                                                        <th>4s</th>
                                                        <th>6s</th>
                                                        <th>SR</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {scorecard.innings[activeTab].batters.map((batter, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <div className="batter-name">{batter.name}</div>
                                                                <div className="batter-status">{batter.status}</div>
                                                            </td>
                                                            <td className="runs">{batter.runs}</td>
                                                            <td>{batter.balls}</td>
                                                            <td>{batter.fours}</td>
                                                            <td>{batter.sixes}</td>
                                                            <td>{batter.sr}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="bowling-section">
                                        <h3>Bowling</h3>
                                        <div className="table-responsive">
                                            <table className="score-table">
                                                <thead>
                                                    <tr>
                                                        <th>Bowler</th>
                                                        <th>O</th>
                                                        <th>M</th>
                                                        <th>R</th>
                                                        <th>W</th>
                                                        <th>ER</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {scorecard.innings[activeTab].bowlers.map((bowler, i) => (
                                                        <tr key={i}>
                                                            <td>{bowler.name}</td>
                                                            <td>{bowler.o}</td>
                                                            <td>{bowler.m}</td>
                                                            <td>{bowler.r}</td>
                                                            <td className="wickets">{bowler.w}</td>
                                                            <td>{bowler.er}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ScorecardModal;
