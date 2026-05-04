import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, X, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Alert, Alert描述 } from "@/components/ui/alert";

interface Test邮箱DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendTest: (data: Test邮箱Data) => Promise<void>;
  isTesting: boolean;
}

export interface Test邮箱Data {
  email: string;
  template: string;
  collection?: string;
}

const Test邮箱Dialog: React.FC<Test邮箱DialogProps> = ({
  open,
  onOpenChange,
  onSendTest,
  isTesting
}) => {
  const { t } = useLanguage();
  const [email, set邮箱] = useState('');
  const [template, setTemplate] = useState('verification');
  const [collection, setCollection] = useState('_superusers');
  const [lastResult, setLastResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isInternalTesting, setIsInternalTesting] = useState(false);

  const validate邮箱 = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSend = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }
    
    if (!validate邮箱(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLastResult(null);
      setIsInternalTesting(true);
      
      console.log('Sending test email with data:', {
        email,
        template,
        collection: template === 'verification' || template === 'password-reset' ? collection : undefined
      });
      
      await onSendTest({
        email,
        template,
        collection: template === 'verification' || template === 'password-reset' ? collection : undefined
      });
      
      setLastResult({
        success: true,
        message: `Test email sent successfully to ${email}`
      });
      
      toast({
        title: "Success",
        description: `Test email sent successfully to ${email}`,
        variant: "default",
      });
      
    } catch (error) {
      console.error('Error sending test email:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to send test email";
      
      setLastResult({
        success: false,
        message: errorMessage
      });
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsInternalTesting(false);
    }
  };

  const handle关闭 = () => {
    onOpenChange(false);
    // Reset form but keep last result for reference
    set邮箱('');
    setTemplate('verification');
    setCollection('_superusers');
    // Don't reset lastResult immediately to allow user to see the result
    setTimeout(() => setLastResult(null), 300);
  };

  const isLoading = isTesting || isInternalTesting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent class名称="sm:max-w-md">
        <DialogHeader>
          <DialogTitle class名称="flex items-center gap-2">
            <Mail class名称="h-5 w-5" />
            {t("sendTest邮箱", "settings")}
          </DialogTitle>
        </DialogHeader>
        
        <div class名称="space-y-4 py-4">
          {/* Show last result */}
          {lastResult && (
            <Alert variant={lastResult.success ? "default" : "destructive"}>
              {lastResult.success ? (
                <CheckCircle class名称="h-4 w-4" />
              ) : (
                <AlertCircle class名称="h-4 w-4" />
              )}
              <Alert描述>
                {lastResult.message}
              </Alert描述>
            </Alert>
          )}

          {/* Template Selection */}
          <div class名称="space-y-3">
            <Label>{t("emailTemplate", "settings")}</Label>
            <RadioGroup value={template} onValueChange={setTemplate} disabled={isLoading}>
              <div class名称="flex items-center space-x-2">
                <RadioGroupItem value="verification" id="verification" />
                <Label htmlFor="verification">{t("verification", "settings")}</Label>
              </div>
              <div class名称="flex items-center space-x-2">
                <RadioGroupItem value="password-reset" id="password-reset" />
                <Label htmlFor="password-reset">{t("passwordReset", "settings")}</Label>
              </div>
              <div class名称="flex items-center space-x-2">
                <RadioGroupItem value="email-change" id="email-change" />
                <Label htmlFor="email-change">{t("confirm邮箱Change", "settings")}</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Auth Collection - show for verification and password-reset templates */}
          {(template === 'verification' || template === 'password-reset') && (
            <div class名称="space-y-2">
              <Label>{t("authCollection", "settings")} *</Label>
              <Select value={collection} onValueChange={setCollection} disabled={isLoading}>
                <SelectTrigger>
                  <SelectValue placeholder={t("selectCollection", "settings")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_superusers">_superusers</SelectItem>
                  <SelectItem value="users">users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* 邮箱 添加ress */}
          <div class名称="space-y-2">
            <Label>{t("to邮箱添加ress", "settings")} *</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => set邮箱(e.target.value)}
              placeholder={t("enter邮箱添加ress", "settings")}
              required
              disabled={isLoading}
            />
          </div>

          {/* Info message */}
          <Alert>
            <AlertCircle class名称="h-4 w-4" />
            <Alert描述>{t("test邮箱Alert", "settings")}</Alert描述>
          </Alert>
        </div>

        <DialogFooter class名称="flex justify-between">
          <Button variant="outline" onClick={handle关闭} disabled={isLoading}>
            {t("close", "common")}
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={!email || isLoading}
            class名称="flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 class名称="h-4 w-4 animate-spin" />
            ) : (
              <Mail class名称="h-4 w-4" />
            )}
            {isLoading ? t("sending", "settings") : t("send", "settings")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Test邮箱Dialog;