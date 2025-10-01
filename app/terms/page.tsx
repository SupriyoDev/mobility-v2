"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AlertTriangle,
  CandlestickChart,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Phone,
  Shield,
  ShieldCheck,
  TicketX,
  Users,
} from "lucide-react";
import React, { useState } from "react";

const sections = [
  {
    icon: Users,
    title: "Eligibility Criteria",
    content: [
      "Customer must be atleast 20 years old.",
      "Suitable for adults up to 180kg, with the capacity to carry a child safely and comfortably",
      // "All rentals require adult supervision at all times during use.",
    ],
  },
  {
    icon: CreditCard,
    title: "Payment Terms",
    content: [
      "Minimum deposit of 500 AED is required to activate your digital wallet.",
      "Rental fees are deducted from your wallet balance at the time of booking.",
      "Unused balance is refunded instantly to your wallet upon scooter return.",
      "All payments are processed securely through our payment partners (App & Websites).",
    ],
  },
  {
    icon: Shield,
    title: "Usage Restrictions",
    content: [
      "Scooters can only be used inside the mall premises",
      "Crossing outside mall areas is strictly prohibited",
      "Reckless or unsafe riding is not allowed",
      "No stunts, racing, or off-path usage",
      `Scooters must be returned directly to the booth at the end of the use. If a scooter is left
unattended or not returned properly, the full deposit amount of AED 500 will be forfeited,
unless there is a valid technical issue with the scooter.`,
    ],
  },
  {
    icon: AlertTriangle,
    title: "Damage Responsibility",
    content: [
      "Customers are responsible for any damage caused by misuse",
      "Any damage costs will be deducted from the deposit",
    ],
  },
  {
    icon: Clock,
    title: "Booking Policy",
    content: [
      "You can book your scooters 24 hours before arrival through our website and app. ",
      "Simply sign up on our website and book your preferred mall location where we are available.",

      `A minimum of AED 500 will be kept as a deposit. The usage charges will be deducted from
the deposit, and the balance will be refunded or credited to your account instantly upon the
return of the scooter`,
      // "No-shows will result in full charge for the booking period.",
    ],
  },
  {
    icon: TicketX,
    title: "Cancellation & Refund Policy",
    content: [
      "You must cancel your booking at least 12 hours before the scheduled time.",
      "Late cancellations may result in partial charges to your wallet.",
      "No-shows will result in full charge for the booking period",
      "Refunds for eligible cancellations will be processed instantly and credited back to the customer’s account or wallet.",
    ],
  },
  {
    icon: Phone,
    title: "Helpline & Assistance",
    content: [
      "Each scooter will have a barcode that links directly to whatsapp or phone call for immediate assistance",
      "Customers can call for assistance in case of emergency",
      "Staff and service attendants are available at all times to support riders",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Additional Safety Rules",
    content: [
      "Riders must follow staff instructions at all times",
      "Report any breakdowns or incidents immediately",
    ],
  },
];

const waiverterms = [
  "You are at least  20 years old and eligible to operate a mobility scooter",
  "You have been briefed by Adventure Star staff on the correct and safe usage of the scooter",
  "You understood that the scooter is to be used inside mall premises only",
  "You will not operate the scooter recklessly, perform stunts, or use it outside designated areas",
  "You are financially responsible for any damage to the scooter caused during your rental",
  "you understood that AED 500 deposit is required, from which rental charges will be deducted, and the balance refunded after inspection",
  "you release Adventure Star from any liability for injuries, accidents, or damages arising from your use of the scooter",
  " you will immediately report any malfunction, incident, or emergency to the staff or via the scooter's helpline number",
];

const TermsConditions = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAcceptTerms = async () => {
    setIsUpdating(true);
    try {
      //   const user = await User.me();
      //   await User.updateMyUserData({
      //     terms_accepted: true,
      //     terms_accepted_date: new Date().toISOString(),
      //   });
      setHasAccepted(true);
    } catch (error) {
      console.error("Error accepting terms:", error);
    }
    setIsUpdating(false);
  };
  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <section className="bg-gradient-to-r from-bgsecondary to-bgtertiary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 text-white mr-4 hidden md:block " />
            <h1 className="text-4xl lg:text-5xl font-bold text-white">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Please read these terms carefully before using our services. Your
            safety and satisfaction are our top priorities.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Important Notice */}
        <Alert className="mb-8 bg-red-50 border-red-200">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Important:</strong> By using Mobility UAE Scooters services,
            you acknowledge that you have read, understood, and agree to be
            bound by these terms and conditions. These terms constitute a
            legally binding agreement between you and Mobility UAE Scooters
            Services.
          </AlertDescription>
        </Alert>

        {/* Last Updated */}
        <div className="text-center mb-12 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> January 1, 2025 |{" "}
            <strong>Effective Date:</strong> January 1, 2025
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8" id="terms">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {section.title}
                </h2>
              </div>

              <div className="space-y-4">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Waiver Section */}
        <div
          id="waiver"
          className="mt-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-3" />
            Liability Waiver
          </h2>

          <div className="space-y-4 text-blue-100 mb-6">
            <p>
              By using Mobility UAE Scooters services, you acknowledge and agree
              that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              {waiverterms.map((term, i) => (
                <li key={i}>{term}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Age Restrictions */}
        {/* <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-4">
            Age & Weight Restrictions
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="font-bold text-lg text-blue-700 mb-2">
                12-24 months
              </div>
              <div className="text-gray-600">Max weight: 15kg</div>
              <div className="text-gray-600">Push-along models</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="font-bold text-lg text-blue-700 mb-2">
                2-4 years
              </div>
              <div className="text-gray-600">Max weight: 25kg</div>
              <div className="text-gray-600">Electric models</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="font-bold text-lg text-blue-700 mb-2">
                4-6 years
              </div>
              <div className="text-gray-600">Max weight: 35kg</div>
              <div className="text-gray-600">Premium models</div>
            </div>
          </div>
        </div> */}

        {/* Agreement Checkbox */}
        {/* <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Agreement Confirmation
            </h3>

            <div className="flex items-start space-x-3 mb-6 text-left max-w-2xl mx-auto">
              <Checkbox
                id="terms-agreement"
                checked={hasAccepted}
                // onCheckedChange={setHasAccepted}
                className="mt-1"
              />
              <label
                htmlFor="terms-agreement"
                className="text-gray-700 leading-relaxed cursor-pointer"
              >
                I have read, understood, and agree to be bound by these Terms
                and Conditions. I acknowledge that I am accepting these terms on
                behalf of myself and any minors under my supervision. I
                understand that this agreement is legally binding and governs my
                use of Kiddy Cars services.
              </label>
            </div>

            <Button
              onClick={handleAcceptTerms}
              disabled={!hasAccepted || isUpdating}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 text-lg"
            >
              {isUpdating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Accept Terms & Continue
                </>
              )}
            </Button>

            <p className="text-sm text-gray-500 mt-4">
              By clicking "Accept Terms & Continue", you confirm your agreement
              to these terms.
            </p>
          </div>
        </div> */}

        {/* Contact for Questions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Questions about these terms? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              +971-4-3974487
            </Button>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Profile@adventurestaruae.com
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
