import React, { useState, useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const languages = [
    { label: 'English (US)', code: 'en' },
    { label: 'French (FR)', code: 'fr' },
    { label: 'Portuguese (BR)', code: 'pt_BR' }
];


const Header = ({language, setLanguage, seed, setSeed, likes, setLikes, reviews, setReviews, view, setView}) => {
    const [isSmallScreen, setIsSmallScreen] = useState(() => window.innerWidth <= 580);
    
    useEffect(() => {
        if (window.innerWidth <= 580) {
            setView('gallery');
        } else {
            setView('table');
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const small = window.innerWidth <= 580;
            setIsSmallScreen(small);
            if (small) setView('gallery');
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateSeed = () => {
        const newSeed = Math.floor(Math.random() * 1e9)
        setSeed(newSeed.toString());
    }

    return (
        <div id="wholeHeader" className="container-fluid text-bg-light p-3 d-flex column-gap-5 flex-row align-items-center justify-content-around">
            <div className="form-floating col-md-2">
                <select 
                    id='langInput' 
                    className="form-select" 
                    aria-label="Default select example" 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}>
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                            {lang.label}
                        </option>
                    ))}
                </select>
                <label htmlFor='langInput'>Language</label>
            </div>
            <div className="col-md-2 ms-2">
                <div className="input-group">
                <div className="form-floating">
                    <input type="text" className="form-control" id="seedInput" value={seed} onChange={(e) => setSeed(e.target.value)} placeholder="Seed"/>
                    <label htmlFor="seedInput">Seed</label>
                </div>
                <button className="btn btn-outline-secondary" type="button" onClick={generateSeed} title="Generate Random Seed">
                    <i className="bi bi-shuffle" />
                </button>
                </div>
            </div>
            <div className='ms-2 col-md-2'>
                <label htmlFor="customRange3" className="form-label">Likes</label>
                <input type="range" className="form-range" min="0" max="10" value={likes} step="0.1" id="customRange3" onChange={(e) => setLikes(parseFloat(e.target.value))}/>
                <div className="text-muted">{likes}</div>
            </div>
            <div className='form-floating mx-2 col-md-2'>
                <input type='number' className="form-control" step='0.1' id="reviewInput" placeholder="Review" value={reviews} onChange={(e) => setReviews(parseFloat(e.target.value))}/>
                <label htmlFor="reviewInput">Review</label>
            </div>
            {!isSmallScreen && (
                <div className="btn-group ms-auto me-4" role="group" aria-label="Basic radio toggle button group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        checked={view === 'table'}
                        onChange={() => setView('table')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">
                        <i className="bi bi-table"></i>
                    </label>
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        checked={view === 'gallery'}
                        onChange={() => setView('gallery')}
                    />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">
                        <i className="bi bi-book"></i>
                    </label>
                </div>
            )}
        </div>
    )
}

export default Header;