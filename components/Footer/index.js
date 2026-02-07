import React from "react";
import yourData from "../../data/portfolio.json";

const Footer = ({}) => {
  const getSocialIcon = (title) => {
    const iconMap = {
      "Github": (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      "LinkedIn": (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    };
    return iconMap[title] || null;
  };

  const githubSocial = yourData.socials.find(s => s.title === "Github");
  const linkedInSocial = yourData.socials.find(s => s.title === "LinkedIn");

  return (
    <>
      <style jsx>{`
        .footer-container {
          background-color: transparent;
          padding: 1.5rem 0;
        }
        .footer-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          color: #374151;
          font-size: 0.875rem;
        }
        .footer-separator-dot {
          color: #6b7280;
          margin: 0 0.25rem;
        }
        .footer-separator-line {
          color: #6b7280;
          margin: 0 0.5rem;
        }
        .footer-link {
          display: flex;
          align-items: center;
          gap: 0.375rem;
          color: #374151;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-link:hover {
          opacity: 0.7;
        }
        .footer-link svg {
          flex-shrink: 0;
        }
        /* CS Webring inline styles - like Austin Jiang's v4 */
        .cs-webring-inline {
          display: inline-flex;
          align-items: baseline;
          gap: 0.2rem;
          position: relative;
          vertical-align: baseline;
        }
        .webring-content {
          position: relative;
          display: inline-block;
        }
        .webring-text-link {
          color: #374151;
          text-decoration: none;
          transition: opacity 0.3s ease;
        }
        .webring-text-link:hover {
          opacity: 0.7;
        }
        .webring-arrows {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
          transform: translateY(-1px);
        }
        .webring-nav-arrow {
          color: #374151;
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          padding: 0 0.25rem;
        }
        .webring-nav-arrow:hover {
          opacity: 0.7;
        }
        .cs-webring-inline:hover .webring-arrows {
          opacity: 0.8;
          visibility: visible;
        }
        .cs-webring-inline:hover .webring-text-link {
          opacity: 0;
          pointer-events: none;
        }
        .webring-icon {
          width: 18px !important;
          height: 18px !important;
          transform: translateY(2px);
          margin-top: -4px;
        }
        .webring-main.footer-link {
          display: inline-flex;
          align-items: center;
          vertical-align: baseline;
        }
        @media (max-width: 768px) {
          .cs-webring-inline {
            transform: translateY(2px);
          }
          .webring-icon {
            width: 16px !important;
            height: 16px !important;
          }
          .webring-arrows {
            transform: translateY(-3px);
          }
        }
      `}</style>
      <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-24"></div>

      <div className="footer-container">
        <div className="footer-content">
          <span>University of Waterloo</span>
          <span className="footer-separator-dot">•</span>
          {githubSocial && (
            <>
              <a
                href={githubSocial.link}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="GitHub"
              >
                {getSocialIcon("Github")}
                <span>GitHub</span>
              </a>
              <span className="footer-separator-line">|</span>
            </>
          )}
          {linkedInSocial && (
            <>
              <a
                href={linkedInSocial.link}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                aria-label="LinkedIn"
              >
                {getSocialIcon("LinkedIn")}
                <span>LinkedIn</span>
              </a>
              <span className="footer-separator-line">|</span>
            </>
          )}
          <div className="cs-webring-inline">
            <a
              href="https://cs.uwatering.com/#fiona-cai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link webring-main"
              aria-label="CS Webring"
            >
              <img
                src="https://cs.uwatering.com/icon.black.svg"
                alt="CS Webring"
                className="webring-icon"
                style={{ opacity: 0.8 }}
              />
            </a>
            <span className="webring-content">
              <a
                href="https://cs.uwatering.com/#fiona-cai.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="webring-text-link"
              >
                UW CS
              </a>
              <span className="webring-arrows">
                <a
                  href="https://cs.uwatering.com/#fiona-cai.vercel.app?nav=prev"
                  className="webring-nav-arrow"
                  aria-label="Previous site in webring"
                >
                  ←
                </a>
                <a
                  href="https://cs.uwatering.com/#fiona-cai.vercel.app?nav=next"
                  className="webring-nav-arrow"
                  aria-label="Next site in webring"
                >
                  →
                </a>
              </span>
            </span>
          </div>
          <span className="footer-separator-line">|</span>
          <div className="cs-webring-inline">
            <a
              href="https://uwaterloo.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link webring-main"
              aria-label="UW Webring"
            >
              <img
                src="/images/uw-icon.svg"
                alt="UW Webring"
                className="webring-icon"
                style={{ opacity: 0.8 }}
              />
            </a>
            <span className="webring-content">
              <a
                href="https://uwaterloo.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="webring-text-link"
              >
                UW
              </a>
              <span className="webring-arrows">
                <a
                  href="https://uwaterloo.network/#fiona-cai?nav=prev"
                  className="webring-nav-arrow"
                  aria-label="Previous site in webring"
                >
                  ←
                </a>
                <a
                  href="https://uwaterloo.network/#fiona-cai?nav=next"
                  className="webring-nav-arrow"
                  aria-label="Next site in webring"
                >
                  →
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
