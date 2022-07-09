const aws_account_presets = {
    "default": {
        color: '#084298',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#cfe2ff',
        borderRadius: '10px',
        border: '1px solid #b6d4fe'
    },
    "grey": {
        color: '#41464b',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#e2e3e5',
        borderRadius: '10px',
        border: '1px solid #d3d6d8'
    },
    "success": {
        color: '#0f5132',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#d1e7dd',
        borderRadius: '10px',
        border: '1px solid #badbcc'
    },
    "danger": {
        color: '#842029',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#f8d7da',
        borderRadius: '10px',
        border: '1px solid #f5c2c7'
    },
    "warning": {
        color: '#664d03',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#fff3cd',
        borderRadius: '10px',
        border: '1px solid #ffecb5'
    },
    "info": {
        color: '#055160',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#cff4fc',
        borderRadius: '10px',
        border: '1px solid #b6effb'
    },
    "dark": {
        color: '#141619',
        fontWeight: 'bold',
        padding: '0px 5px',
        marginRight: '5px',
        background: '#d3d3d4',
        borderRadius: '10px',
        border: '1px solid #bcbebf'
    },
};
const aws_account_config = [
    {
        "account_id": "111111111111",
        "name": "Example",
        "preset": "danger"
    }
]

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ aws_account_presets, aws_account_config });
});
