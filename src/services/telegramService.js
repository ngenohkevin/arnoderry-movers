class TelegramService {
  constructor() {
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    this.chatIds = this.parseChatIds(import.meta.env.VITE_TELEGRAM_CHAT_IDS);
    this.baseURL = `https://api.telegram.org/bot${this.botToken}`;
  }

  parseChatIds(chatIdsString) {
    if (!chatIdsString) return [];
    return chatIdsString.split(',').map(id => id.trim()).filter(id => id);
  }

  async sendQuotation(formData) {
    const message = this.formatQuotationMessage(formData);
    
    // Telegram message limit is 4096 characters
    if (message.length > 4096) {
      throw new Error(`Message too long: ${message.length} characters (limit: 4096)`);
    }

    const results = await this.sendToMultipleChats(message);
    
    // Check if at least one message was sent successfully
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    
    if (successCount === 0) {
      throw new Error('Failed to send message to any recipient');
    }
    
    console.log(`✅ Quotation sent to ${successCount} recipient(s)`);
    if (failCount > 0) {
      console.warn(`⚠️ Failed to send to ${failCount} recipient(s)`);
    }
    
    return { 
      success: true, 
      data: { 
        successCount, 
        failCount, 
        results 
      } 
    };
  }

  async sendToMultipleChats(message) {
    const sendPromises = this.chatIds.map(async (chatId) => {
      try {
        const response = await fetch(`${this.baseURL}/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        });

        const result = await response.json();
        
        if (!response.ok) {
          console.error(`Failed to send to ${chatId}:`, result);
          return { 
            chatId, 
            success: false, 
            error: result.description || 'Unknown error' 
          };
        }

        return { 
          chatId, 
          success: true, 
          data: result 
        };
      } catch (error) {
        console.error(`Error sending to ${chatId}:`, error);
        return { 
          chatId, 
          success: false, 
          error: error.message 
        };
      }
    });

    return await Promise.all(sendPromises);
  }

  formatQuotationMessage(formData) {
    const {
      fullName, email, phone, movingTo, movingFrom, movingDate,
      moveType, bedrooms, staffCount, cleaningServices
    } = formData;

    const timestamp = new Date().toLocaleString('en-KE', {
      timeZone: 'Africa/Nairobi',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const moveDetails = moveType === 'house' 
      ? `🏠 <b>${bedrooms} Bedroom House</b>`
      : `🏢 <b>Office (${staffCount} staff)</b>`;

    // Clean phone number for WhatsApp link
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const whatsappPhone = cleanPhone.startsWith('254') ? cleanPhone : `254${cleanPhone.replace(/^0/, '')}`;

    return `🚚 <b>NEW MOVING QUOTATION REQUEST</b>

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 <b>SUBMISSION DETAILS</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 Date: <code>${timestamp}</code>
🆔 ID: <code>${Date.now()}</code>

━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 <b>CUSTOMER INFORMATION</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 Name: <code>${this.escapeHtml(fullName)}</code>
📧 Email: <code>${this.escapeHtml(email)}</code>
📱 Phone: <code>${this.escapeHtml(phone)}</code>

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🗺️ <b>MOVING DETAILS</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 From: <code>${this.escapeHtml(movingFrom)}</code>
📍 To: <code>${this.escapeHtml(movingTo)}</code>
📅 Date: <code>${movingDate}</code>
${moveDetails}
🧹 Cleaning: ${cleaningServices ? '✅ <b>Yes</b>' : '❌ <b>No</b>'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 <b>QUICK ACTIONS</b>
━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Call: <a href="tel:${phone}">${this.escapeHtml(phone)}</a>
• Email: <a href="mailto:${email}">${this.escapeHtml(email)}</a>
• WhatsApp: <a href="https://wa.me/${whatsappPhone}">Send Message</a>

🏢 <b>Arnoderry Movers</b> | New Quote Request`;
  }

  escapeHtml(text) {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async testConnection() {
    try {
      const response = await fetch(`${this.baseURL}/getMe`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${result.description || 'Unknown error'}`);
      }
      
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testMultipleMessages() {
    try {
      const testMessage = `🧪 <b>Test Message</b>

This is a test message from Arnoderry Movers Quote System.

Time: <code>${new Date().toLocaleString()}</code>
Status: Testing Multi-User Telegram Bot Integration

If you receive this message, your Telegram integration is working correctly! ✅`;

      const results = await this.sendToMultipleChats(testMessage);
      
      const successCount = results.filter(r => r.success).length;
      const failCount = results.filter(r => !r.success).length;
      
      return { 
        success: successCount > 0, 
        successCount, 
        failCount, 
        results 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

const telegramService = new TelegramService();

// Make available for testing
if (typeof window !== 'undefined') {
  window.telegramService = telegramService;
  
  window.testTelegram = async () => {
    console.log('🧪 Testing Telegram Bot connection...');
    const result = await telegramService.testConnection();
    console.log('Connection result:', result);
    
    if (result.success) {
      console.log('✅ Telegram bot is connected!');
      console.log('Bot info:', result.data.result);
      
      console.log(`🧪 Testing message sending to ${telegramService.chatIds.length} recipient(s)...`);
      console.log('Recipients:', telegramService.chatIds);
      
      const messageResult = await telegramService.testMultipleMessages();
      console.log('Message result:', messageResult);
      
      if (messageResult.success) {
        console.log(`✅ Test messages sent! ${messageResult.successCount} successful, ${messageResult.failCount} failed`);
        messageResult.results.forEach((result, index) => {
          if (result.success) {
            console.log(`✅ Recipient ${index + 1} (${result.chatId}): Success`);
          } else {
            console.log(`❌ Recipient ${index + 1} (${result.chatId}): ${result.error}`);
          }
        });
      } else {
        console.log('❌ Failed to send test messages');
      }
    } else {
      console.log('❌ Telegram bot connection failed:', result.error);
    }
  };

  window.showChatIds = () => {
    console.log('📱 Current Telegram Recipients:');
    telegramService.chatIds.forEach((chatId, index) => {
      console.log(`${index + 1}. Chat ID: ${chatId}`);
    });
    console.log('');
    console.log('💡 To add more recipients, update your .env file:');
    console.log('VITE_TELEGRAM_CHAT_IDS=id1,id2,id3');
  };
}

export default telegramService;
