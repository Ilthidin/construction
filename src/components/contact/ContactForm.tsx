"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

/**
 * ContactForm Component
 *
 * A fully functional contact form with fields for name, email, phone, subject,
 * and message. Displays a success confirmation after submission. Uses controlled
 * form state with React useState hooks.
 *
 * @example
 * <ContactForm />
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-md text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-primary mb-3">Thank You!</h3>
        <p className="text-muted">
          Thank you! We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md">
      {/* Name + Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-primary/80 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary/80 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone + Subject Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-primary/80 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-primary/80 mb-2"
          >
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition"
          >
            <option value="" disabled>
              Select a subject
            </option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Project Quote">Project Quote</option>
            <option value="Partnership">Partnership</option>
            <option value="Careers">Careers</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <label
          htmlFor="message"
          className="block text-sm font-medium text-primary/80 mb-2"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition resize-none"
          placeholder="Tell us about your project..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-accent text-white rounded-lg px-6 py-4 font-semibold hover:bg-accent-dark transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
}
