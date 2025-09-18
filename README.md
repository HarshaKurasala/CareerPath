# CareerPath - OneStopCareerAdvisor

A comprehensive full-stack web application for personalized career and education guidance, built with React.js and Node.js.

## 🚀 Features

### Core Features
- **AI-Powered Career Guidance** - Get personalized career recommendations using Google Gemini AI
- **Degree Explorer** - Browse and compare different degree programs
- **Career Roadmap** - Visual career progression paths
- **Skills Assessment** - Evaluate your current skills and get improvement suggestions
- **User Profiles** - Track your progress and preferences

### New Features
- **Scholarship Finder** - Search and filter scholarships based on eligibility criteria
- **College Directory** - Browse government colleges with detailed information
- **AI Aptitude Quiz** - Interactive quiz for stream and degree recommendations

## 🛠️ Tech Stack

### Frontend
- React.js
- CSS3 with custom variables for theming
- Font Awesome icons
- Responsive design with dark mode support

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- Google Gemini 1.5 Flash API
- JWT authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
career_guidance-main/
├── backend/                 # Backend API server
│   ├── config/             # Database configuration
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic services
│   └── server.js           # Main server file
├── frontend/               # React frontend application
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json
├── database/               # Database seed data
│   └── seed_data/          # Mock data files
└── package.json            # Root package configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Google Gemini API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd career_guidance-main
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/career_guidance
   GEMINI_API_KEY=your_gemini_api_key_here
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. **Run the application**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev
   
   # Or run separately:
   # Backend only
   cd backend && npm run dev
   
   # Frontend only
   cd frontend && npm start
   ```

## 🌐 Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set root directory to `backend/`
3. Add environment variables in Render dashboard
4. Deploy

### Frontend (Netlify/GitHub Pages)
1. Build the frontend: `npm run build`
2. Deploy the `build/` folder to your chosen platform
3. Update API endpoints to point to your deployed backend

## 📱 Usage

1. **Register/Login** - Create an account or sign in
2. **Take Skills Assessment** - Evaluate your current skills
3. **Explore Degrees** - Browse available degree programs
4. **Get AI Guidance** - Chat with AI for personalized advice
5. **View Career Roadmap** - See your career progression path
6. **Find Scholarships** - Search for relevant scholarships
7. **Browse Colleges** - Explore college options

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Career Data
- `GET /api/careers` - Get all career data
- `GET /api/degrees` - Get degree information
- `POST /api/ai/guidance` - Get AI career guidance

### New Features
- `GET /api/colleges` - Search colleges
- `POST /api/scholarships/search` - Search scholarships
- `POST /api/quiz/analyze` - Analyze quiz responses

## 🎨 UI/UX Features

- **Dark Mode** - Toggle between light and dark themes
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Interactive Components** - Smooth animations and transitions
- **Loading States** - User-friendly loading indicators
- **Empty States** - Helpful messages when no data is available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for career guidance
- Font Awesome for icons
- React community for excellent documentation

---

**CareerPath** - Your Future Starts Here! 🎓✨