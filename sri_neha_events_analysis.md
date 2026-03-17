# 🎉 Sree Neha Events — Complete Deep Project Analysis

> **Interview, Viva & Real-World Ready** | React + Node.js + MongoDB + Cloudinary

---

## 1. 🎯 Project Overview

### What is this project?
**Sree Neha Events** is a full-stack web application for an **event management business** based in Machilipatnam, Andhra Pradesh. It works like a digital catalogue + admin control panel for the business owner.

**Telugu లో చెప్పాలంటే:** ఇది ఒక event management business కోసం తయారు చేసిన website. వారి services చూపించడానికి, photos upload చేయడానికి, మరియు admin ఆ content manage చేయడానికి ఉపయోగపడుతుంది.

### What problem does it solve?
| Problem | Solution |
|---|---|
| No digital presence for the business | Live website accessible worldwide |
| Owner needs to update services manually | Admin dashboard to add/edit/delete services |
| Storing images on server (lost on restart) | Cloudinary cloud image storage |
| Secure admin login | OTP-based authentication (no passwords needed) |

### Who are the Target Users?
- **Public users (visitors):** People looking for event services (weddings, birthdays, etc.) — they browse services, view details
- **Admin (business owner):** Single admin who logs in with OTP to manage banners and services

---

## 2. 🏗️ Architecture

### Architecture Type
**Frontend + Backend (Client-Server Architecture)** — also known as a **3-Tier Architecture**:

```
Tier 1 → Presentation Layer  (React - Vercel)
Tier 2 → Business Logic Layer (Node.js/Express - Render)
Tier 3 → Data Layer           (MongoDB Atlas - Cloud DB)
```

### Complete Flow Diagram

```
USER ACTION (clicks button / fills form)
        │
        ▼
  [React Frontend] ──Axios HTTP Request──▶ [Express Backend on Render]
        │                                            │
        │                               ┌───────────┴────────────┐
        │                               ▼                        ▼
        │                      [JWT Auth Middleware]    [Multer/Cloudinary]
        │                               │                        │
        │                               ▼                        ▼
        │                       [Route Handler]         [Cloudinary Cloud]
        │                               │                        │
        │                               ▼                        │
        │                       [Mongoose ORM]                   │
        │                               │                        │
        │                               ▼                        │
        │                      [MongoDB Atlas DB]◀───────────────┘
        │                               │           (imageUrl saved to DB)
        │◀──────── JSON Response ────────┘
        │
        ▼
  [React UI Updates] (state change → re-render)
```

### Specific Flow Examples

**Visitor viewing services:**
`/ (homepage)` → React loads → `GET /api/services` + `GET /api/banners` → MongoDB returns data → UI shows cards

**Admin adding a service:**
`/admin` → fills form → `POST /api/services` with JWT token + image file → multer uploads to Cloudinary → URL saved to MongoDB → service appears on homepage

**Admin login:**
`/login` → enters email → `POST /api/auth/send-otp` → OTP emailed → enters OTP → `POST /api/auth/verify-otp` → JWT token returned → stored in `localStorage` → redirected to `/admin`

---

## 3. 🖥️ Frontend Details

### Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| **React** | 18/19 | Main UI framework (component-based) |
| **Vite** | 7 | Build tool / Dev server (super fast) |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 12 | Smooth animations (page transitions, cards) |
| **Axios** | 1.13 | Makes HTTP API calls to the backend |
| **Lucide React** | 0.574 | Icon library (Lock, Mail, etc.) |
| **React Router DOM** | 7 | Client-side routing without page reload |

### How UI is Structured (Pages & Components)

```
App.jsx  (Root — sets up Router + AuthProvider + Navbar + Footer)
│
├── Pages
│   ├── /           → BannerCarousel + ServiceList (Public Homepage)
│   ├── /about      → About.jsx (Company info)
│   ├── /login      → Login.jsx (OTP login form)
│   └── /admin      → AdminDashboard.jsx (Protected — only for admin)
│
└── Components
    ├── Navbar.jsx        → Top navigation bar
    ├── BannerCarousel    → Auto-sliding image banner (homepage top)
    ├── ServiceList.jsx   → Grid of filtered service cards
    ├── ServiceCard.jsx   → Individual service display card
    ├── ServiceModal.jsx  → Popup with full service details
    └── ProtectedRoute.jsx → Route guard (blocks non-admin from /admin)
```

