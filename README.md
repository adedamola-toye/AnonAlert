# 🛡️ AnonAlert — Secure & Intelligent Reporting System

AnonAlert is a backend API designed to address the **crisis of trust and response time in reporting**.
By combining **guaranteed reporter anonymity** with an automated **Triage Engine**, the system ensures sensitive cases such as gender-based violence, abuse, and other emergencies are routed to the appropriate organizations.

---

## 🚀 Key Technical Features

### Intelligent Triage Engine (Cron-Based)

* **Automated Routing**
  Eliminates manual report assignment using an hourly cron job that scans for unassigned reports.

* **Strict Matching Logic**
  Uses a dual-criteria Mongoose query to match reports to organizations based on:

  * Report category
  * Geographic state

* **Credibility Scoring System**
  Implements a custom scoring algorithm to rank reports so responders can prioritize high-urgency cases first.

---

### Unbreakable Anonymity Protocol

* **No-Account Architecture**
  Reporters never create accounts. Each report generates a unique **Tracking ID**, requiring zero personal data.

* **Dual-Layer Security**

  * **Organizations:** Authenticated via JWT stored in **HttpOnly cookies**
  * **Reporters:** Access granted through a **temporary, report-specific JWT** issued only after Tracking ID verification

---

### Scalable Data Modeling

* **Mongoose Population Optimization**
  Consolidates Report, Location, Media, Chat, and Organization data into a single response to reduce database round-trips.

* **Normalized Schema Design**

  * Separate collections for Media, Chat, and Location
  * Supports 1-to-many relationships while maintaining data integrity

---

##  System Architecture

AnonAlert follows a **3-Tier Architecture** emphasizing separation of concerns:

* **Controllers**
  Handle request/response cycles and input validation

* **Services**
  Contain core business logic such as:

  * Triage engine
  * Credibility scoring

* **Middleware**
  Responsible for:

  * Joi validation
  * Authentication
  * Global error handling

---

## 🛠️ Tech Stack

| Layer           | Technology             |
| --------------- | ---------------------- |
| Runtime         | Node.js                |
| Framework       | Express.js             |
| Database        | MongoDB (Mongoose ODM) |
| Authentication  | JWT (JSON Web Tokens)  |
| Security        | Bcrypt.js              |
| Validation      | Joi                    |
| Task Scheduling | node-cron              |

---

## Database Relationships

* **Report** → Central hub linking all entities
* **Organization** → One-to-many relationship with reports
* **Media & Chat** → One-to-many relationships via `reportId`
* **Location** → Normalized geographic data tied to reports

---

## API Endpoints 

### 👤 Reporter Routes

| Method | Endpoint                   | Description                                     |
| ------ | -------------------------- | ----------------------------------------------- |
| POST   | `/api/reports/submit`      | Submit a new anonymous report                   |
| GET    | `/api/reports/:trackingId` | Retrieve report status and temporary JWT        |
| POST   | `/api/reports/chat/send`   | Send anonymous message to assigned organization |

---

### 🏢 Organization Routes

| Method | Endpoint                    | Description                                     |
| ------ | --------------------------- | ----------------------------------------------- |
| POST   | `/api/org/login`            | Authenticate organization and set secure cookie |
| GET    | `/api/org/reports`          | View reports assigned to the organization       |
| GET    | `/api/org/reports/priority` | View reports sorted by credibility score        |

---

## ⚙️ Installation & Setup

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/anonalert.git

# Navigate into project
cd anonalert

# Install dependencies
npm install

# Create environment file
touch .env
```

Add the following variables to your `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
COOKIE_SECRET=your_cookie_secret
```

```bash
# Run development server
npm run dev

# Run production server
npm start
```

---

## Future Improvements

* Real-time WebSocket messaging between reporters and NGOs
* Machine-learning-based credibility prediction
* Geo-mapping dashboard for response teams
* Mobile client integration

---

## Contribution

This project is currently maintained as a **solo backend system**, but contributions and ideas are welcome.
Feel free to fork the repo, open issues, or suggest improvements.

---

