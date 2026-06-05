/* Live renderer for the animate-text catalog.
   Faithfully reproduces the four showcase renderers from the skill's JSON recipes:
   generic-stagger, shared-slide-opacity-stage, kinetic-center-build, kinetic-top-build.
   Each property comes from the bundled effect data — nothing is hard-coded per effect. */

const EFFECTS = window.ANIMATE_TEXT_EFFECTS || [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const mix = (a, b, t) => a + (b - a) * t;

// Materialize a single frame ({opacity,x_px,y_px,blur_px,scale}) into inline styles.
function applyFrame(el, f, ytm) {
  const x = f.x_px || 0;
  const y = (f.y_px || 0) * ytm;
  const s = f.scale == null ? 1 : f.scale;
  el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s})`;
  el.style.filter = f.blur_px ? `blur(${f.blur_px}px)` : "none";
  el.style.opacity = f.opacity == null ? 1 : f.opacity;
}

// ---- text splitting per target ----
function splitUnits(text, target) {
  // returns [{text, animated}]
  if (target === "whole") return [{ text, animated: true }];
  if (target === "per-character")
    return Array.from(text).map((ch) => ({ text: ch, animated: true }));
  if (target === "per-word")
    return (text.match(/(\S+|\s+)/g) || []).map((t) => ({
      text: t,
      animated: /\S/.test(t),
    }));
  if (target === "per-line")
    return text.split("\n").map((t) => ({ text: t, animated: true, line: true }));
  return [{ text, animated: true }];
}

// stagger rank ordering over the animated-unit indices
function staggerRanks(animatedCount, mode) {
  const idx = [...Array(animatedCount).keys()];
  if (mode === "reverse") return idx.map((i) => animatedCount - 1 - i);
  if (mode === "center-out") {
    const center = (animatedCount - 1) / 2;
    const order = [...idx].sort(
      (a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b
    );
    const rank = new Array(animatedCount);
    order.forEach((unitIndex, r) => (rank[unitIndex] = r));
    return rank;
  }
  if (mode === "edges-in") {
    const order = [];
    let l = 0,
      r = animatedCount - 1;
    while (l <= r) {
      order.push(l);
      if (r !== l) order.push(r);
      l++;
      r--;
    }
    const rank = new Array(animatedCount);
    order.forEach((unitIndex, rr) => (rank[unitIndex] = rr));
    return rank;
  }
  return idx; // normal
}

/* ---------------- generic-stagger ---------------- */
function makeGenericStagger(stage, fx) {
  const ytm = fx.rendering_contract.y_travel_multiplier ?? 1;
  const target = fx.rendering_contract.target;
  const mode = fx.rendering_contract.stagger_mode || "normal";
  const t = fx.timing;
  const enterDur = t.enter.scaled_duration_ms;
  const enterStag = t.enter.scaled_stagger_ms;
  const exitDur = t.exit.scaled_duration_ms;
  const exitStag = t.exit.scaled_stagger_ms;
  const holdMs = fx.playback.hold_ms;
  const gapMs = fx.playback.gap_ms;
  const microMs = fx.playback.micro_delay_ms || 0;

  function buildPhrase(text) {
    const wrap = document.createElement("h3");
    wrap.className = "ta-title";
    const units = splitUnits(text, target);
    const spans = [];
    let aIndex = 0;
    const animatedIndices = [];
    units.forEach((u) => {
      const span = document.createElement("span");
      span.className = "ta-unit" + (u.line ? " line" : "");
      span.textContent = u.text;
      wrap.appendChild(span);
      if (u.animated) {
        animatedIndices.push(spans.length);
        aIndex++;
      }
      spans.push({ el: span, animated: u.animated });
    });
    const ranks = staggerRanks(animatedIndices.length, mode);
    return { wrap, spans, animatedIndices, ranks };
  }

  function applyEnterFrom(phrase) {
    phrase.animatedIndices.forEach((i) => applyFrame(phrase.spans[i].el, fx.enter.from, ytm));
  }

  function animatePhase(phrase, phase) {
    const dur = phase === "enter" ? enterDur : exitDur;
    const stag = phase === "enter" ? enterStag : exitStag;
    const easing = phase === "enter" ? fx.enter.easing : fx.exit.easing;
    const from = phase === "enter" ? fx.enter.from : fx.exit.from;
    const to = phase === "enter" ? fx.enter.to : fx.exit.to;
    const proms = [];
    phrase.animatedIndices.forEach((spanIndex, a) => {
      const el = phrase.spans[spanIndex].el;
      const delay = phrase.ranks[a] * stag;
      const kf = [frameToCss(from, ytm), frameToCss(to, ytm)];
      const anim = el.animate(kf, { duration: dur, delay, easing, fill: "forwards" });
      proms.push(anim.finished.catch(() => {}));
    });
    return Promise.all(proms);
  }

  return { buildPhrase, applyEnterFrom, animatePhase, holdMs, gapMs, microMs };
}

function frameToCss(f, ytm) {
  const x = f.x_px || 0;
  const y = (f.y_px || 0) * ytm;
  const s = f.scale == null ? 1 : f.scale;
  return {
    transform: `translate3d(${x}px, ${y}px, 0) scale(${s})`,
    filter: f.blur_px ? `blur(${f.blur_px}px)` : "blur(0px)",
    opacity: f.opacity == null ? 1 : f.opacity,
  };
}

/* ---------------- shared-slide-opacity-stage ----------------
   Whole phrase moves as one title transform; words only stagger opacity. */
function runSharedSlide(stage, fx, getPhrases) {
  const ytm = fx.rendering_contract.y_travel_multiplier ?? 1;
  const t = fx.timing;
  const titleEnterDur = t.enter_title.scaled_duration_ms;
  const titleExitDur = t.exit_title.scaled_duration_ms;
  const wordDur = t.enter_word_opacity.scaled_duration_ms;
  const wordStep = t.enter_word_opacity.delay_step_ms;
  const wOpFrom = fx.renderer.params.word_opacity_from;
  const wOpTo = fx.renderer.params.word_opacity_to;
  const holdMs = fx.playback.hold_ms;
  const gapMs = fx.playback.gap_ms;
  let alive = true;

  function build(text) {
    const wrap = document.createElement("h3");
    wrap.className = "ta-title";
    const words = [];
    (text.match(/(\S+|\s+)/g) || []).forEach((part) => {
      const span = document.createElement("span");
      span.className = "ta-unit";
      span.textContent = part;
      if (/\S/.test(part)) words.push(span);
      wrap.appendChild(span);
    });
    return { wrap, words };
  }

  (async () => {
    let i = 0;
    const phrases = getPhrases();
    let phrase = build(phrases[0]);
    stage.appendChild(phrase.wrap);
    while (alive) {
      // enter: title transform + word opacity stagger together
      applyFrame(phrase.wrap, fx.enter.from, ytm);
      phrase.words.forEach((w) => (w.style.opacity = wOpFrom));
      phrase.wrap.animate(
        [frameToCss(fx.enter.from, ytm), frameToCss(fx.enter.to, ytm)],
        { duration: titleEnterDur, easing: fx.enter.easing, fill: "forwards" }
      );
      phrase.words.forEach((w, idx) => {
        w.animate([{ opacity: wOpFrom }, { opacity: wOpTo }], {
          duration: wordDur,
          delay: idx * wordStep,
          easing: t.enter_word_opacity.easing,
          fill: "forwards",
        });
      });
      await sleep(titleEnterDur + phrase.words.length * wordStep);
      if (!alive) break;
      await sleep(holdMs);
      if (!alive) break;
      // exit: title only
      const exitAnim = phrase.wrap.animate(
        [frameToCss(fx.exit.from, ytm), frameToCss(fx.exit.to, ytm)],
        { duration: titleExitDur, easing: fx.exit.easing, fill: "forwards" }
      );
      await exitAnim.finished.catch(() => {});
      stage.innerHTML = "";
      await sleep(gapMs);
      i = (i + 1) % phrases.length;
      phrase = build(phrases[i]);
      stage.appendChild(phrase.wrap);
    }
  })();
  return () => (alive = false);
}

/* ---------------- kinetic builds (center / top) ---------------- */
function runKinetic(stage, fx, getPhrases, axis /* "x" | "y" */) {
  const p = fx.renderer.params;
  const firstDur = p.first_word_duration_ms;
  const pushDur = p.push_duration_ms;
  const exitDur = p.exit_duration_ms || 320;
  const holdMs = fx.playback.hold_ms;
  const gapMs = fx.playback.gap_ms;
  const easing = p.easing;
  const exitEasing = p.exit_easing;
  const gap = axis === "x" ? p.word_gap_px : p.line_gap_px;
  const entryOffset = axis === "x" ? p.entry_offset_px : p.entry_offset_y_px;
  let alive = true;

  const line = document.createElement("div");
  line.className = "ta-kinetic " + (axis === "x" ? "row" : "col");
  stage.appendChild(line);

  function poseCss(x, y, scale, blur, opacity) {
    return {
      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) scale(${scale})`,
      filter: `blur(${blur}px)`,
      opacity,
    };
  }
  function setPose(el, x, y, scale, blur, opacity) {
    Object.assign(el.style, poseCss(x, y, scale, blur, opacity));
  }

  // centered positions along the axis given measured sizes
  function positions(sizes) {
    const total = sizes.reduce((a, b) => a + b, 0) + gap * (sizes.length - 1);
    let cursor = -total / 2;
    return sizes.map((sz) => {
      const pos = cursor + sz / 2;
      cursor += sz + gap;
      return pos;
    });
  }

  (async () => {
    let pi = 0;
    const phrases = getPhrases();
    while (alive) {
      const words = phrases[pi];
      const spans = [];
      // build word by word
      for (let w = 0; w < words.length; w++) {
        const span = document.createElement("span");
        span.className = "ta-unit";
        span.textContent = words[w];
        span.style.position = "absolute";
        span.style.left = "50%";
        span.style.top = "50%";
        span.style.opacity = "0";
        line.appendChild(span);
        spans.push(span);
        const sizes = spans.map((s) =>
          axis === "x" ? s.offsetWidth : s.offsetHeight
        );
        const pos = positions(sizes);

        if (w === 0) {
          const a0 = axis === "x" ? 0 : 0;
          const kf = [
            poseCss(0, axis === "x" ? p.first_word_y_px : p.first_word_y_px, p.entry_scale, p.entry_blur_px, 0),
            poseCss(0, p.first_word_y_px * 0.35, 0.998, p.entry_blur_px * 0.45, 0.78),
            poseCss(0, 0, 1, 0, 1),
          ];
          // along-axis coordinate stays 0 for first word; off-axis is y for col, 0 for row's y uses first_word_y
          const anim = span.animate(kf, { duration: firstDur, easing, fill: "forwards" });
          await anim.finished.catch(() => {});
        } else {
          const proms = [];
          // existing words reflow to new centered positions
          for (let e = 0; e < w; e++) {
            const cur = spans[e]._pos ?? 0;
            const next = axisVal(pos[e], axis);
            const curC = axis === "x" ? [cur, 0] : [0, cur];
            const nextC = axis === "x" ? [next, 0] : [0, next];
            const midC = axis === "x"
              ? [mix(cur, next, 0.58), 0]
              : [0, mix(cur, next, 0.58)];
            const kf = [
              poseCss(curC[0], curC[1], 1, 0, 1),
              poseCss(midC[0], midC[1], 1, p.reflow_blur_px, 1),
              poseCss(nextC[0], nextC[1], 1, 0, 1),
            ];
            proms.push(spans[e].animate(kf, { duration: pushDur, easing, fill: "forwards" }).finished.catch(() => {}));
            spans[e]._pos = next;
          }
          // incoming word
          const target = axisVal(pos[w], axis);
          const start = target + entryOffset;
          const sc = (v) => (axis === "x" ? [v, 0] : [0, v]);
          const kf = [
            poseCss(...sc(start), p.entry_scale, p.entry_blur_px, 0),
            poseCss(...sc(mix(start, target, 0.72)), 0.998, p.entry_blur_px * 0.38, 0.84),
            poseCss(...sc(target), 1, 0, 1),
          ];
          proms.push(span.animate(kf, { duration: pushDur, easing, fill: "forwards" }).finished.catch(() => {}));
          span._pos = target;
          await Promise.all(proms);
        }
        // snap all to final poses
        spans.forEach((s, idx) => {
          const v = s._pos ?? 0;
          const c = axis === "x" ? [v, 0] : [0, v];
          setPose(s, c[0], c[1], 1, 0, 1);
        });
        if (!alive) return;
      }
      await sleep(holdMs);
      if (!alive) return;
      // exit all together
      const proms = spans.map((s) => {
        const v = s._pos ?? 0;
        const c = (yy) => (axis === "x" ? [v, yy] : [0, v + yy]);
        const kf = [
          poseCss(...c(0), 1, 0, 1),
          poseCss(...c(p.exit_y_px * 0.45), 1, p.exit_blur_px * 0.55, 0.62),
          poseCss(...c(p.exit_y_px), 1, p.exit_blur_px, 0),
        ];
        return s.animate(kf, { duration: exitDur, easing: exitEasing, fill: "forwards" }).finished.catch(() => {});
      });
      await Promise.all(proms);
      line.innerHTML = "";
      await sleep(gapMs);
      pi = (pi + 1) % phrases.length;
    }
  })();
  return () => (alive = false);
}
function axisVal(pos, axis) {
  return pos; // positions() already returns the along-axis coordinate
}

