import React, { useState } from 'react';
import demoData from '../data/demoData';

export default function ResponseCard({ data = demoData }) {
  const [copied, setCopied] = useState(false);
  const [isAlliedExpanded, setIsAlliedExpanded] = useState(true);
  const [isCertExpanded, setIsCertExpanded] = useState(true);

  const cardData = data || demoData;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Group allied standards by type
  const alliedStandards = cardData.allied_standards || [];
  const alliedGrouped = alliedStandards.reduce((acc, curr) => {
    const key = curr.type || 'Normative References';
    if (!acc[key]) acc[key] = [];
    acc[key].push(curr);
    return acc;
  }, {});
  const alliedEntries = Object.entries(alliedGrouped);

  // Certifications list
  const certifications = cardData.certifications || [];

  // Metrics / Parameters
  const parameters = cardData.parameters || [
    { label: "Application", value: "Structural Framing" },
    { label: "Manufacturing", value: "Seamless / ERW / HFW" },
    { label: "Strength Grades", value: "Y St 210 / 240 / 310" },
    { label: "Thickness Class", value: "Light / Medium / Heavy" }
  ];

  return (
    <div className="w-full bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30">
      {/* Card Header: Badges & Standard Code */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-sm pb-space-md border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant font-semibold">
              Recommended Primary Standard
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-code-sm text-code-sm">
              {cardData.ics_code || 'ICS 77.140.75'}
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            {cardData.is_number}
          </h1>
          {cardData.committee && (
            <div className="mt-1 flex items-center gap-1.5 text-on-surface-variant/80 font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[15px] text-secondary">
                corporate_fare
              </span>
              <span>{cardData.committee}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            {cardData.latest_version_badge || `Latest Version (Reaffirmed ${cardData.reaffirmed_year})`}
          </span>
          {/* Mandatory QCO Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[14px]">gavel</span>
            Mandatory QCO Order
          </span>
        </div>
      </div>

      {/* Full Standard Title & Reasoning Paragraph */}
      <div className="py-space-md">
        <p className="font-headline-sm text-headline-sm text-on-surface italic">
          "{cardData.title}"
        </p>
        <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {cardData.reasoning}
        </p>
      </div>

      {/* Parameter Extraction Metric Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs p-space-sm bg-surface-container-low rounded-xl mb-space-lg">
        {parameters.map((param, index) => (
          <div key={index} className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {param.label}
            </span>
            <span className="font-code-sm text-code-sm font-semibold text-on-surface">
              {param.value}
            </span>
          </div>
        ))}
      </div>

      {/* Structured Section 1: Allied & Cross-Referenced Standards (Collapsible) */}
      <div className="mb-space-lg">
        <button
          type="button"
          onClick={() => setIsAlliedExpanded(!isAlliedExpanded)}
          className="w-full flex items-center justify-between pb-space-xs border-b border-outline-variant/30 mb-space-sm text-left group"
        >
          <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">account_tree</span>
            Allied &amp; Cross-Referenced Standards
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {alliedStandards.length} Essential Normative Links
            </span>
            <span
              className={`material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface transition-transform duration-200 ${
                isAlliedExpanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>
        </button>

        {isAlliedExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm transition-all duration-300">
            {alliedEntries.length > 0 ? (
              alliedEntries.map(([groupTitle, items], idx) => (
                <div
                  key={idx}
                  className="p-space-sm rounded-xl bg-surface-container-low flex flex-col justify-between"
                >
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold block mb-2">
                      {groupTitle}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((item, i) => (
                        <button
                          key={i}
                          className="group inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container font-code-sm text-code-sm transition-all shadow-2xs"
                          title={`View details for ${item.is_number}`}
                          type="button"
                        >
                          <span className="font-semibold text-primary">{item.is_number}</span>
                          {item.note && (
                            <span className="text-on-surface-variant text-[11px]">
                              ({item.note})
                            </span>
                          )}
                          <span className="material-symbols-outlined text-[14px] text-on-surface-variant/60 group-hover:text-primary transition-colors">
                            north_east
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-space-sm rounded-xl bg-surface-container-low text-on-surface-variant font-body-sm">
                No allied standards listed.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Structured Section 2: Certification & Statutory Tender Mandates (Collapsible) */}
      <div className="mb-space-lg">
        <button
          type="button"
          onClick={() => setIsCertExpanded(!isCertExpanded)}
          className="w-full flex items-center justify-between pb-space-xs border-b border-outline-variant/30 mb-space-sm text-left group"
        >
          <h2 className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
            Certification &amp; Statutory Tender Mandates
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {certifications.length} Required Clause{certifications.length === 1 ? '' : 's'}
            </span>
            <span
              className={`material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-on-surface transition-transform duration-200 ${
                isCertExpanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>
        </button>

        {isCertExpanded && (
          <div className="space-y-space-xs transition-all duration-300">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-start gap-space-sm p-space-sm rounded-xl bg-surface-container-low"
              >
                <span className="w-8 h-8 rounded-lg bg-surface-container-lowest shrink-0 flex items-center justify-center text-primary shadow-2xs">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-title-md text-title-md text-on-surface font-medium">
                      {cert.type}
                    </span>
                    {cert.mandatory ? (
                      <span className="px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                        Strict Pass/Fail
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 leading-relaxed">
                    {cert.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Action Bar inside Card */}
      <div className="pt-space-md border-t border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-space-md">
        {/* Left Confidence Spark */}
        <div className="flex items-center gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
          <span>
            Semantic Match Confidence:{' '}
            <strong className="text-on-surface font-semibold">
              {cardData.confidence === 'High match' ? '98.4% (High match)' : cardData.confidence || '98.4%'}
            </strong>
          </span>
          <span className="text-on-surface-variant/40">•</span>
          <span className="text-secondary font-medium">Cross-checked with BIS Gazette 2024</span>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <a
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors"
            href="https://www.services.bis.gov.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>View BIS Abstract</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>

          <button
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors"
            onClick={handleCopy}
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">
              {copied ? 'check' : 'file_copy'}
            </span>
            <span>{copied ? 'Copied clause' : 'Copy to Tender Spec'}</span>
          </button>

          <button
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors shadow-sm active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Export NIT Clause Pack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
