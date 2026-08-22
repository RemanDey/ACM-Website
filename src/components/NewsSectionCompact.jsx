import React, { useEffect, useState } from 'react';

const NewsSectionCompact = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const computeKeywords = [
    'ai', 'machine learning', 'ml', 'llm', 'gpt', 'neural', 'deep learning',
    'programming', 'coding', 'software', 'developer', 'github', 'open source',
    'algorithm', 'data structure', 'leetcode', 'competitive programming',
    'hackathon', 'startup', 'ycombinator', 'vc', 'funding',
    'rust', 'go', 'python', 'javascript', 'typescript', 'cpp', 'java',
    'react', 'vue', 'node', 'docker', 'kubernetes', 'aws', 'cloud',
    'blockchain', 'crypto', 'web3', 'ethereum', 'bitcoin',
    'security', 'vulnerability', 'hack', 'exploit', 'privacy',
    'quantum', 'chip', 'semiconductor', 'nvidia', 'amd', 'intel',
    'robotics', 'automation', 'computer vision', 'nlp', 'transformer',
    'database', 'sql', 'nosql', 'postgres', 'mongodb', 'redis',
    'api', 'rest', 'graphql', 'microservice', 'devops', 'ci/cd',
    'linux', 'kernel', 'ubuntu', 'debian', 'arch', 'fedora',
    'browser', 'chrome', 'firefox', 'safari', 'webkit', 'v8',
    'compiler', 'interpreter', 'runtime', 'garbage collection',
    'distributed', 'consensus', 'raft', 'paxos', 'etcd', 'consul',
  ];

  const isComputingRelated = (title) => {
    const lowerTitle = title.toLowerCase();
    return computeKeywords.some(keyword => lowerTitle.includes(keyword));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        
        const topStoriesResponse = await fetch(
          'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
        );
        
        if (!topStoriesResponse.ok) {
          throw new Error('Failed to fetch top stories');
        }
        
        const storyIds = await topStoriesResponse.json();
        
        const storyPromises = storyIds.slice(0, 20).map(id =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then(res => res.json())
        );
        
        const storyResults = await Promise.all(storyPromises);
        
        const validStories = storyResults
          .filter(story => story && story.type === 'story' && story.title && story.url)
          .filter(story => isComputingRelated(story.title))
          .slice(0, 3)
          .map(story => ({
            id: story.id,
            title: story.title,
            url: story.url,
            score: story.score || 0,
            by: story.by || 'unknown',
            time: story.time || 0,
            descendants: story.descendants || 0,
          }));
        
        setStories(validStories);
        setError(null);
      } catch (err) {
        setError('Failed to load news. Please try again later.');
        console.error('News fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    
    const interval = setInterval(fetchNews, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section id="news" className="section section--compact">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">News</p>
            <h2>Computing News</h2>
          </div>
          <div className="news__grid news__grid--compact">
            {[1, 2, 3].map(i => (
              <div key={i} className="news__card news__card--skeleton">
                <div className="news__skeleton-title"></div>
                <div className="news__skeleton-meta"></div>
                <div className="news__skeleton-meta"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="section section--compact">
        <div className="container">
          <div className="section__header">
            <p className="eyebrow">News</p>
            <h2>Computing News</h2>
          </div>
          <p className="news__error">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="section section--compact">
      <div className="container">
        <div className="section__header">
          <p className="eyebrow">News</p>
          <h2>Computing News</h2>
        </div>
        <p className="lede">
          Latest developments in computing, AI, and technology from Hacker News.
        </p>
        <div className="news__grid news__grid--compact">
          {stories.length === 0 ? (
            <p className="news__empty">No computing-related stories at the moment.</p>
          ) : (
            stories.map(story => (
              <article key={story.id} className="news__card">
                <h3 className="news__title">
                  <a
                    href={story.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news__link"
                  >
                    {story.title}
                  </a>
                </h3>
                <div className="news__meta">
                  <span className="news__score">{story.score} points</span>
                  <span className="news__by">by {story.by}</span>
                  <span className="news__time">{formatTime(story.time)}</span>
                  <span className="news__comments">{story.descendants} comments</span>
                </div>
                <a
                  href={`https://news.ycombinator.com/item?id=${story.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="news__discuss"
                >
                  Discuss on HN
                </a>
              </article>
            ))
          )}
        </div>
        <div className="section__cta">
          <a href="/news" className="btn btn--ghost">More news →</a>
        </div>
      </div>
    </section>
  );
};

export default NewsSectionCompact;