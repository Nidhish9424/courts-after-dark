import { useEffect, useState } from "react";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  CircleUserRound,
  Clock3,
  Dumbbell,
  Footprints,
  Heart,
  Home,
  Lightbulb,
  LocateFixed,
  LogOut,
  MapPin,
  MessageSquareText,
  MoonStar,
  Navigation,
  Phone,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TicketCheck,
  Trophy,
  UserRound,
  Volleyball,
  X,
  Zap,
} from "lucide-react";
const heroImage = `${import.meta.env.BASE_URL}night-court.jpg`;

type Page =
  | "home"
  | "explore"
  | "bookings"
  | "safety"
  | "profile"
  | "feedback"
  | "details"
  | "book"
  | "success";

type Court = {
  id: number;
  name: string;
  sport: string;
  location: string;
  price: number;
  rating: number;
  lights: boolean;
  available: boolean;
  image: string;
  description: string;
  facilities: string[];
};

type Booking = {
  id: string;
  courtId: number;
  date: string;
  time: string;
  status: "Confirmed" | "Completed" | "Cancelled";
};

const COURTS: Court[] = [
  {
    id: 1,
    name: "Midnight Hoops Court",
    sport: "Basketball",
    location: "Indiranagar Sports Complex",
    price: 200,
    rating: 4.9,
    lights: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=85",
    description:
      "A competition-grade outdoor court built for fast night games, with even floodlighting and a high-grip all-weather surface.",
    facilities: ["LED floodlights", "Changing room", "Drinking water", "Equipment rental"],
  },
  {
    id: 2,
    name: "Shuttle House",
    sport: "Badminton",
    location: "Koramangala Indoor Arena",
    price: 150,
    rating: 4.8,
    lights: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=85",
    description:
      "A professional indoor badminton court with anti-glare lighting, sprung flooring and tournament-quality nets.",
    facilities: ["Anti-glare lights", "Wood flooring", "Locker room", "Racket rental"],
  },
  {
    id: 3,
    name: "The Night Pitch",
    sport: "Football",
    location: "HSR Sports District",
    price: 400,
    rating: 4.9,
    lights: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=1200&q=85",
    description:
      "A premium five-a-side turf with shadow-free lighting, cushioned synthetic grass and secure perimeter netting.",
    facilities: ["6 high-mast lights", "FIFA-grade turf", "Showers", "Free parking"],
  },
  {
    id: 4,
    name: "Skyline Volley Court",
    sport: "Volleyball",
    location: "Domlur Recreation Centre",
    price: 250,
    rating: 4.6,
    lights: false,
    available: true,
    image:
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=1200&q=85",
    description:
      "An open-air volleyball court with generous run-off zones and spectator seating. Lighting is currently under maintenance.",
    facilities: ["Sand-free surface", "Spectator seats", "First aid", "Parking"],
  },
  {
    id: 5,
    name: "Baseline Tennis Club",
    sport: "Tennis",
    location: "Cubbon Park Courts",
    price: 300,
    rating: 4.7,
    lights: true,
    available: false,
    image:
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=85",
    description:
      "A meticulously maintained acrylic hard court with club-standard illumination and a calm central-city setting.",
    facilities: ["LED floodlights", "Pro shop", "Ball machine", "Cafe"],
  },
  {
    id: 6,
    name: "Neon Pickle Club",
    sport: "Pickleball",
    location: "Whitefield Active Hub",
    price: 250,
    rating: 4.8,
    lights: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?auto=format&fit=crop&w=1200&q=85",
    description:
      "A lively dedicated pickleball court with bright line markings, low-glare lights and equipment ready to rent.",
    facilities: ["Low-glare lighting", "Paddle rental", "Seating", "Cafe"],
  },
  {
    id: 7,
    name: "Spin Social",
    sport: "Table Tennis",
    location: "MG Road Sports Lounge",
    price: 100,
    rating: 4.7,
    lights: true,
    available: true,
    image:
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?auto=format&fit=crop&w=1200&q=85",
    description:
      "A modern table tennis studio for casual rallies and competitive play, with bright uniform indoor lighting.",
    facilities: ["Competition tables", "Bat rental", "Air conditioned", "Lounge"],
  },
];

