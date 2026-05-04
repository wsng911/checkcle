
import { CommonTranslations } from './common';
import { MenuTranslations } from './menu';
import { LoginTranslations } from './login';
import { AboutTranslations } from './about';
import { 服务Translations } from './services';
import { MaintenanceTranslations } from './maintenance';
import { IncidentTranslations } from './incident';
import { SSLTranslations } from './ssl';
import { 设置Translations } from './settings';
import { InstanceTranslations } from './instance';
import { OperationTranslations } from './operation';
import { RegionTranslations } from './region';
import { DockerTranslations } from './docker';
import { PublicTranslations } from './public';

export interface Translations {
  common: CommonTranslations;
  menu: MenuTranslations;
  login: LoginTranslations;
  about: AboutTranslations;
  services: 服务Translations;
  maintenance: MaintenanceTranslations;
  incident: IncidentTranslations;
  ssl: SSLTranslations;
  settings: 设置Translations;
  instance: InstanceTranslations;
  operation: OperationTranslations;
  region: RegionTranslations;
  docker: DockerTranslations;
  public: PublicTranslations;
}