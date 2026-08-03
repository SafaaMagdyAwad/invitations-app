import React, { useState } from 'react'
import { Mail, Lock, Heart, ArrowUpRight, Loader2 } from 'lucide-react'
import { G } from '../constants/theme'
import { GoldBtn } from '../components/common/GoldBtn'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  // const backendURI = "https://invitation-app-backend.vercel.app/api/auth/login";
  const backendURI = "http://localhost:5000/api/auth/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(backendURI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("تم تسجيل الدخول بنجاح!", {
          position: "top-right",
          autoClose: 3000,
        });
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        toast.error(data.message || "حدث خطأ أثناء تسجيل الدخول", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (err) {
      console.error("Login Error:", err);
      toast.error("عذراً، متعذر الاتصال بالسيرفر", {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFFDF2 0%, #F8F5F0 45%, #FFFDE8 100%)',
        fontFamily: 'Cairo',
      }}
    >
      {/* خلفية جمالية */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 70% 30%, #E8C84A 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* الشعار */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/landing')}
            className="inline-flex items-center gap-3 mb-3 group"
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center gold-gradient shadow-gold-sm transition-transform group-hover:scale-105">
              <Heart className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-black text-3xl" style={{ color: G.charcoal, letterSpacing: '-0.5px' }}>
              دعـوة
            </span>
          </button>
          <h2 className="text-2xl font-black" style={{ color: G.charcoal }}>
            مرحباً بعودتك!
          </h2>
          <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
            سجّل دخولك لمتابعة إدارة مناسباتك
          </p>
        </div>

        {/* كارت نموذج الدخول */}
        <div
          className="p-8 rounded-3xl shadow-gold-md"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: G.beige,
                    border: `1px solid ${G.border}`,
                    color: G.charcoal,
                  }}
                />
                <Mail
                  className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: G.muted }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold" style={{ color: G.charcoal }}>
                  كلمة المرور
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold hover:underline"
                  style={{ color: G.gold }}
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: G.beige,
                    border: `1px solid ${G.border}`,
                    color: G.charcoal,
                  }}
                />
                <Lock
                  className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: G.muted }}
                />
              </div>
            </div>

            <GoldBtn className="w-full py-3.5 mt-2 flex items-center justify-center gap-2" type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  تسجيل الدخول
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </GoldBtn>
          </form>

          <div className="mt-6 text-center pt-5" style={{ borderTop: `1px solid ${G.borderSoft}` }}>
            <p className="text-xs" style={{ color: G.charcoalSoft }}>
              ليس لديك حساب؟{' '}
              <button
                onClick={() => navigate('/register')}
                className="font-bold hover:underline"
                style={{ color: G.gold }}
              >
                أنشئ حساباً جديداً
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}