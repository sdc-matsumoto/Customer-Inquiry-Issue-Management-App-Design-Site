interface ValidationRow {
  name: string;
  physical: string;
  type: string;
  required: boolean;
  maxLength: string;
  check: string;
  error: string;
}

function ValidationTable({ title, rows }: { title: string; rows: ValidationRow[] }) {
  return (
    <div className="border border-gray-200 rounded mb-3 overflow-hidden">
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-200">
        <span className="font-semibold text-sm text-gray-700">{title}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-24">項目名</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-28">物理名</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-20">型</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-10">必須</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-14">最大桁</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700 w-32">チェック内容</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">エラーメッセージ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.physical} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-800">{row.name}</td>
                <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{row.physical}</td>
                <td className="border-b border-gray-100 px-2 py-1 font-mono text-gray-600">{row.type}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-center">
                  <span className={row.required ? 'text-red-500 font-bold' : 'text-gray-400'}>{row.required ? '○' : ''}</span>
                </td>
                <td className="border-b border-gray-100 px-2 py-1 text-center text-gray-600">{row.maxLength}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-600">{row.check}</td>
                <td className="border-b border-gray-100 px-2 py-1 text-gray-500">{row.error}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const loginValidations: ValidationRow[] = [
  { name: 'ログインID', physical: 'login_id', type: 'VARCHAR', required: true, maxLength: '50', check: '半角英数字', error: 'ログインIDを入力してください' },
  { name: 'パスワード', physical: 'password', type: 'VARCHAR', required: true, maxLength: '255', check: '8文字以上', error: 'パスワードを入力してください' },
];

const incidentValidations: ValidationRow[] = [
  { name: '区分', physical: 'incident_type', type: 'VARCHAR', required: true, maxLength: '20', check: '問合せまたは障害', error: '区分を選択してください' },
  { name: '顧客', physical: 'customer_id', type: 'BIGINT', required: true, maxLength: '-', check: '存在チェック', error: '顧客を選択してください' },
  { name: '顧客担当者', physical: 'customer_contact_name', type: 'VARCHAR', required: false, maxLength: '100', check: '100文字以内', error: '顧客担当者は100文字以内で入力してください' },
  { name: 'タイトル', physical: 'title', type: 'VARCHAR', required: true, maxLength: '200', check: '200文字以内', error: 'タイトルを入力してください' },
  { name: '発生日', physical: 'occurred_at', type: 'DATE', required: true, maxLength: '-', check: '日付形式', error: '発生日を入力してください' },
  { name: '対応開始日', physical: 'started_at', type: 'DATE', required: false, maxLength: '-', check: '日付形式', error: '対応開始日が不正です' },
  { name: '対応終了日', physical: 'closed_at', type: 'DATE', required: false, maxLength: '-', check: '日付形式', error: '対応終了日が不正です' },
  { name: '対象区分', physical: 'target_type', type: 'VARCHAR', required: false, maxLength: '100', check: '100文字以内', error: '対象区分は100文字以内で入力してください' },
  { name: '対象名', physical: 'target_name', type: 'VARCHAR', required: false, maxLength: '200', check: '200文字以内', error: '対象名は200文字以内で入力してください' },
  { name: '問合せ内容', physical: 'inquiry_detail', type: 'TEXT', required: true, maxLength: '5000', check: '改行可', error: '問合せ内容を入力してください' },
  { name: '対応内容', physical: 'response_detail', type: 'TEXT', required: false, maxLength: '5000', check: '改行可', error: '対応内容は5000文字以内で入力してください' },
  { name: 'ステータス', physical: 'status', type: 'VARCHAR', required: true, maxLength: '20', check: '未対応、対応中、保留、完了', error: 'ステータスを選択してください' },
  { name: '資料保存先1', physical: 'document_path1', type: 'VARCHAR', required: false, maxLength: '500', check: 'パス形式', error: '資料保存先1は500文字以内で入力してください' },
  { name: '資料保存先2', physical: 'document_path2', type: 'VARCHAR', required: false, maxLength: '500', check: 'パス形式', error: '資料保存先2は500文字以内で入力してください' },
  { name: '資料保存先3', physical: 'document_path3', type: 'VARCHAR', required: false, maxLength: '500', check: 'パス形式', error: '資料保存先3は500文字以内で入力してください' },
];

const workLogValidations: ValidationRow[] = [
  { name: '対応者', physical: 'user_id', type: 'BIGINT', required: true, maxLength: '-', check: '存在チェック', error: '対応者を選択してください' },
  { name: '対応日時', physical: 'work_date', type: 'DATETIME', required: true, maxLength: '-', check: '日時形式', error: '対応日時を入力してください' },
  { name: '対応時間', physical: 'work_time', type: 'DECIMAL', required: true, maxLength: '5', check: '0.1以上', error: '対応時間を入力してください' },
  { name: '作業内容', physical: 'work_detail', type: 'TEXT', required: true, maxLength: '5000', check: '改行可', error: '作業内容を入力してください' },
];

const userValidations: ValidationRow[] = [
  { name: 'ログインID', physical: 'login_id', type: 'VARCHAR', required: true, maxLength: '50', check: '半角英数字、一意', error: 'ログインIDを入力してください' },
  { name: 'パスワード', physical: 'password', type: 'VARCHAR', required: true, maxLength: '255', check: '8文字以上', error: 'パスワードを入力してください' },
  { name: 'ユーザー名', physical: 'user_name', type: 'VARCHAR', required: true, maxLength: '100', check: '100文字以内', error: 'ユーザー名を入力してください' },
  { name: '管理者フラグ', physical: 'is_admin', type: 'BOOLEAN', required: true, maxLength: '-', check: 'true/false', error: '管理者区分を選択してください' },
];

const customerValidations: ValidationRow[] = [
  { name: '顧客名', physical: 'customer_name', type: 'VARCHAR', required: true, maxLength: '200', check: '一意', error: '顧客名を入力してください' },
];

const businessChecks = [
  '対応終了日は対応開始日以降であること',
  '対応開始日は発生日以降であること',
  'ログインIDは重複不可',
  '顧客名は重複不可',
  '完了ステータスの場合は対応内容入力必須',
  '対応履歴追加時は対応時間を0より大きい値とする',
];

export default function ValidationDesign() {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        08 バリデーション設計
      </h1>

      <ValidationTable title="ログイン" rows={loginValidations} />
      <ValidationTable title="インシデント" rows={incidentValidations} />
      <ValidationTable title="対応履歴" rows={workLogValidations} />
      <ValidationTable title="ユーザー" rows={userValidations} />
      <ValidationTable title="顧客" rows={customerValidations} />

      {/* Business Checks */}
      <div className="border border-gray-200 rounded p-3 bg-white">
        <h2 className="text-sm font-semibold text-gray-700 mb-2">業務チェック</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {businessChecks.map((check, index) => (
            <div key={index} className="flex items-start gap-2 text-xs">
              <span className="text-blue-500 mt-0.5">●</span>
              <span className="text-gray-600">{check}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
