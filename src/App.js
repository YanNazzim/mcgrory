import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/sargentXmcgrory.png'; // Make sure this path is correct

// Reusable Slide Component
const Slide = ({ children, isActive }) => (
    <div className={`slide ${isActive ? 'active' : ''}`}>
        <div className="slide-content">
            {children}
        </div>
    </div>
);

// Parts Table Component
const PartsTable = ({ parts, caption }) => (
    <div className="parts-table-container">
        <p className="parts-table-caption">{caption}</p>
        <div className="overflow-x-auto rounded-lg border border-gray-700">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Component</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Part Number</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Notes / Special Consideration</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                    {parts.map((part, index) => (
                        <tr key={index} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{part.component}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">{part.partNumber}</td>
                            <td className="px-6 py-4 whitespace-normal text-sm text-gray-300" dangerouslySetInnerHTML={{ __html: part.notes }}></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);


export default function App() {
    const [currentDate, setCurrentDate] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);

    const slides = [
        'intro', 'agenda', 'production', 'parts', 'conclusion'
    ];
    
    const totalSlides = slides.length;

    const nextSlide = React.useCallback(() => {
        setActiveSlide((prev) => (prev + 1) % totalSlides);
    }, [totalSlides]);

    const prevSlide = React.useCallback(() => {
        setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, [totalSlides]);

    useEffect(() => {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(today.toLocaleDateString('en-US', options));
        
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [nextSlide, prevSlide]);

    const partsFor2_9_16 = [
        { component: 'Exit Device Chassis', partNumber: '[Part #]', notes: 'Standard chassis.' },
        { component: 'Trim / Lever Assembly', partNumber: '[Part #]', notes: 'Standard trim.' },
        { component: 'Spindle', partNumber: '[Part #]', notes: '<strong>Special length for 2-9/16" door thickness.</strong>' },
        { component: 'Mounting Thru-Bolts', partNumber: '[Part #]', notes: '<strong>Special length for 2-9/16" door thickness.</strong>' },
        { component: 'Cylinder Collar/Ring', partNumber: '[Part #]', notes: '<strong>Sized to accommodate the extra door thickness.</strong>' },
        { component: 'Tailpiece', partNumber: '[Part #]', notes: 'Cut/sized for specific cylinder and thickness requirements.' },
        { component: 'End Cap & Mounting', partNumber: '[Part #]', notes: 'Standard component.' },
        { component: 'Strike Plate', partNumber: '[Part #]', notes: 'As specified for your frame.' },
        { component: 'Fastener Pack', partNumber: '[Part #]', notes: 'Includes all necessary screws for device and strike.' },
    ];

    const partsFor2inch = [
        { component: 'Exit Device Chassis', partNumber: '[Part #]', notes: 'Standard chassis.' },
        { component: 'Trim / Lever Assembly', partNumber: '[Part #]', notes: 'Standard trim.' },
        { component: 'Spindle', partNumber: '[Part #]', notes: '<strong>Identical to 2-9/16" door to accommodate trim offset.</strong>' },
        { component: 'Mounting Thru-Bolts', partNumber: '[Part #]', notes: '<strong>Identical to 2-9/16" door to accommodate trim offset.</strong>' },
        { component: 'Cylinder Collar/Ring', partNumber: '[Part #]', notes: '<strong>Identical to 2-9/16" door to accommodate trim offset.</strong>' },
        { component: 'Tailpiece', partNumber: '[Part #]', notes: 'Cut/sized for specific cylinder and thickness requirements.' },
        { component: 'End Cap & Mounting', partNumber: '[Part #]', notes: 'Standard component.' },
        { component: 'Strike Plate', partNumber: '[Part #]', notes: 'As specified for your frame.' },
        { component: 'Fastener Pack', partNumber: '[Part #]', notes: 'Includes all necessary screws for device and strike.' },
        { component: 'Custom Shim/Block (if req\'d)', partNumber: '[Part # or N/A]', notes: '<em>To be discussed: Is a shim needed on the device side?</em>' },
    ];


    return (
        <div className="presentation-container">
             {/* Background Effect */}
            <div className="background-shapes"></div>

            <div className="slides-wrapper" style={{ transform: `translateX(-${activeSlide * 100}vw)` }}>

                {/* --- Title Slide --- */}
                <Slide isActive={activeSlide === 0}>
                    <div className="title-slide">
                        <img src={logo} alt="Sargent and McGrory Glass Logo" className="presentation-logo" />
                        <h1 className="main-title">A Partnership in Precision</h1>
                        <p className="subtitle">Sargent Manufacturing & McGrory Glass</p>
                        <div className="presenter-info">
                            <p>Presented by: Yan Gonzalez, Sargent Manufacturing</p>
                            <p>{currentDate}</p>
                        </div>
                    </div>
                </Slide>

                {/* --- Introduction & Agenda --- */}
                <Slide isActive={activeSlide === 1}>
                    <h2 className="slide-title">Introduction & Agenda</h2>
                    <p className="agenda-intro">We'll cover three main areas:</p>
                    <ul className="agenda-list">
                        <li><span className="emoji-bullet">🎯</span> <strong>Our Custom Production Approach:</strong> How we've tailored our process for your specific needs.</li>
                        <li><span className="emoji-bullet">✅</span> <strong>A Detailed Parts Verification:</strong> A visual confirmation of all components for your application.</li>
                        <li><span className="emoji-bullet">🤝</span> <strong>Our Commitment to Partnership:</strong> Our plan for long-term support and success.</li>
                    </ul>
                </Slide>
                
                {/* --- Point 1 Slide (REVISED) --- */}
                <Slide isActive={activeSlide === 2}>
                    <h2 className="slide-title">Point 1: A Process Built for Precision</h2>
                     <p>"We've implemented a multi-faceted approach to ensure your order is handled with the highest degree of accuracy, from initial request to final assembly."</p>
                    <div className="feature-grid">
                        <div className="feature-card"><h3>Special Order Tagging</h3><p>Your orders are specially marked to differentiate them from standard production, ensuring they receive the specialized handling they require.</p></div>
                        <div className="feature-card"><h3>Detailed SPAR Forms</h3><p>We created a detailed Special Product Application Request (SPAR) which auto-attaches a verified parts list to every order, removing ambiguity.</p></div>
                        <div className="feature-card"><h3>Visual Parts Guide</h3><p>We've prepared a detailed parts list with pictures, so we're all on the same page about exactly what components work for the McGrory application.</p></div>
                        <div className="feature-card"><h3>Future-Proof System</h3><p>Our SPAR system ensures that any future changes to the door or product specs can be updated permanently, guaranteeing long-term accuracy.</p></div>
                    </div>
                </Slide>

                {/* --- Parts Verification Slide --- */}
                <Slide isActive={activeSlide === 3}>
                     <h2 className="slide-title">Point 2: Parts Recap & Verification</h2>
                     <p>"Now, let's visually review the specific parts lists. The goal here is transparency and joint verification."</p>
                     <div className="tables-container">
                        <PartsTable parts={partsFor2_9_16} caption="For 2-9/16&quot; Thick Doors" />
                        <PartsTable parts={partsFor2inch} caption="For 2&quot; Thick Doors w/ 2-9/16&quot; Offset" />
                     </div>
                </Slide>

                {/* --- Conclusion Slide (REVISED) --- */}
                <Slide isActive={activeSlide === 4}>
                    <h2 className="slide-title">Point 3: Our Commitment & Partnership</h2>
                    <p className="summary-statement">"We've built a custom, multi-layered process around your order to ensure both physical precision and administrative accuracy, but our support doesn't end there."</p>
                    <div className="conclusion-points">
                        <p><span>🎯</span> <strong>A Process You Can Trust:</strong> From special tagging to automated SPARs, we ensure your order is right, every time.</p>
                        <p><span>✅</span> <strong>Total Clarity:</strong> With visual parts guides and detailed BOMs, you know exactly what you're getting.</p>
                    </div>
                    <p className="final-commitment">
                        <strong>My commitment to you is straightforward:</strong> At the end of the day, we're partners. While we aim for perfection, I am truly committed to helping resolve any issues that may arise. Your success is our success.
                    </p>
                    <p className="thank-you">Thank you.</p>
                </Slide>
            </div>

            {/* --- Navigation Arrows --- */}
            <button className="nav-arrow prev" onClick={prevSlide} aria-label="Previous Slide">&#x276E;</button>
            <button className="nav-arrow next" onClick={nextSlide} aria-label="Next Slide">&#x276F;</button>

            {/* --- Footer & Progress Bar --- */}
            <footer className="presentation-footer">
                <div className="footer-content">
                    <span>Sargent & McGrory Glass Partnership</span>
                    <span>{activeSlide + 1} / {totalSlides}</span>
                </div>
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{ width: `${((activeSlide + 1) / totalSlides) * 100}%` }}></div>
                </div>
            </footer>
        </div>
    );
}