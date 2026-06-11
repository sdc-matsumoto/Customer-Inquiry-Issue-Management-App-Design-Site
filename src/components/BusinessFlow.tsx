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

const inquiryFlow = `flowchart TD
    A[受付] --> B[新規登録]
    B --> C[担当者確認]
    C --> D[対応開始]
    D --> E{追加調査?}
    E -->|はい| F[顧客回答]
    E -->|いいえ| G[対応完了]
    F --> H[保留]
    H --> I[再開]
    I --> G
    G --> J[完了]
    J --> K[クローズ]`;

const incidentFlow = `flowchart TD
    A[障害発生] --> B[登録]
    B --> C[調査]
    C --> D[原因特定]
    D --> E[修正]
    E --> F[動作確認]
    F --> G[顧客確認]
    G --> H[完了]`;

const historyFlow = `flowchart TD
    A[対応実施] --> B[履歴追加]
    B --> C[対応時間入力]
    C --> D[保存]`;

const statusColors = [
  { status: '未対応', color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { status: '対応中', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  { status: '保留', color: 'bg-gray-200 text-gray-700 border-gray-400' },
  { status: '完了', color: 'bg-green-100 text-green-800 border-green-300' },
];

export default function BusinessFlow() {
  const inquiryRef = useRef<HTMLDivElement>(null);
  const incidentRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.run({
      nodes: [inquiryRef.current!, incidentRef.current!, historyRef.current!],
    });
  }, []);

  const cards = [
    { title: '問合せ対応フロー', ref: inquiryRef, diagram: inquiryFlow },
    { title: '障害対応フロー', ref: incidentRef, diagram: incidentFlow },
    { title: '対応履歴登録', ref: historyRef, diagram: historyFlow },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        02 業務フロー
      </h1>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {cards.slice(0, 2).map((card) => (
          <div key={card.title} className="border border-gray-200 rounded p-3 bg-white">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">{card.title}</h2>
            <div ref={card.ref} className="mermaid flex justify-center">{card.diagram}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded p-3 bg-white">
          <h2 className="text-sm font-semibold text-gray-700 mb-2">対応履歴登録</h2>
          <div ref={historyRef} className="mermaid flex justify-center">{historyFlow}</div>
        </div>
        <div className="border border-gray-200 rounded p-3 bg-white">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">ステータス遷移</h2>
          <div className="space-y-2">
            {statusColors.map((item, index) => (
              <div key={item.status} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400 text-xs">→</span>}
                <span className={`px-2 py-0.5 text-xs rounded border ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            未対応 → 対応中 → 保留 → 対応中 → 完了
          </p>
        </div>
      </div>
    </div>
  );
}
