// App.js - ENHANCED COMPLETE VERSION
console.log('🚀 App.js loading...');

// Built-in examples as functions
const BUILTIN_EXAMPLES = {
    standard: function(p) {
        let t = 0;
        
        p.setup = function() {
            p.createCanvas(400, 400);
        };
        
        p.draw = function() {
            p.background(0, 10);
            p.fill(255, 100, 100);
            p.noStroke();
            p.ellipse(p.width/2 + p.sin(t) * 100, p.height/2 + p.cos(t * 1.5) * 50, 40, 40);
            t += 0.05;
        };
    },
    
    compact: function(p) {
        let t = 0;
        let canvasCreated = false;
        
        p.setup = function() {
            p.createCanvas(400, 400);
            canvasCreated = true;
        };
        
        p.draw = function() {
            if (!canvasCreated) {
                p.createCanvas(400, 400);
                canvasCreated = true;
            }
            
            p.background(0);
            p.stroke(255);
            p.translate(p.width/2, p.height/2);
            
            for (let i = 0; i < 1000; i++) {
                let angle = i * 0.1 + t;
                let radius = 100 + p.sin(angle * 3) * 40;
                p.point(radius * p.cos(angle), radius * p.sin(angle));
            }
            t += 0.02;
        };
    },
    
    particles: function(p) {
        let particles = [];
        
        p.setup = function() {
            p.createCanvas(400, 400);
            for (let i = 0; i < 30; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-1, 1),
                    vy: p.random(-1, 1),
                    size: p.random(5, 10)
                });
            }
        };
        
        p.draw = function() {
            p.background(0, 30);
            p.noStroke();
            p.fill(100, 200, 255);
            
            for (let particle of particles) {
                p.ellipse(particle.x, particle.y, particle.size);
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
            }
        };
    },
    
    waves: function(p) {
        let t = 0;
        
        p.setup = function() {
            p.createCanvas(400, 400);
            p.stroke(100, 200, 255);
            p.noFill();
        };
        
        p.draw = function() {
            p.background(0, 20);
            p.translate(0, p.height/2);
            
            p.beginShape();
            for (let x = 0; x < p.width; x += 5) {
                let y = p.sin(x * 0.03 + t) * 50;
                p.vertex(x, y);
            }
            p.endShape();
            t += 0.04;
        };
    },
    
    fractalTree: function(p) {
        let angle = 0;
        
        p.setup = function() {
            p.createCanvas(400, 400);
        };
        
        p.draw = function() {
            p.background(0);
            p.stroke(0, 255, 100, 200);
            p.strokeWeight(2);
            p.translate(p.width/2, p.height);
            
            angle = p.sin(p.frameCount * 0.01) * 0.3;
            drawBranch(p, 100, 8);
        };
        
        function drawBranch(p, len, depth) {
            if (depth <= 0) return;
            
            p.line(0, 0, 0, -len);
            p.translate(0, -len);
            
            if (len > 4) {
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
};

// Example code strings for editor
const EXAMPLE_CODE_STRINGS = {
    standard: `// Standard p5.js Animation
let t = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 10);
  fill(255, 100, 100);
  noStroke();
  ellipse(width/2 + sin(t) * 100, height/2 + cos(t * 1.5) * 50, 40, 40);
  t += 0.05;
}`,

    compact: `// Compact Format Animation
let t = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(255);
  translate(width/2, height/2);
  
  for (let i = 0; i < 1000; i++) {
    let angle = i * 0.1 + t;
    let radius = 100 + sin(angle * 3) * 40;
    point(radius * cos(angle), radius * sin(angle));
  }
  t += 0.02;
}`,

    particles: `// Interactive Particles
let particles = [];

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-1, 1),
      vy: random(-1, 1),
      size: random(5, 15)
    });
  }
}

function draw() {
  background(0, 30);
  noStroke();
  fill(100, 200, 255);
  
  for (let p of particles) {
    ellipse(p.x, p.y, p.size);
    p.x += p.vx;
    p.y += p.vy;
    
    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;
  }
}`,

    waves: `// Wave Pattern
let t = 0;

function setup() {
  createCanvas(400, 400);
  stroke(100, 200, 255);
  noFill();
}

function draw() {
  background(0, 20);
  translate(0, height/2);
  
  beginShape();
  for (let x = 0; x < width; x += 5) {
    let y = sin(x * 0.03 + t) * 50;
    vertex(x, y);
  }
  endShape();
  t += 0.04;
}`,

    fractalTree: `// Fractal Tree
let angle = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  stroke(0, 255, 100, 200);
  strokeWeight(2);
  translate(width/2, height);
  
  angle = sin(frameCount * 0.01) * 0.3;
  drawBranch(100, 8);
}

function drawBranch(len, depth) {
  if (depth <= 0) return;
  
  line(0, 0, 0, -len);
  translate(0, -len);
  
  if (len > 4) {
    push();
    rotate(angle);
    drawBranch(len * 0.67, depth - 1);
    pop();
    
    push();
    rotate(-angle);
    drawBranch(len * 0.67, depth - 1);
    pop();
  }
}`
};

// Map example types to their functions
const EXAMPLE_FUNCTIONS = {
    standard: BUILTIN_EXAMPLES.standard,
    compact: BUILTIN_EXAMPLES.compact,
    particles: BUILTIN_EXAMPLES.particles,
    waves: BUILTIN_EXAMPLES.waves,
    fractalTree: BUILTIN_EXAMPLES.fractalTree
};

// Global variable to track current example type
let currentExampleType = null;
let savedSketches = {};

// Setup everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM ready, setting up...');
    
    // Load saved sketches from localStorage
    loadSavedSketches();
    
    // Mode switching
    document.getElementById('showcase-btn').addEventListener('click', startShowcaseMode);
    document.getElementById('editor-btn').addEventListener('click', startEditorMode);
    document.getElementById('start-editing-btn').addEventListener('click', startEditorMode);
    document.getElementById('back-to-showcase-btn').addEventListener('click', startShowcaseMode);
    
    // Editor controls
    document.getElementById('run-code-btn').addEventListener('click', runEditorCode);
    document.getElementById('stop-code-btn').addEventListener('click', stopEditorCode);
    document.getElementById('clear-code-btn').addEventListener('click', clearEditor);
    document.getElementById('export-btn').addEventListener('click', exportCanvas);
    
    // Add Save/Load buttons
    addSaveLoadButtons();
    
    // Example buttons
    document.querySelectorAll('.example-btn').forEach(button => {
        button.addEventListener('click', function() {
            const exampleType = this.dataset.example;
            loadExample(exampleType);
        });
    });
    
    // Add new fractal tree example button
    const exampleButtons = document.querySelector('.example-buttons');
    const fractalBtn = document.createElement('button');
    fractalBtn.className = 'example-btn';
    fractalBtn.dataset.example = 'fractalTree';
    fractalBtn.textContent = 'Fractal Tree';
    exampleButtons.appendChild(fractalBtn);
    fractalBtn.addEventListener('click', function() {
        loadExample('fractalTree');
    });
    
    // Tab key for code editor
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor) {
        codeEditor.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
        });
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runEditorCode();
        }
        
        // Ctrl+S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveCurrentSketch();
        }
        
        // Ctrl+E to export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportCanvas();
        }
    });
    
    // Start showcase
    setTimeout(startShowcaseMode, 100);
    
    console.log('✅ All event listeners set up');
});

