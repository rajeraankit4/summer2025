import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const signupUser = async (req, res) => {
  const { name, email, hostelNo, phoneNo, password } = req.body;
  if (!name || !email || !hostelNo || !phoneNo || !password)
    return res.status(400).json({ error: "All fields are required" });

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, hostelNo, phoneNo, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: "Signup error", details: err.message });
  }
};

