import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactInfo = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">
          Get in Touch
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          We're here to answer any questions you may have.
        </p>
      </div>

      {/* Phone */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-ink/30">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
              Contact Phone Number
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-1">
              +1-777-333-4255
            </p>
            <p className="text-[var(--color-text-secondary)]">
              +1-245-555-2268
            </p>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-ink/30">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
              Our Email Address
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-1">
              example@admin.com
            </p>
            <p className="text-[var(--color-text-secondary)]">
              nftland@info.com
            </p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 hover:border-ink hover:shadow-lg hover:shadow-ink/20 transition-all duration-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-purple rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-ink/30">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2">
              Our Location
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-1">
              2464 Royal Ln. Mesa, New Jersey 45463
            </p>
            <p className="text-[var(--color-text-secondary)]">
              6391 Elgin St. Celina, Delaware 10299
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
