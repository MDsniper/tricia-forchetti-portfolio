(() => {
  const { useState, useEffect, useRef, createContext, useContext } = React;

  const GOLD = "#C6A664";
  const MUTED_GOLD = "#D4B87A";

  const themes = {
    light: {
      bg: "#CADCE8",
      bgAlt: "#B5CCDB",
      heroBg: "linear-gradient(165deg, #A3C4D9 0%, #B8D6E8 40%, #CADCE8 100%)",
      darkBg: "#1E3A52",
      darkBgAlt: "linear-gradient(165deg, #1C3148 0%, #264258 100%)",
      heading: "#1C3148",
      text: "#1C3148",
      textMuted: "rgba(28,49,72,0.8)",
      navBg: "rgba(163,196,217,0.97)",
      navLink: "rgba(28,49,72,0.7)",
      taupe: "#5F7D94",
      cardBg: "rgba(255,255,255,0.35)",
      cardShadow: "rgba(15,26,43,0.1)",
      valuePillBg: "rgba(255,255,255,0.2)",
      darkText: "#CADCE8",
      darkTextMuted: "rgba(202,220,232,0.7)",
      darkCardBg: "rgba(202,220,232,0.04)",
      subtitleColor: "#8B6F3A",
      selectBg: "#1E3A52",
    },
    dark: {
      bg: "#1A1A2E",
      bgAlt: "#16162A",
      heroBg: "linear-gradient(165deg, #0F0F23 0%, #1A1A2E 40%, #2D2D44 100%)",
      darkBg: "#0F0F23",
      darkBgAlt: "linear-gradient(165deg, #1A1A2E 0%, #2D2D44 100%)",
      heading: "#FAF7F2",
      text: "#FAF7F2",
      textMuted: "rgba(250,247,242,0.75)",
      navBg: "rgba(26,26,46,0.97)",
      navLink: "rgba(250,247,242,0.7)",
      taupe: "#B8A99A",
      cardBg: "rgba(250,247,242,0.05)",
      cardShadow: "rgba(0,0,0,0.2)",
      valuePillBg: "rgba(250,247,242,0.06)",
      darkText: "#FAF7F2",
      darkTextMuted: "rgba(250,247,242,0.6)",
      darkCardBg: "rgba(250,247,242,0.03)",
      subtitleColor: GOLD,
      selectBg: "#1A1A2E",
    }
  };

  const ThemeContext = createContext();
  function useTheme() { return useContext(ThemeContext); }

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
    return React.createElement(
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
    return React.createElement("div", {
      style: {
        width,
        height: "2px",
        background: `linear-gradient(90deg, ${GOLD}, ${MUTED_GOLD})`,
        margin: align === "center" ? "0 auto" : "0",
        borderRadius: "1px"
      }
    });
  }

  function ThemeToggle() {
    const { mode, toggle } = useTheme();
    return React.createElement("button", {
      onClick: toggle,
      "aria-label": "Toggle dark mode",
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "20px",
        padding: "6px",
        lineHeight: 1,
        transition: "transform 0.3s ease",
      }
    }, mode === "light" ? "\u263E" : "\u2600");
  }

  function Nav({ activeSection }) {
    const { t } = useTheme();
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
    return React.createElement("nav", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1e3,
        background: scrolled ? t.navBg : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(198,166,100,0.15)` : "none",
        transition: "all 0.4s ease",
        padding: scrolled ? "14px 0" : "24px 0"
      }
    },
      React.createElement("div", {
        style: { maxWidth: "1200px", margin: "0 auto", padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }
      },
        React.createElement("a", { href: "#hero", style: { textDecoration: "none", display: "flex", alignItems: "baseline", gap: "8px" } },
          React.createElement("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, color: t.heading, letterSpacing: "-0.5px" } }, "Tricia Forchetti"),
          React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", color: GOLD, letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 } }, "RACR")
        ),
        React.createElement("div", { style: { display: "flex", gap: "32px", alignItems: "center" }, className: "nav-desktop" },
          links.map((link) => React.createElement("a", {
            key: link.href, href: link.href,
            style: {
              textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px",
              letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500,
              color: activeSection === link.href.slice(1) ? GOLD : t.navLink,
              borderBottom: activeSection === link.href.slice(1) ? `1px solid ${GOLD}` : "1px solid transparent",
              paddingBottom: "2px"
            }
          }, link.label)),
          React.createElement(ThemeToggle),
          React.createElement("a", {
            href: "#contact",
            style: {
              textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px",
              letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 600,
              color: "#1C3148", background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`,
              padding: "10px 24px", borderRadius: "2px"
            }
          }, "Book a Call")
        ),
        React.createElement("div", { style: { display: "flex", gap: "12px", alignItems: "center" }, className: "nav-mobile-right" },
          React.createElement(ThemeToggle),
          React.createElement("button", {
            onClick: () => setMenuOpen(!menuOpen),
            style: { display: "none", background: "none", border: "none", cursor: "pointer", padding: "8px" },
            className: "nav-hamburger", "aria-label": "Toggle navigation"
          },
            React.createElement("div", { style: { width: "24px", height: "2px", background: t.heading, marginBottom: "6px", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(8px)" : "none" } }),
            React.createElement("div", { style: { width: "24px", height: "2px", background: t.heading, marginBottom: "6px", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" } }),
            React.createElement("div", { style: { width: "24px", height: "2px", background: t.heading, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-8px)" : "none" } })
          )
        )
      ),
      menuOpen && React.createElement("div", {
        style: { background: t.navBg, padding: "24px 32px", display: "flex", flexDirection: "column", gap: "20px" }
      }, links.map((link) => React.createElement("a", {
        key: link.href, href: link.href, onClick: () => setMenuOpen(false),
        style: { textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500, color: t.heading }
      }, link.label)))
    );
  }

  function Hero() {
    const { t } = useTheme();
    return React.createElement("section", {
      id: "hero",
      style: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: t.heroBg, position: "relative", overflow: "hidden", transition: "background 0.5s ease" }
    },
      React.createElement("div", { style: { position: "absolute", top: "-20%", right: "-10%", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(198,166,100,0.06) 0%, transparent 70%)" } }),
      React.createElement("div", { style: { position: "absolute", bottom: "-15%", left: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(198,166,100,0.04) 0%, transparent 70%)" } }),
      React.createElement("div", { style: { maxWidth: "900px", margin: "0 auto", padding: "0 32px", textAlign: "center", position: "relative", zIndex: 1 } },
        React.createElement(FadeIn, { delay: 0.1 }, React.createElement("div", { style: { width: "160px", height: "160px", borderRadius: "50%", margin: "0 auto 32px", overflow: "hidden", border: "3px solid rgba(198,166,100,0.4)", boxShadow: "0 8px 40px rgba(0,0,0,0.15)", background: "#ddd" } },
          React.createElement("img", { src: "./Tricia Forchetti.jpeg", alt: "Tricia Forchetti", style: { width: "100%", height: "100%", objectFit: "cover" }, onError: (e) => { e.target.style.display = "none"; } })
        )),
        React.createElement(FadeIn, { delay: 0.2 }, React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "4px", textTransform: "uppercase", color: t.subtitleColor, marginBottom: "24px", fontWeight: 500 } }, "Talent Acquisition Consultant \u2022 Career Coach \u2022 RACR")),
        React.createElement(FadeIn, { delay: 0.4 }, React.createElement("h1", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(42px, 7vw, 80px)", fontWeight: 700, color: t.heading, lineHeight: 1.05, margin: "0 0 28px 0", letterSpacing: "-1px" } }, "Better Hiring.", React.createElement("br"), React.createElement("span", { style: { color: GOLD, fontStyle: "italic", fontWeight: 400 } }, "Smarter Career Moves."))),
        React.createElement(FadeIn, { delay: 0.55 }, React.createElement(GoldLine, { width: "80px", align: "center" })),
        React.createElement(FadeIn, { delay: 0.65 }, React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: t.textMuted, lineHeight: 1.7, margin: "28px auto 0", maxWidth: "700px" } }, "With 30+ years across Disney, Korn Ferry, Sheppard Pratt, and Adecco, I help organizations sharpen talent strategy and help professionals move forward with clarity, confidence, and stronger positioning.")),
        React.createElement(FadeIn, { delay: 0.85 }, React.createElement("div", { style: { marginTop: "48px", display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" } },
          React.createElement("a", { href: "#services", style: { textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: "#1C3148", background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`, padding: "16px 40px", borderRadius: "2px", boxShadow: "0 4px 20px rgba(198,166,100,0.25)" } }, "Explore Services"),
          React.createElement("a", { href: "#contact", style: { textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 600, color: GOLD, border: "1px solid rgba(198,166,100,0.4)", padding: "16px 40px", borderRadius: "2px", background: "transparent" } }, "Get in Touch")
        ))
      )
    );
  }

  function About() {
    const { t } = useTheme();
    const stats = [
      { number: "30+", label: "Years in Talent Acquisition" },
      { number: "3", label: "Languages Spoken" },
      { number: "$2M+", label: "Contract Value Secured" },
      { number: "300+", label: "Open Requisitions Managed" }
    ];
    return React.createElement("section", { id: "about", style: { background: t.bg, padding: "120px 32px", position: "relative", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto" } },
        React.createElement(FadeIn, null,
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "About"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: t.heading, lineHeight: 1.15, margin: "0 0 20px 0" } }, "The Right Fit Changes", React.createElement("br"), React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Everything")),
          React.createElement(GoldLine, { width: "60px" })
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", marginTop: "56px", alignItems: "start" }, className: "about-grid" },
          React.createElement(FadeIn, { delay: 0.2 }, React.createElement("div", null,
            React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", color: t.text, lineHeight: 1.8, marginBottom: "20px" } }, "Experienced human resources professional with a record of rapid advancement and strategic impact. I am recognized as a ", React.createElement("strong", { style: { color: t.heading } }, "compliance-driven talent acquisition leader"), " with deep experience in talent strategy sessions, full-cycle recruitment, job description updates, and policy implementation."),
            React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: t.textMuted, lineHeight: 1.8, marginBottom: "20px" } }, "From leading Disney Experiences recruitment for Commercial Strategy to securing and executing a Lockheed Martin RPO contract valued at more than $2M, I bring a practical ability to attract high-performing talent across functions, levels, and changing workforce needs."),
            React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: t.textMuted, lineHeight: 1.8 } }, "Today, I advise companies on hiring strategy while helping professionals navigate career pivots, growth, and market positioning with confidence and clarity."),
            React.createElement("div", { style: { marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" } },
              ["RACR Certified", "Open to Relocation", "English (Native)", "French", "Spanish"].map((item) =>
                React.createElement("span", { key: item, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, border: "1px solid rgba(198,166,100,0.35)", padding: "6px 16px", borderRadius: "2px", fontWeight: 500 } }, item)
              ))
          )),
          React.createElement(FadeIn, { delay: 0.35 }, React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" } },
            stats.map((stat) => React.createElement("div", { key: stat.label, style: { background: t.cardBg, padding: "32px 24px", borderRadius: "2px", textAlign: "center", boxShadow: `0 2px 20px ${t.cardShadow}`, border: "1px solid rgba(198,166,100,0.1)" } },
              React.createElement("p", { style: { fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: GOLD, margin: "0 0 8px 0" } }, stat.number),
              React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", color: t.taupe, margin: 0 } }, stat.label)
            ))
          ))
        )
      )
    );
  }

  function Services() {
    const { t } = useTheme();
    const services = [
      { icon: "\u2726", title: "Career Strategy & Coaching", description: "Focused guidance for professionals navigating pivots, layoffs, leadership growth, or repositioning. I help translate experience into a clear, compelling next move.", features: ["Career Pivot Strategy", "Interview Preparation", "Personal Positioning", "Offer & Salary Guidance"] },
      { icon: "\u25C6", title: "Resume & LinkedIn Optimization", description: "I build concise, ATS-aware career materials that help hiring leaders quickly understand your value and give recruiters stronger reasons to respond.", features: ["ATS-Aligned Resume Refresh", "LinkedIn Profile Rewrite", "Executive Bio Support", "Targeted Messaging"] },
      { icon: "\u2B25", title: "Talent Acquisition Consulting", description: "I advise organizations on hiring strategy, full-cycle recruitment, talent pipeline development, and metrics that improve decision-making and candidate experience.", features: ["Talent Strategy Sessions", "Job Description Refinement", "Hiring Process Guidance", "Recruiting Metrics & Reporting"] }
    ];
    return React.createElement("section", { id: "services", style: { background: t.darkBg, padding: "120px 32px", position: "relative", overflow: "hidden", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 } },
        React.createElement(FadeIn, null, React.createElement("div", { style: { textAlign: "center", marginBottom: "64px" } },
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Services"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: t.darkText, lineHeight: 1.15, margin: "0 0 20px 0" } }, "How I Can ", React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Help")),
          React.createElement(GoldLine, { width: "60px", align: "center" })
        )),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }, className: "services-grid" },
          services.map((service, index) => React.createElement(FadeIn, { key: service.title, delay: 0.15 * (index + 1) },
            React.createElement("div", { style: { background: t.darkCardBg, border: "1px solid rgba(198,166,100,0.12)", borderRadius: "2px", padding: "48px 32px", height: "100%", transition: "all 0.4s ease" } },
              React.createElement("span", { style: { fontSize: "28px", color: GOLD, display: "block", marginBottom: "24px" } }, service.icon),
              React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 600, color: t.darkText, margin: "0 0 16px 0", lineHeight: 1.3 } }, service.title),
              React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: t.darkTextMuted, lineHeight: 1.7, marginBottom: "28px" } }, service.description),
              React.createElement("div", { style: { borderTop: "1px solid rgba(198,166,100,0.1)", paddingTop: "20px" } },
                service.features.map((feature) => React.createElement("p", { key: feature, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "1px", color: GOLD, margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "10px" } },
                  React.createElement("span", { style: { width: "4px", height: "4px", borderRadius: "50%", background: GOLD, flexShrink: 0 } }), feature
                ))
              )
            )
          ))
        )
      )
    );
  }

  function Experience() {
    const { t } = useTheme();
    const roles = [
      { company: "The Walt Disney Company", role: "Lead Recruiter, Professional Recruitment \u2014 Disney Experiences", period: "Jul 2022 \u2013 Mar 2026", highlights: ["Led full-cycle professional recruitment for Disney Experiences Commercial Strategy teams.", "Served as the exclusive lead recruiter for Manager-to-Director hiring within the leadership pipeline.", "Partnered closely with hiring leaders and HR business partners to align recruiting strategy with business goals.", "Reported talent metrics and workforce trends while building diverse pipelines through LinkedIn Recruiter and Indeed."] },
      { company: "Korn Ferry", role: "Senior Recruiter \u2014 RPO Division", period: "Jan 2022 \u2013 Jun 2022", highlights: ["Delivered full-cycle recruitment for high-volume global clients within a recruitment process outsourcing model.", "Ran talent strategy sessions to define role requirements and sourcing priorities.", "Sourced and screened qualified candidates while maintaining focus on contractual recruiting metrics.", "Used social recruiting, database mining, and advanced search techniques to attract global talent pools."] },
      { company: "Sheppard Pratt Health System", role: "Talent Acquisition Manager \u2192 Senior Recruiter", period: "Oct 2015 \u2013 Dec 2021", highlights: ["Owned talent acquisition for the organization\u2019s most profitable business unit.", "Led, coached, and guided four virtual recruiters and two coordinators.", "Oversaw full-cycle hiring for high-turnover, supervisory, and executive roles.", "Created interactive training that reinforced Federal and State Labor Law compliance for new supervisors."] },
      { company: "The Adecco Group", role: "On-Site Manager, Lockheed Martin Corporation \u2192 Recruiter", period: "1992 \u2013 2000, 2014 \u2013 2015", highlights: ["Secured and executed an RPO contract with Lockheed Martin headquarters worth more than $2M.", "Reduced vacancies by 20% by identifying and attracting critical shortage personnel.", "Managed recruitment, screening, testing, and selection across 300+ open requisitions.", "Led recruiters and reported metrics including time-to-hire, offer acceptance, candidates per hire, and churn rate."] }
    ];
    return React.createElement("section", { id: "experience", style: { background: t.bg, padding: "120px 32px", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "1000px", margin: "0 auto" } },
        React.createElement(FadeIn, null,
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Experience"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: t.heading, lineHeight: 1.15, margin: "0 0 20px 0" } }, "A Career Built on ", React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Results")),
          React.createElement(GoldLine, { width: "60px" })
        ),
        React.createElement("div", { style: { marginTop: "64px", position: "relative" } },
          React.createElement("div", { style: { position: "absolute", left: "0", top: "0", bottom: "0", width: "1px", background: `linear-gradient(180deg, ${GOLD}, rgba(198,166,100,0.15))` }, className: "timeline-line" }),
          roles.map((role, index) => React.createElement(FadeIn, { key: role.company, delay: 0.15 * (index + 1) },
            React.createElement("div", { style: { paddingLeft: "48px", marginBottom: index < roles.length - 1 ? "56px" : "0", position: "relative" } },
              React.createElement("div", { style: { position: "absolute", left: "-5px", top: "6px", width: "11px", height: "11px", borderRadius: "50%", background: GOLD, boxShadow: `0 0 0 4px ${t.bg}, 0 0 0 5px rgba(198,166,100,0.3)` }, className: "timeline-dot" }),
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px", marginBottom: "6px" } },
                React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: t.heading, margin: 0 } }, role.company),
                React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "2px", color: t.taupe } }, role.period)
              ),
              React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "1.5px", textTransform: "uppercase", color: GOLD, margin: "0 0 16px 0", fontWeight: 600 } }, role.role),
              React.createElement("div", null, role.highlights.map((h) => React.createElement("p", { key: h, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "16px", color: t.textMuted, lineHeight: 1.7, margin: "0 0 8px 0", display: "flex", gap: "10px" } },
                React.createElement("span", { style: { color: GOLD, flexShrink: 0, marginTop: "4px", fontSize: "8px" } }, "\u25CF"), h
              )))
            )
          ))
        )
      )
    );
  }

  function Expertise() {
    const { t } = useTheme();
    const categories = [
      { title: "Core Expertise", items: ["People Leadership", "Talent Management", "Human Resource Management", "Full-Cycle Recruitment", "Talent Strategy Sessions", "Policy Implementation"] },
      { title: "Software & Platforms", items: ["LinkedIn Recruiter", "Indeed Recruiter", "Applicant Pro", "Position Manager", "Workday Talent Management", "WebEx"] },
      { title: "Technology", items: ["Microsoft 365 Copilot", "Excel", "PowerPoint", "Teams", "Google Workspace", "Smartsheet & Zoom"] }
    ];
    return React.createElement("section", { id: "expertise", style: { background: t.darkBgAlt, padding: "100px 32px", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto" } },
        React.createElement(FadeIn, null, React.createElement("div", { style: { textAlign: "center", marginBottom: "56px" } },
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Expertise"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: t.darkText, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Tools & ", React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Capabilities")),
          React.createElement(GoldLine, { width: "60px", align: "center" })
        )),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }, className: "services-grid" },
          categories.map((cat, index) => React.createElement(FadeIn, { key: cat.title, delay: 0.15 * (index + 1) },
            React.createElement("div", { style: { background: t.darkCardBg, border: "1px solid rgba(198,166,100,0.12)", borderRadius: "2px", padding: "40px 32px" } },
              React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 600, color: t.darkText, margin: "0 0 24px 0" } }, cat.title),
              React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px" } },
                cat.items.map((item) => React.createElement("span", { key: item, style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "1px", color: t.darkTextMuted, border: "1px solid rgba(198,166,100,0.2)", padding: "6px 14px", borderRadius: "2px" } }, item))
              )
            )
          ))
        )
      )
    );
  }

  function ValueProps() {
    const { t } = useTheme();
    const pillars = [
      "Advise companies on talent acquisition strategy and hiring processes.",
      "Help leaders make smarter, more effective hiring decisions.",
      "Guide professionals through career pivots, growth, and market positioning.",
      "Translate complex talent challenges into clear, actionable solutions."
    ];
    return React.createElement("section", { style: { background: t.bgAlt, padding: "100px 32px", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "900px", margin: "0 auto", textAlign: "center" } },
        React.createElement(FadeIn, null,
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "What I Do Best"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 700, color: t.heading, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Practical Talent Guidance for ", React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Both Sides of the Table")),
          React.createElement(GoldLine, { width: "48px", align: "center" }),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginTop: "40px" }, className: "value-grid" },
            pillars.map((pillar) => React.createElement("div", { key: pillar, style: { background: t.valuePillBg, border: "1px solid rgba(198,166,100,0.16)", padding: "28px 24px", textAlign: "left" } },
              React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", color: t.text, lineHeight: 1.6, margin: 0 } }, pillar)
            ))
          )
        )
      )
    );
  }

  function Contact() {
    const { t } = useTheme();
    const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const inputStyle = {
      width: "100%", padding: "16px 20px", fontFamily: "'Cormorant Garamond', serif", fontSize: "16px",
      background: "rgba(250,247,242,0.06)", border: "1px solid rgba(198,166,100,0.2)", borderRadius: "2px",
      color: t.darkText, outline: "none", boxSizing: "border-box", letterSpacing: "0.5px"
    };
    return React.createElement("section", { id: "contact", style: { background: `linear-gradient(165deg, ${t.darkBg} 0%, ${t.darkBg} 100%)`, padding: "120px 32px", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "700px", margin: "0 auto" } },
        React.createElement(FadeIn, null, React.createElement("div", { style: { textAlign: "center", marginBottom: "56px" } },
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", letterSpacing: "4px", textTransform: "uppercase", color: GOLD, marginBottom: "16px", fontWeight: 600 } }, "Contact"),
          React.createElement("h2", { style: { fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 700, color: t.darkText, lineHeight: 1.15, margin: "0 0 20px 0" } }, "Let's ", React.createElement("span", { style: { color: GOLD, fontStyle: "italic" } }, "Talk")),
          React.createElement(GoldLine, { width: "60px", align: "center" }),
          React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", color: t.darkTextMuted, lineHeight: 1.7, marginTop: "20px" } }, "Whether you are navigating a career transition, refining your professional story, or strengthening a hiring strategy."),
          React.createElement("div", { style: { display: "flex", justifyContent: "center", gap: "32px", marginTop: "24px", flexWrap: "wrap" } },
            React.createElement("a", { href: "mailto:TriciaForchetti@gmail.com", style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GOLD, textDecoration: "none" } }, "TriciaForchetti@gmail.com"),
            React.createElement("span", { style: { color: t.darkTextMuted } }, "|"),
            React.createElement("a", { href: "tel:+13016060914", style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", color: GOLD, textDecoration: "none" } }, "(301) 606-0914")
          )
        )),
        submitted
          ? React.createElement(FadeIn, null, React.createElement("div", { style: { textAlign: "center", padding: "48px", background: "rgba(198,166,100,0.08)", border: "1px solid rgba(198,166,100,0.2)", borderRadius: "2px" } },
              React.createElement("h3", { style: { fontFamily: "'Playfair Display', serif", fontSize: "28px", color: t.darkText, margin: "0 0 12px 0" } }, "Thank You"),
              React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", color: t.darkTextMuted } }, "I'll be in touch within 24 hours.")
            ))
          : React.createElement(FadeIn, { delay: 0.2 }, React.createElement("div", null,
              React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }, className: "contact-grid" },
                React.createElement("input", { placeholder: "Your Name", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), style: inputStyle }),
                React.createElement("input", { type: "email", placeholder: "Your Email", value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), style: inputStyle })
              ),
              React.createElement("select", { value: formData.service, onChange: (e) => setFormData({ ...formData, service: e.target.value }), style: { ...inputStyle, marginBottom: "20px", appearance: "none", cursor: "pointer", color: formData.service ? t.darkText : "rgba(250,247,242,0.4)" } },
                React.createElement("option", { value: "", disabled: true }, "Select a Service"),
                React.createElement("option", { value: "career" }, "Career Strategy & Coaching"),
                React.createElement("option", { value: "resume" }, "Resume & LinkedIn Optimization"),
                React.createElement("option", { value: "talent" }, "Talent Acquisition Consulting"),
                React.createElement("option", { value: "leadership" }, "Leadership Hiring Strategy"),
                React.createElement("option", { value: "other" }, "Something Else")
              ),
              React.createElement("textarea", { placeholder: "Tell me about your situation...", value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), rows: 5, style: { ...inputStyle, marginBottom: "28px", resize: "vertical", minHeight: "120px" } }),
              React.createElement("button", { type: "button", onClick: () => setSubmitted(true), style: { width: "100%", padding: "18px", fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 600, color: "#1C3148", background: `linear-gradient(135deg, ${GOLD}, ${MUTED_GOLD})`, border: "none", borderRadius: "2px", cursor: "pointer", boxShadow: "0 4px 20px rgba(198,166,100,0.2)" } }, "Send Message")
            )),
        React.createElement(FadeIn, { delay: 0.4 }, React.createElement("div", { style: { marginTop: "56px", textAlign: "center" } },
          React.createElement("a", { href: "https://www.linkedin.com/in/triciaforchetti", target: "_blank", rel: "noopener noreferrer", style: { textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", color: GOLD, borderBottom: "1px solid rgba(198,166,100,0.3)", paddingBottom: "4px" } }, "Connect on LinkedIn \u2192")
        ))
      )
    );
  }

  function Footer() {
    const { t } = useTheme();
    return React.createElement("footer", { style: { background: t.darkBg, padding: "48px 32px", borderTop: "1px solid rgba(198,166,100,0.1)", transition: "background 0.5s ease" } },
      React.createElement("div", { style: { maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" } },
        React.createElement("div", null,
          React.createElement("span", { style: { fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: t.darkText } }, "Tricia Forchetti"),
          React.createElement("span", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", color: GOLD, letterSpacing: "2px", marginLeft: "8px" } }, "RACR")
        ),
        React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: t.darkTextMuted, letterSpacing: "1px", margin: 0 } }, "\u00A9 ", new Date().getFullYear(), " Tricia Forchetti. All rights reserved."),
        React.createElement("p", { style: { fontFamily: "'Cormorant Garamond', serif", fontSize: "13px", color: t.darkTextMuted, letterSpacing: "1px", margin: 0 } }, "Frederick, Maryland \u2022 Open to Relocation")
      )
    );
  }

  function Portfolio() {
    const [activeSection, setActiveSection] = useState("hero");
    const [mode, setMode] = useState("light");
    const t = themes[mode];
    const toggle = () => setMode(mode === "light" ? "dark" : "light");

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

    useEffect(() => {
      document.body.style.background = t.bg;
    }, [t.bg]);

    return React.createElement(ThemeContext.Provider, { value: { mode, toggle, t } },
      React.createElement("div", { style: { background: t.bg, minHeight: "100vh", transition: "background 0.5s ease" } },
        React.createElement("style", null, `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { scroll-behavior: smooth; }
          body { margin: 0; transition: background 0.5s ease; }
          ::selection { background: rgba(198,166,100,0.3); }
          select option { background: ${t.selectBg}; color: ${t.darkText}; }
          input::placeholder, textarea::placeholder { color: rgba(250,247,242,0.35); }
          @media (max-width: 768px) {
            .nav-desktop { display: none !important; }
            .nav-hamburger { display: block !important; }
            .nav-mobile-right { display: flex !important; }
            .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .services-grid { grid-template-columns: 1fr !important; }
            .contact-grid { grid-template-columns: 1fr !important; }
            .value-grid { grid-template-columns: 1fr !important; }
          }
          @media (min-width: 769px) {
            .nav-hamburger { display: none !important; }
            .nav-mobile-right { display: none !important; }
          }
        `),
        React.createElement(Nav, { activeSection }),
        React.createElement(Hero),
        React.createElement(About),
        React.createElement(Services),
        React.createElement(Experience),
        React.createElement(Expertise),
        React.createElement(ValueProps),
        React.createElement(Contact),
        React.createElement(Footer)
      )
    );
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(React.createElement(Portfolio));
})();
