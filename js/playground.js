const controls = {
    color: document.querySelector('#color-preset'),
    direction: document.querySelector('#gradient-direction'),
    blur: document.querySelector('#blur-strength'),
    opacity: document.querySelector('#panel-opacity'),
    radius: document.querySelector('#panel-radius'),
    background: document.querySelector('#background-choice'),
    motion: document.querySelector('#motion-intensity')
};
const preview = document.querySelector('#glass-preview');
const stage = document.querySelector('#playground-stage');
const cssOutput = document.querySelector('#css-output');
const copyButton = document.querySelector('#copy-css');
const resetButton = document.querySelector('#reset-playground');
const status = document.querySelector('#playground-status');

const presets = {
    ocean: { primary: [143, 231, 255], secondary: [94, 211, 255] },
    lagoon: { primary: [94, 225, 198], secondary: [80, 155, 220] },
    ember: { primary: [255, 185, 135], secondary: [231, 112, 142] },
    violet: { primary: [193, 170, 255], secondary: [122, 156, 255] }
};

const defaults = {
    color: 'ocean',
    direction: '135deg',
    blur: 14,
    opacity: 18,
    radius: 24,
    background: 'bg-1.webp',
    motion: 20
};

function updatePlayground() {
    if (!preview || !stage || !cssOutput) {
        return;
    }

    const preset = presets[controls.color.value];
    const blur = Number(controls.blur.value);
    const opacity = Number(controls.opacity.value) / 100;
    const radius = Number(controls.radius.value);
    const motion = Number(controls.motion.value);
    const direction = controls.direction.value;
    const [red, green, blue] = preset.primary;
    const [secondRed, secondGreen, secondBlue] = preset.secondary;
    const motionCSS = motion > 0
        ? `

@keyframes glass-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-${(motion / 10).toFixed(1)}px); }
}

@media (prefers-reduced-motion: reduce) {
  .glass-panel { animation: none; }
}`
        : '';

    preview.style.background = `linear-gradient(${direction}, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${secondRed}, ${secondGreen}, ${secondBlue}, ${opacity * 0.55}))`;
    preview.style.backdropFilter = `blur(${blur}px)`;
    preview.style.webkitBackdropFilter = `blur(${blur}px)`;
    preview.style.borderRadius = `${radius}px`;
    preview.style.animation = motion > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? `glass-float ${12 - motion * 0.08}s ease-in-out infinite`
        : 'none';
    preview.style.setProperty('--motion-distance', `${-(motion / 10)}px`);

    stage.dataset.background = controls.background.value;

    document.querySelector('#blur-value').value = `${blur}px`;
    document.querySelector('#opacity-value').value = `${controls.opacity.value}%`;
    document.querySelector('#radius-value').value = `${radius}px`;
    document.querySelector('#motion-value').value = `${motion}%`;

    const backgroundUrl = `url("img/${controls.background.value}")`;
    const css = `.glass-scene {
  background-image: ${backgroundUrl};
  background-size: cover;
  background-position: center;
}

.glass-panel {
  background: linear-gradient(${direction}, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${secondRed}, ${secondGreen}, ${secondBlue}, ${(opacity * 0.55).toFixed(3)}));
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: ${radius}px;${motion > 0 ? `\n  animation: glass-float ${12 - motion * 0.08}s ease-in-out infinite;` : ''}
}${motionCSS}`;

    cssOutput.textContent = css;
    copyButton.disabled = false;
}

function copyFallback(text) {
    const temporaryInput = document.createElement('textarea');
    temporaryInput.value = text;
    temporaryInput.setAttribute('readonly', '');
    temporaryInput.style.position = 'fixed';
    temporaryInput.style.opacity = '0';
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand('copy');
    temporaryInput.remove();
    return copied;
}

if (preview && stage && cssOutput && copyButton && resetButton) {
    Object.entries(controls).forEach(([name, control]) => {
        control.addEventListener('input', updatePlayground);
        control.addEventListener('change', updatePlayground);
        control.value = String(defaults[name]);
    });

    updatePlayground();

    resetButton.addEventListener('click', () => {
        Object.entries(defaults).forEach(([name, value]) => {
            controls[name].value = String(value);
        });
        updatePlayground();
        status.textContent = 'Playground reset to its defaults.';
    });

    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(cssOutput.textContent);
            status.textContent = 'CSS copied to clipboard.';
        } catch {
            if (copyFallback(cssOutput.textContent)) {
                status.textContent = 'CSS copied to clipboard.';
            } else {
                status.textContent = 'Copy failed. Select the CSS above and copy it manually.';
            }
        }
    });
}
