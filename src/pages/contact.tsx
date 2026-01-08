import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { Metadata } from '@/components/Metadata';

export default function ContactUs() {
  return (
    <>
      <Metadata title="Contact Us | Nexus Market" />

      <Breadcrumbs
        title="Contact Us"
        section1="Home"
        path1="/"
        page="Contact Us"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div>
            <ContactInfo />
          </div>
        </div>
      </div>
    </>
  );
}
