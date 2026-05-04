
import { 设置Translations } from '../types/settings';

export const settingsTranslations: 设置Translations = {
	// General 设置 - Tabs
  system设置: "系统设置",
  mail设置: "邮件设置",
  
	// General 设置 - System 设置
  app名称: "应用名称",
  appURL: "应用 URL",
  sender名称: "发送者名称",
  sender邮箱: "发送者邮箱地址",
  hideControls: "隐藏控件",
  
	// General 设置 - Mail 设置
  smtp设置: "SMTP 配置",
  smtpEnabled: "启用 SMTP",
  smtpHost: "SMTP 主机",
  smtpPort: "SMTP 端口",
  smtp用户名: "SMTP 用户名",
  smtp密码: "SMTP 密码",
  smtpAuthMethod: "认证方法",
  enableTLS: "启用 TLS",
  local名称: "本地名称",
  
	// General 设置 - Test 邮箱
  test邮箱: "测试邮箱",
  sendTest邮箱: "发送测试邮箱",
  emailTemplate: "邮箱模板",
  verification: "验证",
  passwordReset: "密码重置",
  confirm邮箱Change: "确认邮箱变更",
  otp: "OTP",
  loginAlert: "登录警报",
  authCollection: "认证集合",
  selectCollection: "选择集合",
  to邮箱添加ress: "收件人邮箱地址",
  enter邮箱添加ress: "输入收件人邮箱地址",
	send: "发送",
  sending: "发送中...",
	test邮箱设置: "测试邮箱配置",
	test邮箱描述: "测试当前的邮箱设置是否可用",
	test邮箱Alert: "这将使用您配置的SMTP设置发送一封测试邮件。请确保SMTP已正确配置。",

	// General 设置 - 操作 and status
  save: "保存变更",
  saving: "保存中...",
  settingsUpdated: "设置已成功更新",
  errorSaving设置: "保存设置时出错",
  errorFetching设置: "加载设置时出错",
  testConnection: "测试连接",
  testingConnection: "测试连接中...",
  connectionSuccess: "连接成功",
  connectionFailed: "连接失败",

	// User Management
	addUser: "添加用户",
	permissionNotice: "权限问题：",
	permissionNotice添加User: "作为管理员用户，您无权查看或修改系统及邮件设置。这些设置仅超级管理员可访问和修改。如需更改系统配置或邮件设置，请联系您的超级管理员。",
	loading设置: "加载设置中...",
	loading设置Error: "加载设置时出错",
};