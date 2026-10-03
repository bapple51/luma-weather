/* Luma Weather — static, no secrets or server required. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const icons = {
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
    moon:'<path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/>',
    cloud:'<path d="M6 19a4.5 4.5 0 0 1-1-8.9A6 6 0 0 1 16.6 8a5.5 5.5 0 0 1 1.9 11Z"/>',
    partly:'<path d="M10 3v2M3 10H1m3-6 1.5 1.5M16 4l-1.5 1.5"/><path d="M6.7 12A4.5 4.5 0 1 1 14 7"/><path d="M8 20a4 4 0 0 1-.3-8 5 5 0 0 1 9.8-.4A4.3 4.3 0 0 1 18 20Z"/>',
    rain:'<path d="M6 14a4 4 0 0 1-1-7.8 5.5 5.5 0 0 1 10.5-1.1A4.7 4.7 0 0 1 18 14Z"/><path d="m7 17-1 3m7-3-1 3m7-3-1 3"/>',
    snow:'<path d="M6 13a4 4 0 0 1-1-7.8 5.5 5.5 0 0 1 10.5-1.1A4.7 4.7 0 0 1 18 13Z"/><path d="M7 17v4m-2-2h4m8-2v4m-2-2h4"/>',
    storm:'<path d="M6 14a4 4 0 0 1-1-7.8 5.5 5.5 0 0 1 10.5-1.1A4.7 4.7 0 0 1 18 14Z"/><path d="m13 12-4 6h5l-3 5"/>',
    fog:'<path d="M6 12a4 4 0 0 1-1-7.8 5.5 5.5 0 0 1 10.5-1.1A4.7 4.7 0 0 1 18 12M3 16h18M5 20h14"/>',
    sunrise:'<path d="M3 18h18M2 22h20M6 18a6 6 0 0 1 12 0M12 2v7m-3-4 3-3 3 3M3 11l2 2m14 0 2-2"/>',
    sunset:'<path d="M3 18h18M2 22h20M6 18a6 6 0 0 1 12 0M12 2v7m-3-3 3 3 3-3M3 11l2 2m14 0 2-2"/>',
    pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    locate:'<circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    calendar:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h1m6 0h1m-8 3h1m6 0h1"/>',
    stars:'<path d="m10 3 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="m19 2 .8 2.2L22 5l-2.2.8L19 8l-.8-2.2L16 5l2.2-.8ZM20 17v4m-2-2h4"/>',
    thermometer:'<path d="M9 14.8V5a3 3 0 0 1 6 0v9.8a5 5 0 1 1-6 0Z"/><path d="M12 9v9"/><circle cx="12" cy="18" r="1.5"/>',
    wind:'<path d="M3 7h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 0-3-3M4 17h10a3 3 0 1 1-3 3"/>',
    drop:'<path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z"/><path d="M8 15a4 4 0 0 0 4 4"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.cloud}</svg>`;
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });
  const state = { data:null, lat:37.7749, lon:-122.4194, unit:'c', day:0, zone:'UTC', busy:false, controller:null, fallback:false };
  const text = (id, value) => { $(id).textContent = value; };
  const finite = value => typeof value === 'number' && Number.isFinite(value);
  const validDate = date => date instanceof Date && Number.isFinite(date.getTime());
  const temp = value => finite(value) ? `${Math.round(state.unit === 'f' ? value*9/5+32 : value)}°` : '—';
  const round = value => finite(value) ? Math.round(value) : '—';
  const formatTime = date => validDate(date) ? new Intl.DateTimeFormat('en-US',{timeZone:state.zone,hour:'numeric',minute:'2-digit'}).format(date) : '—';
  const dateKey = date => new Intl.DateTimeFormat('en-CA',{timeZone:state.zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  const duration = ms => { const minutes = Math.round(Math.max(0,ms)/60000); return `${Math.floor(minutes/60)}h ${minutes%60}m`; };
  const dayLabel = date => new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'short',month:'short',day:'numeric'}).format(date);
  const coordinates = (lat,lon) => `${Math.abs(lat).toFixed(4)}° ${lat<0?'S':'N'} · ${Math.abs(lon).toFixed(4)}° ${lon<0?'W':'E'}`;
  function weather(code, day=true) {
    if(code === 0) return {label:day?'Clear sky':'Clear night', icon:day?'sun':'moon'};
    if(code === 1 || code === 2) return {label:code===1?'Mostly clear':'Partly cloudy',icon:'partly'};
    if(code === 3) return {label:'Overcast',icon:'cloud'};
    if(code === 45 || code === 48) return {label:'Fog',icon:'fog'};
    if([51,53,55,56,57].includes(code)) return {label:'Drizzle',icon:'rain'};
    if([61,63,65,66,67,80,81,82].includes(code)) return {label:[80,81,82].includes(code)?'Rain showers':'Rain',icon:'rain'};
    if([71,73,75,77,85,86].includes(code)) return {label:'Snow',icon:'snow'};
    if([95,96,99].includes(code)) return {label:'Thunderstorm',icon:'storm'};
    return {label:'Conditions unavailable',icon:'cloud'};
  }
  function sunForDay(start) {
    const target = dateKey(start);
    const candidates = [-1,0,1].map(shift => SunCalc.getTimes(new Date(+start+(12+24*shift)*3600000),state.lat,state.lon));
    return candidates.find(times => dateKey(times.solarNoon) === target) || candidates[1];
  }
  function selectedDay() {
    return state.data ? new Date(state.data.daily.time[state.day]*1000) : new Date(new Date().toISOString().slice(0,10)+'T00:00:00Z');
  }
  function eventTime(date, start, absent='Not today') {
    if(!validDate(date)) return absent;
    return formatTime(date)+(dateKey(date)!==dateKey(start)?(+date<+start?' −1d':' +1d'):'');
  }
  function renderSun() {
    const start = selectedDay();
    const end = state.data?.daily.time[state.day+1] ? new Date(state.data.daily.time[state.day+1]*1000) : new Date(+start+86400000);
    const times = sunForDay(start);
    const tomorrow = sunForDay(end);
    const noonAltitude = SunCalc.getPosition(times.solarNoon,state.lat,state.lon).altitude*180/Math.PI;
    const midnightAltitude = SunCalc.getPosition(times.nadir,state.lat,state.lon).altitude*180/Math.PI;
    const continuousDark = noonAltitude < -18;
    const noDark = midnightAltitude > -18;
    const darkness = validDate(times.night) ? eventTime(times.night,start) : continuousDark ? 'All day' : noDark ? 'No full darkness' : 'No transition';
    text('sunrise',eventTime(times.sunrise,start,'No sunrise'));
    text('sunset',eventTime(times.sunset,start,'No sunset'));
    ['night','dark-time','astronomical'].forEach(id=>text(id,darkness));
    text('civil',eventTime(times.dusk,start,'No transition'));
    text('nautical',eventTime(times.nauticalDusk,start,'No transition'));
    text('solar-noon',formatTime(times.solarNoon));
    const daylight = validDate(times.sunrise)&&validDate(times.sunset) ? +times.sunset-+times.sunrise : noonAltitude < -.833 ? 0 : +end-+start;
    text('daylight',duration(daylight));
    text('dark-duration',validDate(times.night)&&validDate(tomorrow.nightEnd) ? `${duration(+tomorrow.nightEnd-+times.night)} of darkness · ends ${formatTime(tomorrow.nightEnd)}` : continuousDark ? 'The sun stays more than 18° below the horizon.' : noDark ? 'Twilight continues through the night.' : 'A full-night interval is unavailable for this date.');
    const points=[];
    for(let i=0;i<=144;i++) {
      const altitude = SunCalc.getPosition(new Date(+start+(+end-+start)*i/144),state.lat,state.lon).altitude*180/Math.PI;
      points.push([20+660*i/144, Math.min(135,115-altitude*1.5)]);
    }
    const path = points.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ');
    $('arc-path').setAttribute('d',path);
    $('arc-fill').setAttribute('d',path+' L680,135 L20,135 Z');
    const now = new Date();
    const isToday = +now>=+start && +now<+end;
    $('sun-dot').style.display = isToday ? '' : 'none';
    if(isToday) {
      $('sun-dot').setAttribute('cx',20+660*(+now-+start)/(+end-+start));
      $('sun-dot').setAttribute('cy',Math.min(135,115-SunCalc.getPosition(now,state.lat,state.lon).altitude*180/Math.PI*1.5));
    }
    $('sun-arc').setAttribute('aria-label',`Sun altitude for ${dayLabel(start)}. Sunrise ${eventTime(times.sunrise,start,'does not occur')}, sunset ${eventTime(times.sunset,start,'does not occur')}, full darkness ${darkness}.`);
  }
  function updateClock() {
    const now = new Date();
    text('clock',`${formatTime(now)} · ${state.zone.replaceAll('_',' ').split('/').pop()}`);
    text('local-date',new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'long',month:'long',day:'numeric'}).format(now));
    const altitude = SunCalc.getPosition(now,state.lat,state.lon).altitude*180/Math.PI;
    const phase = altitude>0?'Daylight':altitude> -6?'Civil twilight':altitude> -12?'Nautical twilight':altitude> -18?'Astronomical twilight':'Night';
    text('phase',phase);
    const code=state.data?.current.weather_code;
    document.body.dataset.sky = altitude< -6?'night':altitude<6?'twilight':[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code)?'rain':code===3||code===45||code===48?'cloud':'day';
    const today = state.data ? new Date(state.data.daily.time[0]*1000) : selectedDay();
    const events=[];
    for(let i=-1;i<8;i++) {
      const sun=sunForDay(new Date(+today+i*86400000));
      [['sunrise','Sunrise'],['sunset','Sunset'],['night','Fully dark'],['nightEnd','First light']].forEach(([key,label])=>{if(validDate(sun[key])&&+sun[key]>+now)events.push({date:sun[key],label});});
    }
    events.sort((a,b)=>+a.date-+b.date);
    text('next-label',state.fallback?'NEXT ON THE HORIZON · UTC':'NEXT ON THE HORIZON');
    if(events.length) {
      text('next-event',`${events[0].label} · ${formatTime(events[0].date)}`);
      text('countdown',`In ${duration(+events[0].date-+now)}`);
    } else {text('next-event','A long '+(altitude>0?'polar day':'polar night'));text('countdown','No sunrise or sunset in the next week.');}
  }
  function renderWeather() {
    const data=state.data;if(!data)return;
    const current=data.current, daily=data.daily, hourly=data.hourly;
    const condition=weather(current.weather_code,!!current.is_day);
    $('temperature').innerHTML=finite(current.temperature_2m)?`${Math.round(state.unit==='f'?current.temperature_2m*9/5+32:current.temperature_2m)}<span>°</span>`:'—';
    $('current-icon').innerHTML=icon(condition.icon);
    text('condition',condition.label);
    text('high-low',`H: ${temp(daily.temperature_2m_max[0])}   L: ${temp(daily.temperature_2m_min[0])}   ·   Feels like ${temp(current.apparent_temperature)}`);
    text('feels',temp(current.apparent_temperature));
    const diff=current.apparent_temperature-current.temperature_2m;
    text('feels-note',Math.abs(diff)<2?'Similar to the actual temperature.':diff>0?'Humidity and sun can make it feel warmer.':'Wind and humidity can make it feel cooler.');
    const speed=finite(current.wind_speed_10m)?Math.round(state.unit==='f'?current.wind_speed_10m/1.609344:current.wind_speed_10m):'—';
    $('wind').innerHTML=`${speed} <span class="small-unit">${state.unit==='f'?'mph':'km/h'}</span>`;
    const direction=finite(current.wind_direction_10m)?['N','NE','E','SE','S','SW','W','NW'][Math.round(current.wind_direction_10m/45)%8]:'—';
    const gust=finite(current.wind_gusts_10m)?Math.round(state.unit==='f'?current.wind_gusts_10m/1.609344:current.wind_gusts_10m):'—';
    text('wind-note',`${direction} · gusts ${gust} ${state.unit==='f'?'mph':'km/h'}`);
    text('humidity',`${round(current.relative_humidity_2m)}%`);
    text('humidity-note',`Cloud cover ${round(current.cloud_cover)}%`);
    const uv=daily.uv_index_max[0];text('uv',finite(uv)?uv.toFixed(1):'—');
    text('uv-note',`${!finite(uv)?'Unavailable':uv<3?'Low':uv<6?'Moderate':uv<8?'High':uv<11?'Very high':'Extreme'} · today's maximum`);
    const now=Date.now()/1000;
    let first=hourly.time.findIndex(t=>t>=now-3600);if(first<0)first=0;
    $('hourly').innerHTML=hourly.time.slice(first,first+24).map((t,n)=>{
      const i=first+n, w=n===0?condition:weather(hourly.weather_code[i],!!hourly.is_day[i]);
      const hour=new Intl.DateTimeFormat('en-US',{timeZone:state.zone,hour:'numeric'}).format(new Date(t*1000));
      const probability=hourly.precipitation_probability[i];
      return `<div class="hour"><span class="hour-time">${n===0?'Now':hour}</span><span class="hour-icon" role="img" aria-label="${w.label}">${icon(w.icon)}</span><strong class="hour-temp">${temp(n===0?current.temperature_2m:hourly.temperature_2m[i])}</strong><span class="hour-rain" aria-label="Precipitation probability">${finite(probability)?probability+'%':'—'}</span></div>`;
    }).join('');
    const lows=daily.temperature_2m_min.filter(finite),highs=daily.temperature_2m_max.filter(finite);
    const min=Math.min(...lows),max=Math.max(...highs),span=Math.max(1,max-min);
    $('forecast').innerHTML=daily.time.slice(0,7).map((t,i)=>{
      const low=daily.temperature_2m_min[i],high=daily.temperature_2m_max[i],w=weather(daily.weather_code[i]);
      const label=i===0?'Today':new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'short'}).format(new Date(t*1000));
      const left=finite(low)?(low-min)/span*100:0,width=finite(high)&&finite(low)?(high-low)/span*100:0;
      return `<div class="forecast-row"><span>${label}</span><span class="forecast-icon" role="img" aria-label="${w.label}">${icon(w.icon)}</span><span class="forecast-low">${temp(low)}</span><span class="range-track" aria-hidden="true"><span class="range-fill" style="left:${left}%;width:${width}%"></span></span><span class="forecast-high">${temp(high)}</span></div>`;
    }).join('');
    text('updated',`Weather as of ${formatTime(new Date(current.time*1000))}`);
  }
  function validateCoordinates(lat,lon) {
    if(!finite(lat)||!finite(lon)||lat< -90||lat>90||lon< -180||lon>180)throw new Error('Enter a latitude from −90 to 90 and a longitude from −180 to 180.');
  }
  async function loadWeather(lat,lon) {
    validateCoordinates(lat,lon);
    if(state.controller)state.controller.abort();
    const controller=new AbortController();state.controller=controller;state.busy=true;
    $('search-button').disabled=true;$('search-button').textContent='Finding your sky…';
    text('status','Getting the latest forecast…');$('status').classList.remove('error');
    const timeout=setTimeout(()=>controller.abort(),15000);
    const params=new URLSearchParams({latitude:lat,longitude:lon,timezone:'auto',timeformat:'unixtime',forecast_days:'8',current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m',hourly:'temperature_2m,precipitation_probability,weather_code,is_day',daily:'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max'});
    try {
      const response=await fetch('https://api.open-meteo.com/v1/forecast?'+params,{signal:controller.signal});
      const data=await response.json();
      if(!response.ok||data.error)throw new Error(data.reason||'The weather service is temporarily unavailable.');
      if(!data.current||!data.hourly?.time?.length||!data.daily?.time?.length)throw new Error('The forecast is incomplete. Please try again.');
      state.data=data;state.lat=lat;state.lon=lon;state.zone=data.timezone||'UTC';state.day=0;state.fallback=false;
      $('latitude').value=lat;$('longitude').value=lon;
      text('place',coordinates(lat,lon));
      $('sun-date').innerHTML=data.daily.time.slice(0,7).map((t,i)=>`<option value="${i}">${i===0?'Today':i===1?'Tomorrow':dayLabel(new Date(t*1000))}</option>`).join('');
      $('sun-date').value='0';
      text('timezone',`Sun times in ${state.zone.replaceAll('_',' ')} · approximate, at sea level.`);
      text('status',`Forecast loaded · ${state.zone.replaceAll('_',' ')} · ${Math.round(data.elevation)} m elevation`);
      renderWeather();renderSun();updateClock();
      return {latitude:lat,longitude:lon,timezone:state.zone,currentTemperatureC:data.current.temperature_2m,condition:weather(data.current.weather_code,!!data.current.is_day).label};
    } catch(error) {
      if(state.controller!==controller)throw error;
      $('status').classList.add('error');
      if(!state.data) {
        state.lat=lat;state.lon=lon;state.zone='UTC';state.fallback=true;
        text('place',coordinates(lat,lon));text('condition','Weather unavailable');text('high-low','Sun calculations are available below.');
        text('hourly','The forecast could not load. Use “Explore this sky” to retry.');text('forecast','The forecast could not load.');
        text('timezone','Sun times in UTC while the location’s time zone is unavailable.');renderSun();updateClock();
      }
      text('status',(error.name==='AbortError'?'The weather request timed out.':error.message)+(state.data?' The previous location is still shown.':' Sun times are shown in UTC.')+' Try again.');
      throw error;
    } finally {
      clearTimeout(timeout);
      if(state.controller===controller){state.busy=false;$('search-button').disabled=false;$('search-button').textContent='Explore this sky';}
    }
  }
  $('location-form').addEventListener('submit',event=>{event.preventDefault();loadWeather(Number($('latitude').value),Number($('longitude').value)).catch(()=>{});});
  $('sun-date').addEventListener('change',()=>{state.day=Number($('sun-date').value);renderSun();});
  document.querySelectorAll('[data-unit]').forEach(button=>button.addEventListener('click',()=>{
    state.unit=button.dataset.unit;
    document.querySelectorAll('[data-unit]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.unit===state.unit)));
    renderWeather();
  }));
  $('locate').addEventListener('click',()=>{
    if(!navigator.geolocation){text('status','Location is unavailable in this browser. Enter your coordinates instead.');return;}
    const button=$('locate');button.disabled=true;text('status','Waiting for your location…');
    navigator.geolocation.getCurrentPosition(position=>{button.disabled=false;loadWeather(position.coords.latitude,position.coords.longitude).catch(()=>{});},()=>{button.disabled=false;text('status','Location could not be shared. Enter your coordinates instead.');$('status').classList.add('error');},{enableHighAccuracy:false,timeout:15000,maximumAge:300000});
  });
  if(document.modelContext?.registerTool) {
    const lifecycle=new AbortController();
    try {Promise.resolve(document.modelContext.registerTool({name:'show_weather_at_coordinates',title:'Show weather at coordinates',description:'Load live weather and sun times for a latitude and longitude, updating the visible dashboard.',inputSchema:{type:'object',properties:{latitude:{type:'number',minimum:-90,maximum:90},longitude:{type:'number',minimum:-180,maximum:180}},required:['latitude','longitude'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:input=>loadWeather(input.latitude,input.longitude)},{signal:lifecycle.signal})).catch(()=>{});}catch{}
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
  window.Luma={loadWeather,sunForDay,state};
  loadWeather(state.lat,state.lon).catch(()=>{});
  setInterval(()=>{if(!state.busy){updateClock();renderSun();}},60000);
  setInterval(()=>{if(!state.busy&&state.data)loadWeather(state.lat,state.lon).catch(()=>{});},900000);
})();
