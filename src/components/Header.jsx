import './Header.css';

const Header = () => {
    const size = 44;
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-brand">
                    <svg
                        width={size}
                        height={size}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: 'block' }}
                    >
                        <defs>
                            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#a52525', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#c93030', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#8b1f1f', stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>

                        {/* Background with rounded corners */}
                        <rect width="32" height="32" rx="6" fill="url(#logoGradient)" />

                        {/* Dumbbell icon - workout theme */}
                        <g fill="white">
                            {/* Left weight */}
                            <rect x="6" y="12" width="4" height="8" rx="1" />

                            {/* Right weight */}
                            <rect x="22" y="12" width="4" height="8" rx="1" />

                            {/* Center bar */}
                            <rect x="10" y="14.5" width="12" height="3" rx="0.5" />

                            {/* Left grip lines */}
                            <line x1="11" y1="14" x2="11" y2="18" stroke="url(#logoGradient)" strokeWidth="0.5" />
                            <line x1="12.5" y1="14" x2="12.5" y2="18" stroke="url(#logoGradient)" strokeWidth="0.5" />

                            {/* Right grip lines */}
                            <line x1="19.5" y1="14" x2="19.5" y2="18" stroke="url(#logoGradient)" strokeWidth="0.5" />
                            <line x1="21" y1="14" x2="21" y2="18" stroke="url(#logoGradient)" strokeWidth="0.5" />
                        </g>
                    </svg>
                    <div className="header-text">
                        <h1 className="header-title">OkWorkout</h1>
                        <p className="header-subtitle">Weekly Workout Schedule</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
