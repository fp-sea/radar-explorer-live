const e=[{id:"tropical",label:"Tropical cyclone / hurricane structure",regions:["hawaii","houston"],set:{field:"dbz",mode:1,thr:30,opacity:.5,vex:3,clip:"all",view:"whole-3d",dock:"winds",arrows:!0,sat:{on:!0,band:"ir",shape:1,opacity:.45}},tip:`<p><b>Use:</b> reading a hurricane or tropical storm as it passes: where the eyewall and rainbands are,
      how tall, and how strong the wind is aloft.</p>
      <ul>
        <li><b>Eyewall:</b> a ring of tall 40\u201350+ dBZ around a weak-echo eye. Surface at 30 dBZ with 3\xD7 exaggeration
          shows it as a wall. Tops of 14\u201317 km are normal; the grid here reaches 16 km.</li>
        <li><b>Rainbands:</b> spiral arms of showers. Squalls in the bands bring the gusts (and the brief tornadoes
          and waterspouts) well away from the centre.</li>
        <li><b>Velocity:</b> switch to Vel. Across the storm you'll see strong inbound on one side and outbound on
          the other: the circulation. <b>Winds above ~25 m/s fold</b> in the raw data; live frames are unfolded
          against each scan's VAD wind and case frames by Py-ART, but where the fit fails the strongest parts
          can still look like noise.</li>
        <li><b>Winds aloft (VAD):</b> the barbs show the average wind round the radar; in a hurricane the ring is
          not uniform, so treat it as indicative.</li>
        <li><b>Satellite 3D:</b> the IR cloud tops over the radar: the cold central dense overcast and bands.</li>
      </ul>
      <p><b>Limits:</b> the radar sees only what is within ~200 km, and the low levels only close in. Far out,
      the beam is several km up: the surface wind is stronger than anything radar hints at.
      For official track, intensity and warnings, use the National Hurricane Center / CPHC.</p>`},{id:"trades",label:"Trade-wind showers & channel winds",regions:["hawaii"],set:{field:"vel",mode:2,thr:8,opacity:1,vex:5,clip:"low",view:"channel-top",dock:null},tip:`<p><b>Use:</b> the Alenuihaha Channel and the Big Island's lee and windward sides in trade winds.</p>
      <p>Trades (ENE) funnel and accelerate through the channel between Maui and the Big Island; the channel is one
      of the roughest crossings in the islands. In Velocity from above, a strong block of one colour through the
      channel (inbound or outbound depending on which side of PHKM) is that acceleration, as the radar sees it
      <i>aloft</i>. PHKM sits 1.2 km up, so over the channel its lowest beam is 1\u20132 km above the water.</p>
      <p>Switch to dBZ: showers form on the windward (east) slopes and drift downwind; the Kona side is often dry by
      day with afternoon clouds. Low, shallow trade-wind showers (tops 2\u20133 km) can be under-seen far from the
      radar.</p>
      <p>Check the airports (Kahului, Kapalua, Waimea, Kona, Hilo) and use Winds for the trade-wind depth.</p>`},{id:"rainfall",label:"Heavy rain & flooding (rain totals)",set:{field:"dbz",mode:2,thr:25,opacity:.6,vex:5,clip:"low",view:"whole-top",dock:null,ground:"photo",rain:{hours:24}},tip:`<p><b>Use:</b> where has the heavy rain actually fallen, and is more coming onto the same ground?</p>
      <p>The ground is coloured by rainfall over the chosen window, ending at the frame on screen. <b>Loop</b> is
      this radar's own estimate, updated with every scan; <b>longer windows (up to 72 h)</b> come from NOAA MRMS,
      the NWS multi-radar analysis, adjusted to rain gauges when that version is ready (~1\u20132 h later). Colours: green under half an inch, yellow\u2013orange 0.5\u20132 in, red 2\u20134 in, magenta and
      purple above 4 in. Step through time and watch totals grow. Hover for the value.</p>
      <p><b>Flooding:</b> what matters is how much fell on one watershed and how fast. In Houston, follow the bayous:
      several inches in a few hours over Brays, White Oak or Cypress Creek is when they rise. Switch between 24 h (how wet the ground already is) and Loop
      (what is falling now). In Hawai\u02BBi, heavy rain
      on steep windward slopes runs off in minutes (flash floods and landslides). Keep the radar on Max: new heavy
      cells upstream of the same watershed are the warning sign.</p>
      <p><b>Limits:</b> radar rainfall is an estimate, often 30\u201350% off. It under-reads far from the radar and behind
      terrain, and can over-read in hail or the melting layer; MRMS is better, especially once gauge-corrected.
      Official flood warnings come from the NWS.</p>`},{id:"incoming",label:"What's coming? Showers & squalls",set:{field:"dbz",mode:1,thr:35,opacity:.5,vex:4,clip:"all",view:"focus",dock:null,play:!0},tip:`<p><b>Use:</b> timing a squall or shower band across your water.</p>
      <p>Surface at 35 dBZ shows the cores: the heavy rain, and where gusts come from. Loop it and
      follow one core. Its track and speed give the arrival time. In the Northwest, showers move
      with the 700\u2013500 hPa wind (see <i>Winds aloft</i>), commonly from the SW\u2013W at 20\u201340 kt.</p>
      <p><b>Gust clues:</b> a core that is tall and then collapses, or a bowed leading edge, pushes a
      gust front out ahead of the rain. The wind can shift and jump 10\u201325 kt minutes before the rain
      arrives, and radar rarely shows that gust front over water. Watch the sky and the water.</p>`},{id:"fog",label:"Fog & low stratus",set:{field:"dbz",mode:2,thr:15,opacity:1,vex:5,clip:"low",view:"whole-top",dock:null,metar:!0,sat:{on:!0,band:"fog",shape:0,flatKm:.5,opacity:.85,clear:!0}},tip:`<p><b>Use:</b> where is fog or low stratus, does it reach the water, and is it forming or burning off?
      Radar cannot see fog at all; this view is satellite + airport reports.</p>
      <p><b>What's on the map</b></p>
      <ul>
        <li><span style="color:#46e1cd">Teal</span>: likely fog or low stratus (satellite). Faint grey: other cloud.</li>
        <li>Coloured airport markers: visibility (miles) and ceiling (feet), with FG/BR (fog/mist) when reported.
          <span style="color:#4cd964">VFR</span> \xB7 <span style="color:#5fa8ff">MVFR</span> \xB7
          <span style="color:#ff5a4f">IFR</span> (under 3 mi or 1,000 ft) \xB7
          <span style="color:#e05cff">LIFR</span> (under 1 mi or 500 ft). Hover a marker for the full report.</li>
        <li>Radar shown as Max over the lowest 1.5 km: where it shows rain, that cloud is not fog.</li>
      </ul>
      <p><b>How to read it</b></p>
      <ol>
        <li>Find the teal areas. Do they hug the coast, the Strait, the Sound or the river valleys? Fog follows the water and low ground.</li>
        <li>Check the airports underneath. IFR/LIFR with FG or BR means the fog is on the surface. Teal overhead but VFR
          with a low ceiling (say 800\u20131,500 ft) means low stratus, with the base off the water.</li>
        <li>Step through time (arrow keys): watch the edges. Teal shrinking from the edges after sunrise means burn-off;
          teal pushing inland through the Strait or up Puget Sound means marine push (advection).</li>
        <li>Hover the teal for the index and, at night, the 10.3\u22123.9 \xB5m difference (+2 to +5 K is the fog signal).</li>
      </ol>
      <p><b>How the satellite test works:</b> at night, fog droplets emit less at 3.9 \xB5m than at 10.3 \xB5m. By day, fog is
      bright in the visible and its top is warm (near the surface temperature) and reflects sunlight at 3.9 \xB5m like water
      droplets do. The info line under Satellite says which test was used.</p>
      <p><b>Patterns here:</b> summer advection fog pouring in through the Strait from the cold ocean, often reaching
      Port Angeles to Admiralty Inlet by evening; fall and winter radiation fog in the South Sound, river valleys and
      around lakes on clear, calm nights, burning off late morning; marine stratus pushing down Puget Sound overnight.</p>
      <p><b>Limits:</b> satellite can't see fog under higher cloud. Near sunrise and sunset (twilight) the test is least
      reliable. Live mode has no visible image, so the daytime test is weaker there. Satellite can't tell fog from low
      stratus; the airports can, but only where there is one. Over open water, trust what you see.</p>`},{id:"lightning",label:"Lightning: how close, how active?",set:{field:"dbz",mode:1,thr:35,opacity:.5,vex:5,clip:"all",view:"focus",dock:null,play:!0,lightning:!0},tip:`<p><b>Use:</b> is lightning near my spot, and is the storm charging up or winding down?</p>
      <p>Flashes from the GOES-West Geostationary Lightning Mapper are drawn as marks: white-yellow for the
      newest, then orange, red for the oldest in the window. The badge at the top counts them within 10 and
      20 nm of the focus. Set the focus to where you are or where you're heading.</p>
      <p><b>Read with the radar:</b> flashes cluster over the tall 35\u201345 dBZ cores. Flashes that start or
      speed up mean a strengthening cell. Lightning can strike 10 nm or more ahead of the rain: if you
      can hear thunder, you are within range.</p>
      <p><b>Limits:</b> GLM sees light through cloud tops from space, with ~10 km pixels here. It misses some
      weak flashes, especially in the small, shallow storms typical of the Northwest, and doesn't
      separate cloud-to-ground from in-cloud. <i>No flashes shown is not an all-clear.</i> Live data
      arrives within about a minute.</p>`},{id:"cloudtops",label:"Clouds vs rain (satellite + radar, 3D)",set:{field:"dbz",mode:0,thr:20,opacity:.5,vex:5,clip:"all",view:"wide",dock:null,sat:{on:!0,shape:1,opacity:.7,band:"auto"}},tip:`<p><b>Use:</b> seeing the whole cloud, not just the part that is raining.</p>
      <p>GOES-18 imagery is draped at the estimated <b>cloud-top height</b> (from how cold the infrared sees
      the top), above the radar's rain. Where they match, a tall, cold top sits over a tall radar core: an
      active shower. A cold top with little radar echo under it is anvil or cirrus spreading downwind. Bright
      cloud with a <i>warm</i> top and no echo is low stratus or fog, which radar cannot see at all.</p>
      <p>Press <b>S</b> to flick the satellite on and off, use <b>Morph</b> to move between the flat image and
      the 3D tops, and hover over the image for cloud-top height and temperature.</p>
      <p><b>Limits:</b> heights assume a standard 6.5 \xB0C/km cooling with height: roughly \xB11\u20132 km for thick
      cloud, too low for thin cirrus, near zero for stratus under an inversion. Positions are corrected for
      the satellite's slanted view using those heights. Visible imagery is 0.5 km and daytime only (cases);
      infrared is 2 km, day and night, and is what live mode uses.</p>`},{id:"rotation",label:"Rotation / waterspout check",set:{field:"vel",mode:2,thr:0,opacity:1,vex:5,clip:"low",view:"top",dock:"across"},tip:`<p><b>Use:</b> is a shower spinning?</p>
      <p>Max of the lowest 1.5 km, all speeds shown, from above. Look for green and red touching
      <i>side by side across the beam</i> (not along it). The across-beam section cuts through it.
      Looking out from the radar, inbound (green) on the left and outbound (red) on the right means
      counter-clockwise (cyclonic) rotation; the other way round is clockwise.</p>
      <p><b>Limits:</b> waterspouts over Puget Sound are small and short-lived and live below the
      lowest beam (400+ m up at Shilshole). Radar shows the parent shower's rotation at best.
      A tall shower with a sharp edge, light winds and a cold airmass over warmer water is
      the classic set-up. Folding (aliasing) can fake a couplet in live mode: check that the
      colours make sense against the wind.</p>`},{id:"structure",label:"Storm structure: how tall, how strong?",set:{field:"dbz",mode:1,thr:20,opacity:.5,vex:6,clip:"all",view:"side",dock:"along"},tip:`<p><b>Use:</b> sizing up a cell before it reaches you.</p>
      <p>Side view, exaggerated 6\xD7. Echo tops above ~6 km in winter or ~9 km in summer mean a vigorous
      updraft (lightning, graupel, gusts). A 45+ dBZ core reaching well above the freezing level
      points to graupel or small hail. Short, flat echo is stratiform rain: steady, not gusty.</p>
      <p>Raise the threshold to 40\u201345 dBZ to see just the cores. Check the along-beam section: near
      the radar the tops are cut off by the cone of silence; far away the low levels are missed.</p>`},{id:"melting",label:"Melting level / snow level",set:{field:"rho",mode:0,thr:.95,opacity:.6,vex:6,clip:"all",view:"side",dock:"qvp"},tip:`<p><b>Use:</b> where snow turns to rain: snow level in the mountains, icing
      aloft, and why reflectivity has a bright ring around the radar.</p>
      <p>Wet, melting snowflakes lower the correlation coefficient and raise reflectivity. In steady
      rain this appears as a shell or ring in CC around the radar (every beam crosses the layer at
      a different range) and as a band in the QVP. The snow level on the slopes is usually ~300 m
      below the bright-band peak.</p>
      <p>Best in widespread rain and atmospheric rivers; patchy in showers.</p>`},{id:"nonmet",label:"Is it real? Clutter, birds, sea clutter, smoke",set:{field:"rho",mode:2,thr:.8,opacity:1,vex:5,clip:"low",view:"top",dock:null},tip:`<p><b>Use:</b> telling weather from things that aren't.</p>
      <p>CC below ~0.8 at low levels is almost never rain. Common here: ground clutter on hills,
      <b>sea clutter</b> and anomalous propagation when warm air over cold water bends the beam
      down to the waves (summer afternoons and fair-weather evenings), bird and insect "blooms"
      around sunset, and wildfire smoke plumes (low CC, streaky, and moving with the wind).</p>
      <p>If reflectivity shows echo over the water on a clear day, check here before believing it.</p>`},{id:"bigdrops",label:"Heavy rain & big drops",set:{field:"zdr",mode:1,thr:2,opacity:.5,vex:5,clip:"all",view:"focus",dock:null},tip:`<p><b>Use:</b> where the rain is heaviest and the drops biggest (visibility, sea-surface
      flattening).</p>
      <p>ZDR \u2265 2 dB means large, flattened drops, typical under shower cores and at the leading edge of
      cells. Big ZDR with modest reflectivity means a few large drops: an edge or a new cell. High
      reflectivity with near-zero ZDR in a core means graupel or hail rather than rain.</p>
      <p>A column of positive ZDR above the freezing level marks a strong updraft that is still growing.</p>`},{id:"windsaloft",label:"Winds aloft (VAD profile)",set:{field:"vel",mode:0,thr:10,opacity:.4,vex:5,clip:"all",view:"focus",dock:"winds",arrows:!0},tip:`<p><b>Use:</b> wind above the surface: the steering flow for showers, low-level jets that
      can mix down as gusts, fronts passing overhead.</p>
      <p>The VAD fits a sine wave to the radial velocity round a ring of gates. It gives <b>one average wind
      for a ring 16\u2013100 km across around the radar</b>, not the wind at your spot. Barbs are in knots.
      Arrows over the radar show the current frame's profile.</p>
      <p><b>Read:</b> winds veering (turning clockwise) with height mean warm advection, as ahead of
      a warm front. Backing (anticlockwise) means cold advection. Strong wind just above a shallow cool
      layer can reach the surface when showers or daytime heating mix it down.</p>
      <p>Heights show only where there is enough echo (rain, snow, insects) to fit.</p>`},{id:"mixing",label:"Vertical mixing & gusts (observed)",regions:["pnw","hawaii","houston"],guide:"mixing",set:{field:"vel",mode:0,thr:10,opacity:.4,vex:3,clip:"all",view:"whole-top",dock:"winds",arrows:!0,balloon:!0,metar:!0,seaair:!0},tip:`<p><b>Use:</b> how much of the wind aloft can reach the water now, from observations: is it a
      gusty, mixed day, or a smooth, stable one where the wind aloft stays aloft?</p>
      <p><b>Read Air \u2192 Vertical mixing (observed)</b>, one line: the strongest radar-measured (VAD) wind
      up to the balloon's mixed-layer top, the nearest airports' wind and <b>gust</b> (gust factor = gust \xF7
      mean), and sea minus air at the nearest tide station. The balloon line and the Skew-T (green band)
      give the mixed layer and the inversion that caps it. The dots on the map are sea minus air
      (red: sea warmer, unstable; blue: air warmer, stable).</p>
      <p><b>Rules of thumb:</b> sea warmer than the air, a deep mixed layer and strong wind aloft mean gusts
      well above the mean: reef early. Air warmer than the sea and a shallow mixed layer mean the surface
      wind is lighter than aloft, and it can arrive suddenly where the land funnels it (headlands, passes).</p>
      <p><b>Limits:</b> one balloon, twice a day, often 50&ndash;260 km away (on the Big Island the Hilo
      balloon when it flies; otherwise L\u012Bhu\u02BBe, ~260 km NW, which the balloon line says); the VAD needs
      echoes (patchy in clear air) and describes a ring round the radar; tide stations are harbour
      gauges, missing the tidal mixing in the passes. All observed: each value shows its source and age.</p>`},{id:"gapwinds",label:"Gap winds, fronts & convergence (velocity)",regions:["pnw"],set:{field:"vel",mode:2,thr:8,opacity:1,vex:5,clip:"low",view:"top",dock:"along"},tip:`<p><b>Use:</b> wind structure near the surface, as low as the radar can see.</p>
      <p>Strong, uniform flow through the Strait of Juan de Fuca (westerly) or out of the Fraser
      valley (NE outflow) shows as a broad block of one colour where the beam lines up with it.
      A <b>front or convergence line</b> is a sharp boundary where colours change <i>along</i> the beam.
      In the Puget Sound Convergence Zone, northerly flow down the Sound meets southerly flow, usually
      between Everett and Seattle.</p>
      <p>Remember: only the part of the wind along the beam is seen. A wind blowing across the beam
      reads zero (grey).</p>`},{id:"pscz",label:"Puget Sound Convergence Zone",regions:["pnw"],set:{field:"dbz",mode:2,thr:25,opacity:1,vex:5,clip:"low",view:"top",dock:null,play:!0},tip:`<p><b>Use:</b> the band of showers that forms when NW flow splits around the Olympics
      and rejoins over the Sound.</p>
      <p>Look for a narrow W\u2013E band, often King\u2013Snohomish county line, that stays in place or drifts
      north\u2013south while the rest of the region is showery or dry. Under it: heavy showers, gusty
      and shifting winds, sometimes thunder. Either side can be light winds. Switch to Velocity to see the
      two flows meeting.</p>`},{id:"blind",label:"Radar blind spots: terrain & beam height",set:{field:"dbz",mode:0,thr:20,opacity:.25,vex:5,clip:"all",view:"wide",dock:"along",terrain:!0,relief:"match",blockage:!0,surface:!0,hideVolume:!0},tip:`<p><b>Use:</b> knowing what the radar <i>cannot</i> tell you before trusting it.</p>
      <p>The shaded map shows beam blockage for the chosen tilt: yellow is partly blocked, red is
      mostly or fully blocked. The Olympics shadow the coast and western Strait, and the Cascades
      block the east. That's why KLGX was built on the coast. The cone is one tilt as the radar
      sweeps it; grey parts are blocked.</p>
      <p>Aim the beam (Beam &amp; sweep) along your route and read the along-beam section: the red
      line is how high the lowest beam's bottom edge is. Everything under it is invisible:
      fog, low stratus, drizzle from shallow cloud, and the surface wind.</p>`},{id:"stratiform",label:"Steady rain / atmospheric river",set:{field:"dbz",mode:0,thr:15,opacity:.35,vex:6,clip:"all",view:"side",dock:"qvp"},tip:`<p><b>Use:</b> long rain events: how deep, how heavy, how the snow level changes.</p>
      <p>Widespread 20\u201335 dBZ with a bright band. Watch the QVP over hours: a rising bright band means
      warming (snow level up, more runoff), a falling one means the cold air is arriving. Heavier rain
      against the Olympics and Cascades is orographic lift; look for higher reflectivity on the
      windward slopes. The radar under-reads here where the beam is blocked.</p>`}],t=`<p>Pick a situation above. It sets the field, render mode, thresholds, view and analysis
  panel for that question and explains what to look for here. Everything stays adjustable afterwards.</p>`;export{e as PRESETS,t as PRESET_INTRO};
