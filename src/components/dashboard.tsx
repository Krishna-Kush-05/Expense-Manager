import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target,
  Coffee,
  ShoppingBag,
  Car,
  Home,
  MoreHorizontal
} from 'lucide-react';

interface DashboardProps {
  userName?: string;
  onQuickAdd: () => void;
}

export function Dashboard({ userName, onQuickAdd }: DashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real app this would come from local storage
  const kpiData = {
    balance: 45750,
    budgetLeft: 12500,
    budgetTotal: 25000,
    savingsRate: 23,
    monthlyIncome: 50000
  };

  const recentTransactions = [
    { id: 1, category: 'Coffee', amount: 150, merchant: 'Starbucks', time: '2 hours ago', icon: Coffee },
    { id: 2, category: 'Groceries', amount: 2500, merchant: 'Big Bazaar', time: 'Yesterday', icon: ShoppingBag },
    { id: 3, category: 'Transport', amount: 200, merchant: 'Uber', time: 'Yesterday', icon: Car },
    { id: 4, category: 'Utilities', amount: 1200, merchant: 'Electricity Bill', time: '2 days ago', icon: Home }
  ];

  const quickAddCategories = [
    { name: 'Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
    { name: 'Food', icon: ShoppingBag, color: 'bg-green-100 text-green-700' },
    { name: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-700' },
    { name: 'More', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-700' }
  ];

  const currentHour = currentTime.getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 17 ? 'Good afternoon' : 'Good evening';

  const budgetUsedPercentage = ((kpiData.budgetTotal - kpiData.budgetLeft) / kpiData.budgetTotal) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl">
          {greeting}{userName ? `, ${userName}` : ''}!
        </h1>
        <p className="text-muted-foreground">
          {currentTime.toLocaleDateString('en-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground/80 text-sm">Current Balance</p>
              <p className="text-2xl font-bold">₹{kpiData.balance.toLocaleString()}</p>
            </div>
            <Wallet className="w-8 h-8 text-primary-foreground/80" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm">Budget Left</p>
              <p className="text-2xl font-bold">₹{kpiData.budgetLeft.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Progress value={budgetUsedPercentage} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {budgetUsedPercentage.toFixed(0)}% of ₹{kpiData.budgetTotal.toLocaleString()} used
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-success to-success/80 text-success-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-success-foreground/80 text-sm">Savings Rate</p>
              <p className="text-2xl font-bold">{kpiData.savingsRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success-foreground/80" />
          </div>
        </Card>
      </div>

      {/* Quick Add Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Quick Add</h3>
          <Button variant="ghost" size="sm" onClick={onQuickAdd}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {quickAddCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Button
                key={index}
                variant="ghost"
                className="h-auto flex-col gap-2 py-4"
                onClick={onQuickAdd}
              >
                <div className={`w-10 h-10 rounded-full ${category.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs">{category.name}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Transactions</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentTransactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.merchant}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">-₹{transaction.amount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-20 md:bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
        onClick={onQuickAdd}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
}