// Helper to wrap arrow function codes
function wrapArrowFunctionCode(code) {
    // Check if it's an arrow function
    if (code.includes('draw=') || code.includes('draw =')) {
        // Extract the draw function body
        const drawMatch = code.match(/draw\s*=\s*([^{]+=>\s*{[\s\S]*?})/);
        if (drawMatch) {
            return `
                ${code.replace(/draw\s*=/, 'window.draw =')}
            `;
        }
    }
    return code;
}

// Run code in editor
function runEditorCode() {
    const code = document.getElementById('code-editor').value;
    const seedInput = document.getElementById('seed-input').value;
    const seed = seedInput ? parseInt(seedInput) : null;
    
    if (!code.trim()) {
        alert('Please enter some code!');
        return;
    }
    
    // Stop previous
    if (typeof stopCurrentSketch === 'function') {
        stopCurrentSketch();
    }
    
    // Check if it's a built-in example
    let codeFunction = null;
    currentExampleType = null;
    
    // Check which example code matches
    for (const [type, exampleCode] of Object.entries(EXAMPLE_CODE_STRINGS)) {
        if (code.trim() === exampleCode.trim()) {
            codeFunction = EXAMPLE_FUNCTIONS[type];
            currentExampleType = type;
            break;
        }
    }
    
    // If not a built-in example, parse custom code
if (!codeFunction) {
    // Check if code uses arrow function syntax for draw
    if (code.includes('draw=') || code.includes('draw =')) {
        // Wrap the entire code to properly handle arrow functions
        codeFunction = createFunctionFromCode(code);
        currentExampleType = 'custom';
    } else {
        // Standard p5.js format
        codeFunction = createFunctionFromCode(code);
        currentExampleType = 'custom';
    }
}
    
    // Run it
    if (typeof runP5Code === 'function' && codeFunction) {
        runP5Code(codeFunction, 'editor-canvas-container', seed);
        updateFormatIndicator(code);
        
        // Update FPS counter
        startFPSCounter();
    } else {
        alert('Engine not loaded! Refresh page.');
    }
}

// Create function from code string (IMPROVED VERSION)
// Create function from code string - FIXED VERSION
function createFunctionFromCode(code) {
    return function(p) {
        let userSetup = null;
        let userDraw = null;
        let fatalError = false;
        let canvasCreated = false;

        // Store original p5 functions
        const p5Methods = {};
        
        // Copy all p5 methods to window for user code
        const bindGlobals = () => {
            // Clear previous globals
            for (const key in window) {
                if (key.startsWith('__')) continue;
                if (key === 'p5') continue;
                if (key === 'Math') continue;
                if (key === 'console') continue;
                if (key === 'window') continue;
                if (key === 'document') continue;
                if (typeof window[key] === 'function' && window[key].name.startsWith('p5_')) {
                    delete window[key];
                }
            }

            // Bind ALL p5 instance methods to window
            for (const key in p) {
                if (typeof p[key] === 'function') {
                    window[key] = function(...args) {
                        const result = p[key](...args);
                        // For chaining methods like stroke().circle()
                        return result === p ? p : result;
                    }.bind(p);
                } else if (key !== 'width' && key !== 'height' && key !== 'mouseX' && key !== 'mouseY') {
                    window[key] = p[key];
                }
            }

            // Add Math constants
            Object.assign(window, Math);
            window.PI = Math.PI;
            window.TAU = Math.PI * 2;
            window.HALF_PI = Math.PI / 2;
            window.QUARTER_PI = Math.PI / 4;
            
            // Special p5 functions
            window.random = function(...args) {
                if (args.length === 0) return Math.random();
                if (args.length === 1) return Math.random() * args[0];
                if (args.length === 2) return args[0] + Math.random() * (args[1] - args[0]);
            };
            
            window.noise = p.noise || (() => Math.random());
            window.map = p.map || ((value, start1, stop1, start2, stop2) => 
                start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)));
                
            window.mag = (x, y) => Math.sqrt(x*x + y*y);
            window.dist = (x1, y1, x2, y2) => Math.sqrt((x2-x1)**2 + (y2-y1)**2);
            
            // Create canvas shortcut
            window.createCanvas = function(w, h) {
                canvasCreated = true;
                if (!p.setupDone) {
                    p.setupDone = true;
                    return p.createCanvas(w, h);
                }
            };
        };

        p.setup = () => {
            try {
                p.setupDone = false;
                bindGlobals();
                fatalError = false;
                canvasCreated = false;

                // Wrap user code to handle arrow function syntax
              // Update the wrappedCode section in createFunctionFromCode:
                const wrappedCode = `
                    try {
                        // Wrap arrow function codes
                        ${wrapArrowFunctionCode(code)}
                        
                        // Check if draw was defined
                        if (typeof draw === 'function') {
                            window.__userDraw = draw;
                        } else if (window.draw) {
                            window.__userDraw = window.draw;
                        }
                    } catch(e) {
                        console.error('Parse error:', e);
                        throw e;
                    }
                `;

                // Execute wrapped code
                new Function(wrappedCode)();

                userDraw = window.__userDraw;

                // Auto-create canvas if not created in setup
                if (!canvasCreated) {
                    p.createCanvas(400, 400);
                }

            } catch (e) {
                fatalError = true;
                logToConsole(`Setup Error: ${e.message}`, 'error');
                console.error('Setup error:', e);
            }
        };

        p.draw = () => {
            if (fatalError || !userDraw) return;

            try {
                bindGlobals();
                
                // Set width and height for user code
                window.width = p.width;
                window.height = p.height;
                
                // Execute draw function
                userDraw();
                
            } catch (e) {
                fatalError = true;
                logToConsole(`Draw Error: ${e.message}`, 'error');
                console.error('Draw error:', e);
            }
        };
    };
}



