import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env.config';
import winstonLoggerController from '../controllers/logs/winstonLoggerController';

const logger = winstonLoggerController('auth-middleware');

// Extend Express Request type to include user
export interface AuthRequest extends Request {
    user?: any;
}

/**
 * Middleware to verify JWT token
 */
export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'No authorization header provided',
            });
        }

        // Check if it's a Bearer token
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'Invalid authorization header format. Use: Bearer <token>',
            });
        }

        const token = parts[1];

        // Verify token
        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                logger.error('Token verification failed: ' + err.message);
                return res.status(401).json({
                    error: 'Unauthorized',
                    message: 'Invalid or expired token',
                });
            }

            // Attach user info to request
            req.user = decoded;
            next();
        });
    } catch (error) {
        logger.error('Auth middleware error: ' + error);
        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'Error verifying authentication',
        });
    }
};

/**
 * Middleware to check if user has required role
 */
export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'User not authenticated',
            });
        }

        const userRole = req.user.role;
        if (!roles.includes(userRole)) {
            logger.warn(`Access denied for user ${req.user.email} with role ${userRole}`);
            return res.status(403).json({
                error: 'Forbidden',
                message: 'You do not have permission to access this resource',
            });
        }

        next();
    };
};

/**
 * Optional auth - doesn't fail if no token, but attaches user if valid token exists
 */
export const optionalAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return next();
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return next();
        }

        const token = parts[1];

        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (!err) {
                req.user = decoded;
            }
            next();
        });
    } catch (error) {
        next();
    }
};
