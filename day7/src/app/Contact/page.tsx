"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // ✅ Basic Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage("All fields are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    // ✅ Simulate successful submission
    setSuccessMessage("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
  };

  return (
    <div className="w-full min-h-screen bg-[#FFFFFF] px-4 md:px-0 flex flex-col items-center">
      {/* ✅ Header Section */}
      <div className="w-full bg-[#FFFFFF] py-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#738b6a]">Contact</h1>
        <div className="text-sm md:text-lg font-medium text-[#738b6a] mt-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span className="font-light">Contact</span>
        </div>
      </div>

      {/* ✅ Main Section */}
      <div className="w-full max-w-4xl bg-[#FFFFFF] px-4 md:px-0">
        <div className="py-6 text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-[#738b6a]">Get In Touch With Us</h2>
          <p className="text-[#738b6a] text-[14px] md:text-[16px] font-normal leading-[24px] mt-3">
            For more information about our products & services, feel free to contact us. We are always here to help you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ✅ Contact Information */}
          <div className="flex flex-col space-y-6">
            <ContactInfo
              icon={<FaMapMarkerAlt className="text-[#738b6a] text-xl" />}
              title="Address"
              details="236 5th SE Avenue, New York NY10000, United States"
            />
            <ContactInfo
              icon={<FaPhoneAlt className="text-[#738b6a] text-xl" />}
              title="Phone"
              details={
                <>
                  Mobile: (+84) 546-6789 <br />
                  Hotline: (+84) 456-7898
                </>
              }
            />
            <ContactInfo
              icon={<FaClock className="text-[#738b6a] text-xl" />}
              title="Working Time"
              details={
                <>
                  Monday-Friday: 9:00 - 22:00 <br />
                  Saturday-Sunday: 9:00 - 21:00
                </>
              }
            />
          </div>

          {/* ✅ Contact Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <InputField type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
            <InputField type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
            <InputField type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
            <TextAreaField name="message" placeholder="Message" value={formData.message} onChange={handleChange} />

            <button type="submit" className="w-full p-2 bg-[#738b6a] hover:bg-opacity-80 text-white font-medium rounded transition">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ✅ Contact Info Component
type ContactInfoProps = {
  icon: React.ReactNode;
  title: string;
  details: React.ReactNode;
};

function ContactInfo({ icon, title, details }: ContactInfoProps) {
  return (
    <div className="flex items-start space-x-4">
      {icon}
      <div>
        <h3 className="text-sm md:text-base font-medium text-[#738b6a]">{title}</h3>
        <p className="text-xs text-gray-600">{details}</p>
      </div>
    </div>
  );
}

// ✅ Input Field Component
type InputFieldProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ type, name, placeholder, value, onChange }: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-[#738b6a] rounded focus:outline-none focus:ring-2 focus:ring-[#738b6a]"
    />
  );
}

// ✅ Text Area Component
type TextAreaFieldProps = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextAreaField({ name, placeholder, value, onChange }: TextAreaFieldProps) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full p-2 border border-[#738b6a] rounded focus:outline-none focus:ring-2 focus:ring-[#738b6a]"
    ></textarea>
  );
}