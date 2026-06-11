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

const erDiagram = `erDiagram
    customers ||--o{ incidents : "has"
    incidents ||--o{ incident_work_logs : "has"
    users ||--o{ incident_work_logs : "creates"
    users ||--o{ incidents : "created_by"
    users ||--o{ incidents : "updated_by"

    customers {
        bigint customer_id PK
        varchar customer_name
        datetime created_at
        datetime updated_at
    }

    users {
        bigint user_id PK
        varchar login_id
        varchar password
        varchar user_name
        boolean is_admin
        datetime created_at
        datetime updated_at
    }

    incidents {
        bigint incident_id PK
        varchar incident_no
        varchar incident_type
        bigint customer_id FK
        varchar customer_contact_name
        varchar title
        date occurred_at
        date started_at
        date closed_at
        varchar target_type
        varchar target_name
        text inquiry_detail
        text response_detail
        varchar status
        varchar document_path1
        varchar document_path2
        varchar document_path3
        bigint created_by FK
        bigint updated_by FK
        datetime created_at
        datetime updated_at
    }

    incident_work_logs {
        bigint work_log_id PK
        bigint incident_id FK
        bigint user_id FK
        datetime work_date
        decimal work_time
        text work_detail
        datetime created_at
        datetime updated_at
    }`;

const tableOverviewCards = [
  {
    title: 'users',
    description: 'ログインユーザー情報を管理する。認証処理および管理者判定で使用する。',
    items: ['ログインID', 'パスワード', 'ユーザー名', '管理者フラグ'],
  },
  {
    title: 'customers',
    description: '顧客情報を管理する。',
    items: ['顧客名'],
  },
  {
    title: 'incidents',
    description: '問合せおよび障害情報を管理する主テーブル。',
    items: ['顧客', '件名', '発生日', '対応内容', 'ステータス'],
  },
  {
    title: 'incident_work_logs',
    description: '対応履歴を管理する。',
    items: ['対応者', '対応日時', '対応時間', '作業内容'],
  },
];

