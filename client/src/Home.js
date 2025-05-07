import React from 'react';
import './Home.css'; // do e krijojmë menjëherë

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
  <div className="header-content">
    <img src="/logo.png" alt="Logo" className="home-logo" />

    <div className="vertical-line" />

    <div className="header-text">
      <h1 className="home-title">Personal Finance Tool</h1>
      <p className="home-subtitle">
        Zgjidhja juaj për menaxhimin e thjeshtë dhe të sigurt të financave personale
      </p>
    </div>
  </div>
</header>


<section className="home-section struggle-section">
  <div className="struggle-container">
    <img src="/money.png" alt="Finance management" className="struggle-image" />
    <div className="struggle-text">
      <h2>Po përpiqeni për të menaxhuar paratë?</h2>
      <p>
        Planifikoni buxhetin tuaj thjesht dhe falas.  
        Merrni kontrollin e financave tuaja personale sot!
      </p>
    </div>
  </div>
</section>


<section className="home-section control-section">
  <div className="control-container">
    <h2>Merrni kontrollin e financave tuaja</h2>
    <p className="control-subtitle">
      Jeni lodhur nga stresi financiar? Ja si mund të merrni kontrollin:
    </p>

    <ul className="control-list">
      <li>1. Ndiqni të ardhurat, shpenzimet dhe blerjet tuaja me lehtësi.</li>
      <li>2. Vendosni qëllime reale financiare me ndihmën e buxhetimit të thjeshtë.</li>
      <li>3. Merrni kontrollin e financave tuaja me vendime më të zgjuara.</li>
    </ul>

    <div className="control-buttons">
      <a href="/register" className="action-button">Regjistrohu</a>
      <a href="/login" className="action-button">Hyr</a>
    </div>
  </div>
</section>



<section className="home-section reasons-cards-section">
  <div className="reasons-cards-container">
    <h2>Pse të përdorni Personal Finance Tool?</h2>
    <p className="reasons-subtitle">
      Zbuloni pse mjeti ynë falas për buxhetim ju ndihmon të menaxhoni financat pa stres.
    </p>

    <div className="reasons-row">
  <div className="reason-card">
    <span role="img" aria-label="icon">📊</span>
    <h3>Pasqyrë e qartë</h3>
    <p>Shikoni të ardhurat dhe shpenzimet në mënyrë të organizuar.</p>
  </div>
  <div className="reason-card">
    <span role="img" aria-label="icon">📅</span>
    <h3>Planifikim mujor</h3>
    <p>Krijoni buxhet për çdo muaj dhe qëndroni në rrugën e duhur.</p>
  </div>
  <div className="reason-card">
    <span role="img" aria-label="icon">📈</span>
    <h3>Përmirësim i zakoneve</h3>
    <p>Analizoni shpenzimet dhe ndryshoni mënyrën si menaxhoni paranë.</p>
  </div>
</div>

<div className="reasons-row">
  <div className="reason-card">
    <span role="img" aria-label="icon">🔔</span>
    <h3>Kujtesa automatike</h3>
    <p>Merrni njoftime për pagesat që afron afati.</p>
  </div>
  <div className="reason-card">
    <span role="img" aria-label="icon">🔒</span>
    <h3>Siguri e lartë</h3>
    <p>Ne i mbrojmë të dhënat tuaja me teknologji të avancuar.</p>
  </div>
</div>

  </div>
</section>


<section className="home-section feedback-section">
  <div className="feedback-container">
    <h2>Ndani mendimin tuaj</h2>
    <p>
      Mendimi juaj ka vlerë! Nëse keni sugjerime, ndihuni të lirë të na shkruani me email.
    </p>
    <a href="mailto:example@example.com" className="feedback-button">Dërgo Email</a>
  </div>
</section>

<footer className="footer">
  <p>© 2025 Personal Finance Tool – Të gjitha të drejtat e rezervuara  | Krijuar nga <a href=''>Agnesa Maxhuni</a> | Dizajnuar nga <a href=''>Albiona Maxhuni</a></p>
</footer>



    </div>
  );
};

export default Home;
