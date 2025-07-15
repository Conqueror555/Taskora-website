"use client";

import  { useEffect } from "react";
import TagManager from "react-gtm-module";

function GTMinitializer(){
    useEffect(() => {
        const tagManagerArgs = {
            gtmId: "GTM-53FLHWD3",
        };
        TagManager.initialize(tagManagerArgs);
    }, []);
    return null;
}

export default GTMinitializer;