const container = document.getElementById("config");
const presetContainer = document.getElementById("preset-config");
const options = {
    mode: 'code',
};
const editor = new JSONEditor(container, options);
const presetEditor = new JSONEditor(presetContainer, options);

// Store AWS Account Config to Storage
function updateConfig() {
    chrome.storage.sync.set({'aws_account_config': editor.get()});
}

// Load Config from JSON file
function loadConfig() {
    var file = document.getElementById("config-file").files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            editor.set(JSON.parse(evt.target.result));
        }
    }
}

// Merge current config with JSON file
function mergeConfig() {
    var file = document.getElementById("config-file").files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            const json = editor.get();
            const merged = json.concat(JSON.parse(evt.target.result));
            const finalJson = [
                ...new Map(merged.map((item) => [item["name"], item])).values(),
            ];
            editor.set(finalJson);
        }
    }
}

// Create a span element for preset preview
function createPresetPreview(name, preset) {
    const label = document.createElement('span');
    label.textContent = name;
    label.style.fontSize = '12px';
    label.style.height = '22px';
    label.style.lineHeight = '22px';
    label.style.display = 'inline-block';
    Object.keys(preset).forEach((key) => {
        label.style[key] = preset[key];
    });
    document.querySelector("#preset-preview").append(label);
}

// Preview presets from preset json
function previewPreset() {
    const previewPresets = presetEditor.get();
    document.querySelector("#preset-preview").innerHTML = '';
    if (previewPresets !== undefined) {
        Object.keys(previewPresets).forEach(preset => createPresetPreview(preset, previewPresets[preset]));
    }
}

// Storage custom preset to storage
function updatePreset() {
    chrome.storage.sync.set({aws_account_presets: presetEditor.get()});
}

// Add a button to the page for each supplied color
function constructOptions() {
    document.querySelector("#update-config").addEventListener('click', updateConfig);
    document.querySelector("#merge-config").addEventListener('click', mergeConfig);
    document.querySelector("#load-config").addEventListener('click', loadConfig);
    document.querySelector("#preview-preset").addEventListener('click', previewPreset);
    document.querySelector("#update-preset").addEventListener('click', updatePreset);

    chrome.storage.sync.get("aws_account_config", (data) => {
        if (data.aws_account_config !== undefined) {
            // create the editor
            editor.set(data.aws_account_config);
        } else {
            editor.set([]);
        }
    });

    chrome.storage.sync.get("aws_account_presets", (data) => {
        const presets = data.aws_account_presets;
        presetEditor.set(presets);
        if (presets !== undefined) {
            Object.keys(presets).forEach(preset => createPresetPreview(preset, presets[preset]));
        }
    })
}

// Initialize the page
constructOptions();
