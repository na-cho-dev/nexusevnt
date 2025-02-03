import User from '../models/usersModel.js';

export const getOrganizers = async (req, res) => {
  try {
    const organizers = await User.find({ role: 'Organizer' });
    if (!organizers)
      return res.status(404).json({ message: 'Organizers not found' });
    // console.log(organizers);
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
    // console.log(organizer);

    const formatOrganizer = (organizer) => {
      if (!organizer) return null;

      let base64Image = null;
      if (organizer.profile_img?.data) {
        base64Image = Buffer.from(organizer.profile_img.data).toString(
          'base64'
        );
      }

      return {
        ...organizer.toObject(), // Convert Mongoose document to plain object
        profile_img: base64Image
          ? { mimeType: organizer.profile_img.mimeType, data: base64Image }
          : null,
      };
    };

    const formattedOrganizer = formatOrganizer(organizer);

    res.status(200).json({
      message: 'Fetched Organizer Successfully',
      organizer: formattedOrganizer,
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

    // Profile Image Edit
    if (req.file) {
      updatedFields.profile_img = {
        data: req.file.buffer,
        mimeType: req.file.mimetype,
      };
    }

    const updatedOrganizer = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
      runValidators: true,
    });
    // console.log(updatedOrganizer);
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

    // console.log(organizer);
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
