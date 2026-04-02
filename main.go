package main

import (
	"embed"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"time"
)

//go:embed templates/*.html
var templateFS embed.FS

//go:embed static/*
var staticFS embed.FS

type Service struct {
	Icon        string
	Title       string
	Description string
	Features    []string
}

type Role struct {
	Company    string
	Role       string
	Period     string
	Highlights []string
}

type Category struct {
	Title string
	Items []string
}

type Education struct {
	School   string
	Degree   string
	Location string
}

type PageData struct {
	Year       int
	Services   []Service
	Roles      []Role
	Categories []Category
	Pillars    []string
	Stats      []Stat
	Tags       []string
	Education  Education
}

type Stat struct {
	Number string
	Label  string
}

func main() {
	funcMap := template.FuncMap{
		"mul": func(a int, b float64) float64 { return float64(a) * b },
		"add": func(a, b int) int { return a + b },
	}
	tmpl := template.Must(template.New("index.html").Funcs(funcMap).ParseFS(templateFS, "templates/index.html"))

	data := PageData{
		Year: time.Now().Year(),
		Stats: []Stat{
			{Number: "30+", Label: "Years in Talent Acquisition"},
			{Number: "3", Label: "Languages Spoken"},
			{Number: "$2M+", Label: "Contract Value Secured"},
			{Number: "300+", Label: "Open Requisitions Managed"},
		},
		Tags: []string{"RACR Certified", "Open to Relocation", "English (Native)", "French", "Spanish"},
		Education: Education{
			School:   "University of Lynchburg",
			Degree:   "Bachelor of Arts",
			Location: "Lynchburg, Virginia",
		},
		Services: []Service{
			{
				Icon:        "✦",
				Title:       "Career Strategy & Coaching",
				Description: "Focused guidance for professionals navigating pivots, layoffs, leadership growth, or repositioning. I help translate experience into a clear, compelling next move.",
				Features:    []string{"Career Pivot Strategy", "Interview Preparation", "Personal Positioning", "Offer & Salary Guidance"},
			},
			{
				Icon:        "◆",
				Title:       "Resume & LinkedIn Optimization",
				Description: "I build concise, ATS-aware career materials that help hiring leaders quickly understand your value and give recruiters stronger reasons to respond.",
				Features:    []string{"ATS-Aligned Resume Refresh", "LinkedIn Profile Rewrite", "Executive Bio Support", "Targeted Messaging"},
			},
			{
				Icon:        "⬥",
				Title:       "Talent Acquisition Consulting",
				Description: "I advise organizations on hiring strategy, full-cycle recruitment, talent pipeline development, and metrics that improve decision-making and candidate experience.",
				Features:    []string{"Talent Strategy Sessions", "Job Description Refinement", "Hiring Process Guidance", "Recruiting Metrics & Reporting"},
			},
		},
		Roles: []Role{
			{
				Company: "The Walt Disney Company",
				Role:    "Lead Recruiter, Professional Recruitment — Disney Experiences",
				Period:  "Jul 2022 – Mar 2026",
				Highlights: []string{
					"Led full-cycle professional recruitment for Disney Experiences Commercial Strategy teams.",
					"Served as the exclusive lead recruiter for Manager-to-Director hiring within the leadership pipeline.",
					"Partnered closely with hiring leaders and HR business partners to align recruiting strategy with business goals.",
					"Reported talent metrics and workforce trends while building diverse pipelines through LinkedIn Recruiter and Indeed.",
				},
			},
			{
				Company: "Korn Ferry",
				Role:    "Senior Recruiter — RPO Division",
				Period:  "Jan 2022 – Jun 2022",
				Highlights: []string{
					"Delivered full-cycle recruitment for high-volume global clients within a recruitment process outsourcing model.",
					"Ran talent strategy sessions to define role requirements and sourcing priorities.",
					"Sourced and screened qualified candidates while maintaining focus on contractual recruiting metrics.",
					"Used social recruiting, database mining, and advanced search techniques to attract global talent pools.",
				},
			},
			{
				Company: "Sheppard Pratt Health System",
				Role:    "Talent Acquisition Manager → Senior Recruiter",
				Period:  "Oct 2015 – Dec 2021",
				Highlights: []string{
					"Owned talent acquisition for the organization's most profitable business unit.",
					"Led, coached, and guided four virtual recruiters and two coordinators.",
					"Oversaw full-cycle hiring for high-turnover, supervisory, and executive roles.",
					"Created interactive training that reinforced Federal and State Labor Law compliance for new supervisors.",
				},
			},
			{
				Company: "The Adecco Group",
				Role:    "On-Site Manager, Lockheed Martin Corporation → Recruiter",
				Period:  "1992 – 2000, 2014 – 2015",
				Highlights: []string{
					"Secured and executed an RPO contract with Lockheed Martin headquarters worth more than $2M.",
					"Reduced vacancies by 20% by identifying and attracting critical shortage personnel.",
					"Managed recruitment, screening, testing, and selection across 300+ open requisitions.",
					"Led recruiters and reported metrics including time-to-hire, offer acceptance, candidates per hire, and churn rate.",
				},
			},
		},
		Categories: []Category{
			{Title: "Core Expertise", Items: []string{"People Leadership", "Talent Management", "Human Resource Management", "Full-Cycle Recruitment", "Talent Strategy Sessions", "Policy Implementation"}},
			{Title: "Software & Platforms", Items: []string{"LinkedIn Recruiter", "Indeed Recruiter", "Applicant Pro", "Position Manager", "Workday Talent Management", "WebEx"}},
			{Title: "Technology", Items: []string{"Microsoft 365 Copilot", "Excel", "PowerPoint", "Teams", "Google Workspace", "Smartsheet & Zoom"}},
		},
		Pillars: []string{
			"Advise companies on talent acquisition strategy and hiring processes.",
			"Help leaders make smarter, more effective hiring decisions.",
			"Guide professionals through career pivots, growth, and market positioning.",
			"Translate complex talent challenges into clear, actionable solutions.",
		},
	}

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		w.Header().Set("Content-Type", "text/html; charset=utf-8")
		if err := tmpl.Execute(w, data); err != nil {
			log.Printf("template error: %v", err)
			http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		}
	})

	http.Handle("/static/", http.FileServerFS(staticFS))

	port := 8080
	log.Printf("Listening on :%d", port)
	if err := http.ListenAndServe(":"+strconv.Itoa(port), nil); err != nil {
		log.Fatal(err)
	}
}
