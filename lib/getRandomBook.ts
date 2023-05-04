const bookTitles = [
  'Prečo spíme',
  '1984',
  'Hra o trůny',
  'Zlodějka knih',
  'To',
  'Šikmý kostel',
  'Bílá Voda',
  'Egypťan Sinuhet',
  'Poslední přání',
  'Sapiens: Od zvířete k božskému jedinci',
  'Duna',
  'Stoletý stařík, který vylezl z okna a zmizel',
  'Společenstvo Prstenu',
  'Hana',
  'Harry Potter a Kámen mudrců',
  'Bible',
  'Obraz Doriana Graye',
  'Najděte si svého marťana',
  'Dievča vo vlaku',
  'Pýcha a předsudek',
  'Hobit aneb Cesta tam a zase zpátky',
  'Žítkovské bohyně',
  'Šikmý kostel 2',
  'Malý princ',
  'Meč osudu',
  'Střet králů',
  'Atómové návyky',
  'Harry Potter a Ohnivý pohár',
  'Bible Svatá',
  'Harry Potter a Fénixův řád',
  'Sofiin svět',
  'Jsou světla, která nevidíme',
  'Metro 2033',
  'Dívka v ledu',
  'Sirotčinec slečny Peregrinové pro podivné děti',
  'Okamžiky štěstí',
  'Ženy, které běhaly s vlky',
  'Konec prokrastinace',
  'Než jsem tě poznala',
  'Netopýří muž',
  'Důmyslné umění, jak mít všechno u pr**le',
  'Harry Potter a Tajemná komnata',
  'Šest vran',
  'Silmarillion',
  'Poslední aristokratka',
  'Sophiina volba',
  'Harry Potter a prokleté dítě',
  'Lolita',
  'Tajný život stromov',
  'Analfabetka, která uměla počítat',
];

/**
 * Function that returns random book out 50 most read Czech books
 * @returns String with book name
 */
const getRandomBook = (): string => {
  const randomIndex = Math.floor(Math.random() * bookTitles.length);
  return bookTitles[randomIndex];
};

export { getRandomBook };
