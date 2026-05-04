
import { 创建IncidentInput, IncidentItem, UpdateIncidentInput } from './types';
import { createIncident, updateIncident, updateIncident状态, deleteIncident } from './incidentOperations';
import { getAllIncidents, getIncidentById } from './incidentFetch';
import { generateIncidentPDF } from './incidentPdfService';

export const incidentService = {
  // Fetch operations
  getAllIncidents,
  getIncidentById,
  
  // CRUD operations
  createIncident,
  updateIncident,
  updateIncident状态,
  deleteIncident,
  
  // PDF operations
  generateIncidentPDF,
};

export default incidentService;
