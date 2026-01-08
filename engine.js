// Remoi Art Engine - ENHANCED VERSION
console.log('🎨 Remoi Art Engine loading...');

let currentSketch = null;
let showcaseInterval = null;
let currentPresetIndex = 0;

// Console logging
function logToConsole(message, type = 'info') {
    const consoleEl = document.getElementById('console-output');
    if (!consoleEl) return;
    
    const content = consoleEl.querySelector('.console-content');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    
    // Colors based on type
    if (type === 'error') logEntry.style.color = '#ff6666';
    else if (type === 'success') logEntry.style.color = '#66ff66';
    else if (type === 'warning') logEntry.style.color = '#ffff66';
    else logEntry.style.color = '#ccccff';
    
    logEntry.textContent = `[${timestamp}] ${message}`;
    content.appendChild(logEntry);
    
    // Keep last 20 lines
    const lines = content.children;
    if (lines.length > 20) {
        content.removeChild(lines[0]);
    }
    
    content.scrollTop = content.scrollHeight;
}

// Clear console
function clearConsole() {
    const consoleEl = document.getElementById('console-output');
    if (consoleEl) {
        const content = consoleEl.querySelector('.console-content');
        content.innerHTML = 'Ready to run code...';
    }
}

// Showcase Presets - ENHANCED WITH MORE PRESETS
const SHOWCASE_PRESETS = [
    {
        name: "Cosmic Spiral",
        createSketch: function(p) {
            let t = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.stroke(100, 255, 200);
                p.noFill();
                p.strokeWeight(2);
            };
            
            p.draw = function() {
                p.background(0, 20);
                p.translate(p.width/2, p.height/2);
                
                p.beginShape();
                for (let i = 0; i < 300; i++) {
                    let angle = i * 0.1 + t;
                    let radius = 150 + p.sin(angle * 3) * 80;
                    p.vertex(radius * p.cos(angle), radius * p.sin(angle));
                }
                p.endShape();
                t += 0.02;
            };
        }
    },
    {
        name: "Particle Storm",
        createSketch: function(p) {
            let particles = [];
            
            p.setup = function() {
                p.createCanvas(600, 600);
                for (let i = 0; i < 80; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-2, 2),
                        vy: p.random(-2, 2),
                        size: p.random(5, 15),
                        color: [p.random(150, 255), p.random(100, 200), p.random(200, 255)]
                    });
                }
            };
            
            p.draw = function() {
                p.background(0, 30);
                p.noStroke();
                
                for (let particle of particles) {
                    p.fill(particle.color[0], particle.color[1], particle.color[2], 200);
                    p.ellipse(particle.x, particle.y, particle.size);
                    
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    if (particle.x < -10) particle.x = p.width + 10;
                    if (particle.x > p.width + 10) particle.x = -10;
                    if (particle.y < -10) particle.y = p.height + 10;
                    if (particle.y > p.height + 10) particle.y = -10;
                }
            };
        }
    },
    {
        name: "Wave Field",
        createSketch: function(p) {
            let t = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.stroke(255, 200, 100);
                p.strokeWeight(2);
            };
            
            p.draw = function() {
                p.background(0, 15);
                
                for (let y = 0; y < p.height; y += 20) {
                    for (let x = 0; x < p.width; x += 20) {
                        let wave = p.sin(x * 0.02 + y * 0.01 + t) * 10;
                        p.point(x + wave, y);
                    }
                }
                t += 0.03;
            };
        }
    },
    {
        name: "Neon Grid",
        createSketch: function(p) {
            let t = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.noStroke();
            };
            
            p.draw = function() {
                p.background(0);
                
                for (let i = 0; i < 20; i++) {
                    for (let j = 0; j < 20; j++) {
                        let x = i * 30 + 15;
                        let y = j * 30 + 15;
                        
                        p.fill(
                            128 + 127 * p.sin(t + i * 0.3),
                            128 + 127 * p.sin(t * 1.5 + j * 0.3),
                            128 + 127 * p.sin(t * 2 + (i + j) * 0.1)
                        );
                        
                        let size = 10 + 8 * p.sin(t * 2 + i * 0.5 + j * 0.3);
                        p.ellipse(x, y, size, size);
                    }
                }
                t += 0.01;
            };
        }
    },
    {
        name: "Magnetic Lines",
        createSketch: function(p) {
            let t = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.stroke(0, 255, 255);
            };
            
            p.draw = function() {
                p.background(0, 10);
                p.translate(p.width/2, p.height/2);
                
                for (let i = 0; i < 80; i++) {
                    let angle = i * 0.2 + t;
                    let x = 200 * p.cos(angle);
                    let y = 200 * p.sin(angle);
                    let hue = (p.frameCount + i * 5) % 360;
                    p.stroke(p.color(`hsb(${hue}, 100%, 100%)`));
                    p.line(0, 0, x, y);
                }
                t += 0.01;
            };
        }
    },
    {
        name: "Fractal Tree",
        createSketch: function(p) {
            let angle = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.stroke(0, 255, 100, 200);
                p.strokeWeight(2);
            };
            
            p.draw = function() {
                p.background(0);
                p.translate(p.width/2, p.height);
                
                angle = p.sin(p.frameCount * 0.01) * 0.5;
                drawBranch(p, 150, 10);
            };
            
            function drawBranch(p, len, depth) {
                if (depth <= 0) return;
                
                p.line(0, 0, 0, -len);
                p.translate(0, -len);
                
                if (len > 2) {
                    p.push();
                    p.rotate(angle);
                    drawBranch(p, len * 0.67, depth - 1);
                    p.pop();
                    
                    p.push();
                    p.rotate(-angle);
                    drawBranch(p, len * 0.67, depth - 1);
                    p.pop();
                }
            }
        }
    },
    {
        name: "Kaleidoscope",
        createSketch: function(p) {
            let t = 0;
            
            p.setup = function() {
                p.createCanvas(600, 600);
                p.noStroke();
            };
            
            p.draw = function() {
                p.background(0, 30);
                p.translate(p.width/2, p.height/2);
                
                for (let i = 0; i < 12; i++) {
                    p.rotate(p.PI / 6);
                    p.fill(
                        100 + 155 * p.sin(t + i),
                        100 + 155 * p.sin(t * 1.3 + i),
                        100 + 155 * p.sin(t * 1.7 + i)
                    );
                    p.rect(50, 0, 100, 100);
                    p.ellipse(150, 50, 60, 60);
                }
                t += 0.02;
            };
        }
    }
];

