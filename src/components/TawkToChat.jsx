import { useEffect } from 'react';

const TawkToChat = () => {
    useEffect(() => {
        // <!--Start of Tawk.to Script-->
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function () {
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6920e5bb5a6d17195e8d0a1d/1jak82q27';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
        // <!--End of Tawk.to Script-->
    }, []);
    return null;
};

export default TawkToChat;
