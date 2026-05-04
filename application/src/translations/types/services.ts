
export interface 服务Translations {

    service状态: string;
	uptime: string;
	lastChecked: string;
	no服务: string;
	currently监控ing: string;
	retry: string;
	overview: string;
	newService: string;
	rowsPerPage: string;
	search: string;
	allTypes: string;
	createNewService: string;
	createNewServiceDesc: string;

	// ServiceBasicFields.tsx
	service名称: string;
	service名称Desc: string;

	// ServiceConfigFields.tsx
	checkInterval: string;
	seconds: string;
	minute: string;
	minutes: string;
	hour: string;
	hours: string;
	custom: string;
	checkIntervalPlaceholder: string;
	backToPresets: string;
	checkIntervalDesc: string;
	checkIntervalDescCustom: string;
	retryAttempts: string;
	attempt: string;
	attempts: string;
	retryAttemptsDesc: string;

	// ServiceForm.tsx
	updateService: string;
	createService: string;

	// ServiceNotificationFields.tsx
	enableNotifications: string;
	enableNotificationsDesc: string;
	notificationChannels: string;
	notificationChannelsEnabledDesc: string;
	notificationChannelsDesc: string;
	notificationChannelsPlaceholder: string;
	alertTemplate: string;
	alertTemplateLoading: string;
	alertTemplatePlaceholder: string;
	alertTemplateEnabledDesc: string;
	alertTemplateDesc: string;

	// ServiceTypeField.tsx
	serviceType: string;
	serviceTypeHTTPDesc: string;
	serviceTypePINGDesc: string;
	serviceTypeTCPDesc: string;
	serviceTypeDNSDesc: string;

	// ServiceRegionalFields.tsx
	regional监控ing: string;
	regional监控ingDesc: string;
	regionalAgents: string;
	regionalAgentsLoading: string;
	regionalAgentsAvailablePlaceholder: string;
	regionalAgentsAllSelected: string;
	regionalAgentsNoAvailable: string;
	regionalAgentsNoOnlineAvailable: string;
	regionalAgentsNotFoundMessage: string;
	regionalAgentsNotSelectedMessage: string;

	// ServiceUrlField.tsx
	targetDefault: string;
	targetDNS: string;
	targetHTTPDesc: string;
	targetPINGDesc: string;
	targetTCPDesc: string;
	targetTCPPortDesc: string;
	targetDNSDesc: string;
	targetDefaultDesc: string;
	targetDefaultPlaceholder: string;

	// types.ts
	service名称Required: string;
	urlDomainHostRequired: string;
	enterValidUrlHostnameDomain: string;
	spacesNotAllowed: string;

	// 仪表盘
	up服务: string;
	down服务: string;
	paused服务: string;
	warning服务: string;

	// ServiceRow操作.tsx
	viewDetail: string;
	resume监控ing: string;
	pause监控ing: string;
	unmuteAlerts: string;
	muteAlerts: string;

	//IncidentTable.tsx
	responseTime: string;
	errorMessage: string;
	details: string;

	//LastCheckedTime.tsx
	pausedAt: string;
	lastCheckDetails: string;
	checkedAt: string;
	monitoringPaused: string;
	noAutomaticChecks: string;

	//Servive编辑Dialog.tsx
	editService: string;
	editServiceDesc: string;

	//ServiceStatsCards.tsx
	lastCheckedAt: string;
	avg: string;
	lastUpChecksCount: string;
	basedOnlastChecksCount: string;
	totalUptime: string;
	totalDowntime: string;
	monitoring设置: string;
	monitoring设置Interval: string;
	monitoring设置Type: string;
	up状态Duration: string;
	down状态Duration: string;

	incidentHistory: string;
	processing: string;
	back: string;
	last20Checks: string;

	// OneClickInstallTab.tsx
	oneClickInstallTitle: string;
	oneClickInstallDesc: string;
	quickInstallCommand: string;
	copy: string;
	runCommandOnServer: string;
	sshIntoServer: string;
	pasteAndRun: string;
	agentInstalled: string;
	done: string;

	// DockerOneClickTab.tsx
	dockerOneClickTitle: string;
	dockerOneClickDesc: string;
	dockerOneClickCommand: string;
	dockerScriptWill: string;
	dockerScriptStep1: string;
	dockerScriptStep2: string;
	dockerScriptStep3: string;
	dockerScriptStep4: string;
	directDockerTitle: string;
	directDockerDesc: string;
	dockerRunCommand: string;
	dockerPrerequisites: string;
	dockerPrereqStep1: string;
	dockerPrereqStep2: string;
	dockerPrereqStep3: string;

	// ManualInstallTab.tsx
	manualInstallTitle: string;
	manualInstallDesc: string;
	server名称: string;
	agentId: string;
	osType: string;
	downloadScript: string;
	makeExecutable: string;
	runInstall: string;
	prerequisites: string;
	prereqRoot: string;
	prereqCurl: string;
	prereqInternet: string;
	afterInstall: string;
	agentWillStart: string;

	// ServerDetail.tsx
	errorLoadingServer: string;
	unableToFetchServerData: string;
	backToServers: string;
	loadingServerDetails: string;
	serverDetail: string;
	monitorServerMetrics: string;
	serverHostnameIpOs: string;

	// Container监控ing.tsx
	errorLoading容器: string;
	unableToFetchContainerData: string;
	errorUnknown: string;
	container监控ing: string;
	monitorAndManage容器: string;
	serverIdLabel: string;

	
}
