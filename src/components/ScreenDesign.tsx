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

// SCR004 Incident Form Layout
function IncidentFormLayout() {
  return (
    <LayoutDiagram title="画面構成図">
      <div className="border border-gray-400 rounded bg-white overflow-hidden">
        <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
        <div className="p-2 space-y-2">
          {/* 基本情報セクション */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300">基本情報</div>
            <div className="p-2 grid grid-cols-2 gap-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">会社名</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400">株式会社サンプル</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">件名</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400">インシデント件名</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">ステータス</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-gray-50">未対応</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">担当者</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-gray-50">山田 太郎</div>
              </div>
            </div>
          </div>
          {/* 対象情報セクション */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300">対象情報</div>
            <div className="p-2 grid grid-cols-2 gap-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">対象区分</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-gray-50">問合せ</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">対象名</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400">対象システム名</div>
              </div>
            </div>
          </div>
          {/* 内容セクション */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300">内容</div>
            <div className="p-2 space-y-1">
              <div className="flex items-start gap-1">
                <span className="text-xs text-gray-500 w-16">内容</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 h-8">問合せ内容...</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">発生日</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400">2024/01/15</div>
              </div>
            </div>
          </div>
          {/* 資料セクション */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300">資料</div>
            <div className="p-2 space-y-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 w-16">添付ファイル</span>
                <button className="border border-gray-300 rounded px-2 py-0.5 text-xs text-gray-600">ファイル選択</button>
              </div>
              <div className="text-xs text-gray-400 px-16">選択されていません</div>
            </div>
          </div>
          {/* ボタンエリア */}
          <div className="flex justify-end gap-2 pt-1">
            <button className="border border-gray-300 px-3 py-1 rounded text-xs">戻る</button>
            <button className="border border-gray-300 px-3 py-1 rounded text-xs">クリア</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">保存</button>
          </div>
        </div>
      </div>
    </LayoutDiagram>
  );
}

// SCR005 Incident Detail Layout
function IncidentDetailLayout() {
  return (
    <LayoutDiagram title="画面構成図">
      <div className="border border-gray-400 rounded bg-white overflow-hidden">
        <div className="bg-gray-700 text-white text-xs text-center py-1">ヘッダー</div>
        <div className="p-2 space-y-2">
          {/* インシデント情報（表示のみ） */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300 flex justify-between">
              <span>インシデント情報</span>
              <span className="text-gray-500">表示のみ</span>
            </div>
            <div className="p-2 grid grid-cols-3 gap-1 text-xs">
              <div><span className="text-gray-500">会社名:</span> 株式会社サンプル</div>
              <div><span className="text-gray-500">件名:</span> インシデント件名</div>
              <div><span className="text-gray-500">ステータス:</span> <span className="bg-blue-100 text-blue-700 px-1 rounded">対応中</span></div>
              <div><span className="text-gray-500">担当者:</span> 山田 太郎</div>
              <div><span className="text-gray-500">対象区分:</span> 問合せ</div>
              <div><span className="text-gray-500">対象名:</span> 対象システム</div>
            </div>
          </div>
          {/* 対応履歴テーブル */}
          <div className="border border-gray-300 rounded">
            <div className="bg-gray-100 px-2 py-1 text-xs font-semibold border-b border-gray-300">対応履歴</div>
            <div className="p-2">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-1 py-0.5 text-left">対応者</th>
                    <th className="border border-gray-300 px-1 py-0.5 text-left">対応日時</th>
                    <th className="border border-gray-300 px-1 py-0.5 text-left w-12">時間</th>
                    <th className="border border-gray-300 px-1 py-0.5 text-left">作業内容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-1 py-0.5">山田 太郎</td>
                    <td className="border border-gray-300 px-1 py-0.5">2024/01/15 10:00</td>
                    <td className="border border-gray-300 px-1 py-0.5">1.0h</td>
                    <td className="border border-gray-300 px-1 py-0.5">初期対応実施</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-1 py-0.5">佐藤 花子</td>
                    <td className="border border-gray-300 px-1 py-0.5">2024/01/15 14:00</td>
                    <td className="border border-gray-300 px-1 py-0.5">2.0h</td>
                    <td className="border border-gray-300 px-1 py-0.5">調査・分析</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* 履歴追加エリア */}
          <div className="border border-blue-300 rounded bg-blue-50">
            <div className="bg-blue-100 px-2 py-1 text-xs font-semibold border-b border-blue-300">履歴追加</div>
            <div className="p-2 grid grid-cols-4 gap-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">対応者</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-white">選択...</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">対応日時</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-white">日時選択</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">対応時間</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-white">1.0</div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">作業内容</span>
                <div className="flex-1 border border-gray-300 rounded px-1 py-0.5 text-xs text-gray-400 bg-white">内容入力...</div>
              </div>
            </div>
          </div>
          {/* ボタンエリア */}
          <div className="flex justify-end gap-2 pt-1">
            <button className="border border-gray-300 px-3 py-1 rounded text-xs">戻る</button>
            <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs">履歴追加</button>
            <button className="bg-green-500 text-white px-3 py-1 rounded text-xs">完了</button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs">更新</button>
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

      {/* SCR004 インシデント登録 */}
      <ScreenSection
        id="SCR004"
        title="インシデント登録"
        description="新規インシデントの登録を行う。基本情報、対象情報、内容、資料を入力し保存する。"
        api="POST /incidents"
        tables={['incidents', 'customers', 'users']}
        layoutDiagram={<IncidentFormLayout />}
      >
        <div className="space-y-3">
          {/* 基本情報 */}
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">入力項目 - 基本情報</div>
            <InputTable items={[
              { name: '会社名', physical: 'customer_id', type: 'BIGINT', note: '必須、選択式' },
              { name: '件名', physical: 'title', type: 'VARCHAR', note: '必須' },
              { name: 'ステータス', physical: 'status', type: 'VARCHAR', note: '初期値: 未対応' },
              { name: '担当者', physical: 'user_id', type: 'BIGINT', note: '選択式' },
              { name: '優先度', physical: 'priority', type: 'VARCHAR', note: '低/中/高/緊急' },
              { name: '発生日', physical: 'occurred_date', type: 'DATE' },
              { name: '登録日時', physical: 'created_at', type: 'TIMESTAMP', note: '自動設定' },
            ]} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* 対象情報 */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">入力項目 - 対象情報</div>
              <InputTable items={[
                { name: '対象区分', physical: 'target_type', type: 'VARCHAR', note: '問合せ/障害/要望' },
                { name: '対象名', physical: 'target_name', type: 'VARCHAR' },
              ]} />
            </div>
            {/* 内容 */}
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">入力項目 - 内容</div>
              <InputTable items={[
                { name: '内容', physical: 'content', type: 'TEXT', note: '複数行入力可' },
                { name: '発生日時', physical: 'occurred_datetime', type: 'TIMESTAMP' },
              ]} />
            </div>
          </div>
          {/* 資料 */}
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">入力項目 - 資料</div>
            <InputTable items={[
              { name: '添付ファイル', physical: 'attachment', type: 'FILE', note: '複数可' },
              { name: '関連資料', physical: 'related_doc', type: 'VARCHAR' },
              { name: '参照URL', physical: 'reference_url', type: 'VARCHAR' },
            ]} />
          </div>
          {/* イベント・ボタン・遷移 */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
              <EventTable events={[
                { trigger: '保存押下', success: 'データ保存→一覧へ遷移', failure: 'エラー表示' },
                { trigger: 'クリア押下', success: '入力クリア' },
                { trigger: '戻る押下', success: '一覧へ遷移（確認ダイアログ）' },
              ]} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
              <div className="flex flex-wrap gap-1">
                <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">保存</button>
                <button className="border border-gray-300 px-2 py-1 rounded text-xs">クリア</button>
                <button className="border border-gray-300 px-2 py-1 rounded text-xs">戻る</button>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">画面遷移</div>
              <div className="border border-gray-200 rounded p-2 bg-gray-50 text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">SCR003</span>
                  <span>→</span>
                  <span className="text-gray-700">SCR004</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">保存後</span>
                  <span>→</span>
                  <span className="text-gray-700">SCR003</span>
                </div>
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
              <div className="text-xs font-semibold text-gray-600 mt-2 mb-1">エラーメッセージ</div>
              <div className="space-y-1 text-xs">
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">必須項目が入力されていません</div>
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">保存に失敗しました</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">使用共通部品</div>
            <div className="flex flex-wrap gap-1">
              {['入力フォーム', 'セクション区切り', 'ドロップダウン選択', 'ファイルアップロード', '日付ピッカー'].map((c) => (
                <span key={c} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </ScreenSection>

      {/* SCR005 インシデント詳細 */}
      <ScreenSection
        id="SCR005"
        title="インシデント詳細"
        description="インシデントの詳細表示・編集、対応履歴の管理を行う。情報は表示のみで、作業は対応履歴から行う。"
        api="GET /incidents/{id}, POST /incidents/{id}/work-logs, PUT /incidents/{id}"
        tables={['incidents', 'incident_work_logs', 'customers', 'users']}
        layoutDiagram={<IncidentDetailLayout />}
      >
        <div className="space-y-3">
          {/* 表示項目 */}
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">表示項目 - インシデント情報（編集不可）</div>
            <InputTable items={[
              { name: '会社名', physical: 'customer_name', type: 'VARCHAR', note: '表示のみ' },
              { name: '件名', physical: 'title', type: 'VARCHAR', note: '表示のみ' },
              { name: 'ステータス', physical: 'status', type: 'VARCHAR', note: 'バッジ表示' },
              { name: '担当者', physical: 'user_name', type: 'VARCHAR', note: '表示のみ' },
              { name: '対象区分', physical: 'target_type', type: 'VARCHAR', note: '表示のみ' },
              { name: '対象名', physical: 'target_name', type: 'VARCHAR', note: '表示のみ' },
              { name: '内容', physical: 'content', type: 'TEXT', note: '表示のみ' },
              { name: '発生日時', physical: 'occurred_datetime', type: 'TIMESTAMP', note: '表示のみ' },
              { name: '登録日時', physical: 'created_at', type: 'TIMESTAMP', note: '表示のみ' },
              { name: '更新日時', physical: 'updated_at', type: 'TIMESTAMP', note: '表示のみ' },
            ]} />
          </div>
          {/* 対応履歴 */}
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">対応履歴テーブル</div>
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
                {[
                  { name: '対応者', physical: 'user_name', type: 'VARCHAR', note: '作業履歴表示' },
                  { name: '対応日時', physical: 'work_date', type: 'TIMESTAMP', note: '作業履歴表示' },
                  { name: '対応時間', physical: 'work_time', type: 'DECIMAL', note: '時間単位' },
                  { name: '作業内容', physical: 'work_detail', type: 'TEXT', note: '作業履歴表示' },
                ].map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-b border-gray-100 px-2 py-1">{item.name}</td>
                    <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.physical}</td>
                    <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{item.type}</td>
                    <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 履歴追加入力 */}
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">履歴追加 - 入力項目</div>
            <InputTable items={[
              { name: '対応者', physical: 'user_id', type: 'BIGINT', note: '必須、選択式' },
              { name: '対応日時', physical: 'work_date', type: 'TIMESTAMP', note: '必須' },
              { name: '対応時間', physical: 'work_time', type: 'DECIMAL', note: '必須、時間単位' },
              { name: '作業内容', physical: 'work_detail', type: 'TEXT', note: '必須、複数行' },
            ]} />
          </div>
          {/* イベント・ボタン・遷移 */}
          <div className="grid grid-cols-4 gap-3">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">イベント一覧</div>
              <EventTable events={[
                { trigger: '更新押下', success: '情報更新', failure: 'エラー表示' },
                { trigger: '履歴追加押下', success: '履歴保存→画面更新', failure: 'エラー表示' },
                { trigger: '完了押下', success: 'ステータス完了へ変更（確認ダイアログ）' },
                { trigger: '戻る押下', success: '一覧へ遷移' },
              ]} />
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">ボタン一覧</div>
              <div className="flex flex-wrap gap-1">
                <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs">更新</button>
                <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">履歴追加</button>
                <button className="bg-green-500 text-white px-2 py-1 rounded text-xs">完了</button>
                <button className="border border-gray-300 px-2 py-1 rounded text-xs">戻る</button>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">画面遷移</div>
              <div className="border border-gray-200 rounded p-2 bg-gray-50 text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">SCR003</span>
                  <span>-&gt;</span>
                  <span className="text-gray-700">SCR005（詳細）</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-500">完了後</span>
                  <span>-&gt;</span>
                  <span className="text-gray-700">SCR003</span>
                </div>
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
              <div className="text-xs font-semibold text-gray-600 mt-2 mb-1">エラーメッセージ</div>
              <div className="space-y-1 text-xs">
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">履歴の追加に失敗しました</div>
                <div className="bg-red-50 text-red-600 px-2 py-0.5 rounded">必須項目が未入力です</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-600 mb-1">使用共通部品</div>
            <div className="flex flex-wrap gap-1">
              {['詳細表示パネル', 'Bootstrap テーブル', 'ステータスバッジ', '入力フォーム', '確認ダイアログ', '日時ピッカー'].map((c) => (
                <span key={c} className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </ScreenSection>
    </div>
  );
}
