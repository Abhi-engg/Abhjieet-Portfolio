import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  Twitter,
  CheckCircle,
  Clock,
  Instagram,
  AlertCircle,
} from "lucide-react";
import useWeb3Forms from "@web3forms/react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Initialize Web3Forms hook
  const { submit } = useWeb3Forms({
    access_key: "8fe967e3-03ee-40c0-81ff-d6760e0b9378", // Replace with your actual access key from web3forms.com
    settings: {
      from_name: "Portfolio Contact Form",
      subject: "New Contact Form Submission from Portfolio",
    },
    onSuccess: (message, data) => {
      setIsSubmitted(true);
      setError("");

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      }, 3000);
    },
    onError: (message, data) => {
      setError(message || "Something went wrong. Please try again.");
    },
  });

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
      // Prepare data for submission
      const formDataToSubmit = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        botcheck: "", // Honeypot spam protection
      };

      // Submit using the Web3Forms React hook
      await submit(formDataToSubmit);
    } catch (err) {
      setError("Failed to submit the form. Please try again later.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 ">
      {/* Background Pattern */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 ">
              Get In Touch
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              I'm always open to discussing new opportunities, interesting
              projects, or just having a conversation about technology and
              development.
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-slate-800 to-slate-600 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-semibold mb-6 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Let's Connect
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
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
                    color: "text-white-600",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Mumbai, India",
                    color: "text-white-600",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-4 p-4 rounded-xl 0 hover:bg-white/800 transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br from-${
                        item.color.split("-")[1]
                      }-100 to-${item.color.split("-")[1]}-200 dark:from-${
                        item.color.split("-")[1]
                      }-900/30 dark:to-${
                        item.color.split("-")[1]
                      }-800/30 rounded-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon
                        className={`h-6 w-6 ${
                          item.color
                        } dark:${item.color.replace("600", "400")}`}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </h4>
                      <p className="text-muted-foreground">{item.value}</p>
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
                      color: "hover:text-gray-900 dark:hover:text-gray-100",
                    },
                    {
                      icon: Linkedin,
                      href: "https://www.linkedin.com/in/abhijeet-yadav-429b83212/",
                      color: "hover:text-blue-600",
                    },
                    {
                      icon: Instagram,
                      href: "https://www.instagram.com/kabhii.abhi/",
                      color: "hover:text-sky-500",
                    },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 text-muted-foreground ${social.color} hover:scale-110 transition-all duration-300 hover:shadow-md`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Send me a message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I'll get back to you as soon as
                  possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="firstName"
                        className="text-sm font-medium"
                      >
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Collaboration"
                      className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or just say hello..."
                      className="min-h-[120px] bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 flex items-center gap-2 text-sm mb-4">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full group duration-300 ease-out hover:scale-105 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="ml-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="ml-2 h-4 w-4" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
