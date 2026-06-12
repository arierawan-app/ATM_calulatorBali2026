const elements = {
  region: document.querySelector("#region"),
  assetType: document.querySelector("#asset-type"),
  machineCount: document.querySelector("#machine-count"),
  resultPanel: document.querySelector("#result-panel"),
  resultBody: document.querySelector("#result-body"),
  status: document.querySelector("#status")
};

const currencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0
});

let tariffs = [];

function formatRupiah(value) {
  return currencyFormatter.format(value).replace(/\s/g, " ");
}

function getValidMachineCount() {
  const value = Number(elements.machineCount.value);
  return Number.isInteger(value) && value > 0 ? value : null;
}

function populateRegions() {
  const fragment = document.createDocumentFragment();

  tariffs.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.kabupatenKota;
    option.textContent = item.kabupatenKota;
    fragment.appendChild(option);
  });

  elements.region.appendChild(fragment);
}

function findSelectedTariff() {
  const selectedRegion = elements.region.value;
  const selectedAssetType = elements.assetType.value;
  const selectedData = tariffs.find((item) => item.kabupatenKota === selectedRegion);

  if (!selectedData || !selectedAssetType) {
    return null;
  }

  return {
    kabupatenKota: selectedData.kabupatenKota,
    tarifPerMesin: selectedData.tarif[selectedAssetType]
  };
}

function clearResult(message) {
  elements.resultPanel.hidden = true;
  elements.resultBody.replaceChildren();
  elements.status.textContent = message;
}

function renderResult() {
  const machineCount = getValidMachineCount();
  const selectedTariff = findSelectedTariff();

  if (!selectedTariff) {
    clearResult("Lengkapi pilihan untuk menampilkan tarif.");
    return;
  }

  if (!machineCount) {
    clearResult("Masukkan jumlah mesin dengan angka lebih dari 0.");
    return;
  }

  const totalTariff = selectedTariff.tarifPerMesin * machineCount;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td data-label="Kabupaten/Kota">${selectedTariff.kabupatenKota}</td>
    <td data-label="Tarif/mesin" class="numeric">${formatRupiah(selectedTariff.tarifPerMesin)}</td>
    <td data-label="Jumlah Tarif Mesin" class="numeric">${formatRupiah(totalTariff)}</td>
  `;

  elements.resultBody.replaceChildren(row);
  elements.resultPanel.hidden = false;
  elements.status.textContent = `Tarif dihitung untuk ${machineCount} mesin.`;
}

async function init() {
  try {
    const response = await fetch("data/tariffs.json");

    if (!response.ok) {
      throw new Error("Tariff data failed to load.");
    }

    tariffs = await response.json();
    populateRegions();
    renderResult();
  } catch (error) {
    clearResult("Data tarif belum dapat dimuat. Buka aplikasi melalui server web atau GitHub Pages.");
  }
}

["change", "input"].forEach((eventName) => {
  elements.region.addEventListener(eventName, renderResult);
  elements.assetType.addEventListener(eventName, renderResult);
  elements.machineCount.addEventListener(eventName, renderResult);
});

init();
