/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     LoginResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             email:
 *               type: string
 *         token:
 *           type: string
 *     SignupRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     SignupResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             email:
 *               type: string
 *         token:
 *           type: string
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *       properties:
 *         id:
 *           type: string
 *           description: The book's unique identifier
 *         title:
 *           type: string
 *           description: The book's title
 *         author:
 *           type: string
 *           description: The book's author
 *         genre:
 *           type: string
 *           description: The book's genre
 *         description:
 *           type: string
 *           description: The book's description
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the book was added
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the book was last updated
 *     BookInput:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - genre
 *       properties:
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         genre:
 *           type: string
 *         price:
 *           type: number
 *         description:
 *           type: string
 *     BookResponse:
 *       type: object
 *       properties:
 *         books:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Book'
 *         total:
 *           type: integer
 *           description: Total number of books matching the query
 *         page:
 *           type: integer
 *           description: Current page number
 *         limit:
 *           type: integer
 *           description: Number of items per page
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 */
