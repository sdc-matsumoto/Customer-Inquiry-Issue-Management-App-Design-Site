import { useState } from 'react';
import { Plus, Save, Search, ArrowLeft, XCircle, Trash2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, AlertCircle, CheckCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';

const colorRules = [
  { name: 'Primary', color: 'Blue', hex: '#0d6efd', usage: 'メインボタン、リンク' },
  { name: 'Success', color: 'Green', hex: '#198754', usage: '完了、成功メッセージ' },
  { name: 'Warning', color: 'Orange', hex: '#fd7e14', usage: '警告、保留状態' },
  { name: 'Danger', color: 'Red', hex: '#dc3545', usage: 'エラー、削除、危険操作' },
  { name: 'Secondary', color: 'Gray', hex: '#6c757d', usage: 'サブボタン、無効状態' },
];

const statusBadges = [
  { label: '未対応', bg: 'bg-gray-100', text: 'text-gray-700', hex: '#6c757d' },
  { label: '対応中', bg: 'bg-blue-100', text: 'text-blue-700', hex: '#0d6efd' },
  { label: '保留', bg: 'bg-orange-100', text: 'text-orange-700', hex: '#fd7e14' },
  { label: '完了', bg: 'bg-green-100', text: 'text-green-700', hex: '#198754' },
];

function ColorSwatch({ hex, name }: { hex: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded border border-gray-200" style={{ backgroundColor: hex }}></div>
      <div className="text-xs">
        <div className="font-semibold text-gray-700">{name}</div>
        <div className="font-mono text-gray-500">{hex}</div>
      </div>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-gray-200 rounded p-3 mb-3 bg-white">
      <h3 className="text-xs font-semibold text-gray-600 mb-2 pb-1 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );
}

function SampleButton({ variant, children, size = 'md' }: { variant: string; children: React.ReactNode; size?: string }) {
  const baseClasses = 'px-3 py-1.5 rounded text-xs font-medium transition-colors';
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : size === 'lg' ? 'px-4 py-2 text-sm' : '';

  const variants: Record<string, string> = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    success: 'bg-green-600 text-white hover:bg-green-700',
  };

  return (
    <button className={`${baseClasses} ${sizeClasses} ${variants[variant] || ''}`}>
      {children}
    </button>
  );
}

export default function CommonComponents() {
  const [selectedPageSize, setSelectedPageSize] = useState('20');

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4">
        09 共通部品設計
      </h1>

      {/* 01 Color Rules */}
      <SectionCard title="01 カラールール">
        <div className="grid grid-cols-5 gap-4">
          {colorRules.map((rule) => (
            <div key={rule.name} className="text-center">
              <ColorSwatch hex={rule.hex} name={rule.name} />
              <p className="text-xs text-gray-500 mt-1">{rule.usage}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 02 Buttons */}
      <SectionCard title="02 ボタン">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Primary:</span>
            <SampleButton variant="primary"><Plus className="w-3 h-3 inline mr-1" />新規登録</SampleButton>
            <SampleButton variant="primary"><Save className="w-3 h-3 inline mr-1" />保存</SampleButton>
            <SampleButton variant="success"><Search className="w-3 h-3 inline mr-1" />検索</SampleButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Secondary:</span>
            <SampleButton variant="secondary"><ArrowLeft className="w-3 h-3 inline mr-1" />戻る</SampleButton>
            <SampleButton variant="secondary"><XCircle className="w-3 h-3 inline mr-1" />閉じる</SampleButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Danger:</span>
            <SampleButton variant="danger"><Trash2 className="w-3 h-3 inline mr-1" />削除</SampleButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 w-16">Outline:</span>
            <SampleButton variant="outline">クリア</SampleButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 w-16">サイズ:</span>
            <SampleButton variant="primary" size="sm">sm</SampleButton>
            <SampleButton variant="primary" size="md">md</SampleButton>
            <SampleButton variant="primary" size="lg">lg</SampleButton>
          </div>
        </div>
      </SectionCard>

      {/* 03 Status Badges */}
      <SectionCard title="03 ステータスバッジ">
        <div className="flex gap-6">
          {statusBadges.map((badge) => (
            <div key={badge.label} className="text-center">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
                {badge.label}
              </span>
              <p className="text-xs text-gray-500 mt-1 font-mono">{badge.hex}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 04 Search Panel */}
      <SectionCard title="04 検索パネル">
        <div className="w-64 border border-gray-200 rounded p-3 bg-gray-50">
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">顧客名</label>
              <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs" placeholder="顧客名を入力" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">ステータス</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                <option>すべて</option>
                <option>未対応</option>
                <option>対応中</option>
                <option>保留</option>
                <option>完了</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">担当者</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                <option>すべて</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">対象区分</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                <option>すべて</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-0.5">日付From</label>
                <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-xs" />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-0.5">日付To</label>
                <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-xs" />
              </div>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <p className="text-xs text-gray-500 mb-1">クイックフィルタ</p>
              <label className="flex items-center gap-1.5 text-xs text-gray-600">
                <input type="checkbox" className="w-3 h-3" /> 自分の案件のみ
              </label>
              <label className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                <input type="checkbox" className="w-3 h-3" /> 未完了のみ
              </label>
            </div>
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-medium">検索</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-600">クリア</button>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* 05 Summary Cards */}
      <SectionCard title="05 サマリーカード">
        <div className="grid grid-cols-4 gap-2">
          {statusBadges.map((badge) => (
            <div key={badge.label} className={`border-l-4 rounded p-3 ${badge.bg}`} style={{ borderLeftColor: badge.hex }}>
              <div className="text-xs text-gray-600">{badge.label}件数</div>
              <div className="text-2xl font-bold text-gray-800">12</div>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* 06 List Card */}
      <SectionCard title="06 横長一覧カード">
        <div className="border border-gray-200 rounded p-3 bg-gray-50 hover:shadow-sm transition-shadow">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">対応中</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-sm text-gray-800">株式会社サンプル</span>
                <span className="text-xs text-gray-400">INC-2024-001</span>
              </div>
              <p className="text-sm text-gray-700 mb-1 truncate">サーバー障害に関する問合せ</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>最新対応者: 山田 太郎</span>
                <span>対象: サーバー</span>
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-xs text-gray-500">発生日</div>
              <div className="text-sm text-gray-700">2024/01/15</div>
            </div>
          </div>
          <div className="flex gap-2 mt-3 pt-2 border-t border-gray-200">
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs">詳細</button>
            <button className="px-3 py-1 border border-gray-300 text-gray-600 rounded text-xs">編集</button>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-xs">完了</button>
          </div>
        </div>
      </SectionCard>

      {/* 07 Table */}
      <SectionCard title="07 テーブル">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs text-gray-500">表示件数:</span>
          <select className="border border-gray-300 rounded px-2 py-0.5 text-xs" value={selectedPageSize} onChange={(e) => setSelectedPageSize(e.target.value)}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
        <table className="w-full text-xs border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">対応者</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">対応日時</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-center font-semibold text-gray-700 w-16">対応時間</th>
              <th className="border-b border-gray-200 px-2 py-1.5 text-left font-semibold text-gray-700">作業内容</th>
            </tr>
          </thead>
          <tbody>
            {[
              { user: '山田 太郎', date: '2024/01/15 10:00', time: '2.0', detail: 'ログ解析を実施' },
              { user: '佐藤 花子', date: '2024/01/15 14:00', time: '1.5', detail: '顧客へ状況報告メール送信' },
              { user: '山田 太郎', date: '2024/01/16 09:00', time: '3.0', detail: '根本原因調査と修正対応' },
            ].map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border-b border-gray-100 px-2 py-1.5">{row.user}</td>
                <td className="border-b border-gray-100 px-2 py-1.5">{row.date}</td>
                <td className="border-b border-gray-100 px-2 py-1.5 text-center">{row.time}h</td>
                <td className="border-b border-gray-100 px-2 py-1.5">{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>

      {/* 08 Pagination */}
      <SectionCard title="08 ページネーション">
        <div className="flex items-center gap-1">
          <button className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
            <ChevronsLeft className="w-3 h-3" />
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
            <ChevronLeft className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded text-xs">1</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
            <ChevronRight className="w-3 h-3" />
          </button>
          <button className="px-2 py-1 border border-gray-300 rounded text-xs text-gray-600 hover:bg-gray-50">
            <ChevronsRight className="w-3 h-3" />
          </button>
        </div>
      </SectionCard>

      {/* 09 Modal */}
      <SectionCard title="09 モーダル">
        <div className="border border-gray-300 rounded shadow-lg w-80 bg-white">
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">確認</span>
            <button className="text-gray-400 hover:text-gray-600"><XCircle className="w-4 h-4" /></button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-700">削除してもよろしいですか？</p>
            <p className="text-xs text-gray-500 mt-1">この操作は取り消せません。</p>
          </div>
          <div className="px-4 py-2 border-t border-gray-200 flex justify-end gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded text-xs text-gray-600">キャンセル</button>
            <button className="px-3 py-1.5 bg-red-600 text-white rounded text-xs">削除</button>
          </div>
        </div>
      </SectionCard>

      {/* 10 Form Parts */}
      <SectionCard title="10 フォーム部品">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">
                テキストボックス <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border border-gray-300 rounded px-2 py-1 text-xs" placeholder="入力してください" />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">コンボボックス</label>
              <select className="w-full border border-gray-300 rounded px-2 py-1 text-xs">
                <option>選択してください</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">日付入力</label>
              <input type="date" className="w-full border border-gray-300 rounded px-2 py-1 text-xs" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">テキストエリア</label>
              <textarea className="w-full border border-gray-300 rounded px-2 py-1 text-xs h-16" placeholder="複数行入力可"></textarea>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">チェックボックス</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input type="checkbox" className="w-3 h-3" /> オプション1
                </label>
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input type="checkbox" className="w-3 h-3" /> オプション2
                </label>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-0.5">ラジオボタン</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input type="radio" name="radio" className="w-3 h-3" /> 選択肢1
                </label>
                <label className="flex items-center gap-1 text-xs text-gray-600">
                  <input type="radio" name="radio" className="w-3 h-3" /> 選択肢2
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* Error example */}
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded">
          <div className="flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="w-3 h-3" />
            <span>入力内容に誤りがあります</span>
          </div>
        </div>
      </SectionCard>

      {/* 11 Messages */}
      <SectionCard title="11 メッセージ表示">
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-xs text-green-700">保存しました</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 border border-yellow-200 rounded">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs text-yellow-700">入力内容を確認してください</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-xs text-red-700">エラーが発生しました</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded">
            <Info className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-700">検索条件を入力してください</span>
          </div>
        </div>
      </SectionCard>

      {/* 12 Loading */}
      <SectionCard title="12 ローディング表示">
        <div className="flex items-center gap-2">
          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </SectionCard>

      {/* 13 Layout */}
      <SectionCard title="13 共通レイアウト">
        <div className="border border-gray-300 rounded overflow-hidden">
          <div className="bg-gray-700 text-white text-center py-1 text-xs">ヘッダー</div>
          <div className="flex">
            <div className="w-32 bg-gray-100 p-2 border-r border-gray-200">
              <div className="text-xs text-gray-500 text-center">検索パネル</div>
              <div className="space-y-1 mt-2">
                <div className="bg-gray-200 h-4 rounded text-xs"></div>
                <div className="bg-gray-200 h-4 rounded text-xs"></div>
                <div className="bg-gray-200 h-4 rounded text-xs"></div>
              </div>
            </div>
            <div className="flex-1 p-2">
              <div className="grid grid-cols-4 gap-1 mb-2">
                <div className="bg-blue-100 h-6 rounded text-xs flex items-center justify-center">サマリー1</div>
                <div className="bg-blue-100 h-6 rounded text-xs flex items-center justify-center">サマリー2</div>
                <div className="bg-blue-100 h-6 rounded text-xs flex items-center justify-center">サマリー3</div>
                <div className="bg-blue-100 h-6 rounded text-xs flex items-center justify-center">サマリー4</div>
              </div>
              <div className="space-y-1">
                <div className="bg-gray-100 h-8 rounded text-xs p-1">一覧カード1</div>
                <div className="bg-gray-100 h-8 rounded text-xs p-1">一覧カード2</div>
                <div className="bg-gray-100 h-8 rounded text-xs p-1">一覧カード3</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 text-gray-600 text-center py-1 text-xs border-t border-gray-300">フッター</div>
        </div>
      </SectionCard>
    </div>
  );
}
