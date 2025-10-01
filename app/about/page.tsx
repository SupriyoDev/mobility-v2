import { Badge } from "@/components/ui/badge";
import {
  Award,
  CheckCircle,
  Clock,
  Heart,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description:
        "Every scooter is designed with adult safety as our top priority, featuring speed controls, stable designs, and regular maintenance checks.",
    },
    {
      icon: Heart,
      title: "Family-Focused",
      description:
        "We understand the challenges of shopping with children and strive to make every family outing more enjoyable and stress-free.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Building stronger communities by bringing families together and creating positive shared experiences in shopping centers.",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in equipment quality, customer service, and overall experience for every family we serve.",
    },
  ];

  const features = [
    "Perfect designs",
    // "Speed-controlled motors for maximum safety",
    "Regular sanitization and maintenance",
    "Trained staff at every location",
    // "24/7 customer support",
  ];

  const stats = [
    { number: "2019", label: "Founded" },
    { number: "15+", label: "Locations" },
    { number: "500+", label: "Happy Families" },
    { number: "10,000+", label: "Rides Completed" },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-bgtertiary via-bgsecondary to-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-24 h-24 bg-white/35 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-white/35 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/35 rounded-full animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white/20 text-white border-white/30 mb-6">
            About Mobility UAE Scooters
          </Badge>

          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            Introducing Mobility
            <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              UAE Scooters
            </span>
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            As one of the newest services in the UAE, we are proud to bring
            advanced mobility scooters that enhance shopping and event
            experiences. Our mission is to deliver safety, comfort, and
            convenience to adults of all ages.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-white mb-6 leading-relaxed">
                We are committed to empowering adults, elderly visitors, and
                people with limited mobility by offering comfortable and
                accessible scooter services.
              </p>
              <p className="text-lg text-white mb-8 leading-relaxed">
                Our mission is to deliver convenience, safety, and confidence,
                making every visit to malls and public venues a more enjoyable
                and stress-free experience.
              </p>

              {/* <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-6 bg-bgtertiary rounded-xl"
                  >
                    <div className="text-3xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-white font-medium">{stat.label}</div>
                  </div>
                ))}
              </div> */}
            </div>

            <div className="relative">
              <div className="relative group">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <Image
                    src="/scooter.jpeg"
                    width={400}
                    height={400}
                    alt="Premium Kiddy Cars Scooter"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Modern Floating Element */}
                {/* <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-bgsecondary to-bgtertiary p-6 rounded-2xl text-white shadow-xl">
                  <Car className="w-8 h-8 mb-2" />
                  <div className="font-bold">Safe & Fun</div>
                  <div className="text-sm opacity-90">For Adults</div>
                </div> */}

                {/* Quality Badge */}
                <div className="absolute -top-4 -right-4 bg-bgsecondary backdrop-blur-sm rounded-2xl p-3 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-white" />
                    <span className="text-sm font-bold text-white">
                      Premium Quality
                    </span>
                  </div>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl opacity-50 -z-10 scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              These principles guide everything we do and shape every decision
              we make as we serve adults and families across the UAE.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-bgsecondary to-bgtertiary w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-[100%] lg:w-[500px] lg:h-[420px]  h-[350px] overflow-hidden bg-white rounded-2xl">
                <Image
                  src={"/scooter.jpeg"}
                  alt="Children playing safely"
                  width={400}
                  height={400}
                  className="w-full h-full rounded-2xl shadow-2xl object-contain   "
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-white mb-6">
                Safety & Quality Standards
              </h2>
              <p className="text-lg text-white mb-8 leading-relaxed">
                We go above and beyond industry standards to ensure every
                adult&apos;s safety and every parent&apos;s peace of mind.
                Here&apos;s what sets us apart:
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="font-bold text-gray-900">
                    4.9/5 Average Rating
                  </span>
                </div>
                <p className="text-gray-600 text-sm">
                  Based on over 1,000 family reviews across all our locations
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-bgtertiary to-bgsecondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Our Commitment to You
          </h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            We are dedicated to providing every customer with a safe,
            comfortable, and reliable mobility experience. From our customer
            service team to our on-site staff, we work together to ensure that
            your journey with Mobility UAE Scooters is smooth, convenient, and
            stress-free.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
              <Clock className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Always Available
              </h3>
              <p className="text-white/80">
                24/7 customer support and extended operating hours to fit your
                schedule
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
              <Shield className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Safety Certified
              </h3>
              <p className="text-white/80">
                All equipment meets international safety standards and undergoes
                regular inspections
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
              <Heart className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">
                Family First
              </h3>
              <p className="text-white/80">
                Every decision we make is guided by what&apos;s best for Adults
                and families
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
