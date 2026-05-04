import { 设置Translations } from '../types/settings';

export const settingsTranslations: 设置Translations = {
  // Tabs
  system设置: "Systemeinstellungen",
  mail设置: "E-Mail-Einstellungen",

  // System 设置
  app名称: "Anwendungsname",
  appURL: "Anwendungs-URL",
  sender名称: "Absendername",
  sender邮箱: "Absender-E-Mail-Adresse",
  hideControls: "Steuerelemente ausblenden",

  // Mail 设置
  smtp设置: "SMTP-Konfiguration",
  smtpEnabled: "SMTP aktivieren",
  smtpHost: "SMTP-Host",
  smtpPort: "SMTP-Port",
  smtp用户名: "SMTP-Benutzername",
  smtp密码: "SMTP 密码",
  smtpAuthMethod: "Authentifizierungsmethode",
  enableTLS: "TLS aktivieren",
  local名称: "Lokaler 名称",

  // Test 邮箱
  test邮箱: "Test 邮箱",
  sendTest邮箱: "Send test email",
  emailTemplate: "邮箱 template",
  verification: "Verification",
  passwordReset: "密码 reset",
  confirm邮箱Change: "确认 email change",
  otp: "OTP",
  loginAlert: "Login alert",
  authCollection: "Auth collection",
  selectCollection: "Select collection",
  to邮箱添加ress: "To email address",
  enter邮箱添加ress: "Enter email address",
  sending: "Sending...",

  // 操作 and status
  save: "Änderungen speichern",
  saving: "Speichere...",
  settingsUpdated: "Einstellungen erfolgreich aktualisiert",
  errorSaving设置: "Fehler beim Speichern der Einstellungen",
  errorFetching设置: "Error loading settings",
  testConnection: "Verbindung testen",
  testingConnection: "Verbindung wird getestet...",
  connectionSuccess: "Verbindung erfolgreich",
  connectionFailed: "Verbindung fehlgeschlagen",

  // Ergänzte fehlende Einträge
  addUser: "Benutzer hinzufügen",
  permissionNotice: "Berechtigungshinweis:",
  permissionNotice添加User: "Als Admin-Benutzer haben Sie keinen Zugriff auf die Anzeige oder Änderung von System- und E-Mail-Einstellungen. Diese Einstellungen können nur von Super-Admins aufgerufen und geändert werden. Wenden Sie sich an Ihren Super-Admin, wenn Sie Änderungen an der Systemkonfiguration oder den E-Mail-Einstellungen vornehmen müssen.",
  loading设置: "Einstellungen werden geladen...",
  loading设置Error: "Fehler beim Laden der Einstellungen",
};
