import User from '../models/usersModel.js';

export const getAttendees = async (req, res) => {
  try {
    const attendees = await User.find({ role: 'Attendee' });
    if (!attendees)
      return res.status(404).json({ message: 'Attendees not found' });
    console.log();
    console.log(`CUURENT USER: ${req.user}`);
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
    console.log(attendee);
    res
      .status(200)
      .json({ message: 'Fetched Attendee Successfully', attendee: attendee });
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

    const updatedAttendee = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    console.log(updatedAttendee);
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

    console.log(attendee);
    res
      .status(200)
      .json({ message: 'Deleted Attendee Successfully', attendee: attendee });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};
