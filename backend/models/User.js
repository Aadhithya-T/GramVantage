const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["citizen", "official", "ngo"],
      default: "citizen",
    },
    mobile: {
      type: String,
      required: function () {
        return this.userType === "citizen";
      },
      validate: {
        validator: function (v) {
          if (this.userType !== "citizen") return true;
          return /^\d{10}$/.test(v);
        },
        message: "Mobile number must be 10 digits",
      },
    },
    aadhar: {
      type: String,
      required: function () {
        return this.userType === "citizen";
      },
      validate: {
        validator: function (v) {
          if (this.userType !== "citizen") return true;
          return /^\d{12}$/.test(v);
        },
        message: "Aadhar number must be 12 digits",
      },
    },
    code: {
      type: String,
      required: function () {
        return this.userType === "official" || this.userType === "ngo";
      },

      unique: true,
      sparse: true,
      validate: {
        validator: function (v) {
          if (this.userType === "official" || this.userType === "ngo") {
            return /^\d{5}$/.test(v);
          }
          return true;
        },
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return validator.isEmail(v);
        },
        message: "Invalid email format",
      },
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Method to check password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
