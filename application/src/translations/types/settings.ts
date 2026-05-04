
export interface 设置Translations {
	// General 设置 - Tabs
  system设置: string;
  mail设置: string;
  
	// General 设置 - System 设置
  app名称: string;
  appURL: string;
  sender名称: string;
  sender邮箱: string;
  hideControls: string;
  
	// General 设置 - Mail 设置
  smtp设置?: string;
  smtpEnabled: string;
  smtpHost: string;
  smtpPort: string;
  smtp用户名: string;
  smtp密码: string;
  smtpAuthMethod: string;
  enableTLS: string;
  local名称: string;

	// General 设置 - Test 邮箱
  test邮箱: string;
  sendTest邮箱: string;
  emailTemplate: string;
  verification: string;
  passwordReset: string;
  confirm邮箱Change: string;
  otp: string;
  loginAlert: string;
  authCollection: string;
  selectCollection: string;
  to邮箱添加ress: string;
  enter邮箱添加ress: string;
	send: string;
  sending: string;
	test邮箱设置: string;
	test邮箱描述: string;
	test邮箱Alert: string;

	// General 设置 - 操作 and status
  save: string;
  saving: string;
  settingsUpdated: string;
  errorSaving设置: string;
  errorFetching设置: string;
  testConnection: string;
  testingConnection: string;
  connectionSuccess: string;
  connectionFailed: string;

  // User Management
	addUser: string;
	permissionNotice: string;
	permissionNotice添加User: string;
	loading设置: string;
	loading设置Error: string;

  //Notification设置.ts
  titleNotification: string;
  descriptionChannels服务: string;
  addChannel: string;
  all: string;
  telegram: string;
  discord: string;
  slack: string;
  signal: string;
  googleChat: string;
  email: string;
  webhook: string;
  matrix: string;

  // NotificationChannelDialog.tsx
  editChannel: string;
  addChannelDialog: string;
  channel名称: string;
  channel名称Desc: string;
  channelType: string;
  selectType: string;
  enabled: string;
  enabledDesc: string;
  cancel: string;
  updateChannel: string;
  createChannel: string;
  payloadTemplates: string;
  availablePlaceholders: string;
  server: string;
  service: string;
  ssl: string;
  common: string;
  webhookUrl: string;
  webhookUrlDesc: string;
  payloadTemplate: string;
  payloadTemplateDesc: string;
  telegramChatId: string;
  telegramChatIdDesc: string;
  botToken: string;
  botTokenDesc: string;
  discordWebhookUrl: string;
  discordWebhookUrlDesc: string;
  slackWebhookUrl: string;
  slackWebhookUrlDesc: string;
  signalNumber: string;
  signalNumberDesc: string;
  signalApiEndpoint: string;
  signalApiEndpointDesc: string;
  googleChatWebhookUrl: string;
  googleChatWebhookUrlDesc: string;
  email添加ress: string;
  email添加ressDesc: string;
  emailSender名称: string;
  emailSender名称Desc: string;
  smtpServer: string;
  // smtpPort: string;
  // smtp密码: string;
  smtp密码Desc: string;
  ntfyEndpoint: string;
  ntfyEndpointDesc: string;
  apiToken: string;
  apiTokenOptional: string;
  apiTokenDesc: string;
  pushoverUserKey: string;
  pushoverUserKeyDesc: string;
  notifiarrChannelId: string;
  notifiarrChannelIdDesc: string;
  gotifyServerUrl: string;
  gotifyServerUrlDesc: string;
  matrixHomeserver: string;
  matrixHomeserverDesc: string;
  matrixRoomId: string;
  matrixRoomIdDesc: string;
  matrixAccessToken: string;
  matrixAccessTokenDesc: string;
  error保存Channel: string;

  channel名称Placeholder: string;
  telegramChatIdPlaceholder: string;
  botTokenPlaceholder: string;
  discordWebhookUrlPlaceholder: string;
  slackWebhookUrlPlaceholder: string;
  signalNumberPlaceholder: string;
  signalApiEndpointPlaceholder: string;
  googleChatWebhookUrlPlaceholder: string;
  email添加ressPlaceholder: string;
  emailSender名称Placeholder: string;
  smtpServerPlaceholder: string;
  smtpPortPlaceholder: string;
  smtp密码Placeholder: string;
  ntfyEndpointPlaceholder: string;
  apiTokenPlaceholder: string;
  pushoverUserKeyPlaceholder: string;
  notifiarrChannelIdPlaceholder: string;
  gotifyServerUrlPlaceholder: string;
  webhookUrlPlaceholder: string;
  matrixHomeserverPlaceholder: string;
  matrixRoomIdPlaceholder: string;
  matrixAccessTokenPlaceholder: string;

  // DataRetention设置.tsx
  // permissionNotice: string;
  permissionNoticeDataRetention: string;
  loadingRetention设置: string;
  dataRetention: string;
  dataRetention描述: string;
  uptimeRetentionLabel: string;
  uptimeRetentionHelp: string;
  serverRetentionLabel: string;
  serverRetentionHelp: string;
  lastCleanup: string;
  // save: string;
}