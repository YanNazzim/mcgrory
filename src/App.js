import React, { useState, useEffect } from 'react';
import './App.css';

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
        'intro', 'agenda', 'production', 'special-orders', 'parts', 'conclusion'
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
                        <li><span className="emoji-bullet">🎯</span> <strong>Our Custom Production Approach:</strong> What our manufacturing floor is doing differently for your order.</li>
                        <li><span className="emoji-bullet">👥</span> <strong>Our Enhanced Special Orders Process:</strong> How our internal teams are coordinating to manage every detail.</li>
                        <li><span className="emoji-bullet">✅</span> <strong>A Detailed Parts Verification:</strong> A complete recap of the components for each door type.</li>
                    </ul>
                </Slide>
                
                {/* --- Production Slide --- */}
                <Slide isActive={activeSlide === 2}>
                    <h2 className="slide-title">Point 1: Production Enhancements</h2>
                    <p>"To eliminate any chance of error with your non-standard requirements, we've moved this order out of our standard workflow and into a specialized process."</p>
                    <div className="feature-grid">
                        <div className="feature-card"><h3>Dedicated Production Cell</h3><p>Staffed by senior technicians briefed on the specific requirements of the 2-9/16" door thickness and trim offset.</p></div>
                        <div className="feature-card"><h3>'McGrory Glass' Order Tagging</h3><p>Every component is physically tagged to prevent any part from being accidentally swapped with standard inventory.</p></div>
                        <div className="feature-card"><h3>Pre-Production Kitting</h3><p>All components for a single device are gathered and verified in a 'kit' before assembly, including specific thru-bolts and spindles.</p></div>
                        <div className="feature-card"><h3>Heightened Quality Control</h3><p>Two additional QC checkpoints: a dimensional check using a custom jig, and a final pre-packaging verification.</p></div>
                    </div>
                </Slide>

                {/* --- Special Orders Slide --- */}
                <Slide isActive={activeSlide === 3}>
                    <h2 className="slide-title">Point 2: Special Orders & Engineering</h2>
                     <p>"Behind the scenes, our Special Orders and Engineering teams are providing an extra layer of oversight. Atypical door thicknesses require meticulous coordination."</p>
                    <div className="feature-grid">
                        <div className="feature-card"><h3>Dedicated Order Coordinator</h3><p>I am personally serving as the single point of contact and coordinator for this order, from engineering to shipment.</p></div>
                        <div className="feature-card"><h3>Custom Bill of Materials (BOM)</h3><p>Our engineers generated two distinct BOMs to ensure the correct parts are pulled and to explicitly address the trim offset.</p></div>
                        <div className="feature-card"><h3>Pre-Production Kickoff Meeting</h3><p>A formal meeting with leads from Engineering, Production, and QA to review your blueprints and ensure total alignment.</p></div>
                        <div className="feature-card"><h3>Proactive Communication</h3><p>We will provide progress updates and can share QC photos prior to shipping for a final layer of assurance.</p></div>
                    </div>
                </Slide>

                {/* --- Parts Verification Slide --- */}
                <Slide isActive={activeSlide === 4}>
                     <h2 className="slide-title">Point 3: Parts Recap & Verification</h2>
                     <p>"Now, I'd like to review the specific parts lists. The goal here is transparency and joint verification. Please stop me if you have any questions."</p>
                     <div className="tables-container">
                        <PartsTable parts={partsFor2_9_16} caption="For 2-9/16&quot; Thick Doors" />
                        <PartsTable parts={partsFor2inch} caption="For 2&quot; Thick Doors w/ 2-9/16&quot; Offset" />
                     </div>
                </Slide>

                {/* --- Conclusion Slide --- */}
                <Slide isActive={activeSlide === 5}>
                    <h2 className="slide-title">Our Commitment</h2>
                    <p className="summary-statement">"To summarize, we have built a custom, multi-layered process around your order to ensure both physical precision and administrative accuracy."</p>
                     <div className="conclusion-points">
                        <p><span>🎯</span> <strong>On the floor,</strong> we're using dedicated cells and tagging.</p>
                        <p><span>👥</span> <strong>Behind the scenes,</strong> we have dedicated coordination and custom BOMs.</p>
                     </div>
                    <p className="final-commitment">"Our goal is to be more than a supplier; we aim to be a genuine partner. We are confident that the steps we've taken will result in a product that installs smoothly and performs flawlessly for your unique application."</p>
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