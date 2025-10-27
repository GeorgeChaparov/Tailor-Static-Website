const fs = require('fs');
const reviews = require('./reviews.json');
const QnA = require("./QnA.json");

const reviewSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ателието на Ани",
  "image": "https://example.com/images/tailor-shop.jpg",
  "description": "Professional tailor shop offering custom suits, dresses, and alterations.",
  "telephone": "+359-123-456-789",
  "email": "info@eleganttailor.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ж.к. Възраждане, ул. „Доростол“ 73",
    "addressLocality": "Ruse",
    "postalCode": "7002",
    "addressCountry": "BG"
  },
  "telephone": "+359-123-456-789",
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.8601081",
    "longitude": "25.9738515"
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "url": "https://example.com",
  "sameAs": [
    "https://www.facebook.com/yourtailorpage"
  ],
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": { 
        "@type": "Person", 
        "name": review.author 
    },
    "datePublished": review.date,
    "reviewBody": review.text
  }))
};

const QnASchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": QnA.map((qna) => ({
    "@type": "Question",
    "name": qna.Question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": qna.Answer
    }
  }))
};

// Convert to JSON-LD string
const reviewSchemaHtml = `
<script type="application/ld+json">
  ${JSON.stringify(reviewSchema, null, 2)}
</script>`;

const qnaSchemaHtml = `
<script type="application/ld+json">
  ${JSON.stringify(QnASchema, null, 2)}
</script>`;

const reviewsHtml = `${reviews.map((review, index)=>{
return  `
<article class="review">
  <footer>
    <address><a href='${review.link}'>Link to the review source</a></address>
    <img class="userImage" src='./images/${index}' alt="Профилната снимка, в facebook, на потребителя, който е публикувал този коментар.">
    <h3 class="userName">${review.author}</h3>
    <time class="reviewPublicationDate" datetime=${review.date}>${review.date}</time>
  </footer>
    <div>
        <p class="reviewText">${review.text}</p>
    </div>
</article>`
})}`;

// Read your HTML template
let html = fs.readFileSync('./src/index.html', 'utf-8');

// Insert the schema in <head> (or wherever appropriate)
html = html.replace('<!-- REVIEW_SCHEMA_PLACEHOLDER -->', reviewSchemaHtml);
html = html.replace('<!-- QnA_SCHEMA_PLACEHOLDER -->', qnaSchemaHtml);
html = html.replace('<!-- REVIEWS_PLACEHOLDER -->', reviewsHtml);

// Write final HTML
fs.writeFileSync('./dist/index.html', html);


fs.copyFileSync('./src/script.js', './dist/script.js');
fs.copyFileSync('./src/style.css', './dist/style.css');
console.log('Build complete!');