// Add Save/Load buttons to toolbar
function addSaveLoadButtons() {
    const toolbar = document.querySelector('.editor-toolbar');
    
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';
    saveBtn.className = 'save-btn';
    saveBtn.textContent = '💾 Save';
    saveBtn.title = 'Ctrl+S';
    saveBtn.addEventListener('click', saveCurrentSketch);
    
    const loadBtn = document.createElement('button');
    loadBtn.id = 'load-btn';
    loadBtn.className = 'load-btn';
    loadBtn.textContent = '📂 Load';
    loadBtn.title = 'Load saved sketch';
    loadBtn.addEventListener('click', showLoadDialog);
    
    // Insert before back button
    const backBtn = document.getElementById('back-to-showcase-btn');
    toolbar.insertBefore(saveBtn, backBtn);
    toolbar.insertBefore(loadBtn, backBtn);
    
    // Add CSS classes
    saveBtn.style.background = 'linear-gradient(45deg, #008800, #00cc00)';
    loadBtn.style.background = 'linear-gradient(45deg, #ff8800, #ffaa00)';
}

// Save current sketch
function saveCurrentSketch() {
    const code = document.getElementById('code-editor').value;
    if (!code.trim()) {
        alert('No code to save!');
        return;
    }
    
    const name = prompt('Save sketch as (name):');
    if (name) {
        const key = `remoi_sketch_${name}`;
        localStorage.setItem(key, code);
        savedSketches[name] = code;
        
        logToConsole(`Saved: "${name}"`, 'success');
        alert(`Sketch saved as "${name}"`);
    }
}

