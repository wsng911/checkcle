import { 设置Translations } from '../types/settings';

export const settingsTranslations: 设置Translations = {
  // タブ
  system设置: "システム設定",
  mail设置: "メール設定",
  
  // システム設定
  app名称: "アプリケーション名",
  appURL: "アプリケーションURL",
  sender名称: "送信者名",
  sender邮箱: "送信者メールアドレス",
  hideControls: "コントロールを非表示",
  
  // メール設定
  smtp设置: "SMTP設定",
  smtpEnabled: "SMTPを有効にする",
  smtpHost: "SMTPホスト",
  smtpPort: "SMTPポート",
  smtp用户名: "SMTPユーザー名",
  smtp密码: "SMTPパスワード",
  smtpAuthMethod: "認証方式",
  enableTLS: "TLSを有効にする",
  local名称: "ローカル名",
  
  // テストメール
  test邮箱: "テストメール",
  sendTest邮箱: "テストメールを送信",
  emailTemplate: "メールテンプレート",
  verification: "認証",
  passwordReset: "パスワードリセット",
  confirm邮箱Change: "メールアドレス変更確認",
  otp: "OTP",
  loginAlert: "ログインアラート",
  authCollection: "認証コレクション",
  selectCollection: "コレクションを選択",
  to邮箱添加ress: "宛先メールアドレス",
  enter邮箱添加ress: "メールアドレスを入力",
  sending: "送信中...",
  
  // アクションとステータス
  save: "変更を保存",
  saving: "保存中...",
  settingsUpdated: "設定が正常に更新されました",
  errorSaving设置: "設定の保存中にエラーが発生しました",
  errorFetching设置: "設定の読み込み中にエラーが発生しました",
  testConnection: "接続テスト",
  testingConnection: "接続テスト中...",
  connectionSuccess: "接続成功",
  connectionFailed: "接続失敗"
};