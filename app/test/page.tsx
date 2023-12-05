import React from "react";
import { Tabs, Tab } from "@nextui-org/tabs";

export default function PageApp() {

    return (
        <div className="flex flex-wrap gap-4">
            <Tabs variant="underlined" aria-label="Tabs variants">
                <Tab key="photos" title="Photos" />
                <Tab key="music" title="Music" />
                <Tab key="videos" title="Videos" />
            </Tabs>
        </div>
    );
}