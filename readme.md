# CherryPark Apartment Management System

A modern, production-ready full-stack apartment management application built with Angular 18 and Node.js/Express.

## 🚀 Features

- **User Management**: Separate authentication for residents and employees
- **Floor Plans**: Browse and view apartment floor plans
- **Maintenance Requests**: Submit and track maintenance requests
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **Real-time Logging**: Winston-based logging system
- **Responsive UI**: Modern UI built with Angular and PrimeNG
- **Production-Ready**: Docker support, CI/CD pipeline, security headers, rate limiting

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Docker and Docker Compose (optional, for containerized deployment)

## 🏗️ Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js 4.21
- **Language**: TypeScript
- **Database**: MongoDB 4.1+
- **Authentication**: JWT + bcrypt
- **Security**: Helmet.js, CORS, rate limiting
- **Logging**: Winston + Morgan

### Frontend
- **Framework**: Angular 18.2
- **SSR**: Angular Universal
- **UI Library**: PrimeNG 17
- **Maps**: Leaflet, OpenLayers
- **Styling**: SCSS, FontAwesome

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/manasijorkar/CherryParkApartment.git
   cd CherryParkApartment
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:4000
   - Backend API: http://localhost:9443
   - Health Check: http://localhost:9443/health

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string and secrets
   ```

4. **Build and start the server**
   ```bash
   npm run build
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔒 Environment Variables

### Backend (.env)

```env
# Server Configuration
NODE_ENV=development
PORT=9443

# Database
MONGODB_CONNECTION_STRING=your-mongodb-connection-string
MONGODB_DATABASE_NAME=cherryPark

# Security
JWT_SECRET=your-super-secure-secret-key-minimum-32-characters
JWT_EXPIRES_IN=24h

# CORS
CORS_ORIGIN=http://localhost:4200,http://localhost:4000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

See `.env.example` files for complete configuration options.

## 📚 API Documentation

### Authentication Endpoints

#### Resident Authentication
- **POST** `/api/residents/register` - Register new resident
- **POST** `/api/residents/login` - Login resident
- **GET** `/api/residents/all` - Get all residents (protected)

#### Employee Authentication
- **POST** `/api/employees/register` - Register new employee
- **POST** `/api/employees/login` - Login employee
- **GET** `/api/employees/maintenance-requests` - Get maintenance requests (protected)

#### Floor Plans
- **GET** `/api/floorPlan/all` - Get all floor plans

### Protected Routes

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🔧 Development

### Code Quality

**Linting**
```bash
cd backend
npm run lint
npm run lint:fix
```

**Formatting**
```bash
npm run format
npm run format:check
```

### Database Migrations

Currently using MongoDB without formal migrations. Schema changes should be documented and handled through application code updates.

## 🚢 Deployment

### Docker Deployment

1. **Build images**
   ```bash
   docker-compose build
   ```

2. **Start services**
   ```bash
   docker-compose up -d
   ```

3. **View logs**
   ```bash
   docker-compose logs -f
   ```

4. **Stop services**
   ```bash
   docker-compose down
   ```

### Manual Deployment

1. **Build backend**
   ```bash
   cd backend
   npm run build
   ```

2. **Build frontend**
   ```bash
   cd frontend
   npm run build
   ```

3. Deploy the `backend/dist` and `frontend/dist` directories to your hosting provider.

## 📦 CI/CD

The project includes a GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:
- Runs tests on push and pull requests
- Builds Docker images
- Performs security audits
- Deploys to staging/production (configure as needed)

## 🔐 Security

- ✅ JWT authentication with secure secrets
- ✅ Password hashing with bcrypt
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Input validation (express-validator ready)
- ✅ MongoDB connection pooling
- ✅ No secrets in code (environment variables)

### Security Checklist for Production

- [ ] Rotate all default secrets and passwords
- [ ] Use strong JWT secrets (min 32 characters)
- [ ] Configure CORS for production domains only
- [ ] Enable HTTPS/TLS with valid certificates
- [ ] Set up database backups
- [ ] Configure log rotation
- [ ] Enable monitoring and alerting
- [ ] Review and update dependencies regularly

## 📊 Monitoring

### Health Checks
- Backend: http://localhost:9443/health
- Provides uptime, environment, and status information

### Logs
- Backend logs: `backend/logs/`
- API access logs: `backend/logs/API.log`
- Application logs: `backend/logs/app.log`

## 🛠️ Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB is running: `mongosh`
- Check connection string in `.env`
- Ensure network access if using MongoDB Atlas

### Port Already in Use
```bash
# Find process using port 9443
lsof -i :9443
# Kill the process
kill -9 <PID>
```

### Docker Issues
```bash
# Clean up containers
docker-compose down -v

# Rebuild images
docker-compose build --no-cache

# View container logs
docker-compose logs backend
docker-compose logs frontend
```

## 📝 Project Structure

```
CherryParkApartment/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── database/        # Database connection
│   │   ├── middleware/      # Express middleware
│   │   └── routes/          # API routes
│   ├── .env.example
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── guards/      # Route guards
│   │   │   ├── navbar/      # Feature modules
│   │   │   └── services/    # Angular services
│   │   └── config/
│   ├── Dockerfile
│   └── package.json
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team

## 🎯 Roadmap

### Completed ✅
- Environment-based configuration
- JWT authentication with secure secrets
- Security middleware (Helmet, CORS, rate limiting)
- Docker support
- CI/CD pipeline
- Health check endpoints
- Global error handling
- Database connection pooling

### In Progress 🚧
- Input validation for all endpoints
- Comprehensive test suite
- API documentation (Swagger)
- Pagination for list endpoints

### Planned 📋
- Caching strategy (Redis)
- Email notifications
- File upload functionality
- Advanced reporting
- Multi-language support
- Mobile app

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Express.js community
- MongoDB team
- All contributors and maintainers
