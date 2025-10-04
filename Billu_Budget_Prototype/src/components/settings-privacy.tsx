import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { 
  Shield, 
  Smartphone, 
  Download, 
  Upload, 
  Trash2, 
  Lock, 
  Eye, 
  EyeOff,
  Bell,
  Moon,
  Sun,
  Globe,
  Database,
  FileText
} from 'lucide-react';

export function SettingsPrivacy() {
  const [settings, setSettings] = useState({
    biometricLock: true,
    notifications: true,
    darkMode: false,
    autoBackup: false,
    analytics: false,
    currency: 'INR',
    language: 'en',
    budgetAlerts: true,
    goalReminders: true
  });

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // In real app, this would save to localStorage
    localStorage.setItem('billu-settings', JSON.stringify({ ...settings, [key]: value }));
  };

  const exportData = () => {
    const userData = localStorage.getItem('billu-user-data');
    const transactions = localStorage.getItem('billu-transactions');
    const goals = localStorage.getItem('billu-goals');
    
    const exportData = {
      userData: userData ? JSON.parse(userData) : null,
      transactions: transactions ? JSON.parse(transactions) : [],
      goals: goals ? JSON.parse(goals) : [],
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billu-budget-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAllData = () => {
    localStorage.removeItem('billu-user-data');
    localStorage.removeItem('billu-transactions');
    localStorage.removeItem('billu-goals');
    localStorage.removeItem('billu-settings');
    window.location.reload();
  };

  const settingSections = [
    {
      title: 'Security & Privacy',
      icon: Shield,
      settings: [
        {
          key: 'biometricLock',
          label: 'Biometric Lock',
          description: 'Use fingerprint or face ID to secure the app',
          type: 'switch',
          icon: Lock
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      settings: [
        {
          key: 'notifications',
          label: 'Push Notifications',
          description: 'Receive notifications for budget alerts and reminders',
          type: 'switch',
          icon: Bell
        },
        {
          key: 'budgetAlerts',
          label: 'Budget Alerts',
          description: 'Get notified when approaching budget limits',
          type: 'switch',
          icon: Bell
        },
        {
          key: 'goalReminders',
          label: 'Goal Reminders',
          description: 'Weekly reminders about your savings goals',
          type: 'switch',
          icon: Bell
        }
      ]
    },
    {
      title: 'Appearance',
      icon: Eye,
      settings: [
        {
          key: 'darkMode',
          label: 'Dark Mode',
          description: 'Switch to dark theme',
          type: 'switch',
          icon: Moon
        },
        {
          key: 'currency',
          label: 'Currency',
          description: 'Default currency for amounts',
          type: 'select',
          icon: Globe,
          options: [
            { value: 'INR', label: '₹ Indian Rupee' },
            { value: 'USD', label: '$ US Dollar' },
            { value: 'EUR', label: '€ Euro' },
            { value: 'GBP', label: '£ British Pound' }
          ]
        }
      ]
    },
    {
      title: 'Data & Backup',
      icon: Database,
      settings: [
        {
          key: 'autoBackup',
          label: 'Auto Backup',
          description: 'Automatically backup data to encrypted cloud storage',
          type: 'switch',
          icon: Upload
        },
        {
          key: 'analytics',
          label: 'Anonymous Analytics',
          description: 'Help improve the app with anonymous usage data',
          type: 'switch',
          icon: FileText
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings & Privacy</h1>
        <p className="text-muted-foreground">Manage your preferences and data</p>
      </div>

      {/* Privacy First Banner */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-2">Privacy First Approach</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Your financial data stays on your device by default. All processing happens locally. 
              Cloud sync is optional and uses end-to-end encryption.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Smartphone className="w-3 h-3" />
                <span>Local storage</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Encrypted backups</span>
              </div>
              <div className="flex items-center gap-1">
                <EyeOff className="w-3 h-3" />
                <span>No tracking</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => {
        const SectionIcon = section.icon;
        return (
          <Card key={sectionIndex} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <SectionIcon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.settings.map((setting, settingIndex) => {
                const SettingIcon = setting.icon;
                return (
                  <div key={settingIndex} className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <SettingIcon className="w-4 h-4 text-muted-foreground mt-1" />
                      <div>
                        <Label className="text-sm font-medium">{setting.label}</Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    
                    {setting.type === 'switch' ? (
                      <Switch
                        checked={settings[setting.key as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                      />
                    ) : setting.type === 'select' ? (
                      <Select
                        value={settings[setting.key as keyof typeof settings] as string}
                        onValueChange={(value) => updateSetting(setting.key, value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {setting.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Card>
        );
      })}

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Data Management</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium">Export Data</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Download all your data as JSON file
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-destructive">Delete All Data</Label>
              <p className="text-xs text-muted-foreground mt-1">
                Permanently delete all your data from this device
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete All Data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your 
                    transactions, goals, and settings from this device.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteAllData} className="bg-destructive text-destructive-foreground">
                    Delete Everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </Card>

      {/* App Info */}
      <Card className="p-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-2xl">B</span>
          </div>
          <h3 className="font-semibold">Billu Budget</h3>
          <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">
            A privacy-first expense tracker built with love
          </p>
        </div>
      </Card>
    </div>
  );
}