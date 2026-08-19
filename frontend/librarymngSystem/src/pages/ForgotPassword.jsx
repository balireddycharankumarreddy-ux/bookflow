import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/Toast";
import "./ForgotPassword.css";

// Password strength calculation
function calculatePasswordStrength(password) {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    longLength: password.length >= 12,
  };

  if (checks.length) score++;
  if (checks.uppercase) score++;
  if (checks.lowercase) score++;
  if (checks.number) score++;
  if (checks.special) score++;
  if (checks.longLength) score++;

  let strength = "";
  let strengthClass = "";

  if (score <= 2) {
    strength = "Weak";
    strengthClass = "weak";
  } else if (score <= 3) {
    strength = "Fair";
    strengthClass = "fair";
  } else if (score <= 4) {
    strength = "Good";
    strengthClass = "good";
  } else {
    strength = "Strong";
    strengthClass = "strong";
  }

  return { score, strength, strengthClass, checks };
}

function ForgotPassword() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1); // 1: email, 2: verification code, 3: new password
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Calculate password strength
  const passwordStrength = useMemo(() => {
    return calculatePasswordStrength(newPassword);
  }, [newPassword]);

  // Check if password meets all requirements
  const isPasswordValid = useMemo(() => {
    return (
      passwordStrength.checks.length &&
      passwordStrength.checks.uppercase &&
      passwordStrength.checks.lowercase &&
      passwordStrength.checks.number &&
      passwordStrength.checks.special
    );
  }, [passwordStrength]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/users/send-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Verification code sent to your email!", "success");
        setStep(2);
      } else {
        toast(data.message || "Failed to send verification code", "error");
      }
    } catch (error) {
      console.error(error);
      toast(
        "Unable to connect to the server. Make sure Spring Boot is running.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/users/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Email verified successfully!", "success");
        setStep(3);
      } else {
        toast(data.message || "Invalid verification code", "error");
      }
    } catch (error) {
      console.error(error);
      toast(
        "Unable to connect to the server. Make sure Spring Boot is running.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Stricter validation
    if (!isPasswordValid) {
      toast("Password does not meet all requirements", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast("Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8081/api/users/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast("Password reset successful! Please login.", "success");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        toast(data.message || "Failed to reset password", "error");
      }
    } catch (error) {
      console.error(error);
      toast(
        "Unable to connect to the server. Make sure Spring Boot is running.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Reset Password</h2>

        {/* Step Indicator */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className={`step-line ${step >= 2 ? "active" : ""}`}></div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className={`step-line ${step >= 3 ? "active" : ""}`}></div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <p>Enter your email to receive a verification code</p>
            <form onSubmit={handleSendCode}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="reset-btn"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Enter Verification Code */}
        {step === 2 && (
          <>
            <p>Enter the 6-digit code sent to {email}</p>
            <form onSubmit={handleVerifyCode}>
              <div className="form-group">
                <label>Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>

              <button
                type="submit"
                className="reset-btn"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </form>

            <p className="resend-link">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="resend-btn"
                onClick={handleSendCode}
                disabled={loading}
              >
                Resend
              </button>
            </p>
          </>
        )}

        {/* Step 3: Enter New Password */}
        {step === 3 && (
          <>
            <p>Set your new password</p>
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>New Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="password-strength">
                  <div className="strength-bars">
                    <div className={`strength-bar ${passwordStrength.strengthClass}`}></div>
                    <div className={`strength-bar ${passwordStrength.score >= 2 ? passwordStrength.strengthClass : ""}`}></div>
                    <div className={`strength-bar ${passwordStrength.score >= 4 ? passwordStrength.strengthClass : ""}`}></div>
                    <div className={`strength-bar ${passwordStrength.score >= 6 ? passwordStrength.strengthClass : ""}`}></div>
                  </div>
                  <span className={`strength-text ${passwordStrength.strengthClass}`}>
                    {passwordStrength.strength}
                  </span>
                </div>
              )}

              {/* Password Requirements */}
              {newPassword && (
                <div className="password-requirements">
                  <div className={`requirement ${passwordStrength.checks.length ? "met" : ""}`}>
                    <span className="requirement-icon">
                      {passwordStrength.checks.length ? "✓" : "○"}
                    </span>
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.uppercase ? "met" : ""}`}>
                    <span className="requirement-icon">
                      {passwordStrength.checks.uppercase ? "✓" : "○"}
                    </span>
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.lowercase ? "met" : ""}`}>
                    <span className="requirement-icon">
                      {passwordStrength.checks.lowercase ? "✓" : "○"}
                    </span>
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.number ? "met" : ""}`}>
                    <span className="requirement-icon">
                      {passwordStrength.checks.number ? "✓" : "○"}
                    </span>
                    <span>One number</span>
                  </div>
                  <div className={`requirement ${passwordStrength.checks.special ? "met" : ""}`}>
                    <span className="requirement-icon">
                      {passwordStrength.checks.special ? "✓" : "○"}
                    </span>
                    <span>One special character (!@#$%^&*)</span>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label>Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                  </button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <span className="password-mismatch">Passwords do not match</span>
                )}
                {confirmPassword && newPassword === confirmPassword && (
                  <span className="password-match">Passwords match</span>
                )}
              </div>

              <button
                type="submit"
                className="reset-btn"
                disabled={loading || !isPasswordValid || newPassword !== confirmPassword}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <p className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
