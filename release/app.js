(() => {
  const { useState, useEffect, useRef } = React;
  const GOLD = "#C6A664";
  const CHARCOAL = "#1A1A2E";
  const IVORY = "#FAF7F2";
  const WARM_GRAY = "#E8E2D9";
  const DEEP_NAVY = "#0F0F23";
  const MUTED_GOLD = "#D4B87A";
  const SOFT_CHARCOAL = "#2D2D44";
  const LIGHT_TAUPE = "#B8A99A";
  function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(el);
          }
        },
        { threshold }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
  }
  function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
    const [ref, visible] = useInView(0.1);
    const transforms = {
      up: "translateY(40px)",
      down: "translateY(-40px)",
      left: "translateX(40px)",
      right: "translateX(-40px)",
      none: "none"
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref,
        className,
        style: {
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : transforms[direction],
          transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`
        }
      },
      children
    );
  }
  function GoldLine({ width = "60px", align = "left" }) {
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        style: {
          width,
          height: "2px",
          background: `linear-gradient(90deg, ${GOLD}, ${MUTED_GOLD})`,
          margin: align === "center" ? "0 auto" : "0",
          borderRadius: "1px"
        }
      }
    );
  }
  function Nav({ activeSection }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 60);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    const links = [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Experience", href: "#experience" },
      { label: "Expertise", href: "#expertise" },
      { label: "Contact", href: "#contact" }
    ];
    return /* @__PURE__ */ React.createElement(
      "nav",
      {
        style: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1e3,
          background: scrolled ? "rgba(26,26,46,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(198,166,100,0.15)" : "none",
          transition: "all 0.4s ease",
          padding: scrolled ? "14px 0" : "24px 0"
        }
      },
      /* @__PURE__ */ React.createElement(
        "div",
        {
          style: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }
        },
        /* @__PURE__ */ React.createElement("a", { href: "#hero", style: { textDecoration: "none", display: "flex", alignItems: "baseline", gap: "8px" } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: IVORY, letterSpacing: "-0.5px" } }, "Tricia Forchetti"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: GOLD, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 } }, "RACR")),
        /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "32px", alignItems: "center" }, className: "nav-desktop" }, links.map((link) => /* @__PURE__ */ React.createElement(
          "a",
          {
            key: link.href,
            href: link.href,
            style: {
              textDecoration: "none",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "15px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 500,
              color: activeSection === link.href.slice(1) ? GOLD : "rgba(250,247,242,0.7)",
              borderBottom: activeSection === link.href.slice(1) ? `1px solid ${GOLD}` : "1px solid transparent",
              paddingBottom: "2px"
            }
          },
          link.label
        )), /* @__PURE__ */ React.createElement(
          "a",
          {
            href: "#contact",
            style: {
              textDecoration: "none",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "14px",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              fontWeight: 600,
              color: CHARCOAL,
              background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`,
              padding: "10px 24px",
              borderRadius: "2px"
            }
          },
          "Book a Call"
        )),
        /* @__PURE__ */ React.createElement(
          "button",
          {
            onClick: () => setMenuOpen(!menuOpen),
            style: { display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px" },
            className: "nav-hamburger",
            "aria-label": "Toggle navigation"
          },
          /* @__PURE__ */ React.createElement("div", { style: { width: "24px", height: "2px", background: IVORY, marginBottom: "6px", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" } }),
          /* @__PURE__ */ React.createElement("div", { style: { width: "24px", height: "2px", background: IVORY, marginBottom: "6px", opacity: menuOpen ? 0 : 1 } }),
          /* @__PURE__ */ React.createElement("div", { style: { width: "24px", height: "2px", background: IVORY, transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" } })
        )
      ),
      menuOpen && /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(26,26,46,0.98)", padding: "24px 32px", display: "flex", flexDirection: "column", gap: "20px" } }, links.map((link) => /* @__PURE__ */ React.createElement(
        "a",
        {
          key: link.href,
          href: link.href,
          onClick: () => setMenuOpen(false),
          style: {
            textDecoration: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "18px",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            fontWeight: 500,
            color: IVORY
          }
        },
        link.label
      )))
    );
  }
  function Hero() {
    return /* @__PURE__ */ React.createElement(
      "section",
      {
        id: "hero",
        style: {
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(165deg, ${DEEP_NAVY} 0%, ${CHARCOAL} 40%, ${SOFT_CHARCOAL} 100%)`,
          position: "relative",
          overflow: "hidden"
        }
      },
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(198,166,100,0.06) 0%, transparent 70%)" } }),
      /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", bottom: "-15%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(198,166,100,0.04) 0%, transparent 70%)" } }),
      /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "900px", margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.1 }, /* @__PURE__ */ React.createElement("div", { style: { width: "160px", height: "160px", borderRadius: "50%", margin: "0 auto 32px", overflow: "hidden", border: "3px solid rgba(198,166,100,0.4)", boxShadow: "0 8px 40px rgba(0,0,0,0.3)", background: "#ddd" } }, /* @__PURE__ */ React.createElement(
        "img",
        {
          src: "./Tricia Forchetti.jpeg",
          alt: "Tricia Forchetti",
          style: { width: "100%", height: "100%", objectFit: "cover" },
          onError: (event) => {
            event.target.style.display = "none";
          }
        }
      ))), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.2 }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "24px", fontWeight: 500 } }, "Talent Acquisition Consultant \u2022 Career Coach \u2022 RACR")), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.4 }, /* @__PURE__ */ React.createElement("h1", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 700, color: IVORY, lineHeight: 1.05, margin: "0 0 28px 0", letterSpacing: "-1px" } }, "Better Hiring.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic", fontWeight: 400 } }, "Smarter Career Moves."))), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.55 }, /* @__PURE__ */ React.createElement(GoldLine, { width: "80px", align: "center" })), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.65 }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "rgba(250,247,242,0.75)", lineHeight: 1.7, margin: "28px auto 0", maxWidth: "700px" } }, "With 30+ years across Disney, Korn Ferry, Sheppard Pratt, and Adecco, I help organizations sharpen talent strategy and help professionals move forward with clarity, confidence, and stronger positioning.")), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.85 }, /* @__PURE__ */ React.createElement("div", { style: { marginTop: "48px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "#services",
          style: {
            textDecoration: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "15px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: CHARCOAL,
            background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`,
            padding: "16px 40px",
            borderRadius: "2px",
            boxShadow: "0 4px 20px rgba(198,166,100,0.25)"
          }
        },
        "Explore Services"
      ), /* @__PURE__ */ React.createElement(
        "a",
        {
          href: "#contact",
          style: {
            textDecoration: "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "15px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontWeight: 600,
            color: GOLD,
            border: "1px solid rgba(198,166,100,0.4)",
            padding: "16px 40px",
            borderRadius: "2px",
            background: "transparent"
          }
        },
        "Get in Touch"
      ))))
    );
  }
  function About() {
    const stats = [
      { number: "30+", label: "Years in Talent Acquisition" },
      { number: "3", label: "Languages Spoken" },
      { number: "$2M+", label: "Contract Value Secured" },
      { number: "300+", label: "Open Requisitions Managed" }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "about", style: { background: IVORY, padding: "120px 32px", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto" } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "About"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, margin: "0 0 20px 0" } }, "The Right Fit Changes", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Everything")), /* @__PURE__ */ React.createElement(GoldLine, { width: "60px" })), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", marginTop: "56px", alignItems: "start" }, className: "about-grid" }, /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.2 }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", color: SOFT_CHARCOAL, lineHeight: 1.8, marginBottom: "20px" } }, "Experienced human resources professional with a record of rapid advancement and strategic impact. I am recognized as a ", /* @__PURE__ */ React.createElement("strong", { style: { color: CHARCOAL } }, "compliance-driven talent acquisition leader"), " with deep experience in talent strategy sessions, full-cycle recruitment, job description updates, and policy implementation."), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(45,45,68,0.75)", lineHeight: 1.8, marginBottom: "20px" } }, "From leading Disney Experiences recruitment for Commercial Strategy to securing and executing a Lockheed Martin RPO contract valued at more than $2M, I bring a practical ability to attract high-performing talent across functions, levels, and changing workforce needs."), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(45,45,68,0.75)", lineHeight: 1.8 } }, "Today, I advise companies on hiring strategy while helping professionals navigate career pivots, growth, and market positioning with confidence and clarity."), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" } }, ["RACR Certified", "Open to Relocation", "English (Native)", "French", "Spanish"].map((item) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: item,
        style: {
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "13px",
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: GOLD,
          border: "1px solid rgba(198,166,100,0.35)",
          padding: "6px 16px",
          borderRadius: "2px",
          fontWeight: 500
        }
      },
      item
    ))))), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.35 }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" } }, stats.map((stat) => /* @__PURE__ */ React.createElement("div", { key: stat.label, style: { background: "white", padding: "32px 24px", borderRadius: "2px", textAlign: "center", boxShadow: "0 2px 20px rgba(26,26,46,0.06)", border: "1px solid rgba(198,166,100,0.1)" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: GOLD, margin: "0 0 8px 0" } }, stat.number), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: LIGHT_TAUPE, margin: 0 } }, stat.label))))))));
  }
  function Services() {
    const services = [
      {
        icon: "\u2726",
        title: "Career Strategy & Coaching",
        description: "Focused guidance for professionals navigating pivots, layoffs, leadership growth, or repositioning. I help translate experience into a clear, compelling next move.",
        features: ["Career Pivot Strategy", "Interview Preparation", "Personal Positioning", "Offer & Salary Guidance"]
      },
      {
        icon: "\u25C6",
        title: "Resume & LinkedIn Optimization",
        description: "I build concise, ATS-aware career materials that help hiring leaders quickly understand your value and give recruiters stronger reasons to respond.",
        features: ["ATS-Aligned Resume Refresh", "LinkedIn Profile Rewrite", "Executive Bio Support", "Targeted Messaging"]
      },
      {
        icon: "\u2B25",
        title: "Talent Acquisition Consulting",
        description: "I advise organizations on hiring strategy, full-cycle recruitment, talent pipeline development, and metrics that improve decision-making and candidate experience.",
        features: ["Talent Strategy Sessions", "Job Description Refinement", "Hiring Process Guidance", "Recruiting Metrics & Reporting"]
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "services", style: { background: DEEP_NAVY, padding: "120px 32px", position: "relative", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: "64px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Services"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: IVORY, lineHeight: 1.15, margin: "0 0 20px 0" } }, "How I Can ", /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Help")), /* @__PURE__ */ React.createElement(GoldLine, { width: "60px", align: "center" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }, className: "services-grid" }, services.map((service, index) => /* @__PURE__ */ React.createElement(FadeIn, { key: service.title, delay: 0.15 * (index + 1) }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(250,247,242,0.03)", border: "1px solid rgba(198,166,100,0.12)", borderRadius: "2px", padding: "48px 32px", height: "100%", transition: "all 0.4s ease" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: "28px", color: GOLD, display: "block", marginBottom: "24px" } }, service.icon), /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, color: IVORY, margin: "0 0 16px 0", lineHeight: 1.3 } }, service.title), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(250,247,242,0.6)", lineHeight: 1.7, marginBottom: "28px" } }, service.description), /* @__PURE__ */ React.createElement("div", { style: { borderTop: "1px solid rgba(198,166,100,0.1)", paddingTop: "20px" } }, service.features.map((feature) => /* @__PURE__ */ React.createElement("p", { key: feature, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "1px", color: GOLD, margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "10px" } }, /* @__PURE__ */ React.createElement("span", { style: { width: "4px", height: "4px", borderRadius: "50%", background: GOLD, flexShrink: 0 } }), feature)))))))));
  }
  function Experience() {
    const roles = [
      {
        company: "The Walt Disney Company",
        role: "Lead Recruiter, Professional Recruitment \u2014 Disney Experiences",
        period: "Jul 2022 \u2013 Mar 2026",
        highlights: [
          "Led full-cycle professional recruitment for Disney Experiences Commercial Strategy teams.",
          "Served as the exclusive lead recruiter for Manager-to-Director hiring within the leadership pipeline.",
          "Partnered closely with hiring leaders and HR business partners to align recruiting strategy with business goals.",
          "Reported talent metrics and workforce trends while building diverse pipelines through LinkedIn Recruiter and Indeed."
        ]
      },
      {
        company: "Korn Ferry",
        role: "Senior Recruiter \u2014 RPO Division",
        period: "Jan 2022 \u2013 Jun 2022",
        highlights: [
          "Delivered full-cycle recruitment for high-volume global clients within a recruitment process outsourcing model.",
          "Ran talent strategy sessions to define role requirements and sourcing priorities.",
          "Sourced and screened qualified candidates while maintaining focus on contractual recruiting metrics.",
          "Used social recruiting, database mining, and advanced search techniques to attract global talent pools."
        ]
      },
      {
        company: "Sheppard Pratt Health System",
        role: "Talent Acquisition Manager \u2192 Senior Recruiter",
        period: "Oct 2015 \u2013 Dec 2021",
        highlights: [
          "Owned talent acquisition for the organization\u2019s most profitable business unit.",
          "Led, coached, and guided four virtual recruiters and two coordinators.",
          "Oversaw full-cycle hiring for high-turnover, supervisory, and executive roles.",
          "Created interactive training that reinforced Federal and State Labor Law compliance for new supervisors."
        ]
      },
      {
        company: "The Adecco Group",
        role: "On-Site Manager, Lockheed Martin Corporation \u2192 Recruiter",
        period: "1992 \u2013 2000, 2014 \u2013 2015",
        highlights: [
          "Secured and executed an RPO contract with Lockheed Martin headquarters worth more than $2M.",
          "Reduced vacancies by 20% by identifying and attracting critical shortage personnel.",
          "Managed recruitment, screening, testing, and selection across 300+ open requisitions.",
          "Led recruiters and reported metrics including time-to-hire, offer acceptance, candidates per hire, and churn rate."
        ]
      }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "experience", style: { background: IVORY, padding: "120px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "1000px", margin: "0 auto" } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Experience"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, margin: "0 0 20px 0" } }, "A Career Built on ", /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Results")), /* @__PURE__ */ React.createElement(GoldLine, { width: "60px" })), /* @__PURE__ */ React.createElement("div", { style: { marginTop: "64px", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: `linear-gradient(180deg, ${GOLD}, rgba(198,166,100,0.15))` }, className: "timeline-line" }), roles.map((role, index) => /* @__PURE__ */ React.createElement(FadeIn, { key: role.company, delay: 0.15 * (index + 1) }, /* @__PURE__ */ React.createElement("div", { style: { paddingLeft: "48px", marginBottom: index < roles.length - 1 ? "56px" : "0", position: "relative" } }, /* @__PURE__ */ React.createElement("div", { style: { position: "absolute", left: "-5px", top: "6px", width: "11px", height: "11px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 0 4px ${IVORY}, 0 0 0 5px rgba(198,166,100,0.3)` }, className: "timeline-dot" }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "6px" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: CHARCOAL, margin: 0 } }, role.company), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "2px", color: LIGHT_TAUPE } }, role.period)), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, margin: "0 0 16px 0", fontWeight: 600 } }, role.role), /* @__PURE__ */ React.createElement("div", null, role.highlights.map((highlight) => /* @__PURE__ */ React.createElement("p", { key: highlight, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: "rgba(45,45,68,0.7)", lineHeight: 1.7, margin: "0 0 8px 0", display: "flex", gap: "10px" } }, /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, flexShrink: 0, marginTop: "4px", fontSize: "8px" } }, "\u25CF"), highlight)))))))));
  }
  function Expertise() {
    const categories = [
      { title: "Core Expertise", items: ["People Leadership", "Talent Management", "Human Resource Management", "Full-Cycle Recruitment", "Talent Strategy Sessions", "Policy Implementation"] },
      { title: "Software & Platforms", items: ["LinkedIn Recruiter", "Indeed Recruiter", "Applicant Pro", "Position Manager", "Workday Talent Management", "WebEx"] },
      { title: "Technology", items: ["Microsoft 365 Copilot", "Excel", "PowerPoint", "Teams", "Google Workspace", "Smartsheet & Zoom"] }
    ];
    return /* @__PURE__ */ React.createElement("section", { id: "expertise", style: { background: `linear-gradient(165deg, ${CHARCOAL} 0%, ${SOFT_CHARCOAL} 100%)`, padding: "100px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto" } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: "56px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Expertise"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: IVORY, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Tools & ", /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Capabilities")), /* @__PURE__ */ React.createElement(GoldLine, { width: "60px", align: "center" }))), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }, className: "services-grid" }, categories.map((category, index) => /* @__PURE__ */ React.createElement(FadeIn, { key: category.title, delay: 0.15 * (index + 1) }, /* @__PURE__ */ React.createElement("div", { style: { background: "rgba(250,247,242,0.03)", border: "1px solid rgba(198,166,100,0.12)", borderRadius: "2px", padding: "40px 32px" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, color: IVORY, margin: "0 0 24px 0" } }, category.title), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px" } }, category.items.map((item) => /* @__PURE__ */ React.createElement("span", { key: item, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "1px", color: "rgba(250,247,242,0.7)", border: "1px solid rgba(198,166,100,0.2)", padding: "6px 14px", borderRadius: "2px" } }, item)))))))));
  }
  function ValueProps() {
    const pillars = [
      "Advise companies on talent acquisition strategy and hiring processes.",
      "Help leaders make smarter, more effective hiring decisions.",
      "Guide professionals through career pivots, growth, and market positioning.",
      "Translate complex talent challenges into clear, actionable solutions."
    ];
    return /* @__PURE__ */ React.createElement("section", { style: { background: WARM_GRAY, padding: "100px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "900px", margin: "0 auto", textAlign: "center" } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "What I Do Best"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, color: CHARCOAL, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Practical Talent Guidance for ", /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Both Sides of the Table")), /* @__PURE__ */ React.createElement(GoldLine, { width: "48px", align: "center" }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "40px" }, className: "value-grid" }, pillars.map((pillar) => /* @__PURE__ */ React.createElement("div", { key: pillar, style: { background: "rgba(255,255,255,0.7)", border: "1px solid rgba(198,166,100,0.16)", padding: "28px 24px", textAlign: "left" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: CHARCOAL, lineHeight: 1.6, margin: 0 } }, pillar)))))));
  }
  function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const inputStyle = {
      width: "100%",
      padding: "16px 20px",
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "16px",
      background: "rgba(250,247,242,0.06)",
      border: "1px solid rgba(198,166,100,0.2)",
      borderRadius: "2px",
      color: IVORY,
      outline: "none",
      boxSizing: "border-box",
      letterSpacing: "0.5px"
    };
    return /* @__PURE__ */ React.createElement("section", { id: "contact", style: { background: `linear-gradient(165deg, ${DEEP_NAVY} 0%, ${CHARCOAL} 100%)`, padding: "120px 32px" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "700px", margin: "0 auto" } }, /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: "56px" } }, /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Contact"), /* @__PURE__ */ React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: IVORY, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Let's ", /* @__PURE__ */ React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Talk")), /* @__PURE__ */ React.createElement(GoldLine, { width: "60px", align: "center" }), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: "rgba(250,247,242,0.6)", lineHeight: 1.7, marginTop: "20px" } }, "Whether you are navigating a career transition, refining your professional story, or strengthening a hiring strategy."), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "32px", marginTop: "24px", flexWrap: "wrap" } }, /* @__PURE__ */ React.createElement("a", { href: "mailto:TriciaForchetti@gmail.com", style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GOLD, textDecoration: "none" } }, "TriciaForchetti@gmail.com"), /* @__PURE__ */ React.createElement("span", { style: { color: "rgba(250,247,242,0.4)" } }, "|"), /* @__PURE__ */ React.createElement("a", { href: "tel:+13016060914", style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GOLD, textDecoration: "none" } }, "(301) 606-0914")))), submitted ? /* @__PURE__ */ React.createElement(FadeIn, null, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "48px", background: "rgba(198,166,100,0.08)", border: "1px solid rgba(198,166,100,0.2)", borderRadius: "2px" } }, /* @__PURE__ */ React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "28px", color: IVORY, margin: "0 0 12px 0" } }, "Thank You"), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: "rgba(250,247,242,0.6)" } }, "I'll be in touch within 24 hours."))) : /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.2 }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }, className: "contact-grid" }, /* @__PURE__ */ React.createElement("input", { placeholder: "Your Name", value: formData.name, onChange: (event) => setFormData({ ...formData, name: event.target.value }), style: inputStyle }), /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: "Your Email", value: formData.email, onChange: (event) => setFormData({ ...formData, email: event.target.value }), style: inputStyle })), /* @__PURE__ */ React.createElement(
      "select",
      {
        value: formData.service,
        onChange: (event) => setFormData({ ...formData, service: event.target.value }),
        style: { ...inputStyle, marginBottom: "20px", appearance: "none", cursor: "pointer", color: formData.service ? IVORY : "rgba(250,247,242,0.4)" }
      },
      /* @__PURE__ */ React.createElement("option", { value: "", disabled: true }, "Select a Service"),
      /* @__PURE__ */ React.createElement("option", { value: "career" }, "Career Strategy & Coaching"),
      /* @__PURE__ */ React.createElement("option", { value: "resume" }, "Resume & LinkedIn Optimization"),
      /* @__PURE__ */ React.createElement("option", { value: "talent" }, "Talent Acquisition Consulting"),
      /* @__PURE__ */ React.createElement("option", { value: "leadership" }, "Leadership Hiring Strategy"),
      /* @__PURE__ */ React.createElement("option", { value: "other" }, "Something Else")
    ), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        placeholder: "Tell me about your situation...",
        value: formData.message,
        onChange: (event) => setFormData({ ...formData, message: event.target.value }),
        rows: 5,
        style: { ...inputStyle, marginBottom: "28px", resize: "vertical", minHeight: "120px" }
      }
    ), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        onClick: () => setSubmitted(true),
        style: {
          width: "100%",
          padding: "18px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "15px",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          fontWeight: 600,
          color: CHARCOAL,
          background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`,
          border: "none",
          borderRadius: "2px",
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(198,166,100,0.2)"
        }
      },
      "Send Message"
    ))), /* @__PURE__ */ React.createElement(FadeIn, { delay: 0.4 }, /* @__PURE__ */ React.createElement("div", { style: { marginTop: "56px", textAlign: "center" } }, /* @__PURE__ */ React.createElement("a", { href: "https://www.linkedin.com/in/triciaforchetti", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, borderBottom: "1px solid rgba(198,166,100,0.3)", paddingBottom: "4px" } }, "Connect on LinkedIn \u2192")))));
  }
  function Footer() {
    return /* @__PURE__ */ React.createElement("footer", { style: { background: DEEP_NAVY, padding: "48px 32px", borderTop: "1px solid rgba(198,166,100,0.1)" } }, /* @__PURE__ */ React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: IVORY } }, "Tricia Forchetti"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: GOLD, letterSpacing: "2px", marginLeft: "8px" } }, "RACR")), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "rgba(250,247,242,0.35)", letterSpacing: "1px", margin: 0 } }, "\xA9 ", (/* @__PURE__ */ new Date()).getFullYear(), " Tricia Forchetti. All rights reserved."), /* @__PURE__ */ React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: "rgba(250,247,242,0.35)", letterSpacing: "1px", margin: 0 } }, "Frederick, Maryland \u2022 Open to Relocation")));
  }
  function Portfolio() {
    const [activeSection, setActiveSection] = useState("hero");
    useEffect(() => {
      const link = document.createElement("link");
      link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
      const sections = ["hero", "about", "services", "experience", "expertise", "contact"];
      const onScroll = () => {
        for (const id of [...sections].reverse()) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top <= 200) {
            setActiveSection(id);
            break;
          }
        }
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return /* @__PURE__ */ React.createElement("div", { style: { background: CHARCOAL, minHeight: "100vh" } }, /* @__PURE__ */ React.createElement("style", null, `
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        ::selection { background: rgba(198,166,100,0.3); color: #FAF7F2; }
        select option { background: #1A1A2E; color: #FAF7F2; }
        input::placeholder, textarea::placeholder { color: rgba(250,247,242,0.35); }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .value-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 769px) {
          .nav-hamburger { display: none !important; }
        }
      `), /* @__PURE__ */ React.createElement(Nav, { activeSection }), /* @__PURE__ */ React.createElement(Hero, null), /* @__PURE__ */ React.createElement(About, null), /* @__PURE__ */ React.createElement(Services, null), /* @__PURE__ */ React.createElement(Experience, null), /* @__PURE__ */ React.createElement(Expertise, null), /* @__PURE__ */ React.createElement(ValueProps, null), /* @__PURE__ */ React.createElement(Contact, null), /* @__PURE__ */ React.createElement(Footer, null));
  }
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(/* @__PURE__ */ React.createElement(Portfolio, null));
})();
