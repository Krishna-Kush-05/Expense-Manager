import { useState } from 'react';
import { Button } from './ui/button';
import { 
  Home, 
  Plus, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Settings, 
  Menu,
  X
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobile?: boolean;
}

export function Navigation({ currentPage, onPageChange, isMobile = false }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'insights', label: 'Insights', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'predictions', label: 'Forecast', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-medium">B</span>
            </div>
            <span className="font-medium text-foreground">Billu Budget</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
            <div className="pt-16 px-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className="w-full justify-start gap-3 py-3"
                      onClick={() => {
                        onPageChange(item.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  size="sm"
                  className={`flex flex-col gap-1 py-2 px-3 h-auto ${
                    currentPage === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => onPageChange(item.id)}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  // Desktop Navigation
  return (
    <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-medium text-lg">B</span>
          </div>
          <div>
            <h1 className="font-medium text-foreground">Billu Budget</h1>
            <p className="text-sm text-muted-foreground">Smart expense tracker</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3 py-3"
              onClick={() => onPageChange(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Data stored locally & securely
        </p>
      </div>
    </div>
  );
}