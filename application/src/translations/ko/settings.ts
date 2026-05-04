
import { 设置Translations } from '../types/settings';

export const settingsTranslations: 设置Translations = {
	// General 设置 - Tabs
  system设置: "시스템 설정",
  mail设置: "메일 설정",
  
	// General 设置 - System 设置
  app名称: "앱 이름",
  appURL: "앱 URL",
  sender名称: "발신자 이름",
  sender邮箱: "발신자 이메일 주소",
  hideControls: "컨트롤 숨기기",
  
	// General 设置 - Mail 设置
  smtp设置: "SMTP 구성",
  smtpEnabled: "SMTP 활성화",
  smtpHost: "SMTP 호스트",
  smtpPort: "SMTP 포트",
  smtp用户名: "SMTP 사용자 이름",
  smtp密码: "SMTP 비밀번호",
  smtpAuthMethod: "인증 방법",
  enableTLS: "TLS 활성화",
  local名称: "로컬 이름",
  
	// General 设置 - Test 邮箱
  test邮箱: "테스트 이메일",
  sendTest邮箱: "테스트 이메일 전송",
  emailTemplate: "이메일 템플릿",
  verification: "검증",
  passwordReset: "비밀번호 재설정",
  confirm邮箱Change: "이메일 변경 확인",
  otp: "OTP",
  loginAlert: "로그인 알림",
  authCollection: "인증 컬렉션",
  selectCollection: "컬렉션 선택",
  to邮箱添加ress: "받는 이메일",
  enter邮箱添加ress: "이메일 주소 입력",
  sending: "전송 중...",
  
  // General 设置 - 操作 and status
  save: "변경 사항 저장",
  saving: "저장 중...",
  settingsUpdated: "설정이 성공적으로 업데이트되었습니다",
  errorSaving设置: "설정 저장 중 오류 발생",
  errorFetching设置: "설정 불러오기 중 오류 발생",
  testConnection: "연결 테스트",
  testingConnection: "연결 테스트 중...",
  connectionSuccess: "연결 성공",
  connectionFailed: "연결 실패",

	// User Management
  addUser: "사용자 추가",
  permissionNotice: "권한 안내:",
  permissionNotice添加User: "관리자 계정은 시스템 및 메일 설정을 확인하거나 변경할 수 없습니다. 이 설정은 슈퍼 관리자만 접근 및 수정할 수 있습니다. 시스템 구성 또는 메일 설정 변경이 필요하면 슈퍼 관리자에게 문의하세요.",
  loading设置: "설정 로딩 중...",
  loading设置Error: "설정 로딩 중 오류 발생",
};