import { Lawyer } from '../types';

// This data has been cleaned and parsed from the original text provided.
// Inconsistencies like 'Yes'/'No' for proBono have been converted to booleans.
// Language strings have been normalized into arrays.
const lawyers: Lawyer[] = [
    { id: 0, name: 'Cheryl Little', firm: 'Americans for Immigrant Justice', phone: '(305) 573-1106', website: 'https://aijustice.org', proBono: true, languages: ['English'], specialties: ['Asylum', 'Detention'], state: 'FL', city: 'Miami' },
    { id: 1, name: 'Tammy Fox-Isicoff', firm: 'Fox-Isicoff Law', phone: '(305) 895-0300', website: 'https://foxisicoff.com', proBono: false, languages: ['English'], specialties: ['Business Immigration'], state: 'FL', city: 'Miami' },
    { id: 2, name: 'Randy McGrorty', firm: 'Catholic Legal Services', phone: '(305) 373-1073', website: 'https://clsrm.org', proBono: true, languages: ['English'], specialties: ['Humanitarian Relief'], state: 'FL', city: 'Miami' },
    { id: 3, name: 'Elizabeth Ricci', firm: 'Bergmann & Ricci', phone: '(850) 224-3250', website: 'https://uslegalimmigration.com', proBono: false, languages: ['English'], specialties: ['Employment Visas'], state: 'FL', city: 'Tallahassee' },
    { id: 4, name: 'William Flynn', firm: 'Flynn Law Group', phone: '(407) 476-2255', website: 'https://flynnlawgroup.com', proBono: true, languages: ['English'], specialties: ['Investor Visas'], state: 'FL', city: 'Orlando' },
    { id: 5, name: 'Irwin Berowitz', firm: 'Berowitz & Myer', phone: '(954) 763-8560', website: 'https://berowitzmyer.com', proBono: false, languages: ['English'], specialties: ['Corporate Immigration'], state: 'FL', city: 'Fort Lauderdale' },
    { id: 6, name: 'Ana Sofia Pelaez', firm: 'Pelaez Law Group', phone: '(305) 854-5555', website: 'https://pelaezlaw.com', proBono: true, languages: ['English'], specialties: ['Family Petitions'], state: 'FL', city: 'Miami' },
    { id: 7, name: 'Michael Vastine', firm: 'St. Thomas Law Clinic', phone: '(305) 623-2345', website: 'https://law.stu.edu', proBono: true, languages: ['English'], specialties: ['Pro Bono Clinic'], state: 'FL', city: 'Miami' },
    { id: 8, name: 'Adonia Simpson', firm: 'AI Justice', phone: '(305) 573-1106', website: 'https://aijustice.org', proBono: true, languages: ['English'], specialties: ['Children\'s Cases'], state: 'FL', city: 'Miami' },
    { id: 9, name: 'Richard Maney', firm: 'Maney Law Firm', phone: '(813) 221-0005', website: 'https://maneylaw.com', proBono: false, languages: ['English'], specialties: ['Deportation Defense'], state: 'FL', city: 'Tampa' },
    { id: 10, name: 'Maria del Carmen Ramos', firm: 'Ramos Law', phone: '(407) 894-3030', website: 'https://ramoslaw.com', proBono: true, languages: ['English'], specialties: ['VAWA Cases'], state: 'FL', city: 'Orlando' },
    { id: 12, name: 'Andrea Reyes', firm: 'Reyes Legal Group', phone: '(813) 445-8210', website: 'https://reyeslegal.com', proBono: true, languages: ['English'], specialties: ['Family Immigration'], state: 'FL', city: 'Tampa' },
    { id: 14, name: 'Jonathan Ryan', firm: 'FL Immigrant Coalition', phone: '(305) 571-7250', website: 'https://flimmigrant.org', proBono: true, languages: ['English'], specialties: ['Policy', 'Advocacy'], state: 'FL', city: 'Miami' },
    { id: 16, name: 'Carolina Antonini', firm: 'Antonini & Cohen', phone: '(404) 850-9394', website: 'https://antoninicohen.com', proBono: false, languages: ['English'], specialties: ['Investor Visas'], state: 'GA', city: 'Atlanta' },
    { id: 17, name: 'Vanessa Joseph', firm: 'Joseph Law Firm', phone: '(954) 543-0303', website: 'https://josephlaw.com', proBono: true, languages: ['English'], specialties: ['Asylum'], state: 'FL', city: 'Fort Lauderdale' },
    { id: 19, name: 'Isabel Vinent', firm: 'Vinent Law', phone: '(305) 444-4444', website: 'https://vinentlaw.com', proBono: true, languages: ['English'], specialties: ['Humanitarian Visas'], state: 'FL', city: 'Miami' },
    { id: 20, name: 'Ally Bolour', firm: 'Bolour/Carl Immigration', phone: '(301) 656-7600', website: null, proBono: false, languages: ['English', 'Farsi'], specialties: ['Business Immigration'], state: 'MD', city: 'Bethesda' },
    { id: 21, name: 'Paul O\'Dwyer', firm: 'O\'Dwyer Law', phone: '(202) 628-4000', website: null, proBono: true, languages: ['English', 'Irish'], specialties: ['Asylum'], state: 'DC', city: 'Washington' },
    { id: 22, name: 'Claudia Cubas', firm: 'CAIR Coalition', phone: '(301) 565-4800', website: null, proBono: true, languages: ['English', 'Spanish'], specialties: ['Detention Cases'], state: 'MD', city: 'Silver Spring' },
    { id: 23, name: 'Michael Maggio', firm: 'Maggio & Kattar', phone: '(202) 483-0055', website: null, proBono: false, languages: ['English', 'Italian'], specialties: ['Corporate Immigration'], state: 'DC', city: 'Washington' },
    { id: 24, name: 'Elaine Witty', firm: 'Witty Immigration', phone: '(202) 331-9450', website: null, proBono: true, languages: ['English', 'Spanish'], specialties: ['Family Petitions'], state: 'DC', city: 'Washington' },
    { id: 30, name: 'Melissa Mills', firm: 'Mills Immigration', phone: '(703) 520-1326', website: null, proBono: true, languages: ['English', 'Spanish'], specialties: ['Appeals'], state: 'VA', city: 'Arlington' },
    { id: 34, name: 'Michael Piston', firm: 'Piston Law', phone: '(301) 656-7600', website: null, proBono: true, languages: ['English', 'Russian'], specialties: ['Deportation Defense'], state: 'MD', city: 'Rockville' },
    { id: 35, name: 'Charles Kuck', firm: 'Kuck Baxter Immigration', phone: '(404) 816-8611', website: 'https://www.immigration.net', proBono: true, languages: ['English'], specialties: ['Employment', 'Deportation'], state: 'GA', city: 'Atlanta' },
    { id: 37, name: 'Andrew R. Johnson', firm: 'Johnson Immigration Law', phone: '(404) 949-2500', website: null, proBono: true, languages: ['English'], specialties: ['Asylum', 'Family'], state: 'GA', city: 'Atlanta' },
    { id: 38, name: 'Dina F. Haynes', firm: 'Haynes Law Group', phone: '(404) 585-0042', website: null, proBono: true, languages: ['English'], specialties: ['Human Trafficking'], state: 'GA', city: 'Atlanta' },
    { id: 40, name: 'Jeremy Lasnetski', firm: 'Lasnetski Gihon Law', phone: '(404) 254-0843', website: null, proBono: true, languages: ['English'], specialties: ['Deportation Defense'], state: 'GA', city: 'Atlanta' },
    { id: 43, name: 'Elizabeth M. Hernandez', firm: 'Hernandez & Associates', phone: '(404) 816-8611', website: null, proBono: true, languages: ['English'], specialties: ['VAWA Cases'], state: 'GA', city: 'Atlanta' },
    { id: 47, name: 'Sarah Owings', firm: 'The Owings Firm', phone: '(404) 445-5101', website: null, proBono: true, languages: ['English'], specialties: ['Employment Visas'], state: 'GA', city: 'Atlanta' },
    { id: 55, name: 'Michael J. Gurfinkel', firm: 'Law Offices of Michael Gurfinkel', phone: '(800) 939-4557', website: 'https://www.gurfinkel.com', proBono: true, languages: ['Spanish', 'English'], specialties: ['Deportation Defense'], state: 'CA', city: 'Los Angeles' },
    { id: 56, name: 'Carl Shusterman', firm: 'Law Offices of Carl Shusterman', phone: '(213) 623-4592', website: 'https://www.shusterman.com', proBono: false, languages: ['Spanish', 'English'], specialties: ['Employment Visas'], state: 'CA', city: 'Los Angeles' },
    { id: 57, name: 'Nicole Sedaghat', firm: 'Sedaghat Law Group', phone: '(415) 789-5881', website: 'https://www.sedaghatlaw.com', proBono: true, languages: ['English', 'Farsi'], specialties: ['Family-Based'], state: 'CA', city: 'San Francisco' },
    { id: 58, name: 'Jacob Sapochnick', firm: 'Law Offices of Jacob J. Sapochnick', phone: '(619) 819-9204', website: 'https://www.sapochnick.com', proBono: true, languages: ['Spanish', 'English'], specialties: ['Investor Visas'], state: 'CA', city: 'San Diego' },
    { id: 59, name: 'Linda Rose', firm: 'Law Offices of Linda Rose', phone: '(310) 478-0078', website: 'https://www.lindaroselaw.com', proBono: true, languages: ['Spanish', 'English'], specialties: ['Asylum'], state: 'CA', city: 'Los Angeles' },
    { id: 60, name: 'Mona Shah', firm: 'Mona Shah & Associates', phone: '(415) 861-9888', website: 'https://www.monashah.com', proBono: false, languages: ['English'], specialties: ['EB-5 Investor Visas'], state: 'CA', city: 'San Francisco' },
    { id: 61, name: 'Alena Shautsova', firm: 'Shautsova Law', phone: '(646) 481-1471', website: 'https://www.shautsova.com', proBono: true, languages: ['English', 'Russian'], specialties: ['Deportation Defense'], state: 'CA', city: 'Los Angeles' },
    { id: 76, name: 'Carlos Batara', firm: 'Batara Immigration Law', phone: '(619) 377-9415', website: 'https://www.bataraimmigration.com', proBono: true, languages: ['English', 'Spanish'], specialties: ['Deportation Defense'], state: 'CA', city: 'San Diego' },
    { id: 82, name: 'Claudia Valenzuela', firm: 'Valenzuela Law Group', phone: '(213) 537-0100', website: 'https://www.valenzuelalawgroup.com', proBono: true, languages: ['English', 'Spanish'], specialties: ['Deportation Defense'], state: 'CA', city: 'Los Angeles' },
    { id: 105, name: 'Kate Lincoln-Goldfinch', firm: 'Lincoln-Goldfinch Law', phone: '(512) 900-6131', website: 'https://lincolngoldfinch.com', proBono: true, languages: ['English', 'Spanish', 'Family'], specialties: ['Asylum'], state: 'TX', city: 'Austin' },
    { id: 106, name: 'Manuel Solis', firm: 'Solis Legal Group', phone: '(713) 532-9300', website: 'https://solislegal.com', proBono: true, languages: ['English', 'Spanish'], specialties: ['Deportation'], state: 'TX', city: 'Houston' },
    { id: 108, name: 'Laura Lichter', firm: 'Lichter Immigration', phone: '(214) 999-3009', website: 'https://lichterimmigration.com', proBono: true, languages: ['English', 'Spanish'], specialties: ['Criminal Defense'], state: 'TX', city: 'Dallas' },
    { id: 132, name: 'Deborah Notkin', firm: 'Barst Mukamal & Kleiner', phone: '(212) 685-2888', website: null, proBono: true, languages: ['English'], specialties: ['Employment Visas'], state: 'NY', city: 'New York' },
    { id: 133, name: 'Michael Wildes', firm: 'Wildes & Weinberg', phone: '(212) 753-3468', website: null, proBono: true, languages: ['English'], specialties: ['Celebrity Visas', 'Investor Visas'], state: 'NY', city: 'New York' },
    { id: 135, name: 'Allen Orr', firm: 'Orr Immigration Law Firm', phone: '(212) 714-7600', website: null, proBono: true, languages: ['English'], specialties: ['LGBTQ+ Immigration'], state: 'NY', city: 'New York' },
    { id: 137, name: 'Joanna J. Sohovich', firm: 'Sohovich & Sohovich', phone: '(212) 227-8400', website: null, proBono: true, languages: ['English'], specialties: ['Family Petitions'], state: 'NY', city: 'New York' },
    { id: 138, name: 'Danielle Polen', firm: 'Polen Law Group', phone: '(212) 321-6464', website: null, proBono: true, languages: ['English'], specialties: ['Asylum'], state: 'NY', city: 'New York' },
    { id: 140, name: 'Alina Das', firm: 'NYU Law Immigrant Rights Clinic', phone: '(212) 998-6430', website: null, proBono: true, languages: ['English'], specialties: ['Pro Bono Advocacy'], state: 'NY', city: 'New York' },
    { id: 141, name: 'Serena Nunn', firm: 'The Nunn Law Group', phone: '(646) 759-9239', website: null, proBono: true, languages: ['English'], specialties: ['Criminal Immigration'], state: 'NY', city: 'New York' },
    { id: 142, name: 'Michael DiRaimondo', firm: 'DiRaimondo & Schroeder', phone: '(516) 357-3711', website: null, proBono: true, languages: ['English'], specialties: ['Employment Visas'], state: 'NY', city: 'Long Island' },
    { id: 143, name: 'Claudia Slovinsky', firm: 'Slovinsky Law', phone: '(212) 686-4343', website: null, proBono: true, languages: ['English'], specialties: ['Asylum', 'VAWA Cases'], state: 'NY', city: 'New York' },
    { id: 150, name: 'David S. Silverman', firm: 'Silverman Law Offices', phone: '(215) 486-4545', website: null, proBono: true, languages: ['English', 'Spanish'], specialties: ['Employment Visas'], state: 'PA', city: 'Philadelphia' },
    { id: 151, name: 'William A. Stock', firm: 'Klasko Immigration Law', phone: '(215) 825-8600', website: null, proBono: false, languages: ['English'], specialties: ['EB-1 Visas', 'EB-2 Visas'], state: 'PA', city: 'Philadelphia' },
    { id: 152, name: 'Michele R. Pistone', firm: 'Villanova Law Clinic', phone: '(610) 519-7050', website: null, proBono: true, languages: ['English', 'Italian'], specialties: ['Asylum Clinic'], state: 'PA', city: 'Villanova' },
];

// Helper arrays to avoid recalculation on every render
const allStates = [...new Set(lawyers.map(l => l.state))].sort();

const allSpecialties = [...new Set(lawyers.flatMap(l => l.specialties))].sort();

const allLanguages = [...new Set(lawyers.flatMap(l => l.languages))].sort();

export { lawyers, allStates, allSpecialties, allLanguages };