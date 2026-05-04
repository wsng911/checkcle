
import { 服务Translations } from '../types/services';

export const servicesTranslations: 服务Translations = {
  service状态: "Service 状态",
  uptime: "Uptime",
  lastChecked: "Last Checked",
  no服务: "No services match your filter criteria.",
  currently监控ing: "Currently 监控ing",
  retry: "Retry",
  overview: "概览",
  newService: "NewService",
  rowsPerPage: "Rows Per Page",
  search: "搜索",
  allTypes: "All Types",
  createNewService: "创建 New Service",
  createNewServiceDesc: "Fill in the details to create a new service to monitor.",

	// ServiceBasicFields.tsx
	service名称: "Service 名称",
	service名称Desc: "Enter a descriptive name for your service",

	// ServiceConfigFields.tsx
	checkInterval: "Check Interval",
	seconds: "seconds",
	minute: "minute",
	minutes: "minutes",
	hour: "hour",
	hours: "hours",
	custom: "Custom",
	checkIntervalPlaceholder: "Enter interval in seconds",
	backToPresets: "返回 to presets",
	checkIntervalDesc: "How often to check the service status",
	checkIntervalDescCustom: "Enter custom interval in seconds (minimum 10 seconds)",
	retryAttempts: "Retry Attempts",
	attempt: "attempt",
	attempts: "attempts",
	retryAttemptsDesc: "Number of retry attempts before marking as down",

	// ServiceForm.tsx
	updateService: "Update Service",
	createService: "创建 Service",

	// ServiceNotificationFields.tsx
	enableNotifications: "Enable Notifications",
	enableNotificationsDesc: "Enable or disable notifications for this service",
	notificationChannels: "Notification Channels",
	notificationChannelsEnabledDesc: "Select notification channels for this service",
	notificationChannelsDesc: "Enable notifications first to select channels",
	notificationChannelsPlaceholder: "添加 a notification channel",
	alertTemplate: "Alert Template",
	alertTemplateLoading: "Loading templates...",
	alertTemplatePlaceholder: "Select an alert template",
	alertTemplateEnabledDesc: "Choose a template for alert messages",
	alertTemplateDesc: "Enable notifications first to select template",

	// ServiceTypeField.tsx
	serviceType: "Service Type",
	serviceTypeHTTPDesc: "监控 websites and REST APIs with HTTP/HTTPS Protocol",
	serviceTypePINGDesc: "监控 host availability with PING Protocol",
	serviceTypeTCPDesc: "监控 TCP port connectivity with TCP Protocol",
	serviceTypeDNSDesc: "监控 DNS resolution",

	// ServiceRegionalFields.tsx
	regional监控ing: "Regional 监控ing",
	regional监控ingDesc: "Assign this service to regional monitoring agents for distributed monitoring",
	regionalAgents: "Regional Agents",
	regionalAgentsLoading: "Loading agents...",
	regionalAgentsAvailablePlaceholder: "Select additional regional agents...",
	regionalAgentsAllSelected: "All available agents selected",
	regionalAgentsNoAvailable: "No regional agents available",
	regionalAgentsNoOnlineAvailable: "No online regional agents available",
	regionalAgentsNotFoundMessage: "No online regional agents found. 服务 will use default monitoring.",
	regionalAgentsNotSelectedMessage: "No regional agents selected. Service will use default monitoring.",

	// ServiceUrlField.tsx
	targetDefault: "Target URL/Host",
	targetDNS: "Domain 名称",
	targetHTTPDesc: "Enter the full URL including protocol (http:// or https://)",
	targetPINGDesc: "Enter hostname or IP address to ping",
	targetTCPDesc: "Enter hostname or IP address for TCP connection test",
	targetTCPPortDesc: "Enter the port number for TCP connection test",
	targetDNSDesc: "Enter domain name for DNS record monitoring (A, AAAA, MX, etc.)",
	targetDefaultDesc: "Enter the target URL or hostname for monitoring",
	targetDefaultPlaceholder: "Enter URL or hostname",

	// types.ts
	service名称Required: "Service name is required",
	urlDomainHostRequired: "URL/Domain/Host is required",
	enterValidUrlHostnameDomain: "Please enter a valid URL, hostname, or domain",
	spacesNotAllowed: "Spaces are not allowed",

	// 仪表盘
	up服务: "UP SERVICES",
	down服务: "DOWN SERVICES",
	paused服务: "PAUSED SERVICES",
	warning服务: "WARNING SERVICES",

	// ServiceRow操作.tsx
	viewDetail: "View Detail",
	resume监控ing: "Resume 监控ing",
	pause监控ing: "Pause 监控ing",


	//IncidentTable.tsx
	responseTime: "Response Time",
	errorMessage: "Error Message",
	details: "Details",
	unmuteAlerts: "Unmute Alerts",
	muteAlerts: "Mute Alerts",

	//LastCheckedTime.tsx
	pausedAt: "Paused at ",
	lastCheckDetails: "Last Check Details",
	checkedAt: "Checked at ",
	monitoringPaused: "监控ing Paused",
	noAutomaticChecks: "No automatic checks",

	//Servive编辑Dialog.tsx
	editService: "编辑 Service",
	editServiceDesc: "Update the details of your monitored service.",

	//ServiceStatsCards.tsx
	lastCheckedAt: "Last checked at {datetime}",
	avg: "Avg",
	lastUpChecksCount: "last {count} up checks",
	basedOnlastChecksCount: "Based on last {count} checks",
	totalUptime: "Total Uptime",
	totalDowntime: "Total Downtime",
	monitoring设置: "监控ing 设置",
	monitoring设置Interval: "Checked every {interval} seconds",
	monitoring设置Type: "monitoring",
	up状态Duration: "Up for {duration}",
	down状态Duration: "Down for {duration}",

	incidentHistory: "Incident History",
	processing: "Processing",
	back: "返回",
	last20Checks: "Last 20 checks",

	//OneClickInstallTab.tsx
	oneClickInstallTitle: "One-Click Install (Recommended)",
	oneClickInstallDesc: "Copy and paste this single command to install the monitoring agent instantly",
	quickInstallCommand: "Quick Install Command",
	copy: "Copy",
	runCommandOnServer: "Simply run this command on your server:",
	sshIntoServer: "SSH into your target server",
	pasteAndRun: "Paste and run the command above",
	agentInstalled: "The agent will be installed and started automatically",
	done: "Done",

	// DockerOneClickTab.tsx
	dockerOneClickTitle: "Docker One-Click Install",
	dockerOneClickDesc: "Automated Docker container installation with system monitoring capabilities",
	dockerOneClickCommand: "Docker One-Click Command",
	dockerScriptWill: "This script will automatically:",
	dockerScriptStep1: "Download and setup the Docker monitoring agent",
	dockerScriptStep2: "Configure all required environment variables",
	dockerScriptStep3: "Start the container with proper system access",
	dockerScriptStep4: "Setup monitoring data persistence",
	directDockerTitle: "Direct Docker Run Command",
	directDockerDesc: "If you prefer to run the Docker container directly without the script",
	dockerRunCommand: "Docker Run Command",
	dockerPrerequisites: "Prerequisites for direct Docker run:",
	dockerPrereqStep1: "Docker must be installed and running",
	dockerPrereqStep2: "The operacle/checkcle-server-agent image must be available",
	dockerPrereqStep3: "Run as root or with sudo privileges",

	// ManualInstallTab.tsx
	manualInstallTitle: "Manual Installation Steps",
	manualInstallDesc: "Step-by-step installation process",
	server名称: "Server 名称",
	agentId: "Agent ID",
	osType: "OS Type",
	downloadScript: "Download the installation script",
	makeExecutable: "Make the script executable",
	runInstall: "Run the installation with your configuration",
	prerequisites: "Prerequisites:",
	prereqRoot: "Ensure you have root/sudo access on the target server",
	prereqCurl: "Make sure curl is installed for downloading files",
	prereqInternet: "Internet connection required for downloading script",
	afterInstall: "After Installation:",
	agentWillStart: "The agent will start automatically and appear in your dashboard within a few minutes.",

	// ServerDetail.tsx
	errorLoadingServer: "Error loading server",
	unableToFetchServerData: "Unable to fetch server data. Please check your connection and try again.",
	backToServers: "返回 to Servers",
	loadingServerDetails: "Loading server details...",
	serverDetail: "Server Detail",
	monitorServerMetrics: "监控 server performance metrics and system health",
	serverHostnameIpOs: "{hostname} • {ip_address} • {os_type}",

	// Container监控ing.tsx
	errorLoading容器: "Error loading containers",
	unableToFetchContainerData: "Unable to fetch container data. Please check your connection and try again.",
	errorUnknown: "Unknown error",
	container监控ing: "Container 监控ing",
	monitorAndManage容器: "监控 and manage your Docker containers in real-time",
	serverIdLabel: "Server ID",
};