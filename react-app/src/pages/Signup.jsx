import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [chessUsername, setChessUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Send the data to your Python Flask backend
    try {
      const response = await fetch('http://127.0.0.1:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password, 
          chess_username: chessUsername 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // This catches the @iitk.ac.in rule or duplicate email errors from Python
        setError(data.error || 'Failed to register');
      } else {
        // Success!
        setSuccess('Account created successfully! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Cannot connect to the server. Is your Python backend running?');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10 bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 shadow-2xl">
        <div>
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-surface-container-high border border-outline-variant/20 shadow-inner mb-6">
            <span className="material-symbols-outlined text-3xl text-primary font-light">person_add</span>
          </div>
          <h2 className="text-center text-3xl font-serif font-bold tracking-tight text-on-surface">
            Join the <span className="italic text-primary">Sanctum</span>
          </h2>
          <p className="mt-3 text-center text-sm text-on-surface-variant/80">
            Register with your IITK credentials to enter the club.
          </p>
        </div>

        {/* Show Error or Success Messages */}
        {error && <div className="text-red-500 text-sm text-center font-semibold bg-red-500/10 p-3 rounded-lg">{error}</div>}
        {success && <div className="text-green-500 text-sm text-center font-semibold bg-green-500/10 p-3 rounded-lg">{success}</div>}

        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-5 rounded-md shadow-sm">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2 ml-1" htmlFor="email-address">Email Address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3.5 border border-outline-variant/20 bg-surface-container-lowest placeholder-on-surface-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                placeholder="grandmaster@iitk.ac.in"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2 ml-1" htmlFor="chess-id">Chess.com ID</label>
              <input
                id="chess-id"
                name="chessId"
                type="text"
                required
                value={chessUsername}
                onChange={(e) => setChessUsername(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3.5 border border-outline-variant/20 bg-surface-container-lowest placeholder-on-surface-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                placeholder="magnuscarlsen"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.2em] mb-2 ml-1" htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-4 py-3.5 pr-12 border border-outline-variant/20 bg-surface-container-lowest placeholder-on-surface-variant/30 text-on-surface rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2 space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-on-primary bg-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(242,202,80,0.3)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-surface transition-all duration-300"
            >
              Create Account
            </button>
            
            <p className="text-center text-sm text-on-surface-variant">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;