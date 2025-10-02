import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sections, waiverterms } from "@/app/terms/page";
import { useOnsiteBookStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function TermsAndConditions({
  onAccept,
  termsAccepted,
  setTermsAccepted,
  isSubmitting,
}: {
  onAccept: any;
  termsAccepted: any;
  setTermsAccepted: any;
  isSubmitting: any;
}) {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  const { setEmail, setName, setPhone, name, email, phone } =
    useOnsiteBookStore(
      useShallow((state) => ({
        setName: state.setName,
        setEmail: state.setEmail,
        setPhone: state.setPhone,
        name: state.name,
        email: state.email,
        phone: state.phone,
      }))
    );

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop <=
      e.currentTarget.clientHeight + 50;
    if (bottom && !hasScrolled) {
      setHasScrolled(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="border-b border-gray-100 pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-bgtertiary to-bgsecondary bg-clip-text text-transparent">
            Terms & Conditions
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Please read and accept our terms before proceeding
          </p>
        </CardHeader>
        <CardContent className="p-2">
          <div className="mb-6 relative">
            <ScrollArea
              className="h-96 rounded-xl border-2 border-gray-200 p-2 bg-gray-50/50"
              onScrollCapture={handleScroll}
            >
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {/* Terms Sections */}
                <div className="space-y-6" id="terms">
                  {sections.map((section, index) => (
                    <div key={index} className="bg-white rounded-xl p-2">
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
                            <p className="text-gray-700 leading-relaxed">
                              {item}
                            </p>
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
                      By using Mobility UAE Scooters services, you acknowledge
                      and agree that:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      {waiverterms.map((term, i) => (
                        <li key={i}>{term}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <AnimatePresence>
              {!hasScrolled && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none rounded-b-xl flex items-end justify-center pb-3"
                >
                  <div className="flex items-center gap-2 text-sm text-gray-500 animate-bounce">
                    <AlertCircle className="w-4 h-4" />
                    Scroll to read all terms
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex items-center space-x-3 p-5 rounded-xl bg-blue-50/50 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 cursor-pointer"
            onClick={() => setTermsAccepted(!termsAccepted)}
            whileTap={{ scale: 0.98 }}
          >
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
              className="w-6 h-6 border-2 border-blue-600 data-[state=checked]:bg-blue-600"
            />
            <label
              htmlFor="terms"
              className="text-base font-medium leading-none cursor-pointer select-none text-gray-900"
            >
              I have read and agree to the terms and conditions
            </label>
          </motion.div>
          <form action="">
            <div className=" w-full px-4 py-6">
              <div className="grid w-full  items-center gap-3">
                <div>
                  <Label htmlFor="name" className="text-base text-gray-600 ">
                    Fullname
                  </Label>
                  <Input
                    required
                    type="text"
                    id="name"
                    placeholder="Enter your fullname"
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base text-gray-600 ">
                    Email
                  </Label>
                  <Input
                    required
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-base text-gray-600 ">
                    Phone Number
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter your phone"
                    onChange={(e) => setPhone(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: termsAccepted && name && email && phone ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
          >
            <Button
              onClick={onAccept}
              disabled={
                !termsAccepted || !name || !email || !phone || isSubmitting
              }
              className="w-full mt-6 h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Accept & Complete Booking
                </>
              )}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
