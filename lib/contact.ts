// Contact details shared by the hero and the call-to-action sections.

// E.164 format, used directly in tel: links (works without JavaScript).
export const PHONE_NUMBER = "+919790924754";

export const PHONE_DISPLAY = "+91 97909 24754";

export const WHATSAPP_HREF = `https://wa.me/${PHONE_NUMBER.replace("+", "")}?text=${encodeURIComponent(
  "Hello Mekark, I would like to discuss a turnkey factory construction project (design, civil, PEB and MEP). Please share the cost range and timeline.",
)}`;
