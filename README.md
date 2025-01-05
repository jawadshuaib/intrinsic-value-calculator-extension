# Intrinsic Value Calculator Chrome Extension

Intrinsic Value Calculator is a Chrome extension designed to help users evaluate stock valuations directly on the Al-Falah brokerage platform. It provides detailed metrics and insights like intrinsic value, growth rates, and valuation ratios, making it a valuable tool for investors.

---

## Features

- **Intrinsic Value Calculation**: Determine the fair value of a stock based on its financial metrics.
- **Growth Rate Analysis**: Visualize and understand the company's growth rate.
- **Valuation Ratios**: Access PEG, P/E ratios, and other financial valuation metrics.
- **Sensitivity Table**: Interactive table to analyze intrinsic value under various assumptions.
- **Debt Profile & Current Ratio**: Assess the financial health of a company.
- **CAGR Calculator**: Analyze compound annual growth rates for consistent performance tracking.
- **Clean, User-Friendly UI**: Easily navigate metrics and insights via an intuitive interface.

---

## Manual Installation Guide

Since this extension is not currently available in the Chrome Web Store, you can install it manually. Follow these steps:

1. **Download or Clone the Repository**

   - Download the repository as a ZIP file or clone it using Git:
     ```bash
     git clone https://github.com/your-repo/intrinsic-value-calculator.git
     ```

2. **Extract the Files**

   - If you downloaded the ZIP, extract the contents to a folder on your computer.

3. **Build the Extension**

   - Ensure you have [Node.js](https://nodejs.org/) installed on your system.
   - Navigate to the directory where the extension is located:
     ```bash
     cd /path/to/intrinsic-value-calculator
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Build the extension:
     ```bash
     npm run build
     ```

4. **Load the Extension in Chrome**

   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer Mode** (toggle in the top-right corner).
   - Click on **Load unpacked** and select the `dist` folder generated in the extension directory after building.

5. **Activate the Extension**
   - Once loaded, the extension icon will appear in the Chrome toolbar.
   - Navigate to the Al-Falah brokerage platform to start using the Intrinsic Value Calculator.

---

## Technical Details

### Directory Structure

- **`src`**: Contains all source files, including components, scripts, and styling.
  - **`background`**: Background scripts to manage Chrome API interactions.
  - **`components`**: Modular React components for metrics, UI, and analysis.
  - **`contentScript`**: Script injected into web pages to interact with DOM elements.
  - **`options` & `popup`**: Extension's options and popup UI.
  - **`static`**: Static assets like icons and the `manifest.json`.
  - **`utils`**: Utility functions for calculations and data processing.

### Key Tools & Technologies

- **React**: Component-based UI development.
- **TypeScript**: Type-safe JavaScript for better scalability.
- **Webpack**: Efficient bundling for optimized performance.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Node.js**: For dependency management and build process.

---

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests for bug fixes or new features.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
