# Security Policy

## Reporting Security Issues

If you discover a security vulnerability in CherryParkApartment, please report it by emailing the development team. **Do not create a public GitHub issue for security vulnerabilities.**

## Security Best Practices

### For Deployment

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use strong, unique secrets for `JWT_SECRET` (minimum 32 characters)
   - Rotate secrets regularly (every 90 days recommended)
   - Use different secrets for development, staging, and production

2. **Database Security**
   - Use MongoDB Atlas with IP whitelisting for production
   - Enable MongoDB authentication
   - Use strong, unique passwords
   - Rotate database credentials after any security incident
   - Enable database audit logging

3. **SSL/TLS Certificates**
   - **CRITICAL**: The SSL certificates in git history must be regenerated
   - Never commit private keys to version control
   - Use proper certificates from a Certificate Authority (e.g., Let's Encrypt)
   - Enable HTTPS in production
   - Configure proper certificate paths in environment variables

4. **CORS Configuration**
   - Restrict `CORS_ORIGIN` to your production domains only
   - Never use wildcard (`*`) in production
   - Example: `CORS_ORIGIN=https://yourapp.com,https://www.yourapp.com`

5. **Rate Limiting**
   - Adjust rate limits based on your traffic patterns
   - Consider using Redis for distributed rate limiting
   - Monitor rate limit violations

6. **Dependencies**
   - Run `npm audit` regularly
   - Keep dependencies up to date
   - Review security advisories
   - Use `npm audit fix` to apply automatic patches

### Exposed Credentials - IMMEDIATE ACTION REQUIRED

⚠️ **CRITICAL**: This repository previously had the following exposed in git history:

1. **MongoDB Connection String**: Contains database credentials
   - **Action**: Rotate MongoDB password immediately
   - **File**: `backend/config/databaseConfig.json` (now ignored)

2. **SSL Private Keys**: SSL certificate and private key committed
   - **Action**: Regenerate SSL certificates
   - **Files**: `backend/server.key`, `backend/server.cert` (moved to `certs/`)

3. **JWT Secret**: Hardcoded as `'secretKey'`
   - **Action**: Now uses environment variable - set a strong secret

### For Developers

1. **Code Reviews**
   - All code changes should be reviewed before merging
   - Check for hardcoded secrets
   - Verify input validation on all endpoints
   - Review authentication/authorization logic

2. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database operations
   - Use parameterized queries to prevent injection attacks

3. **Authentication**
   - JWT tokens are set to expire after 24 hours by default
   - Implement token refresh if needed
   - Never store sensitive data in JWT payload
   - Use HTTPS to transmit tokens

4. **Logging**
   - Never log sensitive information (passwords, tokens, etc.)
   - Log authentication failures
   - Monitor logs for suspicious activity
   - Implement log rotation

5. **Error Handling**
   - Don't expose stack traces in production
   - Return generic error messages to clients
   - Log detailed errors server-side

## Security Features Implemented

✅ **Authentication & Authorization**
- JWT-based authentication
- Bcrypt password hashing (cost factor: 10)
- Role-based access control (residents, employees)
- JWT verification middleware on protected routes

✅ **Security Headers**
- Helmet.js for security headers
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

✅ **Rate Limiting**
- Express rate limiter
- Configurable window and max requests
- Per-IP rate limiting

✅ **CORS**
- Configurable origin whitelist
- Credentials support
- Method restrictions

✅ **Database Security**
- Connection pooling with limits
- Prepared statements (MongoDB query objects)
- Connection timeout configuration

✅ **Secure Configuration**
- Environment-based configuration
- No secrets in code
- Separate configs for dev/prod

✅ **Logging & Monitoring**
- Winston logger for application logs
- Morgan for HTTP request logs
- Health check endpoint

## Security Checklist for Production

Before deploying to production, ensure:

- [ ] All environment variables are set with strong, unique values
- [ ] `NODE_ENV` is set to `production`
- [ ] MongoDB credentials have been rotated
- [ ] SSL certificates have been regenerated
- [ ] JWT secret is at least 32 characters and randomly generated
- [ ] CORS origins are restricted to production domains
- [ ] HTTPS is enabled with valid certificates
- [ ] Database backups are configured
- [ ] Log rotation is enabled
- [ ] Monitoring and alerting are set up
- [ ] Security headers are verified (use securityheaders.com)
- [ ] Dependencies are up to date (`npm audit`)
- [ ] Rate limits are configured appropriately
- [ ] Error messages don't expose sensitive information
- [ ] API documentation doesn't include sensitive endpoints
- [ ] Git history has been cleaned (if possible) to remove exposed secrets

## Compliance

This application handles user data. Ensure compliance with:
- GDPR (if serving EU users)
- CCPA (if serving California residents)
- Local data protection laws
- Industry-specific regulations

## Regular Security Tasks

### Weekly
- Review application logs for suspicious activity
- Check for new security advisories

### Monthly
- Run `npm audit` and update dependencies
- Review access controls and permissions
- Test backup restoration procedures

### Quarterly
- Rotate secrets (JWT secret, database passwords)
- Security audit of code changes
- Penetration testing (recommended)
- Review and update this security policy

## Additional Recommendations

1. **Implement Web Application Firewall (WAF)**
   - CloudFlare, AWS WAF, or similar
   - Protect against common attacks (SQL injection, XSS, etc.)

2. **Set up Monitoring**
   - Application Performance Monitoring (New Relic, DataDog)
   - Error tracking (Sentry, Rollbar)
   - Uptime monitoring (Pingdom, UptimeRobot)

3. **Database Backups**
   - Automated daily backups
   - Test restoration procedures
   - Store backups in separate location

4. **Incident Response Plan**
   - Document procedures for security incidents
   - Maintain contact list for security team
   - Regular drills and updates

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [MongoDB Security Checklist](https://docs.mongodb.com/manual/administration/security-checklist/)

## Version History

- **v1.0.0** (2025-11-22): Initial security policy with production-ready fixes
