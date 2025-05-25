import { Request, Response, NextFunction } from 'express';
import { validationResult, matchedData } from 'express-validator';

// Middleware to check for validation errors and apply sanitized data
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Create a sanitized version of the request body that excludes sensitive fields
    const sanitizedBody = { ...req.body };
    const sensitiveFields = ['email', 'password', 'token', 'secret'];
    sensitiveFields.forEach((field) => {
      if (field in sanitizedBody) {
        sanitizedBody[field] = field === 'password' ? '********' : '[FILTERED]';
      }
    });

    // Log the detailed errors for debugging
    console.error('Validation failed:', {
      path: req.path,
      method: req.method,
      body: sanitizedBody,
      errors: errors.array().map((err) => ({
        field: err.type === 'field' ? err.path : 'unknown',
        message: err.msg,
        value:
          err.type === 'field' && sensitiveFields.includes(err.path)
            ? err.path === 'password'
              ? '********'
              : '[FILTERED]'
            : err.type === 'field'
            ? err.value
            : undefined,
      })),
    });

    // Return a sanitized error response to the client
    const clientErrors = errors.array().map((err) => ({
      field: err.type === 'field' ? err.path : 'unknown',
      message: err.msg,
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: clientErrors,
    });
  }

  // Replace request body with sanitized data
  req.body = matchedData(req, { locations: ['body'] });

  next();
};
