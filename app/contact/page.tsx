"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  Clock,
  HeadphonesIcon,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const subjectLines = {
        general: "General Inquiry",
        booking: "Booking Support",
        technical: "Technical Support",
        location: "New Location Request",
        feedback: "Feedback & Suggestions",
      };

      //   await SendEmail({
      //     to: "support@kiddycars.ae",
      //     subject: `${subjectLines[formData.subject]} - ${formData.name}`,
      //     body: `
      //       Name: ${formData.name}
      //       Email: ${formData.email}
      //       Phone: ${formData.phone}
      //       Subject: ${subjectLines[formData.subject]}

      //       Message:
      //       ${formData.message}
      //     `
      //   });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "general",
        message: "",
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: "+971-4-3974487",
      description: "",
      // "Monday to Thursday: 10 AM - 10 PM, Friday to Sunday : 10 AM - 12 AM",
      color: "bg-green-500",
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "Profile@adventurestaruae.com",
      description: "",
      // "Monday to Thursday: 10 AM - 10 PM, Friday to Sunday : 10 AM - 12 AM",
      color: "bg-blue-500",
    },
    {
      icon: MapPin,
      title: "Head Office",
      details: "Al Jaddaf Dry Docks, Unit #35, Dubai, UAE, P.O. Box: 16881",
      description: "",
      // "Monday to Thursday: 10 AM - 10 PM, Friday to Sunday : 10 AM - 12 AM",
      color: "bg-purple-500",
    },
    {
      icon: HeadphonesIcon,
      title: "Emergency Support",
      details: "+971-50-XXX-XXXX",
      description: "24/7 for urgent issues",
      color: "bg-red-500",
    },
  ];

  const faqItems = [
    {
      question: "What ages are the scooters suitable for?",
      answer: "Our scooters are designed for Adults.",
    },
    {
      question: "How much does it cost to rent a scooter?",
      answer:
        "Pricing varies by location and duration. Minimum deposit is 500 AED, with unused balance refunded instantly.",
    },
    {
      question: "Can I book in advance?",
      answer:
        "Yes! You can book scooters up to 3 days in advance through our online platform.",
    },
    {
      question: "Are the scooters safe?",
      answer:
        "Absolutely. All scooter features are safe, and undergo regular maintenance and sanitization.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-700">
      {/* Header */}
      <section className="bg-gradient-to-b to-bgsecondary from-bgtertiary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We're here to help! Whether you have questions, need support, or
            want to share feedback, our team is ready to assist you.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-blue-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              {isSubmitted && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Thank you for contacting us! We'll get back to you within 24
                    hours.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      className="mt-1"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="mt-1"
                      placeholder="+971-XX-XXX-XXXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) =>
                        handleInputChange("subject", value)
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="booking">Booking Support</SelectItem>
                        <SelectItem value="technical">
                          Technical Support
                        </SelectItem>
                        <SelectItem value="location">
                          New Location Request
                        </SelectItem>
                        <SelectItem value="feedback">
                          Feedback & Suggestions
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={8}
                    className="mt-1"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`${info.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-500 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-700 font-medium ">
                        {info.details}
                      </p>
                      <p className="text-sm text-gray-600">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold">Operating Hours</h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Thursday</span>
                  <span className="font-medium">10:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Friday - Sunday</span>
                  <span className="font-medium">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Public Holidays</span>
                  <span className="font-medium">12:00 PM - 10:00 PM</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/20 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> Hours may vary by location. Check
                  specific location pages for exact timings.
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-white max-w-[700px] mx-auto">
              Quick answers to common questions. Can't find what you're looking
              for? Contact us!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-lg">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