const sports = [
  "All",
  "Basketball",
  "Badminton",
  "Football",
  "Volleyball",
  "Tennis",
  "Pickleball",
  "Table Tennis",
];
const slots = ["6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo-lockup">
      <div className="logo-mark">
        <MoonStar size={compact ? 18 : 25} strokeWidth={2.4} />
        <span />
      </div>
      {!compact && (
        <div>
          <strong>COURTS</strong>
          <small>AFTER DARK</small>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ type, value }: { type: "light" | "availability"; value: boolean }) {
  const positive = value;
  return (
    <span className={`status-badge ${positive ? "positive" : "negative"}`}>
      {type === "light" ? (
        <Lightbulb size={11} fill="currentColor" />
      ) : (
        <span className="status-dot" />
      )}
      {type === "light" ? `LIGHTS ${value ? "ON" : "OFF"}` : value ? "AVAILABLE" : "OCCUPIED"}
    </span>
  );
}

function TopBar({ title, back, onBack }: { title?: string; back?: boolean; onBack?: () => void }) {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <header className="topbar">
      {back ? (
        <button className="icon-button" onClick={onBack} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
      ) : (
        <Logo compact />
      )}
      {title && <h2>{title}</h2>}
      <button
        className="icon-button"
        aria-label="Notifications"
        aria-expanded={showNotifications}
        onClick={() => setShowNotifications((shown) => !shown)}
      >
        <Bell size={19} />
        <i />
      </button>
      {showNotifications && (
        <div className="notification-popover" role="status">
          <button
            className="notification-close"
            aria-label="Close notifications"
            onClick={() => setShowNotifications(false)}
          >
            <X size={15} />
          </button>
          <strong>You're all caught up</strong>
          <span>Booking and safety updates will appear here.</span>
        </div>
      )}
    </header>
  );
}

