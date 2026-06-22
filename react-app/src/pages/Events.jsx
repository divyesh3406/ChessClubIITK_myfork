import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const OFFICIAL_EVENTS = [
  {
    id: 1,
    title: "League of Legends 6.0",
    date: "August 7, 2026",
    tag: "Tournament",
    time: "Multiple Days",
    location: "chess.com",
    shortDesc: "An open-for-all 4-player team event. Qualifiers start August 7th with the best advancing to knockouts!",
    fullDesc: "Form a 4-player team and compete in the legendary online qualifier arena (3+2 blitz format) on August 7th! The stakes are high: only the top 6 teams overall, along with the top 2 Alumni teams, will qualify for the knockouts. The semi-finals and finals knockouts will transition to a high-pressure 5+0 format.",
    schedule: [
      { time: "Aug 7th", activity: "Qualifier Arena (Blitz 3+2)" },
      { time: "Aug 8th", activity: "Semi-Finals Knockouts (Blitz 5+0)" },
      { time: "Aug 9th", activity: "Grand Finals (Blitz 5+0)" }
    ],
    prizes: "Winning team gets 4 Gold Memberships!"
  },
  {
    id: 2,
    title: "Fresher's Chess League",
    date: "August 21, 2026",
    tag: "Tournament",
    time: "Multiple Days",
    location: "Senate Hall & OAT",
    shortDesc: "An 8-player team OTB tournament featuring offline auctions, pools, and knockouts!",
    fullDesc: "Experience the thrill of OTB chess! The tournament begins on August 21st with an offline auction in the Senate Hall to distribute players into 8 teams. The teams will be divided into 2 pools of 4 teams each. You will battle it out in a Round Robin stage (10+5 format) where each team plays the other 3. The top 2 teams from each pool advance to the fiery semi-finals and finals on August 23rd!",
    schedule: [
      { time: "Aug 21st", activity: "Player Auctions (Senate Hall)" },
      { time: "Aug 22nd", activity: "Round Robin Pool Stages (OAT)" },
      { time: "Aug 23rd", activity: "Semi-Finals & Finals (OAT)" }
    ],
    prizes: "8 Gold Memberships for Winners + Mama Mio Coupons for Top 50!"
  },
  {
    id: 3,
    title: "IITK Grand Swiss",
    date: "October 2, 2026",
    tag: "Tournament",
    time: "Multiple Days",
    location: "Hall 3 Mess",
    shortDesc: "A 7-round Swiss OTB tournament. The gateway to the Candidates and the Chess Cup!",
    fullDesc: "Calling all chess enthusiasts! The IITK Grand Swiss is entirely an Over-The-Board (OTB) tournament played under a 10+5 rapid time format using the Swiss System format. Across 7 grueling rounds, players will battle it out to secure highly coveted spots in the next IITK Candidates tournament and the Chess Cup.",
    schedule: [
      { time: "Oct 2nd", activity: "Rounds 1 - 3" },
      { time: "Oct 3rd", activity: "Rounds 4 & 5" },
      { time: "Oct 4th", activity: "Rounds 6 & 7 (Finals)" }
    ],
    prizes: "Top 3: Candidates. Pos 4-17: Chess Cup. Top 5: Gold Memberships. Top 50: Coupons."
  }
];

