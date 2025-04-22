# Product Backlog

**Project:** Mjeti i Menaxhimit të Financave Personale

---

## User Stories me Acceptance Criteria

---

### 1. User Registration — HIGH

**User Story:**
Si një përdorues i ri, dua të krijoj një llogari që të mund të menaxhoj financat e mia.

**Acceptance Criteria:**
- Formulari i regjistrimit duhet të pranojë: emër, email, fjalëkalim.
- Nëse të dhënat janë valide, llogaria krijohet dhe dërgohet email konfirmimi.
- Nëse emaili është i regjistruar më parë, shfaqet mesazh gabimi.
- Fjalëkalimi duhet të ketë të paktën 8 karaktere, një shkronjë të madhe dhe një simbol.

---

### 2. User Login — HIGH

**User Story:**
Si përdorues i regjistruar, dua të kyçem që të qasem në sistemin financiar.

**Acceptance Criteria:**
- Përdoruesi mund të kyçet vetëm me kredenciale të sakta.
- Nëse përdoren kredenciale të gabuara, shfaqet mesazh gabimi.
- Pas kyçjes së suksesshme, përdoruesi ridrejtohet te paneli personal.

---

### 3. Add Expense — HIGH

**User Story:**
Si përdorues, dua të shtoj një shpenzim që të ndjek buxhetin dhe balancën.

**Acceptance Criteria:**
- Forma e shpenzimeve duhet të përmbajë: përshkrim, shumë, datë, kategori.
- Shpenzimi ruhet dhe reflektohet në listën e shpenzimeve.
- Nëse fus shumë negative ose mungojnë fushat, shfaqet gabim validimi.

---

### 4. View Expenses — HIGH

**User Story:**
Si përdorues, dua të shikoj historikun e shpenzimeve që të analizoj financat.

**Acceptance Criteria:**
- Të gjitha shpenzimet shfaqen në listë me datë, shumë dhe kategori.
- Shpenzimet mund të filtrohen sipas datës ose kategorisë.
- Listimi duhet të përditësohet në kohë reale pas çdo ndryshimi.

---

### 5. Create Monthly Budget — HIGH

**User Story:**
Si përdorues, dua të krijoj një buxhet mujor që të kontrolloj shpenzimet.

**Acceptance Criteria:**
- Mund të caktohet shumë limit për buxhetin total dhe për kategori.
- Shpenzimet e reja përditësojnë automatikisht balancën e buxhetit.
- Kur limiti tejkalohet, shfaqet paralajmërim.

---

### 6. Expense Alert — SHOULD HAVE

**User Story:**
Si përdorues, dua të marrë njoftime nëse e kaloj buxhetin e përcaktuar.

**Acceptance Criteria:**
- Sistemi duhet të dërgojë paralajmërim kur shpenzimet kalojnë buxhetin.
- Alertet ruhen dhe mund të shikohen nga përdoruesi.
- Përdoruesi mund të konfigurojë pragun e alertit.

---

### 7. Financial Reports — SHOULD HAVE

**User Story:**
Si përdorues, dua të gjeneroj raporte që të analizoj trendet e shpenzimeve.

**Acceptance Criteria:**
- Raporti duhet të paraqesë totalin e shpenzimeve dhe të ardhurave sipas muajit.
- Raporti të ofrojë grafikë dhe tabela krahasuese.
- Mund të shkarkohet në format PDF.

---

### 8. Data Security — HIGH

**User Story:**
Si përdorues, dua që të dhënat e mia të jenë të sigurta dhe të enkriptuara.

**Acceptance Criteria:**
- Të gjitha fjalëkalimet ruhen të enkriptuara.
- Të dhënat transmetohen me HTTPS (TLS 1.2+).
- Në rast logout-i, sesioni mbyllet automatikisht.

---

### 9. Forgot Password — MUST HAVE

**User Story:**
Si përdorues, dua të rikuperoj fjalëkalimin nëse e harroj.

**Acceptance Criteria:**
- Butoni "Harrove fjalëkalimin" duhet të dërgojë email për rikuperim.
- Linku i rikuperimit duhet të jetë valid vetëm për 30 minuta.
- Pas ndryshimit të fjalëkalimit, përdoruesi duhet të konfirmojë fjalëkalimin e ri.

---

### 10. Mobile Friendly Interface — SHOULD HAVE

**User Story:**
Si përdorues, dua të kem një ndërfaqe të përshtatshme për telefon.

**Acceptance Criteria:**
- UI duhet të funksionojë normalisht në pajisje me rezolucion të ulët (320px+).
- Elementët të jenë të adaptueshëm (responsive) sipas ekranit.
- Navigimi të jetë intuitiv dhe pa vonesa në celular.

---

