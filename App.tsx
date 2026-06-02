@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --color-gold-light: #D4B57A;
  --color-gold-dark: #C5A059;
  --color-gold-hover: #A37B3F;
  --color-legal-dark: #0F0F0F;
  --color-legal-gray: #151515;
}

/* Custom fade effects */
.overlay-gradient {
  background: linear-gradient(to right, rgba(15, 15, 15, 1) 35%, rgba(15, 15, 15, 0.7) 65%, rgba(15, 15, 15, 0.2) 100%);
}

