export default function Home(){
  return <>
  <div className="bg-[#fcf9f8] text-[#1c1b1b] font-sans antialiased scroll-smooth min-h-screen">
        {/* TopNavBar - Forced Light/Glass style to match screenshot */}
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm">
          <nav className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="text-2xl font-black text-[#111C3D] tracking-tighter" style={{ fontFamily: "'Manrope', sans-serif" }}>
              aira.ai
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <a className="text-[#00696b] font-bold border-b-2 border-[#00696b] pb-1 tracking-tight" href="#">Home</a>
              <a className="text-[#45464e] hover:text-[#111C3D] transition-colors font-bold tracking-tight" href="#">Features</a>
              <a className="text-[#45464e] hover:text-[#111C3D] transition-colors font-bold tracking-tight" href="#">Pricing</a>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-4" style={{ fontFamily: "'Manrope', sans-serif" }}>
              <button className="hidden md:block px-6 py-2 text-[#111C3D] font-bold hover:bg-gray-50 rounded-lg transition-all">
                Login
              </button>
              <button className="px-6 py-2 bg-[#000317] text-white rounded-full font-bold scale-95 active:scale-90 transition-transform duration-200">
                Sign Up
              </button>
            </div>
          </nav>
        </header>

        <main className="pt-24">
          {/* Hero Section */}
          <section className="relative px-8 py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8 z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#79f2f4] text-[#006e6f] text-sm font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00696b] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00696b]"></span>
                  </span>
                  AI-Powered Interview Intelligence
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-[#000317] leading-[1.1] tracking-tight">
                  Master your next interview with <span className="text-[#00696b]">AI-powered</span> practice.
                </h1>
                <p className="text-xl text-[#45464e] max-w-xl leading-relaxed">
                  The sophisticated partner for modern job seekers. Simulate high-stakes scenarios, receive editorial-grade feedback, and land your dream role.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <button className="px-8 py-4 bg-[#000317] text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                    Get Started
                  </button>
                  <button className="px-8 py-4 border border-[#c6c6cf] text-[#1c1b1b] rounded-full font-bold text-lg hover:bg-white transition-all">
                    View Demo
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full relative">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white p-4">
                  <img className="w-full h-full object-cover rounded-2xl" alt="Professional Interview" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"/>
                </div>
                
                {/* AI Floating Status Chip */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
                  <div className="w-12 h-12 rounded-full bg-[#00696b] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">neurology</span>
                  </div>
                  <div>
                    <p className="text-xs text-[#45464e] uppercase tracking-wider font-semibold">Interview Status</p>
                    <p className="font-bold text-[#111C3D]">AI Analyzing Sentiment...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-[#f0edec] to-transparent"></div>
          </section>

          {/* Social Proof */}
          <section className="py-12 bg-[#f6f3f2]">
            <div className="max-w-7xl mx-auto px-8">
              <p className="text-center text-sm text-[#45464e] uppercase tracking-[0.2em] mb-8 font-semibold">Trusted by candidates at leading companies</p>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                 <span className="text-xl font-bold">AMAZON</span>
                 <span className="text-xl font-bold">GOOGLE</span>
                 <span className="text-xl font-bold">MICROSOFT</span>
                 <span className="text-xl font-bold">NETFLIX</span>
                 <span className="text-xl font-bold">SLACK</span>
              </div>
            </div>
          </section>

          {/* Bento Grid Features */}
          <section className="py-24 px-8 max-w-7xl mx-auto">
            <div className="mb-16 space-y-4">
              <h2 className="text-4xl font-extrabold text-[#111C3D] tracking-tight">The Intelligent Interview Stack</h2>
              <p className="text-xl text-[#45464e] max-w-2xl">Moving beyond basic practice with deep architectural insights and performance metrics.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full md:h-[600px]">
              {/* Feature 1 */}
              <div className="md:col-span-8 bg-white rounded-3xl p-10 flex flex-col justify-between shadow-sm border border-gray-100">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#79f2f4] flex items-center justify-center text-[#006e6f]">
                    <span className="material-symbols-outlined">waves</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#111C3D]">Real-time Feedback</h3>
                  <p className="text-[#45464e] max-w-md">Our AI analyzes your tone, pace, and content in real-time, providing editorial suggestions to refine your narrative as you speak.</p>
                </div>
                <div className="mt-8 rounded-xl bg-[#fcf9f8] overflow-hidden h-48 border border-gray-100">
                  <div className="mt-8 rounded-xl bg-[#fcf9f8] h-40 w-full flex items-center justify-center border border-gray-100 overflow-hidden">
                {/* PASTE YOUR IMAGE ADDRESS IN THE src="" BELOW.
                   For example: src="https://yourwebsite.com/path/to/image.jpg"
                */}
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCB2oRMmpvaKLVXNlEytO6fUAJhUhYSzcnzUVjlKCW2FHkVNHhvE6le-pOIkTyP7sfkKp87euHPGpaba6ksl76mE4QDFU5vwnMz4QwhKwy1Mkbo8-88D8wEL8XXOny87zUfJ89Y9wRvWfoi_g608w6Z2jsZK8zqr7HewmBkuAexKPHxgZ9JjH3brIpjopXgyVEdHOce2remtvC2zzQmUvWslOgh3OtVJKPE_iK4ywabz-eX3UD4R22ZAU7BLgTERz1ymhtTwUy7GFI" 
                  alt="Real-time waveform analytics visualization showing pitch and tone metrics" 
                  className="w-full h-full object-cover" 
                />
              </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="md:col-span-4 bg-[#111C3D] text-white rounded-3xl p-10 flex flex-col justify-between shadow-xl">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Industry Scenarios</h3>
                  <p className="text-gray-400 text-sm">Tailored interview paths for 50+ industries, from Quantitative Finance to Creative Direction.</p>
                </div>
                <div className="space-y-3 pt-8">
                  {['System Design', 'Behavioral Strategy', 'Product Management'].map((item, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <span className="font-semibold">{item}</span>
                      <span className="material-symbols-outlined text-[#79f2f4]">chevron_right</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section */}
          <section className="py-24 bg-[#f6f3f2]">
            <div className="max-w-7xl mx-auto px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <img className="w-full h-full object-cover" alt="Collaborative workspace" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"/>
                  </div>
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00696b] rounded-full flex items-center justify-center p-8 text-white text-center font-bold leading-tight shadow-lg">
                    "aira transformed my prep"
                  </div>
                </div>
                <div className="space-y-10">
                  <span className="material-symbols-outlined text-[#00696b] text-6xl">format_quote</span>
                  <blockquote className="text-3xl font-bold text-[#111C3D] leading-tight italic">
                    "The feedback loop provided by aira is unparalleled. It's not just about practicing; it's about practicing with the right intelligence."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-300"></div>
                    <div>
                      <p className="font-bold text-[#111C3D]">Marcus Richardson</p>
                      <p className="text-[#45464e] text-sm font-semibold">Senior Solutions Architect</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-32 px-8">
            <div className="max-w-5xl mx-auto rounded-[3rem] bg-[#000317] p-16 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Ready to master your next <span className="text-[#79f2f4]">big opportunity</span>?</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join over 10,000 professionals using aira.ai to gain a competitive edge in the job market.</p>
                <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
                  <button className="px-10 py-5 bg-[#79f2f4] text-[#006e6f] rounded-full font-bold text-xl shadow-lg hover:scale-105 transition-transform">
                    Get Started Free
                  </button>
                  <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-xl hover:bg-white/10 transition-all">
                    Talk to an Expert
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-white w-full py-12 px-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="space-y-4">
              <div className="text-xl font-bold text-[#111C3D]">aira.ai</div>
              <p className="text-[#45464e] text-sm">Defining the future of career intelligence through human-centric AI design.</p>
            </div>
            <div>
              <h4 className="font-bold text-[#111C3D] mb-4">Product</h4>
              <ul className="space-y-2 text-[#45464e] text-sm font-semibold">
                <li><a className="hover:text-[#00696b]" href="#">Interviews</a></li>
                <li><a className="hover:text-[#00696b]" href="#">Feedback Engine</a></li>
                <li><a className="hover:text-[#00696b]" href="#">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#111C3D] mb-4">Company</h4>
              <ul className="space-y-2 text-[#45464e] text-sm font-semibold">
                <li><a className="hover:text-[#00696b]" href="#">About</a></li>
                <li><a className="hover:text-[#00696b]" href="#">Blog</a></li>
                <li><a className="hover:text-[#00696b]" href="#">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#111C3D] mb-4">Legal</h4>
              <ul className="space-y-2 text-[#45464e] text-sm font-semibold">
                <li><a className="hover:text-[#00696b]" href="#">Privacy Policy</a></li>
                <li><a className="hover:text-[#00696b]" href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[#45464e] text-sm font-semibold">
            <p>© 2026 aira.ai. All rights reserved.</p>
          </div>
        </footer>
      </div>
</>
}