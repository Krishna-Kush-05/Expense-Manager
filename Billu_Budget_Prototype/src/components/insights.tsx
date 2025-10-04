import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Coffee, 
  ShoppingBag, 
  Car, 
  Home,
  Utensils
} from 'lucide-react';

export function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - in real app this would come from local storage
  const spendingTrend = [
    { period: 'Jan', amount: 22000 },
    { period: 'Feb', amount: 18500 },
    { period: 'Mar', amount: 24000 },
    { period: 'Apr', amount: 19800 },
    { period: 'May', amount: 26500 },
    { period: 'Jun', amount: 23200 }
  ];

  const categoryData = [
    { category: 'Food & Dining', amount: 8500, color: '#0FA3B1', icon: Utensils },
    { category: 'Transport', amount: 4200, color: '#49C07B', icon: Car },
    { category: 'Shopping', amount: 3800, color: '#FFC857', icon: ShoppingBag },
    { category: 'Utilities', amount: 2800, color: '#0B2545', icon: Home },
    { category: 'Coffee', amount: 1900, color: '#F59E0B', icon: Coffee }
  ];

  const dailySpending = [
    { day: 'Mon', amount: 1200 },
    { day: 'Tue', amount: 800 },
    { day: 'Wed', amount: 2100 },
    { day: 'Thu', amount: 1500 },
    { day: 'Fri', amount: 3200 },
    { day: 'Sat', amount: 2800 },
    { day: 'Sun', amount: 1100 }
  ];

  const insights = [
    {
      type: 'warning',
      icon: AlertTriangle,
      title: 'Coffee spending up 40%',
      description: 'You spent ₹1,900 on coffee this month vs ₹1,350 last month',
      action: 'Set coffee budget'
    },
    {
      type: 'success',
      icon: TrendingDown,
      title: 'Great job on transport!',
      description: 'Transport costs down 15% from last month',
      action: 'Keep it up'
    },
    {
      type: 'info',
      icon: TrendingUp,
      title: 'Weekend spending pattern',
      description: 'You tend to spend 35% more on weekends',
      action: 'Plan weekend budget'
    }
  ];

  const totalSpent = categoryData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Insights</h1>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="capitalize"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <Card key={index} className="p-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  insight.type === 'warning' ? 'bg-warning/10 text-warning' :
                  insight.type === 'success' ? 'bg-success/10 text-success' :
                  'bg-accent/10 text-accent'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{insight.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-2">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trend">Spending Trend</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="daily">Daily Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="trend">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Spending Trend</h3>
                <p className="text-sm text-muted-foreground">Monthly spending over time</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={spendingTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="period" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                      labelStyle={{ color: '#111827' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#0FA3B1" 
                      strokeWidth={3}
                      dot={{ fill: '#0FA3B1', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Category Distribution</h3>
                  <p className="text-sm text-muted-foreground">This month's spending breakdown</p>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="amount"
                        label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Category Details</h3>
                  <p className="text-sm text-muted-foreground">Total: ₹{totalSpent.toLocaleString()}</p>
                </div>
                <div className="space-y-3">
                  {categoryData.map((category, index) => {
                    const Icon = category.icon;
                    const percentage = (category.amount / totalSpent) * 100;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${category.color}20` }}>
                          <Icon className="w-4 h-4" style={{ color: category.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{category.category}</span>
                            <span className="font-medium">₹{category.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{percentage.toFixed(1)}% of total</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="daily">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Daily Spending</h3>
                <p className="text-sm text-muted-foreground">This week's daily breakdown</p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpending}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
                      labelStyle={{ color: '#111827' }}
                    />
                    <Bar dataKey="amount" fill="#0FA3B1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}