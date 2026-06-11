import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Target, Users, Code, ListChecks } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#e3f2fd',
    primaryTextColor: '#1565c0',
    primaryBorderColor: '#90caf9',
    lineColor: '#64748b',
    fontFamily: 'system-ui, sans-serif',
  },
});

const summaryCards = [
  {
    title: 'システム目的',
    icon: Target,
    content: '顧客からの問合せおよび障害情報を一元管理し、対応状況の可視化と対応履歴管理を行うことで、情報共有と対応品質向上を実現する。',
  },
  {
    title: '利用者',
    icon: Users,
    content: '一般ユーザー、管理者',
  },
  {
    title: '技術構成',
    icon: Code,
    content: 'Laravel、PHP、JavaScript、Vue.js、Bootstrap5、SQLite',
  },
  {
    title: '主要機能',
    icon: ListChecks,
    content: 'ログイン、ダッシュボード、インシデント一覧、インシデント登録、インシデント詳細、ユーザーマスタ、顧客マスタ',
  },
];

const systemDiagram = `flowchart TB
    subgraph Client["クライアント"]
        Browser["ブラウザ"]
    end

    subgraph Server["サーバー"]
        Laravel["Laravel<br/>PHP"]
    end

    subgraph Database["データベース"]
        SQLite["SQLite"]
    end

    Browser -->|HTTP| Laravel
    Laravel -->|SQL| SQLite`;

export default function SystemOverview() {
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaid.run({
        nodes: [mermaidRef.current],
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        01 システム概要
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="border border-gray-200 rounded p-3 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-gray-500" />
                <span className="font-semibold text-gray-700 text-sm">{card.title}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{card.content}</p>
            </div>
          );
        })}
      </div>

      {/* System Configuration Diagram */}
      <div className="border border-gray-200 rounded p-4 bg-gray-50">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">システム構成図</h2>
        <div ref={mermaidRef} className="mermaid flex justify-center">{systemDiagram}</div>
      </div>
    </div>
  );
}
