import { useState } from 'react';
import { ArrowLeft, Search, Plus, Save, X, Edit2, Trash2, CheckCircle, Clock, AlertCircle, Pause, FileText, LogOut } from 'lucide-react';

// ============================================
// Types
// ============================================
type ScreenId = 'SCR001' | 'SCR002' | 'SCR003' | 'SCR004' | 'SCR005' | 'SCR006' | 'SCR007';

interface Incident {
  id: number;
  incident_type: string;
  customer_id: number;
  customer_name: string;
  customer_contact_name: string;
  title: string;
  occurred_at: string;
  started_at: string;
  closed_at: string;
  target_type: string;
  target_name: string;
  inquiry_detail: string;
  response_detail: string;
  document_path1: string;
  document_path2: string;
  document_path3: string;
  status: string;
  user_id: number;
  user_name: string;
}

interface WorkLog {
  id: number;
  incident_id: number;
  user_id: number;
  user_name: string;
  work_date: string;
  work_time: number;
  work_detail: string;
}

interface User {
  id: number;
  login_id: string;
  password: string;
  user_name: string;
  is_admin: boolean;
  created_at: string;
}

interface Customer {
  id: number;
  customer_name: string;
  created_at: string;
}

// ============================================
// Dummy Data
// ============================================
const dummyUsers: User[] = [
  { id: 1, login_id: 'admin', password: 'admin123', user_name: 'システム管理者', is_admin: true, created_at: '2024-01-01 10:00:00' },
  { id: 2, login_id: 'user01', password: 'user123', user_name: '山田太郎', is_admin: false, created_at: '2024-01-15 14:00:00' },
  { id: 3, login_id: 'user02', password: 'user123', user_name: '佐藤花子', is_admin: false, created_at: '2024-02-01 09:00:00' },
];

const dummyCustomers: Customer[] = [
  { id: 1, customer_name: '株式会社サンプル', created_at: '2024-01-01 10:00:00' },
  { id: 2, customer_name: 'テックソリューション株式会社', created_at: '2024-01-15 14:00:00' },
  { id: 3, customer_name: '有限会社システム開発', created_at: '2024-02-01 09:00:00' },
  { id: 4, customer_name: 'ABC商事株式会社', created_at: '2024-03-01 11:00:00' },
  { id: 5, customer_name: 'XYZシステムズ', created_at: '2024-03-15 16:00:00' },
];

const dummyIncidents: Incident[] = [
  { id: 1, incident_type: '障害', customer_id: 1, customer_name: '株式会社サンプル', customer_contact_name: '田中様', title: 'メール送信エラーが発生', occurred_at: '2024-06-01', started_at: '2024-06-01', closed_at: '', target_type: 'サーバー', target_name: 'MailServer01', inquiry_detail: 'メールが送信できなくなった。複数のユーザーで発生している。', response_detail: 'SMTPサーバーの設定を確認中', document_path1: '/docs/mail_log.txt', document_path2: '', document_path3: '', status: '対応中', user_id: 2, user_name: '山田太郎' },
  { id: 2, incident_type: '問合せ', customer_id: 2, customer_name: 'テックソリューション株式会社', customer_contact_name: '鈴木様', title: 'パスワードリセット方法について', occurred_at: '2024-06-10', started_at: '2024-06-10', closed_at: '2024-06-10', target_type: 'アカウント', target_name: 'user_tech01', inquiry_detail: 'パスワードを忘れてしまった。リセット方法を教えてほしい。', response_detail: 'パスワードリセットメールを送信しました。', document_path1: '', document_path2: '', document_path3: '', status: '完了', user_id: 3, user_name: '佐藤花子' },
  { id: 3, incident_type: '障害', customer_id: 3, customer_name: '有限会社システム開発', customer_contact_name: '高橋様', title: 'ログインできない', occurred_at: '2024-06-12', started_at: '', closed_at: '', target_type: 'アプリケーション', target_name: 'Webポータル', inquiry_detail: 'ログイン画面でエラーが表示される。', response_detail: '', document_path1: '', document_path2: '', document_path3: '', status: '未対応', user_id: 0, user_name: '' },
  { id: 4, incident_type: '問合せ', customer_id: 1, customer_name: '株式会社サンプル', customer_contact_name: '伊藤様', title: '新機能の追加要望', occurred_at: '2024-06-13', started_at: '2024-06-14', closed_at: '', target_type: '', target_name: '', inquiry_detail: 'レポート機能にCSV出力を追加してほしい。', response_detail: '検討中です。', document_path1: '', document_path2: '', document_path3: '', status: '保留', user_id: 2, user_name: '山田太郎' },
];

