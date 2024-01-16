Notes

Certainly! Below is a detailed write-up of your web application's current functionality and a plan for future enhancements:

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

6. **Additional Ideas for Enhancement:**
   - **Weather Icons:** Display weather icons alongside temperature for a more intuitive presentation.
   - **Multiple Language Support:** Offer multilingual support for the displayed text (time, temperature, AQI, and custom text).
   - **Screen Brightness Control:** Include an option to adjust the brightness of the display, particularly useful for different lighting conditions.
   - **Display Layout Options:** Provide different layout templates for how the time, temperature, AQI, and custom text are arranged on the screen.
   - **Touchscreen Interactivity (for Kiosks):** If used on touchscreen devices, enable interactive elements like swiping between different display elements instead of automatic rotation.
   - **Accessibility Features:** Implement accessibility features like screen reader support and high-contrast mode for visually impaired users.

### Summary:
Your web application serves as an informative display tool that shows time, temperature, and AQI, ideal for business windows or public information screens. The planned enhancements will transform it into a highly customizable and user-friendly tool, catering to various user needs and preferences, making it versatile for both personal and commercial use. These features will significantly increase the application's usability and appeal.