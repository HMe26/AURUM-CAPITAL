// منع Right Click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Right-click is disabled!');
});

// منع F12, Ctrl+Shift+I/J, Ctrl+U
document.addEventListener('keydown', function(e) {
    if (e.key === "F12") e.preventDefault();
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J")) e.preventDefault();
    if (e.ctrlKey && e.key === "U") e.preventDefault();
});

// كشف DevTools عن طريق window size & console override
(function() {
    let devtoolsOpen = false;

    const threshold = 160; // تغير حسب حجم الشاشة
    const checkDevTools = function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                alert("DevTools detected!"); 
                // لو عايز، ممكن تعمل redirect أو تحذف الصفحة
                // window.location.href = "about:blank";
            }
        } else {
            devtoolsOpen = false;
        }
    };

    // Override console
    const consoleProxy = new Proxy(console, {
        get(target, prop) {
            if (prop === 'log' || prop === 'warn' || prop === 'error') {
                return function() {
                    alert("Console usage is disabled!");
                }
            }
            return target[prop];
        }
    });

    window.console = consoleProxy;

    setInterval(checkDevTools, 500); // تحقق كل نصف ثانية
})();