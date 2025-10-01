"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowRight,
  Car,
  Clock,
  Divide,
  Filter,
  MapPin,
  Navigation,
  Phone,
  Search,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface MallLocation {
  id: string;
  name: string;
  image: string;
  full_address: string;
  city: string;
  working_hours: string;
  phone: string;
  rating: string;
  is_active: string;
}

const filteredLocations: MallLocation[] = [
  {
    id: "1",
    name: "Dubai Festival City Mall",
    image: "/city-mall.jpeg",
    full_address: "Crescent Rd, Dubai Festival City, Dubai",
    city: "Dubai",
    working_hours: `Monday to Thursday: 10 AM - 10 PM, 
      Friday to Sunday : 10 AM - 12 AM`,
    phone: "+971-4-3974487",
    rating: "5",
    is_active: "true",
  },
];

const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCity, setFilterCity] = useState("all");

  // const filterLocations = useCallback(() => {
  //   let filtered = locations.filter(location => location.is_active);

  //   if (searchTerm) {
  //     filtered = filtered.filter(location =>
  //       location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //       location.full_address.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   if (filterCity !== "all") {
  //     filtered = filtered.filter(location => location.city === filterCity);
  //   }

  //   setFilteredLocations(filtered);
  // }, [locations, searchTerm, filterCity]);

  // useEffect(() => {
  //   // loadData();
  // }, []);

  // useEffect(() => {
  //   filterLocations();
  // }, [filterLocations]);

  // const cities = [
  //   ...new Set(filteredLocations.map((location) => location.city)),
  // ];

  const cities = filteredLocations.map((location) => location.city);

  const handleBooking = () => {};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading locations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-gray-700">
      {/* Header */}
      <section className="bg-gradient-to-r from-bgsecondary to-bgtertiary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Where to Find Us
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Mobility UAE Scooters are currently available at selected malls and
            venues. Stay tuned as we expand to more destinations across the UAE!
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-700 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64 bg-white/90"
                />
              </div>

              <Select value={filterCity} onValueChange={setFilterCity}>
                <SelectTrigger className="w-full sm:w-48 bg-white/90">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <MapPin className="w-4 h-4 mr-1" />
              {filteredLocations.length} Locations Available
            </Badge>
          </div>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-16">
              <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No locations found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setFilterCity("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLocations.map((location) => (
                <div
                  key={location.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-blue-100"
                >
                  {/* Location Image */}
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={
                        location.image ||
                        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop"
                      }
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                    {/* <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500/90 text-white">
                        <Car className="w-3 h-3 mr-1" />
                        {location.available} Available
                      </Badge>
                    </div> */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-xs font-medium">
                          {location.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 flex-1">
                        {location.name}
                      </h3>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {location.city}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 leading-relaxed">
                          {location.full_address}
                        </span>
                      </div>

                      {location.working_hours && (
                        <div className="flex items-start">
                          <Clock className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                          <ul>
                            {location.working_hours
                              .split(",")
                              .map((item, i) => (
                                <li className="text-sm text-gray-600" key={i}>
                                  {item}
                                </li>
                              ))}
                          </ul>
                          {/* <span className="text-sm text-gray-600"></span> */}
                        </div>
                      )}

                      {location.phone && (
                        <div className="flex items-center">
                          {/* <Phone className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" /> */}
                          <span className="text-sm text-gray-600">
                            {/* {location.phone} */}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 items-center justify-between ">
                      <Link
                        href={`/bookingflow/${location.name
                          .split(" ")
                          .join("-")}`}
                      >
                        <Button className="flex-1  bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all">
                          <Car className="w-4 h-4 mr-2" />
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(
                              location.name
                            )}`,
                            "_blank"
                          )
                        }
                        className="border-blue-200 hover:border-blue-300"
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-bgtertiary to-bgsecondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            We’re expanding!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Stay tuned for upcoming locations near you.
          </p>
          <Link href={"/contact"}>
            <Button
              size="lg"
              className="bg-gray-900 text-white hover:bg-transparent border-2 hover:text-gray-900 border-gray-900 shadow-xl"
            >
              Request New Location
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Locations;
