# Luma Weather

A weather and daylight workspace with a restrained glass interface, local time zones, and responsive desktop and mobile layouts.

- Search cities, enter coordinates, use your location, and save up to twelve places on your device.
- Interactive sun and moon altitude graph: move the pointer, drag on touch, or use the keyboard slider. Jump directly to sunrise, solar noon, sunset, or astronomical darkness.
- Civil, nautical, and astronomical twilight, evening golden hour, daylight duration, and overnight darkness.
- Moon phase and illumination, local moonrise and moonset, and moon altitude at the explored time.
- Interactive temperature, precipitation probability, wind, and cloud cover forecasts, with hourly detail and a linked seven-day outlook.
- Current conditions, apparent temperature, wind and gusts, humidity and dew point, UV, visibility, pressure, and precipitation.
- Daylight playback, an optional sky preview, a color-coded light timeline, and morning/evening golden hours.
- Hourly cloud forecasts during astronomical darkness, plus full weather details for each explored hour.
- 12/24-hour time settings, moon-curve visibility, mobile section navigation, and reduced motion support.
- A clearly labeled last forecast when reconnecting fails, limited to saved data less than 24 hours old. Expired data is not presented as current weather.
- Persistent temperature unit and last location, saved locations, and shareable coordinate links.

Choose a forecast day to update both graphs and the sun/moon information. Select an event below the sun graph to inspect that moment. Use **Play day** to animate the timeline, and **Preview sky** to preview the corresponding atmosphere. With reduced motion enabled, the playback control steps forward an hour at a time. Use **Live** to return to the current time, or **Reset** to return to midday on a future day.

## GitHub Pages

The site is entirely static. No API key, install step, or server is required.

1. Push this repository to GitHub using the `main` branch.
2. Open **Settings → Pages** and select **GitHub Actions** as the source.
3. The included workflow publishes the `dist` folder. Run it manually from **Actions** if needed.

All asset paths are relative, so the site works at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/` and with a custom domain. To publish manually from a branch, copy the contents of `dist` into that branch's root.

## Run locally

From the repository directory:

```sh
python3 -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`.

## Sources and limits

- Weather: [Open-Meteo](https://open-meteo.com/), automatically refreshed every 15 minutes while the page is open. Weather and city search use its public endpoints directly from the browser and are subject to its usage limits and availability.
- Solar calculations: vendored [SunCalc 1.9.0](https://github.com/mourner/suncalc/tree/v1.9.0), BSD licensed. See `dist/SUNCALC-LICENSE`.
- Sunrise and sunset are approximate at sea level with a level horizon. Mountains, altitude, and atmospheric conditions can change observed times.
- “Fully dark” means the Sun is 18 degrees below the horizon, the end of astronomical twilight. Moonlight and light pollution can still brighten the sky.
- Polar days and nights are handled with labels for events that do not occur.
- All times use the forecast location's time zone. If the weather service cannot load, sun calculations remain available with clearly labeled UTC times.
- The first visit starts in San Francisco (37.7749, −122.4194); later visits restore your last location. Share links specify coordinates in the URL. Location permission is requested only when you press **My location**.

The interface uses system fonts, inline SVG icons and data visualizations, CSS sky gradients, and backdrop filters. Reduced motion and increased contrast preferences are respected. Saved locations and preferences live only in browser storage.

Moonrise and moonset are estimated by finding horizon crossings within the selected location’s calendar day, so the calculations remain independent of your device’s time zone. Solar and lunar charts use absolute timestamps, including local days spanning daylight saving time changes. Missing forecast values are shown as unavailable.

Saved forecasts require the page itself to be available; this is a data fallback, not an offline-installable app. Cached daily dates are adjusted to the location’s current date before display.
