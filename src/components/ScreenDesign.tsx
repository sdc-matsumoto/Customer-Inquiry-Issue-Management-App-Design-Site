function InputTable({ items }: { items: { name: string; physical?: string; type?: string; note?: string }[] }) {
  return (
    <table className="w-full text-xs">
      <thead className="bg-gray-50">
        <tr>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">項目名</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-28">物理名</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-20">型</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">備考</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border-b border-gray-100 px-2 py-1">{item.name}</td>
            <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.physical || '-'}</td>
            <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.type || '-'}</td>
            <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{item.note || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function EventTable({ events }: { events: { trigger: string; success: string; failure?: string }[] }) {
  return (
    <table className="w-full text-xs">
      <thead className="bg-gray-50">
        <tr>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-28">トリガー</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">成功時</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-32">失敗時</th>
        </tr>
      </thead>
      <tbody>
        {events.map((e, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border-b border-gray-100 px-2 py-1">{e.trigger}</td>
            <td className="border-b border-gray-100 px-2 py-1 text-green-700">{e.success}</td>
            <td className="border-b border-gray-100 px-2 py-1 text-red-600">{e.failure || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function FormInputTable({ items }: { items: { name: string; physical: string; type: string; required: boolean }[] }) {
  return (
    <table className="w-full text-xs">
      <thead className="bg-gray-50">
        <tr>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">項目名</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-28">物理名</th>
          <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700 w-20">型</th>
          <th className="border-b border-gray-200 px-2 py-1 text-center font-semibold text-gray-700 w-10">必須</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="border-b border-gray-100 px-2 py-1">{item.name}</td>
            <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.physical}</td>
            <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.type}</td>
            <td className="border-b border-gray-100 px-2 py-1 text-center">
              {item.required ? <span className="text-red-500 font-bold">○</span> : ''}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LayoutDiagram({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <div className="border border-gray-300 rounded p-2 bg-gray-50">
      <div className="text-xs text-center text-gray-500 mb-1">{title}</div>
      {children}
    </div>
  );
}

// SCR001 Login Layout
function LoginLayout() {
  return (
    <LayoutDiagram title="画面構成図">
      <div className="border border-gray-400 rounded bg-white p-3">
        <div className="w-64 mx-auto">
          <div className="bg-gray-100 px-3 py-2 rounded text-center text-sm font-semibold mb-3">
            ログイン
          </div>
          <div className="space-y-2 mb-3">
            <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-400">
              ログインID
            </div>
            <div className="border border-gray-300 rounded px-2 py-1.5 text-xs text-gray-400">
              パスワード
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-1.5 rounded text-xs">
            ログイン
          </button>
        </div>
      </div>
    </LayoutDiagram>
  );
}

// SCR002 Dashboard Layout
function DashboardLayout() {
  return (
    <LayoutDiagram title="画面構成図">
      <div className="border border-gray-400 rounded bg-white overflow-hidden">
        <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2 mb-3">
            {['未対応', '対応中', '保留', '完了'].map((s) => (
              <div key={s} className="bg-gray-100 border-l-4 border-blue-500 rounded p-2">
                <div className="text-xs text-gray-600">{s}件数</div>
                <div className="text-lg font-bold">12</div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-xs font-semibold">最近更新された案件</span>
            <div className="flex gap-1">
              <button className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs">新規登録</button>
              <button className="px-2 py-0.5 border border-gray-300 text-gray-600 rounded text-xs">一覧へ</button>
            </div>
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded p-2 mb-1 bg-gray-50">
              <div className="text-xs text-gray-600">インシデント{i}</div>
            </div>
          ))}
        </div>
      </div>
    </LayoutDiagram>
  );
}

// SCR003 Incident List Layout
function IncidentListLayout() {
  return (
    <LayoutDiagram title="画面構成図">
      <div className="border border-gray-400 rounded bg-white overflow-hidden">
        <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
        <div className="flex">
          {/* Left Filter Panel */}
          <div className="w-28 border-r border-gray-200 p-2 bg-gray-50">
            <div className="text-xs font-semibold mb-2">検索条件</div>
            {['顧客名', 'ステータス', '担当者', '対象区分', '日付From', '日付To'].map((f) => (
              <div key={f} className="border border-gray-300 rounded px-1 py-0.5 text-xs mb-1 text-gray-400">
                {f}
              </div>
            ))}
            <div className="text-xs mt-2 mb-1">クイック</div>
            <div className="text-xs text-gray-500">☑ 自分の案件</div>
            <div className="text-xs text-gray-500">☑ 未完了のみ</div>
            <div className="flex gap-1 mt-2">
              <button className="flex-1 bg-blue-600 text-white px-1 py-0.5 rounded text-xs">検索</button>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 p-2">
            {/* Summary */}
            <div className="grid grid-cols-4 gap-1 mb-2">
              {['未対応', '対応中', '保留', '完了'].map((s) => (
                <div key={s} className="bg-gray-100 p-1 rounded text-center">
                  <div className="text-xs text-gray-600">{s}</div>
                  <div className="text-xs font-bold">5</div>
                </div>
              ))}
            </div>
            {/* New Button */}
            <div className="text-right mb-2">
              <button className="px-2 py-0.5 bg-blue-600 text-white rounded text-xs">新規登録</button>
            </div>
            {/* List Cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded p-2 mb-1 bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs">対応中</span>
                  <span className="text-xs font-medium">株式会社サンプル インシデント{i}</span>
                </div>
                <div className="flex gap-1 mt-1">
                  <button className="px-1.5 py-0.5 bg-blue-500 text-white rounded text-xs">詳細</button>
                  <button className="px-1.5 py-0.5 border border-gray-300 rounded text-xs">編集</button>
                  <button className="px-1.5 py-0.5 bg-green-500 text-white rounded text-xs">完了</button>
                </div>
              </div>
            ))}
            {/* Pagination */}
            <div className="flex justify-center gap-0.5 mt-2">
              {['1', '2', '3'].map((p) => (
                <button key={p} className={`px-2 py-0.5 rounded text-xs ${p === '1' ? 'bg-blue-500 text-white' : 'border border-gray-300'}`}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutDiagram>
  );
}

function ScreenSection({
  id,
  title,
  description,
  api,
  tables,
  children,
  layoutDiagram,
}: {
  id: string;
  title: string;
  description: string;
  api: string;
  tables: string[];
  children: React.ReactNode;
  layoutDiagram: React.ReactNode;
}) {
  return (
    <div className="border border-gray-200 rounded mb-4 overflow-hidden">
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200 flex items-center gap-2">
        <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-mono">{id}</span>
        <span className="font-semibold text-gray-800">{title}</span>
      </div>
      <div className="p-3">
        <div className="grid grid-cols-5 gap-3 mb-3">
          {/* Overview Card */}
          <div className="col-span-2 border border-gray-200 rounded p-2 bg-white">
            <div className="text-xs font-semibold text-gray-600 mb-1">画面概要</div>
            <p className="text-xs text-gray-700 mb-2">{description}</p>
            <div className="space-y-1 text-xs">
              <div>
                <span className="text-gray-500">使用API: </span>
                <span className="font-mono text-blue-600">{api}</span>
              </div>
              <div>
                <span className="text-gray-500">使用テーブル: </span>
                <span className="font-mono text-gray-700">{tables.join(', ')}</span>
              </div>
            </div>
          </div>
          {/* Layout Diagram */}
          <div className="col-span-3">
            {layoutDiagram}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ScreenDesign() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        10 画面設計
      </h1>

      {/* SCR001 Login */}
      <ScreenSection
        id="SCR001"
        title="ログイン"
        description="ログイン認証を行う。認証成功時にダッシュボードへ遷移する。"
        api="POST /login"
        tables={['users']}
        layoutDiagram={<LoginLayout />}
      >
        <div className="grid grid-cols-3 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">入力項目</div>
            <InputTable items={[
              { name: 'ログインID', physical: 'login_id', type: 'VARCHAR', note: '必須' },
              { name: 'パスワード', physical: 'password', type: 'VARCHAR', note: '必須' },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="border border-gray-200 rounded p-2 bg-gray-50">
              <button className="w-full bg-blue-600 text-white py-1.5 rounded text-xs">ログイン</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
            <EventTable events={[
              { trigger: 'ログイン押下', success: 'ダッシュボードへ遷移', failure: 'エラーメッセージ表示' },
            ]} />
          </div>
        </div>
      </ScreenSection>

      {/* SCR002 Dashboard */}
      <ScreenSection
        id="SCR002"
        title="ダッシュボード"
        description="インシデント状況を一望できるサマリー画面。ステータス別件数と最近更新された案件を表示する。"
        api="GET /incidents"
        tables={['incidents']}
        layoutDiagram={<DashboardLayout />}
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">表示項目</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">項目名</th>
                  <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">説明</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: '未対応件数', desc: '未対応ステータスの件数' },
                  { name: '対応中件数', desc: '対応中ステータスの件数' },
                  { name: '保留件数', desc: '保留ステータスの件数' },
                  { name: '完了件数', desc: '完了ステータスの件数' },
                  { name: '最近更新案件', desc: '更新日時降順5件' },
                ].map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-b border-gray-100 px-2 py-1">{item.name}</td>
                    <td className="border-b border-gray-100 px-2 py-1 text-gray-600">{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-gray-200 text-gray-700 py-1.5 rounded text-xs hover:bg-gray-300">一覧へ</button>
              <button className="bg-blue-600 text-white py-1.5 rounded text-xs hover:bg-blue-700">新規登録</button>
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-3 mb-1">画面遷移</div>
            <div className="border border-gray-200 rounded p-2 bg-gray-50 text-xs">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">一覧へ</span>
                <span>→</span>
                <span className="text-gray-600">SCR003</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">新規登録</span>
                <span>→</span>
                <span className="text-gray-600">SCR004</span>
              </div>
            </div>
          </div>
        </div>
      </ScreenSection>

      {/* SCR003 Incident List */}
      <div className="border-2 border-blue-500 rounded mb-4 overflow-hidden">
        <div className="bg-blue-600 px-3 py-2 flex items-center gap-2">
          <span className="bg-white text-blue-600 px-2 py-0.5 rounded text-xs font-mono font-bold">SCR003</span>
          <span className="font-semibold text-white">インシデント一覧</span>
          <span className="ml-auto text-xs text-blue-100">最重要画面</span>
        </div>
        <div className="p-3">
          {/* Overview and Layout */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            <div className="col-span-2 border border-gray-200 rounded p-2 bg-white">
              <div className="text-xs font-semibold text-gray-600 mb-1">画面概要</div>
              <p className="text-xs text-gray-700 mb-2">顧客問合せおよび障害情報を一覧管理する。フィルタ検索、サマリー表示、カード形式での一覧表示を行う。</p>
              <div className="space-y-1 text-xs">
                <div>
                  <span className="text-gray-500">使用API: </span>
                  <span className="font-mono text-blue-600">GET /incidents</span>
                </div>
                <div>
                  <span className="text-gray-500">使用テーブル: </span>
                  <span className="font-mono text-gray-700">incidents, incident_work_logs, customers, users</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="text-xs font-semibold text-gray-600 mb-1">使用共通部品</div>
                <div className="flex flex-wrap gap-1">
                  {['検索パネル', 'サマリーカード', '一覧カード', 'ステータスバッジ', 'ページネーション'].map((c) => (
                    <span key={c} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{c}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <IncidentListLayout />
            </div>
          </div>

          {/* Input and Events */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">入力項目一覧</div>
              <InputTable items={[
                { name: '顧客名', physical: 'customer_name', type: 'VARCHAR', note: '部分一致' },
                { name: 'タイトル', physical: 'title', type: 'VARCHAR', note: '部分一致' },
                { name: '問合せ内容', physical: 'inquiry_detail', type: 'TEXT', note: '部分一致' },
                { name: 'ステータス', physical: 'status', type: 'VARCHAR' },
                { name: '担当者', physical: 'user_id', type: 'BIGINT' },
                { name: '対象区分', physical: 'target_type', type: 'VARCHAR' },
                { name: '日付From', physical: 'date_from', type: 'DATE' },
                { name: '日付To', physical: 'date_to', type: 'DATE' },
              ]} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">一覧カード表示項目</div>
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">項目名</th>
                    <th className="border-b border-gray-200 px-2 py-1 text-left font-semibold text-gray-700">位置</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'ステータス', pos: 'カード左部' },
                    { name: '顧客名', pos: 'カード中央上段' },
                    { name: '件名', pos: 'カード中央上段' },
                    { name: '最新対応者', pos: 'カード中央下段' },
                    { name: '発生日', pos: 'カード右部' },
                    { name: '対象区分', pos: 'カード中央下段' },
                  ].map((item, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border-b border-gray-100 px-2 py-1">{item.name}</td>
                      <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{item.pos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
              <EventTable events={[
                { trigger: '検索押下', success: '一覧更新', failure: 'エラー表示' },
                { trigger: 'クリア押下', success: '条件クリア' },
                { trigger: '詳細押下', success: 'SCR005へ遷移' },
                { trigger: '編集押下', success: '編集モード切替' },
                { trigger: '完了押下', success: '確認モーダル表示' },
              ]} />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">サマリー表示</div>
              <div className="grid grid-cols-4 gap-1">
                {['未対応', '対応中', '保留', '完了'].map((s) => (
                  <div key={s} className="bg-gray-100 p-1.5 rounded text-center">
                    <div className="text-xs text-gray-600">{s}</div>
                    <div className="text-sm font-bold">件数</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
              <div className="flex flex-wrap gap-1">
                <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">新規登録</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">検索</button>
                <button className="border border-gray-300 px-2 py-1 rounded text-xs">クリア</button>
                <button className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-xs">詳細</button>
                <button className="border border-gray-300 px-1.5 py-0.5 rounded text-xs">編集</button>
                <button className="bg-green-500 text-white px-1.5 py-0.5 rounded text-xs">完了</button>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">権限制御</div>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-green-600">●</span>
                  <span>一般ユーザー: 利用可能</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-green-600">●</span>
                  <span>管理者: 利用可能</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">エラーメッセージ</div>
              <div className="space-y-1 text-xs">
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">検索条件が不正です</div>
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">データ取得に失敗しました</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCR004 Incident Registration */}
      <ScreenSection
        id="SCR004"
        title="インシデント登録"
        description="顧客からの問合せおよび障害情報を登録する。登録後は自動的に一覧へ遷移する。"
        api="POST /incidents"
        tables={['incidents', 'customers', 'users']}
        layoutDiagram={
          <LayoutDiagram title="画面構成図">
            <div className="border border-gray-400 rounded bg-white overflow-hidden">
              <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
              <div className="p-2 space-y-2">
                <div className="border border-gray-200 rounded p-2 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-600">基本情報</div>
                </div>
                <div className="border border-gray-200 rounded p-2 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-600">対象情報</div>
                </div>
                <div className="border border-gray-200 rounded p-2 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-600">内容</div>
                </div>
                <div className="border border-gray-200 rounded p-2 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-600">資料</div>
                </div>
                <div className="border border-gray-200 rounded p-2 bg-blue-50">
                  <div className="text-xs font-semibold text-blue-700">
                    ステータス：未対応（初期値）
                  </div>
                </div>
                <div className="flex gap-1 pt-1">
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">
                    登録
                  </button>
                  <button className="border border-gray-300 px-3 py-1 rounded text-xs">
                    クリア
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs">
                    一覧へ戻る
                  </button>
                </div>
              </div>
            </div>
          </LayoutDiagram>
        }
      >
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">基本情報</div>
            <FormInputTable items={[
              { name: '区分', physical: 'incident_type', type: 'VARCHAR', required: true },
              { name: '顧客', physical: 'customer_id', type: 'BIGINT', required: true },
              { name: '顧客担当者', physical: 'customer_contact_name', type: 'VARCHAR', required: false },
              { name: 'タイトル', physical: 'title', type: 'VARCHAR', required: true },
              { name: '発生日', physical: 'occurred_at', type: 'DATE', required: true },
              { name: '対応開始日', physical: 'started_at', type: 'DATE', required: false },
              { name: '対応終了日', physical: 'closed_at', type: 'DATE', required: false },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">対象情報</div>
            <FormInputTable items={[
              { name: '対象区分', physical: 'target_type', type: 'VARCHAR', required: false },
              { name: '対象名', physical: 'target_name', type: 'VARCHAR', required: false },
            ]} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">内容</div>
            <FormInputTable items={[
              { name: '問合せ内容', physical: 'inquiry_detail', type: 'TEXT', required: true },
              { name: '対応内容', physical: 'response_detail', type: 'TEXT', required: false },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">資料</div>
            <FormInputTable items={[
              { name: '資料保存先パス1', physical: 'document_path1', type: 'VARCHAR', required: false },
              { name: '資料保存先パス2', physical: 'document_path2', type: 'VARCHAR', required: false },
              { name: '資料保存先パス3', physical: 'document_path3', type: 'VARCHAR', required: false },
            ]} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="space-y-1">
              <button className="w-full bg-blue-600 text-white py-1.5 rounded text-xs">登録</button>
              <button className="w-full border border-gray-300 py-1.5 rounded text-xs">クリア</button>
              <button className="w-full bg-gray-200 text-gray-700 py-1.5 rounded text-xs">一覧へ戻る</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
            <EventTable events={[
              { trigger: '登録', success: 'SCR003へ遷移（一覧）', failure: 'エラー表示' },
              { trigger: 'クリア', success: '入力初期化' },
              { trigger: '戻る', success: 'SCR003へ遷移' },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">エラーメッセージ</div>
            <div className="space-y-1">
              {[
                '顧客を選択してください',
                'タイトルを入力してください',
                '問合せ内容を入力してください',
                '登録に失敗しました'
              ].map((e) => (
                <div key={e} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">{e}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">補足</div>
            <div className="text-xs text-gray-500">
              登録時ステータスは「未対応」で固定
            </div>
          </div>
        </div>
      </ScreenSection>

      {/* SCR005 Incident Detail */}
      <ScreenSection
        id="SCR005"
        title="インシデント詳細"
        description="インシデントの閲覧・更新・対応履歴管理を行う。ステータス変更・履歴追加が主要機能。"
        api="GET/PUT/PATCH /incidents/*"
        tables={['incidents', 'incident_work_logs', 'customers', 'users']}
        layoutDiagram={
          <LayoutDiagram title="画面構成図">
            <div className="border border-gray-400 rounded bg-white overflow-hidden">
              <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
              <div className="p-2 space-y-1.5 text-xs">
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <span className="font-semibold">基本情報（編集可）</span>
                </div>
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <span className="font-semibold">ステータス更新</span>
                </div>
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <span className="font-semibold">対象情報</span>
                </div>
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <span className="font-semibold">内容</span>
                </div>
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <span className="font-semibold">資料</span>
                </div>
                <div className="border border-blue-300 rounded p-1.5 bg-blue-50">
                  <span className="font-semibold text-blue-700">対応履歴</span>
                </div>
                <div className="flex gap-1">
                  <button className="bg-blue-600 text-white px-2 py-0.5 rounded">更新</button>
                  <button className="bg-green-600 text-white px-2 py-0.5 rounded">履歴追加</button>
                  <button className="bg-orange-500 text-white px-2 py-0.5 rounded">完了</button>
                  <button className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded">一覧へ戻る</button>
                </div>
              </div>
            </div>
          </LayoutDiagram>
        }
      >
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">基本情報（編集対象）</div>
            <table className="w-full text-xs">
              <tbody>
                {[
                  '区分',
                  '顧客',
                  '顧客担当者',
                  'タイトル',
                  '発生日',
                  '対応開始日',
                  '対応終了日'
                ].map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-2 py-1">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 p-2 bg-yellow-50 text-xs text-yellow-700 rounded">
              ステータスは別ブロックで更新
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">対応履歴（コア機能）</div>
            <table className="w-full text-xs border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-2 py-1 text-left">対応者</th>
                  <th className="px-2 py-1 text-left">日時</th>
                  <th className="px-2 py-1 text-center">時間</th>
                  <th className="px-2 py-1 text-left">作業内容</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50">
                  <td className="px-2 py-1 text-gray-400">-</td>
                  <td className="px-2 py-1 text-gray-400">-</td>
                  <td className="px-2 py-1 text-gray-400">-</td>
                  <td className="px-2 py-1 text-gray-400">-</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">履歴追加フォーム</div>
            <FormInputTable items={[
              { name: '対応者', physical: 'user_id', type: 'BIGINT', required: true },
              { name: '対応日時', physical: 'work_date', type: 'DATETIME', required: true },
              { name: '対応時間', physical: 'work_time', type: 'DECIMAL', required: true },
              { name: '作業内容', physical: 'work_detail', type: 'TEXT', required: true },
            ]} />
            <div className="mt-2 text-xs text-gray-500">
              ※履歴追加は即時反映（Ajax想定）
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="space-y-1">
              <button className="w-full bg-blue-600 text-white py-1 rounded text-xs">更新</button>
              <button className="w-full bg-green-600 text-white py-1 rounded text-xs">履歴追加</button>
              <button className="w-full bg-orange-500 text-white py-1 rounded text-xs">完了</button>
              <button className="w-full bg-gray-200 text-gray-700 py-1 rounded text-xs">一覧へ戻る</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
            <EventTable events={[
              { trigger: '更新', success: 'インシデント更新' },
              { trigger: '履歴追加', success: '履歴登録→一覧更新' },
              { trigger: '完了', success: 'ステータス完了へ更新' },
              { trigger: '戻る', success: 'SCR003へ戻る' },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">補足</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>・ステータス変更は履歴と連動</div>
              <div>・完了時は編集制限あり</div>
              <div>・履歴が最も重要データ</div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">エラー</div>
            <div className="space-y-1">
              {['更新失敗', '履歴登録失敗', 'ステータス更新失敗'].map((e) => (
                <div key={e} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </ScreenSection>

      {/* SCR006 User Master */}
      <ScreenSection
        id="SCR006"
        title="ユーザーマスタ"
        description="システム利用者を管理する。管理者のみ利用可能。"
        api="GET/POST/PUT /users"
        tables={['users']}
        layoutDiagram={
          <LayoutDiagram title="画面構成図">
            <div className="border border-gray-400 rounded bg-white overflow-hidden">
              <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
              <div className="p-2">
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50 mb-2">
                  <span className="text-xs font-semibold">検索条件</span>
                  <div className="flex gap-1 mt-1">
                    <input className="border border-gray-300 rounded px-1 py-0.5 text-xs w-16" placeholder="ログインID" />
                    <input className="border border-gray-300 rounded px-1 py-0.5 text-xs w-16" placeholder="ユーザー名" />
                    <select className="border border-gray-300 rounded px-1 py-0.5 text-xs w-14">
                      <option>管理者</option>
                    </select>
                    <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">検索</button>
                  </div>
                </div>
                <div className="text-right mb-1">
                  <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">新規登録</button>
                </div>
                <table className="w-full text-xs border border-gray-200 mb-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-1 py-0.5">ログインID</th>
                      <th className="border-b px-1 py-0.5">ユーザー名</th>
                      <th className="border-b px-1 py-0.5">管理者</th>
                      <th className="border-b px-1 py-0.5">作成日時</th>
                      <th className="border-b px-1 py-0.5">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="border-b px-1 py-0.5">admin</td>
                      <td className="border-b px-1 py-0.5">管理者</td>
                      <td className="border-b px-1 py-0.5 text-center">○</td>
                      <td className="border-b px-1 py-0.5">2024/01/01</td>
                      <td className="border-b px-1 py-0.5">
                        <button className="text-blue-600 text-xs">編集</button>
                        <button className="text-red-600 text-xs ml-1">削除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center gap-0.5">
                  {['1', '2', '3'].map((p) => (
                    <button key={p} className={`px-2 py-0.5 rounded text-xs ${p === '1' ? 'bg-blue-500 text-white' : 'border'}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </LayoutDiagram>
        }
      >
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">検索条件</div>
            <FormInputTable items={[
              { name: 'ログインID', physical: 'login_id', type: 'VARCHAR', required: false },
              { name: 'ユーザー名', physical: 'user_name', type: 'VARCHAR', required: false },
              { name: '管理者区分', physical: 'is_admin', type: 'BOOLEAN', required: false },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">一覧テーブル</div>
            <table className="w-full text-xs border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-2 py-1 text-left">列</th>
                </tr>
              </thead>
              <tbody>
                {['ログインID', 'ユーザー名', '管理者フラグ', '作成日時', '操作'].map((col, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-b border-gray-100 px-2 py-1">{col}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">モーダル入力項目</div>
            <FormInputTable items={[
              { name: 'ログインID', physical: 'login_id', type: 'VARCHAR', required: true },
              { name: 'パスワード', physical: 'password', type: 'VARCHAR', required: true },
              { name: 'ユーザー名', physical: 'user_name', type: 'VARCHAR', required: true },
              { name: '管理者区分', physical: 'is_admin', type: 'BOOLEAN', required: true },
            ]} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="flex flex-wrap gap-1">
              <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">新規登録</button>
              <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">保存</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">削除</button>
              <button className="border border-gray-300 px-2 py-1 rounded text-xs">閉じる</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
            <EventTable events={[
              { trigger: '検索', success: '一覧更新' },
              { trigger: 'クリア', success: '条件クリア' },
              { trigger: '新規登録', success: 'モーダル表示' },
              { trigger: '編集', success: 'モーダル表示' },
              { trigger: '保存', success: '登録/更新' },
              { trigger: '削除', success: '削除処理' },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">権限制御</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-red-600">x</span>
                <span>一般ユーザー: 利用不可</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">●</span>
                <span className="text-blue-600 font-semibold">管理者: 利用可能</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-2 mb-1">使用共通部品</div>
            <div className="flex flex-wrap gap-1">
              {['検索パネル', 'テーブル', 'モーダル', 'ページネーション'].map((c) => (
                <span key={c} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">エラーメッセージ</div>
            <div className="space-y-1">
              {['ログインIDを入力してください', 'ユーザー名を入力', 'パスワードを入力', '登録に失敗', '更新に失敗', '削除に失敗'].map((e) => (
                <div key={e} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </ScreenSection>

      {/* SCR007 Customer Master */}
      <ScreenSection
        id="SCR007"
        title="顧客マスタ"
        description="顧客情報を管理する。管理者のみ利用可能。"
        api="GET/POST/PUT /customers"
        tables={['customers']}
        layoutDiagram={
          <LayoutDiagram title="画面構成図">
            <div className="border border-gray-400 rounded bg-white overflow-hidden">
              <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
              <div className="p-2">
                <div className="border border-gray-200 rounded p-1.5 bg-gray-50 mb-2">
                  <span className="text-xs font-semibold">検索条件</span>
                  <div className="flex gap-1 mt-1">
                    <input className="border border-gray-300 rounded px-1 py-0.5 text-xs flex-1" placeholder="顧客名" />
                    <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">検索</button>
                    <button className="border border-gray-300 px-2 py-0.5 rounded text-xs">クリア</button>
                  </div>
                </div>
                <div className="text-right mb-1">
                  <button className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs">新規登録</button>
                </div>
                <table className="w-full text-xs border border-gray-200 mb-2">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border-b px-1 py-0.5">顧客ID</th>
                      <th className="border-b px-1 py-0.5">顧客名</th>
                      <th className="border-b px-1 py-0.5">作成日時</th>
                      <th className="border-b px-1 py-0.5">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50">
                      <td className="border-b px-1 py-0.5">1</td>
                      <td className="border-b px-1 py-0.5">株式会社サンプル</td>
                      <td className="border-b px-1 py-0.5">2024/01/01</td>
                      <td className="border-b px-1 py-0.5">
                        <button className="text-blue-600 text-xs">編集</button>
                        <button className="text-red-600 text-xs ml-1">削除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center gap-0.5">
                  {['1', '2', '3'].map((p) => (
                    <button key={p} className={`px-2 py-0.5 rounded text-xs ${p === '1' ? 'bg-blue-500 text-white' : 'border'}`}>{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </LayoutDiagram>
        }
      >
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">検索条件</div>
            <FormInputTable items={[
              { name: '顧客名', physical: 'customer_name', type: 'VARCHAR', required: false },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">一覧テーブル</div>
            <table className="w-full text-xs border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b px-2 py-1 text-left">列</th>
                </tr>
              </thead>
              <tbody>
                {['顧客ID', '顧客名', '作成日時', '操作'].map((col, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-b border-gray-100 px-2 py-1">{col}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">モーダル入力項目</div>
            <FormInputTable items={[
              { name: '顧客名', physical: 'customer_name', type: 'VARCHAR', required: true },
            ]} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
            <div className="flex flex-wrap gap-1">
              <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">新規登録</button>
              <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">保存</button>
              <button className="bg-red-600 text-white px-2 py-1 rounded text-xs">削除</button>
              <button className="border border-gray-300 px-2 py-1 rounded text-xs">閉じる</button>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
            <EventTable events={[
              { trigger: '検索', success: '一覧更新' },
              { trigger: 'クリア', success: '条件クリア' },
              { trigger: '新規登録', success: 'モーダル表示' },
              { trigger: '編集', success: 'モーダル表示' },
              { trigger: '保存', success: '登録/更新' },
              { trigger: '削除', success: '削除処理' },
            ]} />
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">権限制御</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-red-600">x</span>
                <span>一般ユーザー: 利用不可</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-600">●</span>
                <span className="text-blue-600 font-semibold">管理者: 利用可能</span>
              </div>
            </div>
            <div className="text-xs font-semibold text-gray-600 mt-2 mb-1">使用共通部品</div>
            <div className="flex flex-wrap gap-1">
              {['検索パネル', 'テーブル', 'モーダル', 'ページネーション'].map((c) => (
                <span key={c} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{c}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">エラーメッセージ</div>
            <div className="space-y-1">
              {['顧客名を入力してください', '登録に失敗しました', '更新に失敗しました', '削除に失敗しました'].map((e) => (
                <div key={e} className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">{e}</div>
              ))}
            </div>
          </div>
        </div>
      </ScreenSection>
    </div>
  );
}