/* ---------------- generic loop driver ---------------- */
function runGeneric(stage, fx, getPhrases) {
  const r = makeGenericStagger(stage, fx);
  let alive = true;
  (async () => {
    let i = 0;
    const phrases = getPhrases();
    let cur = r.buildPhrase(phrases[0]);
    r.applyEnterFrom(cur);
    stage.appendChild(cur.wrap);
    await r.animatePhase(cur, "enter");
    while (alive) {
      await sleep(r.holdMs);
      if (!alive) break;
      await r.animatePhase(cur, "exit");
      i = (i + 1) % phrases.length;
      const next = r.buildPhrase(phrases[i]);
      r.applyEnterFrom(next);
      await sleep(r.microMs);
      stage.innerHTML = "";
      stage.appendChild(next.wrap);
      cur = next;
      await r.animatePhase(cur, "enter");
      await sleep(r.gapMs);
    }
  })();
  return () => (alive = false);
}

/* ---------------- card factory ---------------- */
function makeCard(fx) {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <div class="stage"></div>
    <div class="meta">
      <div class="name">${fx.display_name}</div>
      <code class="id">${fx.id}</code>
      <p class="desc">${fx.description}</p>
    </div>`;
  const stage = card.querySelector(".stage");
  const phrases = () =>
    fx.target === "per-line"
      ? fx.samples.map((s) => s) // keep \n inside
      : fx.samples;

  const kineticPhrases = () =>
    fx.renderer.params.phrase_samples ||
    fx.samples.map((s) => s.replace(/[.,!?]+$/, "").split(/\s+/));

  const rid = fx.renderer.id;
  let stop;
  if (rid === "shared-slide-opacity-stage") stop = runSharedSlide(stage, fx, phrases);
  else if (rid === "kinetic-center-build") stop = runKinetic(stage, fx, kineticPhrases, "x");
  else if (rid === "kinetic-top-build") stop = runKinetic(stage, fx, kineticPhrases, "y");
  else stop = runGeneric(stage, fx, phrases);
  card._stop = stop;
  return card;
}

function boot() {
  const grid = document.getElementById("grid");
  EFFECTS.forEach((fx) => grid.appendChild(makeCard(fx)));
  document.getElementById("count").textContent = EFFECTS.length;
}
document.addEventListener("DOMContentLoaded", boot);
