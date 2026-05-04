
import jsPDF from 'jspdf';
import { IncidentItem } from '../types';
import { fonts, formatDate, capitalize } from './utils';
import autoTable from 'jspdf-autotable';

/**
 * 添加 the incident overview section to the PDF
 */
export const addBasicInfoSection = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  doc.setFont(fonts.bold);
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Incident 概览', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  yPos += 10;
  
  // Basic information table
  autoTable(doc, {
    startY: yPos,
    head: [['Field', 'Information']],
    body: [
      ['ID', incident.id],
      ['状态', capitalize(incident.status || 'Unknown')],
      ['Priority', capitalize(incident.priority || 'Unknown')],
      ['Impact', capitalize(incident.impact || 'Unknown')],
      ['创建d', formatDate(incident.created)],
      ['Last Updated', formatDate(incident.updated)],
    ],
    headStyles: {
      fillColor: [30, 64, 175], // Blue-800
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [241, 245, 249], // Slate-100
    },
    margin: { left: 15, right: 15 },
  });
  
  // Return the new Y position after the table
  return (doc as any).lastAutoTable.finalY + 10;
};

/**
 * 添加 the description section to the PDF
 */
export const add描述Section = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  doc.setFont(fonts.bold);
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('描述', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 添加 incident description
  doc.setFont(fonts.normal);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const description = incident.description || 'No description provided';
  const split描述 = doc.splitTextToSize(description, 180);
  doc.text(split描述, 15, yPos + 10);
  
  // Update y position after the description
  return yPos + 15 + (split描述.length * 5);
};

/**
 * 添加 the affected systems section to the PDF
 */
export const addAffectedSystemsSection = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  doc.setFont(fonts.bold);
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Affected Systems', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 添加 affected systems
  doc.setFont(fonts.normal);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const affectedSystems = incident.affected_systems || 'None specified';
  const systemsList = affectedSystems.split(',').map(system => system.trim());
  
  let currentY = yPos + 10;
  systemsList.forEach((system) => {
    doc.text(`• ${system}`, 15, currentY);
    currentY += 5;
  });
  
  return currentY + 5; // Return updated Y position with some padding
};

/**
 * 添加 the root cause section to the PDF
 */
export const addRootCauseSection = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  doc.setFont(fonts.bold);
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Root Cause', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 添加 root cause
  doc.setFont(fonts.normal);
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  const rootCause = incident.root_cause || 'Root cause not identified yet';
  const splitRootCause = doc.splitTextToSize(rootCause, 180);
  doc.text(splitRootCause, 15, yPos + 10);
  
  // Update y position after the root cause
  return yPos + 15 + (splitRootCause.length * 5);
};

/**
 * 添加 the resolution steps section to the PDF
 */
export const addResolutionSection = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  doc.setFont(fonts.bold);
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Resolution Steps', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 创建 resolution data table - Using resolution_steps
  const resolutionSteps = incident.resolution_steps || 'No resolution steps provided';
  const splitResolutionSteps = doc.splitTextToSize(resolutionSteps, 180);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(splitResolutionSteps, 15, yPos + 10);
  
  return yPos + 20 + (splitResolutionSteps.length * 5);
};

/**
 * 添加 the assignment information section to the PDF
 */
export const addAssignmentSection = (doc: jsPDF, incident: IncidentItem, yPos: number, assignedUser?: { full_name?: string; username?: string } | null): number => {
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Assignment Information', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 添加 assigned user info
  yPos += 10;
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  
  if (assignedUser) {
    // Show user name if available
    const user名称 = assignedUser.full_name || assignedUser.username || 'Unknown User';
    doc.text(`Assigned to: ${user名称}`, 15, yPos);
  } else {
    // Fallback to ID if no user data available
    const assignedTo = incident.assigned_users || incident.assigned_to || 'Not assigned';
    doc.text(`Assigned to: ${assignedTo}`, 15, yPos);
  }
  
  return yPos + 10;
};

/**
 * 添加 the lessons learned section to the PDF if available
 */
export const addLessonsLearnedSection = (doc: jsPDF, incident: IncidentItem, yPos: number): number => {
  if (!incident.lessons_learned) {
    return yPos; // No lessons learned, return current position
  }
  
  doc.setFontSize(14);
  doc.setTextColor(30, 64, 175); // Blue-800
  doc.text('Lessons Learned', 15, yPos);
  
  // Draw a line under the heading
  doc.line(15, yPos + 2, 195, yPos + 2);
  
  // 添加 lessons learned
  const lessonsLearned = incident.lessons_learned;
  const splitLessonsLearned = doc.splitTextToSize(lessonsLearned, 180);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(splitLessonsLearned, 15, yPos + 10);
  
  return yPos + 15 + (splitLessonsLearned.length * 5);
};

