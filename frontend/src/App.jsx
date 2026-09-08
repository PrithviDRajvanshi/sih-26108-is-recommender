import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import ResponseCard from './components/ResponseCard';
import Logo from './components/Logo';
import { demoQuery, demoDocument, demoData } from './data/demoData';

export default function App() {
  // Navigation & View State: 'empty' | 'thread'
  const [viewState, setViewState] = useState('empty');
  const [isExitingEmptyState, setIsExitingEmptyState] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Active Query Details (populated from demoData or user input)
  const [activeQuery, setActiveQuery] = useState(demoQuery);
  const [activeDocument, setActiveDocument] = useState(demoDocument);

  // Input states in empty state console
  const [inputText, setInputText] = useState(demoQuery);
  const [attachedFile, setAttachedFile] = useState(demoDocument);
  const [deepSearch, setDeepSearch] = useState(true);
  const [followUpText, setFollowUpText] = useState('');

  const fileInputRef = useRef(null);

  // Common template suggestions
  const commonTemplates = [
    {
      emoji: '🏛️',
      title: 'Structural Mild Steel Tubes (Govt Building)',
      meta: 'IS 1161:2014 · Fifth Revision · Hot-finished / ERW structural tubes',
      query: demoQuery,
    },
    {
      emoji: '💧',
      title: 'Submersible Pumpsets (Agricultural)',
      meta: 'IS 8034, IS 9283 · Head range, dynamic efficiency & Star rating',
      query:
        'Procurement of 3-phase submersible pump sets (5.0 HP) with water-filled squirrel cage induction motor for agricultural irrigation schemes, head range 60 to 90 meters, dynamically balanced cast bronze impellers.',
    },
    {
      emoji: '🏗️',
      title: 'TMT Rebars for Earthquake Zone IV',
      meta: 'IS 1786:2008 · Fe 500D ductility & elongation criteria',
      query:
        'Supply of High Strength Deformed Steel Bars (TMT) Fe 500D Grade for reinforced concrete construction in Seismic Earthquake Zone IV, nominal diameter 16mm to 32mm with controlled carbon equivalent.',
    },
    {
      emoji: '⚡',
      title: '11kV Aerial Bunched XLPE Cables',
      meta: 'IS 14255 · Short-circuit ratings & UV resistant outer sheath',
      query:
        'Supply and stringing of 11 kV Cross-linked Polyethylene (XLPE) Insulated Aerial Bunched Cables with aluminum conductor and bare messenger wire for rural high-voltage distribution networks.',
    },
  ];

  const wordCount = inputText.trim()
    ? inputText.trim().split(/\s+/).filter(Boolean).length
    : 0;

  // Triggering the recommendation query with smooth staggered fade-out transition
  const handleStartQuery = (textToUse) => {
    if (isExitingEmptyState) return;
    const query = textToUse || inputText || demoQuery;
    setActiveQuery(query);
    setActiveDocument(attachedFile || demoDocument);
    setSelectedQueryId('structural-tubes-demo-query');

    // Trigger smooth fade-out and lift of empty-state clutter
    setIsExitingEmptyState(true);

    // Stagger duration: templates (0-300ms) -> stat cards (75-375ms), then unmount & switch to thread
    setTimeout(() => {
      setViewState('thread');
      setIsExitingEmptyState(false);
    }, 360);
  };

  const handleSelectHistoryItem = (id) => {
    setSelectedQueryId(id);
    setActiveQuery(demoQuery);
    setActiveDocument(demoDocument);
    setIsExitingEmptyState(false);
    setViewState('thread');
  };

  const handleNewSpecification = () => {
    setSelectedQueryId(null);
    setInputText(demoQuery);
    setAttachedFile(demoDocument);
    setIsExitingEmptyState(false);
    setViewState('empty');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const newDoc = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: 'Technical Scope of Work',
      };
      setAttachedFile(newDoc);
      setActiveDocument(newDoc);
    }
  };

  const handleFollowUpSubmit = (e) => {
    e?.preventDefault();
    if (!followUpText.trim()) return;
    setFollowUpText('');
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar
        onNewQuery={handleNewSpecification}
        selectedQueryId={selectedQueryId}
        onSelectQuery={handleSelectHistoryItem}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Fluid Content Canvas */}
      <div
        className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-0' : 'pl-[260px]'
        }`}
      >
        {/* Fixed Top Header */}
        <header
          className={`fixed top-0 right-0 h-14 bg-surface/85 backdrop-blur-md z-40 px-space-lg flex items-center justify-end gap-space-md border-b border-outline-variant/20 transition-all duration-300 ${
            isSidebarCollapsed ? 'left-0' : 'left-[260px]'
          }`}
        >
          {isSidebarCollapsed && (
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="mr-auto p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors flex items-center gap-1"
              title="Open Sidebar"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">dock_to_right</span>
              <span className="font-headline-sm text-sm font-semibold tracking-tight text-on-surface">
                IS Recommender
              </span>
            </button>
          )}

          {/* Language Selector */}
          <button
            className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-low border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            <span className="font-label-md text-label-md">English / हिन्दी</span>
            <span className="material-symbols-outlined text-[14px]">expand_more</span>
          </button>

          <div className="h-4 w-px bg-outline-variant/40" />

          {/* User Profile */}
          <div className="flex items-center gap-space-xs pl-1">
            <div className="flex flex-col items-end">
              <span className="font-label-md text-label-md text-on-surface font-medium">
                CPWD / Procurement Wing
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Standardisation Engineer
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-terracotta-subtle border border-terracotta-primary/20 flex items-center justify-center text-primary font-bold text-xs shadow-2xs">
              PW
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="relative pt-14 bg-surface min-h-screen w-full">
          {viewState === 'empty' ? (
            /* ============================================================ */
            /* VIEW 1: EMPTY STATE VIEW (Welcome & Input Console)           */
            /* ============================================================ */
            <section className="relative w-full overflow-hidden px-gutter-desktop py-space-xl flex flex-col items-center justify-center">
              {/* Subtle Background Ambient Warm Glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-primary/5 via-tertiary/5 to-transparent blur-3xl pointer-events-none rounded-full" />

              <div className="relative w-full max-w-3xl flex flex-col items-center">
                {/* Hero Header & Input Console (Smoothly lifts and fades on submit) */}
                <div
                  className={`w-full flex flex-col items-center transition-all duration-350 ease-out ${
                    isExitingEmptyState
                      ? 'opacity-0 -translate-y-2 pointer-events-none'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  {/* Official Regulatory Pill Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant shadow-sm mb-6">
                    <span className="inline-block w-2 h-2 rounded-full bg-secondary" />
                    <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold text-on-surface">
                      BIS Engineering Lexicon v4.2
                    </span>
                    <span className="text-outline-variant font-body-sm">|</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Aligned with NBC 2016
                    </span>
                  </div>

                  {/* Editorial Welcome Heading */}
                  <h1 className="font-display text-headline-lg md:text-display text-on-surface text-center tracking-tight max-w-xl">
                    What are you procuring today?
                  </h1>

                  {/* Subtitle */}
                  <p className="font-body-lg text-body-lg text-on-surface-variant text-center max-w-xl mt-3 mb-8 leading-relaxed">
                    Paste technical specifications, tender clauses, or upload tender documents
                    (PDF/DOCX) to identify applicable Indian Standards (BIS) and mandatory compliance mandates.
                  </p>

                  {/* Claude-Inspired Conversational Input Console */}
                  <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm p-space-md transition-all duration-200 border border-outline-variant/30 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50">
                    {/* Attached File Chip Preview */}
                    {attachedFile && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <div className="inline-flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg text-on-surface shadow-2xs transition-colors">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            description
                          </span>
                          <span className="font-code-sm text-code-sm font-medium">
                            {attachedFile.name}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            ({attachedFile.size})
                          </span>
                          <button
                            aria-label="Remove attached document"
                            className="ml-1 p-0.5 rounded-full hover:bg-surface-variant text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center"
                            onClick={() => setAttachedFile(null)}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[14px]">close</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Multiline Prompt Area */}
                    <label className="sr-only" htmlFor="procurement-input">
                      Procurement technical specification
                    </label>
                    <textarea
                      id="procurement-input"
                      rows={4}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleStartQuery();
                        }
                      }}
                      placeholder="E.g., Need mild steel tubes for structural use in a government building construction tender, IS specification required..."
                      className="w-full bg-transparent border-0 resize-none font-body-lg text-body-lg text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none leading-relaxed"
                    />

                    {/* Bottom Integrated Action Toolbar */}
                    <div className="flex items-center justify-between pt-3 mt-1 border-t border-outline-variant/20">
                      {/* Left Controls: Attachment & Deep BIS Engine Toggle */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.doc,.docx"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all"
                          title="Attach tender documents"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">attach_file</span>
                          <span className="hidden sm:inline font-label-md text-label-md">
                            Attach NIT / Doc
                          </span>
                        </button>

                        {/* Deep Search Toggle Switch */}
                        <label className="flex items-center gap-2 cursor-pointer select-none px-2 py-1 rounded-xl hover:bg-surface-container-low transition-colors">
                          <input
                            type="checkbox"
                            checked={deepSearch}
                            onChange={(e) => setDeepSearch(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-8 h-4 bg-surface-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-tertiary" />
                          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                            Deep BIS Search
                          </span>
                          <span className="hidden md:inline font-code-sm text-[10px] text-on-surface-variant/70 uppercase">
                            Incl. Amendments
                          </span>
                        </label>
                      </div>

                      {/* Right Controls: Word Count & Run Button */}
                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline font-code-sm text-code-sm text-on-surface-variant/60">
                          {wordCount === 1 ? '1 word' : `${wordCount} words`}
                        </span>
                        <button
                          aria-label="Analyze specifications"
                          onClick={() => handleStartQuery()}
                          className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-on-primary hover:bg-primary-container active:scale-95 transition-all shadow-sm group"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-0.5">
                            arrow_upward
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Element 1 to Fade Out: Common Procurement Templates */}
                <div
                  className={`w-full mt-6 transition-all duration-350 ease-out ${
                    isExitingEmptyState
                      ? 'opacity-0 -translate-y-2 pointer-events-none'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                      Common Procurement Templates
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/80">
                      Click to fill draft
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {commonTemplates.map((template, idx) => (
                      <button
                        key={idx}
                        disabled={isExitingEmptyState}
                        onClick={() => {
                          setInputText(template.query);
                          handleStartQuery(template.query);
                        }}
                        className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-left transition-all group shadow-2xs border border-transparent hover:border-outline-variant/40"
                        type="button"
                      >
                        <span className="text-xl shrink-0">{template.emoji}</span>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors truncate">
                            {template.title}
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant/80 mt-0.5 truncate">
                            {template.meta}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Target Element 2 to Fade Out: Analytical Scope Mini-Matrix (Staggered by ~75ms) */}
                <div
                  className={`w-full mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-350 ease-out delay-75 ${
                    isExitingEmptyState
                      ? 'opacity-0 -translate-y-2 pointer-events-none'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-outline-variant/30">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        verified
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        22,000+ BIS Standards
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Active Indian codes catalog
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-outline-variant/30">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-tertiary text-[20px]">
                        rule_folder
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        QCO Compliance
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Mandatory Order notifications
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-2xs border border-outline-variant/30">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary text-[20px]">
                        fact_check
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">
                        Tender Cross-Audit
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Identifies obsolete IS mentions
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Footer Badge (Staggered dissolution) */}
                <div
                  className={`mt-8 flex flex-col sm:flex-row items-center justify-center gap-2 text-center text-on-surface-variant transition-all duration-350 ease-out delay-100 ${
                    isExitingEmptyState
                      ? 'opacity-0 -translate-y-2 pointer-events-none'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      account_balance
                    </span>
                    <span className="font-label-sm text-label-sm font-semibold">
                      BUREAU OF INDIAN STANDARDS
                    </span>
                  </div>
                  <span className="hidden sm:inline text-outline-variant font-body-sm">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant/80">
                    Aligned with National Building Code (NBC) &amp; BIS Act 2016 Standards Repository
                  </span>
                </div>
              </div>
            </section>
          ) : (
            /* ============================================================ */
            /* VIEW 2: ACTIVE CONVERSATION THREAD VIEW                      */
            /* ============================================================ */
            <div className="max-w-4xl mx-auto w-full px-space-md py-space-xl pb-36">
              {/* Top Metadata Context Bar (Enters with smooth fade-in slide) */}
              <div className="animate-fade-in-up flex items-center justify-between pb-space-lg mb-space-lg border-b border-outline-variant/30">
                <div className="flex items-center gap-space-xs">
                  <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-full bg-surface-container-high text-on-surface-variant font-code-sm text-code-sm">
                    <span className="w-2 h-2 rounded-full bg-tertiary" />
                    REF-2025/TND-5082
                  </span>
                  <span className="text-on-surface-variant/40 font-body-sm text-body-sm">•</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    CPWD Building Construction Division (Civil Wing)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">bookmark_border</span>
                    Pin Session
                  </button>
                  <button
                    className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors font-label-sm text-label-sm"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    Share Digest
                  </button>
                </div>
              </div>

              {/* Conversation Stream */}
              <div className="space-y-space-2xl">
                {/* User Query Turn (Enters smoothly) */}
                <div className="animate-fade-in-up flex flex-col items-end gap-space-xs">
                  <div className="flex items-center gap-space-xs mb-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Standardisation Engineer (Procurement)
                    </span>
                    <span className="text-on-surface-variant/40 font-body-sm text-body-sm">•</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/70">
                      Today at 10:42 AM
                    </span>
                  </div>

                  <div className="max-w-2xl bg-surface-container-low rounded-2xl p-space-md shadow-sm border border-outline-variant/30">
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      {activeQuery}
                    </p>

                    {/* Attached Spec Chip */}
                    {activeDocument && (
                      <div className="mt-space-sm pt-space-xs flex items-center justify-between bg-surface-container-lowest rounded-xl px-space-sm py-2 border border-outline-variant/30">
                        <div className="flex items-center gap-space-xs">
                          <span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[18px]">
                              description
                            </span>
                          </span>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-medium">
                              {activeDocument.name}
                            </span>
                            <span className="font-code-sm text-code-sm text-on-surface-variant/70">
                              {activeDocument.size} • {activeDocument.type || 'Technical Scope of Work'}
                            </span>
                          </div>
                        </div>
                        <button
                          className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
                          title="Inspect attachment"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Assistant Turn (Staggered entrance: delay-1) */}
                <div className="animate-fade-in-up-delay-1 flex flex-col items-start gap-space-md">
                  {/* Assistant Identity & Latency */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <Logo className="w-6 h-6" rounded="rounded-md" />
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
                        IS Recommender
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed-dim" />
                      <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-medium">
                        <span className="material-symbols-outlined text-[14px]">bolt</span>
                        AI Analysis complete • 0.8s
                      </span>
                    </div>

                    <div className="flex items-center gap-space-xs">
                      <button
                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
                        title="Thumbs up response"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">thumb_up</span>
                      </button>
                      <button
                        className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
                        title="Copy response markdown"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Recommended Standard Card Component with Demo Data */}
                  <ResponseCard data={demoData} />

                  {/* Follow-up Recommendation Pills (Staggered entrance: delay-2) */}
                  <div className="animate-fade-in-up-delay-2 w-full pl-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant block mb-2 font-medium">
                      Suggested Next Steps
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-all text-left border border-outline-variant/30"
                        type="button"
                        onClick={() => setFollowUpText("Generate model NIT clause for Mill Test Certificate (MTC) verification")}
                      >
                        + Generate model NIT Clause for Mill Test Certificate (MTC) verification
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-all text-left border border-outline-variant/30"
                        type="button"
                        onClick={() => setFollowUpText("Compare IS 1161 with IS 4923 for hollow steel sections")}
                      >
                        + Compare IS 1161 with IS 4923 for hollow steel sections
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-all text-left border border-outline-variant/30"
                        type="button"
                        onClick={() => setFollowUpText("Add tensile and elongation criteria table for YSt 210/240/310 grades")}
                      >
                        + Add tensile & elongation criteria table for YSt 210/240/310 grades
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Persistent Docked Bottom Query Composer (Enters smoothly) */}
              <div
                className={`animate-fade-in-up fixed bottom-0 right-0 bg-surface/90 backdrop-blur-md border-t border-outline-variant/30 py-space-sm px-space-lg z-30 transition-all duration-300 ${
                  isSidebarCollapsed ? 'left-0' : 'left-[260px]'
                }`}
              >
                <div className="max-w-4xl mx-auto w-full">
                  <form
                    onSubmit={handleFollowUpSubmit}
                    className="flex items-center gap-2 bg-surface-container-lowest rounded-2xl p-2 shadow-sm border border-outline-variant/30 focus-within:ring-2 focus-within:ring-primary/20 transition-all"
                  >
                    <button
                      aria-label="Attach another document or drawing"
                      className="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors"
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <span className="material-symbols-outlined text-[20px]">attach_file</span>
                    </button>
                    <input
                      className="flex-1 bg-transparent px-2 py-1.5 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
                      placeholder="Ask a follow-up, request sample NIT paragraphs, or refine hydraulic parameters..."
                      type="text"
                      value={followUpText}
                      onChange={(e) => setFollowUpText(e.target.value)}
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="hidden sm:inline font-code-sm text-code-sm text-on-surface-variant/60 px-1.5 py-0.5 rounded bg-surface-container">
                        Return ↵
                      </span>
                      <button
                        aria-label="Send message"
                        className="w-9 h-9 rounded-xl bg-primary hover:bg-primary-container text-on-primary flex items-center justify-center transition-colors shadow-2xs"
                        type="submit"
                      >
                        <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
                      </button>
                    </div>
                  </form>

                  <div className="flex items-center justify-between mt-1 px-1">
                    <span className="font-label-sm text-label-sm text-on-surface-variant/60">
                      BIS Recommender Model v4.2 • Bureau of Indian Standards Official Taxonomy
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant/60">
                      Press <strong>Shift + Return</strong> for newline
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
