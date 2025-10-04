import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { 
  Coffee, 
  ShoppingBag, 
  Car, 
  Home,
  Palette,
  Type,
  Square,
  Circle
} from 'lucide-react';

export function DesignSystem() {
  const brandColors = [
    { name: 'Deep Navy', hex: '#0B2545', css: 'bg-primary' },
    { name: 'Teal', hex: '#0FA3B1', css: 'bg-accent' },
    { name: 'Soft Green', hex: '#49C07B', css: 'bg-success' },
    { name: 'Warm Amber', hex: '#FFC857', css: 'bg-warning' },
    { name: 'Cool Gray', hex: '#F2F5F7', css: 'bg-background' },
    { name: 'Charcoal', hex: '#111827', css: 'bg-foreground' }
  ];

  const semanticColors = [
    { name: 'Primary', css: 'bg-primary', text: 'text-primary-foreground' },
    { name: 'Secondary', css: 'bg-secondary', text: 'text-secondary-foreground' },
    { name: 'Accent', css: 'bg-accent', text: 'text-accent-foreground' },
    { name: 'Success', css: 'bg-success', text: 'text-success-foreground' },
    { name: 'Warning', css: 'bg-warning', text: 'text-warning-foreground' },
    { name: 'Destructive', css: 'bg-destructive', text: 'text-destructive-foreground' }
  ];

  const buttonVariants = [
    { variant: 'default', label: 'Default' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'outline', label: 'Outline' },
    { variant: 'ghost', label: 'Ghost' },
    { variant: 'link', label: 'Link' }
  ];

  const buttonSizes = [
    { size: 'sm', label: 'Small' },
    { size: 'default', label: 'Default' },
    { size: 'lg', label: 'Large' }
  ];

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Billu Budget Design System</h1>
        <p className="text-muted-foreground">Component library and style guide for the expense tracker</p>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
        </TabsList>

        <TabsContent value="colors" className="space-y-6">
          {/* Brand Colors */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Brand Colors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {brandColors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div className={`w-full h-20 rounded-lg ${color.css} border`} />
                  <div className="text-sm">
                    <p className="font-medium">{color.name}</p>
                    <p className="text-muted-foreground">{color.hex}</p>
                    <code className="text-xs bg-muted px-1 rounded">{color.css}</code>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Semantic Colors */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {semanticColors.map((color, index) => (
                <div key={index} className="space-y-2">
                  <div className={`w-full h-16 rounded-lg ${color.css} ${color.text} flex items-center justify-center font-medium`}>
                    {color.name}
                  </div>
                  <code className="text-xs bg-muted px-1 rounded block">{color.css}</code>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="typography" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Type className="w-5 h-5" />
              Typography Scale
            </h3>
            <div className="space-y-4">
              <div>
                <h1>Heading 1 - The quick brown fox</h1>
                <code className="text-xs text-muted-foreground">h1 - 2xl, medium, 1.5 line-height</code>
              </div>
              <div>
                <h2>Heading 2 - The quick brown fox</h2>
                <code className="text-xs text-muted-foreground">h2 - xl, medium, 1.5 line-height</code>
              </div>
              <div>
                <h3>Heading 3 - The quick brown fox</h3>
                <code className="text-xs text-muted-foreground">h3 - lg, medium, 1.5 line-height</code>
              </div>
              <div>
                <h4>Heading 4 - The quick brown fox</h4>
                <code className="text-xs text-muted-foreground">h4 - base, medium, 1.5 line-height</code>
              </div>
              <div>
                <p>Body text - The quick brown fox jumps over the lazy dog. This is the default paragraph text used throughout the application.</p>
                <code className="text-xs text-muted-foreground">p - base, normal, 1.5 line-height</code>
              </div>
              <div>
                <Label>Label text - Form labels and small headings</Label>
                <code className="text-xs text-muted-foreground">label - base, medium, 1.5 line-height</code>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="buttons" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Button Variants</h3>
            <div className="flex flex-wrap gap-3">
              {buttonVariants.map((variant, index) => (
                <Button key={index} variant={variant.variant as any}>
                  {variant.label}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Button Sizes</h3>
            <div className="flex flex-wrap items-center gap-3">
              {buttonSizes.map((size, index) => (
                <Button key={index} size={size.size as any}>
                  {size.label}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Icon Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <Button size="sm">
                <Coffee className="w-4 h-4 mr-2" />
                Coffee
              </Button>
              <Button variant="outline">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shopping
              </Button>
              <Button variant="ghost" size="lg">
                <Car className="w-5 h-5 mr-2" />
                Transport
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="cards" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">Basic Card</h3>
              <p className="text-muted-foreground">
                Standard card component with padding and subtle border.
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <h3 className="font-semibold mb-2">Gradient Card</h3>
              <p className="text-primary-foreground/80">
                Card with gradient background for key metrics.
              </p>
            </Card>

            <Card className="p-6 border-accent">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Icon Card</h3>
                  <p className="text-sm text-muted-foreground">With icon and content</p>
                </div>
              </div>
              <Progress value={65} className="h-2" />
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Metric Card</h3>
                <Badge>+12%</Badge>
              </div>
              <p className="text-3xl font-bold">₹45,750</p>
              <p className="text-sm text-muted-foreground">Current balance</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forms" className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Form Components</h3>
            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input placeholder="0" className="pl-8" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Input placeholder="Add a description..." />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1">Cancel</Button>
                <Button className="flex-1">Save</Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Category Selection</h3>
            <div className="grid grid-cols-4 gap-3">
              {[
                { name: 'Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-700' },
                { name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-100 text-purple-700' },
                { name: 'Transport', icon: Car, color: 'bg-blue-100 text-blue-700' },
                { name: 'Home', icon: Home, color: 'bg-green-100 text-green-700' }
              ].map((category, index) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="h-auto flex-col gap-2 py-4"
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
        </TabsContent>
      </Tabs>

      {/* Microcopy Examples */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Microcopy & Voice</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Motivational</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>"Small savings, big freedom."</li>
              <li>"Great job on transport costs!"</li>
              <li>"You're on track to reach your goal!"</li>
              <li>"Achievement unlocked! 🎉"</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Helpful Guidance</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>"Add ₹ — coffee, groceries, rent…"</li>
              <li>"Your data stays on your device"</li>
              <li>"₹2,000/month needed to reach goal"</li>
              <li>"Coffee spending up 40% this month"</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}