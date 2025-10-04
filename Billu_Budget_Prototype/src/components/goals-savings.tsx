import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Plus, 
  Target, 
  Home, 
  Car, 
  Plane, 
  GraduationCap,
  Heart,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: string;
  icon: any;
  color: string;
}

export function GoalsSavings() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      name: 'Emergency Fund',
      targetAmount: 300000,
      currentAmount: 125000,
      targetDate: '2024-12-31',
      category: 'emergency',
      icon: Heart,
      color: 'bg-red-100 text-red-700'
    },
    {
      id: '2',
      name: 'Vacation to Japan',
      targetAmount: 150000,
      currentAmount: 45000,
      targetDate: '2024-08-15',
      category: 'travel',
      icon: Plane,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: '3',
      name: 'New Laptop',
      targetAmount: 80000,
      currentAmount: 62000,
      targetDate: '2024-06-30',
      category: 'electronics',
      icon: GraduationCap,
      color: 'bg-purple-100 text-purple-700'
    }
  ]);

  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    category: ''
  });

  const goalCategories = [
    { id: 'emergency', name: 'Emergency Fund', icon: Heart, color: 'bg-red-100 text-red-700' },
    { id: 'travel', name: 'Travel', icon: Plane, color: 'bg-blue-100 text-blue-700' },
    { id: 'home', name: 'Home & Property', icon: Home, color: 'bg-green-100 text-green-700' },
    { id: 'vehicle', name: 'Vehicle', icon: Car, color: 'bg-orange-100 text-orange-700' },
    { id: 'education', name: 'Education', icon: GraduationCap, color: 'bg-purple-100 text-purple-700' },
    { id: 'electronics', name: 'Electronics', icon: GraduationCap, color: 'bg-indigo-100 text-indigo-700' }
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(diffMonths, 0);
  };

  const calculateMonthlySavingsNeeded = (goal: Goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    const monthsLeft = calculateMonthsRemaining(goal.targetDate);
    return monthsLeft > 0 ? remaining / monthsLeft : 0;
  };

  const createGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.targetDate || !newGoal.category) return;

    const category = goalCategories.find(cat => cat.id === newGoal.category);
    if (!category) return;

    const goal: Goal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      icon: category.icon,
      color: category.color
    };

    setGoals([...goals, goal]);
    setNewGoal({ name: '', targetAmount: '', targetDate: '', category: '' });
    setShowCreateGoal(false);
  };

  const addMoney = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
        : goal
    ));
  };

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTargets = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = totalTargets > 0 ? (totalSaved / totalTargets) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Goals & Savings</h1>
          <p className="text-muted-foreground">Track your savings goals and celebrate milestones</p>
        </div>
        <Dialog open={showCreateGoal} onOpenChange={setShowCreateGoal}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input
                  placeholder="e.g., Emergency Fund, New Car..."
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Target Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Target Date</Label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setShowCreateGoal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={createGoal} className="flex-1">
                  Create Goal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Progress */}
      <Card className="p-6 bg-gradient-to-r from-accent/10 to-success/10">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Total Savings Progress</h3>
              <p className="text-2xl font-bold">₹{totalSaved.toLocaleString()}</p>
              <p className="text-muted-foreground">of ₹{totalTargets.toLocaleString()} target</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                <Target className="w-8 h-8 text-success" />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {overallProgress.toFixed(1)}% of total goals completed
            </p>
          </div>
        </div>
      </Card>

      {/* Goals List */}
      <div className="grid gap-4">
        {goals.map((goal) => {
          const Icon = goal.icon;
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const monthsRemaining = calculateMonthsRemaining(goal.targetDate);
          const monthlySavingsNeeded = calculateMonthlySavingsNeeded(goal);
          const isCompleted = progress >= 100;

          return (
            <Card key={goal.id} className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full ${goal.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{goal.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        ₹{goal.currentAmount.toLocaleString()} of ₹{goal.targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{progress.toFixed(1)}%</p>
                    {!isCompleted && (
                      <p className="text-xs text-muted-foreground">
                        {monthsRemaining} months left
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-sm text-success">
                      <Target className="w-4 h-4" />
                      Goal completed! 🎉
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>₹{monthlySavingsNeeded.toFixed(0)}/month needed</span>
                      </div>
                    </div>
                  )}
                </div>

                {!isCompleted && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addMoney(goal.id, 500)}
                    >
                      +₹500
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addMoney(goal.id, 1000)}
                    >
                      +₹1000
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addMoney(goal.id, 5000)}
                    >
                      +₹5000
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card className="p-12 text-center">
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No goals yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first savings goal to start tracking your progress
          </p>
          <Button onClick={() => setShowCreateGoal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Goal
          </Button>
        </Card>
      )}
    </div>
  );
}