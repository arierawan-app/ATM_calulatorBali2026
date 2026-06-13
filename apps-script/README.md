# ATM Calculator Bali 2026 - Google Apps Script

This folder contains a Google Apps Script web app version of the calculator.

## Files

- `Code.gs`: Apps Script server file with tariff data and `doGet()`.
- `Index.html`: Calculator UI and client-side calculation.
- `appsscript.json`: Apps Script manifest.

## Put These Files Into the Spreadsheet Apps Script

Target spreadsheet:
https://docs.google.com/spreadsheets/d/1ALBUZfOh9Pm3JH8Imxt-F4hyUp2al3BeaffXL9kzo0k/edit

1. Open the spreadsheet.
2. Choose `Extensions` > `Apps Script`.
3. Replace the default `Code.gs` contents with `apps-script/Code.gs`.
4. Create a new HTML file named `Index`, then paste `apps-script/Index.html`.
5. Open project settings, enable `Show "appsscript.json" manifest file in editor`, then replace the manifest with `apps-script/appsscript.json`.
6. Save the project.
7. Deploy as a web app.
8. Set access according to your intended audience.

## Optional Clasp Upload

If `clasp` is installed and authenticated, you can create or connect a bound project from this folder:

```bash
cd apps-script
clasp create --type sheets --title "ATM Calculator Bali 2026" --parentId 1ALBUZfOh9Pm3JH8Imxt-F4hyUp2al3BeaffXL9kzo0k
clasp push
```

The first Kabupaten/Kota option is `Pilih Kabupaten/Kota`, and the result table appears only after a valid region is selected.