### How Frontend Communicates with Backend

Using **Axios** with the base URL from [config.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/config.js):

```javascript
// config.js — one file controls dev/production URL
const API_BASE_URL = 'https://sree-neha-events-backend.onrender.com';
export default API_BASE_URL;
```

**Example API Call Pattern:**
```javascript
// Example: Fetch services
import axios from 'axios';
import API_BASE_URL from '../config';

const response = await axios.get(`${API_BASE_URL}/api/services`);

// Example: Admin upload with JWT token
await axios.post(`${API_BASE_URL}/api/services`, formData, {
  headers: {
    'Authorization': `Bearer ${token}`,  // JWT from localStorage
    'Content-Type': 'multipart/form-data'
  }
});
```

### Context (Global State)
`AuthContext.jsx` manages global authentication state:
- Stores `token` and `user` info
- Provides `sendOtp()` and `verifyOtp()` functions to all components
- Used by [Login.jsx](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/pages/Login.jsx) and `ProtectedRoute.jsx`

---

## 4. ⚙️ Backend Details

### Technology Stack
- **Language:** Node.js (JavaScript on the server side)
- **Framework:** Express.js v5 (handles HTTP routing)
- **Database ORM:** Mongoose (for MongoDB)
- **Runtime:** `node index.js` (no TypeScript)

**Telugu లో:** Node.js అంటే JavaScript ని server లో run చేయడానికి వాడతాం. Express.js అనేది API routes define చేయడానికి ఉపయోగించే framework.

### How the Server Handles Requests ([index.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/index.js))

```
Server Startup sequence:
1. Load environment variables (dotenv)
2. Create Express app
3. Apply CORS middleware (only allow Vercel + localhost)
4. Parse JSON body (express.json())
5. Register routes: /api/auth, /api/services, /api/banners
6. Connect to MongoDB Atlas
7. Global error handler
8. Listen on PORT 5000
```

### Routing
| Route Prefix | File | Description |
|---|---|---|
| `/api/auth` | [authRoutes.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/routes/authRoutes.js) | Login via OTP |
| `/api/services` | [serviceRoutes.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/routes/serviceRoutes.js) | CRUD for services |
| `/api/banners` | [bannerRoutes.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/routes/bannerRoutes.js) | CRUD for banners |

