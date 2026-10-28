import facebookIcon from '../assets/facebook.svg'
import githubIcon from '../assets/github.svg'
import instagramIcon from '../assets/instagram.svg'
import linkedinIcon from '../assets/linkedin.svg'
import logo from '../assets/logo-rolling-blanco.png'
import xIcon from '../assets/x.svg'
import youtubeIcon from '../assets/youtube.svg'

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/rollingcodeschool/', icon: instagramIcon },
  { name: 'Facebook', url: 'https://www.facebook.com/RollingCodeSchool', icon: facebookIcon },
  { name: 'LinkedIn', url: 'https://ar.linkedin.com/school/rollingcodeschool/', icon: linkedinIcon },
  { name: 'YouTube', url: 'https://www.youtube.com/@rollingcode7175', icon: youtubeIcon },
  { name: 'X', url: 'https://x.com/rollingcodeok', icon: xIcon },
  { name: 'GitHub', url: 'https://github.com/404', icon: githubIcon },
]

function Footer() {
  return (
    <footer className="site-footer">
      <div className="landing-container footer-content">
        <img src={logo} alt="RollingCode" className="footer-logo" />

        <nav aria-label="Redes sociales">
          <ul className="flex flex-wrap justify-center gap-4">
            {socialLinks.map(({ name, url, icon }) => (
              <li key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-borde-tarjeta transition-all duration-300 hover:-translate-y-1 hover:bg-rojo-oscuro hover:shadow-md hover:shadow-rojo-rolling/20"
                >
                  <img src={icon} alt="" aria-hidden="true" className="h-6 w-6 brightness-0 invert" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="landing-container footer-back-top">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}>
          Volver arriba
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
        </button>
      </div>
    </footer>
  )
}

export default Footer
