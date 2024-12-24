import User from '../models/userModel.js';

export const getOrganizers = async (req, res) => {
  try {
    const organizers = await User.find({ role: 'Organizer' });
    if (!organizers)
      return res.status(404).json({ message: 'Organizers not found' });
    console.log(organizers);
    res.status(200).json({
      message: 'Fetched all Organizers Successfully',
      organizers: organizers,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const getOrganizer = async (req, res) => {
  try {
    const { id } = req.params;
    const organizer = await User.findOne({ _id: id, role: 'Organizer' });
    if (!organizer)
      return res.status(404).json({ message: 'Organizer does not exist' });
    console.log(organizer);
    res.status(200).json({
      message: 'Fetched Organizer Successfully',
      organizer: organizer,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const updateOrganizer = async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;
  try {
    const organizer = await User.findOne({ _id: id, role: 'Organizer' });
    if (!organizer)
      return res.status(404).json({ message: 'Organizer does not exist' });

    const updatedOrganizer = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    console.log(updatedOrganizer);
    res.status(200).json({
      message: 'Updated Organizer Successfully',
      organizer: updatedOrganizer,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};

export const deleteOrganizer = async (req, res) => {
  const { id } = req.params;
  try {
    const existingOrganizer = await User.findOne({
      _id: id,
      role: 'Organizer',
    });
    if (!existingOrganizer)
      return res.status(404).json({ message: 'Organizer does not exist' });

    const organizer = await User.findByIdAndDelete(id);

    console.log(organizer);
    res.status(200).json({
      message: 'Deleted Organizer Successfully',
      organizer: organizer,
    });
  } catch (error) {
    res
      .status(404)
      .json({ message: 'Error fetching users', error: error.message });
  }
};
