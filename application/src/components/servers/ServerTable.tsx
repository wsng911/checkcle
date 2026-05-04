import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialog取消, AlertDialogContent, AlertDialog描述, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { RefreshCw, 搜索, Eye, Activity, MoreHorizontal, Pause, Play, 编辑, Trash2 } from "lucide-react";
import { Server } from "@/types/server.types";
import { Server状态Badge } from "./Server状态Badge";
import { OSTypeIcon } from "./OSTypeIcon";
import { 编辑ServerDialog } from "./编辑ServerDialog";
import { serverService } from "@/services/serverService";
import { useToast } from "@/hooks/use-toast";
import { pb } from "@/lib/pocketbase";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServerTableProps {
  servers: Server[];
  isLoading: boolean;
  onRefresh: () => void;
}

export const ServerTable = ({ servers, isLoading, onRefresh }: ServerTableProps) => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [searchTerm, set搜索Term] = useState("");
  const [deleteDialogOpen, set删除DialogOpen] = useState(false);
  const [editDialogOpen, set编辑DialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pausingServers, setPausingServers] = useState<Set<string>>(new Set());
  const [selectedServerIds, setSelectedServerIds] = useState<Set<string>>(new Set());
  const [bulk删除DialogOpen, setBulk删除DialogOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredServers = servers.filter(server =>
    server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.ip_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allVisibleSelected = filteredServers.length > 0 && filteredServers.every(s => selectedServerIds.has(s.id));
  const someVisibleSelected = filteredServers.some(s => selectedServerIds.has(s.id)) && !allVisibleSelected;

  const toggleSelectAllVisible = (checked: boolean) => {
    const newSet = new Set(selectedServerIds);
    if (checked) {
      filteredServers.forEach(s => newSet.add(s.id));
    } else {
      filteredServers.forEach(s => newSet.delete(s.id));
    }
    setSelectedServerIds(newSet);
  };

  const toggleSelectOne = (serverId: string, checked: boolean) => {
    const newSet = new Set(selectedServerIds);
    if (checked) newSet.add(serverId); else newSet.delete(serverId);
    setSelectedServerIds(newSet);
  };

  const handleViewDetails = (serverId: string) => {
    navigate(`/server-detail/${serverId}`);
  };

  const handleView容器 = (serverId: string) => {
    navigate(`/container-monitoring/${serverId}`);
  };

  const handlePauseResume = async (server: Server) => {
    const serverId = server.id;
    const isPaused = server.status === "paused";
    
    if (pausingServers.has(serverId)) {
      return; // Already processing this server
    }

    try {
      setPausingServers(prev => new Set(prev).add(serverId));
      
      // Only update the status field, preserving all other server configuration
      const updateData = {
        status: isPaused ? "up" : "paused",
        last_checked: new Date().toISOString()
      };
      
      await pb.collection('servers').update(serverId, updateData);
      
      toast({
        title: isPaused ? t('serverResumed') : t('serverPaused'),
        description: isPaused ? t('monitoringResumed', { name: server.name }) : t('monitoringPaused', { name: server.name }),
      });
      
     // console.log(`${isPaused ? 'Resume' : 'Pause'} server monitoring: ${serverId}`);
      
      // Refresh the server list to show updated status
      onRefresh();
      
    } catch (error) {
     // console.error('Error updating server status:', error);
      toast({
        variant: "destructive",
        title: t('error'),
        description: isPaused ? t('resumeServerError') : t('pauseServerError'),
      });
    } finally {
      setPausingServers(prev => {
        const newSet = new Set(prev);
        newSet.delete(serverId);
        return newSet;
      });
    }
  };

  const handle编辑 = (server: Server) => {
    setSelectedServer(server);
    set编辑DialogOpen(true);
  };

  const handle删除 = (server: Server) => {
    setSelectedServer(server);
    set删除DialogOpen(true);
  };

  const confirm删除 = async () => {
    if (!selectedServer || isDeleting) return;

    try {
      setIsDeleting(true);
      
      // 删除 the server from the database
      await pb.collection('servers').delete(selectedServer.id);
      
      toast({
        title: "Server deleted",
        description: `${selectedServer.name} has been deleted successfully.`,
      });
      
      // Refresh the server list
      onRefresh();
      
      // 关闭 the dialog
      set删除DialogOpen(false);
      setSelectedServer(null);
      
    } catch (error) {
     // console.error('Error deleting server:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete server. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmBulk删除 = async () => {
    if (selectedServerIds.size === 0 || isBulkDeleting) return;
    try {
      setIsBulkDeleting(true);
      const ids = Array.from(selectedServerIds);
      const deletions = ids.map(id => pb.collection('servers').delete(id));
      const results = await Promise.allSettled(deletions);
      const failed = results.filter(r => r.status === 'rejected').length;

      if (failed === 0) {
        toast({ title: "Servers deleted", description: `${ids.length} server(s) have been deleted.` });
      } else if (failed === ids.length) {
        toast({ variant: "destructive", title: "Error", description: "Failed to delete selected servers. Please try again." });
      } else {
        toast({ variant: "destructive", title: "Partial success", description: `删除d ${ids.length - failed}, failed ${failed}.` });
      }

      onRefresh();
      setSelectedServerIds(new Set());
      setBulk删除DialogOpen(false);
    } catch (_e) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete selected servers. Please try again." });
    } finally {
      setIsBulkDeleting(false);
    }
  };

  const CustomProgressBar = ({ 
    value, 
    label, 
    subtitle, 
    type 
  }: { 
    value: number; 
    label: string; 
    subtitle: string; 
    type: 'cpu' | 'memory' | 'disk' 
  }) => {
    const getGradientColors = (type: string, value: number) => {
      if (type === 'cpu') {
        if (value > 90) return 'from-red-500 to-red-600';
        if (value > 75) return 'from-orange-500 to-orange-600';
        if (value > 60) return 'from-yellow-500 to-yellow-600';
        return 'from-green-500 to-green-600';
      }
      if (type === 'memory') {
        if (value > 90) return 'from-red-500 to-red-600';
        if (value > 75) return 'from-yellow-500 to-yellow-600';
        return 'from-blue-500 to-blue-600';
      }
      if (type === 'disk') {
        if (value > 95) return 'from-red-500 to-red-600';
        if (value > 85) return 'from-yellow-500 to-yellow-600';
        return 'from-orange-500 to-orange-600';
      }
      return 'from-gray-500 to-gray-600';
    };

    const getTextColor = (value: number) => {
      if (value > 90) return 'text-red-600 dark:text-red-400';
      if (value > 75) return 'text-orange-600 dark:text-orange-400';
      if (value > 60) return 'text-yellow-600 dark:text-yellow-400';
      return 'text-green-600 dark:text-green-400';
    };

    return (
      <div class名称="space-y-2 min-w-[120px]">
        <div class名称="flex justify-between items-center">
          <span class名称={`text-sm font-semibold ${getTextColor(value)}`}>
            {label}
          </span>
          <span class名称="text-xs text-muted-foreground">
            {subtitle}
          </span>
        </div>
        <div class名称="relative">
          <div class名称="w-full h-3 bg-muted/30 rounded-full overflow-hidden shadow-inner">
            <div 
              class名称={`h-full bg-gradient-to-r ${getGradientColors(type, value)} rounded-full transition-all duration-700 ease-out relative overflow-hidden`}
              style={{ width: `${Math.min(value, 100)}%` }}
            >
              <div class名称="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-60" />
              <div class名称="absolute inset-0 bg-gradient-to-t from-black/10 to-white/10" />
            </div>
          </div>
          
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <Card class名称="flex-1 flex flex-col">
        <CardHeader class名称="flex-shrink-0">
          <CardTitle>{t('servers')}</CardTitle>
        </CardHeader>
        <CardContent class名称="flex-1 flex items-center justify-center">
          <div class名称="flex items-center justify-center h-32">
            <RefreshCw class名称="h-6 w-6 animate-spin" />
            <span class名称="ml-2">{t('loadingServers')}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card class名称="bg-transparent border-0 shadow-none">
        <CardHeader class名称="pb-4 px-0">
          <div class名称="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle class名称="text-xl font-semibold">{t('servers')}</CardTitle>
            <div class名称="flex items-center gap-2">
              <div class名称="relative flex-1 sm:w-64">
                <搜索 class名称="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('searchServersPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => set搜索Term(e.target.value)}
                  class名称="pl-8"
                />
              </div>
              {selectedServerIds.size > 0 && (
                <div class名称="hidden sm:block text-sm text-muted-foreground mr-2">
                  {selectedServerIds.size} selected
                </div>
              )}
              <Button
                onClick={() => setBulk删除DialogOpen(true)}
                variant="destructive"
                disabled={selectedServerIds.size === 0}
              >
                删除 Selected
              </Button>
              <Button onClick={onRefresh} variant="outline" size="icon">
                <RefreshCw class名称="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent class名称="p-0">
          {filteredServers.length === 0 ? (
            <div class名称="flex items-center justify-center p-8">
              <p class名称="text-muted-foreground">{t('noServersFound')}</p>
            </div>
          ) : (
            <div class名称={`${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} rounded-lg border border-border shadow-sm`}>
              <Table>
                <TableHeader class名称={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <TableRow class名称={`${theme === 'dark' ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}`}>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} w-10`}>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={allVisibleSelected}
                          onCheckedChange={(v) => toggleSelectAllVisible(Boolean(v))}
                          aria-label="Select all"
                          indeterminate={someVisibleSelected}
                        />
                      </div>
                    </TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('name')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('status')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('OS')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('IP添加ress')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('CPU')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('memory')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('disk')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('uptime')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4`}>{t('lastChecked')}</TableHead>
                    <TableHead class名称={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} font-medium text-base py-4 text-right`}>{t('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServers.map((server) => {
                    const cpuUsage = server.cpu_usage || 0;
                    const memoryUsage = server.ram_total > 0 ? (server.ram_used / server.ram_total) * 100 : 0;
                    const diskUsage = server.disk_total > 0 ? (server.disk_used / server.disk_total) * 100 : 0;
                    const isPaused = server.status === "paused";
                    const isProcessing = pausingServers.has(server.id);

                    const isSelected = selectedServerIds.has(server.id);
                    return (
                      <TableRow 
                        key={server.id} 
                        class名称={`hover:bg-muted/50 cursor-pointer ${isSelected ? 'bg-muted/30' : ''}`}
                        onClick={() => handleViewDetails(server.id)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(v) => toggleSelectOne(server.id, Boolean(v))}
                            aria-label={`Select ${server.name}`}
                          />
                        </TableCell>
                        <TableCell class名称="font-medium">
                          <div class名称="truncate" title={server.name}>
                            {server.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Server状态Badge status={server.status} />
                        </TableCell>
                        <TableCell>
                          <div class名称="flex items-center gap-2">
                            <OSTypeIcon osType={server.os_type} />
                            <span class名称="text-sm truncate" title={server.os_type}>
                              {server.os_type}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <code class名称="text-sm bg-muted px-1 py-0.5 rounded text-xs">
                            {server.ip_address}
                          </code>
                        </TableCell>
                        <TableCell>
                          <CustomProgressBar
                            value={cpuUsage}
                            label={`${cpuUsage.toFixed(1)}%`}
                            subtitle={`${server.cpu_cores} cores`}
                            type="cpu"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomProgressBar
                            value={memoryUsage}
                            label={`${memoryUsage.toFixed(1)}%`}
                            subtitle={serverService.formatBytes(server.ram_total)}
                            type="memory"
                          />
                        </TableCell>
                        <TableCell>
                          <CustomProgressBar
                            value={diskUsage}
                            label={`${diskUsage.toFixed(1)}%`}
                            subtitle={serverService.formatBytes(server.disk_total)}
                            type="disk"
                          />
                        </TableCell>
                        <TableCell>
                          <div class名称="text-sm truncate" title={server.uptime}>
                            {server.uptime}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div class名称="text-sm text-muted-foreground text-xs">
                            {new Date(server.last_checked).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell class名称="text-right" onClick={(e) => e.stopPropagation()}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" class名称="h-8 w-8 p-0" disabled={isProcessing}>
                                <span class名称="sr-only">{t('openMenu')}</span>
                                {isProcessing ? (
                                  <RefreshCw class名称="h-4 w-4 animate-spin" />
                                ) : (
                                  <MoreHorizontal class名称="h-4 w-4" />
                                )}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class名称="w-[200px]">
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(server.id); }}>
                                <Eye class名称="mr-2 h-4 w-4" />
                                {t('viewServerDetail')}
                              </DropdownMenuItem>
                              {server.docker === 'true' && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleView容器(server.id); }}>
                                  <Activity class名称="mr-2 h-4 w-4" />
                                  {t('container监控ing')}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={(e) => { e.stopPropagation(); handlePauseResume(server); }}
                                disabled={isProcessing}
                              >
                                {isPaused ? (
                                  <>
                                    <Play class名称="mr-2 h-4 w-4" />
                                    {t('resume监控ing')}
                                  </>
                                ) : (
                                  <>
                                    <Pause class名称="mr-2 h-4 w-4" />
                                    {t('pause监控ing')}
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handle编辑(server); }}>
                                <编辑 class名称="mr-2 h-4 w-4" />
                                {t('editServer')}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={(e) => { e.stopPropagation(); handle删除(server); }}
                                class名称="text-red-600 focus:text-red-600"
                              >
                                <Trash2 class名称="mr-2 h-4 w-4" />
                                {t('deleteServer')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 编辑 Server Dialog */}
      <编辑ServerDialog
        server={selectedServer}
        open={editDialogOpen}
        onOpenChange={set编辑DialogOpen}
        onServerUpdated={onRefresh}
      />

      {/* 删除 确认ation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={set删除DialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('deleteServer确认Title')}</AlertDialogTitle>
            <AlertDialog描述>
              {t('deleteServer确认Desc').replace('{name}', selectedServer?.name ?? '')}
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消 disabled={isDeleting}>
              {t('cancel')}
            </AlertDialog取消>
            <AlertDialogAction
              onClick={confirm删除}
              disabled={isDeleting}
              class名称="bg-red-600 text-white hover:bg-red-700"
            >
              {isDeleting ? t('deleting') : t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk 删除 确认ation Dialog */}
      <AlertDialog open={bulk删除DialogOpen} onOpenChange={setBulk删除DialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除 selected servers?</AlertDialogTitle>
            <AlertDialog描述>
              This action cannot be undone. This will permanently delete {selectedServerIds.size} server(s) and all of their monitoring data.
            </AlertDialog描述>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialog取消 disabled={isBulkDeleting}>
              {t('cancel')}
            </AlertDialog取消>
            <AlertDialogAction
              onClick={confirmBulk删除}
              disabled={isBulkDeleting}
              class名称="bg-red-600 text-white hover:bg-red-700"
            >
              {isBulkDeleting ? t('deleting') : '删除 Selected'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
