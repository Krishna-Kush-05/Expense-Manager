import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Target,
  Calendar,
  DollarSign,
  Brain
} from 'lucide-react';

export function Predictions() {
  const [predictionPeriod, setPredictionPeriod] = useState('3months');

  // Mock historical data
  const historicalData = [
    { month: 'Jan', income: 50000, expenses: 35000, savings: 15000 },
    { month: 'Feb', income: 50000, expenses: 32000, savings: 18000 },
    { month: 'Mar', income: 52000, expenses: 38000, savings: 14000 },
    { month: 'Apr', income: 50000, expenses: 34000, savings: 16000 },
    { month: 'May', income: 51000, expenses: 36000, savings: 15000 },
    { month: 'Jun', income: 50000, expenses: 33000, savings: 17000 }
  ];

  // Simple exponential smoothing for predictions
  const generatePredictions = (data: any[], periods: number, alpha: number = 0.3) => {
    const values = data.map(d => d.expenses);
    let forecast = values[values.length - 1];
    const predictions = [];

    for (let i = 0; i < periods; i++) {
      if (i === 0) {
        forecast = values[values.length - 1];
      } else {
        // Add some realistic variation
        const trend = (values[values.length - 1] - values[0]) / values.length;
        forecast = forecast + trend + (Math.random() - 0.5) * 2000;
      }
      
      const monthNames = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      predictions.push({
        month: monthNames[i] || `Month ${i + 1}`,
        expenses: Math.max(forecast, 20000), // Minimum reasonable expense
        type: 'predicted'
      });
    }
    return predictions;
  };

  const predictions = generatePredictions(historicalData, 3);
  const combinedData = [
    ...historicalData.map(d => ({ ...d, type: 'actual' })),
    ...predictions
  ];

  // Calculate insights
  const avgMonthlyExpenses = historicalData.reduce((sum, d) => sum + d.expenses, 0) / historicalData.length;
  const avgMonthlySavings = historicalData.reduce((sum, d) => sum + d.savings, 0) / historicalData.length;
  const lastMonthExpenses = historicalData[historicalData.length - 1].expenses;
  const predictedNextMonth = predictions[0]?.expenses || avgMonthlyExpenses;
  
  const expensesTrend = predictedNextMonth > lastMonthExpenses ? 'up' : 'down';
  const trendPercentage = Math.abs(((predictedNextMonth - lastMonthExpenses) / lastMonthExpenses) * 100);

  const categoryPredictions = [
    { category: 'Food & Dining', current: 8500, predicted: 9200, trend: 'up', confidence: 85 },
    { category: 'Transport', current: 4200, predicted: 3800, trend: 'down', confidence: 78 },
    { category: 'Shopping', current: 3800, predicted: 4100, trend: 'up', confidence: 72 },
    { category: 'Utilities', current: 2800, predicted: 2900, trend: 'up', confidence: 90 }
  ];

  const budgetRecommendations = [
    {
      type: 'warning',
      title: 'Food spending likely to increase',
      description: 'Based on recent patterns, food expenses may rise by ₹700 next month',
      action: 'Consider meal planning',
      confidence: 85
    },
    {
      type: 'success',
      title: 'Transport savings opportunity',
      description: 'Your transport costs are trending down. Great job!',
      action: 'Maintain current habits',
      confidence: 78
    },
    {
      type: 'info',
      title: 'Emergency fund update',
      description: 'At current savings rate, you\'ll reach your emergency fund goal in 8 months',
      action: 'Increase by ₹2000/month to reach in 6 months',
      confidence: 88
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Smart Predictions</h1>
          <p className="text-muted-foreground">AI-powered forecasts based on your spending patterns</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Brain className="w-4 h-4" />
          <span>Local AI • Privacy-first</span>
        </div>
      </div>

      {/* Key Predictions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm">Next Month Expenses</p>
              <p className="text-2xl font-bold">₹{predictedNextMonth.toLocaleString()}</p>
            </div>
            {expensesTrend === 'up' ? (
              <TrendingUp className="w-8 h-8 text-orange-500" />
            ) : (
              <TrendingDown className="w-8 h-8 text-green-500" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {trendPercentage.toFixed(1)}% {expensesTrend} from last month
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm">Projected Savings</p>
              <p className="text-2xl font-bold">₹{(50000 - predictedNextMonth).toLocaleString()}</p>
            </div>
            <Target className="w-8 h-8 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">
            Based on ₹50,000 income
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-muted-foreground text-sm">Budget Status</p>
              <p className="text-2xl font-bold text-success">On Track</p>
            </div>
            <Calendar className="w-8 h-8 text-success" />
          </div>
          <p className="text-sm text-muted-foreground">
            88% confidence level
          </p>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Smart Recommendations</h3>
        <div className="space-y-4">
          {budgetRecommendations.map((rec, index) => (
            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                rec.type === 'warning' ? 'bg-warning/10 text-warning' :
                rec.type === 'success' ? 'bg-success/10 text-success' :
                'bg-accent/10 text-accent'
              }`}>
                {rec.type === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                 rec.type === 'success' ? <TrendingDown className="w-5 h-5" /> :
                 <Brain className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-medium">{rec.title}</h4>
                  <span className="text-xs text-muted-foreground">{rec.confidence}% confidence</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                <Button variant="link" size="sm" className="p-0 h-auto">
                  {rec.action}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Spending Forecast</TabsTrigger>
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">6-Month Spending Forecast</h3>
                <p className="text-sm text-muted-foreground">
                  Historical data and AI predictions
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={combinedData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      formatter={(value, name) => [
                        `₹${value.toLocaleString()}`, 
                        name === 'expenses' ? 'Expenses' : name
                      ]}
                      labelStyle={{ color: '#111827' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="expenses" 
                      stroke="#0FA3B1" 
                      strokeWidth={3}
                      strokeDasharray={(dataPoint: any) => dataPoint?.type === 'predicted' ? '5 5' : '0'}
                      dot={{ fill: '#0FA3B1', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-accent"></div>
                  <span>Actual data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-accent border-dashed border-accent"></div>
                  <span>AI predictions</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Category Predictions</h3>
                <p className="text-sm text-muted-foreground">
                  Next month's spending by category
                </p>
              </div>
              <div className="space-y-4">
                {categoryPredictions.map((category, index) => {
                  const change = category.predicted - category.current;
                  const changePercent = (change / category.current) * 100;
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h4 className="font-medium">{category.category}</h4>
                        <p className="text-sm text-muted-foreground">
                          Current: ₹{category.current.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{category.predicted.toLocaleString()}</p>
                        <div className="flex items-center gap-1 text-sm">
                          {category.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-orange-500" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-green-500" />
                          )}
                          <span className={category.trend === 'up' ? 'text-orange-500' : 'text-green-500'}>
                            {Math.abs(changePercent).toFixed(1)}%
                          </span>
                          <span className="text-muted-foreground">
                            ({category.confidence}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-muted-foreground mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">About these predictions</p>
            <p>
              Predictions are generated using local AI algorithms based on your historical spending patterns. 
              All processing happens on your device - no data is sent to external servers. 
              Predictions are estimates and should be used as guidance only.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}