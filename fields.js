var g=Object.defineProperty;var t=(e,a)=>g(e,"name",{value:a,configurable:!0});const l=t(e=>Math.max(0,Math.min(1,e)),"clamp01"),w={dbz:{stops:[[-20,"#1a1a2e"],[0,"#3b4a6b"],[5,"#04e9e7"],[10,"#019ff4"],[15,"#0300f4"],[20,"#02fd02"],[25,"#01c501"],[30,"#008e00"],[35,"#fdf802"],[40,"#e5bc00"],[45,"#fd9500"],[50,"#fd0000"],[55,"#d40000"],[60,"#bc0000"],[65,"#f800fd"],[70,"#9854c6"],[80,"#ffffff"]],show:"above",thr:20,thrRange:[-10,60],step:1,strength:t((e,a)=>l((e-a)/Math.max(5,60-a)),"strength"),learn:`
      <p><b>Reflectivity</b> is how much of the pulse comes back. It scales with drop
      diameter to the <i>sixth</i> power, so a few big drops outweigh a cloud of small ones.
      Rough guide: 20 dBZ light rain, 35 moderate, 45+ heavy shower rain or graupel.</p>
      <p>In 3D, read the <b>shape</b>: a tall, narrow core is convection (a shower with an
      updraft); a flat sheet with a brighter layer near 1&ndash;2 km is stratiform rain with a
      melting-layer <i>bright band</i>.</p>
      <p>A waterspout is tens of metres wide. The beam here is ~900 m wide, so the radar never
      sees the spout itself. It sees the parent shower: how tall, how intense, how it moves.</p>`},vel:{stops:[[-50,"#ff00ff"],[-35,"#003d1a"],[-25,"#006b2b"],[-15,"#00a846"],[-8,"#5fd48a"],[-2,"#9fbfa8"],[0,"#8c8c8c"],[2,"#c9a0a0"],[8,"#e36464"],[15,"#d11a1a"],[25,"#8f0000"],[35,"#4d0000"],[50,"#ffff00"]],show:"abs",thr:8,thrRange:[0,40],step:1,strength:t((e,a)=>l((Math.abs(e)-a)/Math.max(5,35-a)),"strength"),learn:`
      <p><b>Radial velocity</b> is only the part of the wind blowing <span style="color:#3fcf7a">toward
      KATX (green, negative)</span> or <span style="color:#ff6b6b">away (red, positive)</span>.
      Wind crossing the beam at right angles reads zero, so a uniform wind looks like a
      green half and a red half with a grey line between.</p>
      <p><b>Rotation</b> shows as a tight green&ndash;red pair side by side <i>across</i> the beam
      (a couplet). <b>Convergence</b> is a pair lined up <i>along</i> the beam.</p>
      <p>These winds are unfolded ("dealiased") with Py-ART. The low tilts fold at 25 m/s, so
      an isolated patch of the wrong colour may be a dealiasing error rather than real wind.</p>`},zdr:{stops:[[-2,"#3a2a5a"],[-.5,"#6b6b8a"],[0,"#9a9a9a"],[.5,"#5a8fd6"],[1,"#2a6fdb"],[1.5,"#1fbf9f"],[2,"#3ad13a"],[2.5,"#d8e030"],[3,"#f2b705"],[4,"#f25c05"],[5,"#d60f3b"],[6,"#ff5ce1"]],show:"above",thr:1.5,thrRange:[-1,5],step:.1,strength:t((e,a)=>l((e-a)/Math.max(.5,4.5-a)),"strength"),learn:`
      <p><b>Differential reflectivity</b> compares horizontal and vertical returns. Big raindrops
      fall flattened like hamburger buns, so they read +2 to +4 dB. Tumbling hail, graupel and
      dry snow look round on average and read near 0.</p>
      <p>A <b>ZDR column</b>, a finger of positive ZDR poking <i>above</i> the freezing level,
      means an updraft strong enough to carry liquid drops up into cold air. It's one of the
      best signs of an active, growing shower.</p>`},rho:{stops:[[.5,"#2b0f4c"],[.7,"#5b2a86"],[.8,"#2c5fd1"],[.85,"#1fa6c4"],[.9,"#35c46a"],[.93,"#c8d62b"],[.96,"#f2a007"],[.98,"#e34b0e"],[1,"#b30f2e"],[1.05,"#ffd1e8"]],show:"below",thr:.93,thrRange:[.6,1],step:.005,strength:t((e,a)=>l((a-e)/Math.max(.05,a-.6)),"strength"),learn:`
      <p><b>Correlation coefficient</b> measures how alike the targets in the beam are. Pure
      rain or pure snow is very uniform (above 0.97). A <b>mix</b> (wet melting snow, rain
      with hail) drops to about 0.85&ndash;0.95. Non-weather targets (birds, insects, sea or
      ground clutter, smoke, tornado debris) fall below about 0.8.</p>
      <p>This view shows only the <i>low</i> values. In showery or stratiform rain the melting
      layer appears as a ring-shaped shell around the radar: every beam passes through it at a
      different range. The height of that shell is the height of the freezing level.</p>`},src:{stops:[[1,"#4f9dff"],[1.5,"#4f9dff"],[1.51,"#ff9f43"],[2.5,"#ff9f43"],[2.51,"#3ce07a"],[3.5,"#3ce07a"],[4,"#3ce07a"]],show:"above",thr:1,thrRange:[1,3],step:1,strength:t(()=>.35,"strength"),learn:`
      <p><b>Source radar</b> (merged view only): which radar each point is taken from.
      <span style="color:#4f9dff">Blue: the first radar</span>, <span style="color:#ff9f43">orange: the second</span>,
      <span style="color:#3ce07a">green: a third</span> (names on the key). The notes below are for KATX + KLGX.</p>
      <p>Each point goes to the radar with the best view of it: among radars whose beam passes through
      the point and is less than half blocked by terrain, the nearest (a nearer beam is lower and
      narrower). It is geometry only, so it doesn't change with the weather.</p>
      <p>Low down (use the Low levels cutaway), KATX owns everything within about 70 km of Camano Island.
      KLGX owns the coast and the ocean and, from about 1 km up, the western Strait entrance. Near the
      surface the central Strait and much of Vancouver Island belong to <i>neither</i>: both radars'
      lowest beams pass over it. Higher up, where neither is blocked, the boundary is simply the line
      halfway between them. The holes over each radar are its cone of silence. <b>Velocity</b> changes meaning across that boundary: each
      point's colour is motion toward or away from <i>its</i> radar.</p>`}},v=`
  <p><b>The empty spaces are real.</b> Each voxel is traced back along the beam, and only
  voxels a beam actually passed through are drawn.</p>
  <ul>
    <li><b>Under the lowest tilt:</b> the 0.5&deg; beam climbs with range (and the Earth
    curves away), so the radar is blind to the lowest few hundred metres over most water.</li>
    <li><b>Cone of silence:</b> the empty funnel above KATX, higher than the top tilt.</li>
    <li><b>Top tilt:</b> this scan pattern (VCP 215) tops out at 10&ndash;12&deg;. AVSET skips
    the high tilts when no storm is tall enough to need them.</li>
  </ul>`;function d(e){const a=parseInt(e.slice(1),16);return[a>>16&255,a>>8&255,a&255]}t(d,"hexToRgb");function m(e,a){if(a<=e[0][0])return d(e[0][1]);for(let o=1;o<e.length;o++)if(a<=e[o][0]){const[n,i]=e[o-1],[s,r]=e[o],f=(a-n)/(s-n),c=d(i),p=d(r);return c.map((h,b)=>Math.round(h+(p[b]-h)*f))}return d(e[e.length-1][1])}t(m,"colorAt");function k(e,a,o,n){const i=new Uint8Array(1024);for(let s=1;s<256;s++){const r=e.lo+(s-1)/254*(e.hi-e.lo),f=a.show==="above"?r>=o:a.show==="below"?r<=o:Math.abs(r)>=o,[c,p,h]=m(a.stops,r),b=f?n*(.12+.88*a.strength(r,o)):0;i.set([c,p,h,Math.round(255*Math.min(1,b))],s*4)}return i}t(k,"transferTable"),w.srv={...w.vel,learn:`
    <p><b>Storm-relative velocity (SRV)</b> is radial velocity with the storm's motion subtracted.
    A shower moving at 25 kt paints everything ahead of it outbound and behind it inbound, which
    hides small circulations. Take that motion away and a rotating updraft stands out as a tight
    <span style="color:#3fcf7a">inbound</span> / <span style="color:#e36464">outbound</span> pair
    side by side, across the beam.</p>
    <p>Storm motion is by default the mean wind 1&ndash;6 km up from the radar's own VAD profile
    (showers mostly move with it); set it by hand when a cell moves differently (right-movers,
    cells on a boundary). Only the part of the motion along the beam is removed, so SRV is best
    read near the radar's low tilts.</p>
    <p>For a waterspout, look for a small couplet (a few km or less) under the shower base; the
    radar beam is too wide to see the spout itself.</p>`};const u=[[10,"#9c9c9c"],[20,"#6e6e6e"],[30,"#f3b4ff"],[40,"#6ab6ff"],[50,"#3d6dff"],[60,"#6ce06c"],[70,"#1d9a1d"],[80,"#ffff66"],[90,"#e3a62a"],[100,"#ff4040"],[110,"#b3001b"],[120,"#6a0010"],[140,"#c8c8e8"],[150,"#7a3fbf"]];w.hca={stops:u.flatMap(([e,a])=>[[e-4.9,a],[e+4.9,a]]),show:"above",thr:25,thrRange:[5,155],step:10,strength:t(()=>.85,"strength"),learn:`
    <p><b>Hydrometeor classification</b> is the NWS radar software's call on <i>what</i> each echo is,
    from reflectivity, ZDR, correlation coefficient, KDP and the melting level together:
    <span style="color:#6ce06c">rain</span>, <span style="color:#1d9a1d">heavy rain</span>,
    <span style="color:#ffff66">big drops</span>, <span style="color:#e3a62a">graupel</span>,
    <span style="color:#ff4040">hail</span>, <span style="color:#6ab6ff">dry</span> /
    <span style="color:#3d6dff">wet snow</span>, <span style="color:#f3b4ff">ice crystals</span>,
    and non-weather: <span style="color:#9c9c9c">birds and insects</span>,
    <span style="color:#b0b0b0">ground clutter</span>. Birds and clutter are hidden until you lower
    the threshold.</p>
    <p>It covers the four lowest tilts only, so it lives in a thin layer that rises with distance
    from the radar. A band of wet snow over rain is the melting layer from above; graupel in a
    shower's core means strong updrafts (and lightning is likely).</p>
    <p>It is an algorithm's best guess: near the melting level and at long range it errs, and it
    cannot see below the lowest beam.</p>`};export{w as FIELD_STYLE,v as HOLES_TEXT,m as colorAt,k as transferTable};
