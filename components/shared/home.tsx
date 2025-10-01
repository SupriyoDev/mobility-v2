"use client";

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryPlus,
  Calendar,
  Car,
  CarIcon,
  Clock,
  Download,
  MapPin,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Wallet,
  Weight,
} from "lucide-react";
import Link from "next/link";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";

export default function HomePage() {
  const [user, setUser] = useState(null);

  //   useEffect(() => {
  //     loadUser();
  //   }, []);

  //   const loadUser = async () => {
  //     try {
  //       const currentUser = await User.me();
  //       setUser(currentUser);
  //     } catch (error) {
  //       setUser(null);
  //     }
  //   };

  const features = [
    {
      icon: Wallet,
      title: "Digital Wallet",
      description: "Load credit in advance and track your balance in real-time",
      color: "bg-blue-500",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Book scooters in advance for your preferred date and time",
      color: "bg-green-500",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Great designs with safety features",
      color: "bg-purple-500",
    },
    // {
    //   icon: MapPin,
    //   title: "Multiple Locations",
    //   description: "Available at shopping centers across the UAE",
    //   color: "bg-red-500",
    // },
  ];

  const howItWorksSteps = [
    {
      step: 1,
      icon: Smartphone,
      title: "Create Account & Load Wallet",
      description: "Sign up and add credit to your digital wallet",
    },
    {
      step: 2,
      icon: MapPin,
      title: "Choose Location & Time",
      description: "Select your preferred shopping center and booking slot",
    },
    {
      step: 3,
      icon: Car,
      title: "Enjoy the Ride",
      description:
        "Let yourself enjoy the ride with our safe and convenient scooters, designed exclusively for adults",
    },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-bgtertiary via-bgsecondary to-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/35 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/30 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-white/35 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <div className="text-center lg:text-left">
              <Badge className="bg-white/20 text-white border-white/30 mb-6">
                🎉 Now Available in UAE Shopping Centers
              </Badge>

              <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Mobility UAE Scooters!
                <span className="block bg-gradient-to-r from-white text-2xl to-blue-100 bg-clip-text text-transparent">
                  Bringing comfort to every step!
                </span>
              </h1>

              <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto lg:mx-0">
                Provides safe, reliable, and comfortable rides for adults,
                seniors, and people with limited mobility — offering
                independence and convenience in malls, events, and large venues
                across the UAE.
              </p>

              <div className="flex flex-col max-md:items-center sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={"/locations"}>
                  <button className=" max-md:w-[300px] flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-gray-900/90 px-8 py-2 bg-gray-900 rounded-md text-white text-base transition duration-200 ease-linear font-medium">
                    Book Now <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </Link>

                <Link href={"#footer"}>
                  <button className=" max-md:w-[300px] justify-center flex items-center gap-2 shadow-[0_4px_14px_0_rgb(0,0,0,10%)] hover:shadow-[0_6px_20px_rgba(93,93,93,23%)] px-8 py-2 bg-[#fff] text-[#696969] rounded-md  transition duration-200 ease-linear font-medium">
                    Get Apps
                    <Download className="w-5 h-5 mr-2" />
                  </button>
                </Link>
              </div>

              {/* <div className="flex items-center justify-center lg:justify-start mt-8 space-x-6 text-white/80">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-300 mr-1" />
                  <span className="font-medium">4.9/5 Rating</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-5 h-5 mr-1" />
                  <span className="font-medium">100% Safe</span>
                </div>
              </div> */}
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="relative group">
                  <HeroVideoDialog
                    className="block dark:hidden "
                    animationStyle="from-bottom"
                    videoSrc="https://res.cloudinary.com/dgfqenqkj/video/upload/v1758821156/jkskfrhaqg2setbrjjxl.mp4"
                    thumbnailSrc="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1bd998b33c70dc0ed3c4f/1d066705f_WhatsAppImage2025-09-09at71751PM.jpg"
                    thumbnailAlt="Hero Video"
                  />
                  {/* <img
                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1bd998b33c70dc0ed3c4f/1d066705f_WhatsAppImage2025-09-09at71751PM.jpg"
                    alt="Kiddy Cars - Safe Electric Scooters for Kids"
                    className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500 bg-white p-8"
                  /> */}
                  {/* Modern Glass Overlay Effect */}
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}

                  {/* Floating Badge */}
                  {/* <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-bounce">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-bold text-gray-900">
                        Safe and Fun
                      </span>
                    </div>
                  </div> */}

                  {/* Speed Badge */}
                  {/* <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-xl animate-bounce delay-1000">
                    <div className="flex items-center space-x-2">
                      <Car className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-bold text-gray-900">
                        Comfortable
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>

              {/* Background Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-white/20 rounded-3xl blur-3xl -z-10 scale-110"></div>
            </div>
          </div>
        </div>

        {/* Wave SVG
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-24"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M1200 120L0 16.48V0h1200v120z"
              className="fill-white"
            ></path>
          </svg>
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Mobility UAE Scooters?
            </h2>
            <p className="text-xl  max-w-3xl text-white/70 mx-auto">
              We've designed every aspect of our service to ensure safety,
              convenience, and comfort for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our premium safety features
            </h2>
            <p className="text-xl text-white">
              Our scooters are designed with advanced safety and stability in
              mind, ensuring a smooth, reliable, and worry-free ride for all
              users.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="bg-white rounded-3xl p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c1bd998b33c70dc0ed3c4f/1d066705f_WhatsAppImage2025-09-09at71751PM.jpg"
                  alt="Premium Electric Scooter for Kids"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Feature Highlights */}
                {/* <div className="absolute top-8 right-8 space-y-2">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✓ For Adults (18+)
                  </div>
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Speed Control
                  </div>
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ✓ Safety Belt
                  </div>
                </div> */}
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
            </div>

            <div className="space-y-8">
              {/* <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Our premium safety features
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our scooters are designed with advanced safety and stability
                  in mind, ensuring a smooth, reliable, and worry-free ride for
                  all users.
                </p>
              </div> */}

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-green-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    Triple Brake System
                  </h4>
                  <p className="text-sm text-gray-600">
                    Equipped with front, rear, and automatic braking for maximum
                    control and safety.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Star className="w-8 h-8 text-yellow-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    Family-Friendly Design
                  </h4>
                  <p className="text-sm text-gray-600">
                    Includes a secure baby cushion, allowing parents to
                    comfortably carry a child.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <Weight className="w-8 h-8 text-blue-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    High Weight Capacity
                  </h4>
                  <p className="text-sm text-gray-600">
                    Built to support up to 180 kg, suitable for adults and
                    additional load.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <BatteryCharging className="w-8 h-8 text-purple-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">
                    Long-Lasting Battery
                  </h4>
                  <p className="text-sm text-gray-600">
                    Extended range to enjoy worry-free rides throughout the day.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <CarIcon className="w-8 h-8 text-blue-500 mb-3" />
                  <h4 className="font-bold text-gray-900 mb-2">Easy Control</h4>
                  <p className="text-sm text-gray-600">
                    Smooth handling with simple controls for all riders.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-white">
              Get started in just three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                {index < howItWorksSteps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-blue-100 transform -translate-y-1/2 z-0"></div>
                )}

                <div className="relative z-10">
                  <div className="bg-bgtertiary w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <step.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 bg-white text-blue-500 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                      {step.step}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="footer"
        className="py-20 bg-gradient-to-br from-bgsecondary to-bgtertiary relative overflow-hidden"
      >
        <div className="absolute inset-0 "></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Redefining your shopping experience
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience effortless shopping with Mobility UAE scooters — your
            comfort is our priority.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link href={"/locations"}>
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Locations
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href={"#"}>
                <img
                  src={"/abtn.png"}
                  alt=""
                  className="w-[200px] h-auto mr-5"
                />
              </Link>
            )}

            <Link href={"#"}>
              <img src={"/gbtn.png"} alt="" className="w-[200px] h-auto" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-white/80">
            <div>
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="text-base">Happy Families</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">15+</div>
              <div className="text-base">Locations</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">4.9</div>
              <div className="text-base">Star Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white">100%</div>
              <div className="text-base">Safe & Secure</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
