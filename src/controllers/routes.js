import { Router } from 'express';
// Create a new router instance
const router = Router();

// Import middleware + controllers
import { addDemoHeaders } from '../middleware/demo/headers.js';
import { catalogPage, courseDetailPage } from '../controllers/catalog/catalog.js';
import { homePage, aboutPage, demoPage, testErrorPage } from './index.js';

// Import faculty controllers
import { facultyListPage, facultyDetailPage } from '../controllers/faculty/faculty.js';

// Home and basic pages
router.get('/', homePage);
router.get('/about', aboutPage);

// Course catalog routes
router.get('/catalog', catalogPage);
router.get('/catalog/:courseId', courseDetailPage);

// NEW: Faculty routes
router.get('/faculty', facultyListPage);
router.get('/faculty/:facultyId', facultyDetailPage);

// Demo page with special middleware
router.get('/demo', addDemoHeaders, demoPage);

// Route to trigger a test error
router.get('/test-error', testErrorPage);

export default router;
