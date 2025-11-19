// Schema.org / JSON-LD structured data for SEO
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://tampabayconcretecoatings.com',
  name: 'Tampa Bay Concrete Coatings',
  image: 'https://tampabayconcretecoatings.com/og-image.jpg',
  description: 'Professional concrete coatings, epoxy garage floors, and concrete polishing services in Tampa Bay, Florida',
  url: 'https://tampabayconcretecoatings.com',
  telephone: '+1 727-743-7242',
  email: 'info@tampabayconcretecoatings.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '386 Tavernier Cir',
    addressLocality: 'Oldsmar',
    addressRegion: 'FL',
    postalCode: '34677',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '28.0353',
    longitude: '-82.4538',
  },
  areaServed: [
    { '@type': 'City', name: 'Tampa' },
    { '@type': 'City', name: 'St. Petersburg' },
    { '@type': 'City', name: 'Clearwater' },
    { '@type': 'City', name: 'Brandon' },
    { '@type': 'City', name: 'Riverview' },
    { '@type': 'City', name: 'Lutz' },
    { '@type': 'City', name: 'Carrollwood' },
  ],
  sameAs: [
    'https://www.facebook.com',
    'https://www.instagram.com',
    'https://www.google.com/maps',
  ],
  priceRange: '$$$',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '09:00',
      closes: '16:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      closes: '00:00',
      opens: '00:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '28',
    reviewCount: '28',
  },
};

export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Tampa Bay Concrete Coatings',
  hasOfferingDescription: [
    {
      '@type': 'Service',
      name: 'Epoxy Garage Floors',
      description: 'Durable epoxy coating for concrete garage floors. Glossy, seamless finish resists chemicals, oil, and tire marks. Lasts 10-20 years.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Tampa Bay Concrete Coatings',
      },
      areaServed: {
        '@type': 'City',
        name: 'Tampa Bay Area',
      },
    },
    {
      '@type': 'Service',
      name: 'Metallic Resin Floors',
      description: 'Premium epoxy with metallic pigments for 3D marble-like effects. Durable, stain-resistant, luxurious appearance. Lasts 15+ years.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Tampa Bay Concrete Coatings',
      },
      areaServed: {
        '@type': 'City',
        name: 'Tampa Bay Area',
      },
    },
    {
      '@type': 'Service',
      name: 'Concrete Polishing',
      description: 'Diamond abrasive polishing for smooth, glossy concrete. Natural aggregate exposure, densifier hardening, and protective sealant.',
      provider: {
        '@type': 'LocalBusiness',
        name: 'Tampa Bay Concrete Coatings',
      },
      areaServed: {
        '@type': 'City',
        name: 'Tampa Bay Area',
      },
    },
  ],
};

export const breadcrumbSchema = (path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://tampabayconcretecoatings.com',
    },
    ...(path === '/services' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Services',
      item: 'https://tampabayconcretecoatings.com/services',
    }] : []),
    ...(path === '/contact' ? [{
      '@type': 'ListItem',
      position: 2,
      name: 'Contact',
      item: 'https://tampabayconcretecoatings.com/contact',
    }] : []),
  ],
});

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long do epoxy floors last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Epoxy garage floors typically last 10-20 years with proper maintenance.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the durability of metallic resin floors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Metallic resin floors are extremely durable and typically last 15+ years.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long is concrete polishing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Concrete polishing creates a hard, dense surface that is extremely durable and long-lasting.',
      },
    },
  ],
};

export const reviewSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tampa Bay Concrete Coatings',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    ratingCount: '28',
    bestRating: '5',
    worstRating: '1',
  },
};
