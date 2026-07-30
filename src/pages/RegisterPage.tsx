import React, { useState } from 'react'
import { Users, Mail, Lock, Heart, ArrowUpRight } from 'lucide-react'
import { G } from '../constants/theme'
import { Page } from '../types'
import { GoldBtn } from '../components/common/GoldBtn'
import { toast } from 'react-toastify'

export function RegisterPage({ setPage }: { setPage: (p: Page) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendURI="https://invitation-app-backend.vercel.app/api/auth/register";
//   const backendURI="http://localhost:5000/api/auth/register";

//   name , email , password
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(backendURI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);
      //save the data to localstorage
      toast.success("Registration successful!", {
          position: "top-right",
          autoClose: 5000,
        });
        localStorage.setItem("user", JSON.stringify(data));   
      setPage("dashboard");
    } else {
      console.error(data.message);
      toast.error(data.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  } catch (err) {
    console.error(err);
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
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 30% 70%, #E8C84A 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* الشعار */}
        <div className="text-center mb-8">
          <button
            onClick={() => setPage('landing')}
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
            أنشئ حسابك الجديد
          </h2>
          <p className="text-sm mt-1" style={{ color: G.charcoalSoft }}>
            ابدأ تصميم وتوزيع دعواتك الإلكترونية الفاخرة اليوم
          </p>
        </div>

        {/* كارت نموذج الإنشاء */}
        <div
          className="p-8 rounded-3xl shadow-gold-md"
          style={{ background: G.white, border: `1px solid ${G.border}` }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                الاسم الكامل
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="محمد أحمد"
                  className="w-full px-4 py-3.5 pr-11 rounded-xl text-sm transition-all outline-none"
                  style={{
                    background: G.beige,
                    border: `1px solid ${G.border}`,
                    color: G.charcoal,
                  }}
                />
                <Users
                  className="w-5 h-5 absolute right-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: G.muted }}
                />
              </div>
            </div>

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
              <label className="block text-xs font-bold mb-2" style={{ color: G.charcoal }}>
                كلمة المرور
              </label>
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

            <GoldBtn className="w-full py-3.5 mt-2" type="submit">
              إنشاء الحساب
              <ArrowUpRight className="w-4 h-4" />
            </GoldBtn>
          </form>

          <div className="mt-6 text-center pt-5" style={{ borderTop: `1px solid ${G.borderSoft}` }}>
            <p className="text-xs" style={{ color: G.charcoalSoft }}>
              لديك حساب بالفعل؟{' '}
              <button
                onClick={() => setPage('login')}
                className="font-bold hover:underline"
                style={{ color: G.gold }}
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}