// Load saved sketches from localStorage
function loadSavedSketches() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('remoi_sketch_')) {
            const name = key.replace('remoi_sketch_', '');
            savedSketches[name] = localStorage.getItem(key);
        }
    }
    console.log(`Loaded ${Object.keys(savedSketches).length} saved sketches`);
}

// Show load dialog
function showLoadDialog() {
    if (Object.keys(savedSketches).length === 0) {
        alert('No saved sketches found!');
        return;
    }
    
    let sketchList = 'Saved Sketches:\n\n';
    Object.keys(savedSketches).forEach((name, index) => {
        sketchList += `${index + 1}. ${name}\n`;
    });
    
    const sketchName = prompt(`${sketchList}\nEnter sketch name to load:`);
    if (sketchName && savedSketches[sketchName]) {
        document.getElementById('code-editor').value = savedSketches[sketchName];
        logToConsole(`Loaded: "${sketchName}"`, 'success');
        runEditorCode(); // Auto-run loaded sketch
    } else if (sketchName) {
        alert(`Sketch "${sketchName}" not found!`);
    }
}

// Stop editor animation
function stopEditorCode() {
    if (typeof stopCurrentSketch === 'function') {
        stopCurrentSketch();
    }
    if (typeof logToConsole === 'function') {
        logToConsole('Stopped', 'info');
    }
    
    // Stop FPS counter
    if (window.fpsInterval) {
        clearInterval(window.fpsInterval);
        window.fpsInterval = null;
    }
}

// Clear editor
function clearEditor() {
    document.getElementById('code-editor').value = '';
    document.getElementById('seed-input').value = '';
    currentExampleType = null;
    
    if (typeof stopCurrentSketch === 'function') {
        stopCurrentSketch();
    }
    
    if (typeof clearConsole === 'function') {
        clearConsole();
    }
    
    const container = document.getElementById('editor-canvas-container');
    if (container) {
        container.innerHTML = '<div style="color: #666; display: flex; align-items: center; justify-content: center; height: 100%;">Run code to see preview</div>';
    }
    
    if (typeof logToConsole === 'function') {
        logToConsole('Cleared', 'info');
    }
}

// Load example
function loadExample(type) {
    if (EXAMPLE_CODE_STRINGS[type]) {
        document.getElementById('code-editor').value = EXAMPLE_CODE_STRINGS[type];
        currentExampleType = type;
        updateFormatIndicator(EXAMPLE_CODE_STRINGS[type]);
        
        if (typeof logToConsole === 'function') {
            logToConsole(`Loaded ${type} example`, 'success');
        }
        
        // Auto-run the example
        setTimeout(runEditorCode, 100);
    }
}

// Update format indicator
function updateFormatIndicator(code) {
    const indicator = document.getElementById('format-indicator');
    if (!indicator) return;
    
    if (code.includes('function setup()') && code.includes('function draw()')) {
        indicator.textContent = 'Format: Standard p5.js';
    } else if (code.includes('draw =')) {
        indicator.textContent = 'Format: Compact';
    } else {
        indicator.textContent = 'Format: Custom';
    }
}

// Start FPS counter
function startFPSCounter() {
    if (window.fpsInterval) {
        clearInterval(window.fpsInterval);
    }
    
    let frameCount = 0;
    const fpsCounter = document.getElementById('fps-counter');
    if (!fpsCounter) return;
    
    window.fpsInterval = setInterval(() => {
        const fps = Math.round(frameCount * 2); // Since we check every 500ms
        fpsCounter.textContent = `${fps} FPS`;
        frameCount = 0;
    }, 500);
    
    // Count frames
    const oldDraw = window.currentSketch ? window.currentSketch.draw : null;
    if (window.currentSketch) {
        const originalDraw = window.currentSketch.draw;
        window.currentSketch.draw = function() {
            frameCount++;
            if (originalDraw) originalDraw.call(this);
        };
    }
}

console.log('✅ App.js loaded successfully');