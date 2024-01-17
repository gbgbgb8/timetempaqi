Notes

### Current Functionality:
1. **Time, Temperature, and AQI Display:**
   - The application currently displays the time, temperature, and Air Quality Index (AQI).
   - The time is displayed in a 12-hour format.
   - The temperature is fetched from the Weather.gov API for a specific location (Napa, CA).
   - The AQI is fetched from the PurpleAir API using a specific sensor ID.
   - The display rotates between time, temperature, and AQI every 4 seconds.

2. **Styling and Layout:**
   - The display text fills the entire screen window.
   - Uses Google Fonts 'Overpass Mono' for display text.
   - The background color is black, and the font color is white.
   - The layout is responsive to screen size changes.

### Future Enhancements:
1. **Floating Action Button (FAB) with Gear Icon:**
   - Implement a FAB on the screen for accessing settings.
   - The gear icon on the FAB indicates settings or configuration options.

2. **Customizable Sensor ID for AQI:**
   - Allow users to input a different sensor ID for the AQI PurpleAir.
   - This enables the display of AQI from different locations based on user preference.

3. **Customizable Display Settings:**
   - Background color change: Users can choose different background colors.
   - Font color change: Users can select different colors for the text.
   - Text size adjustment: Users can modify the size of the display text.
   - Adjustable display rotation time: Users can set the time interval for rotating the display (currently fixed at 4 seconds).

4. **Business Name or Custom Text Input:**
   - Users can input custom text, like a business name, to be displayed along with time, temperature, and AQI.
   - This feature is useful for businesses or individuals who want to personalize the display.

5. **Saving and Loading Configuration:**
   - Users can save their settings to a JSON file. This includes sensor ID, background color, font color, text size, rotation time, and custom text.
   - Users can load settings from a saved JSON file to quickly apply their preferred configuration.


### Summary:
Your web application serves as an informative display tool that shows time, temperature, and AQI, ideal for business windows or public information screens. The planned enhancements will transform it into a highly customizable and user-friendly tool, catering to various user needs and preferences, making it versatile for both personal and commercial use. These features will significantly increase the application's usability and appeal.
---

### Updated Notes (`notes.md`)

#### Session Progress:

- **Web Application Overview:**
  - The application displays time, temperature, and Air Quality Index (AQI).
  - Features a responsive full-screen display with a minimalist design.

- **Implemented Features:**
  - **Time Display:** Shows current time in 12-hour format without leading zeros.
  - **Temperature Display:** Fetches and shows temperature from Weather.gov API for Napa, CA.
  - **AQI Display:** Retrieves AQI from the PurpleAir API using a specific sensor ID. Displays AQI value and "AQI" text on separate lines.
  - **Display Rotation:** Rotates between time, temperature, and AQI every 4 seconds.
  - **Floating Action Button (FAB):** A gear icon button for accessing settings.
  - **Settings Modal:** A modal that opens via the FAB, allowing users to change settings like sensor ID and background color.
  - **Local Storage:** Settings can be saved to and loaded from the browser's local storage.

- **Styling:**
  - Uses 'Overpass Mono' font from Google Fonts.
  - Main display text fills the entire screen window.
  - Background color is black, and font color is white.

#### Next Steps:

- **Refactoring `script.js`:**
  - Plan to split functions within `script.js` into their own separate files for better code organization and maintainability.
  - Create individual files for `getCurrentTime` and `fetchWeather` functions, similar to the existing `api/getAQI.js`.
  - This will modularize the codebase, making it easier to manage and update individual functionalities.


---

This updated document outlines your current progress and provides a roadmap for future development. The next session will focus on refactoring the JavaScript code to improve structure and maintainability.