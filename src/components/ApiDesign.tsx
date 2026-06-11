const apiList = [
  { name: 'ログイン', method: 'POST', url: '/login', auth: false, admin: false, description: 'ログイン認証' },
  { name: 'インシデント一覧取得', method: 'GET', url: '/incidents', auth: true, admin: false, description: '一覧取得' },
  { name: 'インシデント詳細取得', method: 'GET', url: '/incidents/{id}', auth: true, admin: false, description: '詳細取得' },
  { name: 'インシデント登録', method: 'POST', url: '/incidents', auth: true, admin: false, description: '新規登録' },
  { name: 'インシデント更新', method: 'PUT', url: '/incidents/{id}', auth: true, admin: false, description: '情報更新' },
  { name: 'インシデント完了', method: 'PATCH', url: '/incidents/{id}/complete', auth: true, admin: false, description: 'ステータス完了' },
  { name: '対応履歴追加', method: 'POST', url: '/incidents/{id}/worklogs', auth: true, admin: false, description: '履歴追加' },
  { name: 'ユーザー一覧取得', method: 'GET', url: '/users', auth: true, admin: true, description: 'ユーザー一覧' },
  { name: 'ユーザー登録', method: 'POST', url: '/users', auth: true, admin: true, description: 'ユーザー登録' },
  { name: 'ユーザー更新', method: 'PUT', url: '/users/{id}', auth: true, admin: true, description: 'ユーザー更新' },
  { name: '顧客一覧取得', method: 'GET', url: '/customers', auth: true, admin: true, description: '顧客一覧' },
  { name: '顧客登録', method: 'POST', url: '/customers', auth: true, admin: true, description: '顧客登録' },
  { name: '顧客更新', method: 'PUT', url: '/customers/{id}', auth: true, admin: true, description: '顧客更新' },
];

const methodColors: Record<string, string> = {
  GET: 'bg-green-100 text-green-700 border-green-200',
  POST: 'bg-blue-100 text-blue-700 border-blue-200',
  PUT: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  PATCH: 'bg-purple-100 text-purple-700 border-purple-200',
  DELETE: 'bg-red-100 text-red-700 border-red-200',
};

interface ApiCardProps {
  title: string;
  url: string;
  method: string;
  auth: boolean;
  admin: boolean;
  description: string;
  request?: string[];
  response?: string[];
  searchParams?: string[];
}

function ApiCard({ title, url, method, auth, admin, description, request, response, searchParams }: ApiCardProps) {
  const methodColor = methodColors[method] || 'bg-gray-100 text-gray-700';

  return (
    <div className="border border-gray-200 rounded p-3 mb-2 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <span className={`px-2 py-0.5 rounded text-xs font-bold border ${methodColor}`}>{method}</span>
        <span className="font-mono text-xs text-gray-700">{url}</span>
        <span className="text-xs text-gray-500 ml-auto">{title}</span>
      </div>
      <div className="flex gap-4 text-xs mb-2">
        <span className="text-gray-500">認証: <span className={auth ? 'text-green-600 font-bold' : 'text-gray-400'}>{auth ? '必要' : '不要'}</span></span>
        <span className="text-gray-500">管理者: <span className={admin ? 'text-blue-600 font-bold' : 'text-gray-400'}>{admin ? '必要' : '不要'}</span></span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{description}</p>

      {searchParams && searchParams.length > 0 && (
        <div className="mt-2">
          <span className="text-xs font-semibold text-gray-600">検索条件: </span>
          <span className="text-xs font-mono text-gray-500">{searchParams.join(', ')}</span>
        </div>
      )}

      {request && request.length > 0 && (
        <div className="mt-2">
          <span className="text-xs font-semibold text-gray-600">Request: </span>
          <span className="text-xs font-mono text-gray-500">{request.join(', ')}</span>
        </div>
      )}

      {response && response.length > 0 && (
        <div className="mt-1">
          <span className="text-xs font-semibold text-gray-600">Response: </span>
          <span className="text-xs font-mono text-gray-500">{response.join(', ')}</span>
        </div>
      )}
    </div>
  );
}

