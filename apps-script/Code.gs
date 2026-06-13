const TARIFFS = [
  {
    kabupatenKota: 'Jembrana',
    tarif: {
      Tanah: 12926000,
      'Tanah dan Bangunan': 14847000,
    },
  },
  {
    kabupatenKota: 'Tabanan',
    tarif: {
      Tanah: 13445000,
      'Tanah dan Bangunan': 15442000,
    },
  },
  {
    kabupatenKota: 'Badung',
    tarif: {
      Tanah: 14978000,
      'Tanah dan Bangunan': 17203000,
    },
  },
  {
    kabupatenKota: 'Gianyar',
    tarif: {
      Tanah: 13717000,
      'Tanah dan Bangunan': 15755000,
    },
  },
  {
    kabupatenKota: 'Klungkung',
    tarif: {
      Tanah: 12624000,
      'Tanah dan Bangunan': 14499000,
    },
  },
  {
    kabupatenKota: 'Bangli',
    tarif: {
      Tanah: 12509000,
      'Tanah dan Bangunan': 14367000,
    },
  },
  {
    kabupatenKota: 'Karangasem',
    tarif: {
      Tanah: 13077000,
      'Tanah dan Bangunan': 15020000,
    },
  },
  {
    kabupatenKota: 'Buleleng',
    tarif: {
      Tanah: 14119000,
      'Tanah dan Bangunan': 16217000,
    },
  },
  {
    kabupatenKota: 'Kota Denpasar',
    tarif: {
      Tanah: 15161000,
      'Tanah dan Bangunan': 17413000,
    },
  },
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Tarif Sewa ATM 2026')
    .addItem('Buka Kalkulator', 'showSidebar')
    .addToUi();
}

function showSidebar() {
  const html = createCalculatorHtml()
    .setTitle('Tarif Sewa ATM 2026');

  SpreadsheetApp.getUi().showSidebar(html);
}

function doGet() {
  return createCalculatorHtml()
    .setTitle('ATM Calculator Bali 2026')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function createCalculatorHtml() {
  const template = HtmlService.createTemplateFromFile('Index');
  template.tariffsJson = JSON.stringify(TARIFFS);

  return template.evaluate();
}
