# MWALIMU-AI-TUTOR
# 🎓 Mwalimu AI — Intelligent STEM Tutor for Kenyan Students

---

## 📌 Problem Statement

Kenya has one of the highest student-to-teacher ratios in the world — sometimes **60+ students per classroom**. In such environments, individual attention is nearly impossible. Students in rural and peri-urban areas struggle with STEM subjects (Physics, Biology, Mathematics, Chemistry) not because they lack intelligence, but because:

- Lessons are delivered in **formal English**, which is a second or third language for many students
- Teachers cannot provide **personalized explanations** at each student's pace
- Concepts are taught **abstractly**, with no connection to students' daily lived experiences
- There is **no after-school support** for students who didn't understand a concept in class

**Mwalimu AI** solves this by putting a patient, always-available, culturally-aware STEM tutor in every student's pocket.

---

## 💡 Solution — What is Mwalimu AI?

**Mwalimu AI** (Mwalimu = "Teacher" in Kiswahili) is an AI-powered STEM tutoring web application designed specifically for Kenyan secondary school students (Form 1–4). It combines the familiarity of a **WhatsApp/Telegram-style chat interface** with intelligent, localized tutoring.

### ✨ Key Features

| Feature | Description |
|---|---|
| 🇰🇪 **Code-Switching** | Responds naturally in a mix of English and Kiswahili/Sheng, making complex concepts feel approachable |
| 🏡 **Local Analogies** | Explains Voltage using water tanks, Photosynthesis using mama cooking chapati, pH using ugali salt |
| 📱 **Familiar UI** | WhatsApp-style chat interface — students already know how to use it |
| ⚡ **Topic Shortcuts** | One-tap access to Physics, Biology, Maths, and Chemistry lessons |
| 🔄 **Language Toggle** | Switch between Sheng/Mix mode and Strict English mode instantly |
| 💬 **Socratic Method** | Every explanation ends with a follow-up question to check understanding |
| 🎨 **Kenyan Branding** | Uses Kenyan flag colors (green, red, black, gold) and earth tones |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│         React + Vite (Single Page App)           │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Chat UI  │  │  Topic   │  │   Language    │  │
│  │(WhatsApp │  │Shortcuts │  │    Toggle     │  │
│  │  Style)  │  │          │  │ EN ↔ Sheng   │  │
│  └──────────┘  └──────────┘  └───────────────┘  │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │         AI Response Engine                  │ │
│  │  - Keyword detection (topic routing)        │ │
│  │  - Localized analogy library                │ │
│  │  - Dual-language response templates         │ │
│  │  - Anthropic Claude API integration         │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────┐
│              DEPLOYMENT                          │
│         Google Cloud Run (Containerized)         │
│         Docker → Cloud Build → Cloud Run         │
└─────────────────────────────────────────────────┘
```

### 🔧 Tech Stack

- **Frontend:** React 18, Vite, plain CSS-in-JS (no external UI library)
- **AI Engine:** Anthropic Claude API (`claude-sonnet-4-20250514`)
- **Containerization:** Docker
- **Deployment:** Google Cloud Run
- **Language:** JavaScript (JSX)

### 🧠 Architectural Choices

1. **React + Vite** — Chosen for fast build times, hot module replacement during development, and lightweight bundle size suitable for low-bandwidth environments.

2. **CSS-in-JS (no Tailwind/MUI)** — Keeps the bundle small and gives full control over the WhatsApp-style aesthetics without importing heavy UI frameworks.

3. **Dual Response Mode** — The language toggle (Sheng vs Strict English) uses a client-side state switch that changes the system prompt sent to the Claude API, ensuring the AI's personality and vocabulary shift entirely based on the student's preference.

4. **Keyword-based Topic Routing** — Before calling the API, a lightweight keyword detector identifies the subject area, allowing topic-specific analogy templates to be pre-loaded for faster, more consistent responses.

5. **Google Cloud Run** — Chosen for its serverless, auto-scaling nature. It scales to zero when not in use (cost-effective for a student tool) and scales up instantly during peak usage like exam season.

---

## 🚀 Getting Started — Run Locally

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/mwalimu-ai.git

# 2. Navigate into the project
cd mwalimu-ai

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Open in Browser

```
http://localhost:5173
```

---

## 🐳 Docker & Cloud Run Deployment

### Build Docker Image

```bash
docker build -t mwalimu-ai .
```

### Run Locally with Docker

```bash
docker run -p 8080:8080 mwalimu-ai
```

### Deploy to Google Cloud Run

```bash
# 1. Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/mwalimu-ai

# 2. Deploy to Cloud Run
gcloud run deploy mwalimu-ai \
  --image gcr.io/YOUR_PROJECT_ID/mwalimu-ai \
  --platform managed \
  --region africa-south1 \
  --allow-unauthenticated
```

### Dockerfile

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📖 How to Use

1. **Open the app** in your browser
2. **Choose a topic** by clicking one of the shortcut buttons:
   - ⚡ Physics
   - 🌿 Biology
   - 📐 Maths
   - 🧪 Chemistry
3. **Or type your own question** in the chat box and press Enter
4. **Toggle the language** using the button in the top-right corner:
   - 🇰🇪 **Sheng/Mix** — Kiswahili + English blend (default)
   - 📚 **Strict English** — Formal academic English

---

## 🌍 Localization Examples

| Concept | Standard Explanation | Mwalimu AI Analogy |

| Voltage | Electrical potential difference | Height of a water tank on your roof — higher tank = more pressure |
| Current | Flow of electric charge | Water flowing through the pipes in your homestead |
| Resistance | Opposition to current flow | Narrow pipe that slows water down |
| Photosynthesis | Light-dependent synthesis of glucose | Mama cooking chapati — sun is the stove, CO₂ is the flour, water is the liquid |
| pH Scale | Measure of acidity/alkalinity | Lemon juice (sour = acid) vs baking soda (fizzes = base) |
| Quadratic Roots | Solutions to ax²+bx+c=0 | Finding how many days two workers take to finish a job together |

---

## 🎯 Impact & Vision

- 🏫 Targets **Form 1–4 students** aligned with Kenya's 8-4-4 and CBC curriculum
- 📶 Designed to work on **low-end devices** with minimal data usage
- 🌐 Future plans: **offline mode** via PWA, **SMS/WhatsApp integration** for areas without internet, **voice input** support in Kiswahili
- 📊 Aligned with **Kenya's Digital Literacy Programme** and **Vision 2030** education goals

---


> *"Elimu ni ufunguo wa maisha"* — Education is the key to life. 🇰🇪
