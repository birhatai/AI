
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-12 py-8 rtl text-right animate-fade-in px-2">
      <header className="text-center space-y-5">
        <div className="mx-auto w-24 h-24 bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-500/30 mb-2 transform hover:rotate-6 transition-transform">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="space-y-1">
          <h2 className="text-4xl font-black tracking-tighter text-white">بیرهات AI</h2>
          <p className="text-blue-400 font-bold text-sm uppercase tracking-[0.2em]">Kurdish Tech Intelligence</p>
        </div>
      </header>

      <div className="space-y-4">
        {[
          {
            title: "تایبەت ب موبایلان",
            desc: "هەمی پرسیار و کێشەیێن تە دەربارەی ئایفۆن و ئەندرۆید دێ لێرە بەرسف هێنە دان ب شێوەیەکێ هویر.",
            icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
            color: "blue"
          },
          {
            title: "سوشیال میدیا",
            desc: "چارەسەرکرنا کێشەیێن ئەکاونتێن فەیسبووک، ئینستاگرام و سناپچاتێ ب شێوازێن نووی یێن ئەمنی.",
            icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
            color: "cyan"
          },
          {
            title: "وەرگێڕانەکا ژیر",
            desc: "وەرگێڕانا نێڤدەولەتی د ناڤبەرا سێ زمانان دا ب پاراستنا ڕامانێ و دیالێکتێ بادینی یێ پەتە.",
            icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129",
            color: "emerald"
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800 rounded-[2rem] p-6 flex items-start gap-6 hover:bg-slate-900/60 transition-all border-l-4 border-l-transparent hover:border-l-blue-500 shadow-lg">
            <div className={`w-14 h-14 bg-${item.color}-600/10 rounded-2xl flex items-center justify-center text-${item.color}-500 shrink-0`}>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-xl text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-[2.5rem] p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full"></div>
        <div className="relative z-10 space-y-4">
          <h4 className="text-blue-400 font-black text-xs uppercase tracking-widest">تێبینییا گرنگ</h4>
          <p className="text-slate-300 text-sm leading-relaxed font-medium">
            بیرهات AI تەنێ خزمەتگوزارەکێ فێرکاری و تەکنیکی یە. ئەو یێ هاتیە فێرکرن تەنێ د بوارێن موبایل و سۆشیال میدیایێ دا هاوکاریێ بکەت. ئەگەر پرسیارەک دەرڤەی ڤی بواری لێ هاتە کرن، ئەو دێ ب ڕێزڤە بێژیت کو پسپۆڕیا وی نینە.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
