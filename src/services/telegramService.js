class TelegramService {
  constructor() {
    this.botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    this.chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    this.baseURL = `https://api.telegram.org/bot${this.botToken}`;
  }

  async sendQuotation(formData) {
    try {
      const message = this.formatQuotationMessage(formData);
      
      if (message.length > 4096) {
        throw new Error(`Message too long: ${message.length} characters (limit: 4096)`);
      }
      
      const response = await fetch(`${this.baseURL}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: message,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(`Telegram API error: ${response.status} - ${result.description || 'Unknown error'}`);
      }

      return { success: true, data: result };
    } catch (error) {
      throw error;
    }
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
}

const telegramService = new TelegramService();

export default telegramService;
