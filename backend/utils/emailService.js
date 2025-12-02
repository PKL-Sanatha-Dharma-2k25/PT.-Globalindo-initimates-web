/* eslint-disable no-undef */

import nodemailer from 'nodemailer';

// DEBUG: Cek environment variables
console.log('🔍 EMAIL SERVICE LOADED');
console.log('  SMTP_HOST:', process.env.SMTP_HOST);
console.log('  SMTP_PORT:', process.env.SMTP_PORT);
console.log('  SMTP_USER:', process.env.SMTP_USER);
console.log('  SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'UNDEFINED');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP TRANSPORTER ERROR:', error.message);
  } else {
    console.log('✅ SMTP TRANSPORTER READY');
  }
});

// ============================================
// SEND INQUIRY NOTIFICATION TO ADMIN
// ============================================

export const sendInquiryNotification = async (inquiry) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const logoUrl = 'https://via.placeholder.com/120x40/FF6B35/FFFFFF?text=GLOBALINDO';

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #333;
              padding: 20px;
            }
            .wrapper { max-width: 680px; margin: 0 auto; }
            .email-container {
              background: white;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            }
            
            /* LOGO SECTION */
            .logo-section {
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              padding: 25px 30px;
              text-align: center;
              border-bottom: 3px solid #FF6B35;
            }
            .logo {
              display: inline-block;
              height: 45px;
            }
            .logo img {
              height: 100%;
              max-width: auto;
            }

            /* HEADER */
            .header {
              background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
              color: white;
              padding: 35px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              right: -100px;
              width: 300px;
              height: 300px;
              background: rgba(255,255,255,0.1);
              border-radius: 50%;
            }
            .header-icon {
              font-size: 42px;
              margin-bottom: 12px;
              position: relative;
              z-index: 1;
              display: inline-block;
              animation: pulse 2s infinite;
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
            .header h1 {
              font-size: 26px;
              margin-bottom: 6px;
              font-weight: 700;
              position: relative;
              z-index: 1;
            }
            .header p {
              font-size: 14px;
              opacity: 0.95;
              position: relative;
              z-index: 1;
            }
            .badge {
              display: inline-block;
              background: rgba(255,255,255,0.25);
              padding: 8px 16px;
              border-radius: 20px;
              font-size: 11px;
              margin-top: 12px;
              font-weight: 700;
              border: 1px solid rgba(255,255,255,0.4);
              position: relative;
              z-index: 1;
            }

            /* CONTENT */
            .content {
              padding: 40px 30px;
              background: #f8fafb;
            }
            .greeting {
              font-size: 16px;
              color: #333;
              margin-bottom: 20px;
              line-height: 1.6;
            }
            
            /* PRIORITY ALERT */
            .priority-alert {
              background: linear-gradient(135deg, #FFF5E6 0%, #FFE8D0 100%);
              border-left: 4px solid #FF6B35;
              padding: 16px 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              font-size: 13px;
              color: #FF6B35;
              font-weight: 600;
              display: flex;
              align-items: center;
              gap: 12px;
            }
            .alert-icon {
              font-size: 22px;
            }

            /* INFO GRID */
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 16px;
              margin-bottom: 25px;
            }
            .info-card {
              background: white;
              padding: 18px;
              border-radius: 10px;
              border-left: 4px solid #FF6B35;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
              transition: transform 0.3s, box-shadow 0.3s;
            }
            .info-card:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            }
            .info-card.full {
              grid-column: 1 / -1;
            }
            .info-label {
              font-weight: 700;
              color: #FF6B35;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.7px;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .info-icon {
              font-size: 16px;
            }
            .info-value {
              font-size: 14px;
              color: #333;
              word-break: break-all;
              font-weight: 500;
            }
            .info-value a {
              color: #FF6B35;
              text-decoration: none;
              font-weight: 700;
              transition: color 0.3s;
            }
            .info-value a:hover {
              color: #FF8C42;
              text-decoration: underline;
            }

            /* MESSAGE BOX */
            .message-box {
              background: white;
              padding: 22px;
              border-radius: 10px;
              border-left: 4px solid #667eea;
              margin-bottom: 25px;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            }
            .message-box h3 {
              color: #667eea;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.7px;
              margin-bottom: 14px;
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 700;
            }
            .message-content {
              font-size: 14px;
              line-height: 1.8;
              color: #555;
              background: #f9fafb;
              padding: 16px;
              border-radius: 8px;
              white-space: pre-wrap;
              word-wrap: break-word;
              max-height: 300px;
              overflow-y: auto;
            }

            /* ACTION SECTION */
            .action-section {
              text-align: center;
              margin-bottom: 25px;
              padding: 25px 0;
              border-top: 2px solid #e0e0e0;
              border-bottom: 2px solid #e0e0e0;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%);
              color: white;
              padding: 14px 42px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 700;
              font-size: 15px;
              transition: all 0.3s;
              box-shadow: 0 4px 20px rgba(255, 107, 53, 0.35);
              border: none;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              gap: 8px;
            }
            .btn:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 28px rgba(255, 107, 53, 0.45);
            }

            /* TIPS BOX */
            .tips-box {
              background: linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%);
              padding: 20px;
              border-radius: 10px;
              font-size: 13px;
              color: #0369A1;
              border-left: 4px solid #0369A1;
              margin-bottom: 20px;
            }
            .tips-box strong {
              display: flex;
              align-items: center;
              gap: 8px;
              margin-bottom: 12px;
              font-size: 14px;
            }
            .tips-box ul {
              list-style: none;
              padding-left: 24px;
            }
            .tips-box li {
              margin-bottom: 8px;
              position: relative;
            }
            .tips-box li:before {
              content: '✓';
              position: absolute;
              left: -18px;
              font-weight: bold;
              color: #0369A1;
            }

            /* FOOTER */
            .footer {
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              color: #ecf0f1;
              padding: 30px;
              text-align: center;
              font-size: 12px;
            }
            .footer-divider {
              border-top: 1px solid rgba(255,255,255,0.2);
              padding-top: 15px;
              margin-top: 15px;
            }
            .footer p {
              margin: 8px 0;
              line-height: 1.6;
            }
            .footer-links {
              margin: 15px 0;
              font-size: 13px;
            }
            .footer-links a {
              color: #FF6B35;
              text-decoration: none;
              margin: 0 12px;
              font-weight: 700;
              transition: color 0.3s;
            }
            .footer-links a:hover {
              color: #FF8C42;
            }
            .footer-brand {
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 8px;
            }

            /* RESPONSIVE */
            @media (max-width: 600px) {
              .logo-section { padding: 20px; }
              .logo { height: 35px; }
              .header { padding: 25px 20px; }
              .header h1 { font-size: 22px; }
              .header-icon { font-size: 36px; }
              .content { padding: 25px 20px; }
              .info-grid { grid-template-columns: 1fr; }
              .info-card { padding: 14px; }
              .btn { padding: 12px 32px; font-size: 14px; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="email-container">
              <!-- LOGO SECTION -->
              <div class="logo-section">
                <div class="logo">
                  <img src="http://localhost:5000/uploads/logo.png" alt="Globalindo Logo" style="height: 45px; width: auto;">
                </div>
              </div>

              <!-- HEADER -->
              <div class="header">
                <div class="header-icon">📬</div>
                <h1>Inquiry Baru Diterima!</h1>
                <p>Ada pesan baru dari calon pelanggan</p>
                <div class="badge">⚡ URGENT - Butuh Respons Cepat</div>
              </div>

              <!-- CONTENT -->
              <div class="content">
                <div class="greeting">
                  Halo Admin,<br>
                  Anda menerima inquiry baru. Silakan tinjau dan berikan respons sesegera mungkin untuk pengalaman pelanggan terbaik.
                </div>

                <!-- PRIORITY ALERT -->
                <div class="priority-alert">
                  <div class="alert-icon">⏰</div>
                  <div>
                    Diterima: ${new Date(inquiry.createdAt).toLocaleString('id-ID', { 
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>

                <!-- INFO GRID -->
                <div class="info-grid">
                  <div class="info-card">
                    <div class="info-label"><span class="info-icon">👤</span> Nama Pengirim</div>
                    <div class="info-value">${inquiry.name}</div>
                  </div>

                  <div class="info-card">
                    <div class="info-label"><span class="info-icon">📧</span> Email</div>
                    <div class="info-value"><a href="mailto:${inquiry.email}">${inquiry.email}</a></div>
                  </div>

                  <div class="info-card">
                    <div class="info-label"><span class="info-icon">📱</span> Nomor Telepon</div>
                    <div class="info-value"><a href="tel:${inquiry.phone}">📞 ${inquiry.phone}</a></div>
                  </div>

                  <div class="info-card">
                    <div class="info-label"><span class="info-icon">🎯</span> Topik</div>
                    <div class="info-value">${inquiry.subject}</div>
                  </div>
                </div>

                <!-- MESSAGE BOX -->
                <div class="message-box">
                  <h3><span style="font-size: 18px;">💬</span> Pesan Lengkap</h3>
                  <div class="message-content">${inquiry.message.replace(/\n/g, '<br>')}</div>
                </div>

                <!-- ACTION SECTION -->
                <div class="action-section">
                  <p style="margin-bottom: 15px; color: #666; font-size: 14px; font-weight: 600;">Kelola inquiry ini sekarang:</p>
                  <a href="http://localhost:5173/admin" class="btn">
                    <span style="font-size: 18px;">🔗</span> Buka Admin Panel
                  </a>
                </div>

                <!-- QUICK TIPS -->
                <div class="tips-box">
                  <strong>
                    <span style="font-size: 18px;">💡</span> Tips Respons Cepat
                  </strong>
                  <ul>
                    <li>Respons dalam 24 jam meningkatkan kepuasan pelanggan hingga 95%</li>
                    <li>Gunakan nomor telepon untuk follow-up yang lebih personal</li>
                    <li>Tawarkan solusi yang sesuai kebutuhan spesifik pelanggan</li>
                    <li>Sertakan informasi produk relevan dalam respons Anda</li>
                  </ul>
                </div>
              </div>

              <!-- FOOTER -->
              <div class="footer">
                <div class="footer-brand">🏢 PT Globalindo Intimates</div>
                <p>Kualitas Premium untuk Kenyamanan Anda</p>
                <div class="footer-links">
                  <a href="mailto:info@globalindo-intimates.com">📧 Email</a>
                  <a href="tel:02123011200">📱 0212-301120</a>
                  <a href="#">🌐 Website</a>
                </div>
                <div class="footer-divider">
                  <p>© 2025 PT Globalindo Intimates. Semua hak dilindungi.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: `🔥 [INQUIRY BARU] ${inquiry.subject} - dari ${inquiry.name}`,
      html: htmlContent,
      replyTo: inquiry.email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Email error:', err);
    return { success: false, error: err.message };
  }
};

// ============================================
// SEND CONFIRMATION TO CUSTOMER
// ============================================

export const sendInquiryConfirmation = async (inquiry) => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: #333;
              padding: 20px;
            }
            .wrapper { max-width: 680px; margin: 0 auto; }
            .email-container {
              background: white;
              border-radius: 14px;
              overflow: hidden;
              box-shadow: 0 20px 60px rgba(0,0,0,0.2);
            }
            
            /* LOGO SECTION */
            .logo-section {
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              padding: 25px 30px;
              text-align: center;
              border-bottom: 3px solid #10B981;
            }
            .logo {
              display: inline-block;
              height: 45px;
            }
            .logo img {
              height: 100%;
              max-width: auto;
            }

            /* HEADER */
            .header {
              background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
              color: white;
              padding: 35px 30px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: 0;
              right: -100px;
              width: 300px;
              height: 300px;
              background: rgba(255,255,255,0.1);
              border-radius: 50%;
            }
            .check-icon {
              font-size: 48px;
              margin-bottom: 15px;
              position: relative;
              z-index: 1;
              display: inline-block;
              animation: bounce 0.6s ease-in-out;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(5deg); }
            }
            .header h1 {
              font-size: 26px;
              margin-bottom: 6px;
              font-weight: 700;
              position: relative;
              z-index: 1;
            }
            .header-subtitle {
              font-size: 15px;
              opacity: 0.95;
              position: relative;
              z-index: 1;
            }

            /* CONTENT */
            .content {
              padding: 40px 30px;
              background: #f8fafb;
            }
            
            .greeting {
              font-size: 18px;
              font-weight: 700;
              color: #333;
              margin-bottom: 15px;
            }
            
            .message-text {
              font-size: 15px;
              line-height: 1.8;
              color: #666;
              margin-bottom: 25px;
            }

            /* INFO BOXES */
            .info-box {
              background: white;
              padding: 18px;
              border-radius: 10px;
              margin-bottom: 12px;
              border-left: 4px solid #10B981;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
              transition: transform 0.3s;
            }
            .info-box:hover {
              transform: translateX(5px);
            }
            .info-box.highlight {
              background: linear-gradient(135deg, #F0FDF4 0%, #DBEAFE 100%);
              border-left-color: #10B981;
            }
            .info-label {
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              color: #10B981;
              letter-spacing: 0.7px;
              margin-bottom: 8px;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .info-value {
              font-size: 15px;
              color: #333;
              font-weight: 600;
            }

            /* TIMELINE */
            .timeline {
              background: white;
              padding: 25px;
              border-radius: 10px;
              margin-bottom: 25px;
              border: 2px dashed #10B981;
              box-shadow: 0 2px 12px rgba(0,0,0,0.08);
            }
            .timeline h3 {
              color: #10B981;
              font-size: 14px;
              margin-bottom: 18px;
              display: flex;
              align-items: center;
              gap: 8px;
              font-weight: 700;
            }
            .timeline-item {
              display: flex;
              gap: 15px;
              margin-bottom: 16px;
              padding-bottom: 16px;
              border-bottom: 1px solid #e0e0e0;
            }
            .timeline-item:last-child {
              border-bottom: none;
              margin-bottom: 0;
              padding-bottom: 0;
            }
            .timeline-icon {
              font-size: 24px;
              min-width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #F0FDF4;
              border-radius: 8px;
            }
            .timeline-text {
              flex: 1;
            }
            .timeline-text strong {
              display: block;
              color: #10B981;
              font-size: 14px;
              margin-bottom: 4px;
            }
            .timeline-text p {
              font-size: 13px;
              color: #666;
              line-height: 1.5;
            }

            /* CONTACT INFO */
            .contact-section {
              background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 25px;
              border-left: 4px solid #F59E0B;
            }
            .contact-section h3 {
              color: #D97706;
              font-size: 14px;
              margin-bottom: 14px;
              font-weight: 700;
              display: flex;
              align-items: center;
              gap: 8px;
            }
            .contact-item {
              font-size: 14px;
              color: #B45309;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 12px;
              font-weight: 600;
            }
            .contact-item a {
              color: #D97706;
              text-decoration: none;
              transition: color 0.3s;
            }
            .contact-item a:hover {
              color: #92400E;
            }
            .contact-icon {
              font-size: 18px;
            }

            /* CTA SECTION */
            .cta-section {
              text-align: center;
              margin-bottom: 30px;
              padding: 25px 0;
              border-top: 2px solid #e0e0e0;
              border-bottom: 2px solid #e0e0e0;
            }
            .btn-primary {
              display: inline-block;
              background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
              color: white;
              padding: 14px 42px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 700;
              font-size: 15px;
              box-shadow: 0 4px 20px rgba(16, 185, 129, 0.35);
              transition: all 0.3s;
              display: inline-flex;
              align-items: center;
              gap: 8px;
            }
            .btn-primary:hover {
              transform: translateY(-3px);
              box-shadow: 0 8px 28px rgba(16, 185, 129, 0.45);
            }

            /* FOOTER */
            .footer {
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
              color: #ecf0f1;
              padding: 30px;
              text-align: center;
              font-size: 12px;
            }
            .footer-divider {
              border-top: 1px solid rgba(255,255,255,0.2);
              padding-top: 15px;
              margin-top: 15px;
            }
            .footer p {
              margin: 8px 0;
              line-height: 1.6;
            }
            .footer-links {
              margin: 15px 0;
              font-size: 13px;
            }
            .footer-links a {
              color: #10B981;
              text-decoration: none;
              margin: 0 12px;
              font-weight: 700;
              transition: color 0.3s;
            }
            .footer-links a:hover {
              color: #34D399;
            }
            .footer-brand {
              font-size: 14px;
              font-weight: 700;
              margin-bottom: 8px;
            }

            /* RESPONSIVE */
            @media (max-width: 600px) {
              .logo-section { padding: 20px; }
              .logo { height: 35px; }
              .header { padding: 25px 20px; }
              .header h1 { font-size: 22px; }
              .check-icon { font-size: 42px; }
              .content { padding: 25px 20px; }
              .btn-primary { padding: 12px 32px; font-size: 14px; }
              .timeline-item { gap: 12px; }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="email-container">
              <!-- LOGO SECTION -->
              <div class="logo-section">
                <div class="logo">
                  <img src="http://localhost:5000/uploads/logo.png" alt="Globalindo Logo" style="height: 45px; width: auto;">
                </div>
              </div>

              <!-- HEADER -->
              <div class="header">
                <div class="check-icon">✅</div>
                <h1>Terima Kasih!</h1>
                <p class="header-subtitle">Inquiry Anda telah diterima dengan baik</p>
              </div>

              <!-- CONTENT -->
              <div class="content">
                <p class="greeting">Halo ${inquiry.name},</p>
                
                <p class="message-text">
                  Terima kasih telah menghubungi <strong>PT Globalindo Intimates</strong>! 🎉<br><br>
                  Kami sangat menghargai ketertarikan Anda terhadap produk dan layanan premium kami. Inquiry Anda telah kami terima dan akan ditangani oleh tim customer service kami dengan profesional.
                </p>

                <!-- INQUIRY DETAIL -->
                <div class="info-box highlight">
                  <div class="info-label">
                    <span style="font-size: 16px;">📌</span> Ringkasan Inquiry
                  </div>
                  <div class="info-value">${inquiry.subject}</div>
                </div>

                <div class="info-box">
                  <div class="info-label">
                    <span style="font-size: 16px;">📅</span> Waktu Diterima
                  </div>
                  <div class="info-value">${new Date(inquiry.createdAt).toLocaleString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</div>
                </div>

                <!-- TIMELINE NEXT STEPS -->
                <div class="timeline">
                  <h3>
                    <span style="font-size: 18px;">⏱️</span> Apa yang akan terjadi selanjutnya?
                  </h3>
                  
                  <div class="timeline-item">
                    <div class="timeline-icon">1️⃣</div>
                    <div class="timeline-text">
                      <strong>24 Jam Pertama</strong>
                      <p>Tim kami akan meninjau inquiry Anda dengan seksama dan memahami kebutuhan Anda.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-icon">2️⃣</div>
                    <div class="timeline-text">
                      <strong>Respons Personal</strong>
                      <p>Kami akan menghubungi Anda via email atau telepon dengan solusi terbaik.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-icon">3️⃣</div>
                    <div class="timeline-text">
                      <strong>Konsultasi Gratis</strong>
                      <p>Dapatkan rekomendasi produk yang sesuai dengan kebutuhan dan budget Anda.</p>
                    </div>
                  </div>

                  <div class="timeline-item">
                    <div class="timeline-icon">4️⃣</div>
                    <div class="timeline-text">
                      <strong>Kepuasan Anda</strong>
                      <p>Kami berkomitmen memberikan layanan terbaik sampai Anda 100% puas.</p>
                    </div>
                  </div>
                </div>

                <!-- CONTACT INFO -->
                <div class="contact-section">
                  <h3>
                    <span class="contact-icon">📞</span> Hubungi Kami Langsung
                  </h3>
                  <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <a href="mailto:info@globalindo-intimates.com">info@globalindo-intimates.com</a>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">📱</span>
                    <a href="tel:02123011200">0212 - 301120</a>
                  </div>
                  <div class="contact-item">
                    <span class="contact-icon">🕐</span>
                    Senin - Jumat, 09:00 - 17:00 WIB
                  </div>
                </div>

                <!-- CTA -->
                <div class="cta-section">
                  <p style="font-size: 13px; color: #999; margin-bottom: 15px; font-weight: 600;">Kunjungi website kami untuk produk & penawaran terbaru</p>
                  <a href="https://globalindo-intimates.com" class="btn-primary">
                    <span style="font-size: 18px;">🌐</span> Kunjungi Website
                  </a>
                </div>

                <!-- CLOSING -->
                <p style="font-size: 14px; color: #666; text-align: center; padding: 20px 0; border-top: 1px solid #e0e0e0;">
                  Dengan hormat,<br>
                  <strong style="font-size: 15px;">Tim Customer Service PT Globalindo Intimates</strong><br>
                  <span style="font-size: 12px; color: #10B981; font-weight: 700;">Kami ada untuk Anda! 💚</span>
                </p>
              </div>

              <!-- FOOTER -->
              <div class="footer">
                <div class="footer-brand">🏢 PT Globalindo Intimates</div>
                <p>Kualitas Premium untuk Kenyamanan Anda</p>
                <div class="footer-links">
                  <a href="mailto:info@globalindo-intimates.com">📧 Email</a>
                  <a href="tel:02123011200">📱 Telepon</a>
                  <a href="#">🌐 Website</a>
                </div>
                <div class="footer-divider">
                  <p>© 2025 PT Globalindo Intimates. Semua hak dilindungi.</p>
                  <p style="font-size: 11px; margin-top: 8px; opacity: 0.8;">Email ini otomatis dan tidak memerlukan balasan.</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: inquiry.email,
      subject: '✅ Inquiry Anda Telah Diterima - PT Globalindo Intimates',
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error('❌ Confirmation email error:', err);
    return { success: false, error: err.message };
  }
};