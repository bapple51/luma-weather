/* Luma Weather — browser-only, GitHub Pages compatible. */
(() => {
  'use strict';
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
    search:'<circle cx="10" cy="10" r="6"/><path d="m15 15 5 5"/>',
    share:'<path d="M12 16V2m-4 4 4-4 4 4M5 10v10h14V10"/>',
    bookmark:'<path d="M6 3h12v19l-6-4-6 4Z"/>',
    eye:'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    gauge:'<path d="M3 18a10 10 0 1 1 18 0M12 13l5-6M5 15l2-1M6 7l2 2M12 3v3M19 15l-2-1"/><circle cx="12" cy="13" r="1.5"/>',
    'chevron-left':'<path d="m14 6-6 6 6 6"/>',
    'chevron-right':'<path d="m10 6 6 6-6 6"/>',
    settings:'<path d="m10 2-.7 3-2.5 1.4L4 5.5l-2 3 2.1 2v3L2 15.5l2 3 2.8-.9L9.3 19l.7 3h4l.7-3 2.5-1.4 2.8.9 2-3-2.1-2v-3l2.1-2-2-3-2.8.9L14.7 5 14 2Z"/><circle cx="12" cy="12" r="3"/>',
    refresh:'<path d="M20 9a8 8 0 1 0 0 6M20 3v6h-6"/>',
    play:'<path d="m8 4 12 8-12 8Z"/>',
    pause:'<path d="M8 4v16M16 4v16"/>',
    drop:'<path d="M12 2S4 11 4 15a8 8 0 0 0 16 0c0-4-8-13-8-13Z"/><path d="M8 15a4 4 0 0 0 4 4"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.cloud}</svg>`;
  const $ = id => document.getElementById(id);
  const text = (id,value) => { $(id).textContent=value; };
  const finite = value => typeof value==='number'&&Number.isFinite(value);
  const validDate = date => date instanceof Date&&Number.isFinite(+date);
  const clamp = (value,min,max) => Math.min(max,Math.max(min,value));
  const store = (key,value) => {try{localStorage.setItem('luma-'+key,JSON.stringify(value));}catch{}};
  const restore = (key,fallback) => {try{return JSON.parse(localStorage.getItem('luma-'+key))??fallback;}catch{return fallback;}};
  const state={data:null,lat:37.7749,lon:-122.4194,name:'San Francisco',unit:restore('unit','c')==='f'?'f':'c',day:0,zone:'UTC',controller:null,busy:false,fallback:false,sunMinute:null,metric:'temperature',weatherIndex:0,chart:null,showMoon:restore('moon',true)!==false,time24:restore('clock',12)===24,preview:false,playing:false,saved:restore('places',[])};
  if(!Array.isArray(state.saved))state.saved=[];
  state.saved=state.saved.filter(p=>p&&finite(p.lat)&&finite(p.lon)&&Math.abs(p.lat)<=90&&Math.abs(p.lon)<=180&&typeof p.name==='string').slice(0,12);
  const temp = value => finite(value)?`${Math.round(state.unit==='f'?value*9/5+32:value)}°`:'—';
  const speed = value => finite(value)?Math.round(state.unit==='f'?value/1.609344:value):'—';
  const speedUnit = () => state.unit==='f'?'mph':'km/h';
  const rainfall = value => finite(value)?`${state.unit==='f'?(value/25.4).toFixed(2):value.toFixed(1)} ${state.unit==='f'?'in':'mm'}`:'—';
  const formatTime = date => validDate(date)?new Intl.DateTimeFormat('en-US',{timeZone:state.zone,hour:state.time24?'2-digit':'numeric',minute:'2-digit',hourCycle:state.time24?'h23':'h12'}).format(date):'—';
  const dateKey = date => new Intl.DateTimeFormat('en-CA',{timeZone:state.zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
  const dayLabel = date => new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'short',month:'short',day:'numeric'}).format(date);
  const duration = ms => {const m=Math.round(Math.max(0,ms)/60000);return `${Math.floor(m/60)}h ${m%60}m`;};
  const coordinates = (lat,lon) => `${Math.abs(lat).toFixed(4)}° ${lat<0?'S':'N'} · ${Math.abs(lon).toFixed(4)}° ${lon<0?'W':'E'}`;
  const bearingName = degrees => ['N','NE','E','SE','S','SW','W','NW'][Math.round(degrees/45)%8];
  const phase = altitude => altitude>=-.833?'Daylight':altitude> -6?'Civil twilight':altitude> -12?'Nautical twilight':altitude> -18?'Astronomical twilight':'Astronomical night';
  function weather(code,day=true){
    if(code===0)return {label:day?'Clear sky':'Clear night',icon:day?'sun':'moon'};
    if(code===1||code===2)return {label:code===1?'Mostly clear':'Partly cloudy',icon:'partly'};
    if(code===3)return {label:'Overcast',icon:'cloud'};
    if(code===45||code===48)return {label:'Fog',icon:'fog'};
    if([51,53,55,56,57].includes(code))return {label:'Drizzle',icon:'rain'};
    if([61,63,65,66,67,80,81,82].includes(code))return {label:[80,81,82].includes(code)?'Rain showers':'Rain',icon:'rain'};
    if([71,73,75,77,85,86].includes(code))return {label:'Snow',icon:'snow'};
    if([95,96,99].includes(code))return {label:'Thunderstorm',icon:'storm'};
    return {label:'Unavailable',icon:'cloud'};
  }
  function bounds(){
    const start=state.data?new Date(state.data.daily.time[state.day]*1000):new Date(new Date().toISOString().slice(0,10)+'T00:00:00Z');
    const end=state.data?.daily.time[state.day+1]?new Date(state.data.daily.time[state.day+1]*1000):new Date(+start+86400000);
    return {start,end};
  }
  function sunForDay(start){
    const target=dateKey(start);
    const candidates=[-1,0,1].map(shift=>SunCalc.getTimes(new Date(+start+(12+24*shift)*3600000),state.lat,state.lon));
    return candidates.find(t=>dateKey(t.solarNoon)===target)||candidates[1];
  }
  function eventTime(date,start,absent='Not today'){
    return validDate(date)?formatTime(date)+(dateKey(date)!==dateKey(start)?(+date<+start?' −1d':' +1d'):''):absent;
  }
  function svgElement(tag,attributes){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);Object.entries(attributes).forEach(([key,value])=>e.setAttribute(key,value));return e;}
  function axisTicks(id,start,end){
    const el=$(id);el.replaceChildren();
    for(let i=0;i<=4;i++){const span=document.createElement('span');span.textContent=new Intl.DateTimeFormat('en-US',{timeZone:state.zone,hour:state.time24?'2-digit':'numeric',hourCycle:state.time24?'h23':'h12'}).format(new Date(+start+(+end-+start)*i/4));el.append(span);}
  }
  function renderSun(){
    const {start,end}=bounds(),times=sunForDay(start),tomorrow=sunForDay(end);
    const noon=SunCalc.getPosition(times.solarNoon,state.lat,state.lon).altitude*180/Math.PI;
    const nadir=SunCalc.getPosition(times.nadir,state.lat,state.lon).altitude*180/Math.PI;
    const darkness=validDate(times.night)?eventTime(times.night,start):noon< -18?'All day':nadir> -18?'No full darkness':'No transition';
    text('sunrise',eventTime(times.sunrise,start,'No sunrise'));text('sunset',eventTime(times.sunset,start,'No sunset'));text('solar-noon',formatTime(times.solarNoon));
    ['night','dark-time','astronomical'].forEach(id=>text(id,darkness));
    text('civil',eventTime(times.dusk,start,'No transition'));text('nautical',eventTime(times.nauticalDusk,start,'No transition'));
    text('morning-golden',validDate(times.sunrise)&&validDate(times.goldenHourEnd)?`${formatTime(times.sunrise)} – ${formatTime(times.goldenHourEnd)}`:'No golden hour on this day');
    text('golden-hour',validDate(times.goldenHour)&&validDate(times.sunset)?`${formatTime(times.goldenHour)} – ${formatTime(times.sunset)}`:'No golden hour on this day');
    const daylight=validDate(times.sunrise)&&validDate(times.sunset)?+times.sunset-+times.sunrise:noon< -.833?0:+end-+start;
    text('daylight',duration(daylight));
    text('dark-duration',validDate(times.night)&&validDate(tomorrow.nightEnd)?`${duration(+tomorrow.nightEnd-+times.night)} of darkness · first light ${formatTime(tomorrow.nightEnd)}`:noon< -18?'Astronomical darkness lasts all day.':nadir> -18?'Twilight continues through the night.':'No full-night interval on this date.');
    text('sun-date-label',`${dayLabel(start)} · ${state.zone.replaceAll('_',' ')}`);
    $('day-prev').disabled=state.day===0;$('day-next').disabled=!state.data||state.day>=Math.min(6,state.data.daily.time.length-1);
    const samples=[];
    for(let i=0;i<=288;i++){
      const date=new Date(+start+(+end-+start)*i/288);
      samples.push({x:36+828*i/288,sun:SunCalc.getPosition(date,state.lat,state.lon).altitude*180/Math.PI,moon:SunCalc.getMoonPosition(date,state.lat,state.lon).altitude*180/Math.PI});
    }
    const min=Math.max(-90,Math.min(-25,...samples.map(p=>p.sun),...(state.showMoon?samples.map(p=>p.moon):[]))-8);
    const max=Math.min(90,Math.max(20,...samples.map(p=>p.sun),...(state.showMoon?samples.map(p=>p.moon):[]))+8);
    const y=altitude=>16+(max-altitude)/(max-min)*252;
    state.chart={start,end,times,y};
    const path=key=>samples.map((p,i)=>`${i?'L':'M'}${p.x.toFixed(2)},${y(p[key]).toFixed(2)}`).join(' ');
    $('arc-path').setAttribute('d',path('sun'));$('moon-path').setAttribute('d',path('moon'));
    $('arc-fill').setAttribute('d',path('sun')+' L864,268 L36,268 Z');
    const bands=$('sky-bands');bands.replaceChildren();
    const bandColor=alt=>alt>=-.833?'#e8c48b':alt> -6?'#e6b398':alt> -12?'#b2a2c5':alt> -18?'#7b85b4':'#2e3e61';
    for(let i=0;i<288;i++)bands.append(svgElement('rect',{x:samples[i].x,y:16,width:828/288+.3,height:252,fill:bandColor(samples[i].sun),opacity:samples[i].sun>0?.055:.09}));
    const grid=$('sun-grid');grid.replaceChildren();
    const ticks=[...new Set([Math.floor(max/30)*30,0,-18,Math.ceil(min/30)*30])].filter(v=>v>=min&&v<=max).sort((a,b)=>b-a);
    ticks.forEach(value=>{
      grid.append(svgElement('line',{x1:36,x2:864,y1:y(value),y2:y(value),class:value===0?'horizon':''}));
      const label=svgElement('text',{x:4,y:y(value)+4});label.textContent=`${value}°`;grid.append(label);
    });
    for(let i=0;i<=4;i++)grid.append(svgElement('line',{x1:36+828*i/4,x2:36+828*i/4,y1:16,y2:268}));
    axisTicks('sun-axis',start,end);
    document.querySelectorAll('[data-sun-event]').forEach(button=>{const event=times[button.dataset.sunEvent];button.disabled=!validDate(event)||+event<+start||+event>+end;});
    applyMoonVisibility();renderLightTimeline(samples);renderMoon();scrubSun(state.sunMinute);renderNightOutlook();
  }
  function scrubSun(minute){
    if(!state.chart)return;
    const {start,end,y}=state.chart;
    const live=minute===null;
    if(live)minute=Date.now()>=+start&&Date.now()<+end?(Date.now()-+start)/(+end-+start)*1439:720;
    minute=clamp(Number(minute),0,1439);
    state.sunMinute=live?null:minute;
    const date=new Date(+start+(+end-+start)*minute/1439);
    const position=SunCalc.getPosition(date,state.lat,state.lon),moon=SunCalc.getMoonPosition(date,state.lat,state.lon);
    const altitude=position.altitude*180/Math.PI,bearing=(position.azimuth*180/Math.PI+180+360)%360;
    text('scrub-time',formatTime(date));text('scrub-phase',phase(altitude));text('scrub-altitude',`${altitude.toFixed(1)}°`);text('scrub-bearing',`${Math.round(bearing)}° ${bearingName(bearing)}`);
    text('moon-position',`${Math.abs(moon.altitude*180/Math.PI).toFixed(1)}° ${moon.altitude>=0?'above':'below'} horizon`);
    text('moon-position-note',`At ${formatTime(date)}`);
    const x=36+828*minute/1439;
    $('sun-dot').setAttribute('cx',x);$('sun-dot').setAttribute('cy',y(altitude));
    $('moon-dot').setAttribute('cx',x);$('moon-dot').setAttribute('cy',y(moon.altitude*180/Math.PI));
    ['x1','x2'].forEach(key=>$('sun-crosshair').setAttribute(key,x));$('sun-crosshair').setAttribute('y1',16);$('sun-crosshair').setAttribute('y2',268);
    $('sun-scrubber').value=Math.round(minute);$('sun-scrubber').setAttribute('aria-valuetext',`${formatTime(date)}, ${phase(altitude)}, sun altitude ${altitude.toFixed(1)} degrees`);
    $('sun-live').textContent=live&&state.day===0?'Live':'Reset';
    if(state.preview)applySkyPreview(date);
    $('sun-arc').setAttribute('aria-label',`Sun and moon altitude on ${dayLabel(start)}. Exploring ${formatTime(date)}: sun altitude ${altitude.toFixed(1)} degrees, ${phase(altitude)}.`);
  }
  function moonEvents(start,end){
    const altitude=time=>SunCalc.getMoonPosition(new Date(time),state.lat,state.lon).altitude-.133*Math.PI/180;
    const events={rise:null,set:null};
    let last=+start,previous=altitude(last);
    for(let i=1;i<=144;i++){
      const next=+start+(+end-+start)*i/144,value=altitude(next);
      if((previous<0&&value>=0)||(previous>=0&&value<0)){
        let a=last,b=next;const rising=previous<0;
        for(let k=0;k<15;k++){const m=(a+b)/2;if((altitude(m)>=0)===rising)b=m;else a=m;}
        const key=rising?'rise':'set';if(!events[key])events[key]=new Date((a+b)/2);
      }
      last=next;previous=value;
    }
    events.alwaysUp=altitude(+start)>=0&&!events.rise&&!events.set;return events;
  }
  function renderMoon(){
    const {start,end}=bounds(),illumination=SunCalc.getMoonIllumination(new Date((+start+ +end)/2));
    const names=['New moon','Waxing crescent','First quarter','Waxing gibbous','Full moon','Waning gibbous','Last quarter','Waning crescent'];
    text('moon-phase',names[Math.round(illumination.phase*8)%8]);text('moon-illumination',`${Math.round(illumination.fraction*100)}% illuminated`);
    const events=moonEvents(start,end);text('moonrise',events.rise?formatTime(events.rise):events.alwaysUp?'Up all day':'No rise today');text('moonset',events.set?formatTime(events.set):events.alwaysUp?'Up all day':'No set today');
    const waxing=illumination.phase<=.5,points=[],edge=[];
    for(let i=0;i<=64;i++){const y=-1+i/32,w=Math.sqrt(Math.max(0,1-y*y));points.push([40+(waxing?1:-1)*(1-2*illumination.fraction)*w*31,40+y*31]);edge.push([40+(waxing?1:-1)*w*31,40+y*31]);}
    const path=points.concat(edge.reverse()).map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')+'Z';
    $('moon-lit').setAttribute('d',path);$('moon-disc').setAttribute('aria-label',`${$('moon-phase').textContent}, ${Math.round(illumination.fraction*100)} percent illuminated`);
  }
  function updateClock(){
    const now=new Date();text('clock',`${formatTime(now)} · ${state.zone.split('/').pop().replaceAll('_',' ')}`);
    text('local-date',new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'long',month:'long',day:'numeric'}).format(now));
    const altitude=SunCalc.getPosition(now,state.lat,state.lon).altitude*180/Math.PI;
    text('phase',phase(altitude));
    const code=state.data?.current.weather_code;
    if(!state.preview)document.body.dataset.sky=altitude< -6?'night':altitude<6?'twilight':[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code)?'rain':code===3||code===45||code===48?'cloud':'day';
    const today=state.data?new Date(state.data.daily.time[0]*1000):bounds().start,events=[];
    for(let i=-1;i<8;i++){
      const sun=sunForDay(new Date(+today+i*86400000));
      [['sunrise','Sunrise'],['sunset','Sunset'],['night','Fully dark'],['nightEnd','First light']].forEach(([key,label])=>{if(validDate(sun[key])&&+sun[key]>+now)events.push({date:sun[key],label});});
    }
    events.sort((a,b)=>+a.date-+b.date);text('next-label',state.fallback?'Next sun event · UTC':'Next sun event');
    text('next-event',events.length?`${events[0].label} ${formatTime(events[0].date)}`:'No sun event this week');text('countdown',events.length?`In ${duration(+events[0].date-+now)}`:'An extended polar day or night.');
    if(state.sunMinute===null)scrubSun(null);
  }
  function renderConditions(){
    if(!state.data)return;
    const {current:c,daily:d,hourly:h}=state.data,w=weather(c.weather_code,!!c.is_day);
    text('temperature',temp(c.temperature_2m));$('current-icon').innerHTML=icon(w.icon);text('condition',w.label);
    text('high-low',`H ${temp(d.temperature_2m_max[0])} · L ${temp(d.temperature_2m_min[0])}`);text('feels-summary',`Feels like ${temp(c.apparent_temperature)}`);
    $('wind').innerHTML=`${speed(c.wind_speed_10m)} <span class="small-unit">${speedUnit()}</span>`;
    text('wind-note',`${finite(c.wind_direction_10m)?bearingName(c.wind_direction_10m):'—'} · gusts ${speed(c.wind_gusts_10m)}`);
    text('humidity',finite(c.relative_humidity_2m)?`${Math.round(c.relative_humidity_2m)}%`:'—');
    const future=h.time.findIndex(t=>t>c.time),index=future<0?h.time.length-1:Math.max(0,future-1),dew=h.dew_point_2m?.[index];text('humidity-note',`Dew point ${temp(dew)}`);
    const uv=d.uv_index_max[0];text('uv',finite(uv)?uv.toFixed(1):'—');text('uv-note',`${!finite(uv)?'Unavailable':uv<3?'Low':uv<6?'Moderate':uv<8?'High':uv<11?'Very high':'Extreme'} · daily max`);
    const visibility=h.visibility?.[index];text('visibility',finite(visibility)?`${Math.round(state.unit==='f'?visibility/1609.344:visibility/1000)} ${state.unit==='f'?'mi':'km'}`:'—');text('visibility-note',`${finite(c.cloud_cover)?Math.round(c.cloud_cover)+'%':'—'} cloud cover`);
    $('pressure').innerHTML=finite(c.pressure_msl)?`${Math.round(c.pressure_msl)} <span class="small-unit">hPa</span>`:'—';
    text('precipitation',rainfall(d.precipitation_sum?.[0]));text('precipitation-note',`${finite(d.precipitation_probability_max?.[0])?Math.round(d.precipitation_probability_max[0])+'% chance':'Today’s total'}`);
    renderSummary();
    text('updated',`Updated ${formatTime(new Date(c.time*1000))}`);
  }
  function hourIndices(){
    if(!state.data)return [];
    const h=state.data.hourly.time;
    if(state.day===0){let start=h.findIndex(t=>t>=Date.now()/1000-3600);if(start<0)start=0;return h.map((_,i)=>i).slice(start,start+24);}
    const {start,end}=bounds();return h.flatMap((t,i)=>t*1000>=+start&&t*1000<+end?[i]:[]);
  }
  function metricValue(i){
    const h=state.data.hourly;
    const value=state.metric==='temperature'?h.temperature_2m[i]:state.metric==='rain'?h.precipitation_probability[i]:state.metric==='cloud'?h.cloud_cover[i]:h.wind_speed_10m[i];
    return !finite(value)?null:state.metric==='temperature'&&state.unit==='f'?value*9/5+32:state.metric==='wind'&&state.unit==='f'?value/1.609344:value;
  }
  const metricLabel = value => !finite(value)?'—':`${Math.round(value)}${state.metric==='temperature'?'°':['rain','cloud'].includes(state.metric)?'%':' '+speedUnit()}`;
  function renderWeatherChart(){
    if(!state.data)return;
    const indices=hourIndices(),values=indices.map(metricValue),available=values.filter(finite);
    const low=['rain','cloud'].includes(state.metric)||!available.length?0:Math.floor((Math.min(...available)-2)/5)*5;
    const high=['rain','cloud'].includes(state.metric)?100:!available.length?10:Math.max(low+5,Math.ceil((Math.max(...available)+2)/5)*5);
    const x=i=>36+828*i/Math.max(1,indices.length-1),y=value=>16+(high-value)/(high-low)*172;
    state.weatherChart={indices,x,y};
    const segments=[];let segment=[];
    values.forEach((value,i)=>{if(finite(value))segment.push([x(i),y(value)]);else if(segment.length){segments.push(segment);segment=[];}});if(segment.length)segments.push(segment);
    const line=segments.map(s=>s.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')).join(' ');
    const area=segments.map(s=>s.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ')+` L${s.at(-1)[0]},188 L${s[0][0]},188 Z`).join(' ');
    $('weather-line').setAttribute('d',line);$('weather-area').setAttribute('d',area);
    const grid=$('weather-grid');grid.replaceChildren();
    for(let i=0;i<=3;i++){const value=low+(high-low)*i/3;grid.append(svgElement('line',{x1:36,x2:864,y1:y(value),y2:y(value)}));const label=svgElement('text',{x:2,y:y(value)+4});label.textContent=Math.round(value)+(['rain','cloud'].includes(state.metric)?'%':state.metric==='temperature'?'°':'');grid.append(label);}
    if(indices.length)axisTicks('weather-axis',new Date(state.data.hourly.time[indices[0]]*1000),new Date(state.data.hourly.time[indices.at(-1)]*1000));
    $('weather-scrubber').max=Math.max(0,indices.length-1);state.weatherIndex=clamp(state.weatherIndex,0,Math.max(0,indices.length-1));
    text('forecast-date-label',state.day===0?'Next 24 hours · select an hour for details.':`${dayLabel(bounds().start)} · hourly forecast`);
    renderHourly();scrubWeather(state.weatherIndex);
  }
  function scrubWeather(index){
    if(!state.weatherChart)return;
    const {indices,x,y}=state.weatherChart;index=clamp(Math.round(index),0,indices.length-1);state.weatherIndex=index;
    const i=indices[index],value=metricValue(i),h=state.data.hourly,w=weather(h.weather_code[i],!!h.is_day[i]),date=new Date(h.time[i]*1000);
    text('weather-chart-value',metricLabel(value));
    text('weather-chart-detail',`${formatTime(date)} · ${w.label} · ${state.metric==='temperature'?'Feels like '+temp(h.apparent_temperature?.[i]):state.metric==='rain'?rainfall(h.precipitation?.[i])+' forecast':state.metric==='cloud'?'Cloud cover · visibility '+visibilityLabel(h.visibility?.[i]):'Gusts '+speed(h.wind_gusts_10m?.[i])+' '+speedUnit()}`);
    text('hour-feels',temp(h.apparent_temperature?.[i]));text('hour-rain-amount',rainfall(h.precipitation?.[i]));text('hour-wind',`${speed(h.wind_speed_10m?.[i])} ${speedUnit()}`);text('hour-cloud',finite(h.cloud_cover?.[i])?Math.round(h.cloud_cover[i])+'%':'—');
    ['x1','x2'].forEach(key=>$('weather-crosshair').setAttribute(key,x(index)));$('weather-crosshair').setAttribute('y1',16);$('weather-crosshair').setAttribute('y2',188);
    $('weather-dot').style.display=finite(value)?'':'none';if(finite(value)){$('weather-dot').setAttribute('cx',x(index));$('weather-dot').setAttribute('cy',y(value));}
    $('weather-scrubber').value=index;$('weather-scrubber').setAttribute('aria-valuetext',`${formatTime(date)}, ${metricLabel(value)}, ${w.label}`);
    $('weather-graph').setAttribute('aria-label',`Hourly ${state.metric} forecast. ${formatTime(date)}, ${metricLabel(value)}, ${w.label}.`);
    document.querySelectorAll('.hour').forEach((button,n)=>button.setAttribute('aria-pressed',String(n===index)));
  }
  function renderHourly(){
    if(!state.data)return;
    const h=state.data.hourly;
    $('hourly').innerHTML=hourIndices().map((i,n)=>{
      const w=weather(h.weather_code[i],!!h.is_day[i]),hour=new Intl.DateTimeFormat('en-US',{timeZone:state.zone,hour:state.time24?'2-digit':'numeric',hourCycle:state.time24?'h23':'h12'}).format(new Date(h.time[i]*1000));
      return `<button class="hour" data-hour="${n}" aria-pressed="${n===state.weatherIndex}"><span>${hour}</span><span role="img" aria-label="${w.label}">${icon(w.icon)}</span><strong class="hour-temp">${temp(h.temperature_2m[i])}</strong><span class="hour-rain">${finite(h.precipitation_probability[i])?h.precipitation_probability[i]+'%':'—'}</span></button>`;
    }).join('');
  }
  function renderForecast(){
    if(!state.data)return;
    const d=state.data.daily,lows=d.temperature_2m_min.filter(finite),highs=d.temperature_2m_max.filter(finite),min=Math.min(...lows),max=Math.max(...highs),span=Math.max(1,max-min);
    $('forecast').innerHTML=d.time.slice(0,7).map((t,i)=>{
      const low=d.temperature_2m_min[i],high=d.temperature_2m_max[i],w=weather(d.weather_code[i]);
      const day=i===0?'Today':new Intl.DateTimeFormat('en-US',{timeZone:state.zone,weekday:'short'}).format(new Date(t*1000));
      const left=finite(low)?(low-min)/span*100:0,width=finite(high)&&finite(low)?Math.max(1,(high-low)/span*100):0,rain=d.precipitation_probability_max?.[i];
      return `<button class="forecast-row" data-day="${i}" aria-pressed="${i===state.day}" aria-label="${day}: ${w.label}, low ${temp(low)}, high ${temp(high)}"><span>${day}</span><span class="forecast-icon">${icon(w.icon)}</span><span class="forecast-low">${temp(low)}</span><span class="range-track" aria-hidden="true"><span class="range-fill" style="left:${left}%;width:${width}%"></span></span><span class="forecast-high">${temp(high)}</span><span class="forecast-rain">${finite(rain)?rain+'%':'—'}</span></button>`;
    }).join('');
  }
  function setDay(day){if(!state.data)return;stopPlayback();state.day=clamp(Number(day),0,Math.min(6,state.data.daily.time.length-1));state.sunMinute=null;state.weatherIndex=0;$('sun-date').value=state.day;renderSun();renderForecast();renderWeatherChart();}
  function validateCoordinates(lat,lon){if(!finite(lat)||!finite(lon)||Math.abs(lat)>90||Math.abs(lon)>180)throw new Error('Latitude must be between −90 and 90; longitude between −180 and 180.');}
  async function loadWeather(lat,lon,name='Selected location',refresh=false){
    validateCoordinates(lat,lon);stopPlayback();state.controller?.abort();const controller=new AbortController();state.controller=controller;state.busy=true;
    $('search-button').disabled=true;$('refresh').disabled=true;text('status','Loading the forecast…');$('status').classList.remove('error');
    const timeout=setTimeout(()=>controller.abort(),15000);
    const params=new URLSearchParams({latitude:lat,longitude:lon,timezone:'auto',timeformat:'unixtime',forecast_days:'8',current:'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl',hourly:'temperature_2m,apparent_temperature,precipitation_probability,precipitation,weather_code,is_day,wind_speed_10m,wind_gusts_10m,dew_point_2m,visibility,cloud_cover',daily:'weather_code,temperature_2m_max,temperature_2m_min,uv_index_max,precipitation_sum,precipitation_probability_max'});
    try{
      const response=await fetch('https://api.open-meteo.com/v1/forecast?'+params,{signal:controller.signal}),data=await response.json();
      if(!response.ok||data.error)throw new Error(data.reason||'Weather is temporarily unavailable.');
      if(!data.current||!data.hourly?.time?.length||!data.daily?.time?.length)throw new Error('The forecast is incomplete.');
      if(state.controller!==controller)throw new DOMException('Superseded request','AbortError');
      applyForecast(data,lat,lon,name,refresh);text('status','');
      store('forecast-cache',{data,lat,lon,name,savedAt:Date.now()});
      return {latitude:lat,longitude:lon,timezone:state.zone,currentTemperatureC:data.current.temperature_2m};
    }catch(error){
      if(state.controller!==controller)throw error;
      $('status').classList.add('error');
      let cached=false;
      const cache=restore('forecast-cache',null);
      if(!state.data&&cache?.data?.current&&cache.data.hourly?.time?.length&&cache.data.daily?.time?.length&&Math.abs(cache.lat-lat)<.0001&&Math.abs(cache.lon-lon)<.0001&&finite(cache.savedAt)&&Date.now()-cache.savedAt<86400000){const normalized=normalizeCachedForecast(cache.data);if(normalized){applyForecast(normalized,lat,lon,name);cached=true;}}
      if(!state.data){
        state.lat=lat;state.lon=lon;state.name=name;state.zone='UTC';state.fallback=true;text('location-name',name);text('place',coordinates(lat,lon));text('condition','Weather unavailable');text('high-low','Sun calculations in UTC');text('feels-summary','');
        text('timezone','Sun times in UTC while the location’s time zone is unavailable.');renderSun();updateClock();
      }
      text('status',cached?`Saved forecast from ${dayLabel(new Date(cache.data.current.time*1000))}, ${formatTime(new Date(cache.data.current.time*1000))}. Refresh to try reconnecting.`:(error.name==='AbortError'?'The weather request timed out.':error.message)+(state.data?(Math.abs(lat-state.lat)<.0001&&Math.abs(lon-state.lon)<.0001?' The last loaded forecast is still shown.':' The previous location is still shown.'):' Sun times are shown in UTC.')+' Refresh to try again.');throw error;
    }finally{clearTimeout(timeout);if(state.controller===controller){state.busy=false;$('search-button').disabled=false;$('refresh').disabled=false;}}
  }
  function notify(message){text('toast',message);$('toast').hidden=false;clearTimeout(notify.timer);notify.timer=setTimeout(()=>$('toast').hidden=true,3000);}
  function samePlace(place){return Math.abs(place.lat-state.lat)<.0001&&Math.abs(place.lon-state.lon)<.0001;}
  function renderSaved(){
    const container=$('saved-locations');container.replaceChildren();
    state.saved.forEach((place,index)=>{
      const chip=document.createElement('div');chip.className='saved-chip';
      const button=document.createElement('button');button.textContent=place.name;button.addEventListener('click',()=>loadWeather(place.lat,place.lon,place.name).catch(()=>{}));
      const remove=document.createElement('button');remove.className='remove-save';remove.textContent='×';remove.setAttribute('aria-label',`Remove ${place.name} from saved locations`);remove.addEventListener('click',()=>{state.saved.splice(index,1);store('places',state.saved);renderSaved();});
      chip.setAttribute('aria-current',String(samePlace(place)));chip.append(button,remove);container.append(chip);
    });
    const saved=state.saved.some(samePlace);$('save-location').setAttribute('aria-pressed',String(saved));$('save-location').setAttribute('aria-label',saved?'Remove saved location':'Save this location');$('save-location').style.color=saved?'var(--gold)':'';
  }
  let searchTimer,searchController;
  async function searchCities(query){
    searchController?.abort();const controller=new AbortController();searchController=controller;
    const container=$('search-results');
    if(query.trim().length<2){container.hidden=true;$('city-search').setAttribute('aria-expanded','false');return;}
    container.replaceChildren();container.hidden=false;$('city-search').setAttribute('aria-expanded','true');const loading=document.createElement('p');loading.textContent='Searching…';container.append(loading);
    try{
      const response=await fetch('https://geocoding-api.open-meteo.com/v1/search?'+new URLSearchParams({name:query.trim(),count:6,language:'en',format:'json'}),{signal:controller.signal});
      if(!response.ok)throw new Error('City search is unavailable.');const data=await response.json();if(searchController!==controller)return;
      container.replaceChildren();
      if(!data.results?.length){const empty=document.createElement('p');empty.textContent='No matches. Try a nearby city or coordinates.';container.append(empty);return;}
      data.results.forEach(place=>{const button=document.createElement('button'),name=document.createElement('strong'),detail=document.createElement('span');name.textContent=place.name;detail.textContent=[place.admin1,place.country].filter(Boolean).join(', ');button.append(name,detail);button.addEventListener('click',()=>{container.hidden=true;$('city-search').value='';$('city-search').setAttribute('aria-expanded','false');loadWeather(place.latitude,place.longitude,place.name).catch(()=>{});});container.append(button);});
    }catch(error){if(error.name==='AbortError')return;container.replaceChildren();const message=document.createElement('p');message.textContent='City search is unavailable. You can still use coordinates.';container.append(message);}
  }
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const visibilityLabel=value=>finite(value)?`${Math.round(state.unit==='f'?value/1609.344:value/1000)} ${state.unit==='f'?'mi':'km'}`:'—';
  function normalizeCachedForecast(data){
    const formatter=new Intl.DateTimeFormat('en-CA',{timeZone:data.timezone||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}),today=formatter.format(new Date());
    const first=data.daily.time.findIndex(t=>formatter.format(new Date(t*1000))===today);
    if(first<0)return null;
    const daily=Object.fromEntries(Object.entries(data.daily).map(([key,value])=>[key,Array.isArray(value)?value.slice(first):value]));
    return {...data,daily};
  }
  function applyForecast(data,lat,lon,name,refresh=false){
    const day=refresh?Math.min(state.day,data.daily.time.length-1,6):0;state.data=data;state.lat=lat;state.lon=lon;state.name=name;state.zone=data.timezone||'UTC';state.fallback=false;state.day=day;
    if(!refresh){state.sunMinute=null;state.weatherIndex=0;}
    $('latitude').value=lat;$('longitude').value=lon;text('location-name',name);text('place',coordinates(lat,lon));
    $('sun-date').innerHTML=data.daily.time.slice(0,7).map((t,i)=>`<option value="${i}">${i===0?'Today':i===1?'Tomorrow':dayLabel(new Date(t*1000))}</option>`).join('');$('sun-date').value=day;
    text('timezone',`All times in ${state.zone.replaceAll('_',' ')} · sun times approximate at sea level.`);
    renderConditions();renderSun();renderForecast();renderWeatherChart();renderSaved();updateClock();store('last-place',{lat,lon,name});
  }
  function renderSummary(){
    if(!state.data)return;
    const h=state.data.hourly,first=h.time.findIndex(t=>t>=Date.now()/1000-3600),indices=h.time.map((_,i)=>i).slice(Math.max(0,first),Math.max(0,first)+12),values=indices.map(i=>h.temperature_2m[i]).filter(finite);
    const rain=indices.find(i=>finite(h.precipitation_probability[i])&&h.precipitation_probability[i]>=50);
    const clouds=indices.map(i=>h.cloud_cover[i]).filter(finite);
    let summary=values.length?`Over the next 12 hours: ${temp(Math.min(...values))} to ${temp(Math.max(...values))}. `:'';
    summary+=rain!==undefined?`Rain chance reaches ${Math.round(h.precipitation_probability[rain])}% at ${formatTime(new Date(h.time[rain]*1000))}.`:clouds.length&&Math.max(...clouds)<25?'Mostly clear skies, with less than 25% cloud cover.':'Check the hourly forecast for changing conditions.';
    text('weather-summary',summary);$('weather-summary').hidden=!summary;
  }
  function renderLightTimeline(samples){
    const timeline=$('light-timeline');timeline.replaceChildren();
    const colors={'Daylight':'#d6b780','Civil twilight':'#ba947d','Nautical twilight':'#8b7d9d','Astronomical twilight':'#626d97','Astronomical night':'#34425e'};
    let first=0,label=phase(samples[0].sun);
    const append=end=>{const el=document.createElement('span');el.style.width=(end-first)/288*100+'%';el.style.background=colors[label];const {start,end:dayEnd}=state.chart;const time=i=>new Date(+start+(+dayEnd-+start)*i/288);el.title=`${label}: ${formatTime(time(first))} – ${formatTime(time(end))}`;timeline.append(el);};
    for(let i=1;i<288;i++){const next=phase(samples[i].sun);if(next!==label){append(i);first=i;label=next;}}
    append(288);timeline.setAttribute('role','img');timeline.setAttribute('aria-label','24-hour light timeline: '+[...timeline.children].map(el=>el.title).join('; '));
  }
  function renderNightOutlook(){
    const panel=$('night-outlook');if(!state.data){panel.hidden=true;return;}
    panel.hidden=false;const {start,end}=bounds(),times=sunForDay(start),next=sunForDay(end),h=state.data.hourly;
    const from=validDate(times.night)?+times.night:+start,to=validDate(times.night)&&validDate(next.nightEnd)?+next.nightEnd:+end;
    const indices=h.time.flatMap((time,i)=>time*1000>=from&&time*1000<to&&SunCalc.getPosition(new Date(time*1000),state.lat,state.lon).altitude< -18*Math.PI/180?[i]:[]);
    const values=indices.map(i=>h.cloud_cover[i]).filter(finite);const container=$('night-outlook-hours');container.replaceChildren();
    if(!indices.length){text('night-outlook-summary','No hourly forecast falls within astronomical darkness on this date.');return;}
    text('night-outlook-summary',`${formatTime(new Date(from))} – ${formatTime(new Date(to))}${values.length?' · '+Math.round(Math.min(...values))+'–'+Math.round(Math.max(...values))+'% cloud cover':''}`);
    indices.forEach(i=>{const hour=document.createElement('div');hour.className='night-hour'+(finite(h.cloud_cover[i])&&h.cloud_cover[i]<25?' is-clear':'');const time=document.createElement('time');time.textContent=formatTime(new Date(h.time[i]*1000));const cover=document.createElement('strong');cover.textContent=finite(h.cloud_cover[i])?Math.round(h.cloud_cover[i])+'%':'—';const label=document.createElement('span');label.textContent='cloud cover';hour.append(time,cover,label);container.append(hour);});
  }
  function applyMoonVisibility(){
    ['moon-path','moon-dot'].forEach(id=>$(id).style.display=state.showMoon?'':'none');
    $('moon-toggle').setAttribute('aria-pressed',String(state.showMoon));$('settings-moon').checked=state.showMoon;
  }
  function applySkyPreview(date){
    const altitude=SunCalc.getPosition(date,state.lat,state.lon).altitude*180/Math.PI;
    let code=0;
    if(state.data){const h=state.data.hourly,index=h.time.findLastIndex(t=>t*1000<=+date);code=h.weather_code[index]??0;}
    document.body.dataset.sky=altitude< -6?'night':altitude<6?'twilight':[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(code)?'rain':code===3||code===45||code===48?'cloud':'day';
    text('sky-preview-label',`Sky preview · ${dayLabel(date)}, ${formatTime(date)}`);
  }
  function setPreview(enabled){
    state.preview=enabled;document.body.dataset.preview=String(enabled);$('sky-preview').checked=enabled;$('sky-preview-badge').hidden=!enabled;
    if(enabled)scrubSun(state.sunMinute);else updateClock();
  }
  function stopPlayback(){
    cancelAnimationFrame(stopPlayback.frame);state.playing=false;$('sun-play').setAttribute('aria-pressed','false');
    $('sun-play').innerHTML=icon('play')+`<span>${reducedMotion.matches?'Step 1h':'Play day'}</span>`;
  }
  function playDay(){
    if(!state.chart)return;
    if(state.playing){stopPlayback();return;}
    if(reducedMotion.matches){scrubSun(Math.min(1439,Number($('sun-scrubber').value)+60));return;}
    state.playing=true;$('sun-play').setAttribute('aria-pressed','true');$('sun-play').innerHTML=icon('pause')+'<span>Pause</span>';
    const first=state.sunMinute===null||state.sunMinute>=1439?0:state.sunMinute,began=performance.now();let last=0;
    const frame=time=>{if(!state.playing)return;const minute=Math.min(1439,first+(time-began)/1000*60);if(time-last>70||minute>=1439){scrubSun(minute);last=time;}if(minute>=1439){stopPlayback();return;}stopPlayback.frame=requestAnimationFrame(frame);};
    stopPlayback.frame=requestAnimationFrame(frame);
  }
  function rerenderDisplay(){
    stopPlayback();renderConditions();renderSun();renderForecast();renderWeatherChart();updateClock();
  }
  function attachGraph(svgId,callback){
    const svg=$(svgId);let dragging=false;
    const move=event=>{const rect=svg.getBoundingClientRect();const fraction=clamp(((event.clientX-rect.left)/rect.width*900-36)/828,0,1);callback(fraction);};
    svg.addEventListener('pointerdown',event=>{if(svgId==='sun-arc')stopPlayback();dragging=true;svg.setPointerCapture(event.pointerId);move(event);});
    svg.addEventListener('pointermove',event=>{if((event.pointerType==='mouse'||dragging)&&!state.playing)move(event);});
    svg.addEventListener('pointerup',()=>dragging=false);svg.addEventListener('pointercancel',()=>dragging=false);
  }
  document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
  $('location-form').addEventListener('submit',event=>{event.preventDefault();const lat=Number($('latitude').value),lon=Number($('longitude').value);loadWeather(lat,lon,Math.abs(lat-state.lat)<.0001&&Math.abs(lon-state.lon)<.0001?state.name:'Selected location').catch(()=>{});});
  $('sun-date').addEventListener('change',()=>setDay($('sun-date').value));$('day-prev').addEventListener('click',()=>setDay(state.day-1));$('day-next').addEventListener('click',()=>setDay(state.day+1));
  $('sun-scrubber').addEventListener('input',()=>{stopPlayback();scrubSun(Number($('sun-scrubber').value));});$('sun-live').addEventListener('click',()=>{stopPlayback();scrubSun(null);});
  document.querySelectorAll('[data-sun-event]').forEach(button=>button.addEventListener('click',()=>{stopPlayback();const {start,end,times}=state.chart,time=times[button.dataset.sunEvent];if(validDate(time))scrubSun((+time-+start)/(+end-+start)*1439);}));
  $('weather-scrubber').addEventListener('input',()=>scrubWeather(Number($('weather-scrubber').value)));
  $('hourly').addEventListener('click',event=>{const button=event.target.closest('[data-hour]');if(button)scrubWeather(Number(button.dataset.hour));});
  $('forecast').addEventListener('click',event=>{const button=event.target.closest('[data-day]');if(button)setDay(button.dataset.day);});
  document.querySelectorAll('[data-unit]').forEach(button=>{button.setAttribute('aria-pressed',String(button.dataset.unit===state.unit));button.addEventListener('click',()=>{state.unit=button.dataset.unit;store('unit',state.unit);document.querySelectorAll('[data-unit]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.unit===state.unit)));renderConditions();renderForecast();renderWeatherChart();});});
  document.querySelectorAll('[data-metric]').forEach(button=>button.addEventListener('click',()=>{state.metric=button.dataset.metric;document.querySelectorAll('[data-metric]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.metric===state.metric)));renderWeatherChart();}));
  $('city-search').addEventListener('input',()=>{clearTimeout(searchTimer);searchController?.abort();const query=$('city-search').value;searchTimer=setTimeout(()=>searchCities(query),300);});
  $('city-search').addEventListener('keydown',event=>{const results=$('search-results');if(event.key==='Escape'){results.hidden=true;$('city-search').setAttribute('aria-expanded','false');}if(event.key==='ArrowDown'&&!results.hidden){event.preventDefault();results.querySelector('button')?.focus();}});
  $('search-results').addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();$('search-results').hidden=true;$('city-search').setAttribute('aria-expanded','false');$('city-search').focus();}const buttons=[...$('search-results').querySelectorAll('button')],index=buttons.indexOf(document.activeElement);if(event.key==='ArrowDown'||event.key==='ArrowUp'){event.preventDefault();buttons[clamp(index+(event.key==='ArrowDown'?1:-1),0,buttons.length-1)]?.focus();}});
  document.addEventListener('pointerdown',event=>{if(!event.target.closest('.city-search')){$('search-results').hidden=true;$('city-search').setAttribute('aria-expanded','false');}});
  $('save-location').addEventListener('click',()=>{const existing=state.saved.findIndex(samePlace);if(existing>=0)state.saved.splice(existing,1);else{if(state.saved.length>=12){notify('You can save up to 12 locations.');return;}state.saved.push({lat:state.lat,lon:state.lon,name:state.name});}store('places',state.saved);renderSaved();notify(existing>=0?'Location removed.':'Location saved on this device.');});
  $('share').addEventListener('click',async()=>{const url=new URL(location.href);url.search='';url.searchParams.set('lat',state.lat);url.searchParams.set('lon',state.lon);url.searchParams.set('name',state.name);try{await navigator.clipboard.writeText(url.href);notify('Location link copied.');}catch{window.prompt('Copy this location link:',url.href);}});
  $('locate').addEventListener('click',()=>{if(!navigator.geolocation){notify('Location is unavailable. Use coordinates instead.');return;}$('locate').disabled=true;text('status','Waiting for location permission…');navigator.geolocation.getCurrentPosition(position=>{$('locate').disabled=false;loadWeather(position.coords.latitude,position.coords.longitude,'My location').catch(()=>{});},()=>{$('locate').disabled=false;text('status','Location could not be shared. Search a city or enter coordinates.');},{timeout:15000,maximumAge:300000});});
  attachGraph('sun-arc',fraction=>scrubSun(fraction*1439));attachGraph('weather-graph',fraction=>{if(state.weatherChart)scrubWeather(fraction*(state.weatherChart.indices.length-1));});
  $('sun-play').addEventListener('click',playDay);
  $('sky-preview').addEventListener('change',()=>setPreview($('sky-preview').checked));
  $('preview-exit').addEventListener('click',()=>setPreview(false));
  $('moon-toggle').addEventListener('click',()=>{state.showMoon=!state.showMoon;store('moon',state.showMoon);stopPlayback();renderSun();});
  $('settings-moon').addEventListener('change',()=>{state.showMoon=$('settings-moon').checked;store('moon',state.showMoon);stopPlayback();renderSun();});
  $('settings-open').addEventListener('click',()=>$('settings-dialog').showModal());
  $('settings-close').addEventListener('click',()=>$('settings-dialog').close());
  $('settings-dialog').addEventListener('click',event=>{if(event.target===$('settings-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
  $('time-format').value=state.time24?'24':'12';
  $('time-format').addEventListener('change',()=>{state.time24=$('time-format').value==='24';store('clock',state.time24?24:12);rerenderDisplay();});
  $('refresh').addEventListener('click',()=>loadWeather(state.lat,state.lon,state.name,true).catch(()=>{}));
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopPlayback();});
  window.addEventListener('online',()=>{if(!state.busy)loadWeather(state.lat,state.lon,state.name,true).catch(()=>{});});
  reducedMotion.addEventListener('change',stopPlayback);
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio);if(visible.length)document.querySelectorAll('.mobile-nav a').forEach(a=>a.setAttribute('aria-current',String(a.hash==='#'+visible[0].target.id)));},{rootMargin:'-10% 0px -55% 0px',threshold:[0,.25,.5,1]});
  ['conditions','daylight-section','forecast-section'].forEach(id=>observer.observe($(id)));
  stopPlayback();applyMoonVisibility();
  renderSaved();
  const params=new URLSearchParams(location.search),last=restore('last-place',null);
  if(params.has('lat')&&params.has('lon')){const lat=Number(params.get('lat')),lon=Number(params.get('lon'));try{validateCoordinates(lat,lon);state.lat=lat;state.lon=lon;state.name=(params.get('name')||'Shared location').slice(0,80);}catch{notify('The shared coordinates are invalid.');}}
  else if(last){try{validateCoordinates(last.lat,last.lon);state.lat=last.lat;state.lon=last.lon;state.name=typeof last.name==='string'?last.name:'Selected location';}catch{}}
  if(document.modelContext?.registerTool){
    const lifecycle=new AbortController();
    try{Promise.resolve(document.modelContext.registerTool({name:'show_weather_at_coordinates',title:'Show weather at coordinates',description:'Load live weather and sun times for coordinates, updating the dashboard.',inputSchema:{type:'object',properties:{latitude:{type:'number',minimum:-90,maximum:90},longitude:{type:'number',minimum:-180,maximum:180}},required:['latitude','longitude'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:input=>loadWeather(input.latitude,input.longitude)},{signal:lifecycle.signal})).catch(()=>{});}catch{}
    window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  }
  window.Luma={state,loadWeather,sunForDay,setDay,scrubSun,scrubWeather,searchCities,renderSun,stopPlayback};
  loadWeather(state.lat,state.lon,state.name).catch(()=>{});
  setInterval(()=>{if(!state.busy){updateClock();if(state.sunMinute===null)scrubSun(null);}},60000);
  setInterval(()=>{if(!state.busy&&state.data)loadWeather(state.lat,state.lon,state.name,true).catch(()=>{});},900000);
})();
