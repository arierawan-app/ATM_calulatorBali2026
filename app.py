import json
from pathlib import Path

import streamlit as st


DATA_PATH = Path(__file__).parent / "data" / "tariffs.json"


@st.cache_data
def load_tariffs():
    with DATA_PATH.open("r", encoding="utf-8") as tariff_file:
        return json.load(tariff_file)


def format_rupiah(value):
    return f"Rp {value:,.0f}".replace(",", ".")


st.set_page_config(
    page_title="ATM Calculator Bali 2026",
    page_icon="🏧",
    layout="centered",
)

st.markdown(
    """
    <style>
      :root {
        --ink: #10201a;
        --muted: #5c6f65;
        --green-900: #073d2b;
        --green-700: #0d6b45;
        --green-500: #24a15c;
        --green-200: #bde7c9;
        --line: #c5d7cd;
      }

      .stApp {
        background:
          linear-gradient(135deg, rgba(7, 61, 43, 0.98), rgba(13, 107, 69, 0.9) 45%, rgba(189, 231, 201, 0.9)),
          repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 38px);
        color: var(--ink);
      }

      .block-container {
        max-width: 980px;
        padding-top: 48px;
        padding-bottom: 48px;
      }

      [data-testid="stHeader"] {
        background: transparent;
      }

      [data-testid="stToolbar"],
      [data-testid="stDecoration"] {
        display: none;
      }

      .calculator-panel {
        padding: clamp(24px, 4vw, 42px);
        border: 1px solid rgba(255, 255, 255, 0.36);
        background: rgba(247, 252, 248, 0.94);
        box-shadow: 0 24px 80px rgba(6, 48, 31, 0.22);
      }

      .eyebrow {
        display: inline-block;
        margin: 0 0 12px;
        padding: 6px 10px;
        border: 1px solid var(--green-200);
        background: #eef9f1;
        color: var(--green-900);
        font-size: 0.78rem;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .calculator-panel h1 {
        margin: 0;
        color: var(--ink);
        font-size: clamp(2rem, 5vw, 4rem);
        line-height: 1;
        letter-spacing: 0;
      }

      .subtitle {
        max-width: 620px;
        margin: 10px 0 28px;
        color: var(--muted);
        font-size: 1rem;
        line-height: 1.6;
      }

      .stSelectbox label,
      .stNumberInput label {
        color: var(--green-900) !important;
        font-weight: 800;
      }

      .stSelectbox div[data-baseweb="select"] > div,
      .stNumberInput input {
        min-height: 48px;
        border-radius: 0;
        border-color: #9eb9aa;
        background: #ffffff;
      }

      .stDataFrame {
        border: 1px solid var(--green-700);
      }

      .result-note {
        margin-top: 8px;
        color: var(--muted);
        font-size: 0.94rem;
      }
    </style>
    """,
    unsafe_allow_html=True,
)

tariffs = load_tariffs()
regions = [item["kabupatenKota"] for item in tariffs]

st.markdown('<section class="calculator-panel">', unsafe_allow_html=True)
st.markdown('<p class="eyebrow">KPKNL Denpasar</p>', unsafe_allow_html=True)
st.markdown("# ATM Calculator Bali 2026")
st.markdown(
    '<p class="subtitle">Kalkulator tarif pokok sewa mesin ATM berdasarkan wilayah dan jenis BMN.</p>',
    unsafe_allow_html=True,
)

column_region, column_asset, column_count = st.columns([1.15, 1.15, 0.8])

with column_region:
    selected_region = st.selectbox("Kabupaten/Kota", regions, index=0)

with column_asset:
    selected_asset_type = st.selectbox("Jenis BMN", ["Tanah", "Tanah dan Bangunan"], index=0)

with column_count:
    machine_count = st.number_input("Jumlah Mesin", min_value=1, step=1, value=1)

selected_tariff = next(item for item in tariffs if item["kabupatenKota"] == selected_region)
tariff_per_machine = selected_tariff["tarif"][selected_asset_type]
total_tariff = tariff_per_machine * machine_count

result = [
    {
        "Kabupaten/Kota": selected_region,
        "Tarif/mesin": format_rupiah(tariff_per_machine),
        "Jumlah Tarif Mesin": format_rupiah(total_tariff),
    }
]

st.dataframe(result, hide_index=True, use_container_width=True)
st.markdown(
    f'<p class="result-note">Tarif dihitung untuk {machine_count} mesin.</p>',
    unsafe_allow_html=True,
)
st.markdown("</section>", unsafe_allow_html=True)