const usersColumns = [
  { logical: 'ユーザーID', physical: 'user_id', type: 'BIGINT', pk: true, fk: false, nullable: false, description: '主キー' },
  { logical: 'ログインID', physical: 'login_id', type: 'VARCHAR(50)', pk: false, fk: false, nullable: false, description: 'ログインID' },
  { logical: 'パスワード', physical: 'password', type: 'VARCHAR(255)', pk: false, fk: false, nullable: false, description: 'ハッシュ化して保存' },
  { logical: 'ユーザー名', physical: 'user_name', type: 'VARCHAR(100)', pk: false, fk: false, nullable: false, description: '表示名' },
  { logical: '管理者フラグ', physical: 'is_admin', type: 'BOOLEAN', pk: false, fk: false, nullable: false, description: '管理者判定' },
  { logical: '作成日時', physical: 'created_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '作成日時' },
  { logical: '更新日時', physical: 'updated_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '更新日時' },
];

const customersColumns = [
  { logical: '顧客ID', physical: 'customer_id', type: 'BIGINT', pk: true, fk: false, nullable: false, description: '主キー' },
  { logical: '顧客名', physical: 'customer_name', type: 'VARCHAR(200)', pk: false, fk: false, nullable: false, description: '顧客名称' },
  { logical: '作成日時', physical: 'created_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '作成日時' },
  { logical: '更新日時', physical: 'updated_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '更新日時' },
];

const incidentsColumns = [
  { logical: 'インシデントID', physical: 'incident_id', type: 'BIGINT', pk: true, fk: false, nullable: false, description: '主キー' },
  { logical: '管理番号', physical: 'incident_no', type: 'VARCHAR(20)', pk: false, fk: false, nullable: false, description: '表示用番号' },
  { logical: '区分', physical: 'incident_type', type: 'VARCHAR(20)', pk: false, fk: false, nullable: false, description: '問合せ/障害' },
  { logical: '顧客ID', physical: 'customer_id', type: 'BIGINT', pk: false, fk: true, nullable: false, description: '顧客ID' },
  { logical: '顧客担当者', physical: 'customer_contact_name', type: 'VARCHAR(100)', pk: false, fk: false, nullable: true, description: '顧客担当者' },
  { logical: 'タイトル', physical: 'title', type: 'VARCHAR(200)', pk: false, fk: false, nullable: false, description: '件名' },
  { logical: '発生日', physical: 'occurred_at', type: 'DATE', pk: false, fk: false, nullable: false, description: '発生日' },
  { logical: '対応開始日', physical: 'started_at', type: 'DATE', pk: false, fk: false, nullable: true, description: '対応開始日' },
  { logical: '対応終了日', physical: 'closed_at', type: 'DATE', pk: false, fk: false, nullable: true, description: '対応終了日' },
  { logical: '対象区分', physical: 'target_type', type: 'VARCHAR(100)', pk: false, fk: false, nullable: true, description: 'サーバ、システムなど' },
  { logical: '対象名', physical: 'target_name', type: 'VARCHAR(200)', pk: false, fk: false, nullable: true, description: '対象名称' },
  { logical: '問合せ内容', physical: 'inquiry_detail', type: 'TEXT', pk: false, fk: false, nullable: true, description: '内容' },
  { logical: '対応内容', physical: 'response_detail', type: 'TEXT', pk: false, fk: false, nullable: true, description: '対応内容' },
  { logical: 'ステータス', physical: 'status', type: 'VARCHAR(20)', pk: false, fk: false, nullable: false, description: '未対応、対応中、保留、完了' },
  { logical: '資料保存先1', physical: 'document_path1', type: 'VARCHAR(500)', pk: false, fk: false, nullable: true, description: '共有フォルダパス' },
  { logical: '資料保存先2', physical: 'document_path2', type: 'VARCHAR(500)', pk: false, fk: false, nullable: true, description: '共有フォルダパス' },
  { logical: '資料保存先3', physical: 'document_path3', type: 'VARCHAR(500)', pk: false, fk: false, nullable: true, description: '共有フォルダパス' },
  { logical: '作成者', physical: 'created_by', type: 'BIGINT', pk: false, fk: true, nullable: false, description: '登録者' },
  { logical: '更新者', physical: 'updated_by', type: 'BIGINT', pk: false, fk: true, nullable: false, description: '更新者' },
  { logical: '作成日時', physical: 'created_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '作成日時' },
  { logical: '更新日時', physical: 'updated_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '更新日時' },
];

const workLogsColumns = [
  { logical: '履歴ID', physical: 'work_log_id', type: 'BIGINT', pk: true, fk: false, nullable: false, description: '主キー' },
  { logical: 'インシデントID', physical: 'incident_id', type: 'BIGINT', pk: false, fk: true, nullable: false, description: '親インシデント' },
  { logical: '対応者ID', physical: 'user_id', type: 'BIGINT', pk: false, fk: true, nullable: false, description: '対応者' },
  { logical: '対応日時', physical: 'work_date', type: 'DATETIME', pk: false, fk: false, nullable: false, description: '対応日時' },
  { logical: '対応時間', physical: 'work_time', type: 'DECIMAL(5,2)', pk: false, fk: false, nullable: true, description: '時間(h)' },
  { logical: '作業内容', physical: 'work_detail', type: 'TEXT', pk: false, fk: false, nullable: true, description: '作業内容' },
  { logical: '作成日時', physical: 'created_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '作成日時' },
  { logical: '更新日時', physical: 'updated_at', type: 'DATETIME', pk: false, fk: false, nullable: true, description: '更新日時' },
];

function TableSection({ title, columns }: { title: string; columns: typeof usersColumns }) {
  return (
    <div className="border border-gray-200 rounded mb-3 overflow-hidden">
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
        <span className="font-semibold text-sm text-gray-700">{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">論理名</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">物理名</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-24">型</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-8">PK</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-8">FK</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-8">NULL</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">説明</th>
            </tr>
          </thead>
          <tbody>
            {columns.map((col, index) => (
              <tr key={col.physical} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-800">{col.logical}</td>
                <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{col.physical}</td>
                <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{col.type}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-center">
                  {col.pk ? <span className="text-blue-600 font-bold">○</span> : ''}
                </td>
                <td className="border-b border-gray-100 px-2 py-1 text-center">
                  {col.fk ? <span className="text-orange-600 font-bold">○</span> : ''}
                </td>
                <td className="border-b border-gray-100 px-2 py-1 text-center">
                  {col.nullable ? <span className="text-gray-400">○</span> : ''}
                </td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-600">{col.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function DatabaseDesign() {
  const erRef = useRef<HTMLDivElement>(null);
  const relationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.run({
      nodes: [erRef.current!, relationRef.current!],
    });
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        06 DB設計
      </h1>

      {/* ER Diagram */}
      <div className="border border-gray-200 rounded p-3 mb-4 bg-white">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">ER図</h2>
        <div ref={erRef} className="mermaid flex justify-center overflow-x-auto">{erDiagram}</div>
      </div>

      {/* Table Overview Cards */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {tableOverviewCards.map((card) => (
          <div key={card.title} className="border border-gray-200 rounded p-2 bg-white">
            <div className="flex items-center gap-1 mb-1">
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-semibold">
                {card.title}
              </span>
            </div>
            <p className="text-xs text-gray-600 mb-1">{card.description}</p>
            <p className="text-xs text-gray-500">主な保持情報: {card.items.join(', ')}</p>
          </div>
        ))}
      </div>

      {/* Table Definitions */}
      <TableSection title="users" columns={usersColumns} />
      <TableSection title="customers" columns={customersColumns} />
      <TableSection title="incidents" columns={incidentsColumns} />
      <TableSection title="incident_work_logs" columns={workLogsColumns} />

      {/* Relation Explanation */}
      <div className="border border-gray-200 rounded p-3 bg-white">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">リレーション説明</h2>
        <div ref={relationRef} className="mermaid flex justify-center">{`
flowchart TB
    subgraph Main["メインフロー"]
        customers["customers"] --> incidents["incidents"]
        incidents --> incident_work_logs["incident_work_logs"]
    end

    subgraph Users["ユーザー関連"]
        users["users"]
    end

    users -.->|"created_by/updated_by"| incidents
    users -.->|"user_id"| incident_work_logs

    style customers fill:#e3f2fd,stroke:#1565c0
    style incidents fill:#fff3e0,stroke:#f57c00
    style incident_work_logs fill:#e8f5e9,stroke:#388e3c
    style users fill:#fce4ec,stroke:#c2185b
`}</div>
      </div>
    </div>
  );
}