const Events = () => {
  const { isLoggedIn } = useAuth();
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="px-12 py-12 max-w-5xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="text-5xl font-serif text-on-surface leading-tight tracking-tight mb-4">Upcoming Events</h1>
        <p className="text-on-surface-variant text-base max-w-2xl leading-relaxed">
          The curated schedule of major club events, workshops, and tournaments. For your personal match schedule, please consult the Calendar.
        </p>
      </div>

      <div className="space-y-6">
        {OFFICIAL_EVENTS.map(event => {
          const isExpanded = expandedId === event.id;
          
          return (
            <div 
              key={event.id}
              className={`bg-surface-container-low border transition-all duration-500 rounded-xl overflow-hidden ${isExpanded ? 'border-primary/50 shadow-[0_10px_30px_rgba(212,175,55,0.1)]' : 'border-[#4d4635]/20 hover:border-outline-variant/40 hover:bg-surface-container'}`}
            >
              {/* Clickable Header */}
              <div 
                onClick={() => toggleExpand(event.id)}
                className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 text-[10px] font-label uppercase tracking-widest font-bold">
                    <span className={
                      event.tag === 'Tournament' ? 'text-primary' : 
                      event.tag === 'Workshop' ? 'text-on-surface' : 
                      'text-blue-400'
                    }>{event.tag}</span>
                    <span className="text-on-surface-variant/50">•</span>
                    <span className="text-on-surface-variant">{event.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-on-surface mb-2">{event.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed max-w-3xl">{event.shortDesc}</p>
                </div>
                
                <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t border-outline-variant/10 md:border-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <p className="text-[10px] uppercase font-label tracking-widest text-on-surface-variant mb-1">Time</p>
                    <p className="text-xs font-bold text-on-surface">{event.time}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-inner border ${isExpanded ? 'bg-primary border-primary text-[#3c2f00] rotate-180' : 'bg-[#2a2828] border-outline-variant/40 text-[#e5e2e1]'}`}>
                    <span className="material-symbols-outlined text-xl">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Expandable Accordion Body */}
              <div className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-8 pt-2 border-t border-outline-variant/10">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                      
                      <div className="col-span-1 md:col-span-8">
                        <h4 className="text-xs font-label text-primary uppercase tracking-widest mb-4">Event Briefing</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed mb-8">{event.fullDesc}</p>
                        
                        <h4 className="text-xs font-label text-primary uppercase tracking-widest mb-4">Agenda Overview</h4>
                        <div className="space-y-3 bg-[#131313] p-5 rounded-lg border border-outline-variant/10">
                          {event.schedule.map((item, idx) => (
                            <div key={idx} className="flex gap-4 items-center">
                              <span className="w-16 shrink-0 text-xs font-bold text-on-surface-variant">{item.time}</span>
                              <span className="w-2 h-2 rounded-full bg-primary/40"></span>
                              <span className="text-xs text-on-surface">{item.activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-4 space-y-6">
                        <div className="bg-[#131313] p-5 rounded-lg border border-outline-variant/10">
                           <h4 className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                             <span className="material-symbols-outlined text-[14px]">location_on</span> Location
                           </h4>
                           <p className="text-sm text-on-surface font-bold">{event.location}</p>
                        </div>

                        <div className="bg-[#131313] p-5 rounded-lg border border-[#f2ca50]/20">
                           <h4 className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-2 flex items-center gap-2">
                             <span className="material-symbols-outlined text-[14px] text-primary">emoji_events</span> Honors
                           </h4>
                           <p className="text-sm text-primary font-bold">{event.prizes}</p>
                        </div>
                        
                        {isLoggedIn && (
                          <Link 
                            to={`/events/register/${event.id}`}
                            className="w-full block text-center bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00] font-bold py-3.5 rounded-lg text-xs uppercase tracking-widest hover:scale-[1.02] shadow-lg transition-transform outline-none mt-4"
                          >
                            Register
                          </Link>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
        <footer className="relative mt-20 border-t border-outline-variant/10 bg-surface-container-lowest px-6 py-14 sm:px-8 md:px-12 lg:px-16 before:content-[''] before:absolute before:inset-0 before:bg-surface-container-lowest before:-mx-[100vw] before:z-[-1]">
  <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
    <div className="max-w-md">
      <h6 className="m-0 text-xl font-serif text-primary sm:text-2xl">
        Chess Club IITK
      </h6>
      <p className="mt-4 m-0 max-w-sm text-sm leading-relaxed text-on-surface-variant">
        The official intellectual repository and match-log of the Chess Club at the Indian Institute of Technology, Kanpur. Founded for the love of the game, sustained by the pursuit of logic.
      </p>
    </div>

    <div className="md:max-w-md md:text-right">
      <p className="m-0 text-[10px] font-label uppercase tracking-widest text-primary">
        Connect
      </p>

      <div className="mt-5 flex flex-wrap gap-3 md:justify-end">
        <a
          href="https://www.instagram.com/chessiitk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          Instagram
        </a>

        <a
          href="mailto:chessclub@iitk.ac.in"
          aria-label="Email"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          Email
        </a>

        <a
          href="https://x.com/chessiitk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          X
        </a>

        <a
          href="https://www.linkedin.com/company/chess-iitk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          LinkedIn
        </a>

        <a
          href="https://www.facebook.com/chessclubiitk/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          Facebook
        </a>

        <a
          href="https://www.chess.com/club/iitk-chess-club"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chess.com"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          Chess.com
        </a>

        <a
          href="https://www.threads.com/@chessiitk?xmt=AQG0WclpAXcX0l6MVRZkMQ6ltp7AQi8X1H4vyrFo6qXNahU"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Threads"
          className="inline-flex h-9 items-center justify-center rounded-full border border-outline-variant/30 px-4 text-xs font-medium text-on-surface-variant transition-all hover:border-primary hover:text-primary"
        >
          Threads
        </a>
      </div>
    </div>
  </div>

  <div className="mt-12 flex flex-col gap-3 border-t border-outline-variant/10 pt-6 text-[10px] font-label uppercase tracking-widest text-on-surface-variant/50 sm:flex-row sm:items-center sm:justify-between">
    <span>© 2024 Chess Club IITK. Intellectual Property Reserved.</span>
    <span>Est. 1960</span>
  </div>
</footer>

    </div>
  );
};

export default Events;
