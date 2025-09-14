const fs = require('fs');
const reviews = require('./reviews.json');

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ателието на Ани",
  "image": "https://example.com/images/tailor-shop.jpg",
  "description": "Professional tailor shop offering custom suits, dresses, and alterations.",
  "telephone": "+359-123-456-789",
  "email": "info@eleganttailor.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Your City",
    "postalCode": "12345",
    "addressCountry": "BG"
  },
  "telephone": "+359-123-456-789",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.8356",
    "longitude": "25.9657"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "url": "https://example.com",
  "sameAs": [
    "https://www.facebook.com/yourtailorpage"
  ],
  "review": reviews.map(r => ({
    "@type": "Review",
    "author": { 
        "@type": "Person", 
        "name": r.author 
    },
    "datePublished": r.date,
    "reviewBody": r.text
  }))
};

// Convert to JSON-LD string
const schemaHtml = `<script type="application/ld+json">
  {
    ${JSON.stringify(schema, null, 2)}
  }
</script>`;

// Read your HTML template
let html = fs.readFileSync('./src/index.html', 'utf-8');

// Insert the schema in <head> (or wherever appropriate)
html = html.replace('<!-- REVIEW_SCHEMA_PLACEHOLDER -->', schemaHtml);

// Write final HTML
fs.writeFileSync('./dist/index.html', html);


fs.copyFileSync('./src/script.js', './dist/script.js');
fs.copyFileSync('./src/style.css', './dist/style.css');
console.log('Build complete!');