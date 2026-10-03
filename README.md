# Luma Weather

A responsive, Apple Weather inspired dashboard with liquid glass panels. Enter any latitude and longitude to see live conditions, a 24-hour forecast, a seven-day forecast, sunrise, sunset, and astronomical darkness. The background follows the local daylight and weather.

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

- Weather: [Open-Meteo](https://open-meteo.com/), automatically refreshed every 15 minutes while the page is open. Its public endpoint is used directly from the browser and is subject to its usage limits and availability.
- Solar calculations: vendored [SunCalc 1.9.0](https://github.com/mourner/suncalc/tree/v1.9.0), BSD licensed. See `dist/SUNCALC-LICENSE`.
- Sunrise and sunset are approximate at sea level with a level horizon. Mountains, altitude, and atmospheric conditions can change observed times.
- “Fully dark” means the Sun is 18 degrees below the horizon, the end of astronomical twilight. Moonlight and light pollution can still brighten the sky.
- Polar days and nights are handled with labels for events that do not occur.
- All times use the forecast location's time zone. If the weather service cannot load, sun calculations remain available with clearly labeled UTC times.
- The initial location is San Francisco (37.7749, −122.4194). Location permission is requested only when you press **My location**.

The interface uses system fonts, inline SVG icons, CSS sky gradients, and backdrop filters. Reduced motion settings are respected.
