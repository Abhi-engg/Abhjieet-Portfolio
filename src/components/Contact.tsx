import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  Clock,
  Instagram,
  AlertCircle,
  Star,
} from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please fill in all required fields");
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Try Firebase first (if available)
      let docId = null;
      try {
        // Check if Firebase is available
        if (typeof window !== 'undefined' && window.firebase) {
          const { db } = await import('@/lib/firebase');
          const { collection, addDoc } = await import('firebase/firestore');
          
          const messageData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            createdAt: new Date().toISOString(),
            status: "unread",
            timestamp: Date.now()
          };

          const docRef = await addDoc(collection(db, "contacts"), messageData);
          docId = docRef.id;
          console.log("Message saved to Firebase with ID: ", docRef.id);
        }
      } catch (firebaseError) {
        console.warn("Firebase not available or failed:", firebaseError);
      }

      // Web3Forms submission
      try {
        const web3formsData = {
          access_key: "8fe967e3-03ee-40c0-81ff-d6760e0b9378", // Replace with your actual key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "Portfolio Contact Form",
          subject: "New Contact Form Submission from Portfolio",
          ...(docId && { reference: docId })
        };

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(web3formsData),
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Web3Forms submission failed");
        }

        console.log("Web3Forms submission successful:", result);
      } catch (web3Error) {
        console.warn("Web3Forms submission failed:", web3Error);
        // If both Firebase and Web3Forms fail, throw error
        if (!docId) {
          throw new Error("Failed to submit message. Please try again or contact directly via email.");
        }
      }

      // Success
      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }, 3000);

    } catch (err) {
      console.error("Form submission error:", err);
      setError(
        err.message || "Failed to submit the form. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 ">
      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent leading-tight">
            Get In Touch
          </h2>
         <div className="flex items-center justify-center gap-4 mt-8">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-primary"></div>
              <Star className="h-6 w-6 text-primary" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-primary"></div>
            </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Let's Connect
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 text-lg">
                Whether you have a project in mind, want to collaborate, or
                just want to say hello, I'd love to hear from you. Feel free
                to reach out through any of the channels below.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "abhijeetyadav33xb@gmail.com",
                  href: "mailto:abhijeetyadav33xb@gmail.com",
                  bgColor: "from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30",
                  iconColor: "text-blue-600 dark:text-blue-400"
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "Mumbai, India",
                  bgColor: "from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30",
                  iconColor: "text-green-600 dark:text-green-400"
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 p-4 rounded-xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 hover:shadow-lg cursor-pointer"
                  onClick={() => item.href && window.open(item.href, '_self')}
                >
                  <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${item.bgColor} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                      {item.label}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {[
                  {
                    icon: Github,
                    href: "https://github.com/Abhi-engg",
                    hoverColor: "hover:text-gray-900 dark:hover:text-gray-100",
                  },
                  {
                    icon: Linkedin,
                    href: "https://www.linkedin.com/in/abhijeet-yadav-429b83212/",
                    hoverColor: "hover:text-blue-600",
                  },
                  {
                    icon: Instagram,
                    href: "https://www.instagram.com/kabhii.abhi/",
                    hoverColor: "hover:text-pink-500",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 text-slate-600 dark:text-slate-400 ${social.hoverColor} hover:scale-110 transition-all duration-300 hover:shadow-md`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Spotify Section */}
            <div className="space-y-4 pt-8">
              <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Now Playing</h4>
              <div className="w-full rounded-2xl overflow-hidden">
                <div className="relative h-40 sm:h-44 md:h-48 lg:h-52">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/0GaOaMKDWY1g1ovYLdfZ9Y?utm_source=generator"
                    className="absolute top-0 left-0 w-full h-full rounded-xl"
                    style={{ border: "0" }}
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-xl rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-2">
                Send me a message
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="w-full px-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none outline-none"
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 flex items-center gap-2 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isSubmitted}
                className="w-full group duration-300 ease-out hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>
              
              <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Your message will be stored securely and I'll respond within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;