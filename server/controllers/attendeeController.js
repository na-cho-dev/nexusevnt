import User from '../models/usersModel.js';

export const getAttendees = async (req, res) => {
  try {
    const attendees = await User.find({ role: 'Attendee' });
    if (!attendees)
      return res.status(404).json({ message: 'Attendees not found' });
    // console.log(`CUURENT USER: ${req.user}`);
    res.status(200).json({
      message: 'Fetched all Attendees Successfully',
      attendees: attendees,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const getAttendee = async (req, res) => {
  try {
    const { id } = req.params;
    const attendee = await User.findOne({ _id: id, role: 'Attendee' });
    if (!attendee)
      return res.status(404).json({ message: 'Attendee does not exist' });
    // console.log(attendee);

    const formatAttendee = (attendee) => {
      if (!attendee) return null;

      let base64Image = null;
      if (attendee.profile_img?.data) {
        base64Image = Buffer.from(attendee.profile_img.data).toString('base64');
      }

      return {
        ...attendee.toObject(), // Convert Mongoose document to plain object
        profile_img: base64Image
          ? { mimeType: attendee.profile_img.mimeType, data: base64Image }
          : null,
      };
    };

    const formattedAttendee = formatAttendee(attendee);

    res.status(200).json({
      message: 'Fetched Attendee Successfully',
      attendee: formattedAttendee,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const updateAttendee = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const attendee = await User.findOne({ _id: id, role: 'Attendee' });
    if (!attendee)
      return res.status(404).json({ message: 'Attendee does not exist' });

    if (!req.file && attendee.profile_img) {
      updatedFields.profile_img = attendee.profile_img;
    }

    // Profile Image Edit
    if (req.file) {
      updatedFields.profile_img = {
        data: req.file.buffer,
        mimeType: req.file.mimetype,
      };
    }

    const updatedAttendee = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    // console.log(updatedAttendee);
    res.status(200).json({
      message: 'Updated Attendee Successfully',
      attendee: updatedAttendee,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const deleteAttendee = async (req, res) => {
  const { id } = req.params;
  try {
    const existingAttendee = await User.findOne({ _id: id, role: 'Attendee' });
    if (!existingAttendee)
      return res.status(404).json({ message: 'Attendee does not exist' });

    const attendee = await User.findByIdAndDelete(id);

    // console.log(attendee);
    res
      .status(200)
      .json({ message: 'Deleted Attendee Successfully', attendee: attendee });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};