// Stop current sketch
function stopCurrentSketch() {
    if (currentSketch) {
        try {
            currentSketch.remove();
            currentSketch = null;
        } catch (e) {
            console.log('Cleanup:', e);
        }
    }
}

// Run p5.js code - ENHANCED WITH ERROR HANDLING
function runP5Code(codeFunction, containerId, seed = null) {
    // Stop previous
    stopCurrentSketch();
    
    // Clear container
    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Container not found:', containerId);
        return false;
    }
    container.innerHTML = '';
    
    // Show loading
    // container.innerHTML = '<div style="color: #666; display: flex; align-items: center; justify-content: center; height: 100%; font-size: 18px;">Loading...</div>';
    
    setTimeout(() => {
        try {
            // Create sketch with error handling
            currentSketch = new p5(function(p) {
                // Store p5 instance globally for debugging
                window.p5Instance = p;
                
                // Apply seed if provided
                if (seed !== null) {
                    p.randomSeed(seed);
                    p.noiseSeed(seed);
                }
                
                // Initialize variables
                let setupComplete = false;
                
                // Execute the function
                if (typeof codeFunction === 'function') {
                    try {
                        codeFunction(p);
                    } catch (funcError) {
                        console.error('Function error:', funcError);
                        setupFallbackSketch(p, funcError);
                    }
                }
                
                // Add error handling for draw
                const originalDraw = p.draw;
                p.draw = function() {
                    try {
                        if (originalDraw) {
                            originalDraw.call(this);
                        }
                    } catch (drawError) {
                        console.error('Draw error:', drawError);
                        if (!setupComplete) {
                            setupFallbackSketch(p, drawError);
                            setupComplete = true;
                        }
                    }
                };
                
            }, containerId);
            
            logToConsole('Code executed successfully', 'success');
            return true;
            
        } catch (error) {
            console.error('Critical error:', error);
            showErrorInContainer(container, error);
            logToConsole(`Error: ${error.message}`, 'error');
            return false;
        }
    }, 50);
}

// Fallback sketch for errors
function setupFallbackSketch(p, error) {
    p.setup = function() {
        p.createCanvas(400, 400);
    };
    
    p.draw = function() {
        p.background(0);
        p.fill(255, 100, 100);
        p.textSize(16);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('Error in your code', p.width/2, p.height/2 - 30);
        
        p.fill(255, 200, 100);
        p.textSize(12);
        p.text('Check console for details', p.width/2, p.height/2);
        
        // Show a simple animation
        p.fill(100, 200, 255, 150);
        p.noStroke();
        p.ellipse(
            p.width/2 + p.sin(p.frameCount * 0.05) * 100, 
            p.height/2 + p.cos(p.frameCount * 0.05) * 50, 
            40, 40
        );
    };
}

