const screens = [
  { id: 'SCR001', name: 'ログイン', url: '/login', controller: 'LoginController', component: 'Login.vue', users: '全ユーザー' },
  { id: 'SCR002', name: 'ダッシュボード', url: '/dashboard', controller: 'DashboardController', component: 'Dashboard.vue', users: '全ユーザー' },
  { id: 'SCR003', name: 'インシデント一覧', url: '/incidents', controller: 'IncidentController@index', component: 'IncidentList.vue', users: '全ユーザー' },
  { id: 'SCR004', name: 'インシデント登録', url: '/incidents/create', controller: 'IncidentController@create', component: 'IncidentForm.vue', users: '全ユーザー' },
  { id: 'SCR005', name: 'インシデント詳細', url: '/incidents/{id}', controller: 'IncidentController@show', component: 'IncidentDetail.vue', users: '全ユーザー' },
  { id: 'SCR006', name: 'ユーザーマスタ', url: '/admin/users', controller: 'UserController@index', component: 'UserList.vue', users: '管理者のみ' },
  { id: 'SCR007', name: '顧客マスタ', url: '/admin/customers', controller: 'CustomerController@index', component: 'CustomerList.vue', users: '管理者のみ' },
];

export default function ScreenList() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        04 画面一覧
      </h1>

      <div className="border border-gray-200 rounded overflow-hidden">
        <table className="w-full text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 w-20">画面ID</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 w-32">画面名</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">URL</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700">Controller</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 w-28">Vue Component</th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-semibold text-gray-700 w-24">利用者</th>
            </tr>
          </thead>
          <tbody>
            {screens.map((screen, index) => (
              <tr key={screen.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-b border-gray-100 px-3 py-2">
                  <span className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono text-gray-700">
                    {screen.id}
                  </span>
                </td>
                <td className="border-b border-gray-100 px-3 py-2 font-medium text-gray-800">{screen.name}</td>
                <td className="border-b border-gray-100 px-3 py-2 font-mono text-gray-600">{screen.url}</td>
                <td className="border-b border-gray-100 px-3 py-2 font-mono text-gray-600">{screen.controller}</td>
                <td className="border-b border-gray-100 px-3 py-2 font-mono text-gray-600">{screen.component}</td>
                <td className="border-b border-gray-100 px-3 py-2">
                  <span className={`px-1.5 py-0.5 rounded text-xs ${
                    screen.users === '管理者のみ'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {screen.users}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
