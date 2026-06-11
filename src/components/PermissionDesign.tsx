const permissions = [
  { feature: 'ログイン', general: true, admin: true, target: '全ユーザー' },
  { feature: 'ダッシュボード', general: true, admin: true, target: '全ユーザー' },
  { feature: 'インシデント一覧', general: true, admin: true, target: '担当案件' },
  { feature: '新規登録', general: true, admin: true, target: '担当案件' },
  { feature: '詳細', general: true, admin: true, target: '担当案件' },
  { feature: '編集', general: true, admin: true, target: '担当案件' },
  { feature: '完了', general: true, admin: true, target: '担当案件' },
  { feature: 'ユーザーマスタ', general: false, admin: true, target: '全データ' },
  { feature: '顧客マスタ', general: false, admin: true, target: '全データ' },
];

const menuItems = {
  general: [
    'ダッシュボード',
    'インシデント一覧',
    'インシデント登録',
    'インシデント詳細',
  ],
  admin: [
    'ダッシュボード',
    'インシデント一覧',
    'インシデント登録',
    'インシデント詳細',
    'ユーザーマスタ',
    '顧客マスタ',
  ],
};

export default function PermissionDesign() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        03 権限設計
      </h1>

      {/* Permission Matrix Table */}
      <div className="border border-gray-200 rounded mb-4 overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">機能</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center font-semibold text-gray-700 w-24">一般ユーザー</th>
              <th className="border-b border-gray-200 px-3 py-2 text-center font-semibold text-gray-700 w-20">管理者</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 w-24">対象</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((item, index) => (
              <tr key={item.feature} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-b border-gray-100 px-3 py-2 text-gray-700">{item.feature}</td>
                <td className="border-b border-gray-100 px-3 py-2 text-center">
                  <span className={item.general ? 'text-green-600 font-bold' : 'text-red-400'}>
                    {item.general ? '○' : '×'}
                  </span>
                </td>
                <td className="border-b border-gray-100 px-3 py-2 text-center">
                  <span className="text-green-600 font-bold">○</span>
                </td>
                <td className="border-b border-gray-100 px-3 py-2 text-gray-600">{item.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Menu Display Cards */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">メニュー表示イメージ</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="border border-gray-200 rounded p-3 bg-white">
          <div className="bg-gray-50 px-2 py-1 rounded text-xs font-semibold text-gray-700 mb-2">
            一般ユーザー
          </div>
          <ul className="space-y-1">
            {menuItems.general.map((item) => (
              <li key={item} className="text-xs text-gray-600 px-2 py-1 hover:bg-gray-50 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-gray-200 rounded p-3 bg-white">
          <div className="bg-blue-50 px-2 py-1 rounded text-xs font-semibold text-blue-700 mb-2">
            管理者
          </div>
          <ul className="space-y-1">
            {menuItems.admin.map((item) => (
              <li key={item} className="text-xs text-gray-600 px-2 py-1 hover:bg-gray-50 rounded">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
