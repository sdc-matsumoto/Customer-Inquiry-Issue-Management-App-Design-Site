import { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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

const screenTransitionDiagram = `flowchart TD
    A[ログイン<br/>SCR001] --> B[ダッシュボード<br/>SCR002]
    B --> C[インシデント一覧<br/>SCR003]

    C --> D[新規登録<br/>SCR004]
    C --> E[詳細<br/>SCR005]

    D --> C
    E --> F[編集]
    E --> G[完了]
    E --> H[履歴追加]

    B --> I[ユーザーマスタ<br/>SCR006]
    B --> J[顧客マスタ<br/>SCR007]

    I -.->|管理者のみ| B
    J -.->|管理者のみ| B

    style A fill:#f5f5f5,stroke:#666,stroke-width:1px
    style I fill:#e3f2fd,stroke:#1565c0,stroke-width:1px
    style J fill:#e3f2fd,stroke:#1565c0,stroke-width:1px`;

export default function ScreenTransition() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (diagramRef.current) {
      mermaid.run({
        nodes: [diagramRef.current],
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        05 画面遷移図
      </h1>

      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-gray-200 border border-gray-400 rounded-sm"></div>
          <span className="text-gray-600">全ユーザー</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded-sm"></div>
          <span className="text-gray-600">管理者のみ</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-0.5 bg-gray-600"></div>
          <span className="text-gray-600">画面遷移</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-0 border-t border-dashed border-gray-400"></div>
          <span className="text-gray-600">管理者ルート</span>
        </div>
      </div>

      {/* Screen Transition Diagram */}
      <div className="border border-gray-200 rounded p-4 bg-gray-50">
        <div ref={diagramRef} className="mermaid flex justify-center overflow-x-auto">
          {screenTransitionDiagram}
        </div>
      </div>

      {/* Transition Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="border border-gray-200 rounded p-3 bg-white">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">メインフロー</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ログイン → ダッシュボード → インシデント一覧 → 詳細/新規登録
          </p>
        </div>
        <div className="border border-gray-200 rounded p-3 bg-white">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">詳細画面遷移</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            詳細画面から編集、完了、履歴追加へ遷移可能
          </p>
        </div>
        <div className="border border-gray-200 rounded p-3 bg-white">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">管理者ルート</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            ユーザーマスタ、顧客マスタは管理者のみアクセス可能
          </p>
        </div>
      </div>
    </div>
  );
}
