import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-[#FD018B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/Images/meslogo2.png"
                alt="Manifold Enterprise Solutions"
                width={70}
                height={70}
                className=" object-contain"
                priority
              />
            </Link>
            <p className="text-white text-sm mb-6">
              Manifold Enterprise Solutions (MES) is a leading digital
              transformation and technology consulting company helping
              organizations optimize cloud investments, harness AI, strengthen
              cybersecurity, automate business processes, and build enterprise
              software that delivers measurable business outcomes.
            </p>
            <div className="flex gap-4">
              <a href="#" className="transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Our Practices */}
          <div>
            <h4 className="font-semibold mb-4">Our Practices</h4>
            <ul className="space-y-3 text-sm text-white">
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-400 transition-colors"
                >
                  Data & AI
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-400 transition-colors"
                >
                  CyberSecurity
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-400 transition-colors"
                >
                  Cloud
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-400 transition-colors"
                >
                  RPA
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-gray-400 transition-colors"
                >
                  Software Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-white">
              <li>
                <Link
                  href="/about"
                  className="hover:text-gray-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/use-cases"
                  className="hover:text-gray-400 transition-colors"
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-400 transition-colors"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#FD018B]">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <a href="mailto:sales@manifoldenterprisesolutions.com">
                sales@manifoldenterprisesolutions.com
              </a>
              <br />
              <a href="tel:+2349130798419">+234 913 079 8419</a>
              <li>
                Head Office <br />
                Leadway Marble House 1 Alfred Rewane Road
                <br /> Ikoyi Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t text-black border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white">
            © {currentYear} Manifold Enterprise Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
