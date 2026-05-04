
import jsPDF from 'jspdf';
import 'jspdf-autotable'; 
import { format } from 'date-fns';
import { MaintenanceItem } from '../../types/maintenance.types';
import { addHeader, addFooter } from './headerFooter';
import { 
  add描述Section, 
  addScheduleSection, 
  addAffected服务Section, 
  addPersonnelSection 
} from './sections';

// Function to generate a professional PDF from maintenance record
export const generatePdf = async (maintenance: MaintenanceItem): Promise<string> => {
  try {
    // Validate maintenance data
    if (!maintenance?.id) {
      console.error('Invalid maintenance data for PDF generation');
      throw new Error('Invalid maintenance data');
    }
    
    // 创建 a new PDF document
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // 添加 header with title and metadata
    addHeader(doc, maintenance);
    
    // Start rendering content from this position
    let yPos = 55;
    
    // 添加 description section
    yPos = add描述Section(doc, maintenance, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 schedule information
    yPos = addScheduleSection(doc, maintenance, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 affected services section
    yPos = addAffected服务Section(doc, maintenance, yPos);
    
    // Check if we need to add a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // 添加 personnel information section
    addPersonnelSection(doc, maintenance, yPos);
    
    // 添加 footer to all pages
    addFooter(doc);
    
    // Generate filename
    const file名称 = `maintenance-${maintenance.id}-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    
    // 创建 blob and URL for download
    const pdfOutput = doc.output('blob');
    const blobUrl = URL.createObjectURL(new Blob([pdfOutput], { type: 'application/pdf' }));
    
    // Trigger download using a technique that works in most browsers
    const downloadLink = document.createElement('a');
    downloadLink.href = blobUrl;
    downloadLink.download = file名称;
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    console.log('PDF generated successfully:', file名称);
    return file名称;
  } catch (error) {
    console.error('Error generating maintenance PDF:', error);
    throw new Error(`Failed to generate PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
