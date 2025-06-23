# Rehearsal Scheduler

A web application for automatically scheduling band rehearsals, sending reminders, tracking attendance, and suggesting optimal rehearsal times based on member availability.

## 🎵 Features

- **User & Group Management**
  - Create band/group profiles and invite members
  - Manage user profiles with contact information and instruments
  - Support for users being part of multiple bands/groups

- **Availability Management**
  - Mark regular weekly availability for rehearsals
  - Indicate one-off unavailability for specific dates
  - View calendar of availability
  - Band managers can view combined availability of all members

- **Rehearsal Scheduling**
  - Create events with date, time, location, and duration
  - Get suggested optimal rehearsal times based on member availability
  - Set recurring rehearsals (weekly, bi-weekly, monthly)
  - Cancel or reschedule rehearsals as needed

- **Attendance Tracking**
  - Confirm attendance for scheduled rehearsals
  - Indicate late arrivals or early departures
  - View who has confirmed attendance for each rehearsal
  - Track attendance history and identify patterns

- **Notifications & Reminders**
  - Receive email notifications for new rehearsal events
  - Get reminder notifications before rehearsals
  - Send custom messages to all band members
  - Set notification preferences (email, in-app, SMS)

- **Setlist Management**
  - Create setlists for specific rehearsals
  - View songs to be practiced in upcoming rehearsals
  - Attach sheet music or lyric PDFs to songs
  - Mark songs requiring extra practice

- **Venue Management**
  - Save and reuse rehearsal venues with addresses and notes
  - View venue details including directions and parking information
  - Track venue costs for budget purposes

## 🚀 Tech Stack

### Frontend
- React with TypeScript
- Redux or Context API for state management
- Material-UI or Chakra UI for components
- FullCalendar.js for calendar/scheduling
- Formik with Yup for form validation
- Axios for API communication

### Backend
- Node.js with Express
- RESTful API
- JWT authentication
- Joi or express-validator for validation

### Database
- PostgreSQL
- Sequelize or Prisma ORM
- Redis for caching and scheduling algorithms

### DevOps
- AWS, Heroku, or Vercel for hosting
- GitHub Actions for CI/CD
- Docker for containerization

### Third-Party Services
- SendGrid for email notifications
- Twilio for SMS notifications (optional)
- Google Calendar API for calendar integration
- Auth0 for authentication (optional)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL (v12+)
- Redis (v6+)

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/dxaginfo/musicpro-rehearsal-scheduler-06232025.git
   cd musicpro-rehearsal-scheduler-06232025/backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. Run database migrations
   ```bash
   npm run migrate
   ```

5. Start the development server
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory
   ```bash
   cd ../frontend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. Start the development server
   ```bash
   npm start
   ```

### Docker Setup (Alternative)
1. Make sure Docker and Docker Compose are installed

2. Build and start the containers
   ```bash
   docker-compose up -d
   ```

## 📝 API Documentation

API documentation is available at `/api/docs` when running the development server.

## 📚 Database Schema

See the [DATABASE.md](./docs/DATABASE.md) file for a detailed explanation of the database schema.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- FullCalendar.js for the amazing calendar component
- Material-UI team for the UI components
- The open source community for all the tools that made this possible