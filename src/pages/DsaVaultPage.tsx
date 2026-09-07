import React, { useState } from 'react';
import { DSA_TOPICS, DsaTopic } from '../data/dsaTopics';
import { Layers, ArrowRight, ExternalLink, Play, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DsaVaultPage: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(DSA_TOPICS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const selectedTopic = DSA_TOPICS.find((t) => t.id === selectedTopicId) || DSA_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setActiveStepIndex(0);
  };

  return (
    <div style={{ paddingTop: '130px', paddingBottom: '100px' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Interactive Curriculum & Taxonomy</span>
          <h1 className="section-title">
            The 11 Foundational <span className="text-gradient">DSA Invariant Patterns</span>
          </h1>
          <p className="section-desc">
            Master the core mathematical invariants behind every interview problem. Instead of memorizing hundreds of ad-hoc tricks,
            understand the fundamental constraints that reduce asymptotic complexity.
          </p>
        </div>

        {/* 2-Column Explorer: Left Topic List, Right Topic Detail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px, 320px) 1fr',
            gap: '32px',
            alignItems: 'start',
          }}
          className="dsa-explorer-grid"
        >
          {/* Left Sidebar: 11 Topics List */}
          <div
            className="glass-card"
            style={{
              padding: '16px',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              position: 'sticky',
              top: '90px',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#64748b', padding: '8px 12px' }}>
              DSA Knowledge Vault (11)
            </div>

            {DSA_TOPICS.map((topic, index) => {
              const isSelected = topic.id === selectedTopic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #00f0ff' : '1px solid transparent',
                    background: isSelected ? 'rgba(0, 240, 255, 0.12)' : 'transparent',
                    color: isSelected ? '#00f0ff' : '#94a3b8',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', opacity: 0.7 }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: isSelected ? 700 : 500 }}>
                      {topic.name}
                    </span>
                  </div>
                  {isSelected && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00f0ff' }} />}
                </button>
              );
            })}
          </div>

          {/* Right Area: Selected Topic Deep Dive */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Overview Card */}
            <div className="glass-card" style={{ padding: '36px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  {selectedTopic.category}
                </span>
                <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '3px 10px', borderRadius: '6px' }}>
                  Space: {selectedTopic.spaceComplexity}
                </span>
              </div>

              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
                {selectedTopic.name}
              </h2>
              <p style={{ fontSize: '1.05rem', color: '#38bdf8', fontWeight: 600, marginBottom: '20px' }}>
                {selectedTopic.tagline}
              </p>
              <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: '28px' }}>
                {selectedTopic.summary}
              </p>

              {/* Complexity Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '16px',
                  background: 'rgba(6, 10, 20, 0.6)',
                  padding: '18px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Best Time</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 700 }}>{selectedTopic.timeComplexity.best}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Average Time</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#00f0ff', fontWeight: 700 }}>{selectedTopic.timeComplexity.average}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '4px' }}>Worst Time</div>
                  <div style={{ fontFamily: 'var(--font-mono)', color: '#f59e0b', fontWeight: 700 }}>{selectedTopic.timeComplexity.worst}</div>
                </div>
              </div>
            </div>

            {/* Core Invariants Cheat-sheet */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={20} color="#00f0ff" />
                <span>Critical Algorithmic Invariants</span>
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {selectedTopic.invariants.map((inv, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      background: 'rgba(0, 240, 255, 0.03)',
                      border: '1px solid rgba(0, 240, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                    }}
                  >
                    <span style={{ color: '#00f0ff', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                      INV_{i + 1}
                    </span>
                    <span style={{ fontSize: '0.92rem', color: '#e2e8f0', lineHeight: 1.5 }}>{inv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Step Visualizer */}
            {selectedTopic.interactiveSteps.length > 0 && (
              <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Play size={18} color="#00f0ff" />
                    <span>Interactive Execution Simulator</span>
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {selectedTopic.interactiveSteps.map((_, stepIdx) => (
                      <button
                        key={stepIdx}
                        onClick={() => setActiveStepIndex(stepIdx)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '6px',
                          border: activeStepIndex === stepIdx ? '1px solid #00f0ff' : '1px solid rgba(255,255,255,0.1)',
                          background: activeStepIndex === stepIdx ? 'rgba(0,240,255,0.2)' : 'rgba(255,255,255,0.03)',
                          color: activeStepIndex === stepIdx ? '#00f0ff' : '#94a3b8',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {stepIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Step Panel */}
                {selectedTopic.interactiveSteps[activeStepIndex] && (
                  <div>
                    <h4 style={{ color: '#38bdf8', fontSize: '0.98rem', fontWeight: 700, marginBottom: '12px' }}>
                      Step {selectedTopic.interactiveSteps[activeStepIndex].step}: {selectedTopic.interactiveSteps[activeStepIndex].title}
                    </h4>

                    {/* State visual chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        background: 'rgba(6, 10, 20, 0.8)',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid rgba(56, 189, 248, 0.15)',
                        marginBottom: '16px',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {selectedTopic.interactiveSteps[activeStepIndex].stateVisual.map((item, chipIdx) => (
                        <span
                          key={chipIdx}
                          style={{
                            padding: '6px 12px',
                            background: item.includes('[') ? 'rgba(0, 240, 255, 0.18)' : 'rgba(255, 255, 255, 0.05)',
                            border: item.includes('[') ? '1px solid #00f0ff' : '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '6px',
                            color: item.includes('[') ? '#00f0ff' : '#cbd5e1',
                            fontSize: '0.88rem',
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
                      {selectedTopic.interactiveSteps[activeStepIndex].explanation}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Canonical LeetCode Problems */}
            <div className="glass-card" style={{ padding: '32px', borderRadius: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '18px' }}>
                Canonical Interview Problems
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedTopic.canonicalProblems.map((prob, pIdx) => {
                  const diffColor = prob.difficulty === 'Easy' ? '#10b981' : prob.difficulty === 'Medium' ? '#f59e0b' : '#ef4444';
                  return (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        flexWrap: 'wrap',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                            {prob.title}
                          </span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              color: diffColor,
                              background: `${diffColor}18`,
                              border: `1px solid ${diffColor}40`,
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontWeight: 700,
                            }}
                          >
                            {prob.difficulty}
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{prob.coreIdea}</p>
                      </div>

                      <a
                        href={prob.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: '#00f0ff',
                          fontSize: '0.84rem',
                          textDecoration: 'none',
                          fontWeight: 600,
                        }}
                      >
                        <span>LeetCode #{prob.idOrNumber}</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Callout */}
            <div
              className="glass-card"
              style={{
                padding: '36px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(37, 99, 235, 0.15) 100%)',
                border: '1px solid rgba(0, 240, 255, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
              }}
            >
              <div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
                  Learn {selectedTopic.name} Interactively in AlgoVault
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#cbd5e1', maxWidth: '540px' }}>
                  Save your personal edge-cases, track your retention decay curve with SuperMemo SM-2, and master this pattern
                  before your next interview.
                </p>
              </div>
              <Link to="/pricing" className="btn-primary" style={{ padding: '12px 24px', textDecoration: 'none' }}>
                <span>Get AlgoVault Pro</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
