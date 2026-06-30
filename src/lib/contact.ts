// Central place for contact info — change the number/message here and it
// updates everywhere across the site.

export const PHONE_DISPLAY = '(16) 98214-1822';
export const PHONE_E164 = '5516982141822'; // +55 (16) 98214-1822

export const WHATSAPP_MESSAGE =
  'Oi Victor! Vim pelo site e quero automatizar meu negócio com IA.';

export const WHATSAPP_URL = `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

export const TEL_URL = `tel:+${PHONE_E164}`;
