const accountDetailText = document.querySelector("#menu--account").textContent;
const accountIDMatches = accountDetailText.match(/Account ID: (.*)Federated user/);
var config = [];
var presets = [];

const appendEnvLabel = (env, presetName) => {
    const label = document.createElement('span');
    const preset = presets[presetName] ?? presets["default"];
    label.textContent = env;
    Object.keys(preset).forEach((key) => {
        label.style[key] = preset[key];
    });

    document.querySelector("#nav-usernameMenu").prepend(label);
}

const findAccountConfig = (accountID) => {
    accountID = accountID.replaceAll("-", "");
    console.log(accountID);

    const result = config.filter(c => c.account_id === accountID);
    if (result.length > 0) {
        return result[0];
    } else {
        return {
            "name": "N/A",
            "preset": "danger",
        };
    }
}

chrome.storage.sync.get("aws_account_config", (data) => {
    if (data.aws_account_config !== undefined) {
        // create the editor
        config = data.aws_account_config;

        chrome.storage.sync.get("aws_account_presets", (data) => {
            presets = data.aws_account_presets;
            if (accountIDMatches.length !== 2) {
                appendEnvLabel("HTML Error", "danger");
            } else {
                const accountID = accountIDMatches[1];
                const config = findAccountConfig(accountID);
                appendEnvLabel(config.name, config.preset);
            }
        })
    }
});

