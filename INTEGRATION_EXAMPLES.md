// EXAMPLE: How to add Contact Company button to your service cards

// ========================================
// In Marketplace or Service Listing Page
// ========================================

import ContactCompanyForm from '@/app/components/ContactCompanyForm';

// Type Definition (add this to your actual types file)
interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  company_id: string;
  company_name: string;
}

// Example Service Card Component
function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-2xl font-bold text-blue-600 mb-4">${service.price}</p>
      
      {/* Contact Company Button */}
      <ContactCompanyForm
        companyId={service.company_id}
        companyName={service.company_name}
        contextType="service"
        contextId={service.id}
        buttonText="Request Quote"
        triggerClassName="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      />
    </div>
  );
}

// ========================================
// In Service Detail Page
// ========================================

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  // ... load service data
  
  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="px-6 py-3 bg-green-600 text-white rounded-lg">
          Book Now
        </button>
        
        <ContactCompanyForm
          companyId={service.company_id}
          companyName={service.company_name}
          contextType="service"
          contextId={service.id}
          buttonText="Ask a Question"
          triggerClassName="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        />
      </div>
    </div>
  );
}

// ========================================
// In Company Profile Page
// ========================================

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  // ... load company data
  
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1>{company.name}</h1>
        
        <ContactCompanyForm
          companyId={company.id}
          companyName={company.name}
          contextType="profile"
          buttonText="Contact Company"
        />
      </div>
      
      <p>{company.description}</p>
      {/* ... rest of profile */}
    </div>
  );
}

// ========================================
// In Project Detail Page (Browse Projects)
// ========================================

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  // ... load project data
  
  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      
      {/* If project is posted by a company, allow contact */}
      {project.company_id && (
        <ContactCompanyForm
          companyId={project.company_id}
          companyName={project.company_name}
          contextType="project"
          contextId={project.id}
          buttonText="Discuss Project"
          triggerClassName="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg"
        />
      )}
    </div>
  );
}

// ========================================
// Customization Options
// ========================================

// Option 1: Icon-only button
<ContactCompanyForm
  companyId={companyId}
  companyName={companyName}
  buttonText=""
  triggerClassName="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
/>

// Option 2: Small button
<ContactCompanyForm
  companyId={companyId}
  companyName={companyName}
  buttonText="Message"
  triggerClassName="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
/>

// Option 3: Full-width CTA
<ContactCompanyForm
  companyId={companyId}
  companyName={companyName}
  buttonText="Get Started - Contact Us Today"
  triggerClassName="w-full py-4 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 shadow-lg"
/>

// Option 4: With callback
<ContactCompanyForm
  companyId={companyId}
  companyName={companyName}
  onSuccess={() => {
    // Custom action after message sent
    console.log('Message sent!');
    // Could track analytics, show additional info, etc.
  }}
/>
