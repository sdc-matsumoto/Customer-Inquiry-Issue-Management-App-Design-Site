import { useState } from 'react';
import { FileText, Settings, Users, LayoutGrid, GitBranch, BookOpen, Database, Code, CheckSquare, Palette, Monitor, Smartphone } from 'lucide-react';
import SystemOverview from './components/SystemOverview';
import BusinessFlow from './components/BusinessFlow';
import PermissionDesign from './components/PermissionDesign';
import ScreenList from './components/ScreenList';
import ScreenTransition from './components/ScreenTransition';
import DatabaseDesign from './components/DatabaseDesign';
import ApiDesign from './components/ApiDesign';
import ValidationDesign from './components/ValidationDesign';
import CommonComponents from './components/CommonComponents';
import ScreenDesign from './components/ScreenDesign';
import MockDesign from './components/MockDesign';

const menuItems = [
  { id: '01', title: 'システム概要', icon: BookOpen },
  { id: '02', title: '業務フロー', icon: GitBranch },
  { id: '03', title: '権限設計', icon: Users },
  { id: '04', title: '画面一覧', icon: LayoutGrid },
  { id: '05', title: '画面遷移図', icon: FileText },
  { id: '06', title: 'DB設計', icon: Database },
  { id: '07', title: 'API設計', icon: Code },
  { id: '08', title: 'バリデーション設計', icon: CheckSquare },
  { id: '09', title: '共通部品設計', icon: Palette },
  { id: '10', title: '画面設計', icon: Monitor },
  { id: '11', title: 'モック', icon: Smartphone },
];

function App() {
  const [activePage, setActivePage] = useState('01');

  const renderContent = () => {
    switch (activePage) {
      case '01':
        return <SystemOverview />;
      case '02':
        return <BusinessFlow />;
      case '03':
        return <PermissionDesign />;
      case '04':
        return <ScreenList />;
      case '05':
        return <ScreenTransition />;
      case '06':
        return <DatabaseDesign />;
      case '07':
        return <ApiDesign />;
      case '08':
        return <ValidationDesign />;
      case '09':
        return <CommonComponents />;
      case '10':
        return <ScreenDesign />;
      case '11':
        return <MockDesign />;
      default:
        return <SystemOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex-shrink-0 fixed left-0 top-0 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-800 text-sm">設計書管理</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">顧客問合せ・障害管理アプリ</p>
        </div>
        <nav className="p-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.id} {item.title}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-6 max-w-5xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
