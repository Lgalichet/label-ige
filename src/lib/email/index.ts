import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export async function sendWelcomeEmail(to: string, username: string) {
  return resend.emails.send({
    from: `Label IGE <${FROM}>`,
    to,
    subject: 'Bienvenue sur Label IGE',
    html: `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="font-family: Arial, sans-serif; background: #F8F9FA; margin: 0; padding: 40px 20px;">
  <div style="max-width: 520px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #DEE2E6;">
    <div style="background: #1A3A5C; color: white; padding: 32px; text-align: center;">
      <div style="background: white; color: #1A3A5C; display: inline-block; padding: 4px 12px; border-radius: 6px; font-weight: 900; font-size: 18px; letter-spacing: 3px; margin-bottom: 12px;">IGE</div>
      <h1 style="margin: 0; font-size: 22px; font-weight: 700;">Label IGE</h1>
      <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Imaginé humain • Généré IA • Embelli humain</p>
    </div>
    <div style="padding: 32px;">
      <h2 style="color: #1A1A2E; font-size: 20px; margin: 0 0 12px;">Bienvenue, ${username} !</h2>
      <p style="color: #555B6E; line-height: 1.6; margin: 0 0 20px;">
        Votre compte Label IGE est créé. Vous pouvez maintenant certifier la part d'humain dans vos créations et télécharger votre badge de transparence IA.
      </p>
      <a href="${APP_URL}/creer" style="display: inline-block; background: #1A3A5C; color: white; text-decoration: none; font-weight: 600; padding: 12px 24px; border-radius: 8px; font-size: 14px;">
        Créer mon premier label →
      </a>
      <hr style="border: none; border-top: 1px solid #DEE2E6; margin: 28px 0;">
      <p style="color: #888; font-size: 12px; margin: 0;">
        Si vous n'avez pas créé ce compte, ignorez cet email.<br>
        <a href="${APP_URL}" style="color: #1A3A5C;">label-ige.com</a>
      </p>
    </div>
  </div>
</body>
</html>`,
  })
}