const dummyWorkLogs: WorkLog[] = [
  { id: 1, incident_id: 1, user_id: 2, user_name: '山田太郎', work_date: '2024-06-01 10:00', work_time: 1.5, work_detail: 'SMTPサーバーログを確認' },
  { id: 2, incident_id: 1, user_id: 2, user_name: '山田太郎', work_date: '2024-06-01 14:00', work_time: 2.0, work_detail: '設定ファイル修正とテスト' },
];

// ============================================
// Common Components
// ============================================
function PrimaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors ${className}`}>
      {children}
    </button>
  );
}

function SecondaryButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300 transition-colors ${className}`}>
      {children}
    </button>
  );
}

function DangerButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700 transition-colors ${className}`}>
      {children}
    </button>
  );
}

function AlertMessage({ type, message }: { type: 'error' | 'success' | 'warning'; message: string }) {
  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  };
  return (
    <div className={`border rounded px-4 py-2 text-sm ${styles[type]}`}>
      {message}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    '未対応': 'bg-red-100 text-red-700',
    '対応中': 'bg-blue-100 text-blue-700',
    '保留': 'bg-yellow-100 text-yellow-700',
    '完了': 'bg-green-100 text-green-700',
  };
  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) {
  return (
    <div className="flex justify-center gap-1 mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded text-sm ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function FormInput({ label, type = 'text', value, onChange, required, placeholder }: { label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; required?: boolean }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">選択してください</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({ label, value, onChange, required, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; rows?: number }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// ============================================
// SCR001 Login
// ============================================
function LoginScreen({ onLogin, onNavigate }: { onLogin: () => void; onNavigate: (id: ScreenId) => void }) {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!loginId) {
      setError('ログインIDを入力してください');
      return;
    }
    if (!password) {
      setError('パスワードを入力してください');
      return;
    }
    // Dummy authentication
    if (loginId === 'admin' || loginId === 'user01' || loginId === 'user02') {
      onLogin();
      onNavigate('SCR002');
    } else {
      setError('ログインIDまたはパスワードが正しくありません');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">ログイン</h1>
        {error && <AlertMessage type="error" message={error} />}
        <div className="mt-4 space-y-4">
          <FormInput label="ログインID" value={loginId} onChange={setLoginId} required />
          <FormInput label="パスワード" type="password" value={password} onChange={setPassword} required />
          <PrimaryButton className="w-full" onClick={handleLogin}>ログイン</PrimaryButton>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          テスト用: admin / admin123
        </p>
      </div>
    </div>
  );
}

// ============================================
// Header
// ============================================
function Header({ title, isLoggedIn, onLogout, onNavigate }: { title: string; isLoggedIn: boolean; onLogout: () => void; onNavigate: (id: ScreenId) => void }) {
  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => onNavigate('SCR002')} className="text-sm hover:text-gray-300">ダッシュボード</button>
        <button onClick={() => onNavigate('SCR003')} className="text-sm hover:text-gray-300">インシデント一覧</button>
        <button onClick={() => onNavigate('SCR006')} className="text-sm hover:text-gray-300">ユーザー管理</button>
        <button onClick={() => onNavigate('SCR007')} className="text-sm hover:text-gray-300">顧客管理</button>
        {isLoggedIn && (
          <button onClick={onLogout} className="flex items-center gap-1 text-sm hover:text-gray-300 ml-4">
            <LogOut className="w-4 h-4" />
            ログアウト
          </button>
        )}
      </div>
    </header>
  );
}

// ============================================
// SCR002 Dashboard
// ============================================
function DashboardScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const summary = [
    { label: '未対応', count: 1, color: 'bg-red-500', icon: AlertCircle },
    { label: '対応中', count: 1, color: 'bg-blue-500', icon: Clock },
    { label: '保留', count: 1, color: 'bg-yellow-500', icon: Pause },
    { label: '完了', count: 1, color: 'bg-green-500', icon: CheckCircle },
  ];

  const recentIncidents = dummyIncidents.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="ダッシュボード" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {summary.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{item.label}</p>
                      <p className="text-3xl font-bold text-gray-800 mt-1">{item.count}</p>
                    </div>
                    <div className={`${item.color} rounded-full p-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Incidents */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">最近更新された案件</h2>
              <PrimaryButton onClick={() => onNavigate('SCR004')}>
                <Plus className="w-4 h-4 mr-1 inline" />
                新規登録
              </PrimaryButton>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ステータス</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">顧客名</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">件名</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">発生日</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">担当者</th>
                </tr>
              </thead>
              <tbody>
                {recentIncidents.map((incident) => (
                  <tr
                    key={incident.id}
                    onClick={() => onNavigate('SCR005')}
                    className="border-b cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-4 py-2"><StatusBadge status={incident.status} /></td>
                    <td className="px-4 py-2 text-sm">{incident.customer_name}</td>
                    <td className="px-4 py-2 text-sm">{incident.title}</td>
                    <td className="px-4 py-2 text-sm">{incident.occurred_at}</td>
                    <td className="px-4 py-2 text-sm">{incident.user_name || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SCR003 Incident List
// ============================================
function IncidentListScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const [search, setSearch] = useState({ customer_name: '', status: '', user_id: '', target_type: '', date_from: '', date_to: '' });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredIncidents = dummyIncidents.filter((inc) => {
    if (search.customer_name && !inc.customer_name.includes(search.customer_name)) return false;
    if (search.status && inc.status !== search.status) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="インシデント一覧" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Summary */}
          <div className="grid grid-cols-4 gap-4 mb-4">
            {['未対応', '対応中', '保留', '完了'].map((status) => (
              <div key={status} className="bg-white rounded shadow p-4 text-center">
                <p className="text-sm text-gray-600">{status}</p>
                <p className="text-2xl font-bold">{dummyIncidents.filter((i) => i.status === status).length}</p>
              </div>
            ))}
          </div>

          {/* Search Panel */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <FormInput label="顧客名" value={search.customer_name} onChange={(v) => setSearch({ ...search, customer_name: v })} />
              <FormSelect label="ステータス" value={search.status} onChange={(v) => setSearch({ ...search, status: v })} options={[{ value: '未対応', label: '未対応' }, { value: '対応中', label: '対応中' }, { value: '保留', label: '保留' }, { value: '完了', label: '完了' }]} />
              <FormSelect label="担当者" value={search.user_id} onChange={(v) => setSearch({ ...search, user_id: v })} options={dummyUsers.map((u) => ({ value: String(u.id), label: u.user_name }))} />
              <FormSelect label="対象区分" value={search.target_type} onChange={(v) => setSearch({ ...search, target_type: v })} options={[{ value: 'サーバー', label: 'サーバー' }, { value: 'アプリケーション', label: 'アプリケーション' }, { value: 'アカウント', label: 'アカウント' }]} />
            </div>
            <div className="grid grid-cols-4 gap-4 mt-3">
              <FormInput label="日付From" type="date" value={search.date_from} onChange={(v) => setSearch({ ...search, date_from: v })} />
              <FormInput label="日付To" type="date" value={search.date_to} onChange={(v) => setSearch({ ...search, date_to: v })} />
            </div>
            <div className="flex gap-2 mt-4">
              <PrimaryButton onClick={() => setCurrentPage(1)}><Search className="w-4 h-4 mr-1 inline" />検索</PrimaryButton>
              <SecondaryButton onClick={() => setSearch({ customer_name: '', status: '', user_id: '', target_type: '', date_from: '', date_to: '' })}>クリア</SecondaryButton>
            </div>
          </div>

          {/* Incident Cards */}
          <div className="mb-4 flex justify-end">
            <PrimaryButton onClick={() => onNavigate('SCR004')}><Plus className="w-4 h-4 mr-1 inline" />新規登録</PrimaryButton>
          </div>
          <div className="space-y-3">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('SCR005')}>
                <div className="flex items-center gap-4">
                  <StatusBadge status={incident.status} />
                  <div>
                    <p className="font-medium text-gray-800">{incident.title}</p>
                    <p className="text-sm text-gray-600">{incident.customer_name} - {incident.incident_type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{incident.occurred_at}</p>
                  <p className="text-sm text-gray-500">{incident.user_name || '未担当'}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}

// ============================================
// SCR004 Incident Registration
// ============================================
function IncidentRegistrationScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const [form, setForm] = useState({
    incident_type: '',
    customer_id: '',
    customer_contact_name: '',
    title: '',
    occurred_at: '',
    started_at: '',
    closed_at: '',
    target_type: '',
    target_name: '',
    inquiry_detail: '',
    response_detail: '',
    document_path1: '',
    document_path2: '',
    document_path3: '',
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSave = () => {
    const newErrors: string[] = [];
    if (!form.incident_type) newErrors.push('区分を選択してください');
    if (!form.customer_id) newErrors.push('顧客を選択してください');
    if (!form.title) newErrors.push('タイトルを入力してください');
    if (!form.occurred_at) newErrors.push('発生日を入力してください');
    if (!form.inquiry_detail) newErrors.push('問合せ内容を入力してください');
    setErrors(newErrors);
    if (newErrors.length === 0) {
      alert('登録しました（モック）');
      onNavigate('SCR003');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="インシデント登録" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {errors.length > 0 && (
            <div className="mb-4">
              {errors.map((e, i) => <AlertMessage key={i} type="error" message={e} />)}
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">基本情報</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormSelect label="区分" value={form.incident_type} onChange={(v) => setForm({ ...form, incident_type: v })} options={[{ value: '障害', label: '障害' }, { value: '問合せ', label: '問合せ' }]} required />
              <FormSelect label="顧客" value={form.customer_id} onChange={(v) => setForm({ ...form, customer_id: v })} options={dummyCustomers.map((c) => ({ value: String(c.id), label: c.customer_name }))} required />
              <FormInput label="顧客担当者" value={form.customer_contact_name} onChange={(v) => setForm({ ...form, customer_contact_name: v })} />
              <FormInput label="タイトル" value={form.title} onChange={(v) => setForm({ ...form, title: v })} required />
              <FormInput label="発生日" type="date" value={form.occurred_at} onChange={(v) => setForm({ ...form, occurred_at: v })} required />
              <FormInput label="対応開始日" type="date" value={form.started_at} onChange={(v) => setForm({ ...form, started_at: v })} />
              <FormInput label="対応終了日" type="date" value={form.closed_at} onChange={(v) => setForm({ ...form, closed_at: v })} />
            </div>
          </div>

          {/* Target Info */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">対象情報</h2>
            <div className="grid grid-cols-2 gap-4">
              <FormSelect label="対象区分" value={form.target_type} onChange={(v) => setForm({ ...form, target_type: v })} options={[{ value: 'サーバー', label: 'サーバー' }, { value: 'アプリケーション', label: 'アプリケーション' }, { value: 'アカウント', label: 'アカウント' }]} />
              <FormInput label="対象名" value={form.target_name} onChange={(v) => setForm({ ...form, target_name: v })} />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">内容</h2>
            <FormTextarea label="問合せ内容" value={form.inquiry_detail} onChange={(v) => setForm({ ...form, inquiry_detail: v })} required rows={4} />
            <FormTextarea label="対応内容" value={form.response_detail} onChange={(v) => setForm({ ...form, response_detail: v })} rows={4} />
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">資料</h2>
            <FormInput label="資料保存先パス1" value={form.document_path1} onChange={(v) => setForm({ ...form, document_path1: v })} />
            <FormInput label="資料保存先パス2" value={form.document_path2} onChange={(v) => setForm({ ...form, document_path2: v })} />
            <FormInput label="資料保存先パス3" value={form.document_path3} onChange={(v) => setForm({ ...form, document_path3: v })} />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <PrimaryButton onClick={handleSave}><Save className="w-4 h-4 mr-1 inline" />保存</PrimaryButton>
            <SecondaryButton onClick={() => setForm({ incident_type: '', customer_id: '', customer_contact_name: '', title: '', occurred_at: '', started_at: '', closed_at: '', target_type: '', target_name: '', inquiry_detail: '', response_detail: '', document_path1: '', document_path2: '', document_path3: '' })}>クリア</SecondaryButton>
            <SecondaryButton onClick={() => onNavigate('SCR003')}><ArrowLeft className="w-4 h-4 mr-1 inline" />戻る</SecondaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SCR005 Incident Detail
// ============================================
function IncidentDetailScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const incident = dummyIncidents[0];
  const [workLogs] = useState<WorkLog[]>(dummyWorkLogs);
  const [newLog, setNewLog] = useState({ user_id: '', work_date: '', work_time: '', work_detail: '' });
  const [showLogForm, setShowLogForm] = useState(false);
  const [error, setError] = useState('');

  const handleAddLog = () => {
    if (!newLog.work_time) {
      setError('対応時間を入力してください');
      return;
    }
    alert('履歴を追加しました（モック）');
    setShowLogForm(false);
  };

  const handleComplete = () => {
    alert('ステータスを完了に変更しました（モック）');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="インシデント詳細" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex justify-between items-start mb-4 border-b pb-2">
              <h2 className="font-semibold text-gray-800">基本情報</h2>
              <StatusBadge status={incident.status} />
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div><span className="text-gray-500">区分:</span> {incident.incident_type}</div>
              <div><span className="text-gray-500">顧客:</span> {incident.customer_name}</div>
              <div><span className="text-gray-500">顧客担当者:</span> {incident.customer_contact_name}</div>
              <div><span className="text-gray-500">タイトル:</span> {incident.title}</div>
              <div><span className="text-gray-500">発生日:</span> {incident.occurred_at}</div>
              <div><span className="text-gray-500">対応開始日:</span> {incident.started_at || '-'}</div>
              <div><span className="text-gray-500">対応終了日:</span> {incident.closed_at || '-'}</div>
              <div><span className="text-gray-500">担当者:</span> {incident.user_name || '-'}</div>
            </div>
          </div>

          {/* Target Info */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">対象情報</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-gray-500">対象区分:</span> {incident.target_type || '-'}</div>
              <div><span className="text-gray-500">対象名:</span> {incident.target_name || '-'}</div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">内容</h2>
            <div className="mb-3">
              <span className="text-gray-500 text-sm">問合せ内容:</span>
              <p className="mt-1">{incident.inquiry_detail}</p>
            </div>
            <div>
              <span className="text-gray-500 text-sm">対応内容:</span>
              <p className="mt-1">{incident.response_detail || '-'}</p>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">資料</h2>
            <div className="text-sm space-y-1">
              <div>{incident.document_path1 || '-'}</div>
              <div>{incident.document_path2 || '-'}</div>
              <div>{incident.document_path3 || '-'}</div>
            </div>
          </div>

          {/* Work Logs */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h2 className="font-semibold text-gray-800 mb-4 border-b pb-2">対応履歴</h2>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">対応者</th>
                  <th className="px-4 py-2 text-left">対応日時</th>
                  <th className="px-4 py-2 text-center">対応時間</th>
                  <th className="px-4 py-2 text-left">作業内容</th>
                </tr>
              </thead>
              <tbody>
                {workLogs.map((log) => (
                  <tr key={log.id} className="border-b">
                    <td className="px-4 py-2">{log.user_name}</td>
                    <td className="px-4 py-2">{log.work_date}</td>
                    <td className="px-4 py-2 text-center">{log.work_time}h</td>
                    <td className="px-4 py-2">{log.work_detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Log Form */}
          {showLogForm && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-800 mb-3">履歴追加</h3>
              {error && <AlertMessage type="error" message={error} />}
              <div className="grid grid-cols-2 gap-4">
                <FormSelect label="対応者" value={newLog.user_id} onChange={(v) => setNewLog({ ...newLog, user_id: v })} options={dummyUsers.map((u) => ({ value: String(u.id), label: u.user_name }))} required />
                <FormInput label="対応日時" type="datetime-local" value={newLog.work_date} onChange={(v) => setNewLog({ ...newLog, work_date: v })} required />
                <FormInput label="対応時間" type="number" value={newLog.work_time} onChange={(v) => setNewLog({ ...newLog, work_time: v })} required placeholder="時間(h)" />
                <FormTextarea label="作業内容" value={newLog.work_detail} onChange={(v) => setNewLog({ ...newLog, work_detail: v })} required />
              </div>
              <div className="flex gap-2 mt-4">
                <PrimaryButton onClick={handleAddLog}>履歴追加</PrimaryButton>
                <SecondaryButton onClick={() => setShowLogForm(false)}>キャンセル</SecondaryButton>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <PrimaryButton>更新</PrimaryButton>
            <PrimaryButton onClick={() => setShowLogForm(true)}><Plus className="w-4 h-4 mr-1 inline" />履歴追加</PrimaryButton>
            <PrimaryButton onClick={handleComplete} className="bg-orange-500 hover:bg-orange-600">完了</PrimaryButton>
            <SecondaryButton onClick={() => onNavigate('SCR003')}><ArrowLeft className="w-4 h-4 mr-1 inline" />戻る</SecondaryButton>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SCR006 User Master
// ============================================
function UserMasterScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const [search, setSearch] = useState({ login_id: '', user_name: '', is_admin: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [form, setForm] = useState({ login_id: '', password: '', user_name: '', is_admin: 'false' });
  const [errors, setErrors] = useState<string[]>([]);

  const filteredUsers = dummyUsers.filter((user) => {
    if (search.login_id && !user.login_id.includes(search.login_id)) return false;
    if (search.user_name && !user.user_name.includes(search.user_name)) return false;
    if (search.is_admin && String(user.is_admin) !== search.is_admin) return false;
    return true;
  });

  const handleOpenModal = (user?: User) => {
    if (user) {
      setEditUser(user);
      setForm({ login_id: user.login_id, password: '', user_name: user.user_name, is_admin: String(user.is_admin) });
    } else {
      setEditUser(null);
      setForm({ login_id: '', password: '', user_name: '', is_admin: 'false' });
    }
    setErrors([]);
    setShowModal(true);
  };

  const handleSave = () => {
    const newErrors: string[] = [];
    if (!form.login_id) newErrors.push('ログインIDを入力してください');
    if (!form.user_name) newErrors.push('ユーザー名を入力してください');
    if (!editUser && !form.password) newErrors.push('パスワードを入力してください');
    setErrors(newErrors);
    if (newErrors.length === 0) {
      alert(editUser ? '更新しました（モック）' : '登録しました（モック）');
      setShowModal(false);
    }
  };

  const handleDelete = () => {
    if (confirm('削除してよろしいですか？')) {
      alert('削除しました（モック）');
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="ユーザーマスタ" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Search Panel */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <FormInput label="ログインID" value={search.login_id} onChange={(v) => setSearch({ ...search, login_id: v })} />
              <FormInput label="ユーザー名" value={search.user_name} onChange={(v) => setSearch({ ...search, user_name: v })} />
              <FormSelect label="管理者区分" value={search.is_admin} onChange={(v) => setSearch({ ...search, is_admin: v })} options={[{ value: 'true', label: '管理者' }, { value: 'false', label: '一般' }]} />
            </div>
            <div className="flex gap-2 mt-4">
              <PrimaryButton onClick={() => setCurrentPage(1)}><Search className="w-4 h-4 mr-1 inline" />検索</PrimaryButton>
              <SecondaryButton onClick={() => setSearch({ login_id: '', user_name: '', is_admin: '' })}>クリア</SecondaryButton>
            </div>
          </div>

          {/* Table */}
          <div className="mb-4 flex justify-end">
            <PrimaryButton onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-1 inline" />新規登録</PrimaryButton>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ログインID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ユーザー名</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">管理者</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">作成日時</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{user.login_id}</td>
                    <td className="px-4 py-2 text-sm">{user.user_name}</td>
                    <td className="px-4 py-2 text-center text-sm">{user.is_admin ? <span className="text-blue-600 font-medium">○</span> : '-'}</td>
                    <td className="px-4 py-2 text-sm">{user.created_at}</td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleOpenModal(user)} className="text-blue-600 text-sm hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                      <button onClick={handleDelete} className="text-red-600 text-sm hover:underline ml-2"><Trash2 className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={2} onPageChange={setCurrentPage} />

          {/* Modal */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editUser ? 'ユーザー編集' : 'ユーザー登録'}>
            {errors.length > 0 && (
              <div className="mb-4 space-y-1">
                {errors.map((e, i) => <AlertMessage key={i} type="error" message={e} />)}
              </div>
            )}
            <FormInput label="ログインID" value={form.login_id} onChange={(v) => setForm({ ...form, login_id: v })} required />
            <FormInput label="パスワード" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required={!editUser} />
            <FormInput label="ユーザー名" value={form.user_name} onChange={(v) => setForm({ ...form, user_name: v })} required />
            <FormSelect label="管理者区分" value={form.is_admin} onChange={(v) => setForm({ ...form, is_admin: v })} options={[{ value: 'true', label: '管理者' }, { value: 'false', label: '一般' }]} required />
            <div className="flex gap-2 mt-4">
              <PrimaryButton onClick={handleSave}><Save className="w-4 h-4 mr-1 inline" />保存</PrimaryButton>
              {editUser && <DangerButton onClick={handleDelete}><Trash2 className="w-4 h-4 mr-1 inline" />削除</DangerButton>}
              <SecondaryButton onClick={() => setShowModal(false)}>閉じる</SecondaryButton>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}

// ============================================
// SCR007 Customer Master
// ============================================
function CustomerMasterScreen({ onNavigate }: { onNavigate: (id: ScreenId) => void }) {
  const [search, setSearch] = useState({ customer_name: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [form, setForm] = useState({ customer_name: '' });
  const [error, setError] = useState('');

  const filteredCustomers = dummyCustomers.filter((customer) => {
    if (search.customer_name && !customer.customer_name.includes(search.customer_name)) return false;
    return true;
  });

  const handleOpenModal = (customer?: Customer) => {
    if (customer) {
      setEditCustomer(customer);
      setForm({ customer_name: customer.customer_name });
    } else {
      setEditCustomer(null);
      setForm({ customer_name: '' });
    }
    setError('');
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.customer_name) {
      setError('顧客名を入力してください');
      return;
    }
    alert(editCustomer ? '更新しました（モック）' : '登録しました（モック）');
    setShowModal(false);
  };

  const handleDelete = () => {
    if (confirm('削除してよろしいですか？')) {
      alert('削除しました（モック）');
      setShowModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="顧客マスタ" isLoggedIn={true} onLogout={() => {}} onNavigate={onNavigate} />
      <main className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Search Panel */}
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-2">
                <FormInput label="顧客名" value={search.customer_name} onChange={(v) => setSearch({ ...search, customer_name: v })} />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <PrimaryButton onClick={() => setCurrentPage(1)}><Search className="w-4 h-4 mr-1 inline" />検索</PrimaryButton>
              <SecondaryButton onClick={() => setSearch({ customer_name: '' })}>クリア</SecondaryButton>
            </div>
          </div>

          {/* Table */}
          <div className="mb-4 flex justify-end">
            <PrimaryButton onClick={() => handleOpenModal()}><Plus className="w-4 h-4 mr-1 inline" />新規登録</PrimaryButton>
          </div>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">顧客ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">顧客名</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">作成日時</th>
                  <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm">{customer.id}</td>
                    <td className="px-4 py-2 text-sm">{customer.customer_name}</td>
                    <td className="px-4 py-2 text-sm">{customer.created_at}</td>
                    <td className="px-4 py-2 text-center">
                      <button onClick={() => handleOpenModal(customer)} className="text-blue-600 text-sm hover:underline"><Edit2 className="w-4 h-4 inline" /></button>
                      <button onClick={handleDelete} className="text-red-600 text-sm hover:underline ml-2"><Trash2 className="w-4 h-4 inline" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination currentPage={currentPage} totalPages={2} onPageChange={setCurrentPage} />

          {/* Modal */}
          <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editCustomer ? '顧客編集' : '顧客登録'}>
            {error && <AlertMessage type="error" message={error} />}
            <FormInput label="顧客名" value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} required />
            <div className="flex gap-2 mt-4">
              <PrimaryButton onClick={handleSave}><Save className="w-4 h-4 mr-1 inline" />保存</PrimaryButton>
              {editCustomer && <DangerButton onClick={handleDelete}><Trash2 className="w-4 h-4 mr-1 inline" />削除</DangerButton>}
              <SecondaryButton onClick={() => setShowModal(false)}>閉じる</SecondaryButton>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}

// ============================================
// Main Component
// ============================================
export default function MockDesign() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('SCR001');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('SCR001');
  };

  const handleNavigate = (id: ScreenId) => setCurrentScreen(id);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SCR001':
        return <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
      case 'SCR002':
        return <DashboardScreen onNavigate={handleNavigate} />;
      case 'SCR003':
        return <IncidentListScreen onNavigate={handleNavigate} />;
      case 'SCR004':
        return <IncidentRegistrationScreen onNavigate={handleNavigate} />;
      case 'SCR005':
        return <IncidentDetailScreen onNavigate={handleNavigate} />;
      case 'SCR006':
        return <UserMasterScreen onNavigate={handleNavigate} />;
      case 'SCR007':
        return <CustomerMasterScreen onNavigate={handleNavigate} />;
      default:
        return <LoginScreen onLogin={handleLogin} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        11 モック
      </h1>
      <div className="mb-4 text-sm text-gray-600">
        現在の画面: <span className="font-mono font-semibold">{currentScreen}</span>
      </div>
      <div className="border border-gray-300 rounded overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
}
