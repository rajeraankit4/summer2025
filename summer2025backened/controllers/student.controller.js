import bcrypt from "bcrypt";
import User from "../models/user.model.js";

export const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: "Error fetching students", details: err.message });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Student ID is required" });

  try {
    const student = await User.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: "Error fetching student", details: err.message });
  }
};

export const updateStudentProfile = async (req, res) => {
  const { id } = req.params;
  const { phoneNo, profilePic } = req.body;
  if (!id) return res.status(400).json({ error: "Student ID is required" });

  try {
    const student = await User.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    if (phoneNo) student.phone = phoneNo;
    if (profilePic) student.profilePic = profilePic;

    await student.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating profile", details: err.message });
  }
};

export const verifyStudent = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Student ID is required" });

  try {
    const student = await User.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });

    student.isVerified = true;
    await student.save();

    res.status(200).json({ message: "Student verified successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error verifying student", details: err.message });
  }
};

// Change password for student
export const changeStudentPassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;
  if (!id || !currentPassword || !newPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const student = await User.findById(id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    const isMatch = await student.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    // Hash new password and save
    student.password = await bcrypt.hash(newPassword, 12);
    await student.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error changing password", details: err.message });
  }
};