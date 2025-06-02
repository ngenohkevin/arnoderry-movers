import * as emailjs from 'emailjs-com';
import telegramService from './telegramService.js';

const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_EMAILJS_PRIVATE_KEY,
  notificationEmail: import.meta.env.VITE_NOTIFICATION_EMAIL
};

class WhatsAppService {
  constructor() {
    this.businessPhoneNumber = import.meta.env.VITE_BUSINESS_PHONE_NUMBER;
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }

  async submitQuoteRequest(formData) {
    try {
      await telegramService.sendQuotation(formData);
      
      return { 
        success: true, 
        method: 'telegram',
        message: 'Quote sent to Telegram successfully'
      };
    } catch (telegramError) {
      try {
        const emailResult = await this.sendEmailNotification(formData);
        return emailResult;
      } catch (emailError) {
        return this.saveQuoteLocally(formData);
      }
    }
  }

  async sendEmailNotification(formData) {
    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      movingTo: formData.movingTo,
      movingFrom: formData.movingFrom,
      movingDate: formData.movingDate,
      moveType: formData.moveType === 'house' ? 'House Moving' : 'Office Moving',
      bedrooms: formData.bedrooms || 'N/A',
      staffCount: formData.staffCount || 'N/A',
      cleaningServices: formData.cleaningServices ? 'Yes' : 'No'
    };

    await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    return { 
      success: true, 
      method: 'email',
      message: 'Quote sent via email successfully'
    };
  }

  saveQuoteLocally(formData) {
    const quotes = JSON.parse(localStorage.getItem('pendingQuotes') || '[]');
    quotes.push({
      ...formData,
      timestamp: new Date().toISOString(),
      id: Date.now()
    });
    localStorage.setItem('pendingQuotes', JSON.stringify(quotes));
    
    return { 
      success: true, 
      method: 'local',
      message: 'Quote saved locally'
    };
  }

  generateWhatsAppLink(formData) {
    const message = encodeURIComponent(`Hi! I'd like to get a quote for moving.

📋 *Moving Details:*
From: ${formData.movingFrom}
To: ${formData.movingTo}
Date: ${formData.movingDate}
Type: ${formData.moveType === 'house' ? 'House Moving' : 'Office Moving'}
${formData.moveType === 'house' ? `Bedrooms: ${formData.bedrooms}` : `Staff: ${formData.staffCount}`}
Cleaning Services: ${formData.cleaningServices ? 'Yes' : 'No'}

Please provide me with a quote. Thank you!`);

    return `https://wa.me/${this.businessPhoneNumber.replace('+', '')}?text=${message}`;
  }
}

const whatsappServiceInstance = new WhatsAppService();

export default whatsappServiceInstance;
