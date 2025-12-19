import React, { useEffect, useState } from 'react';

const NewsSection = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        fetch('https://cricbuzzclone-server.onrender.com/api/news')
            .then(res => res.json())
            .then(data => setNews(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <section id="news" className="news-section">
            <h2 className="section-title">Latest Cricket News</h2>
            <div className="news-list">
                {news.length > 0 ? (
                    news.map((item) => (
                        <div key={item.id} className="news-card">
                            <h3 className="news-headline">{item.headline}</h3>
                            <p className="news-time">{item.timestamp}</p>
                            <p className="news-summary">{item.summary}</p>
                        </div>
                    ))
                ) : (
                    <p className="no-data-message">No news available at the moment.</p>
                )}
            </div>
        </section>
    );
};

export default NewsSection;
