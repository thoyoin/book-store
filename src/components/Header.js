import React from "react";

const languages = [
    { label: 'English (US)', code: 'en' },
    { label: 'German (Germany)', code: 'de' },
    { label: 'Spanish (Spain)', code: 'es' }
];


const Header = ({language, setLanguage, seed, setSeed, likes, setLikes, reviews, setReviews}) => {
    const generateSeed = () => {
        const newSeed = Math.floor(Math.random() * 1e9)
        setSeed(newSeed.toString());
    }

    return (
        <div className="container-fluid text-bg-light p-2 d-flex flex-row align-items-center justify-content-around">
            <div className="form-floating col-md-2 m-2">
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
            <div className="col-md-2">
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
            <div className='m-2 col-md-2'>
                <label htmlFor="customRange3" className="form-label">Likes</label>
                <input type="range" className="form-range" min="0" max="10" value={likes} step="0.1" id="customRange3" onChange={(e) => setLikes(parseFloat(e.target.value))}/>
                <div className="text-muted">{likes}</div>
            </div>
            <div className='form-floating m-2 col-md-2'>
                <input type='number' className="form-control" step='0.1' id="reviewInput" placeholder="Review" value={reviews} onChange={(e) => setReviews(parseFloat(e.target.value))}/>
                <label htmlFor="reviewInput">Review</label>
            </div>
        </div>
    )
}

export default Header;