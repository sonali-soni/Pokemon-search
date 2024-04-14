import React from 'react'
import '../styles/footer.css'

const Footer = () => {
    return (
    <section className='footer'>
        <div className='container'>
            <div className='social-network'>
                <div className='connect-me-text'>
                    <p>Connect with me on social networks:</p>
                </div>
                <div className="footer__social">
                    <ul className='icons'>
                        <li>
                            <a target='_blank' href="https://www.linkedin.com/in/sonalisoni246/" aria-label="LinkedIn Profile">
                            <img src="/Linkedin.svg" alt="Linkedin" />
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href="https://github.com/sonali-soni" aria-label="Github Profile">
                            <img src="/Github.svg" alt="Github" />
                            </a>
                        </li>
                        {/* <li>
                            <a target='_blank' href="https://www.instagram.com/sonisonali12/" aria-label="Instagram Profile">
                            <img src="/Instagram.svg" alt="Instagram" />
                            </a>
                        </li>
                        <li>
                            <a target='_blank' href="https://www.facebook.com/sonali.soni.712714/" aria-label="Facebook Profile">
                            <img src="/Facebook.svg" alt="Facebook" />
                            </a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </div>
        {/* <div className="copyright">
            <p>&#169; Copyright 2024</p>
        </div> */}
    </section>
    )
}

export default Footer
