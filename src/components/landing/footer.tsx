"use client";

import { useTranslation } from 'react-i18next';
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Github, href: "https://github.com/hackyourflows", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/hackyourflows", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/hackyourflows", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hola@hackyourflows.com", label: "Email" },
];

export const Footer = () => {
  const { t, i18n } = useTranslation();
  
  const footerLinks = {
    product: [
      { name: t('footer.product.challenges'), href: "/challenges" },
      { name: t('footer.product.leaderboard'), href: "/leaderboard" },
      { name: t('footer.product.pricing'), href: "#pricing" },
    ],
    resources: [
      { name: t('footer.resources.community'), href: "/community" },
      { name: t('footer.resources.help'), href: "/help" },
      { name: t('footer.resources.blog'), href: "https://blog.hackyourflows.com", external: true },
    ],
    company: [
      { name: t('footer.company.about'), href: "/about" },
      { name: t('footer.company.privacy'), href: "/privacy" },
      { name: t('footer.company.terms'), href: "/terms" },
    ],
  };
  return (
    <footer className="py-12 md:py-20 px-4 md:px-6 border-t border-border bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl md:text-2xl font-bold gradient-text">
              Hack-Your-Flows
            </h3>
            <p className="text-foreground-secondary text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 rounded-lg bg-surface glass flex items-center justify-center text-foreground-secondary hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground capitalize">
                {t(`footer.sections.${category}`)}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: categoryIndex * 0.1 + linkIndex * 0.05 
                    }}
                  >
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-foreground-secondary hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-foreground-secondary hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-6 md:pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-foreground-secondary text-sm text-center md:text-left">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-sm text-foreground-secondary flex-wrap justify-center">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              {t('footer.legal.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              {t('footer.legal.terms')}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};