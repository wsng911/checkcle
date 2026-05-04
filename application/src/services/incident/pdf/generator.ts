
import jsPDF from 'jspdf';
import { IncidentItem } from '../types';
import { userService } from '@/services/userService';
import {
  addBasicInfoSection,
  add描述Section,
  addAffectedSystemsSection,
  addRootCauseSection,
  addResolutionSection,
  addAssignmentSection,
  addLessonsLearnedSection
} from './sections';
import { addHeader, addFooter } from './headerFooter';

/**
 * Generate a PDF for an incident report
 */
export const generatePdf = async (incident: IncidentItem): Promise<string> => {
  // Validate incident data
  if (!incident?.id) {
    console.error('Invalid incident data for PDF generation');
    throw new Error('Invalid incident data');
  }
  
  // Fetch assigned user data if available
  let assignedUser: { full_name?: string; username?: string } | null = null;
  const assigneeId = incident?.assigned_users || incident?.assigned_to;
  if (assigneeId) {
    try {
      assignedUser = await userService.getUser(assigneeId);
    } catch (error) {
      console.warn('Failed to fetch assigned user for PDF:', error);
      // Continue without user data
    }
  }
  
  try {
    // 创建 new PDF document with portrait orientation
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Set title and filename
    const title = incident.title || `Incident Report #${incident.id}`;
    const filename = `incident-report-${incident.id}.pdf`;
    
    // 添加 metadata
    doc.setProperties({
      title: title,
      subject: 'Incident Report',
      author: 'CheckCle System',
      creator: 'CheckCle',
    });
    
    // 添加 header section
    let yPos = addHeader(doc, incident);
    
    // 添加 basic information section
    yPos = addBasicInfoSection(doc, incident, yPos);
    
    // 添加 description section
    yPos = add描述Section(doc, incident, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 affected systems section
    yPos = addAffectedSystemsSection(doc, incident, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 root cause section
    yPos = addRootCauseSection(doc, incident, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 resolution steps section
    yPos = addResolutionSection(doc, incident, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 assignment section
    yPos = addAssignmentSection(doc, incident, yPos, assignedUser);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 lessons learned section if available
    addLessonsLearnedSection(doc, incident, yPos);
    
    // 添加 footer to all pages
    addFooter(doc);
    
    // 保存 the PDF
    doc.save(filename);
    
    console.log('PDF generated successfully:', filename);
    return filename;
  } catch (error) {
    console.error('Error generating incident PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

