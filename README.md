[complai_README.md](https://github.com/user-attachments/files/27558346/complai_README.md)
# complai# COMPLAI — Protección legal para autónomos en España

**Legal knowledge should not be a privilege.**

COMPLAI gives every autonomo in Spain the tools to understand their rights, detect if they are being exploited as a *falso autónomo*, and defend themselves when the system comes knocking.

> Built by someone who went through a 6-month labour inspection and came out the other side knowing exactly what inspectors look for — and what autonomos need to protect themselves.

---

## What COMPLAI does

COMPLAI is an AI-powered compliance checker for Spanish autonomos and the companies that work with them.

**For workers:**
- Detects if you are being treated as a *falso autónomo* (hidden employee)
- Explains exactly what rights you can claim
- Analyses your specific situation using real inspection criteria
- Powered by Claude AI with knowledge of 2025 jurisprudencia and Plan ITSS 2025-2027

**For companies:**
- Checks if your autonomo arrangements are at risk of inspection
- Flags specific vulnerabilities against the 5 real inspector criteria
- Gives actionable recommendations before an inspection arrives
- Monitors BOE publications for relevant legal changes (coming soon)

---

## The 5 real inspection criteria

Spanish labour inspectors use these 5 criteria to detect *falsos autónomos*:

1. **Dependencia** — Does the worker take orders and follow company schedules?
2. **Ajenidad en los frutos** — Does the company collect payment from end clients?
3. **Ajenidad en el mercado** — Does the company brand attract clients, not the worker?
4. **Ajenidad en los riesgos** — Does the company bear economic risk, not the worker?
5. **Ajenidad en los medios** — Does the worker use company tools and equipment?

COMPLAI scores your situation against all five — built from real inspection experience, not legal textbooks.

---

## Tech stack

- **Frontend**: HTML, CSS, vanilla JavaScript
- **AI analysis**: Claude API (Anthropic) — `claude-sonnet-4-20250514`
- **Legal knowledge base**: Plan ITSS 2025-2027, Tribunal Supremo jurisprudencia, Directiva UE 2024/2831
- **Hosting**: GitHub Pages (static, no backend required for MVP)

---

## Project structure

```
complai/
├── index.html          # Main app
├── README.md           # This file
├── public/
│   └── favicon.ico
└── src/
    ├── inspector.js    # Core scoring logic
    ├── findings.js     # Finding descriptions per criterion
    ├── actions.js      # Recommended actions by risk level
    └── api.js          # Claude API integration
```

---

## Roadmap

- [x] Worker mode — detect if you are a *falso autónomo*
- [x] Company mode — check inspection risk
- [x] AI open question analysis (Claude API)
- [ ] BOE monitoring agent — weekly digest of relevant legal changes
- [ ] FUNDAE compliance module
- [ ] Tax notification system (AEAT deadlines)
- [ ] Document generator — autonomy evidence templates
- [ ] WhatsApp notification alerts
- [ ] Polish and English versions

---

## Legal basis

COMPLAI is built on:
- **Estatuto de los Trabajadores** — Art. 1 (definition of employment relationship)
- **LISOS** — sanctions for false autonomo arrangements
- **Plan Estratégico ITSS 2025-2027** — current inspection priorities
- **Directiva UE 2024/2831** — platform work, no retroactive effect before Dec 2026
- **Tribunal Supremo** — jurisprudencia on language academies, logistics, gig economy

---

## Disclaimer

COMPLAI provides general legal information based on publicly available Spanish law and jurisprudencia. It is not a substitute for personalised legal advice. If you believe you are a *falso autónomo*, consult a qualified labour lawyer (*abogado laboralista*).

---

## Contact

Built by Robert Wernerowski
[LinkedIn](https://linkedin.com/in/robert-wernerowski-20104636)

---

*Legal protection for every autonomo. Not just those who can afford it.*
