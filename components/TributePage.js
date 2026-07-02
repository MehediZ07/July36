'use client';

import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function TributePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const thread = document.getElementById('thread');
    const dayNow = document.getElementById('dayNow');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.12 }
    );

    const barIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar-fill').forEach((bar) => {
              bar.style.width = `${bar.dataset.w}%`;
            });
            barIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      if (thread) thread.style.width = `${pct}%`;
      if (dayNow) {
        const day = Math.min(36, Math.max(1, Math.round((pct / 100) * 36)));
        dayNow.textContent = String(day).padStart(2, '0');
      }
    };

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    document.querySelectorAll('.bars').forEach((el) => barIo.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const svg = document.getElementById('rainSvg');
    if (svg) {
      const ns = 'http://www.w3.org/2000/svg';
      svg.setAttribute('viewBox', '0 0 1000 600');
      svg.setAttribute('preserveAspectRatio', 'none');
      for (let i = 0; i < 70; i += 1) {
        const x = Math.random() * 1000;
        const len = 20 + Math.random() * 40;
        const line = document.createElementNS(ns, 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', '-20');
        line.setAttribute('x2', x - 8);
        line.setAttribute('y2', len - 20);
        line.setAttribute('stroke', 'rgba(236,230,216,0.35)');
        line.setAttribute('stroke-width', '1');
        const dur = `${(1 + Math.random() * 1.4).toFixed(2)}s`;
        const delay = `${(Math.random() * 3).toFixed(2)}s`;
        line.style.animation = `fall ${dur} linear infinite`;
        line.style.animationDelay = delay;
        svg.appendChild(line);
      }
      const style = document.createElement('style');
      style.textContent = '@keyframes fall{ from{ transform:translateY(-20px);} to{ transform:translateY(640px);} }';
      document.head.appendChild(style);
    }

    const canvas = document.getElementById('staticCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
      };
      resize();
      window.addEventListener('resize', resize);
      let visible = false;
      const canvasObserver = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? false;
        },
        { threshold: 0.1 }
      );
      canvasObserver.observe(canvas);
      const draw = () => {
        if (visible && ctx) {
          const w = canvas.width;
          const h = canvas.height;
          const imgData = ctx.createImageData(w, h);
          for (let i = 0; i < imgData.data.length; i += 4) {
            const v = Math.random() * 60;
            imgData.data[i] = v;
            imgData.data[i + 1] = v;
            imgData.data[i + 2] = v;
            imgData.data[i + 3] = 255;
          }
          ctx.putImageData(imgData, 0, 0);
          ctx.fillStyle = 'rgba(200,29,37,0.03)';
          ctx.fillRect(0, 0, w, h);
        }
        requestAnimationFrame(draw);
      };
      draw();
    }

    const grid = document.getElementById('avatarGrid');
    if (grid) {
      const ns = 'http://www.w3.org/2000/svg';
      for (let i = 0; i < 24; i += 1) {
        const wrap = document.createElement('div');
        wrap.className = 'avatar';
        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 64 64');
        const isRed = Math.random() > 0.22;
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', '32');
        circle.setAttribute('cy', '32');
        circle.setAttribute('r', '32');
        circle.setAttribute('fill', isRed ? '#c81d25' : '#151815');
        svg.appendChild(circle);
        if (!isRed) {
          const c2 = document.createElementNS(ns, 'circle');
          c2.setAttribute('cx', '32');
          c2.setAttribute('cy', '32');
          c2.setAttribute('r', '30');
          c2.setAttribute('fill', 'none');
          c2.setAttribute('stroke', '#2a2e2a');
          c2.setAttribute('stroke-width', '2');
          svg.appendChild(c2);
        }
        wrap.appendChild(svg);
        grid.appendChild(wrap);
      }
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div className="grain" />
      <div id="thread" />
      <div className={`glass-nav${menuOpen ? ' open' : ''}`}>
        <div className="glass-nav-logo">
          <img src="/logo.png" alt="July36 logo" />
        </div>
        <button
          type="button"
          className="glass-nav-toggle"
          onClick={() => setMenuOpen((state) => !state)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
        </button>
        <div className="glass-nav-links">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#origins" onClick={() => setMenuOpen(false)}>Origins</a>
          <a href="#timeline" onClick={() => setMenuOpen(false)}>Timeline</a>
          <a href="#blackout" onClick={() => setMenuOpen(false)}>Blackout</a>
          <a href="#numbers" onClick={() => setMenuOpen(false)}>Numbers</a>
          <a href="#signature" onClick={() => setMenuOpen(false)}>Signature</a>
          <a href="#names" onClick={() => setMenuOpen(false)}>Names</a>
          <a href="#aftermath" onClick={() => setMenuOpen(false)}>Aftermath</a>
        </div>
      </div>
      <div className="daycount mono">DAY <b id="dayNow">01</b> / 36</div>

      <div className="hero" id="home">
        <svg className="hero-rain" id="rainSvg" xmlns="http://www.w3.org/2000/svg" />
        <div className="hero-eyebrow mono">
          <img className="flag-chip" src="/Bangladesh-flag.png" srcSet="https://flagcdn.com/w80/bd.png 2x" alt="Flag of Bangladesh" />
          DHAKA · 1 JULY — 5 AUGUST 2024
        </div>
        <h1 className="hero-title">36 Days<br />That <span className="red">Broke</span><br />the Silence</h1>
        <div className="hero-bn bn">৩৬ দিনের জুলাই অভ্যুত্থান</div>
        <p className="hero-sub">A chronicle of the July Uprising — how a court ruling on civil-service hiring quotas grew, over five weeks of protest, crackdown and blackout, into the mass movement that ended a fifteen-year government.</p>
        <div className="hero-meta">
          <div>Movement began<b>1 Jul 2024</b></div>
          <div>Government fell<b>5 Aug 2024</b></div>
          <div>UN-documented deaths<b>400+</b></div>
          <div>Internet blackout<b>~10 days</b></div>
        </div>
        <div className="scroll-cue">SCROLL — কোটা না মেধা</div>
      </div>

      <section className="paper pad" id="origins">
        <div className="two-col reveal">
          <div>
            <div className="eyebrow">Before July · কোটা প্রথা</div>
            <h2 className="section-title">A hiring quota, revived by a court</h2>
            <p className="lede">The spark was procedural. The fire was decades in the making.</p>
          </div>
          <div className="body-text">
            <p>Since 1972, Bangladesh had reserved a large share of civil-service jobs for specific groups, most notably a 30% quota for children and grandchildren of veterans of the 1971 Liberation War. In a country with chronic graduate unemployment, students had challenged the system before — in 2013 and again in 2018, when mass protests pushed the government to scrap it almost entirely.</p>
            <p>On <strong>5 June 2024</strong>, the High Court reinstated the 2018 quota system, ruling the government's cancellation of it invalid. To students who had spent years preparing for a shrinking pool of merit-based posts, it read as the reversal of a hard-won reform — and reopened a grievance that had never really closed.</p>
            <div className="quota-bar">
              <div className="quota-seg q1">56% MERIT</div>
              <div className="quota-seg q2">30% WAR VETERANS' DESCENDANTS</div>
              <div className="quota-seg q3">10% DISTRICT</div>
              <div className="quota-seg q4" />
            </div>
            <div className="quota-legend mono">
              <span><i style={{ background: 'var(--gold)' }} />Merit</span>
              <span><i style={{ background: 'var(--moss)' }} />Freedom fighters' descendants</span>
              <span><i style={{ background: 'var(--monsoon)' }} />District quota</span>
              <span><i style={{ background: 'var(--wall-2)' }} />Women / minorities / disabled</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dark wall-texture" id="timeline">
        <div className="timeline-wrap">
          <div className="timeline-head reveal">
            <div className="eyebrow">The 36 days · জুলাই অভ্যুত্থানের সময়রেখা</div>
            <h2 className="section-title">From blockade to uprising</h2>
            <p className="lede">A movement that began with sit-ins on university lawns and ended with a prime minister's helicopter leaving the capital.</p>
          </div>

          <div className="spine" />

          <div className="day reveal">
            <div className="day-date">1–8 JULY</div>
            <div className="day-title">Bangla Blockade<span className="bn">বাংলা ব্লকেড</span></div>
            <div className="day-body">Students under the new banner <strong>Students Against Discrimination</strong> block major roads, rail lines and highways nationwide. The protest is peaceful, campus-based, and framed narrowly around quota reform: "Quota na medha, medha medha" — quota or merit, merit, merit.</div>
          </div>

          <div className="day reveal">
            <div className="day-date">10–14 JULY</div>
            <div className="day-title">A pause, a reprieve, a provocation</div>
            <div className="day-body">The Appellate Division suspends the quota reinstatement for four weeks, easing tension briefly. Then, at a press conference on 14 July, Sheikh Hasina responds to a question about the quota with a remark widely heard as comparing protesters to "Razakars" — wartime collaborators, one of the gravest insults in Bangladeshi political language. Campuses erupt within hours.</div>
            <div className="day-tag">Turning point</div>
          </div>

          <div className="day peak reveal">
            <div className="day-date">15–16 JULY</div>
            <div className="day-title">The first blood<span className="bn">প্রথম রক্ত</span></div>
            <div className="day-body">On 15 July, activists of the ruling party's student wing, Bangladesh Chhatra League, attack protesters at Dhaka University. The next day, <strong>Abu Sayed</strong>, a student in Rangpur, is shot dead by police as he stands with arms spread, unarmed, in front of advancing officers — captured on video that spreads nationwide within hours. Five more protesters are killed the same day. The government shuts all schools and universities indefinitely.</div>
            <div className="day-tag">Abu Sayed killed</div>
          </div>

          <div className="day peak reveal">
            <div className="day-date">18–19 JULY</div>
            <div className="day-title">Curfew, army, blackout</div>
            <div className="day-body"><strong>Mugdho</strong>, a young volunteer distributing water and biscuits to protesters, is shot dead in Dhaka on 18 July — his death, like Abu Sayed's, becomes a symbol of the movement. That evening the government cuts mobile internet nationwide; broadband follows within a day. A nationwide curfew is declared and the army is deployed. 19 July becomes the single deadliest day of the month, with dozens of reported deaths as security forces and ruling-party activists confront protesters in multiple cities.</div>
            <div className="day-tag">Total blackout begins</div>
          </div>

          <div className="day reveal">
            <div className="day-date">21 JULY</div>
            <div className="day-title">The court finally rules</div>
            <div className="day-body">With the country under curfew, the Appellate Division overhauls the quota system: 93% of civil-service posts by merit, 5% for freedom fighters' descendants, the remainder split among ethnic minorities, third-gender and disabled applicants. The original demand is essentially met — but by now the movement is no longer about quotas.</div>
          </div>

          <div className="day reveal">
            <div className="day-date">30 JULY</div>
            <div className="day-title">Red, not black<span className="bn">কালো নয়, লাল</span></div>
            <div className="day-body">The government declares a national day of mourning for those killed. Ruling-party supporters change their social media profile pictures to black. Across the country, students and ordinary citizens instead turn theirs red — a deliberate, leaderless rejection of official grief, and a demand for accountability rather than ceremony.</div>
          </div>

          <div className="day peak reveal">
            <div className="day-date">3–4 AUGUST</div>
            <div className="day-title">One demand: resignation</div>
            <div className="day-body">At Shaheed Minar on 3 August, coordinator Nahid Islam announces the movement's single remaining demand — the resignation of Sheikh Hasina and her cabinet — and calls for a nationwide non-cooperation movement from 4 August. That day brings some of the worst violence of the uprising, with well over a hundred deaths reported across the country as clashes spread beyond the capital.</div>
            <div className="day-tag">One-point demand</div>
          </div>

          <div className="day peak reveal">
            <div className="day-date">5 AUGUST</div>
            <div className="day-title">The Long March to Dhaka<span className="bn">ঢাকা অভিমুখে লংমার্চ</span></div>
            <div className="day-body">Defying a nationwide curfew, hundreds of thousands converge on the capital. By early afternoon, Sheikh Hasina resigns and leaves the country by military helicopter with her sister, ending fifteen years in power. Crowds enter the prime minister's official residence, Ganabhaban, within hours. An interim government forms days later under Nobel laureate <strong>Muhammad Yunus</strong>.</div>
            <div className="day-tag">Government falls</div>
          </div>
        </div>
      </section>

      <section className="blackout" id="blackout">
        <div className="blackout-grid">
          <div className="reveal">
            <div className="eyebrow">The blackout · ব্ল্যাকআউট</div>
            <h2 className="section-title">A country switched off</h2>
            <p className="lede">For nearly ten days, Bangladesh's 170 million people were cut off from the open internet — and from each other.</p>
            <div className="body-text" style={{ marginTop: '1.6rem' }}>
              <p>Mobile data went first, on the evening of 18 July. Broadband followed. Facebook, WhatsApp and other platforms stayed restricted even after connections partially returned, reopening fully only in early August. Hospitals were reportedly barred from disclosing casualty figures; foreign journalists struggled to verify events on the ground.</p>
              <p>The UN human rights office later noted that the blackout itself made an accurate death toll impossible to establish — the documented figures below are described by investigators as <strong>likely undercounts</strong>.</p>
            </div>
          </div>
          <div className="static-box reveal">
            <canvas id="staticCanvas" />
            <div className="static-caption mono">NO SIGNAL · 18 JUL – 28 JUL 2024 · MOBILE + BROADBAND RESTRICTED</div>
          </div>
        </div>
      </section>

      <section className="paper pad" id="numbers">
        <div className="numbers-section-grid">
          <div>
			<div className="reveal">
        	  <div className="eyebrow">By the numbers · পরিসংখ্যান</div>
        	  <h2 className="section-title">What the count can tell us</h2>
        	  <p className="lede">Every figure below is contested to some degree — a direct consequence of the blackout and curfew. They are presented with their sources, not as a final tally.</p>
        	</div>
            <div className="numbers-grid reveal">
              <div className="num-cell">
                <div className="num-value">400+</div>
                <div className="num-label">Deaths documented by the UN Human Rights Office, 16 Jul – 4 Aug 2024</div>
              </div>
              <div className="num-cell">
                <div className="num-value">600+</div>
                <div className="num-label">Deaths reported in media &amp; movement tallies, 16 Jul – 11 Aug, per the same UN analysis</div>
              </div>
              <div className="num-cell">
                <div className="num-value">1,000+</div>
                <div className="num-label">Total killed since July, per Bangladesh's health ministry, late August 2024</div>
              </div>
              <div className="num-cell">
                <div className="num-value">6,700+</div>
                <div className="num-label">Reported injured over the course of the movement</div>
              </div>
              <div className="num-cell">
                <div className="num-value">32+</div>
                <div className="num-label">Children among the dead, per UNICEF's concern statement</div>
              </div>
              <div className="num-cell">
                <div className="num-value">~10</div>
                <div className="num-label">Days of near-total internet blackout nationwide</div>
              </div>
            </div>

            <div className="bars reveal">
              <div className="eyebrow numbers-bar-eyebrow">Reported deaths by date — selected days</div>
              <div className="bar-row"><div className="lbl">16 Jul</div><div className="bar-track"><div className="bar-fill" data-w="8" /></div><div className="val">6</div></div>
              <div className="bar-row"><div className="lbl">18 Jul</div><div className="bar-track"><div className="bar-fill" data-w="43" /></div><div className="val">32</div></div>
              <div className="bar-row"><div className="lbl">19 Jul</div><div className="bar-track"><div className="bar-fill" data-w="100" /></div><div className="val">75</div></div>
              <div className="bar-row"><div className="lbl">4 Aug</div><div className="bar-track"><div className="bar-fill" data-w="95" /></div><div className="val">~100+</div></div>
              <div className="bar-row"><div className="lbl">5 Aug</div><div className="bar-track"><div className="bar-fill" data-w="60" /></div><div className="val">~40+</div></div>
              <p className="numbers-bar-note">Figures compiled from contemporaneous reporting (Prothom Alo, The Daily Star, Reuters) and the UN OHCHR preliminary analysis. Undercounting is likely for every date shown.</p>
            </div>
          </div>

          <div className="reveal sticky-panel">
            <figure className="numbers-sidebar-figure">
              <img
                src="/July36-map.png"
                alt="Map of Bangladesh showing reported death tolls by district during the 2024 uprising"
                loading="lazy"
                decoding="async"
                className="numbers-sidebar-image"
              />
            </figure>
            <p className="numbers-sidebar-note">
              Reported deaths by district, compiled independently on <a href="https://commons.wikimedia.org/wiki/File:2024_Bangladesh_Quota_Reform_Movement_death_tolls_by_district_(en).svg" target="_blank" rel="noopener">Wikimedia Commons</a>, CC BY-SA 4.0 — a separate tally from the figures above, included to show the geographic spread.
            </p>
          </div>
        </div>
      </section>

      <section className="mourning" id="signature">
        <div className="eyebrow reveal">The signature gesture</div>
        <h2 className="section-title reveal" style={{ margin: '0 auto', textAlign: 'center' }}>A red square,<br />instead of black</h2>
        <div className="mourning-grid reveal" id="avatarGrid" />
        <p className="mourning-note reveal">When the state called for mourning, ordinary Bangladeshis improvised their own symbol — no leader announced it, no organisation coordinated it. It simply spread, account by account, until red became the color of the uprising.</p>
      </section>

      <section className="dark wall-texture pad" id="names">
        <div className="reveal">
          <div className="eyebrow">The names that moved a nation · শহীদদের স্মরণে</div>
          <h2 className="section-title">Not statistics</h2>
          <p className="lede">Two deaths, more than any single ruling or speech, are widely credited with turning a campus protest into a national uprising.</p>
        </div>
        <div className="names-grid reveal">
          <div className="name-card">
            <svg className="name-flame" viewBox="0 0 24 34" fill="none"><path d="M12 2C12 2 6 10 6 18C6 24 9 28 12 28C15 28 18 24 18 18C18 10 12 2 12 2Z" fill="#d8a13a" opacity="0.9" /><path d="M12 12C12 12 9 17 9 21C9 24 10.5 26 12 26C13.5 26 15 24 15 21C15 17 12 12 12 12Z" fill="#c81d25" /></svg>
            <div className="name-title">Abu Sayed</div>
            <div className="name-bn bn">আবু সাঈদ</div>
            <div className="name-desc">A student of English at Begum Rokeya University, Rangpur. Killed by police gunfire on 16 July while standing his ground, unarmed, in front of the line — a moment captured on video and shared nationwide within hours.</div>
            <div className="name-date">16 July 2024</div>
          </div>
          <div className="name-card">
            <svg className="name-flame" viewBox="0 0 24 34" fill="none"><path d="M12 2C12 2 6 10 6 18C6 24 9 28 12 28C15 28 18 24 18 18C18 10 12 2 12 2Z" fill="#d8a13a" opacity="0.9" /><path d="M12 12C12 12 9 17 9 21C9 24 10.5 26 12 26C13.5 26 15 24 15 21C15 17 12 12 12 12Z" fill="#c81d25" /></svg>
            <div className="name-title">Mugdho</div>
            <div className="name-bn bn">মীর মাহফুজুর রহমান মুগ্ধ</div>
            <div className="name-desc">A freelancer and volunteer known for photographs of him handing out water and biscuits to protesters and police alike. Shot dead in Dhaka while doing exactly that.</div>
            <div className="name-date">18 July 2024</div>
          </div>
          <div className="name-card">
            <svg className="name-flame" viewBox="0 0 24 34" fill="none"><path d="M12 2C12 2 6 10 6 18C6 24 9 28 12 28C15 28 18 24 18 18C18 10 12 2 12 2Z" fill="#d8a13a" opacity="0.9" /><path d="M12 12C12 12 9 17 9 21C9 24 10.5 26 12 26C13.5 26 15 24 15 21C15 17 12 12 12 12Z" fill="#c81d25" /></svg>
            <div className="name-title">Golam Nafiz</div>
            <div className="name-bn bn">গোলাম নাফিজ</div>
            <div className="name-desc">A teenage student activist killed on 4 August during the non-cooperation movement, in the final and deadliest phase before Sheikh Hasina's resignation.</div>
            <div className="name-date">4 August 2024</div>
          </div>
        </div>

        <div className="quote-block reveal">
          <p>"Why did they shoot my son? He wasn't attacking anyone. Is it a crime to seek a job?"</p>
          <cite>Monowara Begum, mother of Abu Sayed</cite>
        </div>
      </section>

      <section className="aftermath" id="aftermath">
        <div className="two-col reveal">
          <div>
            <div className="eyebrow">Afterward · পরবর্তী</div>
            <h2 className="section-title">A government falls, a country rebuilds</h2>
          </div>
          <div className="body-text">
            <p>Sheikh Hasina's Awami League had governed Bangladesh for fifteen consecutive years. On 5 August 2024, she resigned and flew to India, where she has remained since; her whereabouts and political future are still disputed inside Bangladesh.</p>
            <p>An interim government led by economist and Nobel Peace laureate <strong>Muhammad Yunus</strong> took office days later, tasked with stabilising the country and preparing for fresh elections. The organisers of the protest movement, largely unknown outside student politics before June 2024, became central figures in the country's transitional politics.</p>
            <p>Every year on 16 July — the date Abu Sayed was killed — Bangladesh now observes <strong>July Martyrs' Day</strong>.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <h4>About this piece</h4>
            <p>Built as an independent, non-partisan chronicle of the July Uprising, drawing on Wikipedia's timeline articles, contemporaneous reporting from The Daily Star and Prothom Alo, and the UN Human Rights Office's preliminary analysis of the protests. Casualty figures vary by source and date of reporting; ranges are shown deliberately rather than a single number.</p>
          </div>
          <div>
            <h4>Read further</h4>
            <ul>
              <li><a href="https://en.wikipedia.org/wiki/July_Revolution_(Bangladesh)" target="_blank" rel="noopener">July Revolution — Wikipedia</a></li>
              <li><a href="https://www.ohchr.org" target="_blank" rel="noopener">OHCHR preliminary report</a></li>
              <li><a href="https://commons.wikimedia.org/wiki/Category:2024_Bangladesh_quota_reform_movement" target="_blank" rel="noopener">Photos on Wikimedia Commons</a></li>
            </ul>
          </div>
          <div>
            <h4>Note on images</h4>
            <p>This page uses original illustration and typography rather than sourced press photographs, to keep it fully rights-clean as a standalone file. Freely licensed photojournalism from the uprising is available via the Wikimedia Commons link above.</p>
          </div>
        </div>
        <div className="foot-bottom">
          <span>জুলাই অভ্যুত্থান, ২০২৪ — Built for remembrance, not for any political side.</span>
          <span>Sources compiled July 2026</span>
        </div>
      </footer>
    </>
  );
}
