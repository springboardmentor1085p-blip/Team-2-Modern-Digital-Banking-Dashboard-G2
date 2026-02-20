import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [dark, setDark] = useState(false);
  const [step, setStep] = useState("login"); // login | otp | forgot
  const [forgotStep, setForgotStep] = useState("email"); // email | otp | reset

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [remember, setRemember] = useState(false);

  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotOtp, setForgotOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [generatedOTP, setGeneratedOTP] = useState("");

  useEffect(() => {
    generateCaptcha();
  }, []);

  /* CAPTCHA */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
    let res = "";
    for (let i = 0; i < 5; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    setCaptchaText(res);
    setCaptchaInput("");
  };

  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  /* ================= LOGIN ================= */

  const sendOTP = async () => {
    if (!email || !password) return alert("Enter email & password");

    if (captchaInput !== captchaText) {
      alert("Captcha does not match");
      generateCaptcha();
      return;
    }

    try {
      const form = new URLSearchParams();
      form.append("username", email);
      form.append("password", password);

      const res = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: form,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      localStorage.setItem("token", data.access_token);

      if (remember) {
        localStorage.setItem("rememberEmail", email);
      }

      const otpGen = generateOTP();
      setGeneratedOTP(otpGen);
      alert(`OTP (Demo): ${otpGen}`);

      setStep("otp");
    } catch {
      alert("Invalid email or password");
    }
  };

  const verifyOTP = () => {
    if (otp === generatedOTP) {
      alert("Login successful ✅");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  /* ================= FORGOT PASSWORD ================= */

  const sendForgotOTP = async () => {
    if (!forgotEmail) return alert("Enter email");

    const res = await fetch(
      "http://localhost:8000/users/forgot-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      }
    );

    if (!res.ok) return alert("Email not found");

    alert("OTP sent to email (demo)");
    setForgotStep("otp");
  };

  const verifyForgotOTP = async () => {
    const res = await fetch(
      "http://localhost:8000/users/verify-forgot-otp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail, otp: forgotOtp }),
      }
    );

    if (!res.ok) return alert("Invalid OTP");
    setForgotStep("reset");
  };

  const resetPassword = async () => {
    const res = await fetch(
      "http://localhost:8000/users/reset-password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail,
          new_password: newPassword,
        }),
      }
    );

    if (!res.ok) return alert("Reset failed");

    alert("Password updated successfully ✅");
    setStep("login");
    setForgotStep("email");
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-500
        ${
          dark
            ? "bg-gradient-to-br from-slate-900 via-blue-950 to-black"
            : "bg-gradient-to-br from-blue-100 via-white to-indigo-200"
        }`}
      >
        {/* CARD */}
        <div
          className={`relative w-full max-w-md rounded-2xl shadow-2xl p-8 transition-colors
          ${
            dark
              ? "bg-slate-900 text-white"
              : "bg-white text-gray-900"
          }`}
        >
          {/* THEME TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="absolute top-4 right-4 text-sm font-medium"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* LOGO */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-2xl text-white">
              🏦
            </div>
            <h2 className="mt-3 text-2xl font-bold">Secure Bank Login</h2>
            <p className="text-sm opacity-70">
              Secure Digital Banking Portal
            </p>
          </div>

          {/* LOGIN */}
          {step === "login" && (
            <div className="space-y-4">
              <Input dark={dark} label="Username" value={email} onChange={setEmail} />
              <Input
                dark={dark}
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
              />

              {/* CAPTCHA */}
              <div>
                <label className="text-sm">Captcha</label>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className={`px-4 py-2 rounded font-bold
                    ${dark ? "bg-slate-700" : "bg-gray-200"}`}
                  >
                    {captchaText}
                  </div>
                  <button onClick={generateCaptcha}>🔄</button>
                </div>
                <input
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="Enter captcha"
                  className={`w-full mt-2 px-4 py-2 rounded border outline-none
                  ${
                    dark
                      ? "bg-slate-800 text-white border-slate-700"
                      : "bg-white border-gray-300"
                  }`}
                />
              </div>

              {/* REMEMBER */}
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  Remember Me
                </label>

                <span
                  onClick={() => setStep("forgot")}
                  className="text-blue-500 cursor-pointer hover:underline"
                >
                  Forgot Password?
                </span>
              </div>

              <button
                onClick={sendOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
              >
                Login with OTP
              </button>
            </div>
          )}

          {/* OTP */}
          {step === "otp" && (
            <div className="space-y-4">
              <Input dark={dark} label="Enter OTP" value={otp} onChange={setOtp} />
              <button
                onClick={verifyOTP}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* FORGOT */}
          {step === "forgot" && (
            <div className="space-y-4">
              {forgotStep === "email" && (
                <>
                  <Input dark={dark} label="Registered Email" value={forgotEmail} onChange={setForgotEmail} />
                  <button onClick={sendForgotOTP} className="w-full bg-blue-600 text-white py-2 rounded-lg">
                    Send OTP
                  </button>
                </>
              )}

              {forgotStep === "otp" && (
                <>
                  <Input dark={dark} label="Enter OTP" value={forgotOtp} onChange={setForgotOtp} />
                  <button onClick={verifyForgotOTP} className="w-full bg-green-600 text-white py-2 rounded-lg">
                    Verify OTP
                  </button>
                </>
              )}

              {forgotStep === "reset" && (
                <>
                  <Input dark={dark} label="New Password" type="password" value={newPassword} onChange={setNewPassword} />
                  <button onClick={resetPassword} className="w-full bg-purple-600 text-white py-2 rounded-lg">
                    Reset Password
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* INPUT COMPONENT */
function Input({ label, type = "text", value, onChange, dark }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2 rounded border outline-none
        ${
          dark
            ? "bg-slate-800 text-white border-slate-700"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  );
}
