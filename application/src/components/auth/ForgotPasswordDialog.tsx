import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, Dialog描述, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Mail, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCurrentEndpoint } from '@/lib/pocketbase';

interface Forgot密码DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Forgot密码Dialog({ open, onOpenChange }: Forgot密码DialogProps) {
  const [step, setStep] = useState<'request' | 'confirm'>('request');
  const [email, set邮箱] = useState('');
  const [token, setToken] = useState('');
  const [password, set密码] = useState('');
  const [password确认, set密码确认] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = getCurrentEndpoint();
      const response = await fetch(`${apiUrl}/api/collections/_superusers/request-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to send reset email');
      }
      
      toast({
        title: "Reset 邮箱 Sent",
        description: "Please check your email for password reset instructions.",
      });
      setStep('confirm');
    } catch (error) {
      console.error('密码 reset request error:', error);
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to send reset email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handle确认Reset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== password确认) {
      toast({
        variant: "destructive",
        title: "密码 Mismatch",
        description: "密码s do not match. Please try again.",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "密码 Too Short",
        description: "密码 must be at least 6 characters long.",
      });
      return;
    }

    setLoading(true);

    try {
      const apiUrl = getCurrentEndpoint();
      const response = await fetch(`${apiUrl}/api/collections/_superusers/confirm-password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token, 
          password, 
          password确认 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to reset password');
      }

      toast({
        title: "密码 Reset Successful",
        description: "Your password has been reset successfully. You can now log in with your new password.",
      });
      onOpenChange(false);
      // Reset form state
      setStep('request');
      set邮箱('');
      setToken('');
      set密码('');
      set密码确认('');
    } catch (error) {
      console.error('密码 reset confirmation error:', error);
      toast({
        variant: "destructive",
        title: "Reset Failed",
        description: error instanceof Error ? error.message : "Failed to reset password. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handle关闭 = () => {
    onOpenChange(false);
    // Reset form state when closing
    setStep('request');
    set邮箱('');
    setToken('');
    set密码('');
    set密码确认('');
  };

  return (
    <Dialog open={open} onOpenChange={handle关闭}>
      <DialogContent class名称="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {step === 'request' ? 'Reset 密码' : '确认 密码 Reset'}
          </DialogTitle>
          <Dialog描述>
            {step === 'request' 
              ? 'Enter your email address and we\'ll send you a reset link.' 
              : 'Enter the reset token from your email and your new password.'
            }
          </Dialog描述>
        </DialogHeader>

        {step === 'request' ? (
          <form on提交={handleRequestReset} class名称="space-y-4">
            <div class名称="space-y-2">
              <label class名称="text-sm font-medium text-foreground" htmlFor="reset-email">
                邮箱 添加ress
              </label>
              <div class名称="relative">
                <div class名称="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail class名称="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="reset-email"
                  placeholder="your.email@provider.com"
                  type="email"
                  value={email}
                  onChange={(e) => set邮箱(e.target.value)}
                  required
                  class名称="pl-10"
                />
              </div>
            </div>
            
            <div class名称="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handle关闭}
                class名称="flex-1"
              >
                取消
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !email}
                class名称="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                {loading ? 'Sending...' : 'Send Reset 邮箱'}
              </Button>
            </div>
          </form>
        ) : (
          <form on提交={handle确认Reset} class名称="space-y-4">
            <div class名称="space-y-2">
              <label class名称="text-sm font-medium text-foreground" htmlFor="reset-token">
                Reset Token
              </label>
              <Input
                id="reset-token"
                placeholder="Enter token from email"
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </div>

            <div class名称="space-y-2">
              <label class名称="text-sm font-medium text-foreground" htmlFor="new-password">
                New 密码
              </label>
              <Input
                id="new-password"
                placeholder="••••••••••••"
                type="password"
                value={password}
                onChange={(e) => set密码(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <div class名称="space-y-2">
              <label class名称="text-sm font-medium text-foreground" htmlFor="confirm-password">
                确认 密码
              </label>
              <Input
                id="confirm-password"
                placeholder="••••••••••••"
                type="password"
                value={password确认}
                onChange={(e) => set密码确认(e.target.value)}
                required
                minLength={6}
              />
            </div>
            
            <div class名称="flex gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setStep('request')}
                class名称="flex-1"
              >
                <ArrowLeft class名称="h-4 w-4 mr-2" />
                返回
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !token || !password || !password确认}
                class名称="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                {loading ? 'Resetting...' : 'Reset 密码'}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}