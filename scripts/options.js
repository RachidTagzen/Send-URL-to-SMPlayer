document.addEventListener('DOMContentLoaded', function () {
    const speedSelect = document.getElementById('speed');
    const smplayerPathInput = document.getElementById('smplayerPath');
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');
  
    // Load saved settings
    browser.storage.sync.get(['speed', 'smplayerPath']).then((result) => {
        if (result.speed) {
            speedSelect.value = result.speed;
        }
        if (result.smplayerPath) {
            smplayerPathInput.value = result.smplayerPath;
        }
    });
  
    // Save settings
    saveButton.addEventListener('click', () => {
        const speed = speedSelect.value;
        const smplayerPath = smplayerPathInput.value;
        browser.storage.sync.set({ speed, smplayerPath }).then(() => {
            alert('Settings saved');
        });
    });
  
    // Reset settings
    resetButton.addEventListener('click', () => {
        const defaultSpeed = 'normal_speed';
        const defaultPath = '';
        browser.storage.sync.set({ speed: defaultSpeed, smplayerPath: defaultPath }).then(() => {
            speedSelect.value = defaultSpeed;
            smplayerPathInput.value = defaultPath;
            alert('Settings reset to default');
        });
    });
  });
  