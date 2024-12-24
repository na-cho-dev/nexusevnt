import express from 'express';
const router = express.Router();

router.route('/organizer').get(getOrganizer);
// router
//   .route('/attendee/:id')
//   .get(getAttendee)
//   .put(updateAttendee)
//   .delete(deleteAttendee);

export default router;
