import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { 
  X, 
  Coffee, 
  ShoppingBag, 
  Car, 
  Home, 
  Utensils,
  ShoppingCart,
  Gamepad2,
  Heart,
  Check,
  Mic
} from 'lucide-react';

interface QuickAddProps {
  onClose: () => void;
  onSave: (transaction: any) => void;
}

export function QuickAdd({ onClose, onSave }: QuickAddProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [merchant, setMerchant] = useState('');
  const [notes, setNotes] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);

  const amountPresets = [50, 100, 200, 500, 1000, 2000];
  
  const categories = [
    { id: 'food', name: 'Food & Dining', icon: Utensils, color: 'bg-orange-100 text-orange-700' },
    { id: 'groceries', name: 'Groceries', icon: ShoppingCart, color: 'bg-green-100 text-green-700' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-700' },
    { id: 'coffee', name: 'Coffee & Drinks', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100 text-purple-700' },
    { id: 'utilities', name: 'Utilities', icon: Home, color: 'bg-gray-100 text-gray-700' },
    { id: 'entertainment', name: 'Entertainment', icon: Gamepad2, color: 'bg-pink-100 text-pink-700' },
    { id: 'healthcare', name: 'Healthcare', icon: Heart, color: 'bg-red-100 text-red-700' }
  ];

  const quickSuggestions = [
    { merchant: 'Starbucks', category: 'coffee', amount: 350 },
    { merchant: 'McDonald\'s', category: 'food', amount: 450 },
    { merchant: 'Uber', category: 'transport', amount: 200 },
    { merchant: 'Big Bazaar', category: 'groceries', amount: 1500 },
  ];

  const handleAmountPreset = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleSuggestion = (suggestion: any) => {
    setMerchant(suggestion.merchant);
    setCategory(suggestion.category);
    setAmount(suggestion.amount.toString());
  };

  const handleSubmit = () => {
    if (!amount || !category) return;

    const transaction = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      merchant: merchant || 'Unknown',
      notes,
      date: new Date().toISOString(),
      isRecurring
    };

    onSave(transaction);
    onClose();
  };

  const selectedCategory = categories.find(cat => cat.id === category);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Add Expense</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Amount Section */}
          <div className="space-y-4">
            <Label>Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-2xl h-14"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Amount Presets */}
            <div className="flex flex-wrap gap-2">
              {amountPresets.map((preset) => (
                <Button
                  key={preset}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAmountPreset(preset)}
                  className="text-xs"
                >
                  ₹{preset}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="space-y-3">
            <Label>Quick Suggestions</Label>
            <div className="grid grid-cols-2 gap-2">
              {quickSuggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestion(suggestion)}
                  className="h-auto p-3 flex flex-col items-start text-left"
                >
                  <span className="font-medium text-xs">{suggestion.merchant}</span>
                  <span className="text-xs text-muted-foreground">₹{suggestion.amount}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-3">
            <Label>Category</Label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <Button
                    key={cat.id}
                    variant={isSelected ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCategory(cat.id)}
                    className="h-auto flex-col gap-2 py-3"
                  >
                    <div className={`w-8 h-8 rounded-full ${isSelected ? 'bg-primary-foreground text-primary' : cat.color} flex items-center justify-center`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs">{cat.name.split(' ')[0]}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Merchant */}
          <div className="space-y-2">
            <Label>Where? (Optional)</Label>
            <Input
              placeholder="Add merchant name..."
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea
              placeholder="Add a note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!amount || !category}
              className="flex-1"
            >
              <Check className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}