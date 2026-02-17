# Master Prompt: Investment Distribution Website

Use this prompt in another Cursor instance to create a different interpretation of this website. The goal is to build an alternate version that preserves the core concept but reimagines the implementation (design, structure, flow, or approach).

---

## What This Website Is

**Investment distribution system** — A trackable investment opportunity landing page and investor distribution platform. Fund managers or partners share personalized links; when investors visit, they see a deal page and can express interest via a link to WhatsApp. An admin dashboard lets you manage opportunities, investors, and view analytics.

---

## The Bones

### 1. Public Landing Page (Home)

- Long-form investment opportunity page
- **Bilingual**: English and Arabic (RTL support for Arabic)
- **Primary CTA**: Link to WhatsApp — opens a chat with a pre-filled message to express interest
- **Personalized links**: URL param `?ref=<code>` for attribution; each investor can get a unique link
- **Language toggle**: URL param `?lang=en|ar` switches language and preserves the ref code

### 2. Admin Dashboard (`/admin/*`)

- **Dashboard overview**: Opportunities, investors, clicks, etc.
- **Opportunities**: Manage investment deals
- **Investors**: Manage investor list; assign to opportunities; generate unique shareable links
- **Analytics**: View click data — per-investor links, total clicks, CTA clicks, device type (mobile vs desktop)

---

## Intended Use

- **Distribution**: Share personalized links with investors; track who clicked
- **Conversion**: Drive interest to WhatsApp as the main conversion path
- **Reach**: Serve Arabic-speaking and English-speaking investors
- **Operations**: Admin uses the dashboard to manage the pipeline and monitor engagement
