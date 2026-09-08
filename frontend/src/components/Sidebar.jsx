import React from 'react';
import Logo from './Logo';

export default function Sidebar({
  onNewQuery,
  selectedQueryId = null,
  onSelectQuery,
  isCollapsed = false,
  onToggleCollapse,
}) {
  const historyItems = [
    {
      id: 'structural-tubes-demo-query',
      title: 'Mild steel structural tubes for building tender',
      meta: 'Just now · IS 1161:2014',
    },
    {
      id: 'submersible-pumps-query',
      title: 'Submersible pumps for rural water scheme',
      meta: '2h ago · IS 8034',
    },
    {
      id: 'fire-resistant-cables-query',
      title: 'Fire-resistant cables 1.1kV IS 694',
      meta: 'Yesterday · IS/IEC 60331',
    },
    {
      id: 'structural-steel-query',
      title: 'Structural steel sections for bridge span',
      meta: '3 days ago · IS 2062',
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full w-[260px] bg-surface-container-low border-r border-outline-variant/30 z-50 flex flex-col justify-between select-none transition-transform duration-300 ${
        isCollapsed ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="flex flex-col h-[calc(100%-80px)]">
        {/* Brand Header */}
        <div className="h-14 px-space-md flex items-center justify-between">
          <div
            className="flex items-center gap-space-xs cursor-pointer"
            onClick={onNewQuery}
            title="Go to home"
          >
            <Logo className="w-6 h-6" rounded="rounded-md" />
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">
              IS Recommender
            </span>
          </div>
          <button
            aria-label="Collapse sidebar"
            className="p-1 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors"
            type="button"
            onClick={onToggleCollapse}
          >
            <span className="material-symbols-outlined text-[18px]">dock_to_left</span>
          </button>
        </div>

        {/* New Specification Button */}
        <div className="px-space-md pt-space-xs pb-space-md">
          <button
            className="w-full flex items-center justify-between px-space-md py-2.5 bg-surface-container-lowest border border-outline-variant/50 hover:border-primary/40 rounded-xl text-on-surface hover:bg-surface transition-all shadow-[0_1px_4px_rgba(0,0,0,0.02)] group"
            type="button"
            onClick={onNewQuery}
          >
            <span className="flex items-center gap-space-xs font-title-md text-title-md text-primary group-hover:text-primary-container">
              <span className="material-symbols-outlined text-[20px]">add</span>
              New Specification
            </span>
            <span className="font-code-sm text-code-sm text-on-surface-variant/70 border border-outline-variant/40 rounded px-1.5 py-0.5 bg-surface-container-low">
              ⌘K
            </span>
          </button>
        </div>

        {/* Recent Specifications Label */}
        <div className="px-space-md py-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant/80 font-semibold">
            Recent Specifications
          </span>
        </div>

        {/* Navigation History List */}
        <nav className="flex-1 overflow-y-auto px-space-xs space-y-0.5 mt-1">
          {historyItems.map((item) => {
            const isActive = selectedQueryId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectQuery && onSelectQuery(item.id)}
                className={`w-full text-left flex flex-col px-space-sm py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-surface-container text-primary font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="font-body-md text-body-md truncate">{item.title}</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant/60 mt-0.5">
                  {item.meta}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="h-20 px-space-md border-t border-outline-variant/30 flex flex-col justify-center gap-1 bg-surface-container-low">
        <a
          className="flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface py-1 transition-colors"
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          <span className="font-label-md text-label-md">BIS Repository Standards</span>
        </a>
        <div className="flex items-center justify-between pt-0.5">
          <a
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface py-0.5 transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined text-[16px]">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </a>
          <a
            className="flex items-center gap-1.5 text-on-surface-variant hover:text-on-surface py-0.5 transition-colors"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            <span className="material-symbols-outlined text-[16px]">help_outline</span>
            <span className="font-label-sm text-label-sm">Help &amp; Guidelines</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
