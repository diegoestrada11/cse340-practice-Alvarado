// Import model functions
import { getFacultyById, getSortedFaculty } from '../../models/faculty/faculty.js';

// Route handler for the faculty list page
const facultyListPage = (req, res) => {
    // Determine sorting (default: department)
    const sortBy = req.query.sort || 'department';

    // Get sorted faculty array
    const facultyList = getSortedFaculty(sortBy);

    // Render the list page
    res.render('faculty/list', {
        title: 'Faculty Directory',
        faculty: facultyList,
        currentSort: sortBy
    });
};

// Route handler for individual faculty detail pages
const facultyDetailPage = (req, res, next) => {
    const facultyId = req.params.facultyId;

    // Look up faculty member by ID
    const member = getFacultyById(facultyId);

    // If not found, trigger 404
    if (!member) {
        const err = new Error(`Faculty member '${facultyId}' not found`);
        err.status = 404;
        return next(err);
    }

    // Render profile page
    res.render('faculty/detail', {
        title: member.name,
        faculty: member
    });
};

export { facultyListPage, facultyDetailPage };
