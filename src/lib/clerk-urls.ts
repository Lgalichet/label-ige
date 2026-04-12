const CLERK_DOMAIN = 'magnetic-lacewing-71.clerk.accounts.dev'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://label-ige.vercel.app'

export const clerkSignInUrl = `https://${CLERK_DOMAIN}/sign-in?redirect_url=${APP_URL}/espace-createur`
export const clerkSignUpUrl = `https://${CLERK_DOMAIN}/sign-up?redirect_url=${APP_URL}/espace-createur`