function BottomNav({ page, setPage }: { page: Page; setPage: (page: Page) => void }) {
  const nav = [
    ["home", Home, "Home"],
    ["explore", Search, "Explore"],
    ["bookings", TicketCheck, "Bookings"],
    ["safety", ShieldCheck, "Safety"],
    ["profile", UserRound, "Profile"],
  ] as const;
  return (
    <nav className="bottom-nav">
      {nav.map(([id, Icon, label]) => (
        <button key={id} className={page === id ? "active" : ""} onClick={() => setPage(id)}>
          <span>
            <Icon size={20} strokeWidth={page === id ? 2.6 : 2} />
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}

function CourtCard({
  court,
  onOpen,
  compact = false,
  favorite,
  onToggleFavorite,
}: {
  court: Court;
  onOpen: (court: Court) => void;
  compact?: boolean;
  favorite: boolean;
  onToggleFavorite: (courtId: number) => void;
}) {
  return (
    <article
      className={`court-card ${compact ? "compact" : ""}`}
      onClick={() => onOpen(court)}
      onKeyDown={(event) => {
        if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen(court);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${court.name} details`}
    >
      <div className="court-image">
        <img src={court.image} alt={`${court.name} at night`} />
        <div className="court-image-badges">
          <StatusBadge type="light" value={court.lights} />
          <StatusBadge type="availability" value={court.available} />
        </div>
        <button
          className="heart-button"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favorite}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(court.id);
          }}
        >
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="court-content">
        <div className="eyebrow-row">
          <span>{court.sport}</span>
          <span className="rating">
            <Star size={13} fill="currentColor" /> {court.rating}
          </span>
        </div>
        <h3>{court.name}</h3>
        <p>
          <MapPin size={13} /> {court.location}
        </p>
        <div className="court-footer">
          <strong>
            ₹{court.price}
            <small>/hour</small>
          </strong>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(court);
            }}
          >
            {court.available && court.lights ? "Book now" : "View court"}
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function Onboarding({ onStart, onGuest }: { onStart: () => void; onGuest: () => void }) {
  return (
    <main className="onboarding">
      <img className="onboarding-bg" src={heroImage} alt="Floodlit basketball court at night" />
      <div className="onboarding-shade" />
      <div className="onboarding-top">
        <Logo />
        <span className="prototype-pill">NIGHT PLAY, REIMAGINED</span>
      </div>
      <div className="onboarding-copy">
        <div className="mini-stat">
          <Zap size={15} fill="currentColor" /> 6 listed courts report lights on
        </div>
        <h1>
          Own the night.
          <br />
          <em>Play your game.</em>
        </h1>
        <p>
          Find your game. Book your court.
          <br />
          Play safely after sunset.
        </p>
        <button className="primary-button large" onClick={onStart}>
          Get started <ChevronRight size={19} />
        </button>
        <button className="text-button" onClick={onGuest}>
          Continue as guest
        </button>
      </div>
    </main>
  );
}

function Auth({ onDone, onBack }: { onDone: (name: string) => void; onBack: () => void }) {
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="auth-screen">
      <button className="icon-button back-float" onClick={onBack}>
        <ArrowLeft size={20} />
      </button>
      <div className="auth-glow" />
      <Logo />
      <div className="auth-heading">
        <span>WELCOME TO THE NIGHT SHIFT</span>
        <h1>{signup ? "Create your player profile" : "Good to see you again"}</h1>
        <p>{signup ? "One account. Every court. All night." : "Sign in to book your next game."}</p>
      </div>
      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          onDone(name || email.split("@")[0] || "Player");
        }}
      >
        {signup && (
          <label>
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
        )}
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            minLength={4}
            required
          />
        </label>
        <button className="primary-button large" type="submit">
          {signup ? "Create account" : "Sign in"} <ChevronRight size={19} />
        </button>
      </form>
      <p className="auth-switch">
        {signup ? "Already a member?" : "New to Courts After Dark?"}{" "}
        <button onClick={() => setSignup(!signup)}>{signup ? "Sign in" : "Sign up"}</button>
      </p>
      <div className="or">
        <span /> OR <span />
      </div>
      <button className="guest-button" onClick={() => onDone("Guest Player")}>
        Continue as guest
      </button>
    </main>
  );
}

function HomePage({
  name,
  onExplore,
  onExploreSport,
  onOpen,
  onSafety,
  onProfile,
  favoriteIds,
  onToggleFavorite,
}: {
  name: string;
  onExplore: () => void;
  onExploreSport: (sport: string) => void;
  onOpen: (court: Court) => void;
  onSafety: () => void;
  onProfile: () => void;
  favoriteIds: number[];
  onToggleFavorite: (courtId: number) => void;
}) {
  return (
    <>
      <TopBar />
      <main className="page home-page">
        <section className="welcome">
          <div>
            <span>GOOD EVENING</span>
            <h1>{name}</h1>
          </div>
          <button className="avatar-button" onClick={onProfile} aria-label="Open player profile">
            <UserRound size={21} />
          </button>
        </section>
        <section className="hero-card">
          <img src={heroImage} alt="Night court" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="live-label">
              <i /> 5 COURTS SHOWN AS BOOKABLE
            </span>
            <h2>
              Ready to
              <br />
              <em>play?</em>
            </h2>
            <p>Your next game is just a few taps away.</p>
            <button onClick={onExplore}>
              <Search size={17} /> Find a court
            </button>
          </div>
          <div className="location-chip">
            <LocateFixed size={14} /> Sports Complex
          </div>
        </section>
        <section className="stats-row">
          <div>
            <Lightbulb size={18} />
            <strong>6</strong>
            <span>Lit courts</span>
          </div>
          <div>
            <BadgeCheck size={18} />
            <strong>5</strong>
            <span>Available</span>
          </div>
          <div>
            <MoonStar size={18} />
            <strong>4h</strong>
            <span>Night play</span>
          </div>
        </section>
        <p className="demo-data-note">
          Sample court availability · confirm lighting with venue staff before you travel.
        </p>
        <SectionHeading title="Choose your sport" action="See all" onAction={onExplore} />
        <div className="sport-scroll">
          {sports.slice(1).map((sport, index) => {
            const Icon = [
              CircleDot,
              Footprints,
              Trophy,
              Volleyball,
              CircleUserRound,
              Sparkles,
              Dumbbell,
            ][index];
            return (
              <button key={sport} onClick={() => onExploreSport(sport)}>
                <span>
                  <Icon size={21} />
                </span>
                {sport}
              </button>
            );
          })}
        </div>
        <SectionHeading title="Available tonight" action="Explore all" onAction={onExplore} />
        <div className="court-scroll">
          {COURTS.filter((c) => c.available && c.lights)
            .slice(0, 4)
            .map((court) => (
              <CourtCard
                key={court.id}
                court={court}
                onOpen={onOpen}
                compact
                favorite={favoriteIds.includes(court.id)}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
        </div>
        <button className="safety-banner" onClick={onSafety}>
          <div className="safety-icon">
            <ShieldCheck size={24} />
          </div>
          <div>
            <span>NIGHT SAFETY CENTRE</span>
            <strong>Play smart. Stay safe.</strong>
            <small>Lighting status, exits and emergency help</small>
          </div>
          <ChevronRight size={20} />
        </button>
      </main>
    </>
  );
}

function SectionHeading({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action && (
        <button onClick={onAction}>
          {action} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

function ExplorePage({
  onOpen,
  favoriteIds,
  onToggleFavorite,
  favoritesOnly,
  initialSport,
}: {
  onOpen: (court: Court) => void;
  favoriteIds: number[];
  onToggleFavorite: (courtId: number) => void;
  favoritesOnly: boolean;
  initialSport: string;
}) {
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState(initialSport);
  const [availability, setAvailability] = useState<"all" | "available">("all");
  const [lights, setLights] = useState<"all" | "on">("all");
  const [sortAscending, setSortAscending] = useState(true);
  const results = COURTS.filter(
    (c) =>
      (sport === "All" || c.sport === sport) &&
      (availability === "all" || c.available) &&
      (lights === "all" || c.lights) &&
      (!favoritesOnly || favoriteIds.includes(c.id)) &&
      `${c.name} ${c.location} ${c.sport}`.toLowerCase().includes(search.toLowerCase()),
  ).sort((a, b) => (sortAscending ? a.price - b.price : b.price - a.price));
  return (
    <>
      <TopBar title={favoritesOnly ? "Favourite courts" : "Explore courts"} />
      <main className="page explore-page">
        <div className="explore-intro">
          <span>{favoritesOnly ? "YOUR SAVED NIGHT GAMES" : "FIND YOUR NEXT GAME"}</span>
          <h1>{favoritesOnly ? "Favourite courts" : "Courts after sunset"}</h1>
          <p>Lighting and availability shown are sample venue data.</p>
        </div>
        <div className="search-box">
          <Search size={19} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search court, sport or area"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={17} />
            </button>
          )}
        </div>
        <div className="filter-row">
          <button
            className={availability === "available" ? "selected" : ""}
            onClick={() => setAvailability(availability === "all" ? "available" : "all")}
          >
            <BadgeCheck size={15} /> Available
          </button>
          <button
            className={lights === "on" ? "selected" : ""}
            onClick={() => setLights(lights === "all" ? "on" : "all")}
          >
            <Lightbulb size={15} /> Lights on
          </button>
          <button onClick={() => setSortAscending((ascending) => !ascending)}>
            <SlidersHorizontal size={15} /> Price {sortAscending ? "low–high" : "high–low"}
          </button>
        </div>
        <div className="tab-scroll">
          {sports.map((item) => (
            <button
              key={item}
              className={sport === item ? "active" : ""}
              onClick={() => setSport(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="result-count">
          <strong>
            {results.length} {results.length === 1 ? "court" : "courts"}
          </strong>
          <span>Check directly with the venue before travel</span>
        </div>
        <div className="court-list">
          {results.map((court) => (
            <CourtCard
              key={court.id}
              court={court}
              onOpen={onOpen}
              favorite={favoriteIds.includes(court.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
          {!results.length && (
            <div className="empty-state">
              <Search size={30} />
              <h3>No courts found</h3>
              <p>Try changing your search or filters.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function DetailsPage({
  court,
  onBack,
  onBook,
  favorite,
  onToggleFavorite,
}: {
  court: Court;
  onBack: () => void;
  onBook: () => void;
  favorite: boolean;
  onToggleFavorite: (courtId: number) => void;
}) {
  return (
    <main className="details-page">
      <div className="details-image">
        <img src={court.image} alt={court.name} />
        <div className="details-gradient" />
        <button className="icon-button details-back" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <button
          className="icon-button details-heart"
          aria-label={favorite ? "Remove from favourites" : "Add to favourites"}
          aria-pressed={favorite}
          onClick={() => onToggleFavorite(court.id)}
        >
          <Heart size={19} fill={favorite ? "currentColor" : "none"} />
        </button>
        <div className="details-badges">
          <StatusBadge type="light" value={court.lights} />
          <StatusBadge type="availability" value={court.available} />
        </div>
      </div>
      <div className="details-content">
        <div className="eyebrow-row">
          <span>{court.sport.toUpperCase()}</span>
          <span className="rating">
            <Star size={14} fill="currentColor" /> {court.rating} <small>(126 reviews)</small>
          </span>
        </div>
        <h1>{court.name}</h1>
        <p className="detail-location">
          <MapPin size={15} /> {court.location}
        </p>
        <div className="detail-metrics">
          <div>
            <Clock3 size={18} />
            <span>
              Night hours<strong>6 PM – 10 PM</strong>
            </span>
          </div>
          <div>
            <Lightbulb size={18} />
            <span>
              Lighting<strong>{court.lights ? "Fully illuminated" : "Maintenance"}</strong>
            </span>
          </div>
        </div>
        <section className="detail-section">
          <h2>About this court</h2>
          <p>{court.description}</p>
        </section>
        <section className="detail-section">
          <h2>Facilities</h2>
          <div className="facility-grid">
            {court.facilities.map((f) => (
              <span key={f}>
                <Check size={14} /> {f}
              </span>
            ))}
          </div>
        </section>
        <section className="safety-note">
          <ShieldCheck size={22} />
          <div>
            <strong>Night safety checklist</strong>
            <p>Sample listing only. Confirm exits and on-site support with venue staff before play.</p>
          </div>
          <ChevronRight size={18} />
        </section>
        <section className="detail-section">
          <h2>Tonight's slots</h2>
          <div className="slot-preview">
            {slots.map((slot, i) => (
              <span className={i === 1 ? "busy" : ""} key={slot}>
                {slot}
              </span>
            ))}
          </div>
        </section>
      </div>
      <div className="booking-bar">
        <div>
          <strong>₹{court.price}</strong>
          <span>/ hour</span>
        </div>
        <button disabled={!court.available || !court.lights} onClick={onBook}>
          {!court.lights
            ? "LIGHTS CURRENTLY OFF"
            : !court.available
              ? "CURRENTLY OCCUPIED"
              : "BOOK THIS COURT"}
        </button>
      </div>
    </main>
  );
}

function BookingPage({
  court,
  onBack,
  onConfirm,
}: {
  court: Court;
  onBack: () => void;
  onConfirm: (date: string, time: string) => void;
}) {
  const today = new Date();
  const dates = Array.from({ length: 5 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });
  const [selectedDate, setSelectedDate] = useState(dateKey(dates[0]));
  const [selectedSlot, setSelectedSlot] = useState("8:00 PM");
  return (
    <>
      <TopBar title="Book your court" back onBack={onBack} />
      <main className="page booking-page">
        <div className="booking-court">
          <img src={court.image} alt={court.name} />
          <div>
            <span>{court.sport}</span>
            <h2>{court.name}</h2>
            <p>
              <MapPin size={13} /> {court.location}
            </p>
          </div>
        </div>
        <div className="step-label">
          <span>1</span>
          <div>
            <strong>Choose a date</strong>
            <small>All times shown in IST</small>
          </div>
        </div>
        <div className="date-row">
          {dates.map((date) => {
            const value = dateKey(date);
            return (
              <button
                key={value}
                className={selectedDate === value ? "selected" : ""}
                onClick={() => setSelectedDate(value)}
              >
                <small>{date.toLocaleDateString("en-IN", { weekday: "short" })}</small>
                <strong>{date.getDate()}</strong>
                <span>{date.toLocaleDateString("en-IN", { month: "short" })}</span>
              </button>
            );
          })}
        </div>
        <div className="step-label">
          <span>2</span>
          <div>
            <strong>Select a night slot</strong>
            <small>One-hour booking</small>
          </div>
        </div>
        <div className="time-grid">
          {slots.map((slot, i) => (
            <button
              disabled={i === 1}
              className={selectedSlot === slot ? "selected" : ""}
              onClick={() => setSelectedSlot(slot)}
              key={slot}
            >
              <MoonStar size={16} /> {slot}
              {i === 1 && <small>Booked</small>}
            </button>
          ))}
        </div>
        <section className="summary-card">
          <div className="summary-title">
            <TicketCheck size={19} />
            <h2>Booking summary</h2>
          </div>
          <dl>
            <div>
              <dt>Court</dt>
              <dd>{court.name}</dd>
            </div>
            <div>
              <dt>Date</dt>
              <dd>
                {new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-IN", {
                  weekday: "short",
                  day: "numeric",
                  month: "long",
                })}
              </dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>
                {selectedSlot} – {Number(selectedSlot.split(":")[0]) + 1}:00 PM
              </dd>
            </div>
            <div>
              <dt>Court fee</dt>
              <dd>₹{court.price}</dd>
            </div>
            <div>
              <dt>Platform fee</dt>
              <dd>₹20</dd>
            </div>
          </dl>
          <div className="summary-total">
            <span>Total</span>
            <strong>₹{court.price + 20}</strong>
          </div>
        </section>
        <button
          className="primary-button large confirm-button"
          onClick={() => onConfirm(selectedDate, selectedSlot)}
        >
          Confirm & pay ₹{court.price + 20} <ChevronRight size={19} />
        </button>
        <p className="secure-note">
          <ShieldCheck size={14} /> Secure demo booking • No payment will be charged
        </p>
      </main>
    </>
  );
}

function SuccessPage({
  court,
  booking,
  onBookings,
  onHome,
}: {
  court: Court;
  booking: Booking;
  onBookings: () => void;
  onHome: () => void;
}) {
  return (
    <main className="success-page">
      <div className="success-orbit">
        <span />
        <div>
          <Check size={36} strokeWidth={3} />
        </div>
      </div>
      <span className="success-label">BOOKING CONFIRMED</span>
      <h1>Game on!</h1>
      <p>Your court is lit, ready and waiting.</p>
      <section className="ticket">
        <div className="ticket-image">
          <img src={court.image} alt={court.name} />
          <StatusBadge type="light" value />
        </div>
        <div className="ticket-main">
          <span>{court.sport}</span>
          <h2>{court.name}</h2>
          <p>
            <MapPin size={13} /> {court.location}
          </p>
        </div>
        <div className="ticket-grid">
          <div>
            <CalendarDays size={17} />
            <span>
              DATE
              <strong>
                {new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
            </span>
          </div>
          <div>
            <Clock3 size={17} />
            <span>
              TIME<strong>{booking.time}</strong>
            </span>
          </div>
          <div>
            <TicketCheck size={17} />
            <span>
              BOOKING ID<strong>{booking.id}</strong>
            </span>
          </div>
          <div>
            <span className="rupee">₹</span>
            <span>
              TOTAL<strong>₹{court.price + 20}</strong>
            </span>
          </div>
        </div>
      </section>
      <button className="primary-button large" onClick={onBookings}>
        View my bookings <ChevronRight size={19} />
      </button>
      <button className="text-button" onClick={onHome}>
        Return home
      </button>
    </main>
  );
}

function BookingsPage({
  bookings,
  cancel,
  onOpen,
}: {
  bookings: Booking[];
  cancel: (id: string) => void;
  onOpen: (court: Court) => void;
}) {
  const [tab, setTab] = useState<"upcoming" | "completed">("upcoming");
  const shown = bookings.filter((b) =>
    tab === "completed" ? b.status === "Completed" : b.status !== "Completed",
  );
  return (
    <>
      <TopBar title="My bookings" />
      <main className="page bookings-page">
        <div className="explore-intro">
          <span>YOUR NIGHT GAMES</span>
          <h1>Bookings</h1>
          <p>Everything you need for your next match.</p>
        </div>
        <div className="segmented">
          <button className={tab === "upcoming" ? "active" : ""} onClick={() => setTab("upcoming")}>
            Upcoming
          </button>
          <button
            className={tab === "completed" ? "active" : ""}
            onClick={() => setTab("completed")}
          >
            Completed
          </button>
        </div>
        <div className="booking-list">
          {shown.map((booking) => {
            const court = COURTS.find((c) => c.id === booking.courtId)!;
            return (
              <article className="booking-item" key={booking.id}>
                <img src={court.image} alt={court.name} />
                <div className="booking-item-top">
                  <span>{court.sport}</span>
                  <b className={booking.status.toLowerCase()}>{booking.status}</b>
                </div>
                <h2>{court.name}</h2>
                <p>
                  <CalendarDays size={14} />{" "}
                  {new Date(`${booking.date}T12:00:00`).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  <i /> <Clock3 size={14} /> {booking.time}
                </p>
                <small>BOOKING ID · {booking.id}</small>
                <div className="booking-actions">
                  <button onClick={() => onOpen(court)}>View details</button>
                  {booking.status === "Confirmed" && (
                    <button className="cancel" onClick={() => cancel(booking.id)}>
                      Cancel booking
                    </button>
                  )}
                </div>
              </article>
            );
          })}
          {!shown.length && (
            <div className="empty-state">
              <CalendarDays size={32} />
              <h3>No {tab} bookings</h3>
              <p>Your night games will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

function SafetyPage({ onFeedback }: { onFeedback: () => void }) {
  const checklist = [
    "Ensure court lights are ON.",
    "Check the court surface.",
    "Identify emergency exits.",
    "Keep your phone charged.",
    "Avoid isolated areas.",
    "Prefer playing with teammates.",
  ];
  const [checked, setChecked] = useState<number[]>([0, 2]);
  return (
    <>
      <TopBar title="Night Safety Centre" />
      <main className="page safety-page">
        <section className="safety-hero">
          <div className="safety-radar">
            <ShieldCheck size={32} />
            <span />
          </div>
          <span>SAFETY STATUS</span>
          <h1>Check in before you play</h1>
          <p>
            {COURTS.filter((court) => court.lights).length} of {COURTS.length} listed courts report
            lights on in this sample. Confirm conditions and exits with staff before playing.
          </p>
          <div>
            <i /> Sample status · confirm on arrival
          </div>
        </section>
        <section className="emergency-card">
          <div>
            <Phone size={23} />
            <span>
              <small>EMERGENCY HELPLINE · INDIA</small>
              <strong>112</strong>
              <p>Police · Fire · Ambulance</p>
            </span>
          </div>
          <a href="tel:112">Call now</a>
        </section>
        <SectionHeading title="Before you play" />
        <div className="checklist">
          {checklist.map((item, i) => (
            <button
              key={item}
              className={checked.includes(i) ? "checked" : ""}
              onClick={() =>
                setChecked(checked.includes(i) ? checked.filter((x) => x !== i) : [...checked, i])
              }
            >
              <span>{checked.includes(i) && <Check size={14} />}</span>
              {item}
            </button>
          ))}
        </div>
        <SectionHeading title="At your court" />
        <section className="venue-safety">
          <div>
            <Navigation size={19} />
            <span>
              <small>NEAREST EXIT</small>
              <strong>Ask venue staff to identify it</strong>
            </span>
          </div>
          <div>
            <MapPin size={19} />
            <span>
              <small>COURT LOCATION</small>
              <strong>Indiranagar Sports Complex</strong>
            </span>
          </div>
          <div>
            <Lightbulb size={19} />
            <span>
              <small>LIGHTING</small>
              <strong>Confirm status with venue staff</strong>
            </span>
            <span className="status-badge neutral">SAMPLE STATUS</span>
          </div>
        </section>
        <button className="report-button" onClick={onFeedback}>
          <MessageSquareText size={18} /> Report unsafe conditions <ChevronRight size={17} />
        </button>
      </main>
    </>
  );
}

function FeedbackPage({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState("Lighting issue");
  const [court, setCourt] = useState("");
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  if (sent)
    return (
      <main className="feedback-success">
        <div>
          <Check size={34} />
        </div>
        <span>REPORT RECEIVED</span>
        <h1>Thanks for looking out.</h1>
        <p>Our safety team will review your report and update the venue status.</p>
        <button className="primary-button large" onClick={onBack}>
          Return to previous page
        </button>
      </main>
    );
  return (
    <>
      <TopBar title="Report & feedback" back onBack={onBack} />
      <main className="page feedback-page">
        <div className="explore-intro">
          <span>HELP US IMPROVE</span>
          <h1>Tell us what happened</h1>
          <p>Reports help every player enjoy a safer night game.</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label>
            Feedback category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {[
                "Lighting issue",
                "Court condition",
                "Safety issue",
                "Booking problem",
                "Feature suggestion",
                "Other",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            Court
            <select value={court} onChange={(e) => setCourt(e.target.value)} required>
              <option value="">Select a court</option>
              {COURTS.map((x) => (
                <option key={x.id}>{x.name}</option>
              ))}
            </select>
          </label>
          <label>
            Tell us more
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Describe what you noticed..."
              rows={6}
              required
            />
          </label>
          <p>
            <ShieldCheck size={14} /> Your report is private and shared only with the venue team.
          </p>
          <button className="primary-button large" type="submit">
            Submit report <ChevronRight size={18} />
          </button>
        </form>
      </main>
    </>
  );
}

function ProfilePage({
  name,
  onNavigate,
  onFavorites,
  onFeedback,
  onLogout,
  favoriteCount,
}: {
  name: string;
  onNavigate: (p: Page) => void;
  onFavorites: () => void;
  onFeedback: () => void;
  onLogout: () => void;
  favoriteCount: number;
}) {
  const [settingsNotice, setSettingsNotice] = useState(false);
  const links = [
    [TicketCheck, "My bookings", "View upcoming and past games", "bookings"],
    [Heart, "Favourite courts", "Your saved night venues", "favorites"],
    [ShieldCheck, "Safety Centre", "Check lighting and venue safety", "safety"],
    [MessageSquareText, "Feedback", "Report an issue or share an idea", "feedback"],
    [Settings, "Settings", "Notifications, privacy and preferences", "settings"],
  ] as const;
  return (
    <>
      <TopBar title="Player profile" />
      <main className="page profile-page">
        <section className="profile-header">
          <div className="profile-avatar">
            <UserRound size={36} />
            <i />
          </div>
          <div>
            <span>NIGHT PLAYER</span>
            <h1>{name}</h1>
            <p>{name.toLowerCase().replace(" ", ".")}@example.com</p>
          </div>
          <button
            aria-label="Profile settings"
            onClick={() => setSettingsNotice((shown) => !shown)}
          >
            <Settings size={18} />
          </button>
        </section>
        {settingsNotice && (
          <p className="settings-notice" role="status">
            Account settings are not available in this demo yet.
          </p>
        )}
        <div className="profile-stats">
          <div>
            <strong>03</strong>
            <span>Games played</span>
          </div>
          <div>
            <strong>{String(favoriteCount).padStart(2, "0")}</strong>
            <span>Favourites</span>
          </div>
          <div>
            <strong>4.8</strong>
            <span>Player rating</span>
          </div>
        </div>
        <section className="profile-links">
          {links.map(([Icon, title, sub, page]) => (
            <button
              key={title}
              onClick={() => {
                if (page === "favorites") onFavorites();
                else if (page === "settings") setSettingsNotice((shown) => !shown);
                else if (page === "feedback") onFeedback();
                else onNavigate(page);
              }}
            >
              <span>
                <Icon size={19} />
              </span>
              <div>
                <strong>{title}</strong>
                <small>{sub}</small>
              </div>
              <ChevronRight size={18} />
            </button>
          ))}
        </section>
        <button className="logout-button" onClick={onLogout}>
          <LogOut size={18} /> Log out
        </button>
        <p className="version">COURTS AFTER DARK · VERSION 1.0</p>
      </main>
    </>
  );
}

export default function App() {
  const [stage, setStage] = useState<"onboarding" | "auth" | "app">("onboarding");
  const [name, setName] = useState("Arjun");
  const [page, setPage] = useState<Page>("home");
  const [detailPreviousPage, setDetailPreviousPage] = useState<Page>("explore");
  const [selectedCourt, setSelectedCourt] = useState<Court>(COURTS[0]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [exploreSport, setExploreSport] = useState("All");
  const [feedbackPreviousPage, setFeedbackPreviousPage] = useState<Page>("safety");
  const [lastBooking, setLastBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "CAD-7942",
      courtId: 3,
      date: dateKey(new Date(Date.now() + 86400000)),
      time: "8:00 PM",
      status: "Confirmed",
    },
    { id: "CAD-3108", courtId: 2, date: "2025-02-12", time: "7:00 PM", status: "Completed" },
  ]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, stage]);

  const openCourt = (court: Court) => {
    setDetailPreviousPage(page);
    setSelectedCourt(court);
    setPage("details");
  };
  const toggleFavorite = (courtId: number) => {
    setFavoriteIds((current) =>
      current.includes(courtId) ? current.filter((id) => id !== courtId) : [...current, courtId],
    );
  };
  const navigate = (next: Page) => {
    if (next !== "explore") setFavoritesOnly(false);
    setPage(next);
  };
  const openExplore = (sport = "All") => {
    setFavoritesOnly(false);
    setExploreSport(sport);
    setPage("explore");
  };
  const openFavorites = () => {
    setFavoritesOnly(true);
    setExploreSport("All");
    setPage("explore");
  };
  const openFeedback = () => {
    setFeedbackPreviousPage(page);
    navigate("feedback");
  };

  if (stage === "onboarding")
    return (
      <div className="app-shell">
        <Onboarding
          onStart={() => setStage("auth")}
          onGuest={() => {
            setName("Guest Player");
            setStage("app");
          }}
        />
      </div>
    );
  if (stage === "auth")
    return (
      <div className="app-shell">
        <Auth
          onBack={() => setStage("onboarding")}
          onDone={(user) => {
            setName(user);
            setStage("app");
          }}
        />
      </div>
    );

  let content;
  if (page === "home")
    content = (
      <HomePage
        name={name}
        onExplore={() => openExplore()}
        onExploreSport={openExplore}
        onOpen={openCourt}
        onSafety={() => navigate("safety")}
        onProfile={() => navigate("profile")}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
      />
    );
  else if (page === "explore")
    content = (
      <ExplorePage
        onOpen={openCourt}
        favoriteIds={favoriteIds}
        onToggleFavorite={toggleFavorite}
        favoritesOnly={favoritesOnly}
        initialSport={exploreSport}
      />
    );
  else if (page === "details")
    content = (
      <DetailsPage
        court={selectedCourt}
        onBack={() => navigate(detailPreviousPage)}
        onBook={() => navigate("book")}
        favorite={favoriteIds.includes(selectedCourt.id)}
        onToggleFavorite={toggleFavorite}
      />
    );
  else if (page === "book")
    content = (
      <BookingPage
        court={selectedCourt}
        onBack={() => navigate("details")}
        onConfirm={(date, time) => {
          const booking: Booking = {
            id: `CAD-${Math.floor(1000 + Math.random() * 9000)}`,
            courtId: selectedCourt.id,
            date,
            time,
            status: "Confirmed",
          };
          setBookings((old) => [booking, ...old]);
          setLastBooking(booking);
          navigate("success");
        }}
      />
    );
  else if (page === "success" && lastBooking)
    content = (
      <SuccessPage
        court={selectedCourt}
        booking={lastBooking}
        onBookings={() => navigate("bookings")}
        onHome={() => navigate("home")}
      />
    );
  else if (page === "bookings")
    content = (
      <BookingsPage
        bookings={bookings}
        cancel={(id) =>
          setBookings((old) => old.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)))
        }
        onOpen={openCourt}
      />
    );
  else if (page === "safety") content = <SafetyPage onFeedback={openFeedback} />;
  else if (page === "feedback")
    content = <FeedbackPage onBack={() => navigate(feedbackPreviousPage)} />;
  else
    content = (
      <ProfilePage
        name={name}
        onNavigate={navigate}
        onFavorites={openFavorites}
        onFeedback={openFeedback}
        favoriteCount={favoriteIds.length}
        onLogout={() => {
          setStage("onboarding");
          setPage("home");
        }}
      />
    );

  const showNav = ["home", "explore", "bookings", "safety", "profile"].includes(page);
  return (
    <div className="app-shell">
      {content}
      {showNav && <BottomNav page={page} setPage={navigate} />}
    </div>
  );
}
