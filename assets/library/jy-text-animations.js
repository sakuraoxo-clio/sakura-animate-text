(function (global) {
  "use strict";

  const registry = Object.create(null);
  const meta = Object.create(null);

  function toElement(target) {
    if (typeof target === "string") return document.querySelector(target);
    return target;
  }

  function makeStage(target, text, split) {
    const root = toElement(target);
    if (!root) throw new Error("JYTextAnimations: target not found");
    root.innerHTML = "";
    root.classList.add("jyta-stage");
    const wrap = document.createElement("span");
    wrap.className = "jyta-text";
    if (split === "chars") {
      Array.from(text).forEach((ch) => {
        const item = document.createElement("span");
        item.className = "jyta-char";
        item.textContent = ch;
        wrap.appendChild(item);
      });
    } else {
      wrap.textContent = text;
    }
    root.appendChild(wrap);
    return { root, wrap, items: split === "chars" ? Array.from(wrap.children) : [wrap] };
  }

  function cssFrame(frame) {
    const clip = Math.max(0, Math.min(1, frame.clip == null ? 1 : frame.clip));
    const glow = frame.glow || 0;
    return {
      opacity: String(frame.opacity == null ? 1 : frame.opacity),
      transform:
        "translate(" + (frame.x || 0) + "px," + (frame.y || 0) + "px) " +
        "scale(" + (frame.scale == null ? 1 : frame.scale) + ") " +
        "rotate(" + (frame.rotate || 0) + "deg) " +
        "skewX(" + (frame.skewX || 0) + "deg)",
      filter: "blur(" + (frame.blur || 0) + "px)",
      clipPath: "inset(0 " + ((1 - clip) * 100).toFixed(3) + "% 0 0)",
      textShadow:
        glow > 0.05
          ? "0 0 " + Math.round(10 + glow * 20) + "px rgba(105,230,210,.9), 0 8px 24px rgba(0,0,0,.48)"
          : "0 8px 24px rgba(0,0,0,.48)",
      offset: frame.t == null ? undefined : frame.t
    };
  }

  function toCssFrames(frames) {
    return frames.map(cssFrame);
  }

  function playFrames(target, text, frames, options) {
    const opts = options || {};
    const split = opts.split || "whole";
    const duration = opts.duration || 900;
    const stagger = opts.stagger || 0;
    const loop = !!opts.loop;
    const easing = opts.easing || "cubic-bezier(.2,.8,.2,1)";
    const actualText = text || opts.defaultText || "字体动效";
    const stage = makeStage(target, actualText, split);
    const cssFrames = toCssFrames(frames);
    const animations = stage.items.map((item, index) => {
      return item.animate(cssFrames, {
        duration,
        delay: stagger * index,
        easing,
        fill: "both",
        iterations: loop ? Infinity : 1,
        direction: opts.direction || "normal"
      });
    });
    return {
      root: stage.root,
      text: stage.wrap,
      items: stage.items,
      animations,
      stop() { animations.forEach((anim) => anim.cancel()); },
      pause() { animations.forEach((anim) => anim.pause()); },
      resume() { animations.forEach((anim) => anim.play()); }
    };
  }

  function register(id, title, group, kind, fn) {
    registry[id] = fn;
    meta[id] = { id, title, group, kind };
  }

  function play(id, target, text, options) {
    const fn = registry[id];
    if (!fn) throw new Error("JYTextAnimations: unknown animation id " + id);
    return fn(target, text, options || {});
  }

  function list(group) {
    return Object.keys(meta)
      .map((id) => meta[id])
      .filter((item) => !group || item.group === group);
  }

  global.JYTextAnimations = {
    play,
    list,
    get(id) { return registry[id]; },
    meta(id) { return meta[id]; },
    count() { return Object.keys(registry).length; },
    registry,
    metadata: meta
  };


  const frames_7323232393291107610 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7323232393291107610(target, text, options) {
    return playFrames(target, text, frames_7323232393291107610, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7323232393291107610", "抽象的高科技背景纹理-可循环", "循环", "fade", anim_7323232393291107610);


  const frames_7239559299196785209 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7239559299196785209(target, text, options) {
    return playFrames(target, text, frames_7239559299196785209, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7239559299196785209", "侧滑", "入场", "slide", anim_7239559299196785209);


  const frames_7221413342257091133 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7221413342257091133(target, text, options) {
    return playFrames(target, text, frames_7221413342257091133, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7221413342257091133", "展开", "入场", "fade", anim_7221413342257091133);


  const frames_7487891382980463911 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7487891382980463911(target, text, options) {
    return playFrames(target, text, frames_7487891382980463911, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7487891382980463911", "破镜重圆", "入场", "material", anim_7487891382980463911);


  const frames_6798332733694153230 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798332733694153230(target, text, options) {
    return playFrames(target, text, frames_6798332733694153230, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332733694153230", "放大", "入场", "zoom", anim_6798332733694153230);


  const frames_6798333487523828238 = [{"t":0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798333487523828238(target, text, options) {
    return playFrames(target, text, frames_6798333487523828238, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333487523828238", "向上滑动", "入场", "slide", anim_6798333487523828238);


  const frames_7379456870265655859 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7379456870265655859(target, text, options) {
    return playFrames(target, text, frames_7379456870265655859, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7379456870265655859", "便利贴", "入场", "fade", anim_7379456870265655859);


  const frames_7115301367786246692 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7115301367786246692(target, text, options) {
    return playFrames(target, text, frames_7115301367786246692, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7115301367786246692", "震波", "入场", "wave_shake", anim_7115301367786246692);


  const frames_7645247185386229055 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645247185386229055(target, text, options) {
    return playFrames(target, text, frames_7645247185386229055, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645247185386229055", "涟漪闪光", "入场", "glow", anim_7645247185386229055);


  const frames_6798320778182922760 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798320778182922760(target, text, options) {
    return playFrames(target, text, frames_6798320778182922760, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798320778182922760", "渐显", "入场", "fade", anim_6798320778182922760);


  const frames_6798332871267324423 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798332871267324423(target, text, options) {
    return playFrames(target, text, frames_6798332871267324423, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332871267324423", "向左滑动", "入场", "slide", anim_6798332871267324423);


  const frames_7210363235906622012 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7210363235906622012(target, text, options) {
    return playFrames(target, text, frames_7210363235906622012, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7210363235906622012", "闪现", "入场", "glow", anim_7210363235906622012);


  const frames_7633732253356494121 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633732253356494121(target, text, options) {
    return playFrames(target, text, frames_7633732253356494121, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633732253356494121", "模糊聚焦", "入场", "blur", anim_7633732253356494121);


  const frames_7321672946466951731 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7321672946466951731(target, text, options) {
    return playFrames(target, text, frames_7321672946466951731, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7321672946466951731", "水墨", "入场", "material", anim_7321672946466951731);


  const frames_6800268825611735559 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6800268825611735559(target, text, options) {
    return playFrames(target, text, frames_6800268825611735559, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6800268825611735559", "轻微放大", "入场", "zoom", anim_6800268825611735559);


  const frames_6798333076469453320 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798333076469453320(target, text, options) {
    return playFrames(target, text, frames_6798333076469453320, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333076469453320", "向右滑动", "入场", "slide", anim_6798333076469453320);


  const frames_7615180828229897513 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615180828229897513(target, text, options) {
    return playFrames(target, text, frames_7615180828229897513, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615180828229897513", "球面滑动", "入场", "slide", anim_7615180828229897513);


  const frames_7647824063389338943 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647824063389338943(target, text, options) {
    return playFrames(target, text, frames_7647824063389338943, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647824063389338943", "曝光模糊", "入场", "blur", anim_7647824063389338943);


  const frames_7645243182833339691 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645243182833339691(target, text, options) {
    return playFrames(target, text, frames_7645243182833339691, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645243182833339691", "模糊渐清", "入场", "blur", anim_7645243182833339691);


  const frames_6798333705401143816 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798333705401143816(target, text, options) {
    return playFrames(target, text, frames_6798333705401143816, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333705401143816", "向下滑动", "入场", "slide", anim_6798333705401143816);


  const frames_6798332584276267527 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798332584276267527(target, text, options) {
    return playFrames(target, text, frames_6798332584276267527, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332584276267527", "缩小", "入场", "zoom", anim_6798332584276267527);


  const frames_7615181271265742099 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615181271265742099(target, text, options) {
    return playFrames(target, text, frames_7615181271265742099, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615181271265742099", "水波渐显", "入场", "wave_shake", anim_7615181271265742099);


  const frames_7436667461837001267 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7436667461837001267(target, text, options) {
    return playFrames(target, text, frames_7436667461837001267, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436667461837001267", "点开", "入场", "fade", anim_7436667461837001267);


  const frames_7645248596559809855 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645248596559809855(target, text, options) {
    return playFrames(target, text, frames_7645248596559809855, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645248596559809855", "黑屏骤现", "入场", "fade", anim_7645248596559809855);


  const frames_6740867832570974733 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6740867832570974733(target, text, options) {
    return playFrames(target, text, frames_6740867832570974733, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6740867832570974733", "动感放大", "入场", "zoom", anim_6740867832570974733);


  const frames_7647577293933563160 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647577293933563160(target, text, options) {
    return playFrames(target, text, frames_7647577293933563160, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647577293933563160", "模糊缩小", "入场", "blur", anim_7647577293933563160);


  const frames_7542914285605752126 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7542914285605752126(target, text, options) {
    return playFrames(target, text, frames_7542914285605752126, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7542914285605752126", "泼墨开场", "入场", "fade", anim_7542914285605752126);


  const frames_7301896031673782835 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7301896031673782835(target, text, options) {
    return playFrames(target, text, frames_7301896031673782835, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7301896031673782835", "横向模糊", "入场", "blur", anim_7301896031673782835);


  const frames_7577237923993505048 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577237923993505048(target, text, options) {
    return playFrames(target, text, frames_7577237923993505048, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577237923993505048", "云层穿梭", "入场", "fade", anim_7577237923993505048);


  const frames_6739418390030455300 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739418390030455300(target, text, options) {
    return playFrames(target, text, frames_6739418390030455300, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739418390030455300", "上下抖动", "入场", "wave_shake", anim_6739418390030455300);


  const frames_7452407076417966619 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7452407076417966619(target, text, options) {
    return playFrames(target, text, frames_7452407076417966619, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7452407076417966619", "翻入", "入场", "rotate", anim_7452407076417966619);


  const frames_7280797339042714169 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7280797339042714169(target, text, options) {
    return playFrames(target, text, frames_7280797339042714169, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7280797339042714169", "交错开幕", "入场", "wipe", anim_7280797339042714169);


  const frames_7467842885740663306 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7467842885740663306(target, text, options) {
    return playFrames(target, text, frames_7467842885740663306, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7467842885740663306", "神奇弹窗", "入场", "bounce", anim_7467842885740663306);


  const frames_7572490164921093401 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7572490164921093401(target, text, options) {
    return playFrames(target, text, frames_7572490164921093401, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572490164921093401", "水墨花朵", "入场", "material", anim_7572490164921093401);


  const frames_6739418227031413256 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739418227031413256(target, text, options) {
    return playFrames(target, text, frames_6739418227031413256, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739418227031413256", "轻微抖动", "入场", "wave_shake", anim_6739418227031413256);


  const frames_7649344229021338886 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649344229021338886(target, text, options) {
    return playFrames(target, text, frames_7649344229021338886, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649344229021338886", "径向模糊", "入场", "blur", anim_7649344229021338886);


  const frames_7589104193479249177 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7589104193479249177(target, text, options) {
    return playFrames(target, text, frames_7589104193479249177, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7589104193479249177", "折纸展开", "入场", "rotate", anim_7589104193479249177);


  const frames_7540608230406327576 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7540608230406327576(target, text, options) {
    return playFrames(target, text, frames_7540608230406327576, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540608230406327576", "眨眼", "入场", "fade", anim_7540608230406327576);


  const frames_7226641244938572346 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7226641244938572346(target, text, options) {
    return playFrames(target, text, frames_7226641244938572346, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7226641244938572346", "烟雾弹", "入场", "bounce", anim_7226641244938572346);


  const frames_7239273897491698232 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7239273897491698232(target, text, options) {
    return playFrames(target, text, frames_7239273897491698232, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7239273897491698232", "折叠开幕", "入场", "rotate", anim_7239273897491698232);


  const frames_6797338697625768455 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6797338697625768455(target, text, options) {
    return playFrames(target, text, frames_6797338697625768455, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6797338697625768455", "镜像翻转", "入场", "rotate", anim_6797338697625768455);


  const frames_7303524763589153306 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7303524763589153306(target, text, options) {
    return playFrames(target, text, frames_7303524763589153306, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7303524763589153306", "聚合", "入场", "fade", anim_7303524763589153306);


  const frames_7647821509729340735 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647821509729340735(target, text, options) {
    return playFrames(target, text, frames_7647821509729340735, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647821509729340735", "拖影放大", "入场", "blur", anim_7647821509729340735);


  const frames_7337937899704291866 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7337937899704291866(target, text, options) {
    return playFrames(target, text, frames_7337937899704291866, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7337937899704291866", "模糊聚焦", "入场", "blur", anim_7337937899704291866);


  const frames_7649343547203652907 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649343547203652907(target, text, options) {
    return playFrames(target, text, frames_7649343547203652907, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649343547203652907", "垂直扫光", "入场", "glow", anim_7649343547203652907);


  const frames_7311984593387655731 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7311984593387655731(target, text, options) {
    return playFrames(target, text, frames_7311984593387655731, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7311984593387655731", "Kira游动", "入场", "fade", anim_7311984593387655731);


  const frames_7468589731727544882 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7468589731727544882(target, text, options) {
    return playFrames(target, text, frames_7468589731727544882, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7468589731727544882", "粒子爱心", "入场", "material", anim_7468589731727544882);


  const frames_7625909926719720754 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7625909926719720754(target, text, options) {
    return playFrames(target, text, frames_7625909926719720754, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625909926719720754", "闪跳入场", "入场", "bounce", anim_7625909926719720754);


  const frames_7640329015538240830 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7640329015538240830(target, text, options) {
    return playFrames(target, text, frames_7640329015538240830, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7640329015538240830", "黑白渐显", "入场", "fade", anim_7640329015538240830);


  const frames_7186944542409495099 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7186944542409495099(target, text, options) {
    return playFrames(target, text, frames_7186944542409495099, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7186944542409495099", "旋转开幕", "入场", "rotate", anim_7186944542409495099);


  const frames_6798334070653719054 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6798334070653719054(target, text, options) {
    return playFrames(target, text, frames_6798334070653719054, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798334070653719054", "旋转", "入场", "rotate", anim_6798334070653719054);


  const frames_7646363585081331006 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646363585081331006(target, text, options) {
    return playFrames(target, text, frames_7646363585081331006, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646363585081331006", "网格渐进", "入场", "fade", anim_7646363585081331006);


  const frames_7450031573954466314 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7450031573954466314(target, text, options) {
    return playFrames(target, text, frames_7450031573954466314, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7450031573954466314", "变速扩大", "入场", "zoom", anim_7450031573954466314);


  const frames_7218210014949806647 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7218210014949806647(target, text, options) {
    return playFrames(target, text, frames_7218210014949806647, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7218210014949806647", "圆形开幕", "入场", "wipe", anim_7218210014949806647);


  const frames_7210657307938525751 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7210657307938525751(target, text, options) {
    return playFrames(target, text, frames_7210657307938525751, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7210657307938525751", "斜切", "入场", "fade", anim_7210657307938525751);


  const frames_7650406782279585048 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7650406782279585048(target, text, options) {
    return playFrames(target, text, frames_7650406782279585048, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7650406782279585048", "螺旋开场", "入场", "rotate", anim_7650406782279585048);


  const frames_7623349872497823014 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623349872497823014(target, text, options) {
    return playFrames(target, text, frames_7623349872497823014, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623349872497823014", "像素渐显", "入场", "fade", anim_7623349872497823014);


  const frames_7623373568973360434 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623373568973360434(target, text, options) {
    return playFrames(target, text, frames_7623373568973360434, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623373568973360434", "浪光渐显", "入场", "fade", anim_7623373568973360434);


  const frames_7604761523457723690 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7604761523457723690(target, text, options) {
    return playFrames(target, text, frames_7604761523457723690, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7604761523457723690", "圆环扩散", "入场", "fade", anim_7604761523457723690);


  const frames_6739338374441603598 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739338374441603598(target, text, options) {
    return playFrames(target, text, frames_6739338374441603598, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739338374441603598", "向下甩入", "入场", "slide", anim_6739338374441603598);


  const frames_6818747060649464327 = [{"t":0,"opacity":0,"x":0.0,"y":19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6818747060649464327(target, text, options) {
    return playFrames(target, text, frames_6818747060649464327, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6818747060649464327", "向上转入 II", "入场", "rotate", anim_6818747060649464327);


  const frames_7625259246304939288 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7625259246304939288(target, text, options) {
    return playFrames(target, text, frames_7625259246304939288, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625259246304939288", "云朵爆炸", "入场", "material", anim_7625259246304939288);


  const frames_7578773611553803544 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7578773611553803544(target, text, options) {
    return playFrames(target, text, frames_7578773611553803544, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578773611553803544", "纸张展开", "入场", "fade", anim_7578773611553803544);


  const frames_7255594501694034490 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7255594501694034490(target, text, options) {
    return playFrames(target, text, frames_7255594501694034490, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7255594501694034490", "砸出波纹", "入场", "material", anim_7255594501694034490);


  const frames_7646997452339432766 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646997452339432766(target, text, options) {
    return playFrames(target, text, frames_7646997452339432766, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646997452339432766", "模糊放大", "入场", "blur", anim_7646997452339432766);


  const frames_6991764455931515422 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6991764455931515422(target, text, options) {
    return playFrames(target, text, frames_6991764455931515422, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6991764455931515422", "抖动下降", "入场", "wave_shake", anim_6991764455931515422);


  const frames_7628147398048779544 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7628147398048779544(target, text, options) {
    return playFrames(target, text, frames_7628147398048779544, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7628147398048779544", "对角斜切", "入场", "fade", anim_7628147398048779544);


  const frames_7606924325228383512 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7606924325228383512(target, text, options) {
    return playFrames(target, text, frames_7606924325228383512, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7606924325228383512", "光线开幕", "入场", "wipe", anim_7606924325228383512);


  const frames_7448898555617481226 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7448898555617481226(target, text, options) {
    return playFrames(target, text, frames_7448898555617481226, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7448898555617481226", "画面擦除", "入场", "wipe", anim_7448898555617481226);


  const frames_6808401616564130312 = [{"t":0,"opacity":0,"x":0.0,"y":19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6808401616564130312(target, text, options) {
    return playFrames(target, text, frames_6808401616564130312, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6808401616564130312", "向上转入", "入场", "rotate", anim_6808401616564130312);


  const frames_6739418540421419524 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739418540421419524(target, text, options) {
    return playFrames(target, text, frames_6739418540421419524, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739418540421419524", "左右抖动", "入场", "wave_shake", anim_6739418540421419524);


  const frames_7639211741565537599 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7639211741565537599(target, text, options) {
    return playFrames(target, text, frames_7639211741565537599, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7639211741565537599", "相片翻转", "入场", "rotate", anim_7639211741565537599);


  const frames_7380298290140549647 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7380298290140549647(target, text, options) {
    return playFrames(target, text, frames_7380298290140549647, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7380298290140549647", "旋转圆球", "入场", "rotate", anim_7380298290140549647);


  const frames_7314144465944318502 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7314144465944318502(target, text, options) {
    return playFrames(target, text, frames_7314144465944318502, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314144465944318502", "弹近", "入场", "bounce", anim_7314144465944318502);


  const frames_6781683302672634382 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6781683302672634382(target, text, options) {
    return playFrames(target, text, frames_6781683302672634382, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6781683302672634382", "轻微抖动 III", "入场", "wave_shake", anim_6781683302672634382);


  const frames_6739418677910704651 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739418677910704651(target, text, options) {
    return playFrames(target, text, frames_6739418677910704651, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739418677910704651", "轻微抖动 II", "入场", "wave_shake", anim_6739418677910704651);


  const frames_7446622476928291379 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7446622476928291379(target, text, options) {
    return playFrames(target, text, frames_7446622476928291379, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7446622476928291379", "魔法粒子I", "入场", "material", anim_7446622476928291379);


  const frames_7570218816635096345 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7570218816635096345(target, text, options) {
    return playFrames(target, text, frames_7570218816635096345, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7570218816635096345", "动感弹窗", "入场", "bounce", anim_7570218816635096345);


  const frames_7629278390855404850 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7629278390855404850(target, text, options) {
    return playFrames(target, text, frames_7629278390855404850, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7629278390855404850", "层叠放大", "入场", "zoom", anim_7629278390855404850);


  const frames_7649053027013528856 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649053027013528856(target, text, options) {
    return playFrames(target, text, frames_7649053027013528856, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649053027013528856", "像素浮现", "入场", "fade", anim_7649053027013528856);


  const frames_7647816310058929451 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647816310058929451(target, text, options) {
    return playFrames(target, text, frames_7647816310058929451, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647816310058929451", "偏振旋转", "入场", "rotate", anim_7647816310058929451);


  const frames_7548850869673119001 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7548850869673119001(target, text, options) {
    return playFrames(target, text, frames_7548850869673119001, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7548850869673119001", "笔刷涂抹", "入场", "fade", anim_7548850869673119001);


  const frames_7566987705314200894 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566987705314200894(target, text, options) {
    return playFrames(target, text, frames_7566987705314200894, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566987705314200894", "屏闪出现", "入场", "glow", anim_7566987705314200894);


  const frames_7446673584296038949 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7446673584296038949(target, text, options) {
    return playFrames(target, text, frames_7446673584296038949, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7446673584296038949", "魔法粒子II", "入场", "material", anim_7446673584296038949);


  const frames_6803260897117606414 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6803260897117606414(target, text, options) {
    return playFrames(target, text, frames_6803260897117606414, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6803260897117606414", "钟摆", "入场", "rotate", anim_6803260897117606414);


  const frames_7646388059956661528 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646388059956661528(target, text, options) {
    return playFrames(target, text, frames_7646388059956661528, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646388059956661528", "拼块弹入", "入场", "bounce", anim_7646388059956661528);


  const frames_7640501439781047614 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7640501439781047614(target, text, options) {
    return playFrames(target, text, frames_7640501439781047614, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7640501439781047614", "水波纹扭曲", "入场", "wave_shake", anim_7640501439781047614);


  const frames_7570744085665910040 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7570744085665910040(target, text, options) {
    return playFrames(target, text, frames_7570744085665910040, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7570744085665910040", "毛边展开", "入场", "fade", anim_7570744085665910040);


  const frames_7644213512163855640 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644213512163855640(target, text, options) {
    return playFrames(target, text, frames_7644213512163855640, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644213512163855640", "擦除开场", "入场", "wipe", anim_7644213512163855640);


  const frames_6805019065761927694 = [{"t":0,"opacity":0,"x":25.2,"y":0.0,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6805019065761927694(target, text, options) {
    return playFrames(target, text, frames_6805019065761927694, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6805019065761927694", "向右转入", "入场", "rotate", anim_6805019065761927694);


  const frames_7647344830460431641 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647344830460431641(target, text, options) {
    return playFrames(target, text, frames_7647344830460431641, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647344830460431641", "白光回填", "入场", "fade", anim_7647344830460431641);


  const frames_7452242347661726217 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7452242347661726217(target, text, options) {
    return playFrames(target, text, frames_7452242347661726217, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7452242347661726217", "幕布", "入场", "wipe", anim_7452242347661726217);


  const frames_7566859627682417982 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566859627682417982(target, text, options) {
    return playFrames(target, text, frames_7566859627682417982, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566859627682417982", "卡片飞入", "入场", "slide", anim_7566859627682417982);


  const frames_7441139821747114523 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7441139821747114523(target, text, options) {
    return playFrames(target, text, frames_7441139821747114523, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7441139821747114523", "金沙", "入场", "material", anim_7441139821747114523);


  const frames_6740868384637850120 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6740868384637850120(target, text, options) {
    return playFrames(target, text, frames_6740868384637850120, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6740868384637850120", "动感缩小", "入场", "zoom", anim_6740868384637850120);


  const frames_6739338727866241539 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739338727866241539(target, text, options) {
    return playFrames(target, text, frames_6739338727866241539, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739338727866241539", "向右甩入", "入场", "slide", anim_6739338727866241539);


  const frames_7577591815696715033 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577591815696715033(target, text, options) {
    return playFrames(target, text, frames_7577591815696715033, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577591815696715033", "幕布下落", "入场", "wipe", anim_7577591815696715033);


  const frames_7614071894731410712 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7614071894731410712(target, text, options) {
    return playFrames(target, text, frames_7614071894731410712, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7614071894731410712", "撒落汇聚", "入场", "fade", anim_7614071894731410712);


  const frames_7547294008373038360 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7547294008373038360(target, text, options) {
    return playFrames(target, text, frames_7547294008373038360, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7547294008373038360", "金粉散落", "入场", "material", anim_7547294008373038360);


  const frames_7279999334001676857 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7279999334001676857(target, text, options) {
    return playFrames(target, text, frames_7279999334001676857, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7279999334001676857", "跳转开幕", "入场", "bounce", anim_7279999334001676857);


  const frames_6782010677520241165 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6782010677520241165(target, text, options) {
    return playFrames(target, text, frames_6782010677520241165, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6782010677520241165", "漩涡旋转", "入场", "rotate", anim_6782010677520241165);


  const frames_7539475499706289432 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7539475499706289432(target, text, options) {
    return playFrames(target, text, frames_7539475499706289432, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7539475499706289432", "圆形放大", "入场", "zoom", anim_7539475499706289432);


  const frames_7543905524060835096 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7543905524060835096(target, text, options) {
    return playFrames(target, text, frames_7543905524060835096, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7543905524060835096", "拉开网页", "入场", "slide", anim_7543905524060835096);


  const frames_7452662871550333477 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7452662871550333477(target, text, options) {
    return playFrames(target, text, frames_7452662871550333477, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7452662871550333477", "翻书", "入场", "rotate", anim_7452662871550333477);


  const frames_6802871256849846791 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6802871256849846791(target, text, options) {
    return playFrames(target, text, frames_6802871256849846791, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6802871256849846791", "雨刷", "入场", "wipe", anim_6802871256849846791);


  const frames_6816560956647150093 = [{"t":0,"opacity":0,"x":-25.2,"y":0.0,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6816560956647150093(target, text, options) {
    return playFrames(target, text, frames_6816560956647150093, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6816560956647150093", "向左转入", "入场", "rotate", anim_6816560956647150093);


  const frames_7603290131830770987 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603290131830770987(target, text, options) {
    return playFrames(target, text, frames_7603290131830770987, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603290131830770987", "信号干扰", "入场", "glitch", anim_7603290131830770987);


  const frames_7566547863262596377 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566547863262596377(target, text, options) {
    return playFrames(target, text, frames_7566547863262596377, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566547863262596377", "卷纸打开", "入场", "fade", anim_7566547863262596377);


  const frames_7614406474076441918 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7614406474076441918(target, text, options) {
    return playFrames(target, text, frames_7614406474076441918, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7614406474076441918", "暴风雪", "入场", "material", anim_7614406474076441918);


  const frames_6740122563692728844 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6740122563692728844(target, text, options) {
    return playFrames(target, text, frames_6740122563692728844, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6740122563692728844", "向左上甩入", "入场", "slide", anim_6740122563692728844);


  const frames_6805748897768542727 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6805748897768542727(target, text, options) {
    return playFrames(target, text, frames_6805748897768542727, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6805748897768542727", "雨刷 II", "入场", "wipe", anim_6805748897768542727);


  const frames_7379909514847326732 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7379909514847326732(target, text, options) {
    return playFrames(target, text, frames_7379909514847326732, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7379909514847326732", "脉冲", "入场", "fade", anim_7379909514847326732);


  const frames_7572555756021583128 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7572555756021583128(target, text, options) {
    return playFrames(target, text, frames_7572555756021583128, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572555756021583128", "折叠展开", "入场", "rotate", anim_7572555756021583128);


  const frames_7647826877440134436 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647826877440134436(target, text, options) {
    return playFrames(target, text, frames_7647826877440134436, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647826877440134436", "暖光闪现", "入场", "glow", anim_7647826877440134436);


  const frames_6740122731418751495 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6740122731418751495(target, text, options) {
    return playFrames(target, text, frames_6740122731418751495, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6740122731418751495", "向右上甩入", "入场", "slide", anim_6740122731418751495);


  const frames_7646368890221743385 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646368890221743385(target, text, options) {
    return playFrames(target, text, frames_7646368890221743385, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646368890221743385", "水滴", "入场", "fade", anim_7646368890221743385);


  const frames_7447351620641247781 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7447351620641247781(target, text, options) {
    return playFrames(target, text, frames_7447351620641247781, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7447351620641247781", "滑片滑动", "入场", "slide", anim_7447351620641247781);


  const frames_7623349714884381962 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623349714884381962(target, text, options) {
    return playFrames(target, text, frames_7623349714884381962, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623349714884381962", "笔刷擦除", "入场", "wipe", anim_7623349714884381962);


  const frames_7290754106417746491 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7290754106417746491(target, text, options) {
    return playFrames(target, text, frames_7290754106417746491, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7290754106417746491", "老电视", "入场", "glitch", anim_7290754106417746491);


  const frames_6739395445346275853 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739395445346275853(target, text, options) {
    return playFrames(target, text, frames_6739395445346275853, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739395445346275853", "向左下甩入", "入场", "slide", anim_6739395445346275853);


  const frames_7649060113399188761 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649060113399188761(target, text, options) {
    return playFrames(target, text, frames_7649060113399188761, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649060113399188761", "长条掉入", "入场", "slide", anim_7649060113399188761);


  const frames_7578172611302165784 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7578172611302165784(target, text, options) {
    return playFrames(target, text, frames_7578172611302165784, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578172611302165784", "粒子旋入", "入场", "rotate", anim_7578172611302165784);


  const frames_7623372284144799002 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623372284144799002(target, text, options) {
    return playFrames(target, text, frames_7623372284144799002, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623372284144799002", "百叶下翻", "入场", "rotate", anim_7623372284144799002);


  const frames_7540984322006830398 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7540984322006830398(target, text, options) {
    return playFrames(target, text, frames_7540984322006830398, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540984322006830398", "水波入场", "入场", "wave_shake", anim_7540984322006830398);


  const frames_7649268753355722009 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649268753355722009(target, text, options) {
    return playFrames(target, text, frames_7649268753355722009, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649268753355722009", "NEWS开场", "入场", "fade", anim_7649268753355722009);


  const frames_7648945190081891646 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7648945190081891646(target, text, options) {
    return playFrames(target, text, frames_7648945190081891646, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7648945190081891646", "窗格拼入", "入场", "fade", anim_7648945190081891646);


  const frames_7437386424032186931 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7437386424032186931(target, text, options) {
    return playFrames(target, text, frames_7437386424032186931, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7437386424032186931", "卡片扫光", "入场", "glow", anim_7437386424032186931);


  const frames_7613316419845000490 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7613316419845000490(target, text, options) {
    return playFrames(target, text, frames_7613316419845000490, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7613316419845000490", "果冻闪入", "入场", "glow", anim_7613316419845000490);


  const frames_7431502518753956403 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7431502518753956403(target, text, options) {
    return playFrames(target, text, frames_7431502518753956403, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7431502518753956403", "翻卡", "入场", "rotate", anim_7431502518753956403);


  const frames_6739395718223499787 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6739395718223499787(target, text, options) {
    return playFrames(target, text, frames_6739395718223499787, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6739395718223499787", "向右下甩入", "入场", "slide", anim_6739395718223499787);


  const frames_7649337893147741465 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649337893147741465(target, text, options) {
    return playFrames(target, text, frames_7649337893147741465, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649337893147741465", "拼块展开", "入场", "fade", anim_7649337893147741465);


  const frames_7631882147556625706 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7631882147556625706(target, text, options) {
    return playFrames(target, text, frames_7631882147556625706, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631882147556625706", "粒子聚焦", "入场", "blur", anim_7631882147556625706);


  const frames_7369889381357720102 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7369889381357720102(target, text, options) {
    return playFrames(target, text, frames_7369889381357720102, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7369889381357720102", "拼图", "入场", "fade", anim_7369889381357720102);


  const frames_7645239822877019433 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645239822877019433(target, text, options) {
    return playFrames(target, text, frames_7645239822877019433, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645239822877019433", "水墨晕染", "入场", "material", anim_7645239822877019433);


  const frames_7648982529818578201 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7648982529818578201(target, text, options) {
    return playFrames(target, text, frames_7648982529818578201, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7648982529818578201", "足球飞入", "入场", "slide", anim_7648982529818578201);


  const frames_7647417111928737048 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647417111928737048(target, text, options) {
    return playFrames(target, text, frames_7647417111928737048, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647417111928737048", "Q弹芋圆", "入场", "bounce", anim_7647417111928737048);


  const frames_7602834543191559449 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7602834543191559449(target, text, options) {
    return playFrames(target, text, frames_7602834543191559449, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7602834543191559449", "截取开屏", "入场", "wipe", anim_7602834543191559449);


  const frames_7623372790317567282 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623372790317567282(target, text, options) {
    return playFrames(target, text, frames_7623372790317567282, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623372790317567282", "方块合并", "入场", "fade", anim_7623372790317567282);


  const frames_7545729071028833560 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7545729071028833560(target, text, options) {
    return playFrames(target, text, frames_7545729071028833560, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7545729071028833560", "水滴聚合", "入场", "fade", anim_7545729071028833560);


  const frames_7650424446221864217 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7650424446221864217(target, text, options) {
    return playFrames(target, text, frames_7650424446221864217, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7650424446221864217", "柔波舒展", "入场", "fade", anim_7650424446221864217);


  const frames_7646335472565800216 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646335472565800216(target, text, options) {
    return playFrames(target, text, frames_7646335472565800216, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646335472565800216", "拉伸回落", "入场", "zoom", anim_7646335472565800216);


  const frames_7613316932858613011 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7613316932858613011(target, text, options) {
    return playFrames(target, text, frames_7613316932858613011, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7613316932858613011", "共振扩散", "入场", "fade", anim_7613316932858613011);


  const frames_7540669194447179032 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7540669194447179032(target, text, options) {
    return playFrames(target, text, frames_7540669194447179032, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540669194447179032", "碎片转入", "入场", "rotate", anim_7540669194447179032);


  const frames_7579291432968588568 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7579291432968588568(target, text, options) {
    return playFrames(target, text, frames_7579291432968588568, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579291432968588568", "水珠放大", "入场", "zoom", anim_7579291432968588568);


  const frames_7593261180710423844 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7593261180710423844(target, text, options) {
    return playFrames(target, text, frames_7593261180710423844, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7593261180710423844", "左右扭动", "入场", "fade", anim_7593261180710423844);


  const frames_7572090768035400985 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7572090768035400985(target, text, options) {
    return playFrames(target, text, frames_7572090768035400985, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572090768035400985", "纸张撕开", "入场", "fade", anim_7572090768035400985);


  const frames_7620385728140332313 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7620385728140332313(target, text, options) {
    return playFrames(target, text, frames_7620385728140332313, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7620385728140332313", "错位玻璃", "入场", "glitch", anim_7620385728140332313);


  const frames_7156911481563386381 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7156911481563386381(target, text, options) {
    return playFrames(target, text, frames_7156911481563386381, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7156911481563386381", "抖动变焦", "入场", "wave_shake", anim_7156911481563386381);


  const frames_7633799872893898046 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633799872893898046(target, text, options) {
    return playFrames(target, text, frames_7633799872893898046, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633799872893898046", "扫光入场", "入场", "glow", anim_7633799872893898046);


  const frames_7578811899593116952 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7578811899593116952(target, text, options) {
    return playFrames(target, text, frames_7578811899593116952, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578811899593116952", "纸张展开II", "入场", "fade", anim_7578811899593116952);


  const frames_7645241579694804287 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645241579694804287(target, text, options) {
    return playFrames(target, text, frames_7645241579694804287, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645241579694804287", "面片旋转", "入场", "rotate", anim_7645241579694804287);


  const frames_7548064178951425342 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7548064178951425342(target, text, options) {
    return playFrames(target, text, frames_7548064178951425342, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7548064178951425342", "幻银融景", "入场", "fade", anim_7548064178951425342);


  const frames_7397370569856913947 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7397370569856913947(target, text, options) {
    return playFrames(target, text, frames_7397370569856913947, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7397370569856913947", "玫瑰", "入场", "fade", anim_7397370569856913947);


  const frames_7347948517471556096 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7347948517471556096(target, text, options) {
    return playFrames(target, text, frames_7347948517471556096, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7347948517471556096", "荧光爆闪", "入场", "glow", anim_7347948517471556096);


  const frames_7613315514634489124 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7613315514634489124(target, text, options) {
    return playFrames(target, text, frames_7613315514634489124, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7613315514634489124", "爱心展开", "入场", "fade", anim_7613315514634489124);


  const frames_7645232370106387754 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645232370106387754(target, text, options) {
    return playFrames(target, text, frames_7645232370106387754, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645232370106387754", "拼图展开", "入场", "fade", anim_7645232370106387754);


  const frames_7564691778411171134 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7564691778411171134(target, text, options) {
    return playFrames(target, text, frames_7564691778411171134, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7564691778411171134", "点击交互", "入场", "fade", anim_7564691778411171134);


  const frames_7327872475453198848 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7327872475453198848(target, text, options) {
    return playFrames(target, text, frames_7327872475453198848, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7327872475453198848", "爱心碰撞", "入场", "fade", anim_7327872475453198848);


  const frames_7478237435915455769 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7478237435915455769(target, text, options) {
    return playFrames(target, text, frames_7478237435915455769, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7478237435915455769", "弹射入场", "入场", "bounce", anim_7478237435915455769);


  const frames_7248901535894082105 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7248901535894082105(target, text, options) {
    return playFrames(target, text, frames_7248901535894082105, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7248901535894082105", "画出爱心", "入场", "fade", anim_7248901535894082105);


  const frames_7645241020707343670 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645241020707343670(target, text, options) {
    return playFrames(target, text, frames_7645241020707343670, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645241020707343670", "水墨晕入", "入场", "material", anim_7645241020707343670);


  const frames_7288985830578721336 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7288985830578721336(target, text, options) {
    return playFrames(target, text, frames_7288985830578721336, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7288985830578721336", "震波 III", "入场", "wave_shake", anim_7288985830578721336);


  const frames_7579269307545210137 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7579269307545210137(target, text, options) {
    return playFrames(target, text, frames_7579269307545210137, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579269307545210137", "扑面而来", "入场", "fade", anim_7579269307545210137);


  const frames_7600343638270332184 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7600343638270332184(target, text, options) {
    return playFrames(target, text, frames_7600343638270332184, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7600343638270332184", "碎片拼接", "入场", "material", anim_7600343638270332184);


  const frames_7546452008912489752 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7546452008912489752(target, text, options) {
    return playFrames(target, text, frames_7546452008912489752, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7546452008912489752", "爱心入场", "入场", "fade", anim_7546452008912489752);


  const frames_7497199468203265291 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7497199468203265291(target, text, options) {
    return playFrames(target, text, frames_7497199468203265291, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7497199468203265291", "爬入", "入场", "fade", anim_7497199468203265291);


  const frames_7449589619038884390 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7449589619038884390(target, text, options) {
    return playFrames(target, text, frames_7449589619038884390, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449589619038884390", "报纸拼贴Ⅱ", "入场", "fade", anim_7449589619038884390);


  const frames_7246643852411408952 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7246643852411408952(target, text, options) {
    return playFrames(target, text, frames_7246643852411408952, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7246643852411408952", "转圈圈", "入场", "rotate", anim_7246643852411408952);


  const frames_7436273288612942363 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273288612942363(target, text, options) {
    return playFrames(target, text, frames_7436273288612942363, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288612942363", "枫叶遮罩", "入场", "wipe", anim_7436273288612942363);


  const frames_7633732237233605929 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633732237233605929(target, text, options) {
    return playFrames(target, text, frames_7633732237233605929, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633732237233605929", "宫格归位Ⅱ", "入场", "fade", anim_7633732237233605929);


  const frames_7612575746694860075 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7612575746694860075(target, text, options) {
    return playFrames(target, text, frames_7612575746694860075, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7612575746694860075", "闪白", "入场", "glow", anim_7612575746694860075);


  const frames_7645248099283242246 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645248099283242246(target, text, options) {
    return playFrames(target, text, frames_7645248099283242246, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645248099283242246", "紫圈外扩", "入场", "fade", anim_7645248099283242246);


  const frames_7242155802209817147 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7242155802209817147(target, text, options) {
    return playFrames(target, text, frames_7242155802209817147, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7242155802209817147", "闪屏", "入场", "glow", anim_7242155802209817147);


  const frames_7630760590536953107 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7630760590536953107(target, text, options) {
    return playFrames(target, text, frames_7630760590536953107, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7630760590536953107", "菱形展开", "入场", "fade", anim_7630760590536953107);


  const frames_7623350004895304987 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623350004895304987(target, text, options) {
    return playFrames(target, text, frames_7623350004895304987, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623350004895304987", "条纹排列", "入场", "fade", anim_7623350004895304987);


  const frames_7171690870788329992 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7171690870788329992(target, text, options) {
    return playFrames(target, text, frames_7171690870788329992, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7171690870788329992", "果冻 II", "入场", "fade", anim_7171690870788329992);


  const frames_7481660475340492057 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7481660475340492057(target, text, options) {
    return playFrames(target, text, frames_7481660475340492057, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7481660475340492057", "远处飞进", "入场", "fade", anim_7481660475340492057);


  const frames_7538488782333676825 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7538488782333676825(target, text, options) {
    return playFrames(target, text, frames_7538488782333676825, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538488782333676825", "翻转弹入", "入场", "bounce", anim_7538488782333676825);


  const frames_7635008067201158424 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7635008067201158424(target, text, options) {
    return playFrames(target, text, frames_7635008067201158424, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7635008067201158424", "播放器开场", "入场", "fade", anim_7635008067201158424);


  const frames_7449596462645645850 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7449596462645645850(target, text, options) {
    return playFrames(target, text, frames_7449596462645645850, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449596462645645850", "多维空间", "入场", "fade", anim_7449596462645645850);


  const frames_7042968847070007844 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7042968847070007844(target, text, options) {
    return playFrames(target, text, frames_7042968847070007844, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7042968847070007844", "心形放大", "入场", "zoom", anim_7042968847070007844);


  const frames_7633760682906766617 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633760682906766617(target, text, options) {
    return playFrames(target, text, frames_7633760682906766617, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633760682906766617", "撕开快递", "入场", "fade", anim_7633760682906766617);


  const frames_7623351303762234634 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623351303762234634(target, text, options) {
    return playFrames(target, text, frames_7623351303762234634, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623351303762234634", "百叶右翻", "入场", "rotate", anim_7623351303762234634);


  const frames_7641539839871012120 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7641539839871012120(target, text, options) {
    return playFrames(target, text, frames_7641539839871012120, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641539839871012120", "吹泡泡", "入场", "fade", anim_7641539839871012120);


  const frames_7552088507859307838 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7552088507859307838(target, text, options) {
    return playFrames(target, text, frames_7552088507859307838, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7552088507859307838", "碎片汇聚", "入场", "material", anim_7552088507859307838);


  const frames_7441475431309513267 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7441475431309513267(target, text, options) {
    return playFrames(target, text, frames_7441475431309513267, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7441475431309513267", "水滴遮罩", "入场", "wipe", anim_7441475431309513267);


  const frames_7511008216051027262 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7511008216051027262(target, text, options) {
    return playFrames(target, text, frames_7511008216051027262, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7511008216051027262", "端午开幕", "入场", "wipe", anim_7511008216051027262);


  const frames_7645737506821999934 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645737506821999934(target, text, options) {
    return playFrames(target, text, frames_7645737506821999934, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645737506821999934", "圆形遮罩", "入场", "wipe", anim_7645737506821999934);


  const frames_7340265236101861915 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7340265236101861915(target, text, options) {
    return playFrames(target, text, frames_7340265236101861915, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7340265236101861915", "玻璃聚集", "入场", "material", anim_7340265236101861915);


  const frames_7647821308176239913 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647821308176239913(target, text, options) {
    return playFrames(target, text, frames_7647821308176239913, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647821308176239913", "条带扫描", "入场", "fade", anim_7647821308176239913);


  const frames_7573992180377750809 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7573992180377750809(target, text, options) {
    return playFrames(target, text, frames_7573992180377750809, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7573992180377750809", "星星拖尾", "入场", "fade", anim_7573992180377750809);


  const frames_7613316422378343723 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7613316422378343723(target, text, options) {
    return playFrames(target, text, frames_7613316422378343723, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7613316422378343723", "漩涡干扰", "入场", "glitch", anim_7613316422378343723);


  const frames_7395178910083715638 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7395178910083715638(target, text, options) {
    return playFrames(target, text, frames_7395178910083715638, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7395178910083715638", "迷幻流光", "入场", "glow", anim_7395178910083715638);


  const frames_7432237078705869362 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7432237078705869362(target, text, options) {
    return playFrames(target, text, frames_7432237078705869362, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7432237078705869362", "PASSION", "入场", "fade", anim_7432237078705869362);


  const frames_7593258383122222399 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7593258383122222399(target, text, options) {
    return playFrames(target, text, frames_7593258383122222399, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7593258383122222399", "负片频闪", "入场", "glow", anim_7593258383122222399);


  const frames_7603251586445430040 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603251586445430040(target, text, options) {
    return playFrames(target, text, frames_7603251586445430040, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603251586445430040", "拍照定格", "入场", "fade", anim_7603251586445430040);


  const frames_7402167652220670514 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7402167652220670514(target, text, options) {
    return playFrames(target, text, frames_7402167652220670514, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7402167652220670514", "立方分体", "入场", "fade", anim_7402167652220670514);


  const frames_7628619955256216856 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7628619955256216856(target, text, options) {
    return playFrames(target, text, frames_7628619955256216856, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7628619955256216856", "拉取放大", "入场", "zoom", anim_7628619955256216856);


  const frames_7615182059190930742 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615182059190930742(target, text, options) {
    return playFrames(target, text, frames_7615182059190930742, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615182059190930742", "闪冲抖动", "入场", "glow", anim_7615182059190930742);


  const frames_7436273289170784806 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273289170784806(target, text, options) {
    return playFrames(target, text, frames_7436273289170784806, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273289170784806", "照片回忆", "入场", "fade", anim_7436273289170784806);


  const frames_7434746460186350131 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7434746460186350131(target, text, options) {
    return playFrames(target, text, frames_7434746460186350131, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434746460186350131", "分身模糊", "入场", "blur", anim_7434746460186350131);


  const frames_7645249062601542966 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7645249062601542966(target, text, options) {
    return playFrames(target, text, frames_7645249062601542966, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645249062601542966", "渐隐消散", "出场", "fade", anim_7645249062601542966);


  const frames_7218210114052821561 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7218210114052821561(target, text, options) {
    return playFrames(target, text, frames_7218210114052821561, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7218210114052821561", "圆形闭幕", "出场", "wipe", anim_7218210114052821561);


  const frames_7229149181762343484 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7229149181762343484(target, text, options) {
    return playFrames(target, text, frames_7229149181762343484, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7229149181762343484", "烟雾弹", "出场", "bounce", anim_7229149181762343484);


  const frames_6798333350487527950 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_6798333350487527950(target, text, options) {
    return playFrames(target, text, frames_6798333350487527950, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333350487527950", "向右滑动", "出场", "slide", anim_6798333350487527950);


  const frames_6798332972098392584 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_6798332972098392584(target, text, options) {
    return playFrames(target, text, frames_6798332972098392584, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332972098392584", "向左滑动", "出场", "slide", anim_6798332972098392584);


  const frames_7379884133268328996 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7379884133268328996(target, text, options) {
    return playFrames(target, text, frames_7379884133268328996, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7379884133268328996", "便利贴", "出场", "fade", anim_7379884133268328996);


  const frames_7034346969086562824 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7034346969086562824(target, text, options) {
    return playFrames(target, text, frames_7034346969086562824, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7034346969086562824", "心形缩小", "出场", "zoom", anim_7034346969086562824);


  const frames_7239559574095663671 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7239559574095663671(target, text, options) {
    return playFrames(target, text, frames_7239559574095663671, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7239559574095663671", "侧滑", "出场", "slide", anim_7239559574095663671);


  const frames_6798320902548230669 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6798320902548230669(target, text, options) {
    return playFrames(target, text, frames_6798320902548230669, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798320902548230669", "渐隐", "出场", "fade", anim_6798320902548230669);


  const frames_6798333612958683656 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6798333612958683656(target, text, options) {
    return playFrames(target, text, frames_6798333612958683656, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333612958683656", "向上滑动", "出场", "slide", anim_6798333612958683656);


  const frames_7579833343550770456 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7579833343550770456(target, text, options) {
    return playFrames(target, text, frames_7579833343550770456, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579833343550770456", "再见闭幕", "出场", "wipe", anim_7579833343550770456);


  const frames_7618534771370560830 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7618534771370560830(target, text, options) {
    return playFrames(target, text, frames_7618534771370560830, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7618534771370560830", "溶解飘散", "出场", "slide", anim_7618534771370560830);


  const frames_7625910074275269914 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7625910074275269914(target, text, options) {
    return playFrames(target, text, frames_7625910074275269914, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625910074275269914", "熄灭", "出场", "fade", anim_7625910074275269914);


  const frames_6798333787986989576 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6798333787986989576(target, text, options) {
    return playFrames(target, text, frames_6798333787986989576, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798333787986989576", "向下滑动", "出场", "slide", anim_6798333787986989576);


  const frames_6798332648814023181 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6798332648814023181(target, text, options) {
    return playFrames(target, text, frames_6798332648814023181, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332648814023181", "缩小", "出场", "zoom", anim_6798332648814023181);


  const frames_7347865496508699170 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7347865496508699170(target, text, options) {
    return playFrames(target, text, frames_7347865496508699170, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7347865496508699170", "玻璃爆开", "出场", "material", anim_7347865496508699170);


  const frames_7301943351320777267 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7301943351320777267(target, text, options) {
    return playFrames(target, text, frames_7301943351320777267, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7301943351320777267", "横向模糊", "出场", "blur", anim_7301943351320777267);


  const frames_7616276754021322003 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7616276754021322003(target, text, options) {
    return playFrames(target, text, frames_7616276754021322003, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7616276754021322003", "推近", "出场", "fade", anim_7616276754021322003);


  const frames_6798332801864176142 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6798332801864176142(target, text, options) {
    return playFrames(target, text, frames_6798332801864176142, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798332801864176142", "放大", "出场", "zoom", anim_6798332801864176142);


  const frames_6800268611807089166 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6800268611807089166(target, text, options) {
    return playFrames(target, text, frames_6800268611807089166, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6800268611807089166", "轻微放大", "出场", "zoom", anim_6800268611807089166);


  const frames_7569977390043286846 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7569977390043286846(target, text, options) {
    return playFrames(target, text, frames_7569977390043286846, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7569977390043286846", "卡片飞出", "出场", "slide", anim_7569977390043286846);


  const frames_7553626470992661785 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7553626470992661785(target, text, options) {
    return playFrames(target, text, frames_7553626470992661785, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7553626470992661785", "完全消散", "出场", "fade", anim_7553626470992661785);


  const frames_7305957010518839846 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7305957010518839846(target, text, options) {
    return playFrames(target, text, frames_7305957010518839846, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7305957010518839846", "飘散", "出场", "slide", anim_7305957010518839846);


  const frames_7647808347793624361 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7647808347793624361(target, text, options) {
    return playFrames(target, text, frames_7647808347793624361, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647808347793624361", "中心扯散", "出场", "zoom", anim_7647808347793624361);


  const frames_7452359860659687986 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7452359860659687986(target, text, options) {
    return playFrames(target, text, frames_7452359860659687986, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7452359860659687986", "翻出", "出场", "rotate", anim_7452359860659687986);


  const frames_7576200135227526462 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7576200135227526462(target, text, options) {
    return playFrames(target, text, frames_7576200135227526462, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7576200135227526462", "闭眼", "出场", "fade", anim_7576200135227526462);


  const frames_7603292328710737171 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7603292328710737171(target, text, options) {
    return playFrames(target, text, frames_7603292328710737171, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603292328710737171", "电视息屏", "出场", "glitch", anim_7603292328710737171);


  const frames_7186978468087730749 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7186978468087730749(target, text, options) {
    return playFrames(target, text, frames_7186978468087730749, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7186978468087730749", "闪现", "出场", "glow", anim_7186978468087730749);


  const frames_7647807962014092586 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647807962014092586(target, text, options) {
    return playFrames(target, text, frames_7647807962014092586, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647807962014092586", "暗流渐隐", "出场", "fade", anim_7647807962014092586);


  const frames_6738353628215513613 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6738353628215513613(target, text, options) {
    return playFrames(target, text, frames_6738353628215513613, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6738353628215513613", "镜像翻转", "出场", "rotate", anim_6738353628215513613);


  const frames_7446673724146717221 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7446673724146717221(target, text, options) {
    return playFrames(target, text, frames_7446673724146717221, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7446673724146717221", "魔法粒子II", "出场", "material", anim_7446673724146717221);


  const frames_7625909501278866697 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7625909501278866697(target, text, options) {
    return playFrames(target, text, frames_7625909501278866697, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625909501278866697", "下期再见", "出场", "fade", anim_7625909501278866697);


  const frames_7546507810352287038 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7546507810352287038(target, text, options) {
    return playFrames(target, text, frames_7546507810352287038, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7546507810352287038", "闪光闭幕", "出场", "glow", anim_7546507810352287038);


  const frames_7312343337199997450 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7312343337199997450(target, text, options) {
    return playFrames(target, text, frames_7312343337199997450, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7312343337199997450", "Kira游动", "出场", "fade", anim_7312343337199997450);


  const frames_7239273967310082621 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7239273967310082621(target, text, options) {
    return playFrames(target, text, frames_7239273967310082621, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7239273967310082621", "折叠闭幕", "出场", "rotate", anim_7239273967310082621);


  const frames_7547530087906954558 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7547530087906954558(target, text, options) {
    return playFrames(target, text, frames_7547530087906954558, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7547530087906954558", "屏闪消失", "出场", "glow", anim_7547530087906954558);


  const frames_7631882873829657862 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7631882873829657862(target, text, options) {
    return playFrames(target, text, frames_7631882873829657862, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631882873829657862", "退场Ⅴ", "出场", "fade", anim_7631882873829657862);


  const frames_7623350824328039690 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7623350824328039690(target, text, options) {
    return playFrames(target, text, frames_7623350824328039690, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623350824328039690", "点赞关注", "出场", "fade", anim_7623350824328039690);


  const frames_7210659943051956797 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7210659943051956797(target, text, options) {
    return playFrames(target, text, frames_7210659943051956797, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7210659943051956797", "斜切", "出场", "fade", anim_7210659943051956797);


  const frames_6942482728335970823 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6942482728335970823(target, text, options) {
    return playFrames(target, text, frames_6942482728335970823, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6942482728335970823", "旋转闭幕", "出场", "rotate", anim_6942482728335970823);


  const frames_7615089060666821913 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7615089060666821913(target, text, options) {
    return playFrames(target, text, frames_7615089060666821913, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615089060666821913", "未完待续", "出场", "fade", anim_7615089060666821913);


  const frames_7623349012489440521 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7623349012489440521(target, text, options) {
    return playFrames(target, text, frames_7623349012489440521, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623349012489440521", "欢迎咨询", "出场", "fade", anim_7623349012489440521);


  const frames_7482608787942067475 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7482608787942067475(target, text, options) {
    return playFrames(target, text, frames_7482608787942067475, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7482608787942067475", "神奇弹窗", "出场", "bounce", anim_7482608787942067475);


  const frames_6818747115934585357 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6818747115934585357(target, text, options) {
    return playFrames(target, text, frames_6818747115934585357, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6818747115934585357", "向上转出", "出场", "rotate", anim_6818747115934585357);


  const frames_7280420767378969143 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7280420767378969143(target, text, options) {
    return playFrames(target, text, frames_7280420767378969143, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7280420767378969143", "跳转闭幕", "出场", "bounce", anim_7280420767378969143);


  const frames_7283429462924857914 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7283429462924857914(target, text, options) {
    return playFrames(target, text, frames_7283429462924857914, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7283429462924857914", "老电视", "出场", "glitch", anim_7283429462924857914);


  const frames_7623350635466968370 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7623350635466968370(target, text, options) {
    return playFrames(target, text, frames_7623350635466968370, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623350635466968370", "落幕", "出场", "fade", anim_7623350635466968370);


  const frames_7604760011700555071 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7604760011700555071(target, text, options) {
    return playFrames(target, text, frames_7604760011700555071, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7604760011700555071", "圆环收缩", "出场", "zoom", anim_7604760011700555071);


  const frames_7447044440859873801 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7447044440859873801(target, text, options) {
    return playFrames(target, text, frames_7447044440859873801, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7447044440859873801", "灼烧出现", "出场", "fade", anim_7447044440859873801);


  const frames_6798334141323547143 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6798334141323547143(target, text, options) {
    return playFrames(target, text, frames_6798334141323547143, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6798334141323547143", "旋转", "出场", "rotate", anim_6798334141323547143);


  const frames_7448986761297924618 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7448986761297924618(target, text, options) {
    return playFrames(target, text, frames_7448986761297924618, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7448986761297924618", "幕布", "出场", "wipe", anim_7448986761297924618);


  const frames_7568879248623111486 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7568879248623111486(target, text, options) {
    return playFrames(target, text, frames_7568879248623111486, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7568879248623111486", "粉尘爆炸", "出场", "material", anim_7568879248623111486);


  const frames_7431509039437058586 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7431509039437058586(target, text, options) {
    return playFrames(target, text, frames_7431509039437058586, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7431509039437058586", "翻卡", "出场", "rotate", anim_7431509039437058586);


  const frames_6818747169017696781 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6818747169017696781(target, text, options) {
    return playFrames(target, text, frames_6818747169017696781, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6818747169017696781", "向上转出 II", "出场", "rotate", anim_6818747169017696781);


  const frames_6778418947361346061 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6778418947361346061(target, text, options) {
    return playFrames(target, text, frames_6778418947361346061, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6778418947361346061", "漩涡旋转", "出场", "rotate", anim_6778418947361346061);


  const frames_7441139691694330378 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7441139691694330378(target, text, options) {
    return playFrames(target, text, frames_7441139691694330378, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7441139691694330378", "金沙", "出场", "material", anim_7441139691694330378);


  const frames_7280797214186672701 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7280797214186672701(target, text, options) {
    return playFrames(target, text, frames_7280797214186672701, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7280797214186672701", "交错闭幕", "出场", "wipe", anim_7280797214186672701);


  const frames_7615190699872357657 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7615190699872357657(target, text, options) {
    return playFrames(target, text, frames_7615190699872357657, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615190699872357657", "拍立得甩出", "出场", "slide", anim_7615190699872357657);


  const frames_7447044440864068122 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7447044440864068122(target, text, options) {
    return playFrames(target, text, frames_7447044440864068122, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7447044440864068122", "冰雪融化", "出场", "material", anim_7447044440864068122);


  const frames_7648941965496814872 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7648941965496814872(target, text, options) {
    return playFrames(target, text, frames_7648941965496814872, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7648941965496814872", "长条升出", "出场", "fade", anim_7648941965496814872);


  const frames_7550992261094559000 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7550992261094559000(target, text, options) {
    return playFrames(target, text, frames_7550992261094559000, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7550992261094559000", "碎片掉落", "出场", "slide", anim_7550992261094559000);


  const frames_7448898555617497626 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7448898555617497626(target, text, options) {
    return playFrames(target, text, frames_7448898555617497626, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7448898555617497626", "画面擦除", "出场", "wipe", anim_7448898555617497626);


  const frames_7578712074256272664 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7578712074256272664(target, text, options) {
    return playFrames(target, text, frames_7578712074256272664, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578712074256272664", "剧终", "出场", "fade", anim_7578712074256272664);


  const frames_7648979759103266072 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7648979759103266072(target, text, options) {
    return playFrames(target, text, frames_7648979759103266072, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7648979759103266072", "窗格拼出", "出场", "fade", anim_7648979759103266072);


  const frames_7468589804356112946 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7468589804356112946(target, text, options) {
    return playFrames(target, text, frames_7468589804356112946, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7468589804356112946", "粒子爱心", "出场", "material", anim_7468589804356112946);


  const frames_7314925770181186075 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7314925770181186075(target, text, options) {
    return playFrames(target, text, frames_7314925770181186075, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314925770181186075", "弹远", "出场", "bounce", anim_7314925770181186075);


  const frames_7255599483226952249 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7255599483226952249(target, text, options) {
    return playFrames(target, text, frames_7255599483226952249, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7255599483226952249", "砸出波纹", "出场", "material", anim_7255599483226952249);


  const frames_7631883104889605382 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7631883104889605382(target, text, options) {
    return playFrames(target, text, frames_7631883104889605382, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631883104889605382", "退场Ⅵ", "出场", "fade", anim_7631883104889605382);


  const frames_7548303463390924056 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7548303463390924056(target, text, options) {
    return playFrames(target, text, frames_7548303463390924056, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7548303463390924056", "消散成花", "出场", "fade", anim_7548303463390924056);


  const frames_7446622476928291378 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7446622476928291378(target, text, options) {
    return playFrames(target, text, frames_7446622476928291378, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7446622476928291378", "魔法粒子I", "出场", "material", anim_7446622476928291378);


  const frames_7338638617322983976 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7338638617322983976(target, text, options) {
    return playFrames(target, text, frames_7338638617322983976, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7338638617322983976", "向下甩动", "出场", "slide", anim_7338638617322983976);


  const frames_7243999104114627132 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7243999104114627132(target, text, options) {
    return playFrames(target, text, frames_7243999104114627132, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7243999104114627132", "闪屏", "出场", "glow", anim_7243999104114627132);


  const frames_7296416099606729225 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7296416099606729225(target, text, options) {
    return playFrames(target, text, frames_7296416099606729225, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7296416099606729225", "快速翻页", "出场", "rotate", anim_7296416099606729225);


  const frames_7623349137211133230 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7623349137211133230(target, text, options) {
    return playFrames(target, text, frames_7623349137211133230, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623349137211133230", "退场Ⅱ", "出场", "fade", anim_7623349137211133230);


  const frames_7322073757080621606 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7322073757080621606(target, text, options) {
    return playFrames(target, text, frames_7322073757080621606, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7322073757080621606", "水墨", "出场", "material", anim_7322073757080621606);


  const frames_7379909625870553654 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7379909625870553654(target, text, options) {
    return playFrames(target, text, frames_7379909625870553654, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7379909625870553654", "脉冲", "出场", "fade", anim_7379909625870553654);


  const frames_7557643142468635966 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7557643142468635966(target, text, options) {
    return playFrames(target, text, frames_7557643142468635966, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7557643142468635966", "定格放大", "出场", "zoom", anim_7557643142468635966);


  const frames_7434746460182155827 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7434746460182155827(target, text, options) {
    return playFrames(target, text, frames_7434746460182155827, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434746460182155827", "分身模糊", "出场", "blur", anim_7434746460182155827);


  const frames_7611903831160392985 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7611903831160392985(target, text, options) {
    return playFrames(target, text, frames_7611903831160392985, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7611903831160392985", "云层隐没", "出场", "fade", anim_7611903831160392985);


  const frames_7153942002696983047 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7153942002696983047(target, text, options) {
    return playFrames(target, text, frames_7153942002696983047, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7153942002696983047", "抖动变焦", "出场", "wave_shake", anim_7153942002696983047);


  const frames_7623373276760247603 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7623373276760247603(target, text, options) {
    return playFrames(target, text, frames_7623373276760247603, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623373276760247603", "玻璃碎裂", "出场", "material", anim_7623373276760247603);


  const frames_7647823539868814611 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647823539868814611(target, text, options) {
    return playFrames(target, text, frames_7647823539868814611, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647823539868814611", "左右消散", "出场", "fade", anim_7647823539868814611);


  const frames_7574386412317953342 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7574386412317953342(target, text, options) {
    return playFrames(target, text, frames_7574386412317953342, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7574386412317953342", "粒子旋出", "出场", "rotate", anim_7574386412317953342);


  const frames_7248951676420231735 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7248951676420231735(target, text, options) {
    return playFrames(target, text, frames_7248951676420231735, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7248951676420231735", "画出爱心", "出场", "fade", anim_7248951676420231735);


  const frames_7540263073177881880 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7540263073177881880(target, text, options) {
    return playFrames(target, text, frames_7540263073177881880, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540263073177881880", "关机", "出场", "glitch", anim_7540263073177881880);


  const frames_7394730499492549158 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7394730499492549158(target, text, options) {
    return playFrames(target, text, frames_7394730499492549158, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7394730499492549158", "飞远", "出场", "fade", anim_7394730499492549158);


  const frames_7338742568592609801 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7338742568592609801(target, text, options) {
    return playFrames(target, text, frames_7338742568592609801, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7338742568592609801", "模糊聚焦", "出场", "blur", anim_7338742568592609801);


  const frames_7623349260628577574 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7623349260628577574(target, text, options) {
    return playFrames(target, text, frames_7623349260628577574, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623349260628577574", "退场", "出场", "fade", anim_7623349260628577574);


  const frames_7566252246116158782 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7566252246116158782(target, text, options) {
    return playFrames(target, text, frames_7566252246116158782, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566252246116158782", "拉扯撕裂", "出场", "fade", anim_7566252246116158782);


  const frames_7565425621887716633 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7565425621887716633(target, text, options) {
    return playFrames(target, text, frames_7565425621887716633, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7565425621887716633", "故障退出", "出场", "glitch", anim_7565425621887716633);


  const frames_7381753028732260916 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7381753028732260916(target, text, options) {
    return playFrames(target, text, frames_7381753028732260916, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7381753028732260916", "旋转圆球", "出场", "rotate", anim_7381753028732260916);


  const frames_7645248627568430390 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7645248627568430390(target, text, options) {
    return playFrames(target, text, frames_7645248627568430390, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645248627568430390", "金粒弥散", "出场", "fade", anim_7645248627568430390);


  const frames_7547644842315353368 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7547644842315353368(target, text, options) {
    return playFrames(target, text, frames_7547644842315353368, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7547644842315353368", "燃烧闭幕", "出场", "wipe", anim_7547644842315353368);


  const frames_7631881433480449316 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7631881433480449316(target, text, options) {
    return playFrames(target, text, frames_7631881433480449316, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631881433480449316", "干扰熄屏", "出场", "glitch", anim_7631881433480449316);


  const frames_7647808161662946601 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7647808161662946601(target, text, options) {
    return playFrames(target, text, frames_7647808161662946601, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647808161662946601", "闪光消散", "出场", "glow", anim_7647808161662946601);


  const frames_7616256374338620696 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7616256374338620696(target, text, options) {
    return playFrames(target, text, frames_7616256374338620696, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7616256374338620696", "赛博消失", "出场", "glitch", anim_7616256374338620696);


  const frames_7612573022892969259 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7612573022892969259(target, text, options) {
    return playFrames(target, text, frames_7612573022892969259, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7612573022892969259", "心形收缩", "出场", "zoom", anim_7612573022892969259);


  const frames_7625909319795559731 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7625909319795559731(target, text, options) {
    return playFrames(target, text, frames_7625909319795559731, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625909319795559731", "感谢关注", "出场", "fade", anim_7625909319795559731);


  const frames_7596973067298000169 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7596973067298000169(target, text, options) {
    return playFrames(target, text, frames_7596973067298000169, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7596973067298000169", "闭帘", "出场", "wipe", anim_7596973067298000169);


  const frames_7634047100388543768 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7634047100388543768(target, text, options) {
    return playFrames(target, text, frames_7634047100388543768, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7634047100388543768", "关闭页面", "出场", "fade", anim_7634047100388543768);


  const frames_7625909107299519782 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7625909107299519782(target, text, options) {
    return playFrames(target, text, frames_7625909107299519782, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625909107299519782", "退场Ⅲ", "出场", "fade", anim_7625909107299519782);


  const frames_7585510695362432280 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7585510695362432280(target, text, options) {
    return playFrames(target, text, frames_7585510695362432280, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7585510695362432280", "点击收回", "出场", "fade", anim_7585510695362432280);


  const frames_7640168456759069976 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7640168456759069976(target, text, options) {
    return playFrames(target, text, frames_7640168456759069976, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7640168456759069976", "干扰闭幕", "出场", "glitch", anim_7640168456759069976);


  const frames_7450031573958660617 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7450031573958660617(target, text, options) {
    return playFrames(target, text, frames_7450031573958660617, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7450031573958660617", "变速扩大", "出场", "zoom", anim_7450031573958660617);


  const frames_7631882863444512042 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7631882863444512042(target, text, options) {
    return playFrames(target, text, frames_7631882863444512042, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631882863444512042", "退场Ⅳ", "出场", "fade", anim_7631882863444512042);


  const frames_7596973533637446975 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7596973533637446975(target, text, options) {
    return playFrames(target, text, frames_7596973533637446975, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7596973533637446975", "碎片散开", "出场", "material", anim_7596973533637446975);


  const frames_7312341715220697650 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7312341715220697650(target, text, options) {
    return playFrames(target, text, frames_7312341715220697650, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7312341715220697650", "向上滚动", "出场", "slide", anim_7312341715220697650);


  const frames_7316816362305753609 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7316816362305753609(target, text, options) {
    return playFrames(target, text, frames_7316816362305753609, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7316816362305753609", "扫描", "出场", "fade", anim_7316816362305753609);


  const frames_7582080330979364158 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7582080330979364158(target, text, options) {
    return playFrames(target, text, frames_7582080330979364158, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7582080330979364158", "折纸飞机", "出场", "rotate", anim_7582080330979364158);


  const frames_7221420528148419133 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7221420528148419133(target, text, options) {
    return playFrames(target, text, frames_7221420528148419133, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7221420528148419133", "折叠", "出场", "rotate", anim_7221420528148419133);


  const frames_7369889275233440265 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7369889275233440265(target, text, options) {
    return playFrames(target, text, frames_7369889275233440265, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7369889275233440265", "拼图", "出场", "fade", anim_7369889275233440265);


  const frames_7581795911148457241 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7581795911148457241(target, text, options) {
    return playFrames(target, text, frames_7581795911148457241, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7581795911148457241", "冰冻破碎", "出场", "fade", anim_7581795911148457241);


  const frames_7273389599978689079 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7273389599978689079(target, text, options) {
    return playFrames(target, text, frames_7273389599978689079, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7273389599978689079", "向上闪出", "出场", "glow", anim_7273389599978689079);


  const frames_7114172789287817758 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7114172789287817758(target, text, options) {
    return playFrames(target, text, frames_7114172789287817758, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7114172789287817758", "拉丝滑出", "出场", "slide", anim_7114172789287817758);


  const frames_7329445038604161536 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7329445038604161536(target, text, options) {
    return playFrames(target, text, frames_7329445038604161536, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7329445038604161536", "多层环形", "出场", "fade", anim_7329445038604161536);


  const frames_7395482925006852647 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7395482925006852647(target, text, options) {
    return playFrames(target, text, frames_7395482925006852647, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7395482925006852647", "迷幻流光", "出场", "glow", anim_7395482925006852647);


  const frames_7298918355841323529 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7298918355841323529(target, text, options) {
    return playFrames(target, text, frames_7298918355841323529, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7298918355841323529", "空间扭曲", "出场", "fade", anim_7298918355841323529);


  const frames_7536515679831248153 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7536515679831248153(target, text, options) {
    return playFrames(target, text, frames_7536515679831248153, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7536515679831248153", "翻转掉落", "出场", "rotate", anim_7536515679831248153);


  const frames_7604761085920529718 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7604761085920529718(target, text, options) {
    return playFrames(target, text, frames_7604761085920529718, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7604761085920529718", "菱形收缩", "出场", "zoom", anim_7604761085920529718);


  const frames_7641155596368022820 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7641155596368022820(target, text, options) {
    return playFrames(target, text, frames_7641155596368022820, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641155596368022820", "光点聚散", "出场", "fade", anim_7641155596368022820);


  const frames_7597326082978712856 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7597326082978712856(target, text, options) {
    return playFrames(target, text, frames_7597326082978712856, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7597326082978712856", "纵向对折", "出场", "rotate", anim_7597326082978712856);


  const frames_7449596462645662235 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7449596462645662235(target, text, options) {
    return playFrames(target, text, frames_7449596462645662235, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449596462645662235", "多维空间", "出场", "fade", anim_7449596462645662235);


  const frames_7246706359381529125 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7246706359381529125(target, text, options) {
    return playFrames(target, text, frames_7246706359381529125, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7246706359381529125", "转圈圈", "出场", "rotate", anim_7246706359381529125);


  const frames_7265946879060349477 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7265946879060349477(target, text, options) {
    return playFrames(target, text, frames_7265946879060349477, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265946879060349477", "抖动横移", "出场", "wave_shake", anim_7265946879060349477);


  const frames_7586251208097123609 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7586251208097123609(target, text, options) {
    return playFrames(target, text, frames_7586251208097123609, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7586251208097123609", "照片飞出", "出场", "slide", anim_7586251208097123609);


  const frames_7447351620637037106 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7447351620637037106(target, text, options) {
    return playFrames(target, text, frames_7447351620637037106, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7447351620637037106", "滑片滑动", "出场", "slide", anim_7447351620637037106);


  const frames_7554746664024542526 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7554746664024542526(target, text, options) {
    return playFrames(target, text, frames_7554746664024542526, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7554746664024542526", "条状消失", "出场", "fade", anim_7554746664024542526);


  const frames_7588070909232254232 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7588070909232254232(target, text, options) {
    return playFrames(target, text, frames_7588070909232254232, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7588070909232254232", "纸片飘散", "出场", "slide", anim_7588070909232254232);


  const frames_7595809684611943704 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7595809684611943704(target, text, options) {
    return playFrames(target, text, frames_7595809684611943704, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7595809684611943704", "圆筒滚出", "出场", "rotate", anim_7595809684611943704);


  const frames_7569436103837797657 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7569436103837797657(target, text, options) {
    return playFrames(target, text, frames_7569436103837797657, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7569436103837797657", "缓缓推开", "出场", "slide", anim_7569436103837797657);


  const frames_7446306392748593714 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7446306392748593714(target, text, options) {
    return playFrames(target, text, frames_7446306392748593714, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7446306392748593714", "2025", "出场", "fade", anim_7446306392748593714);


  const frames_7578433789739912510 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7578433789739912510(target, text, options) {
    return playFrames(target, text, frames_7578433789739912510, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578433789739912510", "拉开窗帘", "出场", "slide", anim_7578433789739912510);


  const frames_7436273288608748058 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7436273288608748058(target, text, options) {
    return playFrames(target, text, frames_7436273288608748058, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288608748058", "枫叶遮罩", "出场", "wipe", anim_7436273288608748058);


  const frames_7549080076919246116 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7549080076919246116(target, text, options) {
    return playFrames(target, text, frames_7549080076919246116, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7549080076919246116", "流沙漩涡2", "出场", "fade", anim_7549080076919246116);


  const frames_7328249133079204352 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7328249133079204352(target, text, options) {
    return playFrames(target, text, frames_7328249133079204352, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7328249133079204352", "爱心碰撞", "出场", "fade", anim_7328249133079204352);


  const frames_7618530326826110232 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7618530326826110232(target, text, options) {
    return playFrames(target, text, frames_7618530326826110232, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7618530326826110232", "纸张燃烧", "出场", "material", anim_7618530326826110232);


  const frames_7226632692354257445 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7226632692354257445(target, text, options) {
    return playFrames(target, text, frames_7226632692354257445, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7226632692354257445", "划水", "出场", "fade", anim_7226632692354257445);


  const frames_7289005562124046907 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7289005562124046907(target, text, options) {
    return playFrames(target, text, frames_7289005562124046907, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7289005562124046907", "震波 III", "出场", "wave_shake", anim_7289005562124046907);


  const frames_7581026123107110168 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7581026123107110168(target, text, options) {
    return playFrames(target, text, frames_7581026123107110168, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7581026123107110168", "螺旋消失", "出场", "rotate", anim_7581026123107110168);


  const frames_7346510998771077659 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7346510998771077659(target, text, options) {
    return playFrames(target, text, frames_7346510998771077659, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7346510998771077659", "发光矩形", "出场", "glow", anim_7346510998771077659);


  const frames_7572548358804491545 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7572548358804491545(target, text, options) {
    return playFrames(target, text, frames_7572548358804491545, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572548358804491545", "折叠闭合", "出场", "rotate", anim_7572548358804491545);


  const frames_7397378784028004891 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7397378784028004891(target, text, options) {
    return playFrames(target, text, frames_7397378784028004891, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7397378784028004891", "玫瑰", "出场", "fade", anim_7397378784028004891);


  const frames_7437386424036381211 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7437386424036381211(target, text, options) {
    return playFrames(target, text, frames_7437386424036381211, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7437386424036381211", "卡片扫光", "出场", "glow", anim_7437386424036381211);


  const frames_7628146983580159257 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7628146983580159257(target, text, options) {
    return playFrames(target, text, frames_7628146983580159257, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7628146983580159257", "对角拉扯", "出场", "fade", anim_7628146983580159257);


  const frames_7476426636267752730 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7476426636267752730(target, text, options) {
    return playFrames(target, text, frames_7476426636267752730, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7476426636267752730", "卡片出场", "出场", "fade", anim_7476426636267752730);


  const frames_7405509410396574242 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7405509410396574242(target, text, options) {
    return playFrames(target, text, frames_7405509410396574242, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7405509410396574242", "立方合体", "出场", "fade", anim_7405509410396574242);


  const frames_7441475431309513254 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7441475431309513254(target, text, options) {
    return playFrames(target, text, frames_7441475431309513254, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7441475431309513254", "水滴遮罩", "出场", "wipe", anim_7441475431309513254);


  const frames_7647809468423490858 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7647809468423490858(target, text, options) {
    return playFrames(target, text, frames_7647809468423490858, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647809468423490858", "订阅滑出", "出场", "slide", anim_7647809468423490858);


  const frames_7259341241031070268 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7259341241031070268(target, text, options) {
    return playFrames(target, text, frames_7259341241031070268, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7259341241031070268", "分屏翻转", "出场", "rotate", anim_7259341241031070268);


  const frames_7360531353458184715 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7360531353458184715(target, text, options) {
    return playFrames(target, text, frames_7360531353458184715, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7360531353458184715", "斜向拉丝", "出场", "fade", anim_7360531353458184715);


  const frames_7223227564670587452 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7223227564670587452(target, text, options) {
    return playFrames(target, text, frames_7223227564670587452, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7223227564670587452", "交叉震动", "出场", "wave_shake", anim_7223227564670587452);


  const frames_7602518052806233406 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7602518052806233406(target, text, options) {
    return playFrames(target, text, frames_7602518052806233406, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7602518052806233406", "截取关屏", "出场", "fade", anim_7602518052806233406);


  const frames_7588764519481167128 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7588764519481167128(target, text, options) {
    return playFrames(target, text, frames_7588764519481167128, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7588764519481167128", "纸条撕开", "出场", "fade", anim_7588764519481167128);


  const frames_7322857522648322586 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7322857522648322586(target, text, options) {
    return playFrames(target, text, frames_7322857522648322586, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7322857522648322586", "流金", "出场", "fade", anim_7322857522648322586);


  const frames_7645244610914127110 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7645244610914127110(target, text, options) {
    return playFrames(target, text, frames_7645244610914127110, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645244610914127110", "爆炸冲击", "出场", "fade", anim_7645244610914127110);


  const frames_7588921870007946520 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7588921870007946520(target, text, options) {
    return playFrames(target, text, frames_7588921870007946520, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7588921870007946520", "折纸关闭", "出场", "rotate", anim_7588921870007946520);


  const frames_7551599705868832024 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7551599705868832024(target, text, options) {
    return playFrames(target, text, frames_7551599705868832024, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7551599705868832024", "抽出纸张", "出场", "fade", anim_7551599705868832024);


  const frames_7449589619038884389 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7449589619038884389(target, text, options) {
    return playFrames(target, text, frames_7449589619038884389, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449589619038884389", "报纸拼贴", "出场", "fade", anim_7449589619038884389);


  const frames_7579861213103033625 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7579861213103033625(target, text, options) {
    return playFrames(target, text, frames_7579861213103033625, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579861213103033625", "海报飘走", "出场", "slide", anim_7579861213103033625);


  const frames_7634206628580953406 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7634206628580953406(target, text, options) {
    return playFrames(target, text, frames_7634206628580953406, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7634206628580953406", "扫光出场", "出场", "glow", anim_7634206628580953406);


  const frames_7468589970832232997 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7468589970832232997(target, text, options) {
    return playFrames(target, text, frames_7468589970832232997, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7468589970832232997", "手写云朵", "出场", "material", anim_7468589970832232997);


  const frames_7550651205689543960 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7550651205689543960(target, text, options) {
    return playFrames(target, text, frames_7550651205689543960, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7550651205689543960", "网格消退", "出场", "fade", anim_7550651205689543960);


  const frames_7633730925632720147 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":-19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7633730925632720147(target, text, options) {
    return playFrames(target, text, frames_7633730925632720147, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633730925632720147", "旋转下落", "出场", "rotate", anim_7633730925632720147);


  const frames_7562882805303135550 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7562882805303135550(target, text, options) {
    return playFrames(target, text, frames_7562882805303135550, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7562882805303135550", "卷纸收拢", "出场", "fade", anim_7562882805303135550);


  const frames_7584784988906900798 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7584784988906900798(target, text, options) {
    return playFrames(target, text, frames_7584784988906900798, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7584784988906900798", "回忆翻出", "出场", "rotate", anim_7584784988906900798);


  const frames_7610340361176763710 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7610340361176763710(target, text, options) {
    return playFrames(target, text, frames_7610340361176763710, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7610340361176763710", "电脑关屏", "出场", "fade", anim_7610340361176763710);


  const frames_7564699528847215897 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7564699528847215897(target, text, options) {
    return playFrames(target, text, frames_7564699528847215897, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7564699528847215897", "九宫格滑出", "出场", "slide", anim_7564699528847215897);


  const frames_7645245356107730239 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7645245356107730239(target, text, options) {
    return playFrames(target, text, frames_7645245356107730239, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645245356107730239", "暖金消散", "出场", "fade", anim_7645245356107730239);


  const frames_7647807590251973924 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647807590251973924(target, text, options) {
    return playFrames(target, text, frames_7647807590251973924, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647807590251973924", "星尘塌缩", "出场", "fade", anim_7647807590251973924);


  const frames_7626412771726560536 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7626412771726560536(target, text, options) {
    return playFrames(target, text, frames_7626412771726560536, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7626412771726560536", "邮寄信封", "出场", "fade", anim_7626412771726560536);


  const frames_7641527203074985241 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7641527203074985241(target, text, options) {
    return playFrames(target, text, frames_7641527203074985241, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641527203074985241", "下课", "出场", "fade", anim_7641527203074985241);


  const frames_7347994415576650255 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7347994415576650255(target, text, options) {
    return playFrames(target, text, frames_7347994415576650255, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7347994415576650255", "荧光爆闪", "出场", "glow", anim_7347994415576650255);


  const frames_7647810036760186118 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647810036760186118(target, text, options) {
    return playFrames(target, text, frames_7647810036760186118, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647810036760186118", "高光扭曲", "出场", "fade", anim_7647810036760186118);


  const frames_7581678448519941438 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7581678448519941438(target, text, options) {
    return playFrames(target, text, frames_7581678448519941438, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7581678448519941438", "纸张飘出", "出场", "slide", anim_7581678448519941438);


  const frames_7569261005101010238 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7569261005101010238(target, text, options) {
    return playFrames(target, text, frames_7569261005101010238, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7569261005101010238", "砖块飞出", "出场", "slide", anim_7569261005101010238);


  const frames_7413731112406487604 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7413731112406487604(target, text, options) {
    return playFrames(target, text, frames_7413731112406487604, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7413731112406487604", "冰块", "出场", "fade", anim_7413731112406487604);


  const frames_7647808670297754916 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7647808670297754916(target, text, options) {
    return playFrames(target, text, frames_7647808670297754916, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647808670297754916", "激光旋散", "出场", "rotate", anim_7647808670297754916);


  const frames_7606180580861988158 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7606180580861988158(target, text, options) {
    return playFrames(target, text, frames_7606180580861988158, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7606180580861988158", "撕开", "出场", "fade", anim_7606180580861988158);


  const frames_7603668360039075096 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7603668360039075096(target, text, options) {
    return playFrames(target, text, frames_7603668360039075096, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603668360039075096", "飘散成雪", "出场", "slide", anim_7603668360039075096);


  const frames_7215555273501446716 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7215555273501446716(target, text, options) {
    return playFrames(target, text, frames_7215555273501446716, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7215555273501446716", "冲撞", "出场", "fade", anim_7215555273501446716);


  const frames_7569211577233067289 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7569211577233067289(target, text, options) {
    return playFrames(target, text, frames_7569211577233067289, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7569211577233067289", "卷轴闭卷", "出场", "fade", anim_7569211577233067289);


  const frames_7647811442162339135 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647811442162339135(target, text, options) {
    return playFrames(target, text, frames_7647811442162339135, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647811442162339135", "过爆消散", "出场", "fade", anim_7647811442162339135);


  const frames_7589472401487023384 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7589472401487023384(target, text, options) {
    return playFrames(target, text, frames_7589472401487023384, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7589472401487023384", "延迟翻出", "出场", "rotate", anim_7589472401487023384);


  const frames_7432237078710063643 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7432237078710063643(target, text, options) {
    return playFrames(target, text, frames_7432237078710063643, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7432237078710063643", "PASSION", "出场", "fade", anim_7432237078710063643);


  const frames_7596967656348093720 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7596967656348093720(target, text, options) {
    return playFrames(target, text, frames_7596967656348093720, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7596967656348093720", "圆形转出", "出场", "rotate", anim_7596967656348093720);


  const frames_7615083292370521406 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7615083292370521406(target, text, options) {
    return playFrames(target, text, frames_7615083292370521406, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615083292370521406", "闪白滑出", "出场", "glow", anim_7615083292370521406);


  const frames_7641153886782360851 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7641153886782360851(target, text, options) {
    return playFrames(target, text, frames_7641153886782360851, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641153886782360851", "四方散开", "出场", "fade", anim_7641153886782360851);


  const frames_7647827696218639670 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7647827696218639670(target, text, options) {
    return playFrames(target, text, frames_7647827696218639670, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647827696218639670", "模糊收缩", "出场", "blur", anim_7647827696218639670);


  const frames_7572182435245329688 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7572182435245329688(target, text, options) {
    return playFrames(target, text, frames_7572182435245329688, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572182435245329688", "程序崩溃", "出场", "fade", anim_7572182435245329688);


  const frames_7645235221142457619 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7645235221142457619(target, text, options) {
    return playFrames(target, text, frames_7645235221142457619, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645235221142457619", "金箔爆发", "出场", "fade", anim_7645235221142457619);


  const frames_7435897594074632730 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7435897594074632730(target, text, options) {
    return playFrames(target, text, frames_7435897594074632730, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7435897594074632730", "探灯聚焦", "出场", "blur", anim_7435897594074632730);


  const frames_7647808981028670726 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7647808981028670726(target, text, options) {
    return playFrames(target, text, frames_7647808981028670726, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647808981028670726", "涟漪扩散", "出场", "material", anim_7647808981028670726);


  const frames_7405495700961628683 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7405495700961628683(target, text, options) {
    return playFrames(target, text, frames_7405495700961628683, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7405495700961628683", "镜面拆分", "出场", "fade", anim_7405495700961628683);


  const frames_7257879855063110205 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7257879855063110205(target, text, options) {
    return playFrames(target, text, frames_7257879855063110205, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7257879855063110205", "分屏横移", "出场", "fade", anim_7257879855063110205);


  const frames_7305961286762762790 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7305961286762762790(target, text, options) {
    return playFrames(target, text, frames_7305961286762762790, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7305961286762762790", "色散波纹", "出场", "material", anim_7305961286762762790);


  const frames_7434412782293881395 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7434412782293881395(target, text, options) {
    return playFrames(target, text, frames_7434412782293881395, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434412782293881395", "三屏切闪", "出场", "glow", anim_7434412782293881395);


  const frames_7158753896624558628 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7158753896624558628(target, text, options) {
    return playFrames(target, text, frames_7158753896624558628, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7158753896624558628", "曝光放射", "出场", "glow", anim_7158753896624558628);


  const frames_7641154691421769023 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7641154691421769023(target, text, options) {
    return playFrames(target, text, frames_7641154691421769023, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641154691421769023", "多屏缩小", "出场", "zoom", anim_7641154691421769023);


  const frames_7582472535976234265 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7582472535976234265(target, text, options) {
    return playFrames(target, text, frames_7582472535976234265, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7582472535976234265", "环屏旋出", "出场", "rotate", anim_7582472535976234265);


  const frames_7537219527583567166 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7537219527583567166(target, text, options) {
    return playFrames(target, text, frames_7537219527583567166, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7537219527583567166", "循环歌", "循环", "fade", anim_7537219527583567166);


  const frames_7237411357514011192 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7237411357514011192(target, text, options) {
    return playFrames(target, text, frames_7237411357514011192, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7237411357514011192", "打字光标", "入场", "typewriter", anim_7237411357514011192);


  const frames_7199943069385364005 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7199943069385364005(target, text, options) {
    return playFrames(target, text, frames_7199943069385364005, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7199943069385364005", "呐喊声波", "入场", "wave_shake", anim_7199943069385364005);


  const frames_7123116334677758501 = [{"t":0,"opacity":0,"x":0.0,"y":74,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7123116334677758501(target, text, options) {
    return playFrames(target, text, frames_7123116334677758501, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7123116334677758501", "向上弹入", "入场", "bounce", anim_7123116334677758501);


  const frames_6724920249654710791 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_6724920249654710791(target, text, options) {
    return playFrames(target, text, frames_6724920249654710791, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920249654710791", "打字机 I", "入场", "typewriter", anim_6724920249654710791);


  const frames_6724916044072227332 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724916044072227332(target, text, options) {
    return playFrames(target, text, frames_6724916044072227332, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724916044072227332", "渐显", "入场", "fade", anim_6724916044072227332);


  const frames_7112368349257929230 = [{"t":0,"opacity":0,"x":-46.800000000000004,"y":0.0,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7112368349257929230(target, text, options) {
    return playFrames(target, text, frames_7112368349257929230, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112368349257929230", "向左模糊", "入场", "blur", anim_7112368349257929230);


  const frames_7210312869282320933 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7210312869282320933(target, text, options) {
    return playFrames(target, text, frames_7210312869282320933, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7210312869282320933", "生长 II", "入场", "zoom", anim_7210312869282320933);


  const frames_7649608820582403371 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649608820582403371(target, text, options) {
    return playFrames(target, text, frames_7649608820582403371, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649608820582403371", "左滑入场", "入场", "slide", anim_7649608820582403371);


  const frames_7649610910620732678 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649610910620732678(target, text, options) {
    return playFrames(target, text, frames_7649610910620732678, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649610910620732678", "左滑渐显", "入场", "slide", anim_7649610910620732678);


  const frames_7237409385092223525 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7237409385092223525(target, text, options) {
    return playFrames(target, text, frames_7237409385092223525, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7237409385092223525", "打字机IV", "入场", "typewriter", anim_7237409385092223525);


  const frames_7649611256521018660 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649611256521018660(target, text, options) {
    return playFrames(target, text, frames_7649611256521018660, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649611256521018660", "逐字显现2", "入场", "per_char", anim_7649611256521018660);


  const frames_7229520427196879421 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7229520427196879421(target, text, options) {
    return playFrames(target, text, frames_7229520427196879421, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7229520427196879421", "逐字旋入", "入场", "per_char", anim_7229520427196879421);


  const frames_7649345579545300230 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649345579545300230(target, text, options) {
    return playFrames(target, text, frames_7649345579545300230, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649345579545300230", "文字渐显", "入场", "fade", anim_7649345579545300230);


  const frames_7649349911854468394 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649349911854468394(target, text, options) {
    return playFrames(target, text, frames_7649349911854468394, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649349911854468394", "淡入文字", "入场", "fade", anim_7649349911854468394);


  const frames_6887482184844710413 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6887482184844710413(target, text, options) {
    return playFrames(target, text, frames_6887482184844710413, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6887482184844710413", "弹入", "入场", "bounce", anim_6887482184844710413);


  const frames_7184797276181631546 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7184797276181631546(target, text, options) {
    return playFrames(target, text, frames_7184797276181631546, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7184797276181631546", "弹入跳动", "入场", "bounce", anim_7184797276181631546);


  const frames_7267849370727354936 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.34,"rotate":0,"blur":5,"skewX":0,"clip":1,"glow":0},{"t":0.36,"opacity":1,"x":-7,"y":-2,"scale":1.22,"rotate":-2,"blur":0,"skewX":-3,"clip":1,"glow":0.2},{"t":0.56,"opacity":1,"x":8,"y":2,"scale":0.96,"rotate":2,"blur":0,"skewX":3,"clip":1,"glow":0.1},{"t":0.78,"opacity":1,"x":-3,"y":0,"scale":1.05,"rotate":-1,"blur":0,"skewX":-1,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7267849370727354936(target, text, options) {
    return playFrames(target, text, frames_7267849370727354936, Object.assign({
      split: "whole",
      duration: 920,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7267849370727354936", "放大震动", "入场", "zoom_shake", anim_7267849370727354936);


  const frames_7254503374622560828 = [{"t":0,"opacity":0,"x":46.800000000000004,"y":0.0,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7254503374622560828(target, text, options) {
    return playFrames(target, text, frames_7254503374622560828, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7254503374622560828", "向右模糊 II", "入场", "blur", anim_7254503374622560828);


  const frames_6724920136056181256 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724920136056181256(target, text, options) {
    return playFrames(target, text, frames_6724920136056181256, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920136056181256", "向右滑动", "入场", "slide", anim_6724920136056181256);


  const frames_7041836555903701540 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7041836555903701540(target, text, options) {
    return playFrames(target, text, frames_7041836555903701540, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7041836555903701540", "缩小 II", "入场", "zoom", anim_7041836555903701540);


  const frames_7598109111246458166 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598109111246458166(target, text, options) {
    return playFrames(target, text, frames_7598109111246458166, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598109111246458166", "重磅来袭", "入场", "fade", anim_7598109111246458166);


  const frames_7029231035007111710 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7029231035007111710(target, text, options) {
    return playFrames(target, text, frames_7029231035007111710, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7029231035007111710", "飞入", "入场", "slide", anim_7029231035007111710);


  const frames_7179035729043919397 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7179035729043919397(target, text, options) {
    return playFrames(target, text, frames_7179035729043919397, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7179035729043919397", "圆柱体滚动", "入场", "slide", anim_7179035729043919397);


  const frames_6835571502050447879 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6835571502050447879(target, text, options) {
    return playFrames(target, text, frames_6835571502050447879, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6835571502050447879", "开幕", "入场", "wipe", anim_6835571502050447879);


  const frames_6763470195894784525 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763470195894784525(target, text, options) {
    return playFrames(target, text, frames_6763470195894784525, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763470195894784525", "向左滑动", "入场", "slide", anim_6763470195894784525);


  const frames_7649348859323272491 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649348859323272491(target, text, options) {
    return playFrames(target, text, frames_7649348859323272491, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649348859323272491", "文字淡入", "入场", "fade", anim_7649348859323272491);


  const frames_7644864061150170409 = [{"t":0,"opacity":0,"x":0.0,"y":74,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644864061150170409(target, text, options) {
    return playFrames(target, text, frames_7644864061150170409, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644864061150170409", "向上弹入", "入场", "bounce", anim_7644864061150170409);


  const frames_7646332180620250422 = [{"t":0,"opacity":0,"x":0.0,"y":-38,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646332180620250422(target, text, options) {
    return playFrames(target, text, frames_7646332180620250422, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646332180620250422", "上下跳跃", "入场", "bounce", anim_7646332180620250422);


  const frames_6724919499042066958 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724919499042066958(target, text, options) {
    return playFrames(target, text, frames_6724919499042066958, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724919499042066958", "放大", "入场", "zoom", anim_6724919499042066958);


  const frames_7278295995362841145 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7278295995362841145(target, text, options) {
    return playFrames(target, text, frames_7278295995362841145, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7278295995362841145", "水墨晕开", "入场", "material", anim_7278295995362841145);


  const frames_7301945752278798885 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7301945752278798885(target, text, options) {
    return playFrames(target, text, frames_7301945752278798885, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7301945752278798885", "抖动甩入", "入场", "slide", anim_7301945752278798885);


  const frames_7258179345192063525 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7258179345192063525(target, text, options) {
    return playFrames(target, text, frames_7258179345192063525, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7258179345192063525", "辉光", "入场", "glow", anim_7258179345192063525);


  const frames_7220685840442200634 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7220685840442200634(target, text, options) {
    return playFrames(target, text, frames_7220685840442200634, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7220685840442200634", "跃进", "入场", "fade", anim_7220685840442200634);


  const frames_7163514612690719269 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163514612690719269(target, text, options) {
    return playFrames(target, text, frames_7163514612690719269, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163514612690719269", "向左露出", "入场", "fade", anim_7163514612690719269);


  const frames_6779879712261935619 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6779879712261935619(target, text, options) {
    return playFrames(target, text, frames_6779879712261935619, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6779879712261935619", "收拢", "入场", "fade", anim_6779879712261935619);


  const frames_7268221856618910264 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7268221856618910264(target, text, options) {
    return playFrames(target, text, frames_7268221856618910264, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268221856618910264", "顶出", "入场", "fade", anim_7268221856618910264);


  const frames_7330561002922054196 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7330561002922054196(target, text, options) {
    return playFrames(target, text, frames_7330561002922054196, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7330561002922054196", "金粉飘落", "入场", "slide", anim_7330561002922054196);


  const frames_7426692611907374371 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426692611907374371(target, text, options) {
    return playFrames(target, text, frames_7426692611907374371, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426692611907374371", "向下溶解", "入场", "fade", anim_7426692611907374371);


  const frames_7265222187286532667 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7265222187286532667(target, text, options) {
    return playFrames(target, text, frames_7265222187286532667, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265222187286532667", "居中打字", "入场", "typewriter", anim_7265222187286532667);


  const frames_7038882772450021896 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7038882772450021896(target, text, options) {
    return playFrames(target, text, frames_7038882772450021896, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7038882772450021896", "逐字显影", "入场", "per_char", anim_7038882772450021896);


  const frames_7314291622525538843 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7314291622525538843(target, text, options) {
    return playFrames(target, text, frames_7314291622525538843, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314291622525538843", "冰雪飘动", "入场", "slide", anim_7314291622525538843);


  const frames_7547995673447173386 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7547995673447173386(target, text, options) {
    return playFrames(target, text, frames_7547995673447173386, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7547995673447173386", "光标打字", "入场", "typewriter", anim_7547995673447173386);


  const frames_7426685617498639616 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426685617498639616(target, text, options) {
    return playFrames(target, text, frames_7426685617498639616, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426685617498639616", "滚入", "入场", "fade", anim_7426685617498639616);


  const frames_7244102679851438650 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102679851438650(target, text, options) {
    return playFrames(target, text, frames_7244102679851438650, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102679851438650", "甩出", "入场", "slide", anim_7244102679851438650);


  const frames_6917178744775905806 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6917178744775905806(target, text, options) {
    return playFrames(target, text, frames_6917178744775905806, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6917178744775905806", "波浪弹入", "入场", "bounce", anim_6917178744775905806);


  const frames_7317536986691015218 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7317536986691015218(target, text, options) {
    return playFrames(target, text, frames_7317536986691015218, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7317536986691015218", "波浪弹跳", "入场", "bounce", anim_7317536986691015218);


  const frames_7563556046032178458 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7563556046032178458(target, text, options) {
    return playFrames(target, text, frames_7563556046032178458, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7563556046032178458", "逐字颤动", "入场", "per_char", anim_7563556046032178458);


  const frames_7644899695126498603 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7644899695126498603(target, text, options) {
    return playFrames(target, text, frames_7644899695126498603, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644899695126498603", "<打字机", "入场", "typewriter", anim_7644899695126498603);


  const frames_6884154692398486023 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6884154692398486023(target, text, options) {
    return playFrames(target, text, frames_6884154692398486023, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6884154692398486023", "弹簧", "入场", "bounce", anim_6884154692398486023);


  const frames_6724920636403094028 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_6724920636403094028(target, text, options) {
    return playFrames(target, text, frames_6724920636403094028, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920636403094028", "打字机 II", "入场", "typewriter", anim_6724920636403094028);


  const frames_7644899930351340842 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644899930351340842(target, text, options) {
    return playFrames(target, text, frames_7644899930351340842, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644899930351340842", "弹入", "入场", "bounce", anim_7644899930351340842);


  const frames_7309036302962266675 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7309036302962266675(target, text, options) {
    return playFrames(target, text, frames_7309036302962266675, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7309036302962266675", "星光闪闪", "入场", "glow", anim_7309036302962266675);


  const frames_7231443875406025275 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7231443875406025275(target, text, options) {
    return playFrames(target, text, frames_7231443875406025275, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7231443875406025275", "随机落下", "入场", "fade", anim_7231443875406025275);


  const frames_7313890082040058406 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7313890082040058406(target, text, options) {
    return playFrames(target, text, frames_7313890082040058406, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7313890082040058406", "左移弹动", "入场", "bounce", anim_7313890082040058406);


  const frames_7308278898330964489 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308278898330964489(target, text, options) {
    return playFrames(target, text, frames_7308278898330964489, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308278898330964489", "翻动", "入场", "rotate", anim_7308278898330964489);


  const frames_7244102612700631589 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102612700631589(target, text, options) {
    return playFrames(target, text, frames_7244102612700631589, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102612700631589", "激光雕刻", "入场", "fade", anim_7244102612700631589);


  const frames_7197615431673188921 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7197615431673188921(target, text, options) {
    return playFrames(target, text, frames_7197615431673188921, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7197615431673188921", "逐字弹跳", "入场", "per_char", anim_7197615431673188921);


  const frames_7338602211041088027 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7338602211041088027(target, text, options) {
    return playFrames(target, text, frames_7338602211041088027, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7338602211041088027", "碰碰车", "入场", "fade", anim_7338602211041088027);


  const frames_6872642398095151629 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642398095151629(target, text, options) {
    return playFrames(target, text, frames_6872642398095151629, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642398095151629", "溶解", "入场", "fade", anim_6872642398095151629);


  const frames_7253888335163167291 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7253888335163167291(target, text, options) {
    return playFrames(target, text, frames_7253888335163167291, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7253888335163167291", "复古打字机", "入场", "typewriter", anim_7253888335163167291);


  const frames_7264501462187643450 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7264501462187643450(target, text, options) {
    return playFrames(target, text, frames_7264501462187643450, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7264501462187643450", "模糊滚动", "入场", "blur", anim_7264501462187643450);


  const frames_7548386061429345574 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7548386061429345574(target, text, options) {
    return playFrames(target, text, frames_7548386061429345574, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7548386061429345574", "星光流转", "入场", "rotate", anim_7548386061429345574);


  const frames_6775803763652301326 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6775803763652301326(target, text, options) {
    return playFrames(target, text, frames_6775803763652301326, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6775803763652301326", "旋转飞入", "入场", "rotate", anim_6775803763652301326);


  const frames_7074854080388010532 = [{"t":0,"opacity":0,"x":18.0,"y":18,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7074854080388010532(target, text, options) {
    return playFrames(target, text, frames_7074854080388010532, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7074854080388010532", "右上弹入", "入场", "bounce", anim_7074854080388010532);


  const frames_7043778124760224292 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7043778124760224292(target, text, options) {
    return playFrames(target, text, frames_7043778124760224292, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7043778124760224292", "向右缓入", "入场", "fade", anim_7043778124760224292);


  const frames_7125298122011447816 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7125298122011447816(target, text, options) {
    return playFrames(target, text, frames_7125298122011447816, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7125298122011447816", "折叠", "入场", "rotate", anim_7125298122011447816);


  const frames_7577609492850822463 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577609492850822463(target, text, options) {
    return playFrames(target, text, frames_7577609492850822463, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577609492850822463", "透视滑入", "入场", "slide", anim_7577609492850822463);


  const frames_7296051582246851109 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7296051582246851109(target, text, options) {
    return playFrames(target, text, frames_7296051582246851109, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7296051582246851109", "电光", "入场", "fade", anim_7296051582246851109);


  const frames_6872642189260755463 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642189260755463(target, text, options) {
    return playFrames(target, text, frames_6872642189260755463, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642189260755463", "弹性伸缩", "入场", "bounce", anim_6872642189260755463);


  const frames_7078586233030447629 = [{"t":0,"opacity":0,"x":-18.0,"y":18,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7078586233030447629(target, text, options) {
    return playFrames(target, text, frames_7078586233030447629, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7078586233030447629", "左上弹入", "入场", "bounce", anim_7078586233030447629);


  const frames_6926718978064650760 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_6926718978064650760(target, text, options) {
    return playFrames(target, text, frames_6926718978064650760, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6926718978064650760", "随机打字机", "入场", "typewriter", anim_6926718978064650760);


  const frames_7073363357775958558 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7073363357775958558(target, text, options) {
    return playFrames(target, text, frames_7073363357775958558, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7073363357775958558", "故障", "入场", "glitch", anim_7073363357775958558);


  const frames_7233662263805088314 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7233662263805088314(target, text, options) {
    return playFrames(target, text, frames_7233662263805088314, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7233662263805088314", "随机上升", "入场", "fade", anim_7233662263805088314);


  const frames_6763470111253729803 = [{"t":0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763470111253729803(target, text, options) {
    return playFrames(target, text, frames_6763470111253729803, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763470111253729803", "向上滑动", "入场", "slide", anim_6763470111253729803);


  const frames_6869302248103481869 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6869302248103481869(target, text, options) {
    return playFrames(target, text, frames_6869302248103481869, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6869302248103481869", "生长", "入场", "zoom", anim_6869302248103481869);


  const frames_7120438380453696031 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7120438380453696031(target, text, options) {
    return playFrames(target, text, frames_7120438380453696031, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7120438380453696031", "吸入", "入场", "fade", anim_7120438380453696031);


  const frames_7307189517562155547 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7307189517562155547(target, text, options) {
    return playFrames(target, text, frames_7307189517562155547, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7307189517562155547", "星星弹跳", "入场", "bounce", anim_7307189517562155547);


  const frames_7261858654561767973 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7261858654561767973(target, text, options) {
    return playFrames(target, text, frames_7261858654561767973, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7261858654561767973", "环绕滑入", "入场", "slide", anim_7261858654561767973);


  const frames_7089261793406620197 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7089261793406620197(target, text, options) {
    return playFrames(target, text, frames_7089261793406620197, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7089261793406620197", "扭曲模糊", "入场", "blur", anim_7089261793406620197);


  const frames_7081206983461704199 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7081206983461704199(target, text, options) {
    return playFrames(target, text, frames_7081206983461704199, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7081206983461704199", "向右集合", "入场", "fade", anim_7081206983461704199);


  const frames_7294147761765618186 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7294147761765618186(target, text, options) {
    return playFrames(target, text, frames_7294147761765618186, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7294147761765618186", "模糊缩小", "入场", "blur", anim_7294147761765618186);


  const frames_7205177922280231479 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7205177922280231479(target, text, options) {
    return playFrames(target, text, frames_7205177922280231479, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7205177922280231479", "慢速放大", "入场", "zoom", anim_7205177922280231479);


  const frames_7268152375536259639 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7268152375536259639(target, text, options) {
    return playFrames(target, text, frames_7268152375536259639, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268152375536259639", "预览打字", "入场", "typewriter", anim_7268152375536259639);


  const frames_7265288917279052344 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7265288917279052344(target, text, options) {
    return playFrames(target, text, frames_7265288917279052344, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265288917279052344", "站起", "入场", "fade", anim_7265288917279052344);


  const frames_7088531060341871141 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7088531060341871141(target, text, options) {
    return playFrames(target, text, frames_7088531060341871141, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7088531060341871141", "晕开", "入场", "fade", anim_7088531060341871141);


  const frames_7054482687297327630 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7054482687297327630(target, text, options) {
    return playFrames(target, text, frames_7054482687297327630, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7054482687297327630", "发光模糊", "入场", "blur", anim_7054482687297327630);


  const frames_7306794354255860250 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7306794354255860250(target, text, options) {
    return playFrames(target, text, frames_7306794354255860250, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7306794354255860250", "背景滑入", "入场", "slide", anim_7306794354255860250);


  const frames_7243633588493619773 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7243633588493619773(target, text, options) {
    return playFrames(target, text, frames_7243633588493619773, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7243633588493619773", "旋转缩放", "入场", "rotate", anim_7243633588493619773);


  const frames_7163514358935327268 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163514358935327268(target, text, options) {
    return playFrames(target, text, frames_7163514358935327268, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163514358935327268", "向上露出", "入场", "fade", anim_7163514358935327268);


  const frames_7244102915239973432 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102915239973432(target, text, options) {
    return playFrames(target, text, frames_7244102915239973432, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102915239973432", "拖尾", "入场", "fade", anim_7244102915239973432);


  const frames_7647445314877623595 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647445314877623595(target, text, options) {
    return playFrames(target, text, frames_7647445314877623595, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647445314877623595", "金粉拉开", "入场", "slide", anim_7647445314877623595);


  const frames_7244101806710592057 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7244101806710592057(target, text, options) {
    return playFrames(target, text, frames_7244101806710592057, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244101806710592057", "故障闪动", "入场", "glitch", anim_7244101806710592057);


  const frames_6845191009861636616 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6845191009861636616(target, text, options) {
    return playFrames(target, text, frames_6845191009861636616, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6845191009861636616", "爱心弹跳", "入场", "bounce", anim_6845191009861636616);


  const frames_7112241904216969765 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7112241904216969765(target, text, options) {
    return playFrames(target, text, frames_7112241904216969765, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112241904216969765", "逐字翻转", "入场", "per_char", anim_7112241904216969765);


  const frames_6724921217721045515 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724921217721045515(target, text, options) {
    return playFrames(target, text, frames_6724921217721045515, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724921217721045515", "缩小", "入场", "zoom", anim_6724921217721045515);


  const frames_7532031334781390107 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7532031334781390107(target, text, options) {
    return playFrames(target, text, frames_7532031334781390107, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7532031334781390107", "脉冲光束", "入场", "fade", anim_7532031334781390107);


  const frames_7426691156135677224 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691156135677224(target, text, options) {
    return playFrames(target, text, frames_7426691156135677224, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691156135677224", "汇聚", "入场", "fade", anim_7426691156135677224);


  const frames_7314614905196253705 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7314614905196253705(target, text, options) {
    return playFrames(target, text, frames_7314614905196253705, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314614905196253705", "雪光模糊", "入场", "blur", anim_7314614905196253705);


  const frames_6779084126457696776 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6779084126457696776(target, text, options) {
    return playFrames(target, text, frames_6779084126457696776, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6779084126457696776", "日出", "入场", "fade", anim_6779084126457696776);


  const frames_7088942186561016356 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7088942186561016356(target, text, options) {
    return playFrames(target, text, frames_7088942186561016356, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7088942186561016356", "向下飞入", "入场", "slide", anim_7088942186561016356);


  const frames_7301535952101446170 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7301535952101446170(target, text, options) {
    return playFrames(target, text, frames_7301535952101446170, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7301535952101446170", "模糊发光", "入场", "blur", anim_7301535952101446170);


  const frames_7647442111515741446 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647442111515741446(target, text, options) {
    return playFrames(target, text, frames_7647442111515741446, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647442111515741446", "青粒牵引", "入场", "fade", anim_7647442111515741446);


  const frames_7591385159539133739 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7591385159539133739(target, text, options) {
    return playFrames(target, text, frames_7591385159539133739, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7591385159539133739", "数字撕裂", "入场", "fade", anim_7591385159539133739);


  const frames_6724921985282871816 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724921985282871816(target, text, options) {
    return playFrames(target, text, frames_6724921985282871816, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724921985282871816", "向下滑动", "入场", "slide", anim_6724921985282871816);


  const frames_7647442470346788138 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647442470346788138(target, text, options) {
    return playFrames(target, text, frames_7647442470346788138, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647442470346788138", "蓝瓣划入", "入场", "fade", anim_7647442470346788138);


  const frames_7114189305781686797 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7114189305781686797(target, text, options) {
    return playFrames(target, text, frames_7114189305781686797, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7114189305781686797", "随机弹跳 II", "入场", "bounce", anim_7114189305781686797);


  const frames_7526837424761163034 = [{"t":0,"opacity":0,"x":0.0,"y":74,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7526837424761163034(target, text, options) {
    return playFrames(target, text, frames_7526837424761163034, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7526837424761163034", "向上弹出", "入场", "bounce", anim_7526837424761163034);


  const frames_7307207886843679283 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7307207886843679283(target, text, options) {
    return playFrames(target, text, frames_7307207886843679283, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7307207886843679283", "便利贴", "入场", "fade", anim_7307207886843679283);


  const frames_7051512227353858590 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7051512227353858590(target, text, options) {
    return playFrames(target, text, frames_7051512227353858590, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7051512227353858590", "水平翻转", "入场", "rotate", anim_7051512227353858590);


  const frames_7163514730525495839 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163514730525495839(target, text, options) {
    return playFrames(target, text, frames_7163514730525495839, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163514730525495839", "向右露出", "入场", "fade", anim_7163514730525495839);


  const frames_7649607616137563398 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649607616137563398(target, text, options) {
    return playFrames(target, text, frames_7649607616137563398, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649607616137563398", "模糊入场2", "入场", "blur", anim_7649607616137563398);


  const frames_7649347190267071807 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649347190267071807(target, text, options) {
    return playFrames(target, text, frames_7649347190267071807, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649347190267071807", "故障抖动", "入场", "glitch", anim_7649347190267071807);


  const frames_7272754730684650045 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_7272754730684650045(target, text, options) {
    return playFrames(target, text, frames_7272754730684650045, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7272754730684650045", "新年打字机", "入场", "typewriter", anim_7272754730684650045);


  const frames_6870061463243854350 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_6870061463243854350(target, text, options) {
    return playFrames(target, text, frames_6870061463243854350, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6870061463243854350", "故障打字机", "入场", "typewriter", anim_6870061463243854350);


  const frames_6763873859402732039 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763873859402732039(target, text, options) {
    return playFrames(target, text, frames_6763873859402732039, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763873859402732039", "旋入", "入场", "rotate", anim_6763873859402732039);


  const frames_7116829842271638053 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7116829842271638053(target, text, options) {
    return playFrames(target, text, frames_7116829842271638053, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7116829842271638053", "缤纷冲屏", "入场", "fade", anim_7116829842271638053);


  const frames_7579093455083736374 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7579093455083736374(target, text, options) {
    return playFrames(target, text, frames_7579093455083736374, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579093455083736374", "弹幕入场", "入场", "bounce", anim_7579093455083736374);


  const frames_7598107928222092598 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598107928222092598(target, text, options) {
    return playFrames(target, text, frames_7598107928222092598, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598107928222092598", "文字旋入", "入场", "rotate", anim_7598107928222092598);


  const frames_6897084292908716557 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6897084292908716557(target, text, options) {
    return playFrames(target, text, frames_6897084292908716557, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6897084292908716557", "羽化向左擦开", "入场", "fade", anim_6897084292908716557);


  const frames_6862897343176380942 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6862897343176380942(target, text, options) {
    return playFrames(target, text, frames_6862897343176380942, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6862897343176380942", "弹弓", "入场", "bounce", anim_6862897343176380942);


  const frames_7211036012401660473 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7211036012401660473(target, text, options) {
    return playFrames(target, text, frames_7211036012401660473, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7211036012401660473", "缩放 III", "入场", "zoom", anim_7211036012401660473);


  const frames_6865175746420150792 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6865175746420150792(target, text, options) {
    return playFrames(target, text, frames_6865175746420150792, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6865175746420150792", "空翻", "入场", "rotate", anim_6865175746420150792);


  const frames_7644886170391956799 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644886170391956799(target, text, options) {
    return playFrames(target, text, frames_7644886170391956799, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644886170391956799", "横掠焰光", "入场", "fade", anim_7644886170391956799);


  const frames_6897084405781631496 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6897084405781631496(target, text, options) {
    return playFrames(target, text, frames_6897084405781631496, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6897084405781631496", "羽化向右擦开", "入场", "fade", anim_6897084405781631496);


  const frames_7163514502128865823 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163514502128865823(target, text, options) {
    return playFrames(target, text, frames_7163514502128865823, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163514502128865823", "向下露出", "入场", "fade", anim_7163514502128865823);


  const frames_7120131223036367367 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7120131223036367367(target, text, options) {
    return playFrames(target, text, frames_7120131223036367367, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7120131223036367367", "喷绘", "入场", "fade", anim_7120131223036367367);


  const frames_7649350540693933354 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649350540693933354(target, text, options) {
    return playFrames(target, text, frames_7649350540693933354, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649350540693933354", "变形入场", "入场", "fade", anim_7649350540693933354);


  const frames_7314566361642963493 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7314566361642963493(target, text, options) {
    return playFrames(target, text, frames_7314566361642963493, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314566361642963493", "流光扩散", "入场", "glow", anim_7314566361642963493);


  const frames_6763469998330483213 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763469998330483213(target, text, options) {
    return playFrames(target, text, frames_6763469998330483213, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763469998330483213", "轻微放大", "入场", "zoom", anim_6763469998330483213);


  const frames_6923094735116571150 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6923094735116571150(target, text, options) {
    return playFrames(target, text, frames_6923094735116571150, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6923094735116571150", "模糊", "入场", "blur", anim_6923094735116571150);


  const frames_7238519092997526074 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7238519092997526074(target, text, options) {
    return playFrames(target, text, frames_7238519092997526074, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7238519092997526074", "二段缩放", "入场", "zoom", anim_7238519092997526074);


  const frames_7644887196079508778 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644887196079508778(target, text, options) {
    return playFrames(target, text, frames_7644887196079508778, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644887196079508778", "光波扩散", "入场", "fade", anim_7644887196079508778);


  const frames_7170343439832191519 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7170343439832191519(target, text, options) {
    return playFrames(target, text, frames_7170343439832191519, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7170343439832191519", "翻页II", "入场", "rotate", anim_7170343439832191519);


  const frames_7194703971498332727 = [{"t":0,"opacity":0,"x":0.0,"y":19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7194703971498332727(target, text, options) {
    return playFrames(target, text, frames_7194703971498332727, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7194703971498332727", "向上翻转", "入场", "rotate", anim_7194703971498332727);


  const frames_7077500533040222756 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7077500533040222756(target, text, options) {
    return playFrames(target, text, frames_7077500533040222756, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7077500533040222756", "向上重叠", "入场", "fade", anim_7077500533040222756);


  const frames_7644883044037446954 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644883044037446954(target, text, options) {
    return playFrames(target, text, frames_7644883044037446954, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644883044037446954", "金粉飘入", "入场", "slide", anim_7644883044037446954);


  const frames_7540968058714688819 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7540968058714688819(target, text, options) {
    return playFrames(target, text, frames_7540968058714688819, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540968058714688819", "兔子跳跃", "入场", "bounce", anim_7540968058714688819);


  const frames_7299364098788037171 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7299364098788037171(target, text, options) {
    return playFrames(target, text, frames_7299364098788037171, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7299364098788037171", "电光 II", "入场", "fade", anim_7299364098788037171);


  const frames_7088576340361744903 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7088576340361744903(target, text, options) {
    return playFrames(target, text, frames_7088576340361744903, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7088576340361744903", "右下擦开", "入场", "fade", anim_7088576340361744903);


  const frames_6724920521462387207 = [{"t":0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15}];
  function anim_6724920521462387207(target, text, options) {
    return playFrames(target, text, frames_6724920521462387207, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920521462387207", "打字机 III", "入场", "typewriter", anim_6724920521462387207);


  const frames_6841115718172283406 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6841115718172283406(target, text, options) {
    return playFrames(target, text, frames_6841115718172283406, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6841115718172283406", "音符弹跳", "入场", "bounce", anim_6841115718172283406);


  const frames_7332519885999706663 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7332519885999706663(target, text, options) {
    return playFrames(target, text, frames_7332519885999706663, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7332519885999706663", "心动瞬间", "入场", "fade", anim_7332519885999706663);


  const frames_7538330883162508570 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7538330883162508570(target, text, options) {
    return playFrames(target, text, frames_7538330883162508570, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538330883162508570", "烟花爆破", "入场", "fade", anim_7538330883162508570);


  const frames_7035902226602136071 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7035902226602136071(target, text, options) {
    return playFrames(target, text, frames_7035902226602136071, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7035902226602136071", "闪动", "入场", "glow", anim_7035902226602136071);


  const frames_6840689010034086407 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6840689010034086407(target, text, options) {
    return playFrames(target, text, frames_6840689010034086407, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6840689010034086407", "圆形扫描", "入场", "fade", anim_6840689010034086407);


  const frames_7649347736285744427 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649347736285744427(target, text, options) {
    return playFrames(target, text, frames_7649347736285744427, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649347736285744427", "波纹抖动", "入场", "wave_shake", anim_7649347736285744427);


  const frames_7308272646913790490 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308272646913790490(target, text, options) {
    return playFrames(target, text, frames_7308272646913790490, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308272646913790490", "弹性伸缩 II", "入场", "bounce", anim_7308272646913790490);


  const frames_7187785892382118461 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7187785892382118461(target, text, options) {
    return playFrames(target, text, frames_7187785892382118461, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7187785892382118461", "兔子弹跳", "入场", "bounce", anim_7187785892382118461);


  const frames_6771288500240126478 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6771288500240126478(target, text, options) {
    return playFrames(target, text, frames_6771288500240126478, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6771288500240126478", "向右擦除", "入场", "wipe", anim_6771288500240126478);


  const frames_7426685437122497827 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426685437122497827(target, text, options) {
    return playFrames(target, text, frames_7426685437122497827, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426685437122497827", "随机弹跳", "入场", "bounce", anim_7426685437122497827);


  const frames_7649610560803245375 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649610560803245375(target, text, options) {
    return playFrames(target, text, frames_7649610560803245375, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649610560803245375", "文字入场", "入场", "fade", anim_7649610560803245375);


  const frames_7649348571803684139 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649348571803684139(target, text, options) {
    return playFrames(target, text, frames_7649348571803684139, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649348571803684139", "字符归位", "入场", "fade", anim_7649348571803684139);


  const frames_7540970607614233906 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7540970607614233906(target, text, options) {
    return playFrames(target, text, frames_7540970607614233906, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540970607614233906", "蝴蝶穿梭", "入场", "fade", anim_7540970607614233906);


  const frames_7275687883011265083 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7275687883011265083(target, text, options) {
    return playFrames(target, text, frames_7275687883011265083, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7275687883011265083", "滑动上升", "入场", "slide", anim_7275687883011265083);


  const frames_7111643562676064805 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7111643562676064805(target, text, options) {
    return playFrames(target, text, frames_7111643562676064805, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7111643562676064805", "逐字旋转", "入场", "per_char", anim_7111643562676064805);


  const frames_7267886380439573029 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7267886380439573029(target, text, options) {
    return playFrames(target, text, frames_7267886380439573029, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7267886380439573029", "闪烁集合", "入场", "glow", anim_7267886380439573029);


  const frames_7649609779660197126 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649609779660197126(target, text, options) {
    return playFrames(target, text, frames_7649609779660197126, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649609779660197126", "光晕逐落", "入场", "fade", anim_7649609779660197126);


  const frames_7316878401590006323 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7316878401590006323(target, text, options) {
    return playFrames(target, text, frames_7316878401590006323, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7316878401590006323", "辉光扫描", "入场", "glow", anim_7316878401590006323);


  const frames_6774626192990409224 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6774626192990409224(target, text, options) {
    return playFrames(target, text, frames_6774626192990409224, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774626192990409224", "向下擦除", "入场", "wipe", anim_6774626192990409224);


  const frames_7649611302968593718 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649611302968593718(target, text, options) {
    return playFrames(target, text, frames_7649611302968593718, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649611302968593718", "烟火炸旋", "入场", "rotate", anim_7649611302968593718);


  const frames_7647445685704330532 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647445685704330532(target, text, options) {
    return playFrames(target, text, frames_7647445685704330532, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647445685704330532", "环绕消失", "入场", "fade", anim_7647445685704330532);


  const frames_7319873264375829001 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7319873264375829001(target, text, options) {
    return playFrames(target, text, frames_7319873264375829001, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7319873264375829001", "星光闪闪 II", "入场", "glow", anim_7319873264375829001);


  const frames_7311620091060163082 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7311620091060163082(target, text, options) {
    return playFrames(target, text, frames_7311620091060163082, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7311620091060163082", "镂空跳入", "入场", "bounce", anim_7311620091060163082);


  const frames_6774625910067827212 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6774625910067827212(target, text, options) {
    return playFrames(target, text, frames_6774625910067827212, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774625910067827212", "向上擦除", "入场", "wipe", anim_6774625910067827212);


  const frames_7078181271393800711 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7078181271393800711(target, text, options) {
    return playFrames(target, text, frames_7078181271393800711, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7078181271393800711", "冲屏位移", "入场", "fade", anim_7078181271393800711);


  const frames_7308269965453300262 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308269965453300262(target, text, options) {
    return playFrames(target, text, frames_7308269965453300262, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308269965453300262", "描边填充", "入场", "fade", anim_7308269965453300262);


  const frames_7325648367747338802 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7325648367747338802(target, text, options) {
    return playFrames(target, text, frames_7325648367747338802, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7325648367747338802", "乱码故障", "入场", "glitch", anim_7325648367747338802);


  const frames_7644861404075265286 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644861404075265286(target, text, options) {
    return playFrames(target, text, frames_7644861404075265286, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644861404075265286", "文字描边", "入场", "fade", anim_7644861404075265286);


  const frames_7649608279999384875 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649608279999384875(target, text, options) {
    return playFrames(target, text, frames_7649608279999384875, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649608279999384875", "光效聚合", "入场", "fade", anim_7649608279999384875);


  const frames_6771294855785091588 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6771294855785091588(target, text, options) {
    return playFrames(target, text, frames_6771294855785091588, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6771294855785091588", "卡拉OK", "入场", "fade", anim_6771294855785091588);


  const frames_7314303157360661018 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7314303157360661018(target, text, options) {
    return playFrames(target, text, frames_7314303157360661018, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7314303157360661018", "倒数", "入场", "fade", anim_7314303157360661018);


  const frames_7308272157442707978 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308272157442707978(target, text, options) {
    return playFrames(target, text, frames_7308272157442707978, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308272157442707978", "发光闪入", "入场", "glow", anim_7308272157442707978);


  const frames_6799873891352187406 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6799873891352187406(target, text, options) {
    return playFrames(target, text, frames_6799873891352187406, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6799873891352187406", "螺旋上升", "入场", "rotate", anim_6799873891352187406);


  const frames_7649606528764235049 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649606528764235049(target, text, options) {
    return playFrames(target, text, frames_7649606528764235049, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649606528764235049", "逐字显现", "入场", "per_char", anim_7649606528764235049);


  const frames_6774626830038077960 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6774626830038077960(target, text, options) {
    return playFrames(target, text, frames_6774626830038077960, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774626830038077960", "向左擦除", "入场", "wipe", anim_6774626830038077960);


  const frames_7223959789175312954 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7223959789175312954(target, text, options) {
    return playFrames(target, text, frames_7223959789175312954, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7223959789175312954", "随机集合", "入场", "fade", anim_7223959789175312954);


  const frames_7577607541652344083 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577607541652344083(target, text, options) {
    return playFrames(target, text, frames_7577607541652344083, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577607541652344083", "嘻哈之王", "入场", "fade", anim_7577607541652344083);


  const frames_7644900726191279403 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644900726191279403(target, text, options) {
    return playFrames(target, text, frames_7644900726191279403, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644900726191279403", "逐行拉伸", "入场", "bounce", anim_7644900726191279403);


  const frames_7646323232479431942 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646323232479431942(target, text, options) {
    return playFrames(target, text, frames_7646323232479431942, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646323232479431942", "多影分身", "入场", "fade", anim_7646323232479431942);


  const frames_7039655272222036516 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7039655272222036516(target, text, options) {
    return playFrames(target, text, frames_7039655272222036516, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7039655272222036516", "彩色映射", "入场", "fade", anim_7039655272222036516);


  const frames_7329815894933115432 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7329815894933115432(target, text, options) {
    return playFrames(target, text, frames_7329815894933115432, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7329815894933115432", "跳跳糖", "入场", "bounce", anim_7329815894933115432);


  const frames_7504922014591765799 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7504922014591765799(target, text, options) {
    return playFrames(target, text, frames_7504922014591765799, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7504922014591765799", "粒子汇聚", "入场", "material", anim_7504922014591765799);


  const frames_7571804707077819686 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7571804707077819686(target, text, options) {
    return playFrames(target, text, frames_7571804707077819686, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7571804707077819686", "金辉交织", "入场", "fade", anim_7571804707077819686);


  const frames_6872642542765085191 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642542765085191(target, text, options) {
    return playFrames(target, text, frames_6872642542765085191, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642542765085191", "随机飞入", "入场", "slide", anim_6872642542765085191);


  const frames_7397306443147252233 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7397306443147252233(target, text, options) {
    return playFrames(target, text, frames_7397306443147252233, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7397306443147252233", "变色输入", "入场", "fade", anim_7397306443147252233);


  const frames_7340513927651922458 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7340513927651922458(target, text, options) {
    return playFrames(target, text, frames_7340513927651922458, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7340513927651922458", "色散拖影", "入场", "blur", anim_7340513927651922458);


  const frames_7350128013637325353 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7350128013637325353(target, text, options) {
    return playFrames(target, text, frames_7350128013637325353, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7350128013637325353", "鼠标点击", "入场", "fade", anim_7350128013637325353);


  const frames_7591387991982017834 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7591387991982017834(target, text, options) {
    return playFrames(target, text, frames_7591387991982017834, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7591387991982017834", "科技重组", "入场", "fade", anim_7591387991982017834);


  const frames_7649346628196846889 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649346628196846889(target, text, options) {
    return playFrames(target, text, frames_7649346628196846889, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649346628196846889", "变形抖动", "入场", "wave_shake", anim_7649346628196846889);


  const frames_7259634012774208059 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7259634012774208059(target, text, options) {
    return playFrames(target, text, frames_7259634012774208059, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7259634012774208059", "叠影并入", "入场", "fade", anim_7259634012774208059);


  const frames_7591386992278015238 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7591386992278015238(target, text, options) {
    return playFrames(target, text, frames_7591386992278015238, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7591386992278015238", "烟花绽放", "入场", "fade", anim_7591386992278015238);


  const frames_7548385953153305894 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7548385953153305894(target, text, options) {
    return playFrames(target, text, frames_7548385953153305894, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7548385953153305894", "礼花粒子", "入场", "material", anim_7548385953153305894);


  const frames_7644884166827347206 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644884166827347206(target, text, options) {
    return playFrames(target, text, frames_7644884166827347206, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644884166827347206", "焰尘上浮", "入场", "fade", anim_7644884166827347206);


  const frames_7538326518154530057 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7538326518154530057(target, text, options) {
    return playFrames(target, text, frames_7538326518154530057, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538326518154530057", "彩虹渐变", "入场", "fade", anim_7538326518154530057);


  const frames_7644887612578221366 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644887612578221366(target, text, options) {
    return playFrames(target, text, frames_7644887612578221366, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644887612578221366", "蓝芒瞬烁", "入场", "fade", anim_7644887612578221366);


  const frames_7582867276718673215 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7582867276718673215(target, text, options) {
    return playFrames(target, text, frames_7582867276718673215, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7582867276718673215", "喜庆开场", "入场", "fade", anim_7582867276718673215);


  const frames_7538326933243841843 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7538326933243841843(target, text, options) {
    return playFrames(target, text, frames_7538326933243841843, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538326933243841843", "风扇旋转", "入场", "rotate", anim_7538326933243841843);


  const frames_7644865023902338358 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7644865023902338358(target, text, options) {
    return playFrames(target, text, frames_7644865023902338358, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644865023902338358", "焰火发射", "入场", "fade", anim_7644865023902338358);


  const frames_7646331537545317651 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646331537545317651(target, text, options) {
    return playFrames(target, text, frames_7646331537545317651, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646331537545317651", "旋转归位", "入场", "rotate", anim_7646331537545317651);


  const frames_7200340219109839419 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7200340219109839419(target, text, options) {
    return playFrames(target, text, frames_7200340219109839419, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7200340219109839419", "跳跳捣蛋鬼", "入场", "bounce", anim_7200340219109839419);


  const frames_7121986743141667358 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7121986743141667358(target, text, options) {
    return playFrames(target, text, frames_7121986743141667358, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7121986743141667358", "吸出", "出场", "fade", anim_7121986743141667358);


  const frames_7155790075794559525 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7155790075794559525(target, text, options) {
    return playFrames(target, text, frames_7155790075794559525, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7155790075794559525", "消散", "出场", "fade", anim_7155790075794559525);


  const frames_7254503584732025381 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":-46.800000000000004,"y":0.0,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7254503584732025381(target, text, options) {
    return playFrames(target, text, frames_7254503584732025381, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7254503584732025381", "向左模糊 II", "出场", "blur", anim_7254503584732025381);


  const frames_6763873602476446221 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_6763873602476446221(target, text, options) {
    return playFrames(target, text, frames_6763873602476446221, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763873602476446221", "向左滑动", "出场", "slide", anim_6763873602476446221);


  const frames_7649346133369556243 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649346133369556243(target, text, options) {
    return playFrames(target, text, frames_7649346133369556243, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649346133369556243", "文字淡出", "出场", "fade", anim_7649346133369556243);


  const frames_7142816577971294734 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7142816577971294734(target, text, options) {
    return playFrames(target, text, frames_7142816577971294734, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7142816577971294734", "炸开", "出场", "fade", anim_7142816577971294734);


  const frames_7127158940151845390 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":-38,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7127158940151845390(target, text, options) {
    return playFrames(target, text, frames_7127158940151845390, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7127158940151845390", "向下弹出", "出场", "bounce", anim_7127158940151845390);


  const frames_7589597953845759268 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7589597953845759268(target, text, options) {
    return playFrames(target, text, frames_7589597953845759268, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7589597953845759268", "撕裂分割", "出场", "fade", anim_7589597953845759268);


  const frames_6724919382104871427 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6724919382104871427(target, text, options) {
    return playFrames(target, text, frames_6724919382104871427, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724919382104871427", "渐隐", "出场", "fade", anim_6724919382104871427);


  const frames_6763873533115240968 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6763873533115240968(target, text, options) {
    return playFrames(target, text, frames_6763873533115240968, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763873533115240968", "向上滑动", "出场", "slide", anim_6763873533115240968);


  const frames_7268231069768356408 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7268231069768356408(target, text, options) {
    return playFrames(target, text, frames_7268231069768356408, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268231069768356408", "顶出", "出场", "fade", anim_7268231069768356408);


  const frames_7112703727336690189 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":-46.800000000000004,"y":0.0,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7112703727336690189(target, text, options) {
    return playFrames(target, text, frames_7112703727336690189, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112703727336690189", "向左模糊", "出场", "blur", anim_7112703727336690189);


  const frames_7268214314022998588 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7268214314022998588(target, text, options) {
    return playFrames(target, text, frames_7268214314022998588, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268214314022998588", "收缩震动", "出场", "zoom", anim_7268214314022998588);


  const frames_6869302139584254477 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6869302139584254477(target, text, options) {
    return playFrames(target, text, frames_6869302139584254477, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6869302139584254477", "生长", "出场", "zoom", anim_6869302139584254477);


  const frames_6763873732143354376 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6763873732143354376(target, text, options) {
    return playFrames(target, text, frames_6763873732143354376, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763873732143354376", "旋出", "出场", "rotate", anim_6763873732143354376);


  const frames_7023684709737566728 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7023684709737566728(target, text, options) {
    return playFrames(target, text, frames_7023684709737566728, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7023684709737566728", "滚出", "出场", "fade", anim_7023684709737566728);


  const frames_7198395913948107301 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":-19.599999999999998,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7198395913948107301(target, text, options) {
    return playFrames(target, text, frames_7198395913948107301, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7198395913948107301", "向下翻转", "出场", "rotate", anim_7198395913948107301);


  const frames_7244102747698500156 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102747698500156(target, text, options) {
    return playFrames(target, text, frames_7244102747698500156, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102747698500156", "甩回", "出场", "slide", anim_7244102747698500156);


  const frames_6872642354898014728 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642354898014728(target, text, options) {
    return playFrames(target, text, frames_6872642354898014728, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642354898014728", "溶解", "出场", "fade", anim_6872642354898014728);


  const frames_6834511218552607239 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6834511218552607239(target, text, options) {
    return playFrames(target, text, frames_6834511218552607239, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6834511218552607239", "闭幕", "出场", "wipe", anim_6834511218552607239);


  const frames_7504221924973645110 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7504221924973645110(target, text, options) {
    return playFrames(target, text, frames_7504221924973645110, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7504221924973645110", "粒子消散", "出场", "material", anim_7504221924973645110);


  const frames_7644890397088484644 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7644890397088484644(target, text, options) {
    return playFrames(target, text, frames_7644890397088484644, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644890397088484644", "逐字消失", "出场", "per_char", anim_7644890397088484644);


  const frames_7091567288385540622 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7091567288385540622(target, text, options) {
    return playFrames(target, text, frames_7091567288385540622, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7091567288385540622", "故障", "出场", "glitch", anim_7091567288385540622);


  const frames_6917178803521327630 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6917178803521327630(target, text, options) {
    return playFrames(target, text, frames_6917178803521327630, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6917178803521327630", "波浪弹出", "出场", "bounce", anim_6917178803521327630);


  const frames_6724920744431587853 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_6724920744431587853(target, text, options) {
    return playFrames(target, text, frames_6724920744431587853, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920744431587853", "向右滑动", "出场", "slide", anim_6724920744431587853);


  const frames_7124961998919438884 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7124961998919438884(target, text, options) {
    return playFrames(target, text, frames_7124961998919438884, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7124961998919438884", "折叠", "出场", "rotate", anim_7124961998919438884);


  const frames_7598110679530245417 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7598110679530245417(target, text, options) {
    return playFrames(target, text, frames_7598110679530245417, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598110679530245417", "碎屑炸裂", "出场", "fade", anim_7598110679530245417);


  const frames_6775804032318444045 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6775804032318444045(target, text, options) {
    return playFrames(target, text, frames_6775804032318444045, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6775804032318444045", "旋转飞出", "出场", "rotate", anim_6775804032318444045);


  const frames_6887482090351235592 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6887482090351235592(target, text, options) {
    return playFrames(target, text, frames_6887482090351235592, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6887482090351235592", "弹出", "出场", "bounce", anim_6887482090351235592);


  const frames_7649351655669927174 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649351655669927174(target, text, options) {
    return playFrames(target, text, frames_7649351655669927174, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649351655669927174", "文字消散", "出场", "fade", anim_7649351655669927174);


  const frames_7563555749822090522 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7563555749822090522(target, text, options) {
    return playFrames(target, text, frames_7563555749822090522, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7563555749822090522", "横向分割", "出场", "fade", anim_7563555749822090522);


  const frames_7244102414377161276 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":0.5,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.75,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":1.0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8}];
  function anim_7244102414377161276(target, text, options) {
    return playFrames(target, text, frames_7244102414377161276, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102414377161276", "故障闪动", "出场", "glitch", anim_7244102414377161276);


  const frames_7574330194018700607 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7574330194018700607(target, text, options) {
    return playFrames(target, text, frames_7574330194018700607, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7574330194018700607", "文字爆炸", "出场", "fade", anim_7574330194018700607);


  const frames_6923094772907250189 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_6923094772907250189(target, text, options) {
    return playFrames(target, text, frames_6923094772907250189, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6923094772907250189", "模糊", "出场", "blur", anim_6923094772907250189);


  const frames_7649352203458628905 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649352203458628905(target, text, options) {
    return playFrames(target, text, frames_7649352203458628905, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649352203458628905", "亮度渐变", "出场", "fade", anim_7649352203458628905);


  const frames_7301536173959156274 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7301536173959156274(target, text, options) {
    return playFrames(target, text, frames_7301536173959156274, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7301536173959156274", "模糊发光", "出场", "blur", anim_7301536173959156274);


  const frames_7538328202893167923 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7538328202893167923(target, text, options) {
    return playFrames(target, text, frames_7538328202893167923, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538328202893167923", "像素辉光", "出场", "glow", anim_7538328202893167923);


  const frames_7261858590808347193 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7261858590808347193(target, text, options) {
    return playFrames(target, text, frames_7261858590808347193, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7261858590808347193", "环绕滑出", "出场", "slide", anim_7261858590808347193);


  const frames_7244102819731477049 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102819731477049(target, text, options) {
    return playFrames(target, text, frames_7244102819731477049, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102819731477049", "拖尾", "出场", "fade", anim_7244102819731477049);


  const frames_7042278078415901192 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7042278078415901192(target, text, options) {
    return playFrames(target, text, frames_7042278078415901192, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7042278078415901192", "放大 II", "出场", "zoom", anim_7042278078415901192);


  const frames_7120131305303446029 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7120131305303446029(target, text, options) {
    return playFrames(target, text, frames_7120131305303446029, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7120131305303446029", "喷绘", "出场", "fade", anim_7120131305303446029);


  const frames_7034717113130422791 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7034717113130422791(target, text, options) {
    return playFrames(target, text, frames_7034717113130422791, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7034717113130422791", "逐字虚影", "出场", "per_char", anim_7034717113130422791);


  const frames_6865176065514410503 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6865176065514410503(target, text, options) {
    return playFrames(target, text, frames_6865176065514410503, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6865176065514410503", "空翻", "出场", "rotate", anim_6865176065514410503);


  const frames_6862897350478664200 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6862897350478664200(target, text, options) {
    return playFrames(target, text, frames_6862897350478664200, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6862897350478664200", "弹弓", "出场", "bounce", anim_6862897350478664200);


  const frames_7090122015603954189 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7090122015603954189(target, text, options) {
    return playFrames(target, text, frames_7090122015603954189, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7090122015603954189", "扭曲模糊", "出场", "blur", anim_7090122015603954189);


  const frames_7317637880799564297 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7317637880799564297(target, text, options) {
    return playFrames(target, text, frames_7317637880799564297, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7317637880799564297", "波浪弹跳", "出场", "bounce", anim_7317637880799564297);


  const frames_7148309755121898015 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7148309755121898015(target, text, options) {
    return playFrames(target, text, frames_7148309755121898015, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7148309755121898015", "炸开 II", "出场", "fade", anim_7148309755121898015);


  const frames_7238519014866031162 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7238519014866031162(target, text, options) {
    return playFrames(target, text, frames_7238519014866031162, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7238519014866031162", "二段缩放", "出场", "zoom", anim_7238519014866031162);


  const frames_7649350228163710271 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7649350228163710271(target, text, options) {
    return playFrames(target, text, frames_7649350228163710271, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649350228163710271", "模糊消失", "出场", "blur", anim_7649350228163710271);


  const frames_6724921351385125387 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6724921351385125387(target, text, options) {
    return playFrames(target, text, frames_6724921351385125387, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724921351385125387", "缩小", "出场", "zoom", anim_6724921351385125387);


  const frames_7579088625967566134 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7579088625967566134(target, text, options) {
    return playFrames(target, text, frames_7579088625967566134, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579088625967566134", "流泪坠落", "出场", "fade", anim_7579088625967566134);


  const frames_7090139631861109278 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7090139631861109278(target, text, options) {
    return playFrames(target, text, frames_7090139631861109278, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7090139631861109278", "向上飞出", "出场", "slide", anim_7090139631861109278);


  const frames_7532474130986241331 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7532474130986241331(target, text, options) {
    return playFrames(target, text, frames_7532474130986241331, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7532474130986241331", "粒子碎落", "出场", "material", anim_7532474130986241331);


  const frames_7078587337998864926 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":-18.0,"y":18,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7078587337998864926(target, text, options) {
    return playFrames(target, text, frames_7078587337998864926, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7078587337998864926", "左上弹出", "出场", "bounce", anim_7078587337998864926);


  const frames_7278296130432012857 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7278296130432012857(target, text, options) {
    return playFrames(target, text, frames_7278296130432012857, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7278296130432012857", "水墨晕开", "出场", "material", anim_7278296130432012857);


  const frames_7184797189627974200 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7184797189627974200(target, text, options) {
    return playFrames(target, text, frames_7184797189627974200, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7184797189627974200", "弹出跳动", "出场", "bounce", anim_7184797189627974200);


  const frames_7308276711039177225 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7308276711039177225(target, text, options) {
    return playFrames(target, text, frames_7308276711039177225, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308276711039177225", "弹性伸缩 II", "出场", "bounce", anim_7308276711039177225);


  const frames_7566974100141264155 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7566974100141264155(target, text, options) {
    return playFrames(target, text, frames_7566974100141264155, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566974100141264155", "星点消散", "出场", "fade", anim_7566974100141264155);


  const frames_7649607033666211135 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649607033666211135(target, text, options) {
    return playFrames(target, text, frames_7649607033666211135, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649607033666211135", "破碎消散", "出场", "fade", anim_7649607033666211135);


  const frames_6897085341811872270 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6897085341811872270(target, text, options) {
    return playFrames(target, text, frames_6897085341811872270, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6897085341811872270", "羽化向右擦除", "出场", "wipe", anim_6897085341811872270);


  const frames_7264501549240422949 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7264501549240422949(target, text, options) {
    return playFrames(target, text, frames_7264501549240422949, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7264501549240422949", "模糊滚动", "出场", "blur", anim_7264501549240422949);


  const frames_7237411511755346491 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7237411511755346491(target, text, options) {
    return playFrames(target, text, frames_7237411511755346491, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7237411511755346491", "打字光标", "出场", "typewriter", anim_7237411511755346491);


  const frames_7268169968204649020 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7268169968204649020(target, text, options) {
    return playFrames(target, text, frames_7268169968204649020, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268169968204649020", "闪烁散开", "出场", "glow", anim_7268169968204649020);


  const frames_6724919767200698884 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6724919767200698884(target, text, options) {
    return playFrames(target, text, frames_6724919767200698884, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724919767200698884", "放大", "出场", "zoom", anim_6724919767200698884);


  const frames_7426691632168324367 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691632168324367(target, text, options) {
    return playFrames(target, text, frames_7426691632168324367, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691632168324367", "向上溶解", "出场", "fade", anim_7426691632168324367);


  const frames_7526837871102283018 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7526837871102283018(target, text, options) {
    return playFrames(target, text, frames_7526837871102283018, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7526837871102283018", "立体翻书", "出场", "rotate", anim_7526837871102283018);


  const frames_7229520513586958908 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7229520513586958908(target, text, options) {
    return playFrames(target, text, frames_7229520513586958908, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7229520513586958908", "逐字旋出", "出场", "per_char", anim_7229520513586958908);


  const frames_7243633648237285949 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7243633648237285949(target, text, options) {
    return playFrames(target, text, frames_7243633648237285949, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7243633648237285949", "旋转缩放", "出场", "rotate", anim_7243633648237285949);


  const frames_7308279288061497865 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7308279288061497865(target, text, options) {
    return playFrames(target, text, frames_7308279288061497865, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308279288061497865", "翻动", "出场", "rotate", anim_7308279288061497865);


  const frames_6872642084977775118 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642084977775118(target, text, options) {
    return playFrames(target, text, frames_6872642084977775118, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642084977775118", "弹性伸缩", "出场", "bounce", anim_6872642084977775118);


  const frames_7114191629346411016 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7114191629346411016(target, text, options) {
    return playFrames(target, text, frames_7114191629346411016, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7114191629346411016", "随机弹跳 II", "出场", "bounce", anim_7114191629346411016);


  const frames_7237411448303915557 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7237411448303915557(target, text, options) {
    return playFrames(target, text, frames_7237411448303915557, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7237411448303915557", "打字机IV", "出场", "typewriter", anim_7237411448303915557);


  const frames_7540969013073939750 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7540969013073939750(target, text, options) {
    return playFrames(target, text, frames_7540969013073939750, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540969013073939750", "稻草人收割", "出场", "fade", anim_7540969013073939750);


  const frames_7265288999470633509 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7265288999470633509(target, text, options) {
    return playFrames(target, text, frames_7265288999470633509, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265288999470633509", "躺下", "出场", "fade", anim_7265288999470633509);


  const frames_6884154487246688776 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6884154487246688776(target, text, options) {
    return playFrames(target, text, frames_6884154487246688776, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6884154487246688776", "弹簧", "出场", "bounce", anim_6884154487246688776);


  const frames_7526840044951309594 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7526840044951309594(target, text, options) {
    return playFrames(target, text, frames_7526840044951309594, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7526840044951309594", "扭曲消散", "出场", "fade", anim_7526840044951309594);


  const frames_7259634082760364603 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7259634082760364603(target, text, options) {
    return playFrames(target, text, frames_7259634082760364603, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7259634082760364603", "叠影并出", "出场", "fade", anim_7259634082760364603);


  const frames_7308275717505028617 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7308275717505028617(target, text, options) {
    return playFrames(target, text, frames_7308275717505028617, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308275717505028617", "发光闪出", "出场", "glow", anim_7308275717505028617);


  const frames_7649610294439726342 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7649610294439726342(target, text, options) {
    return playFrames(target, text, frames_7649610294439726342, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649610294439726342", "模糊消失2", "出场", "blur", anim_7649610294439726342);


  const frames_7649349110176206123 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649349110176206123(target, text, options) {
    return playFrames(target, text, frames_7649349110176206123, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649349110176206123", "扭曲淡出", "出场", "fade", anim_7649349110176206123);


  const frames_7112021029085516319 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7112021029085516319(target, text, options) {
    return playFrames(target, text, frames_7112021029085516319, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112021029085516319", "逐字旋转", "出场", "per_char", anim_7112021029085516319);


  const frames_7540971343894891822 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7540971343894891822(target, text, options) {
    return playFrames(target, text, frames_7540971343894891822, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540971343894891822", "爱心飘散", "出场", "slide", anim_7540971343894891822);


  const frames_7591385474367884607 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7591385474367884607(target, text, options) {
    return playFrames(target, text, frames_7591385474367884607, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7591385474367884607", "数字像素", "出场", "fade", anim_7591385474367884607);


  const frames_6779879836916650509 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6779879836916650509(target, text, options) {
    return playFrames(target, text, frames_6779879836916650509, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6779879836916650509", "展开", "出场", "fade", anim_6779879836916650509);


  const frames_7313890212529050138 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7313890212529050138(target, text, options) {
    return playFrames(target, text, frames_7313890212529050138, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7313890212529050138", "左移弹动", "出场", "bounce", anim_7313890212529050138);


  const frames_7308274161992864266 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7308274161992864266(target, text, options) {
    return playFrames(target, text, frames_7308274161992864266, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308274161992864266", "炸开 Ⅲ", "出场", "fade", anim_7308274161992864266);


  const frames_7268216065337856572 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7268216065337856572(target, text, options) {
    return playFrames(target, text, frames_7268216065337856572, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7268216065337856572", "预览打字", "出场", "typewriter", anim_7268216065337856572);


  const frames_7029522072724312612 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7029522072724312612(target, text, options) {
    return playFrames(target, text, frames_7029522072724312612, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7029522072724312612", "飞出", "出场", "slide", anim_7029522072724312612);


  const frames_7076006676951732767 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":18.0,"y":18,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7076006676951732767(target, text, options) {
    return playFrames(target, text, frames_7076006676951732767, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7076006676951732767", "右上弹出", "出场", "bounce", anim_7076006676951732767);


  const frames_6779084194392838670 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6779084194392838670(target, text, options) {
    return playFrames(target, text, frames_6779084194392838670, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6779084194392838670", "日落", "出场", "fade", anim_6779084194392838670);


  const frames_7244102529573720635 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7244102529573720635(target, text, options) {
    return playFrames(target, text, frames_7244102529573720635, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7244102529573720635", "激光雕刻", "出场", "fade", anim_7244102529573720635);


  const frames_7312331703903588902 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7312331703903588902(target, text, options) {
    return playFrames(target, text, frames_7312331703903588902, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7312331703903588902", "镂空跳出", "出场", "bounce", anim_7312331703903588902);


  const frames_6926719087158497806 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6926719087158497806(target, text, options) {
    return playFrames(target, text, frames_6926719087158497806, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6926719087158497806", "随机打字机", "出场", "typewriter", anim_6926719087158497806);


  const frames_7426681148547386624 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7426681148547386624(target, text, options) {
    return playFrames(target, text, frames_7426681148547386624, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426681148547386624", "向右缓出", "出场", "fade", anim_7426681148547386624);


  const frames_6897085246206906893 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6897085246206906893(target, text, options) {
    return playFrames(target, text, frames_6897085246206906893, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6897085246206906893", "羽化向左擦除", "出场", "wipe", anim_6897085246206906893);


  const frames_7112274846326723086 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7112274846326723086(target, text, options) {
    return playFrames(target, text, frames_7112274846326723086, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112274846326723086", "逐字翻转", "出场", "per_char", anim_7112274846326723086);


  const frames_6799874105710481927 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_6799874105710481927(target, text, options) {
    return playFrames(target, text, frames_6799874105710481927, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6799874105710481927", "螺旋下降", "出场", "rotate", anim_6799874105710481927);


  const frames_7308273254127374874 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7308273254127374874(target, text, options) {
    return playFrames(target, text, frames_7308273254127374874, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308273254127374874", "描边填充", "出场", "fade", anim_7308273254127374874);


  const frames_6724919284893487619 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6724919284893487619(target, text, options) {
    return playFrames(target, text, frames_6724919284893487619, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724919284893487619", "向下滑动", "出场", "slide", anim_6724919284893487619);


  const frames_6763469696260903435 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6763469696260903435(target, text, options) {
    return playFrames(target, text, frames_6763469696260903435, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763469696260903435", "打字机 I", "出场", "typewriter", anim_6763469696260903435);


  const frames_7538327447897541915 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7538327447897541915(target, text, options) {
    return playFrames(target, text, frames_7538327447897541915, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7538327447897541915", "红色灰尘", "出场", "fade", anim_7538327447897541915);


  const frames_7540967743827332361 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7540967743827332361(target, text, options) {
    return playFrames(target, text, frames_7540967743827332361, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7540967743827332361", "小猫吞字", "出场", "fade", anim_7540967743827332361);


  const frames_7644863543879273770 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7644863543879273770(target, text, options) {
    return playFrames(target, text, frames_7644863543879273770, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7644863543879273770", "光标滑出", "出场", "typewriter", anim_7644863543879273770);


  const frames_7083752251742753287 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7083752251742753287(target, text, options) {
    return playFrames(target, text, frames_7083752251742753287, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7083752251742753287", "向左解散", "出场", "fade", anim_7083752251742753287);


  const frames_7649346444947688746 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649346444947688746(target, text, options) {
    return playFrames(target, text, frames_7649346444947688746, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649346444947688746", "右移淡出", "出场", "fade", anim_7649346444947688746);


  const frames_7252619798108967484 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7252619798108967484(target, text, options) {
    return playFrames(target, text, frames_7252619798108967484, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7252619798108967484", "复古打字机", "出场", "typewriter", anim_7252619798108967484);


  const frames_6783908820176343566 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6783908820176343566(target, text, options) {
    return playFrames(target, text, frames_6783908820176343566, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6783908820176343566", "向右擦除", "出场", "wipe", anim_6783908820176343566);


  const frames_7649604657429466411 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7649604657429466411(target, text, options) {
    return playFrames(target, text, frames_7649604657429466411, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649604657429466411", "破碎消失", "出场", "fade", anim_7649604657429466411);


  const frames_7052633346936934942 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7052633346936934942(target, text, options) {
    return playFrames(target, text, frames_7052633346936934942, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7052633346936934942", "水平翻转", "出场", "rotate", anim_7052633346936934942);


  const frames_6774625752794010115 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6774625752794010115(target, text, options) {
    return playFrames(target, text, frames_6774625752794010115, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774625752794010115", "向上擦除", "出场", "wipe", anim_6774625752794010115);


  const frames_7646333981973056787 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7646333981973056787(target, text, options) {
    return playFrames(target, text, frames_7646333981973056787, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646333981973056787", "缓慢消失", "出场", "fade", anim_7646333981973056787);


  const frames_7270726693277405733 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7270726693277405733(target, text, options) {
    return playFrames(target, text, frames_7270726693277405733, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7270726693277405733", "滑动下落", "出场", "slide", anim_7270726693277405733);


  const frames_6763469915518145032 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6763469915518145032(target, text, options) {
    return playFrames(target, text, frames_6763469915518145032, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763469915518145032", "轻微放大", "出场", "zoom", anim_6763469915518145032);


  const frames_7026617357300666893 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7026617357300666893(target, text, options) {
    return playFrames(target, text, frames_7026617357300666893, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7026617357300666893", "随机弹跳", "出场", "bounce", anim_7026617357300666893);


  const frames_6870061326698287624 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6870061326698287624(target, text, options) {
    return playFrames(target, text, frames_6870061326698287624, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6870061326698287624", "故障打字机", "出场", "typewriter", anim_6870061326698287624);


  const frames_6763469767555682823 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6763469767555682823(target, text, options) {
    return playFrames(target, text, frames_6763469767555682823, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763469767555682823", "打字机 II", "出场", "typewriter", anim_6763469767555682823);


  const frames_7057801223109349925 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1.0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0}];
  function anim_7057801223109349925(target, text, options) {
    return playFrames(target, text, frames_7057801223109349925, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7057801223109349925", "发光模糊", "出场", "blur", anim_7057801223109349925);


  const frames_7090146831836910110 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7090146831836910110(target, text, options) {
    return playFrames(target, text, frames_7090146831836910110, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7090146831836910110", "右下擦除", "出场", "wipe", anim_7090146831836910110);


  const frames_7090059095134179877 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7090059095134179877(target, text, options) {
    return playFrames(target, text, frames_7090059095134179877, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7090059095134179877", "晕开", "出场", "fade", anim_7090059095134179877);


  const frames_6840698265277567496 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_6840698265277567496(target, text, options) {
    return playFrames(target, text, frames_6840698265277567496, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6840698265277567496", "圆形扫描", "出场", "fade", anim_6840698265277567496);


  const frames_6774626748177846791 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6774626748177846791(target, text, options) {
    return playFrames(target, text, frames_6774626748177846791, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774626748177846791", "向左擦除", "出场", "wipe", anim_6774626748177846791);


  const frames_6774626081791021576 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6774626081791021576(target, text, options) {
    return playFrames(target, text, frames_6774626081791021576, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6774626081791021576", "向下擦除", "出场", "wipe", anim_6774626081791021576);


  const frames_6872642497013617159 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_6872642497013617159(target, text, options) {
    return playFrames(target, text, frames_6872642497013617159, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6872642497013617159", "随机飞出", "出场", "slide", anim_6872642497013617159);


  const frames_7039245189638001183 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7039245189638001183(target, text, options) {
    return playFrames(target, text, frames_7039245189638001183, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7039245189638001183", "闪动", "出场", "glow", anim_7039245189638001183);


  const frames_7646333706415672617 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7646333706415672617(target, text, options) {
    return playFrames(target, text, frames_7646333706415672617, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646333706415672617", "四周消散", "出场", "fade", anim_7646333706415672617);


  const frames_7265222263174074937 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7265222263174074937(target, text, options) {
    return playFrames(target, text, frames_7265222263174074937, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265222263174074937", "居中打字", "出场", "typewriter", anim_7265222263174074937);


  const frames_6763469838368117256 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.15},{"t":1.0,"opacity":0,"x":0,"y":8,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_6763469838368117256(target, text, options) {
    return playFrames(target, text, frames_6763469838368117256, Object.assign({
      split: "chars",
      duration: 1200,
      stagger: 42,
      loop: false,
      defaultText: "Typing Text",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763469838368117256", "打字机 III", "出场", "typewriter", anim_6763469838368117256);


  const frames_6986920909927879199 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6986920909927879199(target, text, options) {
    return playFrames(target, text, frames_6986920909927879199, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6986920909927879199", "颤抖 II", "循环", "wave_shake", anim_6986920909927879199);


  const frames_7123093247672455711 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7123093247672455711(target, text, options) {
    return playFrames(target, text, frames_7123093247672455711, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7123093247672455711", "扭动", "循环", "fade", anim_7123093247672455711);


  const frames_7124226995231134239 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7124226995231134239(target, text, options) {
    return playFrames(target, text, frames_7124226995231134239, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7124226995231134239", "文字泛光", "循环", "glow", anim_7124226995231134239);


  const frames_6884155832838132231 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6884155832838132231(target, text, options) {
    return playFrames(target, text, frames_6884155832838132231, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6884155832838132231", "轻微跳动", "循环", "bounce", anim_6884155832838132231);


  const frames_7075224569421763079 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7075224569421763079(target, text, options) {
    return playFrames(target, text, frames_7075224569421763079, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7075224569421763079", "上弧", "循环", "fade", anim_7075224569421763079);


  const frames_7070332284934558245 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7070332284934558245(target, text, options) {
    return playFrames(target, text, frames_7070332284934558245, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7070332284934558245", "投影颤抖", "循环", "wave_shake", anim_7070332284934558245);


  const frames_7067046171381862919 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7067046171381862919(target, text, options) {
    return playFrames(target, text, frames_7067046171381862919, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7067046171381862919", "波浪 II", "循环", "wave_shake", anim_7067046171381862919);


  const frames_6908592686781960717 = [{"t":0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6908592686781960717(target, text, options) {
    return playFrames(target, text, frames_6908592686781960717, Object.assign({
      split: "chars",
      duration: 1400,
      stagger: 42,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6908592686781960717", "逐字放大", "循环", "per_char", anim_6908592686781960717);


  const frames_7070036604429013535 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7070036604429013535(target, text, options) {
    return playFrames(target, text, frames_7070036604429013535, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7070036604429013535", "颤抖 III", "循环", "wave_shake", anim_7070036604429013535);


  const frames_7051843475892867598 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7051843475892867598(target, text, options) {
    return playFrames(target, text, frames_7051843475892867598, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7051843475892867598", "扫光", "循环", "glow", anim_7051843475892867598);


  const frames_6917143282690560526 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6917143282690560526(target, text, options) {
    return playFrames(target, text, frames_6917143282690560526, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6917143282690560526", "调皮", "循环", "fade", anim_6917143282690560526);


  const frames_7211060597352305189 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7211060597352305189(target, text, options) {
    return playFrames(target, text, frames_7211060597352305189, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7211060597352305189", "飘起", "循环", "slide", anim_7211060597352305189);


  const frames_7130142075995034119 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7130142075995034119(target, text, options) {
    return playFrames(target, text, frames_7130142075995034119, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7130142075995034119", "情绪加载", "循环", "fade", anim_7130142075995034119);


  const frames_7649608408835837238 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649608408835837238(target, text, options) {
    return playFrames(target, text, frames_7649608408835837238, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649608408835837238", "闪色循环", "循环", "glow", anim_7649608408835837238);


  const frames_6790246693674684942 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6790246693674684942(target, text, options) {
    return playFrames(target, text, frames_6790246693674684942, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6790246693674684942", "晃动", "循环", "wave_shake", anim_6790246693674684942);


  const frames_7430669972088558090 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7430669972088558090(target, text, options) {
    return playFrames(target, text, frames_7430669972088558090, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7430669972088558090", "竖向渐变", "循环", "fade", anim_7430669972088558090);


  const frames_6724927688047333891 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724927688047333891(target, text, options) {
    return playFrames(target, text, frames_6724927688047333891, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724927688047333891", "波浪", "循环", "wave_shake", anim_6724927688047333891);


  const frames_6724919955654971918 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724919955654971918(target, text, options) {
    return playFrames(target, text, frames_6724919955654971918, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724919955654971918", "心跳", "循环", "bounce", anim_6724919955654971918);


  const frames_6790247082155315719 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6790247082155315719(target, text, options) {
    return playFrames(target, text, frames_6790247082155315719, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6790247082155315719", "弹幕滚动", "循环", "bounce", anim_6790247082155315719);


  const frames_6764189482871689742 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6764189482871689742(target, text, options) {
    return playFrames(target, text, frames_6764189482871689742, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6764189482871689742", "颤抖", "循环", "wave_shake", anim_6764189482871689742);


  const frames_7134190113780666887 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7134190113780666887(target, text, options) {
    return playFrames(target, text, frames_7134190113780666887, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7134190113780666887", "喷涌", "循环", "fade", anim_7134190113780666887);


  const frames_7276407256965452346 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7276407256965452346(target, text, options) {
    return playFrames(target, text, frames_7276407256965452346, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7276407256965452346", "涂鸦手绘", "循环", "fade", anim_7276407256965452346);


  const frames_7272339163142165050 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7272339163142165050(target, text, options) {
    return playFrames(target, text, frames_7272339163142165050, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7272339163142165050", "放大镜", "循环", "zoom", anim_7272339163142165050);


  const frames_7070332473481105933 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7070332473481105933(target, text, options) {
    return playFrames(target, text, frames_7070332473481105933, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7070332473481105933", "投影颤抖 III", "循环", "wave_shake", anim_7070332473481105933);


  const frames_7070332370963927559 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7070332370963927559(target, text, options) {
    return playFrames(target, text, frames_7070332370963927559, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7070332370963927559", "投影颤抖 II", "循环", "wave_shake", anim_7070332370963927559);


  const frames_7107592133472686606 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7107592133472686606(target, text, options) {
    return playFrames(target, text, frames_7107592133472686606, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7107592133472686606", "弹幕", "循环", "bounce", anim_7107592133472686606);


  const frames_7223675733606928957 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7223675733606928957(target, text, options) {
    return playFrames(target, text, frames_7223675733606928957, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7223675733606928957", "拉开", "循环", "slide", anim_7223675733606928957);


  const frames_7067812686557352456 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7067812686557352456(target, text, options) {
    return playFrames(target, text, frames_7067812686557352456, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7067812686557352456", "波浪 III", "循环", "wave_shake", anim_7067812686557352456);


  const frames_7308279705252139530 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308279705252139530(target, text, options) {
    return playFrames(target, text, frames_7308279705252139530, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308279705252139530", "爆闪", "循环", "glow", anim_7308279705252139530);


  const frames_7069965879437431303 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7069965879437431303(target, text, options) {
    return playFrames(target, text, frames_7069965879437431303, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7069965879437431303", "超强晃动 II", "循环", "wave_shake", anim_7069965879437431303);


  const frames_7210283971316290085 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7210283971316290085(target, text, options) {
    return playFrames(target, text, frames_7210283971316290085, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7210283971316290085", "心跳", "循环", "bounce", anim_7210283971316290085);


  const frames_7229526981807706680 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7229526981807706680(target, text, options) {
    return playFrames(target, text, frames_7229526981807706680, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7229526981807706680", "悸动", "循环", "bounce", anim_7229526981807706680);


  const frames_7179135028343870012 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7179135028343870012(target, text, options) {
    return playFrames(target, text, frames_7179135028343870012, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7179135028343870012", "环形滚动", "循环", "slide", anim_7179135028343870012);


  const frames_6724921437930394120 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724921437930394120(target, text, options) {
    return playFrames(target, text, frames_6724921437930394120, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724921437930394120", "闪烁", "循环", "glow", anim_6724921437930394120);


  const frames_6857036499389518349 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6857036499389518349(target, text, options) {
    return playFrames(target, text, frames_6857036499389518349, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6857036499389518349", "超强波浪", "循环", "wave_shake", anim_6857036499389518349);


  const frames_7276407576625943100 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7276407576625943100(target, text, options) {
    return playFrames(target, text, frames_7276407576625943100, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7276407576625943100", "涂鸦手绘 II", "循环", "fade", anim_7276407576625943100);


  const frames_7598107949923388714 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598107949923388714(target, text, options) {
    return playFrames(target, text, frames_7598107949923388714, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598107949923388714", "歌词滚轮", "循环", "fade", anim_7598107949923388714);


  const frames_7163896186972148261 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163896186972148261(target, text, options) {
    return playFrames(target, text, frames_7163896186972148261, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163896186972148261", "空间翻转 I", "循环", "rotate", anim_7163896186972148261);


  const frames_7045155566003425823 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7045155566003425823(target, text, options) {
    return playFrames(target, text, frames_7045155566003425823, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7045155566003425823", "吹泡泡", "循环", "fade", anim_7045155566003425823);


  const frames_6857714281136263687 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6857714281136263687(target, text, options) {
    return playFrames(target, text, frames_6857714281136263687, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6857714281136263687", "故障闪动", "循环", "glitch", anim_6857714281136263687);


  const frames_7283103017526628921 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7283103017526628921(target, text, options) {
    return playFrames(target, text, frames_7283103017526628921, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7283103017526628921", "抖动故障", "循环", "glitch", anim_7283103017526628921);


  const frames_7239526343833031223 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7239526343833031223(target, text, options) {
    return playFrames(target, text, frames_7239526343833031223, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7239526343833031223", "声波震动", "循环", "wave_shake", anim_7239526343833031223);


  const frames_7221747595884892731 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7221747595884892731(target, text, options) {
    return playFrames(target, text, frames_7221747595884892731, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7221747595884892731", "拉住", "循环", "fade", anim_7221747595884892731);


  const frames_7065208406633615909 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7065208406633615909(target, text, options) {
    return playFrames(target, text, frames_7065208406633615909, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7065208406633615909", "超强晃动", "循环", "wave_shake", anim_7065208406633615909);


  const frames_7308280358691148315 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308280358691148315(target, text, options) {
    return playFrames(target, text, frames_7308280358691148315, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308280358691148315", "刷屏", "循环", "fade", anim_7308280358691148315);


  const frames_6790246884683289102 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6790246884683289102(target, text, options) {
    return playFrames(target, text, frames_6790246884683289102, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6790246884683289102", "字幕滚动", "循环", "bounce", anim_6790246884683289102);


  const frames_7110160318529016350 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7110160318529016350(target, text, options) {
    return playFrames(target, text, frames_7110160318529016350, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7110160318529016350", "喷绘", "循环", "fade", anim_7110160318529016350);


  const frames_7577606300218051881 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577606300218051881(target, text, options) {
    return playFrames(target, text, frames_7577606300218051881, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577606300218051881", "空间抖动", "循环", "wave_shake", anim_7577606300218051881);


  const frames_7065219379687854623 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7065219379687854623(target, text, options) {
    return playFrames(target, text, frames_7065219379687854623, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7065219379687854623", "超强波浪 II", "循环", "wave_shake", anim_7065219379687854623);


  const frames_7308280718302384690 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308280718302384690(target, text, options) {
    return playFrames(target, text, frames_7308280718302384690, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308280718302384690", "频闪边框", "循环", "glow", anim_7308280718302384690);


  const frames_7646332752513486134 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646332752513486134(target, text, options) {
    return playFrames(target, text, frames_7646332752513486134, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646332752513486134", "错位跳跃", "循环", "bounce", anim_7646332752513486134);


  const frames_7181754919827804728 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7181754919827804728(target, text, options) {
    return playFrames(target, text, frames_7181754919827804728, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7181754919827804728", "流光", "循环", "glow", anim_7181754919827804728);


  const frames_7224077152587616805 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7224077152587616805(target, text, options) {
    return playFrames(target, text, frames_7224077152587616805, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7224077152587616805", "放大缩小", "循环", "zoom", anim_7224077152587616805);


  const frames_6980916124976157220 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6980916124976157220(target, text, options) {
    return playFrames(target, text, frames_6980916124976157220, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6980916124976157220", "环绕", "循环", "fade", anim_6980916124976157220);


  const frames_6835878163575214605 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6835878163575214605(target, text, options) {
    return playFrames(target, text, frames_6835878163575214605, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6835878163575214605", "色差故障", "循环", "glitch", anim_6835878163575214605);


  const frames_7243633488249754173 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7243633488249754173(target, text, options) {
    return playFrames(target, text, frames_7243633488249754173, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7243633488249754173", "错位", "循环", "glitch", anim_7243633488249754173);


  const frames_7129767866894651917 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7129767866894651917(target, text, options) {
    return playFrames(target, text, frames_7129767866894651917, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7129767866894651917", "强调三遍", "循环", "fade", anim_7129767866894651917);


  const frames_7646346363407551763 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646346363407551763(target, text, options) {
    return playFrames(target, text, frames_7646346363407551763, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646346363407551763", "向左挤压", "循环", "zoom", anim_7646346363407551763);


  const frames_6840710593289130503 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6840710593289130503(target, text, options) {
    return playFrames(target, text, frames_6840710593289130503, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6840710593289130503", "摇荡", "循环", "wave_shake", anim_6840710593289130503);


  const frames_7397688001356108339 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7397688001356108339(target, text, options) {
    return playFrames(target, text, frames_7397688001356108339, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7397688001356108339", "发光模糊多行", "循环", "blur", anim_7397688001356108339);


  const frames_7582865248479104310 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7582865248479104310(target, text, options) {
    return playFrames(target, text, frames_7582865248479104310, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7582865248479104310", "动物城彩蛋", "循环", "fade", anim_7582865248479104310);


  const frames_7134634461588623909 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7134634461588623909(target, text, options) {
    return playFrames(target, text, frames_7134634461588623909, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7134634461588623909", "急了", "循环", "fade", anim_7134634461588623909);


  const frames_7045150354672980516 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7045150354672980516(target, text, options) {
    return playFrames(target, text, frames_7045150354672980516, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7045150354672980516", "随机弹跳", "循环", "bounce", anim_7045150354672980516);


  const frames_7426688167740214562 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426688167740214562(target, text, options) {
    return playFrames(target, text, frames_7426688167740214562, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426688167740214562", "呐喊", "循环", "wave_shake", anim_7426688167740214562);


  const frames_7052257626897256968 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7052257626897256968(target, text, options) {
    return playFrames(target, text, frames_7052257626897256968, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7052257626897256968", "吹泡泡 II", "循环", "fade", anim_7052257626897256968);


  const frames_7277870806552547895 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7277870806552547895(target, text, options) {
    return playFrames(target, text, frames_7277870806552547895, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7277870806552547895", "扩音器", "循环", "fade", anim_7277870806552547895);


  const frames_7096375845773644318 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7096375845773644318(target, text, options) {
    return playFrames(target, text, frames_7096375845773644318, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7096375845773644318", "弹幕 II", "循环", "bounce", anim_7096375845773644318);


  const frames_7308277700492268042 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308277700492268042(target, text, options) {
    return playFrames(target, text, frames_7308277700492268042, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308277700492268042", "流光", "循环", "glow", anim_7308277700492268042);


  const frames_6724920869363126795 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724920869363126795(target, text, options) {
    return playFrames(target, text, frames_6724920869363126795, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920869363126795", "摇摆", "循环", "wave_shake", anim_6724920869363126795);


  const frames_6724920002958332420 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724920002958332420(target, text, options) {
    return playFrames(target, text, frames_6724920002958332420, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724920002958332420", "跳动", "循环", "bounce", anim_6724920002958332420);


  const frames_7225496399817740855 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7225496399817740855(target, text, options) {
    return playFrames(target, text, frames_7225496399817740855, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7225496399817740855", "排队入场", "入场", "fade", anim_7225496399817740855);


  const frames_6908281696253121038 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6908281696253121038(target, text, options) {
    return playFrames(target, text, frames_6908281696253121038, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6908281696253121038", "摇摆 I", "循环", "wave_shake", anim_6908281696253121038);


  const frames_7276420462131810874 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7276420462131810874(target, text, options) {
    return playFrames(target, text, frames_7276420462131810874, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7276420462131810874", "圆形涂鸦", "循环", "fade", anim_7276420462131810874);


  const frames_6763897586328801805 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763897586328801805(target, text, options) {
    return playFrames(target, text, frames_6763897586328801805, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763897586328801805", "翻转", "循环", "rotate", anim_6763897586328801805);


  const frames_7649609301505363263 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649609301505363263(target, text, options) {
    return playFrames(target, text, frames_7649609301505363263, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649609301505363263", "故障波纹", "循环", "glitch", anim_7649609301505363263);


  const frames_7163901901589713444 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163901901589713444(target, text, options) {
    return playFrames(target, text, frames_7163901901589713444, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163901901589713444", "空间翻转 II", "循环", "rotate", anim_7163901901589713444);


  const frames_7649601485352832319 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649601485352832319(target, text, options) {
    return playFrames(target, text, frames_7649601485352832319, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649601485352832319", "亮度渐变2", "循环", "fade", anim_7649601485352832319);


  const frames_7426692250530286883 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426692250530286883(target, text, options) {
    return playFrames(target, text, frames_7426692250530286883, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426692250530286883", "福袋炸开", "循环", "fade", anim_7426692250530286883);


  const frames_6763900973946507784 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6763900973946507784(target, text, options) {
    return playFrames(target, text, frames_6763900973946507784, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6763900973946507784", "旋转", "循环", "rotate", anim_6763900973946507784);


  const frames_7399879712140431883 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7399879712140431883(target, text, options) {
    return playFrames(target, text, frames_7399879712140431883, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7399879712140431883", "描边粉笔", "循环", "fade", anim_7399879712140431883);


  const frames_7522411659407789353 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7522411659407789353(target, text, options) {
    return playFrames(target, text, frames_7522411659407789353, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7522411659407789353", "变色弹跳", "循环", "bounce", anim_7522411659407789353);


  const frames_7308277117622424090 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308277117622424090(target, text, options) {
    return playFrames(target, text, frames_7308277117622424090, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308277117622424090", "渐变拖尾", "循环", "fade", anim_7308277117622424090);


  const frames_7591387530293972265 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7591387530293972265(target, text, options) {
    return playFrames(target, text, frames_7591387530293972265, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7591387530293972265", "火焰燃烧", "循环", "material", anim_7591387530293972265);


  const frames_7399983060806013479 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7399983060806013479(target, text, options) {
    return playFrames(target, text, frames_7399983060806013479, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7399983060806013479", "拼贴纹理", "循环", "fade", anim_7399983060806013479);


  const frames_6724921579517514248 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6724921579517514248(target, text, options) {
    return playFrames(target, text, frames_6724921579517514248, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6724921579517514248", "钟摆", "循环", "rotate", anim_6724921579517514248);


  const frames_7114181846086193701 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7114181846086193701(target, text, options) {
    return playFrames(target, text, frames_7114181846086193701, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7114181846086193701", "环绕 II", "循环", "fade", anim_7114181846086193701);


  const frames_7212897307782550053 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7212897307782550053(target, text, options) {
    return playFrames(target, text, frames_7212897307782550053, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7212897307782550053", "尾巴摇摆", "循环", "wave_shake", anim_7212897307782550053);


  const frames_7168819879183651359 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7168819879183651359(target, text, options) {
    return playFrames(target, text, frames_7168819879183651359, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7168819879183651359", "翻页I", "循环", "rotate", anim_7168819879183651359);


  const frames_7402185694732358170 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7402185694732358170(target, text, options) {
    return playFrames(target, text, frames_7402185694732358170, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7402185694732358170", "字体变换", "循环", "fade", anim_7402185694732358170);


  const frames_6921528300573561358 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6921528300573561358(target, text, options) {
    return playFrames(target, text, frames_6921528300573561358, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6921528300573561358", "彩虹-马卡龙", "循环", "fade", anim_6921528300573561358);


  const frames_7598108679245679891 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598108679245679891(target, text, options) {
    return playFrames(target, text, frames_7598108679245679891, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598108679245679891", "波浪挤压", "循环", "zoom", anim_7598108679245679891);


  const frames_7099419657290912286 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7099419657290912286(target, text, options) {
    return playFrames(target, text, frames_7099419657290912286, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7099419657290912286", "漩涡", "循环", "fade", anim_7099419657290912286);


  const frames_7070415354656199181 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7070415354656199181(target, text, options) {
    return playFrames(target, text, frames_7070415354656199181, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7070415354656199181", "甜甜圈", "循环", "fade", anim_7070415354656199181);


  const frames_7400234025392017956 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7400234025392017956(target, text, options) {
    return playFrames(target, text, frames_7400234025392017956, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7400234025392017956", "复古涂鸦", "循环", "fade", anim_7400234025392017956);


  const frames_7064823078542381581 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7064823078542381581(target, text, options) {
    return playFrames(target, text, frames_7064823078542381581, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7064823078542381581", "折叠", "循环", "rotate", anim_7064823078542381581);


  const frames_7303430211519910451 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7303430211519910451(target, text, options) {
    return playFrames(target, text, frames_7303430211519910451, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7303430211519910451", "彩色切换", "循环", "fade", anim_7303430211519910451);


  const frames_7163892769176424991 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7163892769176424991(target, text, options) {
    return playFrames(target, text, frames_7163892769176424991, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7163892769176424991", "空间翻转 III", "循环", "rotate", anim_7163892769176424991);


  const frames_7571804503989570842 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7571804503989570842(target, text, options) {
    return playFrames(target, text, frames_7571804503989570842, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7571804503989570842", "超导体循环", "循环", "fade", anim_7571804503989570842);


  const frames_6908592625406710280 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6908592625406710280(target, text, options) {
    return playFrames(target, text, frames_6908592625406710280, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6908592625406710280", "彩虹", "循环", "fade", anim_6908592625406710280);


  const frames_6799874389669057037 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6799874389669057037(target, text, options) {
    return playFrames(target, text, frames_6799874389669057037, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6799874389669057037", "雨刷", "循环", "wipe", anim_6799874389669057037);


  const frames_7213291988500615738 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7213291988500615738(target, text, options) {
    return playFrames(target, text, frames_7213291988500615738, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7213291988500615738", "漂浮", "循环", "fade", anim_7213291988500615738);


  const frames_7577611791023279379 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7577611791023279379(target, text, options) {
    return playFrames(target, text, frames_7577611791023279379, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7577611791023279379", "灯光弹跳", "循环", "bounce", anim_7577611791023279379);


  const frames_7582863369754004755 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7582863369754004755(target, text, options) {
    return playFrames(target, text, frames_7582863369754004755, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7582863369754004755", "文字拉链", "循环", "fade", anim_7582863369754004755);


  const frames_7399879467457319463 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7399879467457319463(target, text, options) {
    return playFrames(target, text, frames_7399879467457319463, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7399879467457319463", "VHS", "循环", "glitch", anim_7399879467457319463);


  const frames_6916820108211917325 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6916820108211917325(target, text, options) {
    return playFrames(target, text, frames_6916820108211917325, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6916820108211917325", "彩虹-情人节", "循环", "fade", anim_6916820108211917325);


  const frames_7579092207777500479 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7579092207777500479(target, text, options) {
    return playFrames(target, text, frames_7579092207777500479, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579092207777500479", "故障电视机", "循环", "glitch", anim_7579092207777500479);


  const frames_7308278472541999654 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7308278472541999654(target, text, options) {
    return playFrames(target, text, frames_7308278472541999654, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7308278472541999654", "彩色火焰", "循环", "material", anim_7308278472541999654);


  const frames_7649605389268405567 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7649605389268405567(target, text, options) {
    return playFrames(target, text, frames_7649605389268405567, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7649605389268405567", "文字淡变", "循环", "fade", anim_7649605389268405567);


  const frames_7398492769628459539 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7398492769628459539(target, text, options) {
    return playFrames(target, text, frames_7398492769628459539, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7398492769628459539", "蓝黄滑动", "循环", "slide", anim_7398492769628459539);


  const frames_6916820045519655432 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6916820045519655432(target, text, options) {
    return playFrames(target, text, frames_6916820045519655432, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6916820045519655432", "彩虹-新年", "循环", "fade", anim_6916820045519655432);


  const frames_7193989785319379515 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7193989785319379515(target, text, options) {
    return playFrames(target, text, frames_7193989785319379515, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7193989785319379515", "影像叠加", "循环", "fade", anim_7193989785319379515);


  const frames_7598109780401474852 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598109780401474852(target, text, options) {
    return playFrames(target, text, frames_7598109780401474852, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598109780401474852", "心动频率", "循环", "fade", anim_7598109780401474852);


  const frames_7482800101329685785 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7482800101329685785(target, text, options) {
    return playFrames(target, text, frames_7482800101329685785, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7482800101329685785", "新_色彩循环", "循环", "fade", anim_7482800101329685785);


  const frames_7444935808613731647 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-4,"scale":1.05,"rotate":4,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":21.0,"scale":0.82,"rotate":-14,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7444935808613731647(target, text, options) {
    return playFrames(target, text, frames_7444935808613731647, Object.assign({
      split: "chars",
      duration: 980,
      stagger: 42,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7444935808613731647", "圣诞-逐字出场字幕", "出场", "per_char", anim_7444935808613731647);


  const frames_7426693885591702824 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7426693885591702824(target, text, options) {
    return playFrames(target, text, frames_7426693885591702824, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426693885591702824", "弹簧", "出场", "bounce", anim_7426693885591702824);


  const frames_7426682630525029672 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_7426682630525029672(target, text, options) {
    return playFrames(target, text, frames_7426682630525029672, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426682630525029672", "向右滑动", "出场", "slide", anim_7426682630525029672);


  const frames_7426683433725775138 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0}];
  function anim_7426683433725775138(target, text, options) {
    return playFrames(target, text, frames_7426683433725775138, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426683433725775138", "向左滑动", "出场", "slide", anim_7426683433725775138);


  const frames_7426682637235784960 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7426682637235784960(target, text, options) {
    return playFrames(target, text, frames_7426682637235784960, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426682637235784960", "向下滑动", "出场", "slide", anim_7426682637235784960);


  const frames_7426687154669112576 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7426687154669112576(target, text, options) {
    return playFrames(target, text, frames_7426687154669112576, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426687154669112576", "向上滑动", "出场", "slide", anim_7426687154669112576);


  const frames_7426680921920752948 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7426680921920752948(target, text, options) {
    return playFrames(target, text, frames_7426680921920752948, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426680921920752948", "旋出", "出场", "rotate", anim_7426680921920752948);


  const frames_7426682473829961012 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7426682473829961012(target, text, options) {
    return playFrames(target, text, frames_7426682473829961012, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426682473829961012", "放大", "出场", "zoom", anim_7426682473829961012);


  const frames_7426684777706720512 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7426684777706720512(target, text, options) {
    return playFrames(target, text, frames_7426684777706720512, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426684777706720512", "缩小", "出场", "zoom", anim_7426684777706720512);


  const frames_7426693091752447247 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7426693091752447247(target, text, options) {
    return playFrames(target, text, frames_7426693091752447247, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426693091752447247", "轻微放大", "出场", "zoom", anim_7426693091752447247);


  const frames_7426691527147146536 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691527147146536(target, text, options) {
    return playFrames(target, text, frames_7426691527147146536, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691527147146536", "渐隐", "出场", "fade", anim_7426691527147146536);


  const frames_7426689852218920226 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426689852218920226(target, text, options) {
    return playFrames(target, text, frames_7426689852218920226, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426689852218920226", "轻微跳动", "循环", "bounce", anim_7426689852218920226);


  const frames_6800304883468603911 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_6800304883468603911(target, text, options) {
    return playFrames(target, text, frames_6800304883468603911, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("6800304883468603911", "雨刷", "循环", "wipe", anim_6800304883468603911);


  const frames_7426683728044264756 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426683728044264756(target, text, options) {
    return playFrames(target, text, frames_7426683728044264756, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426683728044264756", "字幕滚动", "循环", "bounce", anim_7426683728044264756);


  const frames_7426685291160784168 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426685291160784168(target, text, options) {
    return playFrames(target, text, frames_7426685291160784168, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426685291160784168", "弹幕滚动", "循环", "bounce", anim_7426685291160784168);


  const frames_7426680473088265507 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426680473088265507(target, text, options) {
    return playFrames(target, text, frames_7426680473088265507, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426680473088265507", "钟摆", "循环", "rotate", anim_7426680473088265507);


  const frames_7426682062582680867 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426682062582680867(target, text, options) {
    return playFrames(target, text, frames_7426682062582680867, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426682062582680867", "摇摆", "循环", "wave_shake", anim_7426682062582680867);


  const frames_7426691138016382243 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691138016382243(target, text, options) {
    return playFrames(target, text, frames_7426691138016382243, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691138016382243", "闪烁", "循环", "glow", anim_7426691138016382243);


  const frames_7426681942680079631 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426681942680079631(target, text, options) {
    return playFrames(target, text, frames_7426681942680079631, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426681942680079631", "心跳", "循环", "bounce", anim_7426681942680079631);


  const frames_7426683843064630543 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426683843064630543(target, text, options) {
    return playFrames(target, text, frames_7426683843064630543, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426683843064630543", "跳动", "循环", "bounce", anim_7426683843064630543);


  const frames_7426690610473471266 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426690610473471266(target, text, options) {
    return playFrames(target, text, frames_7426690610473471266, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426690610473471266", "翻转", "循环", "rotate", anim_7426690610473471266);


  const frames_7426691126507162880 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691126507162880(target, text, options) {
    return playFrames(target, text, frames_7426691126507162880, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691126507162880", "旋转", "循环", "rotate", anim_7426691126507162880);


  const frames_7426974716004470031 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426974716004470031(target, text, options) {
    return playFrames(target, text, frames_7426974716004470031, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426974716004470031", "颤抖", "循环", "wave_shake", anim_7426974716004470031);


  const frames_7426691747398307106 = [{"t":0,"opacity":0,"x":72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426691747398307106(target, text, options) {
    return playFrames(target, text, frames_7426691747398307106, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426691747398307106", "向右滑动", "入场", "slide", anim_7426691747398307106);


  const frames_7426687310445546786 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426687310445546786(target, text, options) {
    return playFrames(target, text, frames_7426687310445546786, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426687310445546786", "弹入", "入场", "bounce", anim_7426687310445546786);


  const frames_7426681404529986831 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426681404529986831(target, text, options) {
    return playFrames(target, text, frames_7426681404529986831, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426681404529986831", "弹簧", "入场", "bounce", anim_7426681404529986831);


  const frames_7426693740120657192 = [{"t":0,"opacity":0,"x":-72,"y":0,"scale":0.98,"rotate":0,"blur":4,"skewX":-6,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426693740120657192(target, text, options) {
    return playFrames(target, text, frames_7426693740120657192, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426693740120657192", "向左滑动", "入场", "slide", anim_7426693740120657192);


  const frames_7426686289543515392 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426686289543515392(target, text, options) {
    return playFrames(target, text, frames_7426686289543515392, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426686289543515392", "向下滑动", "入场", "slide", anim_7426686289543515392);


  const frames_7426687597595938048 = [{"t":0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426687597595938048(target, text, options) {
    return playFrames(target, text, frames_7426687597595938048, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426687597595938048", "向上滑动", "入场", "slide", anim_7426687597595938048);


  const frames_7426692387486829876 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426692387486829876(target, text, options) {
    return playFrames(target, text, frames_7426692387486829876, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426692387486829876", "旋入", "入场", "rotate", anim_7426692387486829876);


  const frames_7426681066964012328 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426681066964012328(target, text, options) {
    return playFrames(target, text, frames_7426681066964012328, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426681066964012328", "放大", "入场", "zoom", anim_7426681066964012328);


  const frames_7426680815414709519 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1.7,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426680815414709519(target, text, options) {
    return playFrames(target, text, frames_7426680815414709519, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426680815414709519", "缩小", "入场", "zoom", anim_7426680815414709519);


  const frames_7426689558625930511 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426689558625930511(target, text, options) {
    return playFrames(target, text, frames_7426689558625930511, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426689558625930511", "轻微放大", "入场", "zoom", anim_7426689558625930511);


  const frames_7426684759327165731 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7426684759327165731(target, text, options) {
    return playFrames(target, text, frames_7426684759327165731, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7426684759327165731", "渐显", "入场", "fade", anim_7426684759327165731);


  const frames_7603676453242391833 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603676453242391833(target, text, options) {
    return playFrames(target, text, frames_7603676453242391833, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603676453242391833", "祥云开瑞", "入场", "fade", anim_7603676453242391833);


  const frames_7584344798853811480 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7584344798853811480(target, text, options) {
    return playFrames(target, text, frames_7584344798853811480, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7584344798853811480", "2026开场", "入场", "fade", anim_7584344798853811480);


  const frames_7573649443149401368 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7573649443149401368(target, text, options) {
    return playFrames(target, text, frames_7573649443149401368, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7573649443149401368", "开始游戏", "入场", "fade", anim_7573649443149401368);


  const frames_7645245942760869126 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645245942760869126(target, text, options) {
    return playFrames(target, text, frames_7645245942760869126, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645245942760869126", "模糊曝光", "入场", "blur", anim_7645245942760869126);


  const frames_7593261441302416683 = [{"t":0,"opacity":0,"x":-18.0,"y":18,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7593261441302416683(target, text, options) {
    return playFrames(target, text, frames_7593261441302416683, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7593261441302416683", "向左弹入", "入场", "bounce", anim_7593261441302416683);


  const frames_7211042099737662009 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7211042099737662009(target, text, options) {
    return playFrames(target, text, frames_7211042099737662009, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7211042099737662009", "震波 II", "入场", "wave_shake", anim_7211042099737662009);


  const frames_7623350406940232986 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623350406940232986(target, text, options) {
    return playFrames(target, text, frames_7623350406940232986, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623350406940232986", "樱花飘落", "入场", "slide", anim_7623350406940232986);


  const frames_7585461432037346585 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7585461432037346585(target, text, options) {
    return playFrames(target, text, frames_7585461432037346585, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7585461432037346585", "圣诞开幕", "入场", "wipe", anim_7585461432037346585);


  const frames_7603296002908359942 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603296002908359942(target, text, options) {
    return playFrames(target, text, frames_7603296002908359942, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603296002908359942", "弹跳放大", "入场", "bounce", anim_7603296002908359942);


  const frames_7448898555617481242 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7448898555617481242(target, text, options) {
    return playFrames(target, text, frames_7448898555617481242, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7448898555617481242", "时间倒计时", "入场", "fade", anim_7448898555617481242);


  const frames_7112725640901562887 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7112725640901562887(target, text, options) {
    return playFrames(target, text, frames_7112725640901562887, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7112725640901562887", "拉丝滑入", "入场", "slide", anim_7112725640901562887);


  const frames_7573606082162035992 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7573606082162035992(target, text, options) {
    return playFrames(target, text, frames_7573606082162035992, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7573606082162035992", "打开书籍", "入场", "fade", anim_7573606082162035992);


  const frames_7215530662986519096 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7215530662986519096(target, text, options) {
    return playFrames(target, text, frames_7215530662986519096, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7215530662986519096", "冲撞", "入场", "fade", anim_7215530662986519096);


  const frames_7273389803532456504 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7273389803532456504(target, text, options) {
    return playFrames(target, text, frames_7273389803532456504, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7273389803532456504", "向上闪入", "入场", "glow", anim_7273389803532456504);


  const frames_7475621358987136275 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7475621358987136275(target, text, options) {
    return playFrames(target, text, frames_7475621358987136275, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7475621358987136275", "信封", "入场", "fade", anim_7475621358987136275);


  const frames_7634015321052941604 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7634015321052941604(target, text, options) {
    return playFrames(target, text, frames_7634015321052941604, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7634015321052941604", "在路上", "入场", "fade", anim_7634015321052941604);


  const frames_7359472053998588425 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7359472053998588425(target, text, options) {
    return playFrames(target, text, frames_7359472053998588425, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7359472053998588425", "能量立方", "入场", "fade", anim_7359472053998588425);


  const frames_7623348756129352987 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623348756129352987(target, text, options) {
    return playFrames(target, text, frames_7623348756129352987, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623348756129352987", "金光石门", "入场", "fade", anim_7623348756129352987);


  const frames_7569229812993412376 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7569229812993412376(target, text, options) {
    return playFrames(target, text, frames_7569229812993412376, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7569229812993412376", "卷轴开卷", "入场", "fade", anim_7569229812993412376);


  const frames_7603294299920305444 = [{"t":0,"opacity":0,"x":-25.2,"y":0.0,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603294299920305444(target, text, options) {
    return playFrames(target, text, frames_7603294299920305444, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603294299920305444", "向左翻开", "入场", "rotate", anim_7603294299920305444);


  const frames_7434746460186350090 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7434746460186350090(target, text, options) {
    return playFrames(target, text, frames_7434746460186350090, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434746460186350090", "九宫格", "入场", "fade", anim_7434746460186350090);


  const frames_7625908947291082034 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7625908947291082034(target, text, options) {
    return playFrames(target, text, frames_7625908947291082034, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7625908947291082034", "插图展开", "入场", "fade", anim_7625908947291082034);


  const frames_7580736991269014846 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7580736991269014846(target, text, options) {
    return playFrames(target, text, frames_7580736991269014846, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7580736991269014846", "LED倒计时", "入场", "fade", anim_7580736991269014846);


  const frames_7551085667196079384 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7551085667196079384(target, text, options) {
    return playFrames(target, text, frames_7551085667196079384, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7551085667196079384", "滚动点击", "入场", "slide", anim_7551085667196079384);


  const frames_7621901198144245017 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7621901198144245017(target, text, options) {
    return playFrames(target, text, frames_7621901198144245017, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7621901198144245017", "拉开春序", "入场", "slide", anim_7621901198144245017);


  const frames_7338320641306661410 = [{"t":0,"opacity":0,"x":0,"y":-56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7338320641306661410(target, text, options) {
    return playFrames(target, text, frames_7338320641306661410, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7338320641306661410", "向下甩动", "入场", "slide", anim_7338320641306661410);


  const frames_7322367212142989850 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7322367212142989850(target, text, options) {
    return playFrames(target, text, frames_7322367212142989850, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7322367212142989850", "流金", "入场", "fade", anim_7322367212142989850);


  const frames_7633732235207724331 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633732235207724331(target, text, options) {
    return playFrames(target, text, frames_7633732235207724331, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633732235207724331", "扇形展开", "入场", "fade", anim_7633732235207724331);


  const frames_7329444938960081460 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7329444938960081460(target, text, options) {
    return playFrames(target, text, frames_7329444938960081460, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7329444938960081460", "多层环形", "入场", "fade", anim_7329444938960081460);


  const frames_7296381392340914715 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7296381392340914715(target, text, options) {
    return playFrames(target, text, frames_7296381392340914715, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7296381392340914715", "快速翻页", "入场", "rotate", anim_7296381392340914715);


  const frames_7633753269327662398 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633753269327662398(target, text, options) {
    return playFrames(target, text, frames_7633753269327662398, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633753269327662398", "刮刮乐", "入场", "fade", anim_7633753269327662398);


  const frames_7578780110870990105 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7578780110870990105(target, text, options) {
    return playFrames(target, text, frames_7578780110870990105, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578780110870990105", "纸张展开III", "入场", "fade", anim_7578780110870990105);


  const frames_7434412782289687066 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7434412782289687066(target, text, options) {
    return playFrames(target, text, frames_7434412782289687066, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434412782289687066", "三屏切闪", "入场", "glow", anim_7434412782289687066);


  const frames_7222990639984546360 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7222990639984546360(target, text, options) {
    return playFrames(target, text, frames_7222990639984546360, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7222990639984546360", "交叉震动", "入场", "wave_shake", anim_7222990639984546360);


  const frames_7436273288608764442 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273288608764442(target, text, options) {
    return playFrames(target, text, frames_7436273288608764442, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288608764442", "黑白画中画", "入场", "fade", anim_7436273288608764442);


  const frames_7509110211395931416 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7509110211395931416(target, text, options) {
    return playFrames(target, text, frames_7509110211395931416, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7509110211395931416", "照片入场", "入场", "fade", anim_7509110211395931416);


  const frames_7572090975095606552 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7572090975095606552(target, text, options) {
    return playFrames(target, text, frames_7572090975095606552, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572090975095606552", "2026滚动", "入场", "slide", anim_7572090975095606552);


  const frames_7576953191850396953 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7576953191850396953(target, text, options) {
    return playFrames(target, text, frames_7576953191850396953, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7576953191850396953", "彩球倒计时", "入场", "fade", anim_7576953191850396953);


  const frames_7635684765890383128 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7635684765890383128(target, text, options) {
    return playFrames(target, text, frames_7635684765890383128, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7635684765890383128", "螺旋入场", "入场", "rotate", anim_7635684765890383128);


  const frames_7602929179234929945 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7602929179234929945(target, text, options) {
    return playFrames(target, text, frames_7602929179234929945, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7602929179234929945", "礼物拆盒", "入场", "fade", anim_7602929179234929945);


  const frames_7564704718640123160 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7564704718640123160(target, text, options) {
    return playFrames(target, text, frames_7564704718640123160, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7564704718640123160", "九宫格拼接", "入场", "fade", anim_7564704718640123160);


  const frames_7631882916947119402 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7631882916947119402(target, text, options) {
    return playFrames(target, text, frames_7631882916947119402, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631882916947119402", "相片堆叠", "入场", "fade", anim_7631882916947119402);


  const frames_7633819552584994110 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633819552584994110(target, text, options) {
    return playFrames(target, text, frames_7633819552584994110, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633819552584994110", "鼠标拖入", "入场", "fade", anim_7633819552584994110);


  const frames_7298688232294715931 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7298688232294715931(target, text, options) {
    return playFrames(target, text, frames_7298688232294715931, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7298688232294715931", "空间扭曲", "入场", "fade", anim_7298688232294715931);


  const frames_7633732706433617171 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7633732706433617171(target, text, options) {
    return playFrames(target, text, frames_7633732706433617171, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7633732706433617171", "宫格归位", "入场", "fade", anim_7633732706433617171);


  const frames_7608054633453505817 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7608054633453505817(target, text, options) {
    return playFrames(target, text, frames_7608054633453505817, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7608054633453505817", "手机开屏", "入场", "wipe", anim_7608054633453505817);


  const frames_7576273357184781593 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.38,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7576273357184781593(target, text, options) {
    return playFrames(target, text, frames_7576273357184781593, Object.assign({
      split: "whole",
      duration: 880,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7576273357184781593", "放大镜", "入场", "zoom", anim_7576273357184781593);


  const frames_7265946978792510010 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7265946978792510010(target, text, options) {
    return playFrames(target, text, frames_7265946978792510010, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7265946978792510010", "抖动横移", "入场", "wave_shake", anim_7265946978792510010);


  const frames_7307196313148330547 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7307196313148330547(target, text, options) {
    return playFrames(target, text, frames_7307196313148330547, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7307196313148330547", "震动波纹", "入场", "wave_shake", anim_7307196313148330547);


  const frames_7413325383308677683 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7413325383308677683(target, text, options) {
    return playFrames(target, text, frames_7413325383308677683, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7413325383308677683", "冰块", "入场", "fade", anim_7413325383308677683);


  const frames_7641541215736909080 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7641541215736909080(target, text, options) {
    return playFrames(target, text, frames_7641541215736909080, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7641541215736909080", "上课", "入场", "fade", anim_7641541215736909080);


  const frames_7612574566052826387 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7612574566052826387(target, text, options) {
    return playFrames(target, text, frames_7612574566052826387, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7612574566052826387", "闪白抖动", "入场", "glow", anim_7612574566052826387);


  const frames_7605543998618438936 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7605543998618438936(target, text, options) {
    return playFrames(target, text, frames_7605543998618438936, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7605543998618438936", "复古卷轴", "入场", "fade", anim_7605543998618438936);


  const frames_7615181393689185577 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615181393689185577(target, text, options) {
    return playFrames(target, text, frames_7615181393689185577, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615181393689185577", "圆环旋转", "入场", "rotate", anim_7615181393689185577);


  const frames_7634144101713136921 = [{"t":0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7634144101713136921(target, text, options) {
    return playFrames(target, text, frames_7634144101713136921, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7634144101713136921", "上滑点开", "入场", "slide", anim_7634144101713136921);


  const frames_7449589619034690074 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7449589619034690074(target, text, options) {
    return playFrames(target, text, frames_7449589619034690074, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449589619034690074", "报纸拼贴", "入场", "fade", anim_7449589619034690074);


  const frames_7593261620990725412 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7593261620990725412(target, text, options) {
    return playFrames(target, text, frames_7593261620990725412, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7593261620990725412", "错位拼接", "入场", "glitch", anim_7593261620990725412);


  const frames_7615181568486821163 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615181568486821163(target, text, options) {
    return playFrames(target, text, frames_7615181568486821163, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615181568486821163", "模糊闪白", "入场", "blur", anim_7615181568486821163);


  const frames_7549508208612920600 = [{"t":0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7549508208612920600(target, text, options) {
    return playFrames(target, text, frames_7549508208612920600, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7549508208612920600", "方块滑入", "入场", "slide", anim_7549508208612920600);


  const frames_7598403702877293886 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7598403702877293886(target, text, options) {
    return playFrames(target, text, frames_7598403702877293886, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598403702877293886", "醒狮采青", "入场", "fade", anim_7598403702877293886);


  const frames_7532952859965689113 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7532952859965689113(target, text, options) {
    return playFrames(target, text, frames_7532952859965689113, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7532952859965689113", "时间开幕", "入场", "wipe", anim_7532952859965689113);


  const frames_7623373871084899610 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623373871084899610(target, text, options) {
    return playFrames(target, text, frames_7623373871084899610, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623373871084899610", "交错归位", "入场", "fade", anim_7623373871084899610);


  const frames_7610346676859227417 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7610346676859227417(target, text, options) {
    return playFrames(target, text, frames_7610346676859227417, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7610346676859227417", "春意入画", "入场", "fade", anim_7610346676859227417);


  const frames_7581793227150511422 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7581793227150511422(target, text, options) {
    return playFrames(target, text, frames_7581793227150511422, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7581793227150511422", "打开文件夹", "入场", "fade", anim_7581793227150511422);


  const frames_7646757756103314713 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646757756103314713(target, text, options) {
    return playFrames(target, text, frames_7646757756103314713, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646757756103314713", "重炮轰球", "入场", "fade", anim_7646757756103314713);


  const frames_7312341574988337690 = [{"t":0,"opacity":0,"x":0,"y":56,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0},{"t":0.78,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7312341574988337690(target, text, options) {
    return playFrames(target, text, frames_7312341574988337690, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7312341574988337690", "向上滚动", "入场", "slide", anim_7312341574988337690);


  const frames_7634015465588673811 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7634015465588673811(target, text, options) {
    return playFrames(target, text, frames_7634015465588673811, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7634015465588673811", "享受生活", "入场", "fade", anim_7634015465588673811);


  const frames_7468589903001948681 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7468589903001948681(target, text, options) {
    return playFrames(target, text, frames_7468589903001948681, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7468589903001948681", "手写云朵", "入场", "material", anim_7468589903001948681);


  const frames_7434746460190544411 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7434746460190544411(target, text, options) {
    return playFrames(target, text, frames_7434746460190544411, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434746460190544411", "九宫格", "出场", "fade", anim_7434746460190544411);


  const frames_7614238835781831960 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7614238835781831960(target, text, options) {
    return playFrames(target, text, frames_7614238835781831960, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7614238835781831960", "扇形闭合", "出场", "fade", anim_7614238835781831960);


  const frames_7447044440868262410 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7447044440868262410(target, text, options) {
    return playFrames(target, text, frames_7447044440868262410, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7447044440868262410", "冬季雪花", "出场", "material", anim_7447044440868262410);


  const frames_7307196476340310554 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7307196476340310554(target, text, options) {
    return playFrames(target, text, frames_7307196476340310554, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7307196476340310554", "震动波纹", "出场", "wave_shake", anim_7307196476340310554);


  const frames_7436273288612942374 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273288612942374(target, text, options) {
    return playFrames(target, text, frames_7436273288612942374, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288612942374", "黑白画中画", "出场", "fade", anim_7436273288612942374);


  const frames_7434412782285492773 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7434412782285492773(target, text, options) {
    return playFrames(target, text, frames_7434412782285492773, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434412782285492773", "竖向拼接", "出场", "fade", anim_7434412782285492773);


  const frames_7343902820808004123 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7343902820808004123(target, text, options) {
    return playFrames(target, text, frames_7343902820808004123, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7343902820808004123", "弹力分割", "出场", "bounce", anim_7343902820808004123);


  const frames_7436273288604553755 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":28,"scale":0.98,"rotate":0,"blur":4,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273288604553755(target, text, options) {
    return playFrames(target, text, frames_7436273288604553755, Object.assign({
      split: "whole",
      duration: 820,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288604553755", "区域色块滑动", "出场", "slide", anim_7436273288604553755);


  const frames_7434055685572153907 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7434055685572153907(target, text, options) {
    return playFrames(target, text, frames_7434055685572153907, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434055685572153907", "多屏分割I", "出场", "fade", anim_7434055685572153907);


  const frames_7434055685572137482 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7434055685572137482(target, text, options) {
    return playFrames(target, text, frames_7434055685572137482, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434055685572137482", "多屏分割II", "出场", "fade", anim_7434055685572137482);


  const frames_7572779340153343256 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7572779340153343256(target, text, options) {
    return playFrames(target, text, frames_7572779340153343256, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7572779340153343256", "竖向切出", "出场", "fade", anim_7572779340153343256);


  const frames_7436273288608748041 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7436273288608748041(target, text, options) {
    return playFrames(target, text, frames_7436273288608748041, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7436273288608748041", "录像带分屏", "出场", "fade", anim_7436273288608748041);


  const frames_7442590863349256754 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0}];
  function anim_7442590863349256754(target, text, options) {
    return playFrames(target, text, frames_7442590863349256754, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7442590863349256754", "雪花遮罩", "出场", "wipe", anim_7442590863349256754);


  const frames_7567665590966652185 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.5,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1.0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6}];
  function anim_7567665590966652185(target, text, options) {
    return playFrames(target, text, frames_7567665590966652185, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7567665590966652185", "扔雪球", "出场", "material", anim_7567665590966652185);


  const frames_7361364150229930506 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7361364150229930506(target, text, options) {
    return playFrames(target, text, frames_7361364150229930506, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7361364150229930506", "能量立方", "出场", "fade", anim_7361364150229930506);


  const frames_7449589619038884378 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7449589619038884378(target, text, options) {
    return playFrames(target, text, frames_7449589619038884378, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7449589619038884378", "报纸拼贴Ⅱ", "出场", "fade", anim_7449589619038884378);


  const frames_7485187466618785048 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7485187466618785048(target, text, options) {
    return playFrames(target, text, frames_7485187466618785048, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7485187466618785048", "破碎的心", "出场", "fade", anim_7485187466618785048);


  const frames_7598131448729668926 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7598131448729668926(target, text, options) {
    return playFrames(target, text, frames_7598131448729668926, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7598131448729668926", "辉光飞出", "出场", "glow", anim_7598131448729668926);


  const frames_7434055685567943194 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":0.667,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":1.0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0}];
  function anim_7434055685567943194(target, text, options) {
    return playFrames(target, text, frames_7434055685567943194, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7434055685567943194", "负片闪屏", "出场", "glow", anim_7434055685567943194);


  const frames_7435897594078827035 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.75,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":1.0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7435897594078827035(target, text, options) {
    return playFrames(target, text, frames_7435897594078827035, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7435897594078827035", "晃动抽帧", "出场", "wave_shake", anim_7435897594078827035);


  const frames_7345803511390540288 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.333,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.667,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0}];
  function anim_7345803511390540288(target, text, options) {
    return playFrames(target, text, frames_7345803511390540288, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7345803511390540288", "波纹弹动", "出场", "bounce", anim_7345803511390540288);


  const frames_7566927273631173898 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566927273631173898(target, text, options) {
    return playFrames(target, text, frames_7566927273631173898, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566927273631173898", "玉兔渐显", "入场", "fade", anim_7566927273631173898);


  const frames_7563555563871800626 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7563555563871800626(target, text, options) {
    return playFrames(target, text, frames_7563555563871800626, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7563555563871800626", "彩带喷射", "入场", "fade", anim_7563555563871800626);


  const frames_7566973606207573275 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566973606207573275(target, text, options) {
    return playFrames(target, text, frames_7566973606207573275, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566973606207573275", "南瓜火焰", "入场", "material", anim_7566973606207573275);


  const frames_7169419861158793759 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7169419861158793759(target, text, options) {
    return playFrames(target, text, frames_7169419861158793759, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7169419861158793759", "圣诞帽弹跳", "入场", "bounce", anim_7169419861158793759);


  const frames_7174706243267727930 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7174706243267727930(target, text, options) {
    return playFrames(target, text, frames_7174706243267727930, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7174706243267727930", "圣诞树弹跳II", "入场", "bounce", anim_7174706243267727930);


  const frames_7526839887526448430 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7526839887526448430(target, text, options) {
    return playFrames(target, text, frames_7526839887526448430, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7526839887526448430", "立体折叠", "入场", "rotate", anim_7526839887526448430);


  const frames_7579090445565758783 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7579090445565758783(target, text, options) {
    return playFrames(target, text, frames_7579090445565758783, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7579090445565758783", "探照灯", "入场", "fade", anim_7579090445565758783);


  const frames_7304943429962699290 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7304943429962699290(target, text, options) {
    return playFrames(target, text, frames_7304943429962699290, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7304943429962699290", "玩雪", "入场", "material", anim_7304943429962699290);


  const frames_7566927578670452006 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7566927578670452006(target, text, options) {
    return playFrames(target, text, frames_7566927578670452006, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7566927578670452006", "玉兔衔灯", "入场", "fade", anim_7566927578670452006);


  const frames_7646323098160991529 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646323098160991529(target, text, options) {
    return playFrames(target, text, frames_7646323098160991529, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646323098160991529", "多层上移", "入场", "fade", anim_7646323098160991529);


  const frames_7629238590526147865 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7629238590526147865(target, text, options) {
    return playFrames(target, text, frames_7629238590526147865, Object.assign({
      split: "whole",
      duration: 1400,
      stagger: 0,
      loop: true,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7629238590526147865", "循环翻页", "循环", "rotate", anim_7629238590526147865);


  const frames_7647824968104955155 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647824968104955155(target, text, options) {
    return playFrames(target, text, frames_7647824968104955155, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647824968104955155", "辉光渐消", "入场", "glow", anim_7647824968104955155);


  const frames_7646350670030720281 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7646350670030720281(target, text, options) {
    return playFrames(target, text, frames_7646350670030720281, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7646350670030720281", "粽叶迎端午", "入场", "fade", anim_7646350670030720281);


  const frames_7632570695318474046 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0,"glow":0},{"t":0.55,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":0.7,"glow":0.18},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7632570695318474046(target, text, options) {
    return playFrames(target, text, frames_7632570695318474046, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7632570695318474046", "百叶窗", "入场", "wipe", anim_7632570695318474046);


  const frames_7602927717171858713 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7602927717171858713(target, text, options) {
    return playFrames(target, text, frames_7602927717171858713, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7602927717171858713", "马年鞭炮", "入场", "fade", anim_7602927717171858713);


  const frames_7603296338599529734 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603296338599529734(target, text, options) {
    return playFrames(target, text, frames_7603296338599529734, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603296338599529734", "故障拉扯", "入场", "glitch", anim_7603296338599529734);


  const frames_7578785136351808830 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7578785136351808830(target, text, options) {
    return playFrames(target, text, frames_7578785136351808830, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7578785136351808830", "胶片翻转", "入场", "rotate", anim_7578785136351808830);


  const frames_7580628825495883032 = [{"t":0,"opacity":0,"x":0.0,"y":8.4,"scale":0.9,"rotate":-5,"blur":8,"skewX":0,"clip":0.15,"glow":0.6},{"t":0.48,"opacity":0.85,"x":0,"y":0,"scale":1.08,"rotate":3,"blur":2,"skewX":0,"clip":0.85,"glow":0.75},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7580628825495883032(target, text, options) {
    return playFrames(target, text, frames_7580628825495883032, Object.assign({
      split: "whole",
      duration: 1050,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7580628825495883032", "水墨太极", "入场", "material", anim_7580628825495883032);


  const frames_7597365048859921726 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7597365048859921726(target, text, options) {
    return playFrames(target, text, frames_7597365048859921726, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7597365048859921726", "春节卷轴", "入场", "fade", anim_7597365048859921726);


  const frames_7394717122653327910 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7394717122653327910(target, text, options) {
    return playFrames(target, text, frames_7394717122653327910, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7394717122653327910", "飞近", "入场", "fade", anim_7394717122653327910);


  const frames_7647823751656115492 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7647823751656115492(target, text, options) {
    return playFrames(target, text, frames_7647823751656115492, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647823751656115492", "RGB撕裂", "入场", "fade", anim_7647823751656115492);


  const frames_7630761864976141610 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7630761864976141610(target, text, options) {
    return playFrames(target, text, frames_7630761864976141610, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7630761864976141610", "磨砂旋入", "入场", "rotate", anim_7630761864976141610);


  const frames_7158737452939612703 = [{"t":0,"opacity":0,"x":0,"y":10,"scale":0.96,"rotate":0,"blur":6,"skewX":0,"clip":1,"glow":0},{"t":0.42,"opacity":1,"x":0,"y":0,"scale":1.08,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":1},{"t":0.7,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0.45},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7158737452939612703(target, text, options) {
    return playFrames(target, text, frames_7158737452939612703, Object.assign({
      split: "whole",
      duration: 1100,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7158737452939612703", "曝光放射", "入场", "glow", anim_7158737452939612703);


  const frames_7615181657636637994 = [{"t":0,"opacity":0,"x":0.0,"y":9.799999999999999,"scale":0.76,"rotate":-32,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.68,"opacity":1,"x":0,"y":-2,"scale":1.06,"rotate":8,"blur":0,"skewX":0,"clip":1,"glow":0.08},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7615181657636637994(target, text, options) {
    return playFrames(target, text, frames_7615181657636637994, Object.assign({
      split: "whole",
      duration: 960,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7615181657636637994", "回旋冲击", "入场", "rotate", anim_7615181657636637994);


  const frames_7549111197052783897 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7549111197052783897(target, text, options) {
    return playFrames(target, text, frames_7549111197052783897, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7549111197052783897", "网格显现", "入场", "fade", anim_7549111197052783897);


  const frames_7631881815258697014 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7631881815258697014(target, text, options) {
    return playFrames(target, text, frames_7631881815258697014, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631881815258697014", "花屏故障", "入场", "glitch", anim_7631881815258697014);


  const frames_7603291462113053988 = [{"t":0,"opacity":0,"x":-18,"y":0,"scale":1,"rotate":0,"blur":1,"skewX":-8,"clip":1,"glow":0.8},{"t":0.22,"opacity":1,"x":14,"y":-2,"scale":1.03,"rotate":0,"blur":0,"skewX":9,"clip":0.78,"glow":1},{"t":0.46,"opacity":0.72,"x":-7,"y":2,"scale":0.98,"rotate":0,"blur":3,"skewX":-4,"clip":0.92,"glow":0.6},{"t":0.72,"opacity":1,"x":5,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":3,"clip":1,"glow":0.25},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7603291462113053988(target, text, options) {
    return playFrames(target, text, frames_7603291462113053988, Object.assign({
      split: "whole",
      duration: 780,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7603291462113053988", "闪屏故障", "入场", "glitch", anim_7603291462113053988);


  const frames_7614338125699173694 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7614338125699173694(target, text, options) {
    return playFrames(target, text, frames_7614338125699173694, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7614338125699173694", "扇形展开", "入场", "fade", anim_7614338125699173694);


  const frames_7645245824187780358 = [{"t":0,"opacity":0,"x":0.0,"y":18.2,"scale":1.12,"rotate":0,"blur":18,"skewX":0,"clip":1,"glow":0},{"t":0.72,"opacity":1,"x":0,"y":0,"scale":1.02,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0.1},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7645245824187780358(target, text, options) {
    return playFrames(target, text, frames_7645245824187780358, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7645245824187780358", "模糊闪光Ⅱ", "入场", "blur", anim_7645245824187780358);


  const frames_7593261186502675766 = [{"t":0,"opacity":0,"x":0.0,"y":46,"scale":0.62,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.58,"opacity":1,"x":0,"y":-10,"scale":1.16,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":0.82,"opacity":1,"x":0,"y":3,"scale":0.96,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7593261186502675766(target, text, options) {
    return playFrames(target, text, frames_7593261186502675766, Object.assign({
      split: "whole",
      duration: 900,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7593261186502675766", "引力弹簧", "入场", "bounce", anim_7593261186502675766);


  const frames_7604096402565713176 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7604096402565713176(target, text, options) {
    return playFrames(target, text, frames_7604096402565713176, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7604096402565713176", "花瓣吹拂", "入场", "fade", anim_7604096402565713176);


  const frames_7623372641159662857 = [{"t":0,"opacity":0,"x":0,"y":0,"scale":0.94,"rotate":0,"blur":1,"skewX":0,"clip":1,"glow":0},{"t":0.25,"opacity":1,"x":-8,"y":-2,"scale":1.04,"rotate":-2,"blur":0,"skewX":-4,"clip":1,"glow":0.2},{"t":0.5,"opacity":1,"x":8,"y":2,"scale":0.98,"rotate":2,"blur":0,"skewX":4,"clip":1,"glow":0.08},{"t":0.76,"opacity":1,"x":-3,"y":0,"scale":1.02,"rotate":-1,"blur":0,"skewX":-2,"clip":1,"glow":0.12},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7623372641159662857(target, text, options) {
    return playFrames(target, text, frames_7623372641159662857, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7623372641159662857", "波浪碎片Ⅱ", "入场", "wave_shake", anim_7623372641159662857);


  const frames_7631882260253396243 = [{"t":0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0},{"t":1,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0}];
  function anim_7631882260253396243(target, text, options) {
    return playFrames(target, text, frames_7631882260253396243, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7631882260253396243", "棱镜色散", "入场", "fade", anim_7631882260253396243);


  const frames_7283415427328250405 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7283415427328250405(target, text, options) {
    return playFrames(target, text, frames_7283415427328250405, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7283415427328250405", "马赛克", "出场", "fade", anim_7283415427328250405);


  const frames_7647807129075731753 = [{"t":0.0,"opacity":1,"x":0,"y":0,"scale":1,"rotate":0,"blur":0,"skewX":0,"clip":1,"glow":0},{"t":1.0,"opacity":0,"x":0,"y":14,"scale":0.98,"rotate":0,"blur":2,"skewX":0,"clip":1,"glow":0}];
  function anim_7647807129075731753(target, text, options) {
    return playFrames(target, text, frames_7647807129075731753, Object.assign({
      split: "whole",
      duration: 760,
      stagger: 0,
      loop: false,
      defaultText: "字体动效",
      easing: "cubic-bezier(0.2,0.8,0.2,1)"
    }, options || {}));
  }
  register("7647807129075731753", "极光爆发", "出场", "fade", anim_7647807129075731753);

})(typeof globalThis !== "undefined" ? globalThis : window);