// Show error in container
function showErrorInContainer(container, error) {
    container.innerHTML = `
        <div style="
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #111;
            color: #ff6666;
            font-family: 'Courier New', monospace;
            padding: 20px;
            text-align: center;
            line-height: 1.6;
        ">
            <h3 style="color: #ff3333; margin-bottom: 15px;">⚠️ Error Executing Code</h3>
            <div style="background: #222; padding: 15px; border-radius: 5px; margin-bottom: 15px; max-width: 90%; overflow: auto;">
                <code style="color: #ff9999;">${error.message}</code>
            </div>
            <p style="color: #8888cc; font-size: 14px;">Check browser console for details</p>
            <div style="
                width: 100px;
                height: 100px;
                margin-top: 20px;
                border: 3px solid #00ffff;
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <style>
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            </style>
        </div>
    `;
}

// Run showcase preset
function runShowcasePreset(index) {
    currentPresetIndex = index;
    const preset = SHOWCASE_PRESETS[index];
    
    // Update UI
    document.getElementById('preset-title').textContent = preset.name;
    document.getElementById('preset-counter').textContent = `Preset ${index + 1} of ${SHOWCASE_PRESETS.length}`;
    
    // Run code
    runP5Code(preset.createSketch, 'showcase-canvas-container');
}

// Start showcase mode
function startShowcaseMode() {
    // Update UI
    document.getElementById('showcase-mode').style.display = 'block';
    document.getElementById('editor-mode').style.display = 'none';
    document.getElementById('showcase-btn').classList.add('active');
    document.getElementById('editor-btn').classList.remove('active');
    
    // Clear interval
    if (showcaseInterval) {
        clearInterval(showcaseInterval);
    }
    
    // Start with first preset
    runShowcasePreset(0);
    
    // Start carousel
    showcaseInterval = setInterval(() => {
        let nextIndex = (currentPresetIndex + 1) % SHOWCASE_PRESETS.length;
        runShowcasePreset(nextIndex);
    }, 5000);
    
    logToConsole('Showcase started', 'info');
}

// Start editor mode
function startEditorMode() {
    // Update UI
    document.getElementById('showcase-mode').style.display = 'none';
    document.getElementById('editor-mode').style.display = 'block';
    document.getElementById('editor-btn').classList.add('active');
    document.getElementById('showcase-btn').classList.remove('active');
    
    // Stop showcase
    if (showcaseInterval) {
        clearInterval(showcaseInterval);
        showcaseInterval = null;
    }
    
    // Clear console
    clearConsole();
    
    logToConsole('Editor ready - Press Ctrl+Enter to run code', 'info');
}

// Export canvas
function exportCanvas() {
    const canvas = document.querySelector('#editor-canvas-container canvas');
    if (!canvas) {
        alert('Run code first to export!');
        return;
    }
    
    // Get sketch name
    const sketchName = currentExampleType || 'remoi-art';
    const filename = `${sketchName}-${Date.now()}.png`;
    
    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    logToConsole(`Art exported as ${filename}`, 'success');
    return filename;
}

// Add more utility functions
function generateRandomPalette() {
    const hue = Math.floor(Math.random() * 360);
    return [
        `hsb(${hue}, 70%, 100%)`,
        `hsb(${(hue + 60) % 360}, 80%, 90%)`,
        `hsb(${(hue + 120) % 360}, 90%, 80%)`,
        `hsb(${(hue + 180) % 360}, 60%, 100%)`,
        `hsb(${(hue + 240) % 360}, 70%, 90%)`
    ];
}

// Make functions global
window.stopCurrentSketch = stopCurrentSketch;
window.runP5Code = runP5Code;
window.startShowcaseMode = startShowcaseMode;
window.startEditorMode = startEditorMode;
window.exportCanvas = exportCanvas;
window.logToConsole = logToConsole;
window.clearConsole = clearConsole;
window.generateRandomPalette = generateRandomPalette;

console.log('✅ Remoi Art Engine loaded successfully!');

// Initialize loading animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('🎨 Remoi Art Engine initialized');
        logToConsole('Welcome to Remoi Art Engine!', 'success');
        logToConsole('Press Ctrl+Enter to run code in editor', 'info');
    });
} else {
    console.log('🎨 Remoi Art Engine ready');
    setTimeout(() => {
        logToConsole('System ready', 'success');
    }, 500);
}