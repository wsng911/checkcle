import { getAuthHeaders, getBaseUrl, validate邮箱 } from '../utils';
import { 设置ApiResponse } from '../types';

const create邮箱Template = (template: string, data: any): { subject: string; htmlBody: string } => {
  let subject = 'Test 邮箱 from CheckCle';
  let htmlBody = `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2563eb;">Test 邮箱</h2>
          <p>This is a test email from your monitoring system.</p>
          <p>If you received this email, your SMTP configuration is working correctly.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #666;">
            Sent from CheckCle 监控ing System<br>
            Template: ${template}<br>
            ${data.collection ? `Collection: ${data.collection}` : ''}
          </p>
        </div>
      </body>
    </html>
  `;

  switch (template) {
    case 'verification':
      subject = '邮箱 Verification Test - CheckCle';
      htmlBody = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #10b981;">邮箱 Verification Test</h2>
              <p>This is a test of the email verification template.</p>
              <p>If you received this email, your SMTP configuration is working correctly.</p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Template:</strong> Verification 邮箱</p>
                <p><strong>Collection:</strong> ${data.collection || '_superusers'}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">Sent from CheckCle 监控ing System</p>
            </div>
          </body>
        </html>
      `;
      break;
    case 'password-reset':
      subject = '密码 Reset Test - CheckCle';
      htmlBody = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f59e0b;">密码 Reset Test</h2>
              <p>This is a test of the password reset template.</p>
              <p>If you received this email, your SMTP configuration is working correctly.</p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Template:</strong> 密码 Reset 邮箱</p>
                <p><strong>Collection:</strong> ${data.collection || '_superusers'}</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">Sent from CheckCle 监控ing System</p>
            </div>
          </body>
        </html>
      `;
      break;
    case 'email-change':
      subject = '邮箱 Change 确认ation Test - CheckCle';
      htmlBody = `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #8b5cf6;">邮箱 Change 确认ation Test</h2>
              <p>This is a test of the email change confirmation template.</p>
              <p>If you received this email, your SMTP configuration is working correctly.</p>
              <div style="background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Template:</strong> 邮箱 Change 确认ation</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="font-size: 12px; color: #666;">Sent from CheckCle 监控ing System</p>
            </div>
          </body>
        </html>
      `;
      break;
  }

  return { subject, htmlBody };
};

export const test邮箱 = async (data: any): Promise<设置ApiResponse> => {
  console.log('test邮箱 function called with data:', data);

  try {
    // Validate required fields
    if (!data || typeof data !== 'object') {
      console.log('Invalid request data - not object');
      return {
        status: 200,
        json: { success: false, message: 'Invalid request data' },
      };
    }

    if (!data.email || typeof data.email !== 'string') {
      console.log('邮箱 address missing or invalid type');
      return {
        status: 200,
        json: { success: false, message: '邮箱 address is required and must be a string' },
      };
    }

    if (!validate邮箱(data.email)) {
      console.log('Invalid email format:', data.email);
      return {
        status: 200,
        json: { success: false, message: 'Invalid email address format' },
      };
    }

    console.log('邮箱 validation passed for:', data.email);

    const headers = getAuthHeaders();
    const baseUrl = getBaseUrl();

    // Get current SMTP settings first
    console.log('Fetching SMTP settings from:', `${baseUrl}/api/settings`);
    
    const settingsResponse = await fetch(`${baseUrl}/api/settings`, {
      method: 'GET',
      headers,
    });

    if (!settingsResponse.ok) {
      console.error('Failed to get SMTP settings, status:', settingsResponse.status);
      return {
        status: 200,
        json: { success: false, message: 'Failed to get SMTP settings' },
      };
    }

    const settingsData = await settingsResponse.json();
    console.log('Retrieved settings data:', settingsData);
    
    const smtp设置 = settingsData?.smtp;

    if (!smtp设置 || !smtp设置.enabled) {
      console.log('SMTP not enabled or missing');
      return {
        status: 200,
        json: { success: false, message: 'SMTP is not enabled. Please enable and configure SMTP settings first.' },
      };
    }

    if (!smtp设置.host || !smtp设置.username) {
      console.log('SMTP configuration incomplete - missing host or username');
      return {
        status: 200,
        json: { success: false, message: 'SMTP configuration is incomplete. Please check host and username.' },
      };
    }

    // 创建 test email content based on template
    const template = data.template || 'basic';
    const { subject, htmlBody } = create邮箱Template(template, data);

    console.log('Test email prepared successfully:', {
      to: data.email,
      subject: subject,
      template: template,
      smtpHost: smtp设置.host,
      smtpPort: smtp设置.port || 587
    });

    // Send actual email using the correct PocketBase API endpoint
    console.log('Sending actual email via PocketBase...');
    
    // Fix the payload structure to match PocketBase API expectations
    const emailPayload = {
      email: data.email,  // Use 'email' instead of 'to'
      template: template, // 添加 the template field
      subject: subject,
      html: htmlBody,
    };

    console.log('邮箱 payload:', emailPayload);

    const emailResponse = await fetch(`${baseUrl}/api/settings/test/email`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send email, status:', emailResponse.status);
      const errorText = await emailResponse.text();
      console.error('邮箱 send error response:', errorText);
      return {
        status: 200,
        json: { success: false, message: 'Failed to send email. Please check your SMTP configuration.' },
      };
    }

    // Handle 204 No Content response (successful but no body)
    if (emailResponse.status === 204) {
      console.log('邮箱 sent successfully (204 No Content)');
      return {
        status: 200,
        json: {
          success: true,
          message: `Test email sent successfully to ${data.email}`,
        },
      };
    }

    // For other successful responses, try to parse JSON
    const emailResult = await emailResponse.json();
    console.log('邮箱 sent successfully:', emailResult);

    return {
      status: 200,
      json: {
        success: true,
        message: `Test email sent successfully to ${data.email}`,
      },
    };

  } catch (error) {
    console.error('Error in test邮箱 function:', error);
    return {
      status: 200,
      json: { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send test email. Please check your SMTP configuration.'
      },
    };
  }
};