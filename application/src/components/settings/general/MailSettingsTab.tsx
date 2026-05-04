
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { 设置TabProps } from "./types";
import Test邮箱Dialog, { Test邮箱Data } from "./Test邮箱Dialog";
import { Mail } from "lucide-react";

interface Mail设置TabProps extends 设置TabProps {
  // 移除 handleTestConnection and isTestingConnection props since we're removing the test connection button
}

const Mail设置Tab: React.FC<Mail设置TabProps> = ({
  form,
  is编辑ing
}) => {
  const { t } = useLanguage();
  const [showTest邮箱Dialog, setShowTest邮箱Dialog] = useState(false);
  const [isTesting邮箱, setIsTesting邮箱] = useState(false);

  const handleTest邮箱 = async (data: Test邮箱Data) => {
    try {
      setIsTesting邮箱(true);
      console.log('Testing email with data:', data);
      
      const response = await fetch('/api/settings/test/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          template: data.template,
          ...(data.collection && { collection: data.collection })
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Test email failed');
      }

      console.log('Test email sent successfully');
    } catch (error) {
      console.error('Error sending test email:', error);
      throw error; // Re-throw to let the dialog handle the error display
    } finally {
      setIsTesting邮箱(false);
    }
  };

  return (
    <div class名称="space-y-4">
      <div>
        <FormField
          control={form.control}
          name="meta.sender名称"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sender名称", "settings")}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={!is编辑ing}
                  placeholder="Support"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div>
        <FormField
          control={form.control}
          name="meta.sender添加ress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("sender邮箱", "settings")}</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  disabled={!is编辑ing}
                  placeholder="support@example.com"
                  type="email"
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    
      <div class名称="flex items-center space-x-2 mb-4">
        <FormField
          control={form.control}
          name="smtp.enabled"
          render={({ field }) => (
            <FormItem class名称="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Switch 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!is编辑ing}
                />
              </FormControl>
              <FormLabel class名称="mt-0">{t("smtpEnabled", "settings")}</FormLabel>
            </FormItem>
          )}
        />
      </div>
      
      <div class名称={!form.watch('smtp.enabled') ? 'opacity-50' : ''}>
        <div>
          <FormField
            control={form.control}
            name="smtp.host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("smtpHost", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="smtp.example.com"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="mt-4">
          <FormField
            control={form.control}
            name="smtp.port"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("smtpPort", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value) || 587)} 
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="587"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="mt-4">
          <FormField
            control={form.control}
            name="smtp.username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("smtp用户名", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="user@example.com"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="mt-4">
          <FormField
            control={form.control}
            name="smtp.password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("smtp密码", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="password"
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="••••••••"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="mt-4">
          <FormField
            control={form.control}
            name="smtp.authMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("smtpAuthMethod", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="Login"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="flex items-center space-x-2 mt-4">
          <FormField
            control={form.control}
            name="smtp.tls"
            render={({ field }) => (
              <FormItem class名称="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Switch 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                  />
                </FormControl>
                <FormLabel class名称="mt-0">{t("enableTLS", "settings")}</FormLabel>
              </FormItem>
            )}
          />
        </div>
        
        <div class名称="mt-4">
          <FormField
            control={form.control}
            name="smtp.local名称"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("local名称", "settings")}</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    disabled={!is编辑ing || !form.watch('smtp.enabled')}
                    placeholder="localhost"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Test 邮箱 button - outside the form area and always visible when SMTP is enabled */}
      {form.watch('smtp.enabled') && (
        <div class名称="mt-6 pt-4 border-t border-border">
          <div class名称="flex items-center justify-between mb-4">
            <div>
              <h3 class名称="text-lg font-medium">{t("test邮箱设置", "settings")}</h3>
              <p class名称="text-sm text-muted-foreground">{t("test邮箱描述", "settings")}</p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setShowTest邮箱Dialog(true)}
              disabled={isTesting邮箱}
              class名称="flex items-center gap-2"
            >
              <Mail class名称="h-4 w-4" />
              {t("test邮箱", "settings")}
            </Button>
          </div>
        </div>
      )}

      <Test邮箱Dialog
        open={showTest邮箱Dialog}
        onOpenChange={setShowTest邮箱Dialog}
        onSendTest={handleTest邮箱}
        isTesting={isTesting邮箱}
      />
    </div>
  );
};

export default Mail设置Tab;