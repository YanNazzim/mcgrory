import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './images/sargentXmcgrory.png'; // Make sure this path is correct
import workOrderImage from './images/workorder.jpg'; // Add your work order image here
import mcgroryPdf from './Mcgrory.pdf'; // Import the PDF

// Reusable Slide Component
const Slide = ({ children, isActive }) => (
    <div className={`slide ${isActive ? 'active' : ''}`}>
        <div className="slide-content">
            {children}
        </div>
    </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                {children}
            </div>
        </div>
    );
};


export default function App() {
    const [currentDate, setCurrentDate] = useState('');
    const [activeSlide, setActiveSlide] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!isModalOpen);


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
                        <li>
                            <div className="agenda-point">
                                <span className="emoji-bullet">🎯</span>
                                <div>
                                    <strong>Our Custom Production Approach</strong>
                                    <p className="sub-point">How we've tailored our process for your specific needs.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="agenda-point">
                                <span className="emoji-bullet">✅</span>
                                <div>
                                    <strong>A Detailed Parts Verification</strong>
                                    <p className="sub-point">A visual confirmation of all components for your application.</p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="agenda-point">
                                <span className="emoji-bullet">🤝</span>
                                <div>
                                    <strong>Our Commitment to Partnership</strong>
                                    <p className="sub-point">Our plan for long-term support and success.</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </Slide>
                
                {/* --- Point 1 Slide (REVISED) --- */}
                <Slide isActive={activeSlide === 2}>
                    <h2 className="slide-title">Point 1: A Process Built for Precision</h2>
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
                     <div className="parts-verification-content">
                        <img 
                            src={workOrderImage} 
                            alt="Work Order" 
                            className="work-order-thumbnail"
                            onClick={toggleModal}
                        />
                        <a 
                            href={mcgroryPdf}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="pdf-link"
                        >
                            Open SPAR Pictures PDF
                        </a>
                     </div>
                </Slide>

                {/* --- Conclusion Slide (REVISED) --- */}
                <Slide isActive={activeSlide === 4}>
                    <h2 className="slide-title">Point 3: Our Commitment & Partnership</h2>
                    <div className="conclusion-points">
                        <p><span>🎯</span> <strong>A Process You Can Trust:</strong> From special tagging to automated SPARs, we ensure your order is right, every time.</p>
                        <p><span>✅</span> <strong>Total Clarity:</strong> With visual parts guides and detailed BOMs, you know exactly what you're getting.</p>
                    </div>
                    <p className="final-commitment">
                        <strong>Our commitment to you is straightforward:</strong> At the end of the day, we're partners. While we aim for perfection, I am truly committed to helping resolve any issues that may arise. Your success is our success.
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
             {/* --- Modal --- */}
             <Modal isOpen={isModalOpen} onClose={toggleModal}>
                <img src={workOrderImage} alt="Enlarged Work Order" className="modal-image" />
            </Modal>
        </div>
    );
}