### Middleware
| Middleware | Where | Purpose |
|---|---|---|
| `cors()` | [index.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/index.js) | Whitelist specific origins |
| `express.json()` | [index.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/index.js) | Parse JSON request body |
| [auth.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/middleware/auth.js) | Protected routes | JWT token verification |
| `upload.single()` | POST/PUT routes | Handle file uploads via multer |
| [getService()](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/routes/serviceRoutes.js#107-122) | GET/:id, PUT/:id, DELETE/:id | Fetch service from DB before route handler |

### Controllers (Route Handlers)
Route handler logic lives directly inside each route file (not separate controller files). Each handler follows the pattern:
```
1. Receive request (req)
2. Validate data
3. Query/update MongoDB via Mongoose
4. Return JSON response (res)
```

---

## 5. 📡 API Design

### Auth Routes — `/api/auth`

| Method | Endpoint | Auth Required | Body | Response |
|---|---|---|---|---|
| POST | `/send-otp` | ❌ No | `{ email }` | `{ message }` |
| POST | `/verify-otp` | ❌ No | `{ email, otp }` | `{ token, userId, message }` |

### Banner Routes — `/api/banners`

| Method | Endpoint | Auth Required | Body | Response |
|---|---|---|---|---|
| GET | `/` | ❌ No | — | Array of banners |
| POST | `/` | ✅ JWT | `multipart: image file` | New banner object |
| DELETE | `/:id` | ✅ JWT | — | `{ message }` |

### Service Routes — `/api/services`

| Method | Endpoint | Auth Required | Body | Response |
|---|---|---|---|---|
| GET | `/` | ❌ No | — | Array of all services |
| GET | `/:id` | ❌ No | — | Single service object |
| POST | `/` | ✅ JWT | `multipart/form-data` with all fields + image | New service |
| PUT | `/:id` | ✅ JWT | Updated fields (partial update supported) | Updated service |
| DELETE | `/:id` | ✅ JWT | — | `{ message: 'Deleted Service' }` |

> **Professional Term:** This is a **RESTful API** — it uses standard HTTP methods (GET/POST/PUT/DELETE) and resource-based URLs.

---

## 6. 🗃️ Database

### Database Used
**MongoDB Atlas** — a cloud-hosted **NoSQL** document database.

**Telugu లో:** MongoDB అనేది data ని JSON లాంటి format (documents) లో store చేసే database. SQL tables కాదు — collections అంటారు వీటిని.

### Collections (like Tables in SQL)

#### 1. `users` Collection
```json
{
  "_id": "ObjectId",
  "email": "admin@gmail.com",       // Unique identifier for admin
  "otp": "$2b$10$hashedOTPvalue",   // bcrypt hashed OTP (never plain text)
  "otpExpires": "2026-03-17T12:30:00.000Z",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### 2. `banners` Collection
```json
{
  "_id": "ObjectId",
  "imageUrl": "https://res.cloudinary.com/dsa08eafg/image/upload/v123/file.jpg",
  "publicId": "folder/filename",    // Used to delete from Cloudinary
  "isActive": true,
  "createdAt": "..."
}
```

#### 3. `services` Collection
```json
{
  "_id": "ObjectId",
  "title": "Royal Wedding Package",
  "image": "https://res.cloudinary.com/...",
  "publicId": "events/weddingpkg",
  "category": "Wedding",
  "price": "₹25,000 - ₹50,000",
  "duration": "8 hours",
  "location": "Machilipatnam",
  "youtubeLink": "https://youtube.com/...",
  "description": "Full wedding decoration...",
  "terms": "50% advance required",
  "fromYourEnd": "Venue + Catering",
  "createdAt": "..."
}
```

### Relationships
MongoDB is **schema-less** — no foreign keys. Each collection is independent:
- `users` → stores only admin credentials
- `services` → stores all event offerings
- `banners` → stores homepage slideshow images
- No joins needed (unlike SQL)

### Data Flow — How a Service is Stored & Retrieved

**Store (Admin adds a service):**
```
Admin fills form → Frontend FormData → POST /api/services
→ Multer intercepts image → Streams to Cloudinary
→ Cloudinary returns {path: "https://...url", filename: "publicId"}
→ Express creates Service document with all fields
→ mongoose .save() writes to MongoDB Atlas
→ 201 Created response sent back
```

**Retrieve (Visitor loads homepage):**
```
React mounts → useEffect fires → axios.get('/api/services')
→ Express calls Service.find() → Mongoose queries MongoDB
→ Returns array of service documents as JSON
→ React maps over array → renders ServiceCard for each
```

---

## 7. 🔐 Authentication & Security

### How Login Works (Step by Step)

```
Step 1: Admin goes to /login page
Step 2: Enters email → clicks "Send OTP"
Step 3: Frontend calls POST /api/auth/send-otp with { email }
Step 4: Backend checks if email exists in users collection
Step 5: Generates random 6-digit OTP (Math.floor(100000 + Math.random() * 900000))
Step 6: Hashes OTP with bcrypt (salt rounds = 10)
Step 7: Saves hashed OTP + expiry (10 minutes) to user document
Step 8: Sends plain OTP via email using Brevo HTTP API
Step 9: Admin receives email, enters OTP
Step 10: Frontend calls POST /api/auth/verify-otp with { email, otp }
Step 11: Backend runs bcrypt.compare(enteredOTP, storedHashedOTP)
Step 12: Checks expiry: if Date.now() > otpExpires → rejected
Step 13: If valid: clears OTP from DB, generates JWT token (expires in 1 day)
Step 14: Frontend stores JWT in localStorage
Step 15: All future admin requests send: Authorization: Bearer <token>
```

**Telugu లో:** OTP అంటే One Time Password. Admin email enter చేస్తే, backend random 6 digit number generate చేసి, hash చేసి database లో save చేస్తుంది. ఆ number ని email లో పంపిస్తుంది. Admin ఆ number enter చేస్తే, hash compare చేసి valid అయితే JWT token ఇస్తుంది. ఆ token login proof గా పనిచేస్తుంది.

### Password Handling
- **No traditional passwords used** — OTP-only system
- OTPs are **hashed using bcrypt** (industry standard, one-way hash)
- OTPs **expire in 10 minutes** — replay attacks prevented
- OTPs are **cleared from DB after use** — one-time use guaranteed

### JWT (JSON Web Token)
```
Token Structure: header.payload.signature
Payload contains: { userId: "...", iat: 12345, exp: 12345 }
Expiry: 1 day (expiresIn: '1d')
```
The [auth.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/middleware/auth.js) middleware extracts and verifies this token on every protected route.

### Security Measures Summary
| Security Feature | Implementation |
|---|---|
| OTP hashing | bcrypt with salt rounds = 10 |
| OTP expiry | 10-minute TTL |
| JWT authentication | Signed with `JWT_SECRET` env variable |
| CORS whitelist | Only Vercel URL + localhost allowed |
| Admin route guard | `ProtectedRoute` component in React |
| Environment secrets | All keys in [.env](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/.env) (never committed to Git) |
| One-time OTP use | Cleared from DB immediately after verification |

---

## 8. ✨ Key Features

### Public Features
- 🖼️ **Auto-sliding banner carousel** at top of homepage
- 📋 **Service listing with category filter** (Wedding, Birthday, etc.)
- 🔍 **Service modal popup** with full details (price, duration, YouTube link)
- 📱 **Fully responsive** design (mobile-friendly)
- ⚡ **Framer Motion page transitions** (smooth UX)
- ℹ️ **About page** with company info

### Admin Features
- 🔐 **OTP-based secure login** (no password to forget/hack)
- ➕ **Add new services** with image upload
- ✏️ **Edit existing services** (partial updates supported)
- 🗑️ **Delete services** (auto-deletes image from Cloudinary too)
- 🖼️ **Banner management** (upload/delete homepage banners)

### Complex/Unique Features
1. **Cloudinary integration with auto-delete** — when a service/banner is deleted, the associated image is automatically removed from Cloudinary using `publicId`
2. **Two-step OTP login** — `step` state in [Login.jsx](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/pages/Login.jsx) controls which form shows (email or OTP)
3. **CORS dynamic checking** — origin checked dynamically (not just static string)
4. **Global error handler** — catches multer and other errors silently crashing the server
5. **Brevo HTTP API for email** — avoids SMTP port 465/587 blocking on cloud servers

---

## 9. 🛠️ Tools & Libraries

### Backend Dependencies

| Library | Why Used |
|---|---|
| `express` v5 | Web framework — handles routes and middleware |
| `mongoose` | ODM (Object Document Mapper) for MongoDB — simplifies DB queries |
| `cors` | Enables cross-origin requests between Vercel and Render |
| `jsonwebtoken` | Creates and verifies JWT tokens for admin auth |
| `bcryptjs` | Hashes OTPs securely — one-way encryption |
| `cloudinary` | SDK to interface with Cloudinary API (delete images) |
| `multer` | Middleware to handle `multipart/form-data` (file uploads) |
| `multer-storage-cloudinary` | Connects multer uploads directly to Cloudinary |
| `axios` | Makes HTTP requests to Brevo API to send emails |
| `nodemailer` | Email library (installed but Brevo HTTP preferred) |
| `dotenv` | Loads [.env](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/.env) secrets into `process.env` |
| `nodemon` | Auto-restarts server on code changes (dev tool) |

### Frontend Dependencies

| Library | Why Used |
|---|---|
| `react` v19 | UI library — component-based, virtual DOM |
| `react-dom` | Renders React into the actual browser DOM |
| `react-router-dom` v7 | Client-side routing (no full page reloads) |
| `axios` | HTTP requests to backend API |
| `framer-motion` | Animations — page transitions, hover effects |
| `lucide-react` | Clean icon pack (Lock, Mail, Menu icons) |
| `tailwindcss` | CSS utility classes — rapid, consistent styling |
| `vite` | Bundler/dev server — faster than CRA (Create React App) |

---

## 10. 🚀 Deployment

### Yes — The Project is Fully Deployed!

| Part | Platform | URL |
|---|---|---|
| **Frontend** | Vercel | https://sreenehaevents.vercel.app |
| **Backend** | Render (Free tier) | https://sree-neha-events-backend.onrender.com |
| **Database** | MongoDB Atlas | Cloud-hosted (free tier) |
| **Images** | Cloudinary | CDN URLs (`res.cloudinary.com/dsa08eafg/...`) |
| **Emails** | Brevo | Transactional email API |

### Deployment Details
**Frontend (Vercel):**
- Connected to GitHub repo
- Auto-deploys on every push to main branch
- Build command: `npm run build` (Vite)
- Output: `dist/` folder served as static files

**Backend (Render):**
- Free tier — server **sleeps after 15 minutes of inactivity**
- First request after sleep takes ~30 seconds (cold start)
- All [.env](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/.env) variables added in Render dashboard
- Start command: `node index.js`

**Telugu లో:** Frontend ని Vercel లో deploy చేశారు — ఇది automatic గా GitHub నుండి code తీసుకుని website build చేస్తుంది. Backend ని Render లో deploy చేశారు — ఇది Node.js server run చేస్తుంది.

---

## 11. 🧩 Challenges Faced

| Challenge | Cause | Solution Applied |
|---|---|---|
| **Images deleted on server restart** | Render free tier has ephemeral filesystem | Moved to **Cloudinary** cloud storage |
| **OTP emails not delivered** | SMTP ports 465/587 blocked by cloud servers | Used **Brevo HTTP REST API** on port 443 (HTTPS — always open) |
| **CORS errors** | Frontend on Vercel trying to call backend on Render | Added explicit CORS whitelist in [index.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/index.js) |
| **Multer not parsing files** | Route order / middleware config issues | Added global error handler to catch silent multer failures |
| **Cloudinary image orphaning** | Deleting DB record without deleting Cloudinary image | Saved `publicId` alongside `imageUrl`, call `cloudinary.uploader.destroy(publicId)` on delete |
| **Render cold starts** | Free tier sleeps after inactivity | Known limitation — upgrade to paid tier for production |

---

## 12. 🚀 Future Improvements

| Area | Improvement | Why? |
|---|---|---|
| **Scalability** | Add pagination to services API | Currently loads ALL services at once — bad for 100+ services |
| **Performance** | Implement React Query or SWR for caching | Avoids redundant API calls |
| **Search** | Add search bar in `ServiceList` | Better user experience |
| **Contact Form** | WhatsApp integration or inquiry form | Customers can directly enquire |
| **Analytics** | Add Google Analytics | Track which services get most views |
| **Security** | Rate limiting on `/send-otp` | Prevent OTP spam/abuse |
| **Admin** | Multiple admin roles (editor vs. super-admin) | More granular control |
| **Database** | Add indexes on `category` field | Faster filtering queries |
| **Email** | HTML email templates for OTP | Better branding |
| **Backend** | Separate controllers from routes | Better code organization (MVC pattern) |

---

## 13. 🎤 Interview Questions & Answers

### Basic Level Questions

**Q1: What is this project about?**
> "Sree Neha Events is a full-stack web application for an event management company. It has a public-facing website where visitors can browse event services like weddings and birthdays, and a secure admin panel where the business owner can manage services and banners through OTP-based login."

---

**Q2: What tech stack did you use?**
> "The frontend is built with React 18 and Vite, styled with Tailwind CSS, and uses Axios for API calls and Framer Motion for animations. The backend uses Node.js with Express.js and connects to MongoDB Atlas using Mongoose. For image storage I used Cloudinary, and for OTP emails I used Brevo's HTTP API. The app is deployed on Vercel (frontend) and Render (backend)."

---

**Q3: What is REST API?**
> "REST stands for Representational State Transfer. It's an architectural style for building web APIs. REST APIs use standard HTTP methods — GET to read data, POST to create, PUT to update, and DELETE to remove. URLs represent resources — like `/api/services` represents the services collection. Our app has a fully RESTful API."

---

**Q4: What is the difference between SQL and MongoDB?**
> "SQL is a relational database — data is stored in tables with fixed schemas and uses joins to relate tables. MongoDB is a NoSQL document database — data is stored in flexible JSON-like documents (collections). In our project, MongoDB was the right choice because the data structure (especially services with many optional fields) doesn't need strict schema enforcement."

---

**Q5: Why did you use JWT tokens?**
> "JWT (JSON Web Token) is a stateless authentication mechanism. After the admin logs in with OTP, the server generates a JWT signed with a secret key. The client stores it in localStorage and sends it with every protected request in the `Authorization: Bearer <token>` header. The server verifies the signature without needing to look up a session in the database — making it scalable."

---

**Q6: What is bcrypt and why did you use it?**
> "bcrypt is a password hashing algorithm. It converts a plain-text value (like an OTP) into a one-way hash that cannot be reversed. We hash OTPs before storing them in MongoDB. When the admin enters the OTP, we use `bcrypt.compare()` to check if the entered OTP matches the stored hash. This ensures that even if the database is compromised, OTPs cannot be read in plain text."

---

**Q7: What is CORS and why is it needed?**
> "CORS stands for Cross-Origin Resource Sharing. Browsers block JavaScript requests from one domain to another by default (for security). Since our React frontend is on `sreenehaevents.vercel.app` and our backend is on `sree-neha-events-backend.onrender.com`, the browser would block API calls. We configure CORS in Express to explicitly allow trusted origins to make requests."

---

**Q8: What is Cloudinary and why use it instead of local storage?**
> "Cloudinary is a cloud-based media management service. We use it instead of local disk storage because Render's free tier has an **ephemeral filesystem** — any uploaded file is deleted when the server restarts. With Cloudinary, images are stored permanently in the cloud and served via a CDN, meaning files survive server restarts and load faster globally."

---

**Q9: Explain the OTP login flow.**
> "1. Admin enters their email — frontend calls `POST /api/auth/send-otp`. 2. Backend checks if the email exists in the users collection (prevents unauthorized OTP requests). 3. A random 6-digit OTP is generated, hashed with bcrypt, and saved to the user document with a 10-minute expiry. 4. The plain OTP is emailed via Brevo's HTTP API. 5. Admin enters the OTP — frontend calls `POST /api/auth/verify-otp`. 6. Backend compares the entered OTP with the stored hash and checks expiry. 7. If valid, the OTP is cleared from DB and a JWT token is returned. 8. Token is stored in localStorage for subsequent admin requests."

---

**Q10: What is middleware in Express.js?**
> "Middleware is a function that runs between the request being received and the response being sent. In our app: `cors()` middleware handles cross-origin permissions, `express.json()` parses request bodies, [auth.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/middleware/auth.js) verifies JWT tokens for protected routes, and `multer` handles file uploads. Middleware functions receive [(req, res, next)](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/App.jsx#41-88) — they either modify the request/response or call `next()` to pass control to the next middleware."

---

**Q11: What is `ProtectedRoute` in React?**
> "`ProtectedRoute` is a wrapper component that checks if the user is authenticated before rendering the protected page. If there's no JWT token in localStorage, it redirects to `/login`. This prevents unauthorized users from accessing the `/admin` dashboard directly by typing the URL."

---

**Q12: Why did you use Vite instead of Create React App (CRA)?**
> "Vite is significantly faster than CRA because it uses ES modules natively in the browser during development (no bundling step). Hot Module Replacement (HMR) is near-instant. Vite also produces optimized production bundles much faster. CRA uses Webpack which is slower, especially for large projects."

---

**Q13: What is Framer Motion?**
> "Framer Motion is a React animation library. We use it for smooth page transitions using `AnimatePresence` in [App.jsx](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/App.jsx) and the `motion.div` component in [Login.jsx](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/pages/Login.jsx). The `initial`, `animate`, and `exit` props control the animation states."

---

**Q14: What happens if someone tries to access `/admin` without logging in?**
> "The `ProtectedRoute` component checks `localStorage` for a JWT token. If no token is found, it immediately redirects to `/login` using React Router's `navigate()`. Even if they somehow bypass the frontend, the backend's [auth.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/server/middleware/auth.js) middleware will reject any API request without a valid JWT with a `401 Unauthorized` response."

---

**Q15: How do you handle image deletion from Cloudinary when a service is deleted?**
> "When we upload an image to Cloudinary, we save both the `imageUrl` (the CDN URL) and the `publicId` (Cloudinary's internal identifier) to MongoDB. When admin deletes a service, the backend first calls `cloudinary.uploader.destroy(publicId)` to remove the image from Cloudinary, then calls `Service.findByIdAndDelete(id)` to remove the DB record. This prevents orphaned images accumulating in Cloudinary."

---

**Q16: What is `multipart/form-data` and when do you use it?**
> "`multipart/form-data` is an HTTP content type used when uploading files along with other form data. Regular JSON requests can only send text. When the admin uploads a service with an image, the frontend sends the data as `FormData` (multipart), and the backend uses Multer middleware to parse and handle the file upload. Multer-Storage-Cloudinary then streams it directly to Cloudinary."

---

**Q17: What is the purpose of [config.js](file:///media/venkat/D%20Drive/Sri%20Neha%20Events/client/src/config.js) in the frontend?**
> "It's a centralized configuration file that exports the API base URL. During development, you change it to `http://localhost:5000`. Before deploying, you change it to the Render URL. This single-file approach means you never have to search through multiple files to update the API URL — one change switches the entire app between environments."

---

**Q18: What are HTTP status codes? Name a few used in this project.**
> "HTTP status codes communicate the result of an API request. In our project: `200 OK` — successful GET or login, `201 Created` — new service/banner added, `400 Bad Request` — invalid OTP or missing fields, `401 Unauthorized` — no/invalid JWT token, `404 Not Found` — email or service not found, `500 Internal Server Error` — unexpected server error."

---

**Q19: Why use Brevo instead of Gmail SMTP for sending OTP emails?**
> "Cloud servers like Render commonly block outbound SMTP ports 465 and 587 to prevent spam. Brevo's transactional email service uses an HTTP REST API over port 443 (standard HTTPS port — never blocked by firewalls). This ensures OTP emails are delivered reliably from the Render backend."

---

**Q20: What improvements would you make if you had more time?**
> "I would add: (1) Rate limiting on the `/send-otp` endpoint to prevent abuse, (2) Pagination for the services API to handle scaling, (3) A contact/inquiry form integrated with WhatsApp Business API, (4) React Query for caching API responses (currently refetches on every page visit), (5) A staging environment to test before pushing to production, and (6) Proper MVC architecture separating controllers from routes."

---

> **🇮🇳 Key Telugu Summary:**
> - ఈ project ఒక event management company కోసం full-stack web application
> - Frontend: React + Tailwind CSS (Vercel లో deploy)
> - Backend: Node.js + Express (Render లో deploy)
> - Database: MongoDB Atlas (cloud)
> - Authentication: OTP based (bcrypt hash + JWT token)
> - Images: Cloudinary లో store చేస్తారు (server పై కాదు)
> - Email: Brevo API ద్వారా OTP emails పంపిస్తారు

