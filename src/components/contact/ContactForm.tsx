import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { useState } from 'react';
import { toast } from 'react-toastify';

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export const ContactForm = () => {
  const [formState, setFormState] = useState<ContactFormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    toast.success('Message sent!');
  };

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 shadow-xl shadow-ink/10">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-2">
        We'd love to hear from you
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-8">
        Have questions? We're here to help.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            className="w-full"
            name="name"
            type="text"
            required
            value={formState.name}
            onChange={handleChange}
            placeHolder="Full Name"
          />
          <Input
            className="w-full"
            name="email"
            type="email"
            required
            value={formState.email}
            onChange={handleChange}
            placeHolder="Email"
          />
        </div>

        <Input
          className="w-full"
          name="subject"
          type="text"
          required
          value={formState.subject}
          onChange={handleChange}
          placeHolder="Subject"
        />

        <TextArea
          className="w-full h-40"
          name="message"
          required
          value={formState.message}
          onChange={handleChange}
          placeHolder="Enter your message"
        />

        <Button
          type="submit"
          className="bg-gradient-purple hover:opacity-90 shadow-lg shadow-ink/30"
          text="Send Message"
        />
      </form>
    </div>
  );
};