export default function ApiDesign() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        07 API設計
      </h1>

      {/* API List */}
      <div className="border border-gray-200 rounded mb-4 overflow-hidden">
        <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
          <span className="font-semibold text-sm text-gray-700">API一覧</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-32">機能</th>
                <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-16">メソッド</th>
                <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">URL</th>
                <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-12">認証</th>
                <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-12">管理者</th>
                <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-20">概要</th>
              </tr>
            </thead>
            <tbody>
              {apiList.map((api, index) => (
                <tr key={api.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border-b border-gray-100 px-2 py-1 text-gray-800">{api.name}</td>
                  <td className="border-b border-gray-100 px-2 py-1 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-xs font-bold border ${methodColors[api.method]}`}>
                      {api.method}
                    </span>
                  </td>
                  <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{api.url}</td>
                  <td className="border-b border-gray-100 px-2 py-1 text-center">
                    <span className={api.auth ? 'text-green-600 font-bold' : 'text-gray-400'}>{api.auth ? '○' : '×'}</span>
                  </td>
                  <td className="border-b border-gray-100 px-2 py-1 text-center">
                    <span className={api.admin ? 'text-blue-600 font-bold' : 'text-gray-400'}>{api.admin ? '○' : '×'}</span>
                  </td>
                  <td className="border-b border-gray-100 px-2 py-1 text-gray-600">{api.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Details */}
      <h2 className="text-sm font-semibold text-gray-700 mb-2">API詳細</h2>

      <ApiCard
        title="ログイン"
        url="POST /login"
        method="POST"
        auth={false}
        admin={false}
        description="ログイン認証を行う。"
        request={['login_id', 'password']}
        response={['success', 'user_name', 'is_admin']}
      />

      <ApiCard
        title="インシデント一覧取得"
        url="GET /incidents"
        method="GET"
        auth={true}
        admin={false}
        description="インシデント一覧を取得する。"
        searchParams={['customer_name', 'status', 'target_type', 'user_id', 'date_from', 'date_to']}
        response={['incident_id', 'incident_no', 'customer_name', 'title', 'status', 'occurred_at', 'target_type', 'latest_user_name']}
      />

      <ApiCard
        title="インシデント詳細取得"
        url="GET /incidents/{id}"
        method="GET"
        auth={true}
        admin={false}
        description="インシデント詳細を取得する。"
        response={['incident', 'work_logs']}
      />

      <ApiCard
        title="インシデント登録"
        url="POST /incidents"
        method="POST"
        auth={true}
        admin={false}
        description="インシデントを新規登録する。"
        request={['incident_type', 'customer_id', 'customer_contact_name', 'title', 'occurred_at', 'started_at', 'closed_at', 'target_type', 'target_name', 'inquiry_detail', 'response_detail', 'status', 'document_path1-3']}
        response={['success', 'incident_id']}
      />

      <ApiCard
        title="インシデント更新"
        url="PUT /incidents/{id}"
        method="PUT"
        auth={true}
        admin={false}
        description="インシデント情報を更新する。"
        request={['登録APIと同一']}
        response={['success']}
      />

      <ApiCard
        title="インシデント完了"
        url="PATCH /incidents/{id}/complete"
        method="PATCH"
        auth={true}
        admin={false}
        description="ステータスを完了に変更する。"
        response={['success', 'status']}
      />

      <ApiCard
        title="対応履歴追加"
        url="POST /incidents/{id}/worklogs"
        method="POST"
        auth={true}
        admin={false}
        description="対応履歴を追加する。"
        request={['user_id', 'work_date', 'work_time', 'work_detail']}
        response={['success', 'work_log_id']}
      />

      <ApiCard
        title="ユーザー一覧取得"
        url="GET /users"
        method="GET"
        auth={true}
        admin={true}
        description="ユーザー一覧を取得する。"
        response={['user_id', 'login_id', 'user_name', 'is_admin']}
      />

      <ApiCard
        title="ユーザー登録"
        url="POST /users"
        method="POST"
        auth={true}
        admin={true}
        description="ユーザーを登録する。"
        request={['login_id', 'password', 'user_name', 'is_admin']}
        response={['success', 'user_id']}
      />

      <ApiCard
        title="ユーザー更新"
        url="PUT /users/{id}"
        method="PUT"
        auth={true}
        admin={true}
        description="ユーザー情報を更新する。"
        request={['login_id', 'password', 'user_name', 'is_admin']}
        response={['success']}
      />

      <ApiCard
        title="顧客一覧取得"
        url="GET /customers"
        method="GET"
        auth={true}
        admin={true}
        description="顧客一覧を取得する。"
        response={['customer_id', 'customer_name']}
      />

      <ApiCard
        title="顧客登録"
        url="POST /customers"
        method="POST"
        auth={true}
        admin={true}
        description="顧客を登録する。"
        request={['customer_name']}
        response={['success', 'customer_id']}
      />

      <ApiCard
        title="顧客更新"
        url="PUT /customers/{id}"
        method="PUT"
        auth={true}
        admin={true}
        description="顧客情報を更新する。"
        request={['customer_name']}
        response={['success']}
      />

      {/* Auth/Permission Policy */}
      <div className="border border-gray-200 rounded p-3 bg-gray-50 mt-4">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">認証・権限方針</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="bg-gray-100 px-2 py-1 rounded text-xs font-semibold text-gray-700 mb-2">一般ユーザー</div>
            <ul className="text-xs text-gray-600 space-y-0.5 ml-2">
              <li>ログイン</li>
              <li>インシデント一覧・登録・更新</li>
              <li>対応履歴追加</li>
            </ul>
          </div>
          <div>
            <div className="bg-blue-50 px-2 py-1 rounded text-xs font-semibold text-blue-700 mb-2">管理者</div>
            <ul className="text-xs text-gray-600 space-y-0.5 ml-2">
              <li>一般ユーザー機能すべて</li>
              <li>ユーザーマスタ</li>
              <li>顧客マスタ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
